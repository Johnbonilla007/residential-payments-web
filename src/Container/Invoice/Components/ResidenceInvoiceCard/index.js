import React, { useEffect, useMemo, useRef, useState } from "react";

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
import InvoicesByUser from "../InvoicesByUser";
import { getRequestUserInfo } from "../../../../Helpers/restClient";
import { Dialog } from "primereact/dialog";
import EditResidenceModal from "./Components/EditResidenceModal";
import { FaPencilAlt } from "react-icons/fa";

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
  const dispatch = useDispatch();
  const { residentialSelected } = useSelector((store) => store.Invoice);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getInvoicesByResidential();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userInfo = useMemo(() => getRequestUserInfo(), []);

  const getInvoicesByResidential = async () => {
    const request = {
      searchValue: residentialSelected.residentialNo,
    };

    let response = await UsersServices.getResidence(request);

    const hasPermissionToSeeAllResidences = utils.hasPermission(
      "VerTodasLasResidencias"
    );
    const accountIds = userInfo.accounts.select((x) => x.id);

    if (!hasPermissionToSeeAllResidences) {
      response.residences = response.residences.filter((x) =>
        accountIds.includes(x.accountId)
      );
    }

    if (response?.success) {
      setResidenceList(response.residences);
      dispatch(setResidences(response.residences));
      return;
    }
  };

  const CardComponent = ({ residence, index }) => {
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const { imageUrl, accounts, name, block, houseNumber } = residence;

    const buttons = [
      {
        label: "Asignar Pago",
        className: "p-button-info",
        condition: utils.hasPermission("AsignarPago"),
        onClick: () => {
          setResidenceSelected(residence);
          setShowAsignPayment(true);
        },
      },
      {
        label: "Ver Comprobantes",
        className: "p-button-primary",
        condition: true,
        onClick: () => {
          setShowVoucher(true);
          setResidenceSelected(residence);
        },
      },
    ];

    const canEditHouse = useMemo(() => {
      return (
        utils.hasPermission("EditarCasa") || utils.hasPermission("EditarMiCasa")
      );
    }, []);

    return (
      <CardComponentStyled key={index}>
        <div className="edit-button">
          <Button
            disabled={!canEditHouse}
            icon={<FaPencilAlt />} // Icono de lápiz
            className="p-button-rounded p-button-secondary"
            onClick={() => {
              setShowEditResidence(true);
              setUserList(residence.accounts);
              setSelectedResidence(residence);
            }}
            aria-label="Editar Casa"
          />
        </div>

        {/* Imagen de la residencia */}
        <div className="residence-image">
          <img
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              setIsImageModalVisible(true);
            }}
            src={
              imageUrl ||
              "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/casa.jpg"
            }
            alt="Descripción de la imagen"
          />
        </div>

        {/* Contenido de la tarjeta */}
        <div className="residence-content">
          <p>
            <strong>Nombre Propietario:</strong>{" "}
            {accounts?.[0]?.fullName || "N/A"}
          </p>
          <p>
            <strong>Nombre:</strong> {name}
          </p>
          <p>
            <strong>Bloque:</strong> {block}
          </p>
          <p>
            <strong>Número de Casa:</strong> {houseNumber}
          </p>
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
              )
          )}
        </div>

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
      </CardComponentStyled>
    );
  };

  return (
    <ResidenceInvoiceCardStyled>
      <Toast ref={toast} />
      {!showInvoice &&
        residenceList.length > 0 &&
        residenceList.map((Residence, index) => (
          <CardComponent residence={Residence} index={index} />
        ))}
      {utils.evaluateFullObjetct(residenceSelected) && showInvoice && (
        <InvoicesCard
          residenceSelected={residenceSelected}
          setInvoiceSelected={setInvoiceSelected}
          invoiceSelected={invoiceSelected}
          setisOpenInvoiceModal={setisOpenInvoiceModal}
          getInvoicesByResidential={getInvoicesByResidential}
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
        // <InvoicesByUser
        //   isOpen={showVoucher}
        //   onDissmis={() => setShowVoucher(false)}
        //   residenceNo={residenceSelected.residenceNo}
        // />

        <Dialog
          header="Comprobantes"
          visible
          onHide={() => setShowVoucher(false)}
          style={{ width: "50vw", height: "100vh" }}
          // footer={renderFooter}
        >
          <InvoicesCard
            residenceSelected={residenceSelected}
            setInvoiceSelected={setInvoiceSelected}
            invoiceSelected={invoiceSelected}
            setisOpenInvoiceModal={setisOpenInvoiceModal}
            getInvoicesByResidential={getInvoicesByResidential}
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
