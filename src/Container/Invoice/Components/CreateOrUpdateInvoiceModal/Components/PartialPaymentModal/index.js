import React, { useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { PartialPaymentModalStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { utils } from "../../../../../../Helpers/utils";

const PartialPaymentModal = ({
  isOpen,
  onDissmis,
  detail,
  paymentTypeList,
  partialPeymentOlds,
  peymentOlds,
  getPartialPayment,
  residentialSelected,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useRef(null);
  const getMothPayment = () => {
    
    let valueToadd = residentialSelected.chargeCurrentMonth ? 0 : 1;
    const payment = paymentTypeList?.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );
    const partialPayment = partialPeymentOlds?.firstOrDefault(
      (x) => x.paymentNo === detail.paymentTypeNo
    );
    if (partialPayment) {
      if (partialPayment.iscompleted) {
        const monthYearString = partialPayment?.month; // "Enero-2023"
        const [monthValue, year] = monthYearString.split("-");
        const monthIndex = utils.getMonthIndex(monthValue);

        const adjustedMonthIndex = (monthIndex + valueToadd) % 12; // Ajusta el índice para reiniciar en enero

        // Incrementa el año si el mes ajustado es enero
        const adjustedYear = (monthIndex - valueToadd < 0) ? parseInt(year) - 1 : year; 
        const month = utils.getMonthName(adjustedMonthIndex);

        return `${month}-${adjustedYear}`;
      }
      return partialPayment?.month;
    }
    const paymentOld = peymentOlds.firstOrDefault(
      (x) => x.paymentTypeNo === payment.paymentTypeNo
    );
    if (paymentOld) {
      const date = new Date(paymentOld.paymentdate);
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const adjustedMonthIndex = (monthIndex - valueToadd + 12) % 12; // Ajusta el índice
      const adjustedYear = (monthIndex - valueToadd < 0) ? parseInt(year) - 1 : year; 
      const month = utils.getMonthName(adjustedMonthIndex);
      return `${month}-${adjustedYear}`;
    }
    const date = new Date(payment.initialPaymentDate);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const adjustedMonthIndex = (monthIndex - valueToadd + 12) % 12; // Ajusta el índice
    const adjustedYear = (monthIndex - valueToadd < 0) ? parseInt(year) - 1 : year; 
    const month = utils.getMonthName(adjustedMonthIndex);
    return `${month}-${adjustedYear}`;
  };

  const getFinalMothPayment = () => {
    let valueToadd = residentialSelected.chargeCurrentMonth ? 0 : 1;
    const partialPayment = partialPeymentOlds?.firstOrDefault(
      (x) => x.paymentNo === detail.paymentTypeNo
    );
    if (partialPayment) {
      return partialPayment.finalMonth;
    }
    const payment = paymentTypeList?.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );

    const date = new Date(payment.initialPaymentDate);
    const paymentDay = date.getDate();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // Los meses son 0-indexados en JavaScript
    const currentDay = currentDate.getDate();
    let resultDate;

    if (currentDay > paymentDay) {
      // Si el día actual es mayor o igual al día de pago, usamos el mes actual
      resultDate = new Date(currentYear, currentMonth, paymentDay);
    } else {
      const adjustedMonthIndex = (currentMonth - valueToadd + 12) % 12;
      // Si el día actual es menor al día de pago, usamos el mes anterior
      resultDate = new Date(currentYear, adjustedMonthIndex, paymentDay);
    }
    const monthIndex = resultDate.getMonth();
    const year = resultDate.getFullYear();
    const adjustedMonthIndex = (monthIndex - valueToadd + 12) % 12; // Ajusta el índice
    const adjustedYear = (monthIndex - valueToadd < 0) ? parseInt(year) - 1 : year; 
    const month = utils.getMonthName(adjustedMonthIndex);
    return `${month}-${adjustedYear}`;
  };

  const [partialPayment, setPartialPayment] = useState({
    paymentNo: detail.paymentTypeNo,
    month: getMothPayment(),
    finalMonth: getFinalMothPayment(),
  });

  const handlePartialPaymentChange = (e, name) => {
    setPartialPayment({ ...partialPayment, [name]: e.value });
  };

  const handleSubmit = () => {
    const payment = paymentTypeList?.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );
    const cost = payment.cost - payment.discount;
    const partialPay = partialPayment.partialPay;
    const partialPaymentsList = [];
    let isCompletePartialPayment = false;

    let remainingPay = partialPay;
    let [monthValueInitial, yearInitial] = partialPayment?.month.split("-");
    yearInitial = parseInt(yearInitial, 10);
    let initialMonthIndex = utils.getMonthIndex(monthValueInitial);
    const paymentPartialPending = partialPeymentOlds?.firstOrDefault(
      (x) => x.paymentNo === partialPayment.paymentNo && x.iscompleted === false
    );

    let payPending =
      paymentPartialPending?.partialPay > 0
        ? cost - paymentPartialPending?.partialPay
        : 0;
    while (remainingPay > 0) {
      const pay =
        payPending > 0
          ? payPending
          : remainingPay >= cost
          ? cost
          : remainingPay;

      const isCompleted =
        payPending > 0 ? remainingPay >= pay : remainingPay >= cost;
      // Determinar el pago actual y ajustar el pendiente y el pago restante
      if (payPending > 0) {
        payPending = Math.max(0, payPending - remainingPay);
      }
      const [monthValue, year] = partialPayment.finalMonth.split("-");
      let finalYear = parseInt(year, 10);
      let finalMonthIndex = utils.getMonthIndex(monthValue);
      isCompletePartialPayment =
      initialMonthIndex === finalMonthIndex && yearInitial === finalYear

      const month =  utils.getMonthName(initialMonthIndex);
      // Agregar el pago parcial a la lista
      partialPaymentsList.push({
        ...partialPayment,
        partialPay: remainingPay > pay ? pay : remainingPay,
        isCompleted: isCompleted,
        iscompletedPartialPayment: isCompletePartialPayment,
        month: `${month}-${yearInitial}`,
        
       
      });

      // Actualizar índices y el pago restante
      initialMonthIndex++;
      if (initialMonthIndex === 12) {
        initialMonthIndex = 0;
        yearInitial++;
      }
      remainingPay -= pay;
      if (isCompletePartialPayment && remainingPay > 0) {
        toast.current.show({
          severity: "warn",
          summary: "Advertencia",
          detail: "La cantidad del pago es mayor a la deuda pendiente",
          life: 3000,
        });
        return;
      }
    }
    getPartialPayment(partialPaymentsList);
  };

  const getParmentType = () => {
    const payment = paymentTypeList?.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );
    return payment?.name || "";
  };

  const getLatePayment = () => {
    const totalMoth = utils.calculateMonthsInRange(
      partialPayment.month,
      partialPayment.finalMonth
    );
    const payment = paymentTypeList?.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );

    const cost = payment.cost - payment.discount;
    let total = cost * totalMoth;

    const paymentPartialPending = partialPeymentOlds?.firstOrDefault(
      (x) => x.paymentNo === partialPayment.paymentNo && x.iscompleted === false
    );
    if (paymentPartialPending) {
      total = total - paymentPartialPending.partialPay;
    }
    return ` ${total}`;
  };
  return (
    <Dialog
      header={"Pago Parcial"}
      visible={isOpen}
      onHide={() => onDissmis()}
      style={{ width: "30vw", height: "60vh" }}
    >
      <PartialPaymentModalStyled>
        <Toast ref={toast} />
        <div className="payment-form">
          <div className="form-field">
            <label htmlFor="paymentNo">Tipo de pago</label>
            <InputText
              id="paymentNo"
              name="paymentNo"
              value={getParmentType()}
              readOnly
            />
          </div>
          <div className="form-field">
            <label htmlFor="month">Deuda desde Mes</label>
            <InputText
              id="month"
              name="month"
              value={partialPayment?.month}
              readOnly
            />
          </div>
          <div className="form-field">
            <label htmlFor="month">Hasta Mes</label>
            <InputText
              id="month"
              name="month"
              value={partialPayment?.finalMonth}
              readOnly
            />
          </div>
          <div>
            <strong>Deuda:</strong>
            <label>{getLatePayment()}</label>
          </div>
          <div className="form-field">
            <label htmlFor="partialPay">Pago Parcial</label>
            <InputNumber
              id="partialPay"
              name="partialPay"
              value={partialPayment?.partialPay}
              onChange={(e) => handlePartialPaymentChange(e, "partialPay")}
            />
          </div>
          <div className="form-field">
            <Button
              label="Guardar"
              className="p-button-success"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </PartialPaymentModalStyled>
    </Dialog>
  );
};

export default PartialPaymentModal;
