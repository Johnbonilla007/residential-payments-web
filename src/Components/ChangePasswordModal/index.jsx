// ChangePasswordModal.js

import React, { useId, useState } from "react";
import { utils } from "../../Helpers/utils";
import { ChangePasswordModalStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { UsersServices } from "../../Container/Users/User/users.service";
import { dialogSizing } from "../Controls/dialogStyles";
import StickyActionBar from "../Controls/StickyActionBar";

const ChangePasswordModal = ({ isOpen, onClose, userSelected, toast }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setDataUser({ ...dataUser, password: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === dataUser.password);
  };

  const handleSubmit = async (e) => {
    
    setLoading(true);
    if (!utils.evaluateFullObjetct(dataUser)) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Porfavor llene los campos",
        life: 3000,
      });
      setLoading(false);
      return;
    }

    if (dataUser.password !== confirmPassword) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Las contraseñas ingresadas deben ser iguales!",
        life: 3000,
      });
      setLoading(false);
      return;
    }

    let request = {
      userName: userSelected.userName,
      password: dataUser.password,
    };

    const response = await UsersServices.UpdatePassword(request);
    setLoading(false);

    if (response?.success) {
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: "Contraseña cambiada con exito",
          life: 3000,
        });
        onClose();
        return;
      }
      if (!response?.success) {
        toast.current.show({
          severity: "warn",
          summary: "Advertencia",
          detail: response.validationErrorMessage,
          life: 3000,
        });
        return;
      }

      toast.current.show({
        severity: "alert",
        summary: "Error",
        detail: "Error de servicio",
        life: 3000,
      });

  };

  const newPassId = useId();
  const confirmPassId = useId();

  return (
    <Dialog
      header="Cambiar Contraseña"
      visible={isOpen}
      {...dialogSizing(28, { fullScreenOnMobile: true })}
      onHide={onClose}
      footer={
        <StickyActionBar inSheet>
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-outlined p-button-secondary"
            onClick={onClose}
          />
          <Button
            type="button"
            loading={loading}
            onClick={async () => {
              await handleSubmit();
            }}
            label="Cambiar Contraseña"
            icon="pi pi-check"
          />
        </StickyActionBar>
      }
    >
      <ChangePasswordModalStyled>
        <div className="modal-content">
          <label htmlFor={newPassId}>Nueva Contraseña</label>
          <input
            id={newPassId}
            type="password"
            autoComplete="new-password"
            enterKeyHint="next"
            value={dataUser.password || ""}
            onChange={handlePasswordChange}
          />
          <label htmlFor={confirmPassId}>Confirmar Contraseña</label>
          <input
            id={confirmPassId}
            type="password"
            autoComplete="new-password"
            enterKeyHint="done"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordsMatch && (
            <p className="error" role="alert">
              Las contraseñas no coinciden.
            </p>
          )}
        </div>
      </ChangePasswordModalStyled>
    </Dialog>
  );
};

export default ChangePasswordModal;
