import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReportSumarizePdf from "../../IncomeAndSpendingReportSummarized/ReportSumarizePdf";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import ReportDetailPdf from "../../IncomesAndSpendingReportDetailed/ReportDetailPdf";
import ReportPendingPdf from "../../PendingPaymentReport/ReportPendingPdf";

export const ReportPdfControl = ({
  visible,
  reportType,
  propsSumarize,
  propsDetail,
  propsPending,
  onDismiss,
  title,
}) => {
  const componentRef = useRef();

  // react-to-print v3: uses contentRef instead of content callback
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: title,
    pageStyle: `
      @page {
        size: letter portrait;
        margin: 0.5cm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const footer = () => {
    return (
      <div>
        <Button
          label="Imprimir"
          icon="pi pi-print"
          onClick={() => handlePrint()}
        />
      </div>
    );
  };

  return (
    <Dialog
      header={title}
      visible={visible}
      footer={footer()}
      onHide={() => onDismiss()}
      style={{ width: "90vw" }}
    >
      {reportType === "reportSumarize" && (
        <ReportSumarizePdf
          componentRef={componentRef}
          reportSumarize={propsSumarize?.reportSumarize}
          residentialSelected={propsSumarize?.residentialSelected}
          dateReport={propsSumarize?.dateReport}
          filters={propsSumarize?.filters}
        />
      )}
      {reportType === "reportDetail" && (
        <ReportDetailPdf
          componentRef={componentRef}
          reportDetail={propsDetail?.reportDetail}
          residentialSelected={propsDetail?.residentialSelected}
          filters={propsDetail?.filters}
          residences={propsDetail?.residences}
        />
      )}
      {reportType === "reportPending" && (
        <ReportPendingPdf
          componentRef={componentRef}
          reportPending={propsPending?.reportPending}
          residentialSelected={propsPending?.residentialSelected}
          filters={propsPending?.filters}
        />
      )}
    </Dialog>
  );
};
