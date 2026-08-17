import { Dropdown } from "primereact/dropdown";
import React, { useRef, useState } from "react";
import ImportExcelFileControl from "../../../Components/Controls/ImportExcelFileControl";
import TableControl from "../../../Components/Controls/TableControl";
import { TipoCuentas } from "../../../Helpers/Constant";
import { restClient } from "../../../Helpers/restClient";
import { utils } from "../../../Helpers/utils";
import { columnsImportUser } from "./setting";
import { ImportUserOptionStyled } from "./stryle";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Messages } from "primereact/messages";
import Container from "../../../Components/ContainerControl";
import { useDispatch, useSelector } from "react-redux";
import { setResidentialSelected } from "../../Invoice/reducer";

const ImportUserOption = () => {
  const [importToList, setImportToList] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const msgs = useRef(null);
  const { residentialSelected, residentials } = useSelector(
    (store) => store.Invoice
  );
  const residentialList = residentials;
  const dispatch = useDispatch();

  const handleOnchangeResidential = (e) => {
    dispatch(setResidentialSelected(e.value));
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
    <Container>
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
    </Container>
  );
};

export default ImportUserOption;
