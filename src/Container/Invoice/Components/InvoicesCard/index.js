import React, { useEffect, useState } from "react";

import { InvoiceCardStyled } from "./styled";
import { InvoiceServices } from "../../Invoice.Service";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FilterControl } from "../../../../Components/Controls/FilterControl";
import { utils } from "../../../../Helpers/utils";

const InvoicesCard = ({
  residenceSelected,
  invoiceSelected,
  setInvoiceSelected,
  setisOpenInvoiceModal,
  confirmDialog,
  toast,
  setIsEdit,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [invoices, setInvoices] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [filterInvoices, setFilterInvoices] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getInvoicesByResidential();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getInvoicesByResidential = async () => {
    const request = {
      searchValue: residenceSelected.id,
    };
    const response = await InvoiceServices.getAllInvoice(request);
    if (response?.success) {
      setInvoiceList(response.invoices);
      setInvoices(response.invoices);
    }
  };

  const onEdit = (invoice) => {
    setInvoiceSelected(invoice);
    setIsEdit(true);
    setisOpenInvoiceModal(true);
  };

  const deleteInvoice = async (item) => {
    const request = {
      id: item.id,
    };
    const response = await InvoiceServices.removeInvoice(request);
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
        detail: "Factura eliminado",
        life: 3000,
      });
      setInvoiceSelected({});
      getInvoicesByResidential();
      return;
    }
  };
  const onDelete = (invoice) => {
    confirmDialog({
      message: "¿Quieres eliminar esta factura?",
      header: "Advertencia",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      position: "center",
      accept: async () => {
        await deleteInvoice(invoice);
      },
      reject: () => {},
    });
  };

  const CardComponent = (invoice, index) => {
    const IsLastInvoice = index === 0;
    return (
      <div
        className="invoice-card"
        onClick={() => {
          setInvoiceSelected(invoice);
        }}
      >
        <div className="invoice-header">
          <h3>Factura NO: {invoice.invoiceNo}</h3>

          <div className="card-actions">
            <AiFillEdit
              className="edit-icon-invoice"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(invoice);
              }}
            />
            {IsLastInvoice && (
              <AiFillDelete
                color={
                  utils.hasPermission("EliminarIngresos") ? "#f44336" : "#ccc"
                }
                onClick={
                  utils.hasPermission("EliminarIngresos")
                    ? (e) => {
                        e.stopPropagation();
                        onDelete(invoice);
                      }
                    : null
                }
              />
            )}
          </div>
        </div>
        <div className="invoice-content">
          <p>
            <strong>Depósito:</strong> {invoice.depositNo}
          </p>
          <p>
            <strong>Cliente:</strong> {invoice.customer}
          </p>
          <p>
            <strong>Bloque:</strong> {invoice.block}
          </p>
          <p>
            <strong>Número de Casa:</strong> {invoice.houseNumber}
          </p>
        </div>
      </div>
    );
  };
  return (
    <InvoiceCardStyled>
      <div>
        <FilterControl
          items={invoices}
          filter={filterInvoices}
          setFilter={(value) => {
            setFilterInvoices(value);
          }}
          propertyFilter={["invoiceNo", "depositNo", "comments"]}
          onChange={(items) => {
            setInvoiceList(items);
          }}
        />
      </div>

      <div className="container-invoice">
        {invoiceList.length > 0 &&
          invoiceList.map((invoice, index) => CardComponent(invoice, index))}
      </div>
    </InvoiceCardStyled>
  );
};

export default InvoicesCard;
