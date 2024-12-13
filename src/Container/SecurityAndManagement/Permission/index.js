import React, { useEffect, useRef, useState } from "react";
import { PermissionStyled } from "./styled";
import ListControl from "../../../Components/ListControl";
import Container from "../../../Components/ContainerControl";
import {
  FaPlus,
  FaShieldAlt,
  FaRegTrashAlt,
  FaPen,
  FaUser,
} from "react-icons/fa";
import DynamicFormDialog from "../../../Components/DynamicFormDialog";
import {
  fieldsAsignPermission,
  fieldsPermission,
  fieldsRol,
} from "./dataFactory";
import { Toast } from "primereact/toast";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { utils } from "../../../Helpers/utils";
import { PermissionServices } from "./permission.service";
import { UsersServices } from "../../Users/User/users.service";
import { Button } from "primereact/button";
import { UserByPermissionModal } from "./Components/UserByPermissionModal";
const Permission = () => {
  const [showModalRol, setShowModalRol] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [isEditRol, setIsEditRol] = useState(false);
  const [rolSelected, setRolSelected] = useState({});
  const [permissionSelected, setPermissionSelected] = useState({});
  const [isEditPermission, setIsEditPermission] = useState(false);
  const [showModalPermission, setShowModalPermission] = useState(false);
  const [showModalAsignPermission, setshowModalAsignPermission] =
    useState(false);
  const [permissionList, setPermissionList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userByPermission, setUserByPermission] = useState({});
  const [showModalPermissionByUser, setShowModalPermissionByUser] =
    useState(false);
  const toast = useRef(null);

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoles = async () => {
    const response = await PermissionServices.getAllRol();
    if (response?.success) {
      setRolesList(response.roles);
      if (utils.evaluateFullObjetct(rolSelected)) {
        const newRolSelected = response.roles.find(
          (x) => x.id === rolSelected.id
        );
        if (newRolSelected) {
          setRolSelected({ ...newRolSelected });
        }
      }
    }
  };

  const deleteRol = async (item) => {
    const request = {
      role: { ...item },
    };
    const response = await PermissionServices.removeRol(request);
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
        detail: "Rol eliminado",
        life: 3000,
      });
      getRoles();
      onDismissRol();
      return;
    }
  };
  const editRol = (rol) => {
    setRolSelected(rol);
    setShowModalRol(true);
    setIsEditRol(true);
  };

  const renderItem = (item, index) => {
    return (
      <div className="item-rol" key={index}>
        <div className="title">
          <div
            className="delete"
            onClick={() => {
              confirmDialog({
                message: "¿Quieres eliminar este rol?",
                header: "Advertencia",
                icon: "pi pi-info-circle",
                acceptClassName: "p-button-danger",
                position: "center",
                accept: async () => {
                  await deleteRol(item);
                },
                reject: () => {},
              });
            }}
          >
            <FaRegTrashAlt size={12} color="#ff6961" />
          </div>
          <div>{item.name}</div>
          <div className="edit" onClick={() => editRol(item)}>
            <FaPen size={12} color="#84b6f4" />
          </div>
        </div>
        <div className="description">{item.description}</div>
      </div>
    );
  };
  const commands = [
    {
      label: "Agregar Rol",
      action: () => {
        setShowModalRol(true);
      },
      icon: () => {
        return <FaPlus size={16} color="#84b6f4" />;
      },
    },
    {
      label: "Agregar Permiso",
      action: () => {
        setShowModalPermission(true);
      },
      icon: () => {
        return <FaPlus size={16} color="#84b6f4" />;
      },
    },
    {
      label: "Asignar Permiso",
      action: () => {
        setshowModalAsignPermission(true);
      },
      icon: () => {
        return <FaShieldAlt size={16} color="#84b6f4" />;
      },
    },
  ];

  const handleGetPermisionByUser = async (permission) => {
    const request = {
      searchValue: permission.id,
    };

    const response = await PermissionServices.getAllPermissionWithUsers(
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
      const permision = response.permissions[0];
      setUserByPermission(permision);
      setShowModalPermissionByUser(true);
      return;
    }
  };

  const handleSubmitRol = async (item) => {
    const request = {
      role: { ...item },
    };
    const response = await PermissionServices.createOrUpdateRol(request);
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
        detail: isEditRol ? "Rol editado" : "Rol creado",
        life: 3000,
      });
      getRoles();
      onDismissRol();
      return;
    }
  };

  const handleSubmitAsignPermission = async (item) => {
    
    const request = {
      rolesPermissions: item.permissions.map((x) => {
        return {
          roleId: item.roleId,
          permissionId: x.id,
        };
      }),
      usersIds: userList.map((x) => x.id),
    };

    const response = await PermissionServices.asignPermission(request);
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
        detail: "Permisos asignados",
        life: 3000,
      });

      onDismissAsignPermission();
      return;
    }
  };

  const handleSubmitPermission = async (item) => {
    const request = {
      ...item,
    };
    const response = await PermissionServices.createOrUpdatePermission(request);
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
        detail: isEditPermission ? "Permiso editado" : "Permiso creado",
        life: 3000,
      });
      getRoles();
      onDismissPermission();
      return;
    }
  };

  const onDismissRol = () => {
    setRolSelected({});
    setShowModalRol(false);
  };

  const onDismissPermission = () => {
    setPermissionSelected({});
    setShowModalPermission(false);
  };

  const onDismissAsignPermission = () => {
    setshowModalAsignPermission(false);
  };

  const deletePermission = async (item) => {
    const request = {
      ...item,
    };
    const response = await PermissionServices.removePermission(request);
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
        detail: "Permiso Eliminado",
        life: 3000,
      });
      getRoles();
      onDismissPermission();
      return;
    }
  };
  const editPermission = (item) => {
    setPermissionSelected(item);
    setIsEditPermission(true);
    setShowModalPermission(true);
  };

  const handleRolSelected = (rolId) => {
    const rol = rolesList.firstOrDefault((x) => x.id === rolId);
    if (rol) {
      setPermissionList(rol.permissions);
    }
  };

  const onPressEnter = async (userName) => {
    
    const request = {
      userName: userName,
    };

    const response = await UsersServices.getUser(request);
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
      if (userList.some((x) => x.userName === response.user.userName)) {
        return;
      }
      setUserList([...userList, { ...response.user }]);
      return;
    }
  };

  const itemTemplateUser = (item) => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <label>{item.userName}</label>
        </div>
        <div>
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-text"
            aria-label="Cancel"
            onClick={() => {
              const newUsersList = userList.filter(
                (x) => x.userName !== item.userName
              );
              setUserList(newUsersList);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <Container commands={commands}>
      <PermissionStyled>
        <ConfirmDialog />
        <Toast ref={toast} />
        <ListControl
          items={rolesList}
          searchProperty="name"
          renderItem={renderItem}
          onSelectItem={(rol) => setRolSelected(rol)}
          width={"300px"}
        />
        <div className="main-content-item" style={{ marginLeft: "300px" }}>
          {rolSelected?.permissions &&
            rolSelected?.permissions.length > 0 &&
            rolSelected?.permissions.map((permission, index) => (
              <div className="item-permission" key={index}>
                <div
                  className="delete"
                  onClick={() => {
                    confirmDialog({
                      message: "¿Quieres eliminar este permiso?",
                      header: "Advertencia",
                      icon: "pi pi-info-circle",
                      acceptClassName: "p-button-danger",
                      position: "center",
                      accept: async () => {
                        await deletePermission(permission);
                      },
                      reject: () => {},
                    });
                  }}
                >
                  <FaRegTrashAlt size={16} color="#ff6961" />
                </div>
                <div className="title">{permission.name}</div>
                <div className="description">{permission.description}</div>
                <div
                  className="edit"
                  onClick={async () =>
                    await handleGetPermisionByUser(permission)
                  }
                >
                  <FaUser size={16} color="#77dd77" />
                </div>
                <div
                  className="edit"
                  onClick={() => editPermission(permission)}
                >
                  <FaPen size={16} color="#84b6f4" />
                </div>
              </div>
            ))}
        </div>

        {showModalPermissionByUser && (
          <UserByPermissionModal
            permission={userByPermission}
            isOpen={showModalPermissionByUser}
            onDismiss={() => {
              setShowModalPermissionByUser(false);
            }}
            confirmDialog={confirmDialog}
            handleGetPermisionByUser={handleGetPermisionByUser}
          />
        )}
        {showModalRol && (
          <DynamicFormDialog
            title={isEditRol ? "Editar Rol" : "Crear Rol"}
            fields={fieldsRol}
            onSubmit={handleSubmitRol}
            mode="modal"
            isOpen={showModalRol}
            onDismiss={onDismissRol}
            itemToEdit={rolSelected}
          />
        )}

        {showModalPermission && (
          <DynamicFormDialog
            title={isEditPermission ? "Editar permiso" : "Crear permiso"}
            fields={fieldsPermission(rolesList)}
            onSubmit={handleSubmitPermission}
            mode="modal"
            isOpen={showModalPermission}
            onDismiss={onDismissPermission}
            itemToEdit={permissionSelected}
          />
        )}
        {showModalAsignPermission && (
          <DynamicFormDialog
            title={"Asignar permiso"}
            fields={fieldsAsignPermission(
              rolesList,
              permissionList,
              handleRolSelected,
              onPressEnter,
              userList,
              itemTemplateUser
            )}
            onSubmit={handleSubmitAsignPermission}
            mode="modal"
            isOpen={showModalAsignPermission}
            onDismiss={onDismissAsignPermission}
            itemToEdit={permissionSelected}
          />
        )}
      </PermissionStyled>
    </Container>
  );
};

export default Permission;
