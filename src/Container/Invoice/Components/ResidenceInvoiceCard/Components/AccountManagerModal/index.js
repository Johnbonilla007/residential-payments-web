import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { AccountManagerModalStyled } from "./styled";
import { InvoiceServices } from "../../../../Invoice.Service";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { setResidences } from "../../../../reducer";

const AccountManagerModal = ({
  accounts,
  visible,
  onHide,
  residenceList,
  setResidenceList,
  setUserList,
}) => {
  const toast = useRef(null);
  const { residences } = useSelector((state) => state.Invoice);
  const dispatch = useDispatch();
  const handleManagerChange = async (account, value) => {
    await updateManagerStatus(account.id, value);
  };

  const updateManagerStatus = async (id, isManager) => {
    const request = {
      id: id,
      isManager: isManager,
    };

    const response = await InvoiceServices.changeManagerUser(request);
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
    if (response?.success) {
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Asignacion exitosa",
        life: 3000,
      });

      const newResidence = residences.map((residence) => {
        if (residence.residenceNo == response.residence.residenceNo) {
          return response.residence;
        }
        return residence;
      });

      dispatch(setResidences(newResidence));

      const newResidencelist = residenceList.map((residence) => {
        if (residence.residenceNo == response.residence.residenceNo) {
          return response.residence;
        }
        return residence;
      });

      setResidenceList(newResidencelist);
      setUserList(response.residence.accounts);
      return;
    }
  };

  return (
    <Dialog
      header="Manage Accounts"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <Toast ref={toast} />
      <AccountManagerModalStyled>
        <div className="account-list">
          {accounts.map((account, index) => (
            <div key={account.userName} className="account-item">
              <p>
                <strong>Usuario:</strong> {account.userName}
              </p>
              <p>
                <strong>Nombre completo:</strong> {account.fullName}
              </p>
              <div className="manager-checkbox">
                <Checkbox
                  inputId={`manager-${index}`}
                  checked={account.isManager}
                  onChange={(e) => handleManagerChange(account, e.checked)}
                  disabled={account.isManager}
                />
                <label htmlFor={`manager-${index}`} className="checkbox-label">
                  Administrador
                </label>
              </div>
            </div>
          ))}
        </div>
      </AccountManagerModalStyled>
    </Dialog>
  );
};

export default AccountManagerModal;
