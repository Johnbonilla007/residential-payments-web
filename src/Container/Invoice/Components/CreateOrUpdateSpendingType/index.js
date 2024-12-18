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
import { CreateOrUpdateSpendingTypeService } from "./CreateOrUpdateSpendingType.Service";
import { useSelector } from "react-redux";

export const CreateOrUpdateSpendingType = ({ isOpen, onDissmis }) => {
  const [spendingTypes, setSpendingTypes] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const [spendingTypeFields, setSpendingTypeFields] = useState({});
  const [filteredSpendingTypes, setFilteredSpendingTypes] =
    useState(spendingTypes);
  const [searchQuery, setSearchQuery] = useState("");
  const { residentialSelected } = useSelector((store) => store.Invoice);

  const toast = useRef(null);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await CreateOrUpdateSpendingTypeService.getSpendingTypes(
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
      setSpendingTypes(response.spendingTypes);
      return;
    }
  };

  const handleShowModalForm = () => {
    setShowModalForm(true);
  };

  const handleOnHideForm = () => {
    setShowModalForm(false);
    setSpendingTypeFields({});
  };

  const handleSubmit = async (values) => {
    const request = {
      spendingType: {
        ...values,
        residentialId: residentialSelected.id,
        residentialNo: residentialSelected.residentialNo,
      },
    };

    const response = await CreateOrUpdateSpendingTypeService.createOrUpdate(
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
    setSpendingTypeFields(item);
    setShowModalForm(true);
  };
  const handleDeleteRow = async (id) => {
    const response = await CreateOrUpdateSpendingTypeService.remove(id);

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
      setFilteredSpendingTypes(spendingTypes);
    } else {
      const filtered = spendingTypes.filter(
        (type) =>
          type.name.toLowerCase().includes(query) ||
          type.description.toLowerCase().includes(query) ||
          type.cost?.toString().toLowerCase().includes(query)
      );
      setFilteredSpendingTypes(filtered);
    }
  };

  return (
    <Dialog
      header={"Tipos de Gastos"}
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
            utils.evaluateArray(filteredSpendingTypes)
              ? filteredSpendingTypes
              : spendingTypes
          }
          columns={columnsPaymentTypes(handleEditRow, handleDeleteRow)}
          emptyMessage="No hay tipos de pago por mostrar"
        />
      </CreateOrUpdatePaymentTypeStyled>
      {showModalForm && (
        <DynamicFormDialog
          title={
            utils.evaluateFullObjetct(spendingTypeFields)
              ? "Editando Tipo de Gasto"
              : "Creando Tipo de Gasto"
          }
          itemToEdit={spendingTypeFields}
          fields={fieldsPaymentType}
          isOpen
          onDismiss={handleOnHideForm}
          onSubmit={handleSubmit}
        />
      )}
    </Dialog>
  );
};
