import React, { useEffect, useMemo, useRef, useState } from "react";

import { ResidenceInvoiceCardStyled } from "./styled";
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

    const hasPermission = userInfo.accesses?.some((x) =>
      x?.permissions?.some((y) => y.name === "VerMisResidencias")
    );

    const accountIds = userInfo.accounts.select((x) => x.id);

    if (hasPermission) {
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

  const CardComponent = (residence, index) => {
    return (
      <div className="residence-card" key={index}>
        <div className="residence-image">
          <img
            src={
              residence.imageUrl ||
              "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/casa.jpg"
            }
            alt="Descripción de la imagen"
            width={20}
          />
        </div>
        <div className="residence-content">
          <p>
            <strong>Nombre del Propietario:</strong>{" "}
            {residence.accounts?.firstOrDefault()?.fullName}
          </p>
          <p>
            <strong>Nombre:</strong> {residence.name}
          </p>
          <p>
            <strong>Bloque:</strong> {residence.block}
          </p>
          <p>
            <strong>Número de Casa:</strong> {residence.houseNumber}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", // Permite que los botones se envuelvan
            justifyContent: "center",
            alignItems: "center", // Centra los botones verticalmente
            height: "100%", // Ajusta a la altura del contenedor
            width: "100%", // Ajusta al ancho del contenedor
          }}
        >
          {utils.hasPermission("AsignarPago") && (
            <div style={{ flexGrow: 1, minWidth: "120px", padding: 3 }}>
              <Button
                label="Asignar Pago"
                className="p-button-raised p-button-info"
                onClick={() => {
                  setResidenceSelected(residence);
                  setShowAsignPayment(true);
                }}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          )}
          {/* <div style={{ flexGrow: 1, minWidth: "120px" }}>
            <Button
              label="Ver recibos de Pago"
              className="p-button-raised p-button-success"
              onClick={() => {
                setShowInvoice(true);
                setResidenceSelected(residence);
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </div> */}
          {/* <div style={{ flexGrow: 1, minWidth: "120px" }}>
            <Button
              label="Usuarios"
              className="p-button-raised p-button-primary"
              onClick={() => {
                setShowUsers(true);
                setUserList(residence.accounts);
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </div> */}
          <div style={{ flexGrow: 1, minWidth: "120px", padding: 3 }}>
            <Button
              label="Ver Comprobantes"
              className="p-button-raised p-button-primary"
              onClick={() => {
                setShowVoucher(true);
                setResidenceSelected(residence);
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div style={{ flexGrow: 1, minWidth: "120px", padding: 3 }}>
            <Button
              label="Editar Casa"
              className="p-button-raised p-button-warning"
              onClick={() => {
                setShowEditResidence(true);
                setUserList(residence.accounts);
                setSelectedResidence(residence);
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <ResidenceInvoiceCardStyled>
      <Toast ref={toast} />
      {!showInvoice &&
        residenceList.length > 0 &&
        residenceList.map((Residence, index) =>
          CardComponent(Residence, index)
        )}
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
