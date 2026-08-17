import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

import { CardComponentStyled, ResidenceInvoiceCardStyled } from "./styled";
import { UsersServices } from "../../../Users/User/users.service";
import { utils } from "../../../../Helpers/utils";
import InvoicesCard from "../InvoicesCard";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { AsignPaymentModal } from "./Components/AsignPaymentModal";
import { useDispatch, useSelector } from "react-redux";
import { setResidences } from "../../reducer";
import AccountManagerModal from "./Components/AccountManagerModal";
import { getRequestUserInfo } from "../../../../Helpers/restClient";
import { Dialog } from "primereact/dialog";
import EditResidenceModal from "./Components/EditResidenceModal";
import { FaPencilAlt, FaUser } from "react-icons/fa";

const DEFAULT_IMAGE =
  "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/casa.jpg";

// Number of cards rendered per batch. New batches load as the user scrolls.
const BATCH_SIZE = 12;

// Extracted and memoized so it is defined once instead of being recreated on
// every parent render. Recreating it inline made React remount every card
// whenever any parent state changed (e.g. opening a modal), which was the main
// cause of the freeze.
const CardComponent = React.memo(
  ({ residence, canEditHouse, onAsignPayment, onVoucher, onEdit }) => {
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const { imageUrl, accounts, name, block, houseNumber } = residence;

    const buttons = [
      {
        label: "Asignar Pago",
        className: "p-button-info",
        condition: utils.hasPermission("AsignarPago"),
        onClick: () => onAsignPayment(residence),
      },
      {
        label: "Ver Comprobantes",
        className: "p-button-primary",
        condition: true,
        onClick: () => onVoucher(residence),
      },
    ];

    return (
      <CardComponentStyled>
        <div className="edit-button">
          <Button
            disabled={!canEditHouse}
            icon={<FaPencilAlt />}
            className="p-button-rounded p-button-secondary"
            onClick={() => onEdit(residence)}
            aria-label="Editar Casa"
          />
        </div>

        {/* Imagen de la residencia */}
        <div className="residence-image">
          <img
            loading="lazy"
            decoding="async"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              setIsImageModalVisible(true);
            }}
            src={imageUrl || DEFAULT_IMAGE}
            alt="Descripción de la imagen"
          />
        </div>

        {/* Contenido de la tarjeta */}
        <div className="residence-content">
          <div className="owner-title">
            <FaUser className="info-icon" />
            <span>{accounts?.[0]?.fullName || "Propietario no asignado"}</span>
          </div>

          <div className="residence-name">
            <strong>{name || "Sin nombre"}</strong>
          </div>

          <div className="residence-details-grid">
            <div className="detail-item">
              <strong>Bloque</strong>
              <span>{block || "-"}</span>
            </div>
            <div className="detail-item">
              <strong>Casa</strong>
              <span>{houseNumber || "-"}</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="buttons-container">
          {buttons.map(
            (button, index) =>
              button.condition && (
                <Button
                  key={index}
                  label={button.label}
                  className={`p-button-raised ${button.className}`}
                  onClick={button.onClick}
                />
              ),
          )}
        </div>

        {isImageModalVisible && (
          <Dialog
            visible={isImageModalVisible}
            onHide={() => setIsImageModalVisible(false)}
            header="Full-Size Image"
            style={{ width: "50vw", textAlign: "center" }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Full-Size Residence"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <p>No image available</p>
            )}
          </Dialog>
        )}
      </CardComponentStyled>
    );
  },
);

