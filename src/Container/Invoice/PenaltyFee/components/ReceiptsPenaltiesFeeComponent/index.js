import { Dialog } from "primereact/dialog";
import { ReceiptsPenaltiesFeeComponentStyled } from "./styles";
import { InvoiceServices } from "../../../Invoice.Service";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import ReceipControl from "../../../../../Components/Controls/ReceiptControl";
import EditResidenceModal from "../../../Components/ResidenceInvoiceCard/Components/EditResidenceModal";

export const ReceiptsPenaltiesFeeComponent = ({
  onClose,
  residenceId,
  residentialSelected,
  ownerPropertyName,
}) => {
  const [receiptsPenaltiesFee, setReceiptsPenaltiesFee] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      setLoading(true);
      setError(false);

      const request = {
        searchValue: residenceId,
        onlyPenaltyFee: true,
      };
      const response = await InvoiceServices.getAllInvoice(request);

      if (response.success) {
        setReceiptsPenaltiesFee(response.invoices);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(componentRef.current, {
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = `factura-${selectedReceipt.invoiceNo}.png`;
    link.click();
  };

  const footer = () => (
    <div>
      <Button
        label="Imprimir"
        className="p-button-rounded p-button-success p-button-sm"
        icon="pi pi-print"
        onClick={handlePrint}
      />
      <Button
        label="Descargar"
        className="p-button-rounded p-button-info p-button-sm"
        icon="pi pi-download"
        onClick={handleCaptureClick}
      />
    </div>
  );

  const handleShowReceipt = (receipt) => {
    setSelectedReceipt(receipt);
    setShowReceipt(true);
  };

  return (
    <Dialog
      visible
      onHide={onClose}
      header="Detalles de Facturas"
      style={{ width: "60vw" }}
    >
      <ReceiptsPenaltiesFeeComponentStyled>
        {loading ? (
          <div className="loading-state">
            <p>Cargando facturas...</p>
            <img src="/loading-spinner.gif" alt="Cargando" />
          </div>
        ) : error ? (
          <div className="empty-state">
            <p>Ocurrió un error al cargar las facturas.</p>
          </div>
        ) : receiptsPenaltiesFee.length > 0 ? (
          receiptsPenaltiesFee.map((invoice) => (
            <div key={invoice.id} className="invoice-card">
              <h3>Recibo: {invoice.invoiceNo}</h3>
              <p>
                <strong>Residente:</strong> {invoice.customer}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(invoice.invoiceDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total:</strong> HNL {invoice.total.toFixed(2)}
              </p>
              <button
                className="print-button"
                onClick={() => handleShowReceipt(invoice)}
              >
                Imprimir Recibo
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No se encontraron recibos.</p>
            {/* <img src="/empty.svg" alt="Sin resultados" /> */}
          </div>
        )}
      </ReceiptsPenaltiesFeeComponentStyled>

      {showReceipt && (
        <Dialog visible footer={footer} onHide={() => setShowReceipt(false)}>
          <ReceipControl
            receipType="invoice"
            invoice={{ ...selectedReceipt, remitance: ownerPropertyName }}
            residentialSelected={residentialSelected}
            componentRef={componentRef}
            format="normal"
          />
        </Dialog>
      )}
    </Dialog>
  );
};
