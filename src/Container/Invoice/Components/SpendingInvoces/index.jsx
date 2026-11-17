// SpendingInvoces.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SpendingInvocesStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InvoiceServices } from "../../Invoice.Service";
import { getDate } from "../../../../Helpers/FormatDate";
import SpendingInvoicePrint from "../SpendingInvoicePrint";
import { InputText } from "primereact/inputtext";
import { utils } from "../../../../Helpers/utils";
import { Toast } from "primereact/toast";
import { dialogSizing } from "../../../../Components/Controls/dialogStyles";
import { MobileListSkeleton } from "../../../../Components/Controls/MobileList";
import PageState from "../../../../Components/Controls/PageState";

const PAGE_SIZE = 15;

const SpendingInvoces = ({
  visible,
  onDismiss,
  setSpendingInvoiceSelected,
  residentialSelected,
  confirmDialog,
}) => {
  const [spendingInvoices, setSpendingInvoices] = useState([]);
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const toast = useRef(null);

  const fetchSpendingInvoices = useCallback(
    async ({ page = 1, append = false, term = "" } = {}) => {
      if (!residentialSelected?.residentialNo) return;
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await InvoiceServices.getAllSpendingInvoice(
        residentialSelected.residentialNo,
        {
          pageNumber: page,
          pageSize: PAGE_SIZE,
          searchTerm: term.trim() || undefined,
        },
      );

      setLoading(false);
      setLoadingMore(false);

      if (response?.success) {
        const incoming = response.spendingInvoices || [];
        setSpendingInvoices((prev) =>
          append ? [...prev, ...incoming] : incoming,
        );
        setPageNumber(page);
        setHasMore(Boolean(response.hasMore));
      }
    },
    [residentialSelected?.residentialNo],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchSpendingInvoices({ page: 1, append: false, term: searchQuery });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchQuery, fetchSpendingInvoices]);

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
    fetchSpendingInvoices({ page: 1, append: false, term: searchQuery });
    toast.current.show({
      severity: "success",
      summary: "Exito",
      detail: "Gasto eliminado con exito",
      life: 3000,
    });
  };

  const canDelete = utils.hasPermission("EliminarTipoDeGasto");

  return (
    <Dialog
      header="Recibos de Gastos"
      visible={visible}
      onHide={() => onDismiss()}
      {...dialogSizing(52, { fullScreenOnMobile: true })}
    >
      <SpendingInvocesStyled>
        <Toast ref={toast} />
        <div className="search-sticky">
          <div className="search-box">
            <i className="pi pi-search" aria-hidden="true" />
            <InputText
              type="search"
              value={searchQuery}
              placeholder="Buscar por correlativo, proveedor, usuario..."
              aria-label="Buscar recibos de gastos"
              enterKeyHint="search"
              autoComplete="off"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                aria-label="Limpiar búsqueda"
                onClick={() => setSearchQuery("")}
              >
                <i className="pi pi-times" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <MobileListSkeleton rows={6} />
        ) : spendingInvoices.length === 0 ? (
          <PageState
            icon="pi pi-receipt"
            title="Sin recibos de gastos"
            message={
              searchQuery
                ? "No se encontraron gastos que coincidan con tu búsqueda."
                : "No hay recibos de gastos registrados."
            }
          />
        ) : (
          <div className="cards-list">
            {spendingInvoices.map((invoice, index) => (
              <div key={invoice.id || invoice.invoiceNo || index} className="item-invoice">
                <div className="item-top">
                  <div className="item-top-left">
                    <span className="invoiceno">{invoice.invoiceNo}</span>
                    <span className="item-date">{getDate(invoice.invoiceDate)}</span>
                  </div>
                  {invoice.total !== undefined && invoice.total !== null && (
                    <span className="item-amount">
                      {utils.formateLps(invoice.total)}
                    </span>
                  )}
                </div>

                <div className="item-main">
                  <div className="item-info">
                    <div className="item-vendor">
                      {invoice.vendor || "Sin proveedor"}
                    </div>
                    <div className="item-meta">
                      {[invoice.userCreate, invoice.paymentWay, invoice.comment]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button
                      type="button"
                      className="icon-btn icon-btn--print"
                      aria-label={`Imprimir gasto ${invoice.invoiceNo}`}
                      onClick={() => {
                        setSpendingInvoiceSelected(invoice);
                        setShowPrintMenu(true);
                        setSelectedInvoice(invoice);
                      }}
                    >
                      <i className="pi pi-print" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn--delete"
                      disabled={!canDelete}
                      aria-label={`Eliminar gasto ${invoice.invoiceNo}`}
                      onClick={() => {
                        if (!canDelete) return;
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
                      }}
                    >
                      <i className="pi pi-trash" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <Button
                type="button"
                label="Cargar más"
                loading={loadingMore}
                onClick={() =>
                  fetchSpendingInvoices({
                    page: pageNumber + 1,
                    append: true,
                    term: searchQuery,
                  })
                }
                className="p-button-outlined"
                style={{ width: "100%", minHeight: "44px", marginTop: "4px" }}
              />
            )}
          </div>
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
