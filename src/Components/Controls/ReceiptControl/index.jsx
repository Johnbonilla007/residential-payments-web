import React from "react";
import InvoiceDocumentNormal from "./Normal";
import InvoiceDocumentThermal from "./Thermical";

const ReceipControl = (props) => {
  const { format = "normal", receipType, componentRef } = props;

  return (
    <div style={{ padding: 10 }} ref={componentRef}>
      {format === "normal" && (
        <InvoiceDocumentNormal
          ref={componentRef}
          {...props}
          receipType={receipType}
        />
      )}
      {format === "thermal" && (
        <InvoiceDocumentThermal
          ref={componentRef}
          {...props}
          receipType={receipType}
        />
      )}
    </div>
  );
};

export default ReceipControl;
