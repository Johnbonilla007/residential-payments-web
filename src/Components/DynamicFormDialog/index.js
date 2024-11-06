// DynamicFormDialog.js
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { DynamicFormDialogStyled } from "./styled";
import { Password } from "primereact/password";
import { InputMask } from "primereact/inputmask";
import { ListBox } from "primereact/listbox";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";

const DynamicFormDialog = ({
  title,
  fields,
  onSubmit,
  mode,
  isOpen,
  onDismiss,
  width,
  itemToEdit,
}) => {
  const [formData, setFormData] = useState(itemToEdit ? itemToEdit : {});

  const handleChange = (e, fieldName) => {
    const value = e.target ? e.target.value : e.value;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleCheckboxChange = (e, fieldName, relationalValue) => {
    if (relationalValue) {
      setFormData({
        ...formData,
        [relationalValue]: e.checked,
        [fieldName]: e.checked,
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.checked,
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleClose = () => {
    onDismiss();
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <InputText
                id={field.fieldName}
                value={formData[field.fieldName] || ""}
                onChange={(e) => handleChange(e, field.fieldName)}
                style={{ width: "100%" }}
                placeholder={field.placeholder}
                keyfilter={field.keyfilter}
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && field?.onPressEnter) {
                    field.onPressEnter(e.target.value);
                  }
                }}
              />
            </div>
          </div>
        );
      case "password":
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <Password
                id={field.fieldName}
                value={formData[field.fieldName] || ""}
                onChange={(e) => handleChange(e, field.fieldName)}
                style={{ width: "100%" }}
                placeholder={field.placeholder}
              />
            </div>
          </div>
        );
      case "textarea":
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <InputTextarea
                id={field.fieldName}
                value={formData[field.fieldName] || ""}
                onChange={(e) => handleChange(e, field.fieldName)}
                rows={3}
                cols={20}
              />
            </div>
          </div>
        );
      case "number":
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <InputNumber
                id={field.fieldName}
                value={formData[field.fieldName] || ""}
                onValueChange={(e) => handleChange(e, field.fieldName)}
                mode="decimal"
                seGrouping={false}
                inputId="withoutgrouping"
              />
            </div>
          </div>
        );
      case "multiselect":
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <MultiSelect
                value={formData[field.fieldName]}
                options={field.options}
                onChange={(e) => {
                  handleChange(e, field.fieldName);
                }}
                optionLabel={field.optionLabel}
                placeholder="Seleccione una opción..."
                filter
                className="multiselect-custom"
              />
            </div>
          </div>
        );
      case "select":
        const selectedOption = field.options.find(
          (option) => option[field.optionValue] === formData[field.fieldName]
        );
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <Dropdown
                id={field.fieldName}
                value={selectedOption}
                options={field.options}
                onChange={(e) => {
                  if (field.fetchDataByItem) {
                    field.fetchDataByItem(e.target.value[field.targetValue]);
                  }
                  handleChange(
                    {
                      value: e.target.value[field.targetValue],
                    },
                    field.fieldName
                  );
                }}
                placeholder="Seleccione una opción..."
                optionLabel={field.optionLabel}
                itemTemplate={
                  field.itemTemplate
                    ? (option) => field.itemTemplate(option)
                    : (option) => <span>{option[field.optionLabel]}</span>
                }
                valueTemplate={(option) => (
                  <span>
                    {option
                      ? option[field.optionLabel]
                      : "Seleccione una opción..."}
                  </span>
                )}
              />
            </div>
          </div>
        );
      case "listbox":
        const selectedItem = field.options.find(
          (option) => option[field.optionValue] === formData[field.optionValue]
        );
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <ListBox
                value={selectedItem}
                options={field.options}
                optionLabel={field.optionLabel}
                style={{ width: "100%" }}
                listStyle={{ maxHeight: "250px" }}
                itemTemplate={(item) => {
                  if (field.itemTemplate) {
                    return field.itemTemplate(item);
                  }
                  return (
                    <div>
                      <div>{item[field.fieldName]}</div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        );
      case "checkbox":
        return (
          <div
            key={field.fieldName}
            className="container-input"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Checkbox
              inputId={field.fieldName}
              checked={formData[field.fieldName] || false}
              onChange={(e) => {
                handleCheckboxChange(e, field.fieldName, field.relationalValue);
              }}
            />
            <label htmlFor={field.fieldName}>{field.name}</label>
          </div>
        );
      case "mask":
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <InputMask
                id={field.fieldName}
                mask={field.mask}
                value={formData[field.fieldName] || ""}
                placeholder={field.mask}
                onChange={(e) => handleChange(e, field.fieldName)}
              />
            </div>
          </div>
        );
      case "date":
        const value = formData[field.fieldName];
        const date = new Date(value);
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <Calendar
                value={date}
                onChange={(e) => handleChange(e, field.fieldName)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      header={title}
      visible={isOpen}
      style={
        mode === "panel"
          ? {
              width: width ? width : "30vw",
              position: "fixed",
              right: 0,
              top: 0,
              height: "100%",
            }
          : { width: width ? width : "20vw" }
      }
      modal={mode !== "panel"}
      onHide={handleClose}
      footer={() => (
        <div className="footer">
          <Button
            className="p-button-raised p-button-danger p-button-text p-button-sm"
            label="Cancelar"
            icon="pi pi-times"
            onClick={onDismiss}
          />
          <Button
            className="p-button-raised p-button-info p-button-text p-button-sm"
            label="Guardar"
            icon="pi pi-save"
            onClick={handleSubmit}
          />
        </div>
      )}
    >
      <DynamicFormDialogStyled>
        <div className="container">
          {fields.map((field) => renderField(field))}
        </div>
      </DynamicFormDialogStyled>
    </Dialog>
  );
};

export default DynamicFormDialog;
