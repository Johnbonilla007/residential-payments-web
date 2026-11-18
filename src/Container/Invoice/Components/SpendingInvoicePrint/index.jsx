// SpendingInvoicePrint.js
import React from "react";
import DocumentInvoice from "./DocumentSpendingInvoice";

const SpendingInvoicePrint = ({
  visible,
  onDismissPrintMenu,
  invoice,
  residentialSelected,
  toast,
}) => {
  return (
    <DocumentInvoice
      visible={visible}
      invoice={invoice}
      format="normal"
      onDismiss={onDismissPrintMenu}
      residentialSelected={residentialSelected}
      toast={toast}
    />
  );
};

export default SpendingInvoicePrint;
