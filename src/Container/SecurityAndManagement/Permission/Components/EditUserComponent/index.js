import { Dialog } from "primereact/dialog";
import { EditUserComponentStyled } from "./styles";
import SearchControl from "../../../../../Components/ListControl/Components";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { PermissionServices } from "../../permission.service";
import { utils } from "../../../../../Helpers/utils";
import TreeControl from "../../../../../Components/Controls/TreeControl";

export const EditUserComponent = ({ onClose, toast }) => {
  const [permissions, setPermissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchPermissionByUser = async (value) => {
    const response = await PermissionServices.getAllPermissionsByUserName(
      value
    );

    setPermissions(response?.select((x) => ({ ...x, id: x.roleId })));
  };

  const materializeAccesses = (accesses) =>
    accesses?.groupBy(
      (r) => r.rolName,
      (item, values) => {
        const permissions = [];
        values.forEach((value) => {
          const permissionsIds = permissions?.select((x) => x.id);

          if (!value.permissions.any((p) => permissionsIds?.includes(p.id))) {
            permissions.push(...value.permissions);
          }
        });

        return {
          rol: item,
          permissions,
        };
      }
    );

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "El módulo se ha eliminado exitosamente",
      detail: message,
      life: 3000,
    });
  };

  const handleDeleteWholeToUser = async (item) => {
    const role = permissions?.firstOrDefault((x) => x.rolName === item.data);

    const request = { userId: role?.userId, id: role?.userId };

    const response = await PermissionServices.removeRoleToUser(request);

    if (response.success) {
      showSuccess();

      const _permissions = permissions.where((x) => x.roleId !== role.roleId);

      setPermissions([..._permissions]);
    }
  };

  const handleDeletePermission = async (item) => {
    const role = permissions?.firstOrDefault((x) => x.rolName === item.data);

    const permission = role?.permissions.firstOrDefault(
      (x) => x.id === item.key
    );

    const request = {
      id: permission?.id,
      userId: role?.userId,
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
        detail: "Se quitó el permiso al usuario con éxito",
        life: 3000,
      });
      role.permissions = role.permissions.where((x) => x.id !== permission.id);
      setPermissions([...permissions]);
      return;
    }
  };
  return (
    <Dialog
      visible
      onHide={onClose}
      header="Accesos Por Usuario"
      style={{ height: 500, width: 500, overflow: "auto" }}
    >
      <EditUserComponentStyled>
        <InputText
          style={{ width: "100%" }}
          placeholder="Buscar por nombre de usuario..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearchPermissionByUser(event.target.value);
            }
          }}
        />
        <TreeControl
          title="accesses"
          style={{ height: "32vh", overflow: "auto" }}
          items={materializeAccesses(permissions)}
          groupName="rol"
          childrenName="permissions"
          childrenProperties={{
            label: "name",
            data: "rol",
            icon: "pi pi-fw pi-shield",
          }}
          filter
          handleDeleteWholeGroup={handleDeleteWholeToUser}
          handleDeleteSubItem={handleDeletePermission}
        />
      </EditUserComponentStyled>
    </Dialog>
  );
};
