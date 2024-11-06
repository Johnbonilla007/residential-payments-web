import { InputText } from "primereact/inputtext";
import { PaymentTypeFormStyled } from "./styled";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export const PaymentTypeForm = (onChange) => (
  <PaymentTypeFormStyled>
    <div>
      <span className="p-float-label">
        <InputText placeholder="Nombre" />
        <label htmlFor="Nombre">Nombre</label>
      </span>
    </div>
    <div>
      <span className="p-float-label">
        <InputText placeholder="Descripción" />
        <label htmlFor="Descripción">Descripción</label>
      </span>
    </div>
    <div>
      <span className="p-float-label">
        <InputText placeholder="Costo" />
        <label htmlFor="Costo">Costo</label>
      </span>
    </div>
   
  </PaymentTypeFormStyled>
);

export const RenderFooter = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    }}
  >
    <Button
      label="Guardar"
      outlined
      className="p-button p-component p-button-outlined"
    />
    <Button
      label="Cancelar"
      severity="danger"
      outlined
      className="p-button p-component p-button-outlined p-button-danger"
    />
  </div>
);
