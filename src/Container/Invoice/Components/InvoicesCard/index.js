import React, { useEffect, useMemo, useState } from "react";

import { InvoiceCardStyled } from "./styled";
import { InvoiceServices } from "../../Invoice.Service";
import { AiFillDelete, AiFillEdit, AiFillPrinter } from "react-icons/ai";
import { FilterControl } from "../../../../Components/Controls/FilterControl";
import { utils } from "../../../../Helpers/utils";
import { getRequestUserInfo } from "../../../../Helpers/restClient";
import InvoicePrint from "../InvoicePrint";
import DocumentInvoice from "../InvoicePrint/DocumentInvoice";

const InvoicesCard = ({
  residenceSelected,
  invoiceSelected,
  setInvoiceSelected,
  setisOpenInvoiceModal,
  confirmDialog,
  toast,
  setIsEdit,
  residentialSelected,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [invoices, setInvoices] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [filterInvoices, setFilterInvoices] = useState("");
  const [showModalPrint, setShowModalPrint] = useState(false);
  const [invoice, setInvoice] = useState(undefined);
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

  const userInfo = useMemo(() => getRequestUserInfo(), []);

  const isReadOnly = useMemo(() => {
    return userInfo.accesses?.some((x) =>
      x?.permissions?.some((y) => y.name === "SoloLectura")
    );
  }, [userInfo]);

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
            {isReadOnly && (
              <AiFillPrinter
                className="edit-icon-invoice"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModalPrint(true);
                  setInvoice(invoice);
                }}
              />
            )}
            {!isReadOnly && (
              <AiFillEdit
                className="edit-icon-invoice"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(invoice);
                }}
              />
            )}
            {IsLastInvoice && !isReadOnly && (
              <AiFillDelete
                color={
                  utils.hasPermission("EliminarTipoDePago") ? "#f44336" : "#ccc"
                }
                onClick={
                  utils.hasPermission("EliminarTipoDePago")
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
          <p>
            <strong>Fecha Factura:</strong>{" "}
            {utils.FormatDate(invoice.invoiceDate)}
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

      {showModalPrint && (
        <DocumentInvoice
          visible
          invoice={invoice}
          format="normal"
          onDismiss={() => setShowModalPrint(false)}
          residentialSelected={residentialSelected}
          toast={toast}
        />
      )}
    </InvoiceCardStyled>
  );
};

export default InvoicesCard;
