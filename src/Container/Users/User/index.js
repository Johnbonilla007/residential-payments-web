/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActionButtonsStyled, UsersStyled } from "./styled";
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
import { FaCloudUploadAlt, FaUserPlus } from "react-icons/fa";
import DynamicFormDialog from "../../../Components/DynamicFormDialog";
import { UsersServices } from "./users.service";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useDispatch, useSelector } from "react-redux";
import { ResidenceComponent } from "../Residences";

const Users = () => {
  const [residenceList, setResidenceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [permissionAccount, setPermissionAccount] = useState("");
  const [userSelected, setUserSelected] = useState({});
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [openModalPass, setOpenModalPass] = useState(false);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [filters, setFilters] = useState({
    fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residence: { value: null, matchMode: FilterMatchMode.CONTAINS },
    houseNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    block: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isActive: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [showResidences, setShowResidences] = useState(false);
  const toast = useRef(null);
  const userInfo = getRequestUserInfo();
  const { residentialSelected, residentials } = useSelector(
    (store) => store.Invoice
  );
  const residentialList = residentials;

  useEffect(() => {
    if (utils.evaluateFullObjetct(residentialSelected)) {
      handleGetUsers();
    }
  }, [residentialSelected]);

  const filterFields = [
    "fullName",
    "userName",
    "residence",
    "houseNumber",
    "block",
    "isActive",
    "email",
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
      // handleFechtResidential();
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

  const handleOnchangeResidential = () => {
    // setResidentialSelected(e.value);
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
    const response = await UsersServices.getAccounts(request);

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

      const userList = response.accounts.map((item, index) => {
        item.creationDate = `${getDate(item.creationDate)} - ${getHours(
          item.creationDate
        )}`;
        item.index = index + 1;
        return item;
      });
      const accounts = userList
        .groupBy((x) => x.userName)
        .select((x, index) => {
          return {
            creationDate: `${getDate(x.creationDate)} - ${getHours(
              x.creationDate
            )}`,
            index: index + 1,
            ...x.values.firstOrDefault(),
            detail: x.values.where(
              (y) => y.id !== x.values.firstOrDefault().id
            ),
          };
        });

      setDataUsers(accounts);
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

  const onRenderActions = (row) => {
    return (
      <ActionButtonsStyled>
        <Button
          icon={"pi pi-pencil"}
          loading={loading}
          onClick={() => {
            setUserSelected(row);
            setShowModalCreateUser(true);
            setIsEditUser(true);
          }}
          className={"p-button-raised p-button-warning p-button-sm"}
        />
        {row.accountType !== "ADMON" && (
          <Button
            icon={"pi pi-key"}
            loading={loading}
            onClick={(event) => {
              event.preventDefault();
              setOpenModalPass(true);
              setUserSelected(row);
            }}
            className={"p-button-raised p-button-info p-button-sm"}
          />
        )}

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

        <Button
          icon={"pi pi-eye"}
          loading={loading}
          onClick={(event) => {
            event.preventDefault();
            setUserSelected(row);
            setShowResidences(true);
          }}
          className={"p-button-rounded p-button-info"}
        >
          Ver Propiedades
        </Button>
      </ActionButtonsStyled>
    );
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

  const validateRequest = (request, residence) => {
    const { user } = request;
    const { accounts } = user;

    const fieldsToValidate = {
      userName: user.userName,
      password: user.password,
      residentialId: residentialSelected?.id || 1,
      residenceId: residence.id,
      gender: user.gender,
      fullName: accounts[0].fullName,
      email: accounts[0].email,
      phoneNumber: accounts[0].phoneNumber,
      accountType: "RSD",
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

  const accesses = useMemo(() => {
    if (utils.evaluateFullObjetct(userInfo)) {
      let accesses = userInfo.accesses;
      return accesses;
    }
    return [];
  }, [userInfo]);

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
    {
      label: "Refrescar",
      action: handleGetUsers,
      icon: () => {
        return <FaCloudUploadAlt size={16} color="#84b6f4" />;
      },
      disabled: !utils.hasPermission("CrearUsuario"),
    },
  ];

  const tryCreateResidence = async (item) => {
    const request = {
      residence: {
        ...item,
        residentialId: residentialSelected?.id,
        residentialName: residentialSelected?.name,
        residentialNo: residentialSelected?.residentialNo,
        accountId: userSelected.id,
      },
    };
    const response = await UsersServices.createOrUpdateResidence(request);

    if (response.success) {
      return response.residence;
    }

    return undefined;
  };

  const updateAccount = async (item) => {
    const request = { gender: item.gender, account: { ...item } };
    request.account.detail = undefined;

    const response = await UsersServices.createOrUpdateAccount(request);

    if (response.success) {
      if (utils.evaluateArray(item.detail)) {
        for (const detail of item.detail) {
          detail.fullName = item.fullName;
          detail.email = item.email;
          detail.phoneNumber = item.phoneNumber;
          detail.phoneNumber = item.phoneNumber;
          detail.gender = item.gender;
          detail.userName = item.userName;
          await updateAccount(detail);
        }
      }

      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Usuario creado",
        life: 3000,
      });
    }
  };

  const handleSubmitUser = async (item) => {
    if (isEditUser) {
      await updateAccount(item);

      return;
    }
    const residence = await tryCreateResidence(item);
    if (!residence) return;

    const request = {
      user: {
        id: item.id,
        userName: item.userName,
        password: item.password,
        residential: residentialSelected?.name,
        residentialNo: residentialSelected?.residentialNo,
        gender: item.gender,
        accounts: [
          {
            userName: item.userName,
            fullName: item.fullName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            residence: residence?.name,
            accountType: "RSD",
            residential: residentialSelected?.name,
            residenceId: residence.id,
            residentialId: residentialSelected?.id,
            allowEmergy: false,
            block: residence?.block,
            houseNumber: residence?.houseNumber,
            residentialNo: residentialSelected?.residentialNo,
            residenceNo: residence.residenceNo,
          },
        ],
      },
    };

    const isValid = validateRequest(request, residence);
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
    handleGetUsers();
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

  const canShowDropdownResidentials = useMemo(() => {
    if (utils.evaluateArray(accesses)) {
      return accesses?.some((x) =>
        x?.permissions?.some((y) => y.name === "SuperRoot")
      );
    }

    return false;
  }, [accesses]);

  return (
    <Container commands={commands}>
      <UsersStyled>
        <ConfirmDialog />
        <Toast ref={toast} />
        <div className="container">
          <div className="options">
            {canShowDropdownResidentials ? (
              <Dropdown
                className="commandbox"
                value={residentialSelected}
                options={residentialList}
                onChange={handleOnchangeResidential}
                optionLabel="name"
                placeholder="Seleccione una Residencial"
              />
            ) : (
              <h2>{residentialSelected.name}</h2>
            )}

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
                columns={columnsReport(onRenderActiveButton, onRenderActions)}
                emptyMessage="No hay visitas en esta fecha"
                isExportExcel={userInfo.userName !== "monitoreo2024"}
                fileName={`Usuarios ${residentialSelected.name}`}
              />
            </div>
          )}
        </div>

        {openModalPass && (
          <ChangePasswordModal
            isOpen
            onClose={() => {
              setOpenModalPass(false);
              setFilters({ ...filters });
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
      {showResidences && (
        <ResidenceComponent
          accountId={userSelected.id}
          onClose={() => {
            setShowResidences(false);
            setUserSelected({});
          }}
          toast={toast}
          userSelected={userSelected}
        />
      )}
    </Container>
  );
};

export default Users;
