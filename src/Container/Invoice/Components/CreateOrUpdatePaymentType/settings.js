import { Checkbox } from "primereact/checkbox";
import { InputsType } from "../../../../Helpers/Constant";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { utils } from "../../../../Helpers/utils";

const paymentIntervals = [
  { key: 0, paymentInterval: "Diario" },
  { key: 1, paymentInterval: "Semanal" },
  { key: 2, paymentInterval: "Quincenal" },
  { key: 3, paymentInterval: "Mensual" },
  { key: 4, paymentInterval: "Bimestral" },
  { key: 5, paymentInterval: "Trimestral" },
  { key: 6, paymentInterval: "Anual" },
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
  }
];

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
          disabled={!utils.hasPermission("EliminarIngresos")}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="warning"
          aria-label="Notification"
          className="p-button p-component p-button-icon-only p-button-outlined p-button-rounded p-button-danger"
          disabled={!utils.hasPermission("EliminarIngresos")}
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
