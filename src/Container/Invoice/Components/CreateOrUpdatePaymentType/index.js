/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { CreateOrUpdatePaymentTypeStyled } from "./styled";
import { InvoiceServices } from "../../Invoice.Service";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import TableControl from "../../../../Components/Controls/TableControl";
import { columnsPaymentTypes, fieldsPaymentType } from "./settings";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { utils } from "../../../../Helpers/utils";
import DynamicFormDialog from "../../../../Components/DynamicFormDialog";
import { CreateOrUpdatePaymentTypeService } from "./CreateOrUpdatePaymentType.Service";

export const CreateOrUpdatePaymentType = ({
  isOpen,
  onDissmis,
  residentialSelected,
}) => {
  const [paymentTypes, setpaymentTypes] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const [paymentTypeFields, setPaymentTypeFields] = useState({});
  const [filteredPaymentTypes, setFilteredPaymentTypes] =
    useState(paymentTypes);
  const [searchQuery, setSearchQuery] = useState("");

  const toast = useRef(null);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await InvoiceServices.getPaymentTypes(
      residentialSelected.residentialNo
    );
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
      setpaymentTypes(response.paymentTypes);
      return;
    }
  };

  const handleShowModalForm = () => {
    setShowModalForm(true);
  };

  const handleOnHideForm = () => {
    setShowModalForm(false);
    setPaymentTypeFields({});
  };

  const handleSubmit = async (values) => {
    const request = {
      paymentType: { ...values, residentialNo: residentialSelected.residentialNo, residentialId: residentialSelected.id },
    };

    const response = await CreateOrUpdatePaymentTypeService.createOrUpdate(
      request
    );

    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
    loadData();
    handleOnHideForm();
  };

  const handleEditRow = (item) => {
    setPaymentTypeFields(item);
    setShowModalForm(true);
  };
  const handleDeleteRow = async (id) => {
    const response = await CreateOrUpdatePaymentTypeService.remove(id);

    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
    loadData();
  };

  const handleOnChangeSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredPaymentTypes(paymentTypes);
    } else {
      const filtered = paymentTypes.filter(
        (type) =>
          type.name.toLowerCase().includes(query) ||
          type.description.toLowerCase().includes(query) ||
          type.cost?.toString().toLowerCase().includes(query)
      );
      setFilteredPaymentTypes(filtered);
    }
  };

  return (
    <Dialog
      header={"Tipos de Ingreso"}
      visible={isOpen}
      onHide={() => onDissmis()}
      style={{ width: "60vw", height: "80vh" }}
    >
      <Toast ref={toast} />
      <CreateOrUpdatePaymentTypeStyled>
        <div className="header-payment-type">
          <div>
            <span className="p-float-label">
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  placeholder="Escriba algo para buscar"
                  onChange={handleOnChangeSearch}
                  value={searchQuery}
                />
              </span>
            </span>
          </div>
          <Button
            outlined
            label="Nuevo"
            className="p-button-raised p-button-info"
            onClick={handleShowModalForm}
            icon={PrimeIcons.PLUS}
          />
        </div>
        <TableControl
          items={
            utils.evaluateArray(filteredPaymentTypes)
              ? filteredPaymentTypes
              : paymentTypes
          }
          columns={columnsPaymentTypes(handleEditRow, handleDeleteRow)}
          emptyMessage="No hay tipos de Ingreso por mostrar"
        />
      </CreateOrUpdatePaymentTypeStyled>
      {/* <PaymentTypeForm onChange={handleOnChangeForm} /> */}
      {showModalForm && (
        <DynamicFormDialog
          title={
            utils.evaluateFullObjetct(paymentTypeFields)
              ? "Editando Tipo de Ingreso"
              : "Creando Tipo de Ingreso"
          }
          itemToEdit={paymentTypeFields}
          fields={fieldsPaymentType}
          isOpen
          onDismiss={handleOnHideForm}
          onSubmit={handleSubmit}
        />
      )}
    </Dialog>
  );
};
