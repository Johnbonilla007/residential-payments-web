// DocumentInvoice.js
import React from "react";
import { DocumentInvoiceStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "primereact/button";
import html2canvas from "html2canvas";
import InvoiceDocumentNormal from "./InvoiceDocumentNormal";
import InvoiceDocumentThermal from "./InvoiceDocumentThermal";
import { utils } from "../../../../../Helpers/utils";

const DocumentInvoice = (props) => {
  const { invoice, format, residentialSelected, visible, onDismiss } = props;
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
    link.download = `Ingreso-${invoice.block}${invoice.houseNumber}-${utils.FormatDateMonth(invoice.invoiceDate)}.png`;
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
    </Dialog>
  );
};

export default DocumentInvoice;
