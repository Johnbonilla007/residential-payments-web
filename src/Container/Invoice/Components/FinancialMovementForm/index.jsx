import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import {
  FaCashRegister,
  FaExchangeAlt,
  FaExternalLinkAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { IoMdHelpCircle, IoMdHelpCircleOutline } from "react-icons/io";
import { FinancialMovementFormStyled } from "./styled";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FinancialMovementServices } from "./FinancialMovement.Service";

const FinancialMovementForm = ({ residentialNo, isOpen, onDismiss, toast }) => {
  const [formData, setFormData] = useState({
    movementDate: "",
    transferNumber: "",
    source: "",
    destination: "",
    amount: "",
    reason: "",
    comments: "",
    residentialNo: residentialNo,
  });

  const sources = [
    { label: "Caja Chica", value: "Cashbox" },
    { label: "Banco", value: "Bank" },
    { label: "Externo", value: "External" },
  ];

  const destinations = [
    { label: "Caja Chica", value: "Cashbox" },
    { label: "Banco", value: "Bank" },
  ];

  const handleDropdownChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const request = {
      financialMovement: formData,
    };

    const response = await FinancialMovementServices.CreateOrUpdate(request);
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
        detail: "Movimiento creada con exito",
        life: 3000,
      });
      onDismiss();
      return;
    }
  };

  const itemTemplate = (option) => (
    <div className="dropdown-item">
      {option.value === "Deposit" && <FaMoneyBillWave className="icon" />}
      {option.value === "Withdrawal" && <FaExchangeAlt className="icon" />}
      {option.value === "Cashbox" && <FaCashRegister className="icon" />}
      {option.value === "Bank" && <AiFillBank className="icon" />}
      {option.value === "External" && <FaExternalLinkAlt className="icon" />}
      {option.label}
    </div>
  );

  return (
    <Dialog
      header="Movimiento Financiero"
      visible={isOpen}
      onHide={() => onDismiss()}
      footer={
        <div className="dialog-footer">
          <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => onDismiss()}
          />
        </div>
      }
    >
      <FinancialMovementFormStyled>
        <div className="form-field">
          <label htmlFor="movementDate">Fecha del Movimiento</label>
          <div className="field-container">
            <Calendar
              id="movementDate"
              name="movementDate"
              value={formData.movementDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="transferNumber">Numero de Deposito o Retiro</label>
          <div className="field-container">
            <InputText
              id="transferNumber"
              name="transferNumber"
              value={formData.transferNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="source">Origen</label>
          <div className="field-container">
            <Dropdown
              id="source"
              value={formData.source}
              options={sources}
              onChange={(e) => handleDropdownChange(e, "source")}
              itemTemplate={itemTemplate}
              placeholder="Seleccione un Origen"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="destination">Destino</label>
          <div className="field-container">
            <Dropdown
              id="destination"
              value={formData.destination}
              options={destinations}
              onChange={(e) => handleDropdownChange(e, "destination")}
              itemTemplate={itemTemplate}
              placeholder="Seleccione un destino"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="amount">Monto</label>
          <div className="field-container">
            <InputNumber
              id="amount"
              name="amount"
              value={formData.amount}
              onValueChange={(e) =>
                handleInputChange({
                  target: { name: "amount", value: e.value },
                })
              }
              mode="decimal"
              minFractionDigits={2}
              maxFractionDigits={5}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="reason">Razón</label>
          <div className="field-container">
            <InputTextarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              autoResize
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="comments">Comentarios</label>
          <div className="field-container">
            <InputTextarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              autoResize
            />
          </div>
        </div>
      </FinancialMovementFormStyled>
    </Dialog>
  );
};

export default FinancialMovementForm;
