// InvoicePrint.js
import React, { useRef, useState } from "react";
import { InvoicePrintStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import DocumentInvoice from "./DocumentInvoice";
import { useReactToPrint } from "react-to-print";
import { Button } from "primereact/button";
const InvoicePrint = ({
  visible,
  onDismissPrintMenu,
  invoice,
  residentialSelected,
}) => {
  const [format, setFormat] = useState("normal");
  const [viewPreview, setViewPreview] = useState(false);
  const footer = () => {
    return (
      <div>
        <Button
          label="Vista previa"
          icon="pi pi-eye"
          onClick={() => {
            setViewPreview(true);
          }}
        />
      </div>
    );
  };

  return (
    <Dialog
      header="Seleccionar Formato de Impresión"
      visible={visible}
      footer={footer()}
      onHide={() => onDismissPrintMenu()}
    >
      <InvoicePrintStyled>
        <div className="p-field-radiobutton">
          <RadioButton
            inputId="normal"
            name="format"
            value="normal"
            onChange={(e) => setFormat(e.value)}
            checked={format === "normal"}
          />
          <label htmlFor="normal">Normal</label>
        </div>
        <div className="p-field-radiobutton">
          <RadioButton
            inputId="thermal"
            name="format"
            value="thermal"
            onChange={(e) => setFormat(e.value)}
            checked={format === "thermal"}
          />
          <label htmlFor="thermal">Térmico</label>
        </div>
      </InvoicePrintStyled>
      <DocumentInvoice
        visible={viewPreview}
        invoice={invoice}
        format={format}
        onDismiss={() => setViewPreview(false)}
        residentialSelected={residentialSelected}
      />
    </Dialog>
  );
};

export default InvoicePrint;
