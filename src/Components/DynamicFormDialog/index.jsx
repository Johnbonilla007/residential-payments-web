// DynamicFormDialog.js
import React, { useEffect, useState } from "react";
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
import { useIsMobile } from "../../Helpers/useIsMobile";
import { dialogSizing } from "../Controls/dialogStyles";
import StickyActionBar from "../Controls/StickyActionBar";

const DynamicFormDialog = ({
  title,
  fields = [],
  onSubmit,
  mode,
  isOpen,
  onDismiss,
  width,
  itemToEdit,
}) => {
  const [formData, setFormData] = useState(itemToEdit ? itemToEdit : {});
  const isMobile = useIsMobile();

  useEffect(() => {
    setFormData(itemToEdit ? itemToEdit : {});
  }, [itemToEdit, isOpen]);

  const handleChange = (e, fieldName) => {
    const value = e.target ? e.target.value : e.value;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleCheckboxChange = (e, fieldName, relationalValue) => {
    if (relationalValue) {
      setFormData((prev) => ({
        ...prev,
        [relationalValue]: e.checked,
        [fieldName]: e.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.checked,
      }));
    }
  };

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    onDismiss();
  };

  const getEnterKeyHint = (index) =>
    index === fields.length - 1 ? "done" : "next";

  const renderField = (field, index) => {
    const enterKeyHint = field.enterKeyHint || getEnterKeyHint(index);
    const inputMode = field.inputMode;
    const inputType = field.inputType || "text";

    switch (field.type) {
      case "text":
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <InputText
                id={field.fieldName}
                type={inputType}
                inputMode={inputMode}
                enterKeyHint={enterKeyHint}
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
                inputId={field.fieldName}
                value={formData[field.fieldName] || ""}
                onChange={(e) => handleChange(e, field.fieldName)}
                style={{ width: "100%" }}
                placeholder={field.placeholder}
                toggleMask
                pt={{
                  input: {
                    enterKeyHint,
                    autoComplete: "new-password",
                  },
                }}
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
                enterKeyHint={index === fields.length - 1 ? "done" : undefined}
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
                inputId={field.fieldName}
                value={formData[field.fieldName] ?? null}
                onValueChange={(e) => handleChange(e, field.fieldName)}
                mode="decimal"
                useGrouping={false}
                inputMode="decimal"
                pt={{
                  input: {
                    enterKeyHint,
                  },
                }}
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
                inputId={field.fieldName}
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
      case "select": {
        const selectedOption = field.options?.find(
          (option) => option[field.optionValue] === formData[field.fieldName],
        );
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <Dropdown
                inputId={field.fieldName}
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
                    field.fieldName,
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
      }
      case "listbox": {
        const selectedItem = field.options?.find(
          (option) => option[field.optionValue] === formData[field.optionValue],
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
      }
      case "checkbox":
        return (
          <div
            key={field.fieldName}
            className="container-input container-input--checkbox"
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
      case "date": {
        const value = formData[field.fieldName];
        const date = value ? new Date(value) : new Date();
        return (
          <div key={field.fieldName} className="container-input">
            <label htmlFor={field.fieldName}>{field.name}</label>
            <div>
              <Calendar
                inputId={field.fieldName}
                value={date}
                onChange={(e) => handleChange(e, field.fieldName)}
              />
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const sizing = dialogSizing(34, { fullScreenOnMobile: true });
  const dialogProps =
    mode === "panel" && !isMobile
      ? {
          style: {
            width: width || "min(34rem, 90vw)",
            position: "fixed",
            right: 0,
            top: 0,
            height: "100%",
          },
          className: sizing.className,
        }
      : {
          ...sizing,
          style: width && !isMobile ? { ...sizing.style, width } : sizing.style,
        };

  return (
    <Dialog
      header={title}
      visible={isOpen}
      {...dialogProps}
      modal={mode !== "panel" || isMobile}
      onHide={handleClose}
      footer={
        <StickyActionBar inSheet>
          <Button
            type="button"
            className="p-button-outlined p-button-secondary"
            label="Cancelar"
            icon="pi pi-times"
            onClick={onDismiss}
          />
          <Button
            type="button"
            label="Guardar"
            icon="pi pi-save"
            onClick={handleSubmit}
          />
        </StickyActionBar>
      }
    >
      <DynamicFormDialogStyled>
        <form onSubmit={handleSubmit} className="container">
          {fields.map((field, index) => renderField(field, index))}
        </form>
      </DynamicFormDialogStyled>
    </Dialog>
  );
};

export default DynamicFormDialog;
