// ChangePasswordModal.js

import React, { useState } from "react";
import { utils } from "../../Helpers/utils";
import { restClient } from "../../Helpers/restClient";
import { ChangePasswordModalStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { UsersServices } from "../../Container/Users/User/users.service";

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

  return (
    <Dialog visible={isOpen} style={{ minWidth: "20vw" }} onHide={onClose}>
      <ChangePasswordModalStyled>
        <div className="modal-content">
          <h2>Cambiar Contraseña</h2>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={dataUser.password}
            onChange={handlePasswordChange}
          />
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordsMatch && (
            <p className="error">Las contraseñas no coinciden.</p>
          )}
          <Button
            loading={loading}
            onClick={async () => {
              await handleSubmit();
            }}
            label="Cambiar Contraseña"
            className={"p-button-raised p-button-info p-button-sm"}
          />
        </div>
      </ChangePasswordModalStyled>
    </Dialog>
  );
};

export default ChangePasswordModal;
