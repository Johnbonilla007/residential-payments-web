import { Button } from "primereact/button";
import { utils } from "../../../Helpers/utils";
import { confirmDialog } from "primereact/confirmdialog";
import { InputsType } from "../../../Helpers/Constant";

export const columnsPaymentTypes = (editRow, deleteRow) => [
  {
    name: "Acciones",
    body: (row) => (
      <div style={{ display: "flex", gap: 5 }}>
        <Button
          onClick={() => editRow(row)}
          icon="pi pi-pencil"
          rounded
          outlined
          severity="warning"
          aria-label="Notification"
          className="p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-warning"
          disabled={!utils.hasPermission("EditarTipoDePago")}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="warning"
          aria-label="Notification"
          className="p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-danger"
          disabled={!utils.hasPermission("EliminarTipoDePago")}
          onClick={() => {
            confirmDialog({
              message: "¿Estas seguro que quieres eliminar este pago?",
              header: "Advertencia",
              icon: "pi pi-info-circle",
              acceptClassName: "p-button-danger",
              position: "center",
              accept: async () => {
                await deleteRow(row.id);
              },
              reject: () => {},
            });
          }}
        />
      </div>
    ),
  },
  {
    fieldName: "paymentTypeNo",
    name: "Tipo de Ingreso #",
  },
  {
    fieldName: "name",
    name: "Nombre",
  },
  {
    fieldName: "description",
    name: "Descripción",
  },
  {
    fieldName: "cost",
    name: "Costo",
  },
];

export const fieldsPaymentType = [
  {
    fieldName: "name",
    placeHolder: "Nombre",
    name: "Nombre",
    type: InputsType.text,
    placeholder: "Nombre",
  },
  {
    fieldName: "description",
    placeHolder: "Descripción",
    name: "Descripción",
    type: InputsType.text,
    placeholder: "Descripción",
  },
  {
    fieldName: "cost",
    placeHolder: "Costo",
    name: "Costo",
    type: InputsType.number,
    placeholder: "Costo",
  },
  {
    fieldName: "canBeUseToPenaltyFee",
    placeHolder: "¿Puede utilizarse para multas?",
    name: "¿Puede utilizarse para multas?",
    type: InputsType.checkbox,
  },
  {
    fieldName: "isGeneral",
    placeHolder: "¿Es pago general?",
    name: "¿Es pago general?",
    type: InputsType.checkbox,
  },
];
