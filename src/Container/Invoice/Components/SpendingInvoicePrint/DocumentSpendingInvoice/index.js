// DocumentSpendingInvoice.js
import React, { useState } from "react";
import { DocumentSpendingInvoiceStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "primereact/button";
import html2canvas from "html2canvas";
import ReceipControl from "../../../../../Components/Controls/ReceiptControl";
import { confirmDialog } from "primereact/confirmdialog";
import { SignatureComponent } from "../../SignatureComponent";

const DocumentSpendingInvoice = (props) => {
  const { invoice, format, residentialSelected, visible, onDismiss, toast } =
    props;
  const [showSignature, setShowSignature] = useState(false);
  const [showSignatureSaved, setShowSignatureSaved] = useState(false);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(componentRef.current, {
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `factura-${invoice.invoiceNo}.png`;
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
          onClick={() => setShowSignature(true)}
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
      <DocumentSpendingInvoiceStyled>
        <ReceipControl
          receipType={"spending"}
          invoice={{ ...invoice, remitance: residentialSelected?.name }}
          residentialSelected={residentialSelected}
          format={format}
          componentRef={componentRef}
        />
      </DocumentSpendingInvoiceStyled>
      {showSignature && (
        <SignatureComponent
          onClose={() => setShowSignature(false)}
          setShowSignatureSaved={setShowSignatureSaved}
          userId={invoice?.userId}
          toast={toast}
          invoice={invoice}
          canSaveSignature={false}
        />
      )}
    </Dialog>
  );
};

export default DocumentSpendingInvoice;