const ResidenceInoviceCard = ({
  residenceSelected,
  setResidenceSelected,
  invoiceSelected,
  setInvoiceSelected,
  setisOpenInvoiceModal,
  residenceList,
  setResidenceList,
  confirmDialog,
  setIsEdit,
  showInvoice,
  setShowInvoice,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useRef(null);
  const [showAsignPayment, setShowAsignPayment] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [userList, setUserList] = useState([]);
  const [showEditResidence, setShowEditResidence] = useState(false);
  const [selectedResidence, setSelectedResidence] = useState(undefined);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const dispatch = useDispatch();
  const { residentialSelected } = useSelector((store) => store.Invoice);

  const scrollContainerRef = useRef(null);
  const sentinelRef = useRef(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    loadResidences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userInfo = useMemo(() => getRequestUserInfo(), []);

  const canEditHouse = useMemo(() => {
    return (
      utils.hasPermission("EditarCasa") || utils.hasPermission("EditarMiCasa")
    );
  }, []);

  const loadResidences = async () => {
    const request = {
      searchValue: residentialSelected.residentialNo,
      onlyEmptyLot: false,
    };

    let response = await UsersServices.getResidence(request);

    const hasPermissionToSeeAllResidences = utils.hasPermission(
      "VerTodasLasResidencias",
    );
    const accountIds = userInfo.accounts.select((x) => x.id);

    if (!hasPermissionToSeeAllResidences) {
      response.residences = response.residences.filter((x) =>
        accountIds.includes(x.accountId),
      );
    }

    if (response?.success) {
      setResidenceList(response.residences);
      dispatch(setResidences(response.residences));
      return;
    }
  };

  // Restart the batch window whenever the underlying list changes.
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [residenceList]);

  // Load the next batch when the sentinel scrolls into view.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + BATCH_SIZE, residenceList.length),
          );
        }
      },
      { root: null, rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [residenceList.length, showInvoice]);

  const handleAsignPayment = useCallback(
    (residence) => {
      setResidenceSelected(residence);
      setShowAsignPayment(true);
    },
    [setResidenceSelected],
  );

  const handleVoucher = useCallback(
    (residence) => {
      setResidenceSelected(residence);
      setShowVoucher(true);
    },
    [setResidenceSelected],
  );

  const handleEdit = useCallback((residence) => {
    setShowEditResidence(true);
    setUserList(residence.accounts);
    setSelectedResidence(residence);
  }, []);

  const visibleResidences = useMemo(
    () => residenceList.slice(0, visibleCount),
    [residenceList, visibleCount],
  );

  return (
    <ResidenceInvoiceCardStyled ref={scrollContainerRef}>
      <Toast ref={toast} />
      {!showInvoice && residenceList.length > 0 && (
        <>
          {visibleResidences.map((residence, index) => (
            <CardComponent
              key={residence.residenceNo || residence.accountId || index}
              residence={residence}
              canEditHouse={canEditHouse}
              onAsignPayment={handleAsignPayment}
              onVoucher={handleVoucher}
              onEdit={handleEdit}
            />
          ))}
          {visibleCount < residenceList.length && (
            <div ref={sentinelRef} style={{ width: "100%", height: "1px" }} />
          )}
        </>
      )}
      {utils.evaluateFullObjetct(residenceSelected) && showInvoice && (
        <InvoicesCard
          residenceSelected={residenceSelected}
          setInvoiceSelected={setInvoiceSelected}
          invoiceSelected={invoiceSelected}
          setisOpenInvoiceModal={setisOpenInvoiceModal}
          getInvoicesByResidential={loadResidences}
          confirmDialog={confirmDialog}
          toast={toast}
          setIsEdit={setIsEdit}
        />
      )}
      {showAsignPayment && (
        <AsignPaymentModal
          isOpen={showAsignPayment}
          onDissmis={() => setShowAsignPayment(false)}
          residenceSelected={residenceSelected}
          confirmDialog={confirmDialog}
        />
      )}

      {showUsers && (
        <AccountManagerModal
          accounts={userList}
          visible={showUsers}
          onHide={() => setShowUsers(false)}
          residenceList={residenceList}
          setResidenceList={setResidenceList}
          setUserList={setUserList}
        />
      )}

      {showEditResidence && (
        <EditResidenceModal
          accounts={userList}
          visible
          onHide={() => setShowEditResidence(false)}
          residenceList={residenceList}
          setResidenceList={setResidenceList}
          setUserList={setUserList}
          residence={selectedResidence}
          setSelectedResidence={setSelectedResidence}
        />
      )}

      {showVoucher && (
        <Dialog
          header="Comprobantes"
          visible
          onHide={() => setShowVoucher(false)}
          style={{ width: "50vw", height: "100vh" }}
        >
          <InvoicesCard
            residenceSelected={residenceSelected}
            setInvoiceSelected={setInvoiceSelected}
            invoiceSelected={invoiceSelected}
            setisOpenInvoiceModal={setisOpenInvoiceModal}
            getInvoicesByResidential={loadResidences}
            confirmDialog={confirmDialog}
            toast={toast}
            setIsEdit={setIsEdit}
            residentialSelected={residentialSelected}
          />
        </Dialog>
      )}
    </ResidenceInvoiceCardStyled>
  );
};

export default ResidenceInoviceCard;
