import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef, useState } from "react";
import ImportExcelFileControl from "../../../Components/Controls/ImportExcelFileControl";
import TableControl from "../../../Components/Controls/TableControl";
import { TipoCuentas } from "../../../Helpers/Constant";
import { getRequestUserInfo, restClient } from "../../../Helpers/restClient";
import { utils } from "../../../Helpers/utils";
import { columnsImportUser } from "./setting";
import { ImportUserOptionStyled } from "./stryle";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Messages } from "primereact/messages";
import { UsersServices } from "../User/users.service";

const ImportUserOption = () => {
  const [importToList, setImportToList] = useState([]);
  const [residentialList, setResidentialList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [residentialSelected, setResidentialSelected] = useState(null);
  const [permissionAccount, setPermissionAccount] = useState("");
  const toast = useRef(null);
  const msgs = useRef(null);
  const userInfo = getRequestUserInfo();

  useEffect(() => {
    handleFechtResidential();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleOnchangeResidential = (e) => {
    setResidentialSelected(e.value);
  };

  const handleUplodUsers = async () => {
    setLoading(true);
    const newUserList = importToList.map((item) => {
      return MaterializeUser(item);
    });
    
    const request = {
      users: newUserList,
      residentialId: residentialSelected.id,
    };
    const response = await restClient.httpPost(
      "/security/users/create-massive-user",
      request
    );
    setLoading(false);

    if (response && response.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Usuarios Creados Exitosamente",
        life: 3000,
      });
      if (!utils.isNullOrEmpty(response.validationErrorMessage)) {
        msgs.current.show([
          {
            severity: "warn",
            detail: response.validationErrorMessage,
            sticky: true,
          },
        ]);
      }
    }

    if (response && !response.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
    }
    return;
  };

  const MaterializeUser = (user) => {
    const userMaterialize = {
      user: {
        userName: user.usuario,
        password: user.password,
        residential: residentialSelected.name,
        residentialNo: residentialSelected.residentialNo,
        accounts: [
          {
            fullName: user.nombre,
            email: user.correo,
            phoneNumber: user.telefono,
            isActive: 0,
            block: user.bloque,
            houseNumber: user.casa.toString(),
            residence: user.residencia,
            accountType: TipoCuentas.residente,
            residential: residentialSelected.name,
            residentialNo: residentialSelected.residentialNo,
          },
        ],
      },
    };
    return userMaterialize;
  };
  return (
    <ImportUserOptionStyled>
      <Toast ref={toast} />
      <div className="options">
        <Dropdown
          className="commandbox"
          value={residentialSelected}
          options={residentialList}
          onChange={handleOnchangeResidential}
          optionLabel="name"
          placeholder="Seleccione una Residencial"
        />
        <ImportExcelFileControl
          handleImportUser={(users) => {
            const userList = users.map((item, index) => {
              item.index = index + 1;
              return item;
            });
            setImportToList(userList);
          }}
        />
        {importToList.length > 0 && residentialSelected && (
          <Button
            label="Crear usuarios"
            icon="pi pi-cloud-upload"
            loading={loading}
            onClick={handleUplodUsers}
            className="p-button-raised p-button-info p-button-text"
          />
        )}
      </div>
      <Messages ref={msgs} />
      <div className="table">
        <div
          style={{
            textAlign: "right",
            marginRight: "30px",
            fontSize: "14pt",
            fontWeight: "bold",
          }}
        >
          Total de usuarios: {importToList.length}
        </div>
        <TableControl
          items={importToList}
          title="Usuarios"
          columns={columnsImportUser}
          emptyMessage="No hay usuario importados"
        />
      </div>
    </ImportUserOptionStyled>
  );
};

export default ImportUserOption;
