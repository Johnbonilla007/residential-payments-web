import React, { useEffect, useRef, useState } from "react";

import { ResidenceInvoiceCardStyled } from "./styled";
import { UsersServices } from "../../../Users/User/users.service";
import { utils } from "../../../../Helpers/utils";
import InvoicesCard from "../InvoicesCard";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { AsignPaymentModal } from "./Components/AsignPaymentModal";
import { useDispatch } from "react-redux";
import { setResidences } from "../../reducer";
import AccountManagerModal from "./Components/AccountManagerModal";
import InvoicesByUser from "../InvoicesByUser";

const ResidenceInoviceCard = ({
  residentialSelected,
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
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getInvoicesByResidential();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInvoicesByResidential = async () => {
    const request = {
      searchValue: residentialSelected.residentialNo,
    };
    const response = await UsersServices.getResidence(request);

    if (response?.success) {
      setResidenceList(response.residences);
      dispatch(setResidences(response.residences));
      return;
    }
  };

  const CardComponent = (residence, index) => {
    return (
      <div className="residence-card">
        <div className="residence-image">
          <img
            src="https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/casa.jpg"
            alt="Descripción de la imagen"
            width={20}
          />
        </div>
        <div className="residence-content">
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
            gap: "20px",
            justifyContent: "center",
            alignItems: "center", // Centra los botones verticalmente
            height: "100%", // Ajusta a la altura del contenedor
            width: "100%", // Ajusta al ancho del contenedor
          }}
        >
          <div style={{ flexGrow: 1, minWidth: "120px" }}>
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
          <div style={{ flexGrow: 1, minWidth: "120px" }}>
            <Button
              label="Ver recibos de Pago"
              className="p-button-raised p-button-success"
              onClick={() => {
                setShowInvoice(true);
                setResidenceSelected(residence);
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div style={{ flexGrow: 1, minWidth: "120px" }}>
            <Button
              label="Usuarios"
              className="p-button-raised p-button-primary"
              onClick={() => {
                setShowUsers(true);
                setUserList(residence.accounts);
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div style={{ flexGrow: 1, minWidth: "120px" }}>
            <Button
              label="Comprobantes"
              className="p-button-raised p-button-primary"
              onClick={() => {
                setShowVoucher(true);
                setResidenceSelected(residence);
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

      {showVoucher && (
        <InvoicesByUser
          isOpen={showVoucher}
          onDissmis={() => setShowVoucher(false)}
          residenceNo={residenceSelected.residenceNo}
        />
      )}
    </ResidenceInvoiceCardStyled>
  );
};

export default ResidenceInoviceCard;
