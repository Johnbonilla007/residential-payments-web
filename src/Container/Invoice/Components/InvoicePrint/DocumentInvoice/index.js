// DocumentInvoice.js
import React, { useState } from "react";
import { DocumentInvoiceStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "primereact/button";
import html2canvas from "html2canvas";
import InvoiceDocumentNormal from "./InvoiceDocumentNormal";
import InvoiceDocumentThermal from "./InvoiceDocumentThermal";
import { utils } from "../../../../../Helpers/utils";
import { SignatureComponent } from "../../SignatureComponent";
import { confirmDialog } from "primereact/confirmdialog";

const DocumentInvoice = (props) => {
  const [showSignature, setShowSignature] = useState(false);
  const [showSignatureSaved, setShowSignatureSaved] = useState(false);
  const { invoice, format, residentialSelected, visible, onDismiss, toast } =
    props;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRenderInvoice = (_invoice) => {
    return (
      <DocumentInvoiceStyled>
        {format === "normal" ? (
          <InvoiceDocumentNormal
            invoice={_invoice}
            residentialSelected={residentialSelected}
            showSignatureSaved={showSignatureSaved}
          />
        ) : (
          <InvoiceDocumentThermal
            invoice={_invoice}
            residentialSelected={residentialSelected}
          />
        )}
      </DocumentInvoiceStyled>
    );
  };

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(componentRef.current, {
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `Ingreso-${invoice.block}${
      invoice.houseNumber
    }-${utils.FormatDateMonth(invoice.invoiceDate)}.png`;
    link.click();
  };
  const footer = () => {
    return (
      <div>
        <Button
          label="Imprimir"
          className="p-button-rounded p-button-success p-button-sm"
          icon="pi pi-print"
          onClick={() => {
            handlePrint();
          }}
        />
        <Button
          label="Firmar"
          className="p-button-rounded p-button-warning p-button-sm"
          icon="pi pi-pencil"
          onClick={() => {
            confirmDialog({
              message: "Ya tienes una firma guardada, ¿deseas reutilizarla?",
              header: "Firma",
              icon: "pi pi-info-circle",
              acceptClassName: "p-button-danger",
              position: "center",
              accept: () => setShowSignatureSaved(true),
              reject: () => {
                setShowSignature(true);
              },
            });
          }}
        />
        <Button
          label="Descargar"
          className="p-button-rounded p-button-info p-button-sm"
          icon="pi pi-download"
          onClick={() => {
            handleCaptureClick();
          }}
        />
      </div>
    );
  };
  return (
    <Dialog visible={visible} footer={footer()} onHide={() => onDismiss()}>
      <div ref={componentRef} style={{ padding: 20 }}>
        {invoice && handleRenderInvoice(invoice)}
      </div>

      {showSignature && (
        <SignatureComponent
          onClose={() => setShowSignature(false)}
          setShowSignatureSaved={setShowSignatureSaved}
          userId={invoice?.userId}
          toast={toast}
          invoice={invoice}
        />
      )}
    </Dialog>
  );
};

export default DocumentInvoice;
