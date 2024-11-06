// SpendingInvoces.js
import React, { useEffect, useRef, useState } from "react";
import { SpendingInvocesStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { InvoiceServices } from "../../Invoice.Service";
import { getDate } from "../../../../Helpers/FormatDate";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import SpendingInvoicePrint from "../SpendingInvoicePrint";
import { InputText } from "primereact/inputtext";
import { useMemo } from "react";
import { utils } from "../../../../Helpers/utils";
import { Toast } from "primereact/toast";

const SpendingInvoces = ({
  visible,
  onDismiss,
  setIsSpendingInvoiceEdit,
  setSpendingInvoiceSelected,
  setIsOpenSpendingInvoiceModal,
  residentialSelected,
  confirmDialog,
}) => {
  const [spendingInvoices, setSpendingInvoices] = useState([]);
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [filterSpendingInvoice, setFilterSpendingInvoice] =
    useState(spendingInvoices);

  const toast = useRef(null);
  useEffect(() => {
    getSpendingInovies();
  }, []);

  const getSpendingInovies = async () => {
    const response = await InvoiceServices.getAllSpendingInvoice(
      residentialSelected.residentialNo
    );
    if (response.success) {
      setSpendingInvoices(response.spendingInvoices);
      return;
    }
  };

  const deleteSpendingInvoiceSelected = async (invoice) => {
    const response = await InvoiceServices.deleteSpendingInvoice({
      id: invoice.id,
    });
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
      getSpendingInovies();
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Gasto eliminado con exito",
        life: 3000,
      });
    }
  };

  const handleRenderInvoice = (invoice, index) => {
    return (
      <div key={index} className="item-invoice">
        <div className="invoiceno">{invoice.invoiceNo}</div>
        <div>{invoice.vendor}</div>
        <div>{invoice.userCreate}</div>
        <div>{getDate(invoice.invoiceDate)}</div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSpendingInvoiceSelected(invoice);
            setShowPrintMenu(true);
            setSelectedInvoice(invoice);
          }}
        >
          <FaPrint color="#ffc900" />
        </div>
        <div
          onClick={
            utils.hasPermission("EliminarGasto")
              ? () => {
                  confirmDialog({
                    message: "¿Estas seguro que quieres eliminar este gasto?",
                    header: "Advertencia",
                    icon: "pi pi-info-circle",
                    acceptClassName: "p-button-danger",
                    position: "center",
                    accept: async () => {
                      await deleteSpendingInvoiceSelected(invoice);
                    },
                    reject: () => {},
                  });
                }
              : null
          }
        >
          <FaTrash
            color={utils.hasPermission("EliminarGasto") ? "#c94139" : "#ddd"}
          />
        </div>
      </div>
    );
  };

  const handleOnChangeSearch = (event) => {
    const query = event.target.value.toLowerCase();

    if (query === "") {
      setFilterSpendingInvoice(spendingInvoices);
    } else {
      const filtered = spendingInvoices.filter(
        (type) =>
          type.comment?.toLowerCase()?.includes(query) ||
          type.paymentWay?.toLowerCase()?.includes(query) ||
          type.vendor?.toLowerCase()?.includes(query) ||
          type.cost?.toString()?.toLowerCase().includes(query)
      );
      setFilterSpendingInvoice(filtered);
    }
  };

  const itemsToIterate = useMemo(() => {
    if (utils.evaluateArray(filterSpendingInvoice)) {
      return filterSpendingInvoice;
    }

    return spendingInvoices;
  }, [spendingInvoices, filterSpendingInvoice]);

  return (
    <Dialog
      visible={visible}
      onHide={() => onDismiss()}
      style={{ width: "50vw" }}
    >
      <SpendingInvocesStyled>
        <Toast ref={toast} />
        <div>
          <span className="p-float-label">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="Escriba algo para buscar"
                onChange={handleOnChangeSearch}
                // value={searchQuery}
              />
            </span>
          </span>
        </div>
        {utils.evaluateArray(itemsToIterate) &&
          itemsToIterate.map((invoice, index) =>
            handleRenderInvoice(invoice, index)
          )}
        {showPrintMenu && (
          <SpendingInvoicePrint
            visible
            onDismissPrintMenu={() => setShowPrintMenu(false)}
            invoice={selectedInvoice}
            residentialSelected={residentialSelected}
          />
        )}
      </SpendingInvocesStyled>
    </Dialog>
  );
};

export default SpendingInvoces;
