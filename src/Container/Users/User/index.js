/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { UsersStyled } from "./styled";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { getRequestUserInfo, restClient } from "../../../Helpers/restClient";
import { utils } from "../../../Helpers/utils";
import { FilterMatchMode } from "primereact/api";
import TableControl from "../../../Components/Controls/TableControl";
import { columnsReport, fieldsUsers } from "./setting";
import { TipoCuentas } from "../../../Helpers/Constant";
import { Toast } from "primereact/toast";
import { getDate, getHours } from "../../../Helpers/FormatDate";
import ChangePasswordModal from "../../../Components/ChangePasswordModal";
import Container from "../../../Components/ContainerControl";
import { FaUserPlus } from "react-icons/fa";
import DynamicFormDialog from "../../../Components/DynamicFormDialog";
import { UsersServices } from "./users.service";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

const Users = () => {
  const [residentialSelected, setResidentialSelected] = useState(null);
  const [residentialList, setResidentialList] = useState([]);
  const [residenceList, setResidenceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [permissionAccount, setPermissionAccount] = useState("");
  const [userSelected, setUserSelected] = useState();
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);

  const [openModalPass, setOpenModalPass] = useState(false);
  const [filters, setFilters] = useState({
    fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residence: { value: null, matchMode: FilterMatchMode.CONTAINS },
    houseNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    block: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isActive: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef(null);
  const userInfo = getRequestUserInfo();

  useEffect(() => {
    if (utils.evaluateFullObjetct(residentialSelected)) {
      handleGetUsers();
    }
  }, [residentialSelected]);

  useEffect(() => {
    handleFechtResidential();
  }, []);

  const handleFechtResidential = async () => {
    if (utils.evaluateFullObjetct(userInfo)) {
      const account = userInfo.accounts[0];
      const permission = account.accountType;
      setPermissionAccount(permission);
      if (
        permission === TipoCuentas.administrador ||
        utils.hasPermission("VerTodasLasResidenciales")
      ) {
        const response = await UsersServices.getAllResidential({});
        if (response?.success) {
          setResidentialList(response.residentials);
          if (utils.evaluateFullObjetct(residentialSelected)) {
            const residential = response.residentials.find(
              (x) => x.residentialId === residentialSelected.residentialId
            );
            setResidentialSelected(residential);
          }
        }
        return;
      }

      const request = {
        searchValue: userInfo.residentialNo,
      };
      const response = await restClient.httpGet(
        "/security/residentials/get-residentials",
        request
      );
      if (response.success) {
        setResidentialList([response.residential]);
        setResidentialSelected(response.residential);
      }
    }
  };

  const filterFields = [
    "fullName",
    "userName",
    "residence",
    "houseNumber",
    "block",
    "isActive",
  ];

  const handleDisableUser = async (row) => {
    const account = dataUsers.firstOrDefault(
      (x) => x.userName === row.userName
    );
    const request = {
      account: { id: account.id },
      isActive: !row.isActive,
    };

    setLoading(true);
    const response = await UsersServices.disableUser(request);
    setLoading(false);
    if (response?.success) {
      handleGetUsers();
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
    }
    return;
  };

  const handleDisableEmergyResidential = async (residential) => {
    const request = {
      residentialId: residential.residentialId,
      allowEmergy: residential.allowEmergy ? 0 : 1,
    };

    setLoading(true);
    const response = await restClient.httpPost(
      "/residential/allow-or-disable-emergy",
      request
    );
    setLoading(false);

    if (response && response.exito === 1) {
      handleFechtResidential();
    }
    if (response && response.exito === 0) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.message,
        life: 3000,
      });
    }
    return;
  };

  const handleDisableEmergy = async (row) => {
    const account = dataUsers.firstOrDefault(
      (x) => x.userName === row.userName
    );
    const request = {
      account: { id: account.id, allowEmergy: !row.allowEmergy },
    };

    setLoading(true);
    const response = await UsersServices.allowOrDisableEmergy(request);
    setLoading(false);
    if (response?.success) {
      handleGetUsers();
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "alert",
        summary: "Error",
        detail: "Error de servicio",
        life: 3000,
      });
    }

    return;
  };

  const handleEnableOrDisableFrequent = async (row) => {
    const account = dataUsers.firstOrDefault(
      (x) => x.userName === row.userName
    );
    const request = {
      account: {
        id: account.id,
        allowRegisterFrequentVisit: !row.allowRegisterFrequentVisit,
      },
    };

    setLoading(true);
    const response = await UsersServices.allowOrDisableRegisterFrequentVisit(
      request
    );
    setLoading(false);
    if (response?.success) {
      handleGetUsers();
      return;
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "alert",
        summary: "Error",
        detail: "Error de servicio",
        life: 3000,
      });
    }

    return;
  };

  const handleOnchangeResidential = (e) => {
    setResidentialSelected(e.value);
  };

  const handleGetUsers = async () => {
    if (!utils.evaluateFullObjetct(residentialSelected)) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Seleccione una residencial",
        life: 3000,
      });
      return;
    }

    const request = {
      searchValue: residentialSelected.residentialNo,
    };

    setLoading(true);
    const response = await UsersServices.getAccount(request);

    setLoading(false);

    if (response?.success) {
      if (response.accounts.length <= 0) {
        toast.current.show({
          severity: "warn",
          summary: "Advertencia",
          detail: response.message,
          life: 3000,
        });
        return;
      }
      const UserList = response.accounts.map((item, index) => {
        item.creationDate = `${getDate(item.creationDate)} - ${getHours(
          item.creationDate
        )}`;
        item.index = index + 1;
        return item;
      });
      setDataUsers(UserList);
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.message,
        life: 3000,
      });
    }
    return;
  };
  const onRenderActiveButton = (row) => {
    return (
      <Button
        icon={row.isActive ? "pi pi-check" : "pi pi-times"}
        loading={loading}
        onClick={async () => {
          await handleDisableUser(row);
        }}
        className={
          row.isActive
            ? "p-button-rounded p-button-success"
            : "p-button-rounded p-button-danger"
        }
      />
    );
  };

  const onRenderEmergyButton = (row) => {
    return (
      <Button
        icon={row.allowEmergy ? "pi pi-check" : "pi pi-times"}
        loading={loading}
        onClick={async () => {
          await handleDisableEmergy(row);
        }}
        className={
          row.allowEmergy
            ? "p-button-rounded p-button-success"
            : "p-button-rounded p-button-danger"
        }
      />
    );
  };

  const onRenderFrequentVisitButton = (row) => {
    return (
      <Button
        icon={row.allowRegisterFrequentVisit ? "pi pi-check" : "pi pi-times"}
        loading={loading}
        onClick={async () => {
          await handleEnableOrDisableFrequent(row);
        }}
        className={
          row.allowRegisterFrequentVisit
            ? "p-button-rounded p-button-success"
            : "p-button-rounded p-button-danger"
        }
      />
    );
  };

  const handlefreeDevice = async (user) => {
    const account = dataUsers.firstOrDefault(
      (x) => x.userName === user.userName
    );

    let request = {
      usuarioId: account.userId,
    };

    const response = await UsersServices.freeDevice(request);

    if (response?.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Dispostivo Liberado",
        life: 3000,
      });
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

  const handleDeleteUser = async (user) => {
    const account = dataUsers.firstOrDefault(
      (x) => x.userName === user.userName
    );

    let request = {
      userId: account.userId,
    };

    const response = await UsersServices.RemoveUser(request);

    if (response?.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Cuenta Eliminada",
        life: 3000,
      });
      await handleGetUsers();
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

  const validateRequest = (request) => {
    const { user } = request;
    const { accounts } = user;

    const fieldsToValidate = {
      userName: user.userName,
      password: user.password,
      residentialId: accounts[0].residentialId,
      residenceId: accounts[0].residenceId,
      gender: user.gender,
      fullName: accounts[0].fullName,
      email: accounts[0].email,
      phoneNumber: accounts[0].phoneNumber,
      accountType: accounts[0].accountType,
    };

    for (const [field, value] of Object.entries(fieldsToValidate)) {
      const campos = fieldsUsers(
        residentialList,
        isEditUser,
        getResidenceByResidential,
        residenceList
      );

      let input = campos.firstOrDefault((x) => x.fieldName === field);
      if (!value) {
        toast.current.show({
          severity: "warn",
          summary: "Advertencia",
          detail: `El campo ${input?.name} está vacío.`,
          life: 3000,
        });
        return false; // Si hay un campo vacío, no continuar
      }
    }

    return true; // Todos los campos están llenos
  };

  const onRenderChanguePass = (row) => {
    if (row.accountType !== "ADMON")
      return (
        <Button
          icon={"pi pi-key"}
          loading={loading}
          onClick={() => {
            setOpenModalPass(true);
            setUserSelected(row);
          }}
          className={"p-button-raised p-button-info p-button-sm"}
        />
      );
  };
  const onRenderFreeDevice = (row) => {
    return (
      <Button
        icon={"pi pi-tablet"}
        loading={loading}
        onClick={async () => {
          confirmDialog({
            message: `¿Estas seguro que quieres liberar el dispositivo de ${row.userName}?`,
            header: "Advertencia",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            position: "center",
            accept: async () => {
              await handlefreeDevice(row);
            },
            reject: () => {},
          });
        }}
        label="Liberar dispositivo"
        className={"p-button-raised p-button-info p-button-sm"}
      />
    );
  };

  const onRenderDeleteUser = (row) => {
    return (
      <Button
        icon={"pi pi-trash"}
        loading={loading}
        onClick={async () => {
          confirmDialog({
            message: `¿Estas seguro que quieres eliminar al usuario ${row.userName}?`,
            header: "Advertencia",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            position: "center",
            accept: async () => {
              await handleDeleteUser(row);
            },
            reject: () => {},
          });
        }}
        className={"p-button-raised p-button-danger p-button-sm"}
      />
    );
  };

  const commands = [
    {
      label: "Crear Usuario",
      action: () => {
        setShowModalCreateUser(true);
      },
      icon: () => {
        return <FaUserPlus size={16} color="#84b6f4" />;
      },
      disabled: !utils.hasPermission("CrearUsuario"),
    },
  ];

  const handleSubmitUser = async (item) => {
    const residential = residentialList.firstOrDefault(
      (i) => i.id === item.residentialId
    );
    const residence = residenceList.firstOrDefault(
      (i) => i.id === item.residenceId
    );
    const request = {
      user: {
        id: item.id,
        userName: item.userName,
        password: item.password,
        residential: residential?.name,
        gender: item.gender,
        accounts: [
          {
            fullName: item.fullName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            residence: residence?.name,
            accountType: item.accountType,
            residential: residential?.name,
            residenceId: item.residenceId,
            residentialId: item.residentialId,
            allowEmergy: false,
            block: residence?.block,
            houseNumber: residence?.houseNumber,
          },
        ],
      },
    };

    const isValid = validateRequest(request);
    if (!isValid) {
      return;
    }

    const response = await UsersServices.createOrUpdateUser(request);

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
        detail: "Usuario creado",
        life: 3000,
      });

      onDismissUser();
      return;
    }
  };
  const onDismissUser = () => {
    setShowModalCreateUser(false);
    setUserSelected({});
    setIsEditUser(false);
  };

  const getResidenceByResidential = async (id) => {
    const request = {
      searchValue: id,
    };

    const response = await UsersServices.getResidence(request);

    if (response?.success) {
      setResidenceList(response.residences);
      return;
    }
  };
  return (
    <Container commands={commands}>
      <UsersStyled>
        <ConfirmDialog />
        <Toast ref={toast} />
        <div className="container">
          <div className="options">
            <Dropdown
              className="commandbox"
              value={residentialSelected}
              options={residentialList}
              onChange={handleOnchangeResidential}
              optionLabel="name"
              placeholder="Seleccione una Residencial"
            />

            {permissionAccount === TipoCuentas.administrador &&
              utils.evaluateFullObjetct(residentialSelected) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4 style={{ marginRight: "20px" }}>
                    Permitir Emergencia a la residencial
                  </h4>
                  <Button
                    icon={
                      residentialSelected.allowEmergy
                        ? "pi pi-check"
                        : "pi pi-times"
                    }
                    loading={loading}
                    onClick={async () => {
                      await handleDisableEmergyResidential(residentialSelected);
                    }}
                    className={
                      residentialSelected.allowEmergy
                        ? "p-button-rounded p-button-success"
                        : "p-button-rounded p-button-danger"
                    }
                  />
                </div>
              )}
          </div>
          {utils.evaluateFullObjetct(residentialSelected) && (
            <div className="table">
              <div
                style={{
                  textAlign: "right",
                  marginRight: "30px",
                  fontSize: "14pt",
                  fontWeight: "bold",
                }}
              >
                Total de usuarios: {dataUsers.length}
              </div>

              <TableControl
                items={dataUsers}
                title="Lista de Usuarios"
                filter={filters}
                rows={5}
                setFilter={setFilters}
                filterFields={filterFields}
                columns={columnsReport(
                  onRenderActiveButton,
                  permissionAccount,
                  onRenderEmergyButton,
                  onRenderFreeDevice,
                  onRenderChanguePass,
                  onRenderDeleteUser,
                  onRenderFrequentVisitButton
                )}
                emptyMessage="No hay visitas en esta fecha"
                isExportExcel={userInfo.userName !== "monitoreo2024"}
                fileName={`Usuarios ${residentialSelected.name}`}
              />
            </div>
          )}
        </div>

        {openModalPass && (
          <ChangePasswordModal
            isOpen={openModalPass}
            onClose={() => {
              setOpenModalPass(false);
            }}
            userSelected={userSelected}
            toast={toast}
          />
        )}

        {showModalCreateUser && (
          <DynamicFormDialog
            title={isEditUser ? "Editar Usuario" : "Crear Usuario"}
            fields={fieldsUsers(
              residentialList,
              isEditUser,
              getResidenceByResidential,
              residenceList
            )}
            onSubmit={handleSubmitUser}
            mode="modal"
            isOpen={showModalCreateUser}
            onDismiss={onDismissUser}
            itemToEdit={userSelected}
          />
        )}
      </UsersStyled>
    </Container>
  );
};

export default Users;
