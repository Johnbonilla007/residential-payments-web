// InvoicePrint.js
import React from "react";
import DocumentInvoice from "./DocumentInvoice";

const InvoicePrint = ({
  visible,
  onDismissPrintMenu,
  invoice,
  residentialSelected,
}) => {
  return (
    <DocumentInvoice
      visible={visible}
      invoice={invoice}
      format="normal"
      onDismiss={onDismissPrintMenu}
      residentialSelected={residentialSelected}
    />
  );
};

export default InvoicePrint;
