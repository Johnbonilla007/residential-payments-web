import React, { useRef } from "react";
import { UserByPermissionModalStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { PermissionServices } from "../../permission.service";
import { Toast } from "primereact/toast";
import { FaRegTrashAlt } from "react-icons/fa";

export const UserByPermissionModal = ({
  permission,
  isOpen,
  onDismiss,
  confirmDialog,
  handleGetPermisionByUser,
}) => {
  
  const toast = useRef(null);
  const deletePermissionByUser = async (user) => {
    const request = {
      id: permission.id,
      userId: user.id,
    };
    const response = await PermissionServices.removeAccessPermissionToUser(
      request
    );
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
        summary: "Exito",
        detail: "Se quito el permiso al usuario con exito",
        life: 3000,
      });
      handleGetPermisionByUser(permission);
      return;
    }
  };

  return (
    <Dialog
      header={`Usuarios con Permiso ${permission?.name}`}
      visible={isOpen}
      onHide={() => onDismiss()}
      style={{ width: "70vw", height: "100vh" }}
    >
      <UserByPermissionModalStyled>
        <Toast ref={toast} />
        {permission?.users?.length > 0 &&
          permission?.users.map((user) => {
            return (
              <div className="item">
                <div className="user">{user.userName}</div>
                <div className="residential">{user.residential}</div>
               
                  <div
                    className="delete"
                    onClick={() => {
                      confirmDialog({
                        message: `¿Quieres eliminar este permiso al usuario: ${user.userName}?`,
                        header: "Advertencia",
                        icon: "pi pi-info-circle",
                        acceptClassName: "p-button-danger",
                        position: "center",
                        accept: async () => {
                          await deletePermissionByUser(user);
                        },
                        reject: () => {},
                      });
                    }}
                  >
                    <FaRegTrashAlt size={16} color="#ff6961" />
                  </div>
                </div>
            
            );
          })}
      </UserByPermissionModalStyled>
    </Dialog>
  );
};
