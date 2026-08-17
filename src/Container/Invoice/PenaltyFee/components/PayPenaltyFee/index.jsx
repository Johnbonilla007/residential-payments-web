/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import { PayPenaltyFeeStyled } from "./styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { InvoiceServices } from "../../../Invoice.Service";
import { Dropdown } from "primereact/dropdown";
import { utils } from "../../../../../Helpers/utils";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { PenaltyFeeService } from "../../PenaltyFee.Service";
import ReceipControl from "../../../../../Components/Controls/ReceiptControl";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";

export const PayPenaltyFee = ({
  isPaymentModalVisible,
  setIsPaymentModalVisible,
  selectedPenalty,
  residenceNo,
  accountId,
  block,
  houseNumber,
  ownerPropertyName,
  residenceId,
  paymentTypeList,
  toast,
  updatePenaltiesFee,
}) => {
  const { residentialSelected } = useSelector((store) => store.Invoice);
  const [paymentWays, setPaymentWays] = useState([]);
  const [receipt, setReceipt] = useState({
    depositNo: "N/A",
    paymentWay: "Efectivo",
  });
  const [dateInvoice, setDateInvoice] = useState(
    !utils.isNullOrEmpty(receipt?.invoiceDate)
      ? new Date(receipt?.invoiceDate)
      : new Date()
  );
  const [showReceipt, setShowReceipt] = useState(false);
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
    link.download = `factura-${receipt.invoiceNo}.png`;
    link.click();
  };

  useEffect(() => {
    updateComments();
  }, [selectedPenalty]);

  const updateComments = () => {
    if (selectedPenalty) {
      const { name } = getPaymentTypeValues();
      const comments = `Pago por concepto de multa ${name} código #${selectedPenalty.penaltyFeeNo}`;
      setReceipt({ ...receipt, comments, total: selectedPenalty.amount });
    }
  };

  useEffect(() => {
    loadPaymentWays();
  }, []);

  const loadPaymentWays = async () => {
    const response = await InvoiceServices.getAllPaymentWay();

    if (response?.success) {
      setPaymentWays(response.paymentWays);
      return;
    }
  };
  const isInvoiceDisabled = useMemo(
    () => !utils.isNullOrEmpty(receipt?.invoiceNo),
    [receipt.invoiceNo]
  );

  const getPaymentTypeValues = () => {
    const { name, cost } = paymentTypeList.firstOrDefault(
      (x) => x.paymentTypeNo === selectedPenalty.paymentTypeNo
    );

    return { cost, name };
  };

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Exito",
      detail: message,
      life: 3000,
    });
  };

  const handleSubmit = async () => {
    const { name, cost } = getPaymentTypeValues();
    const request = {
      isPenaltyFee: true,
      invoice: {
        ...receipt,
        invoiceDate: dateInvoice,
        residentialNo: residentialSelected.residentialNo,
        residenceNo,
        accountId,
        block,
        houseNumber,
        customer: ownerPropertyName,
        residenceId,
        residentialId: residentialSelected.id,
        invoiceDetail: [
          {
            paymentTypeNo: selectedPenalty.paymentTypeNo,
            description: name,
            quantity: selectedPenalty.quantity,
            amount: selectedPenalty.amount,
            cost,
            paymentDate: dateInvoice,
            isPartialMothPay: false,
            amountPartial: 0,
          },
        ],
      },
    };

    let response = await InvoiceServices.createOrUpdateInvoice(request);

    if (response?.success) {
      setReceipt(response.invoice);
      showSuccess("El recibo ha sido creado con exito!!");

      const request = {
        penaltyFee: {
          id: selectedPenalty.id,
          penaltyFeeNo: selectedPenalty.penaltyFeeNo,
          wasPaid: true,
        },
      };
      response = await PenaltyFeeService.executePaymentPenaltyFee(request);

      if (response.success) {
        showSuccess(response.message);
        setShowReceipt(true);
        updatePenaltiesFee({ ...selectedPenalty, wasPaid: true });
      }

      return;
    }
  };

  const handleOnHideModal = () => {
    setReceipt({});
    updateComments();
    setIsPaymentModalVisible(false);
    setShowReceipt(false);
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

  const handleOnChangePaymentWay = ({ value }) => {
    setReceipt({
      ...receipt,
      paymentWay: value,
      depositNo: value !== "Efectivo" ? "" : receipt.depositNo,
    });
  };

  return (
    <Dialog
      visible={isPaymentModalVisible}
      onHide={handleOnHideModal}
      header={`Pagar Penalidad #${selectedPenalty?.penaltyFeeNo}`}
      style={{ textAlign: "center" }}
      footer={
        <Button
          disabled={isInvoiceDisabled}
          className="p-button-raised p-button-success p-button-text p-button-sm"
          label="Guardar"
          icon="pi pi-save"
          onClick={handleSubmit}
        />
      }
    >
      <PayPenaltyFeeStyled>
        {/* Payment Method Dropdown */}
        <div className="input-group">
          <label>Método de Pago</label>
          <Dropdown
            className="dropdown"
            value={receipt.paymentWay}
            options={paymentWays}
            onChange={handleOnChangePaymentWay}
            optionLabel="name"
            optionValue="name"
            placeholder="Seleccione el método de pago"
            disabled={isInvoiceDisabled}
          />
        </div>

        {/* Deposit Number */}
        {receipt.paymentWay && receipt.paymentWay !== "Efectivo" && (
          <div className="input-group">
            <label>{`${receipt?.paymentWay} No`}</label>
            <InputText
              id="depositNo"
              value={receipt.depositNo}
              onChange={(e) =>
                setReceipt({ ...receipt, depositNo: e.target.value })
              }
              disabled={isInvoiceDisabled}
            />
          </div>
        )}

        {/* Calendar for Date */}
        <div className="input-group">
          <label>Fecha</label>
          <Calendar
            id="invoiceDate"
            value={dateInvoice}
            onChange={(e) => setDateInvoice(e.value)}
            showIcon
            className="calendar"
            disabled={isInvoiceDisabled}
          />
        </div>

        {/* Total Amount */}
        <div className="form-group">
          <span>Monto Total:</span>
          <span>{selectedPenalty?.amount || "0.00"}</span>
        </div>

        {/* Comments/Concept */}
        <div className="input-group">
          <label>Concepto</label>
          <InputTextarea
            id="comments"
            value={receipt?.comments}
            readOnly
            style={{ width: "100%" }}
          />
        </div>
      </PayPenaltyFeeStyled>

      {showReceipt && (
        <Dialog visible footer={footer} onHide={handleOnHideModal}>
          <ReceipControl
            receipType="invoice"
            invoice={{ ...receipt, remitance: ownerPropertyName }}
            residentialSelected={residentialSelected}
            componentRef={componentRef}
            format="normal"
          />
        </Dialog>
      )}
    </Dialog>
  );
};
