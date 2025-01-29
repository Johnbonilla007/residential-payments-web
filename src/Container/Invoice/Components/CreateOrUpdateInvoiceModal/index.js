/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { CreateOrUpdateInvoiceModalStyled } from "./styled";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { utils } from "../../../../Helpers/utils";
import { InvoiceServices } from "../../Invoice.Service";
import CustomDropdown from "./Components/CustomDropdown";
import PartialPaymentModal from "./Components/PartialPaymentModal";
import InvoicePrint from "../InvoicePrint";
import { getMonth } from "../../../../Helpers/FormatDate";
import { Checkbox } from "primereact/checkbox";
import { addDays, addMonths, getDay, getMonth as getFcMonth } from "date-fns";

const CreateOrUpdateInvoiceModal = ({
  isOpen,
  onDissmis,
  invoiceSelected,
  residenceList,
  residentialSelected,
}) => {
  const [invoice, setInvoice] = useState(
    utils.evaluateFullObjetct(invoiceSelected)
      ? invoiceSelected
      : {
          invoiceNo: "",
          depositNo: "",
          comments: "",
          descriptionEx: "",
          invoiceDate: null,
          customer: null,
          invoiceDetail: [],
        }
  );
  const [paymentTypeList, setPaymentTypeList] = useState([]);
  const [detail, setDetail] = useState({
    paymentTypeNo: null,
    description: "",
    descriptionEx: "",
    quantity: 0,
    cost: 0,
    amount: 0,
    amountEx: 0,
    amountPartial: 0,
    isPartialMothPay: false,
  });
  const [customers, setCustomers] = useState([]);
  const [peymentOlds, setPeymentOlds] = useState([]);
  const [partialPeymentOlds, setPartialPeymentOlds] = useState([]);
  const [dateInvoice, setDateInvoice] = useState(
    !utils.isNullOrEmpty(invoiceSelected?.invoiceDate)
      ? new Date(invoiceSelected?.invoiceDate)
      : new Date()
  );
  const [showPartialPayment, setShowPartialPayment] = useState(false);
  const [paymentWays, setPaymentWays] = useState([]);
  const [showPrintMenu, setShowPrintMenu] = useState(false);

  useEffect(() => {
    loadPaymentTypeList();
  }, [residentialSelected]);

  const loadPaymentTypeList = async () => {
    const request = { searchValue: residentialSelected.residentialNo };

    const response = await InvoiceServices.getPaymentTypes(request);

    if (response?.paymentTypes) {
      setPaymentTypeList(
        response.paymentTypes?.where((x) => !x.canBeUseToPenaltyFee)
      );
    }
  };
  useEffect(() => {
    if (utils.evaluateFullObjetct(residenceList)) {
      const customersList = residenceList
        .filter(
          (item) =>
            item.accounts !== null &&
            item.accounts !== undefined &&
            utils.evaluateArray(item.accounts)
        )
        .map((item) => {
          const account =
            item?.accounts?.find((x) => x.isManager) || item?.accounts[0];
          return {
            fullName: account?.fullName,
            block: account?.block,
            houseNumber: account?.houseNumber,
            residenceId: item.id,
            residenceNo: item.residenceNo,
          };
        });

      setCustomers(customersList);
    }
  }, [residenceList]);

  useEffect(() => {
    getPaymentWay();
  }, []);

  const getPaymentWay = async () => {
    const response = await InvoiceServices.getAllPaymentWay({});
    if (response?.success) {
      setPaymentWays(response.paymentWays);
      return;
    }
  };

  const formatter = new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleDetermineMonth = (detail, newDatePayment, isPartialPayment) => {
    const invoiceDetailOldSelected = peymentOlds.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );

    let paymentDate = newDatePayment;

    if (isPartialPayment) {
      if (!utils.evaluateArray(partialPeymentOlds)) {
        const paymentDateInitial = newDatePayment;
        const paymentDay = paymentDateInitial.getDate(); // Obtener el día 5
        const paymentMonth = paymentDateInitial.getMonth();

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Los meses son 0-indexados en JavaScript
        const currentDay = currentDate.getDate();

        let resultDate;

        if (paymentMonth < currentMonth) {
          const ajustIndex = (currentMonth + 1) % 12;
          resultDate = new Date(currentYear, ajustIndex, paymentDay);
        } else {
          // Si el día actual es menor al día de pago, usamos el mes anterior\
          if (paymentMonth > currentMonth && currentDay <= paymentDay) {
            const ajustIndex = (currentMonth + 1) % 12;
            resultDate = new Date(currentYear, ajustIndex, paymentDay);
          } else {
            const ajustIndex = (currentMonth + 2) % 12;
            resultDate = new Date(currentYear, ajustIndex, paymentDay);
          }
        }
        paymentDate = resultDate;
      }
    }

    if (
      utils.evaluateFullObjetct(invoiceDetailOldSelected) &&
      !isPartialPayment
    ) {
      let currentDate = new Date(invoiceDetailOldSelected.paymentdate);
      let currentMonth = currentDate.getMonth();
      const resultMonths = currentMonth + detail.quantity;
      debugger;
      if (
        (currentMonth === 0 && detail.quantity === 1) ||
        resultMonths === 13
      ) {
        currentDate = addDays(currentDate, -2);
        currentDate.setMonth(currentMonth + detail.quantity);
      } else {
        currentDate.setMonth(currentMonth + detail.quantity);
        const currentDay = currentDate.getDate();
        if (currentDay === 28 && currentMonth === 1) {
          currentDate = addDays(currentDate, 2);
        }
      }
      paymentDate = currentDate;
      detail.paymentdate = paymentDate;
    }

    const startDate = new Date(
      invoiceDetailOldSelected?.paymentdate || paymentDate
    );
    return utils.getMonthRangeText(
      startDate,
      detail.quantity,
      !utils.evaluateFullObjetct(invoiceDetailOldSelected),
      residentialSelected.chargeCurrentMonth
    );
  };

  const getPaymeType = async (residenceSelected) => {
    const request = {
      residenceId: residenceSelected.residenceId,
      residentialId: residentialSelected.id,
    };

    const response = await InvoiceServices.getPaymentTypeByResidence(request);
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
    if (response?.success) {
      if (utils.evaluateArray(response?.paymentTypes)) {
        const newPaymentList = [...response.paymentTypes];
        const paymentoOther = {
          paymentTypeNo: "PT0000000",
          name: "OTROS",
          Description: "",
          Cost: 0,
          isFollowing: false,
        };
        newPaymentList.push(paymentoOther);
        setPaymentTypeList(
          newPaymentList?.where((x) => !x.canBeUseToPenaltyFee)
        );
        setPeymentOlds(response.invoiceDetailOld);
        setPartialPeymentOlds(response?.partialPaymentOld);
        return;
      }
      setPaymentTypeList([]);
      setPeymentOlds([]);
      setPartialPeymentOlds([]);
      setInvoice({
        invoiceNo: "",
        depositNo: "",
        comments: "",
        descriptionEx: "",
        invoiceDate: null,
        customer: null,
        invoiceDetail: [],
      });
      setDetail({
        paymentTypeNo: null,
        description: "",
        descriptionEx: "",
        quantity: 0,
        cost: 0,
        amount: 0,
        amountEx: 0,
        amountPartial: 0,
        isPartialMothPay: false,
      });
      return;
    }
  };

  const toast = useRef(null);

  const addDetail = () => {
    if (
      invoice.invoiceDetail.some(
        (x) => x.paymentTypeNo === detail.paymentTypeNo
      )
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Ya existe este tipo de pago en el detalle",
        life: 3000,
      });
      return;
    }

    if (
      !utils.evaluateArray(invoice.partialPayments) &&
      utils.evaluateArray(partialPeymentOlds) &&
      partialPeymentOlds.some((x) => x.paymentNo === detail.paymentTypeNo)
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail:
          "El usuario tiene un arreglo de pago pendiente, debe abonar algo, para poder facturar un mes",
        life: 3000,
      });
      return;
    }

    if (
      utils.evaluateArray(invoice.partialPayments) &&
      utils.evaluateArray(partialPeymentOlds) &&
      detail.quantity > 1
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Solo puedes pagar un mes, el resto debes abonarlo a la deuda",
        life: 3000,
      });
      return;
    }
    if (detail.quantity <= 0) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Debes colocar una cantidad mayor a 0",
        life: 3000,
      });
      return;
    }

    if (detail.cost <= 0 || isNaN(detail.cost)) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "El costo de pago no puede ser 0",
        life: 3000,
      });
      return;
    }

    let newDetails = invoice.invoiceDetail;

    let detailToAdd = { ...detail };
    let date = new Date();
    const isFollowDate = paymentTypeList.some(
      (x) => x.paymentTypeNo === detail.paymentTypeNo && x.isFollowing
    );

    if (isFollowDate) {
      detailWithTracking(detailToAdd, newDetails, date);
    } else {
      detailWithoutTracking(detailToAdd, newDetails, date);
    }
  };

  const detailWithoutTracking = (detailToAdd, newDetails, date) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const paymentInitial = paymentTypeList.firstOrDefault(
      (x) =>
        x.paymentTypeNo === detailToAdd.paymentTypeNo && x.initialPaymentDate
    );

    if (detail.isPartialMothPay && detail.amount >= paymentInitial.cost) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail:
          "El pago parcial del mes, no puede ser mayor o igual que el costo del tipo de ingreso",
        life: 3000,
      });
      return;
    }

    // Si el mes es diciembre, aumenta el año
    const adjustedYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    // El mes ajustado se reinicia a enero (0) si era diciembre
    const adjustedMonthIndex = (currentMonth + detail.quantity) % 12;

    const resultDate = new Date(adjustedYear, adjustedMonthIndex, currentDay);

    detailToAdd = { ...detail, paymentdate: resultDate };
    newDetails.push(detailToAdd);

    let comments = "Por concepto de pago ";

    if (newDetails.length > 0) {
      newDetails.forEach((detail, index) => {
        const isPartialPayment = invoice?.partialPayments?.some(
          (x) => x.paymentNo === detail.paymentTypeNo
        );
        const isFollowDate = paymentTypeList.some(
          (x) => x.paymentTypeNo === detail.paymentTypeNo && x.isFollowing
        );

        const isPartialMoth = detail.isPartialMothPay;
        if (detail?.paymentTypeNo !== "PT0000000" && isFollowDate) {
          comments += `${isPartialMoth ? "Parcial " : ""}de ${
            detail.description
          } del mes de ${handleDetermineMonth(
            detail,
            detail.paymentdate,
            isPartialPayment
          )}${
            newDetails.length === index + 1
              ? `. ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}. `
                    : detail.descriptionEx
                }`
              : `, ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}, `
                    : detail.descriptionEx
                }`
          }`;
        } else {
          comments += `de ${detail.description} ${
            newDetails.length === index + 1
              ? `. ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}. `
                    : detail.descriptionEx
                }`
              : `, ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}, `
                    : detail.descriptionEx
                }`
          }`;
        }
      });
    }

    let total = newDetails.reduce((total, item) => {
      return total + item.quantity * item.cost + (item?.amountEx || 0);
    }, 0);

    if (invoice?.partialPayments?.length > 0) {
      const totalPartialPay = invoice.partialPayments.reduce(
        (acc, current) => acc + current.partialPay,
        0
      );
      total += totalPartialPay;
      const commentsPartial = generatePaymentSummary(invoice.partialPayments);

      invoice.partialPayments.forEach((element) => {
        element.comments = commentsPartial;
        element.residenceNo = invoice.residenceNo;
      });
      comments += commentsPartial;
    }
    newDetails = newDetails.map((detail) => {
      if (detail.description === detailToAdd.description) {
        const partialPayments = invoice.partialPayments?.filter(
          (x) => x.paymentNo === detail.paymentTypeNo
        );
        let partialTotal = 0;
        if (partialPayments?.length > 0) {
          const totalPartialPay = partialPayments.reduce(
            (acc, current) => acc + current.partialPay,
            0
          );
          partialTotal = totalPartialPay;
        }
        detail.amount =
          detail.quantity * detail.cost + partialTotal + (detail.amount || 0);
      }
      return detail;
    });

    setInvoice({
      ...invoice,
      invoiceDetail: newDetails,
      total: total,
      comments: comments,
    });
    setDetail({
      paymentTypeNo: null,
      description: "",
      descriptionEx: "",
      quantity: 0,
      cost: 0,
      amount: 0,
      amountEx: 0,
      amountPartial: 0,
      isPartialMothPay: false,
    });
  };

  const detailWithTracking = (detailToAdd, newDetails, date) => {
    const paymentInitial = paymentTypeList.firstOrDefault(
      (x) =>
        x.paymentTypeNo === detailToAdd.paymentTypeNo && x.initialPaymentDate
    );

    if (
      detail.isPartialMothPay &&
      detail.amountPartial >= paymentInitial.cost
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail:
          "El pago parcial del mes, no puede ser mayor que el costo del tipo de ingreso",
        life: 3000,
      });
      return;
    }

    const invoiceDetailOldSelected = peymentOlds.firstOrDefault(
      (x) => x.paymentTypeNo === detailToAdd.paymentTypeNo
    );
    const quantityAdd = detailToAdd.quantity;
    if (invoiceDetailOldSelected) {
      date = new Date(invoiceDetailOldSelected.paymentdate);

      const datePayment = utils.addMonths(date, quantityAdd);
      const initialPaymentDay = new Date(
        paymentInitial.initialPaymentDate
      ).getDate(); // Obtener el día 5
      const month = datePayment.getMonth();
      let adjustedDatePayment = new Date(
        datePayment.getFullYear(),
        month,
        initialPaymentDay
      );

      if (utils.evaluateArray(invoice.partialPayments)) {
        if (!utils.evaluateArray(partialPeymentOlds)) {
          const paymentDateInitial = adjustedDatePayment;
          const paymentDay = paymentDateInitial.getDate(); // Obtener el día 5
          const paymentMonth = paymentDateInitial.getMonth();

          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth(); // Los meses son 0-indexados en JavaScript
          const currentDay = currentDate.getDate();

          let resultDate;
          if (paymentMonth < currentMonth) {
            const ajustIndex = (currentMonth + 1) % 12;
            resultDate = new Date(currentYear, ajustIndex, paymentDay);
          } else {
            // Si el día actual es menor al día de pago, usamos el mes anterior\
            if (paymentMonth > currentMonth && currentDay <= paymentDay) {
              const ajustIndex = (currentMonth + 1) % 12;
              resultDate = new Date(currentYear, ajustIndex, paymentDay);
            } else {
              const ajustIndex = (currentMonth + 1) % 12;
              resultDate = new Date(currentYear, ajustIndex, paymentDay);
            }
          }
          adjustedDatePayment = resultDate;
          let newCurrentMonth = adjustedDatePayment.getMonth();
          const ajustIndex = (newCurrentMonth + 1) % 12;
          adjustedDatePayment.setMonth(ajustIndex);
          detailToAdd = { ...detail, paymentdate: adjustedDatePayment };
        } else {
          detailToAdd = { ...detail, paymentdate: adjustedDatePayment };
        }
      } else {
        detailToAdd = { ...detail, paymentdate: adjustedDatePayment };
      }
    } else {
      if (paymentInitial) {
        date = new Date(paymentInitial.initialPaymentDate);
      }

      let currentMonth = date.getMonth();
      let adjustedDatePaymentOld;
      let initialPaymentDay;
      if (detail?.paymentTypeNo !== "PT0000000") {
        const ajustIndex = quantityAdd;
        date = addMonths(date, ajustIndex);
        const datePayment = date;

        initialPaymentDay = new Date(
          paymentInitial.initialPaymentDate
        ).getDate(); // Obtener el día 5

        const _month = getFcMonth(datePayment);

        adjustedDatePaymentOld = new Date(
          datePayment.getFullYear(),
          _month,
          _month === 1 ? 28 : initialPaymentDay
        );
      }
      // Aumentar un mes

      if (utils.evaluateArray(invoice.partialPayments)) {
        if (!utils.evaluateArray(partialPeymentOlds)) {
          const paymentDateInitial = adjustedDatePaymentOld;
          const paymentDay = paymentDateInitial.getDate(); // Obtener el día 5
          const paymentMonth = paymentDateInitial.getMonth();

          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth(); // Los meses son 0-indexados en JavaScript
          const currentDay = currentDate.getDate();

          let resultDate;

          if (paymentMonth < currentMonth) {
            const ajustIndex = (currentMonth + 2) % 12;
            // Si el día actual es mayor o igual al día de pago, usamos el mes actual
            resultDate = new Date(currentYear, ajustIndex, paymentDay);
          } else {
            // Si el día actual es menor al día de pago, usamos el mes anterior\
            if (paymentMonth > currentMonth && currentDay <= paymentDay) {
              const ajustIndex = (currentMonth + 1) % 12;
              resultDate = new Date(currentYear, ajustIndex, paymentDay);
            } else {
              const ajustIndex = (currentMonth + 1) % 12;
              resultDate = new Date(currentYear, ajustIndex, paymentDay);
            }
          }
          adjustedDatePaymentOld = resultDate;
          detailToAdd = { ...detail, paymentdate: adjustedDatePaymentOld };
        } else {
          detailToAdd = { ...detail, paymentdate: adjustedDatePaymentOld };
        }
      } else {
        detailToAdd = { ...detail, paymentdate: adjustedDatePaymentOld };
      }
    }

    newDetails.push(detailToAdd);
    let comments = "Por concepto de pago de ";

    if (newDetails.length > 0) {
      newDetails.forEach((detail, index) => {
        const isPartialPayment = invoice?.partialPayments?.some(
          (x) => x.paymentNo === detail.paymentTypeNo
        );
        const isFollowDate = paymentTypeList.some(
          (x) => x.paymentTypeNo === detail.paymentTypeNo && x.isFollowing
        );
        const isPartialMoth = detail.isPartialMothPay;
        const currentMonthPartial = detail.paymentdate.getMonth();
        const partialMoth = utils.getMonthName(currentMonthPartial);
        if (detail?.paymentTypeNo !== "PT0000000" && isFollowDate) {
          comments += `${detail.description} del mes de ${handleDetermineMonth(
            detail,
            detail.paymentdate,
            isPartialPayment
          )}${
            isPartialMoth
              ? ` y pago parcial de ${detail.amountPartial} del mes de ${partialMoth}`
              : ""
          } ${
            newDetails.length === index + 1
              ? `. ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}.`
                    : detail.descriptionEx
                }`
              : `, ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}, `
                    : detail.descriptionEx
                }`
          }`;
        } else {
          comments += `de ${detail.description} ${
            newDetails.length === index + 1
              ? `. ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}. `
                    : detail.descriptionEx
                }`
              : `, ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}, `
                    : detail.descriptionEx
                }`
          }`;
        }
      });
    }

    let total = newDetails.reduce((total, item) => {
      return (
        total +
        item.quantity * item.cost +
        (item?.amountEx || 0) +
        (item?.amountPartial || 0)
      );
    }, 0);

    if (invoice?.partialPayments?.length > 0) {
      const totalPartialPay = invoice.partialPayments.reduce(
        (acc, current) => acc + current.partialPay,
        0
      );
      total += totalPartialPay;
      const commentsPartial = generatePaymentSummary(invoice.partialPayments);
      invoice.partialPayments.forEach((element) => {
        element.comments = commentsPartial;
        element.residenceNo = invoice.residenceNo;
      });
      comments += commentsPartial;
    }

    newDetails = newDetails.map((detail) => {
      if (detail.description === detailToAdd.description) {
        const partialPayments = invoice.partialPayments?.filter(
          (x) => x.paymentNo === detail.paymentTypeNo
        );
        let partialTotal = 0;
        if (partialPayments?.length > 0) {
          const totalPartialPay = partialPayments.reduce(
            (acc, current) => acc + current.partialPay,
            0
          );
          partialTotal = totalPartialPay;
        }
        let partialMothTotal = 0;

        const isPartialMoth = invoiceDetailOldSelected?.isPartialMothPay;
        if (isPartialMoth) {
          partialMothTotal = invoiceDetailOldSelected.amountPartial;
          total -= partialMothTotal;
        }
        detail.amount =
          detail.quantity * detail.cost +
          partialTotal +
          (detail.amount || 0) +
          (detail.amountEx || 0) +
          (detail.amountPartial || 0) -
          partialMothTotal;
      }
      return detail;
    });

    setInvoice({
      ...invoice,
      invoiceDetail: newDetails,
      total: total,
      comments: comments,
    });
    setDetail({
      paymentTypeNo: null,
      description: "",
      descriptionEx: "",
      quantity: 0,
      cost: 0,
      amount: 0,
      amountEx: 0,
      amountPartial: 0,
      isPartialMothPay: false,
    });
  };
  const generatePaymentSummary = (partialPaymentsList) => {
    if (partialPaymentsList.length === 0) return "";

    // Separar pagos completos y parciales
    const completedPayments = partialPaymentsList.filter(
      (payment) => payment.isCompleted
    );
    const partialPayments = partialPaymentsList.filter(
      (payment) => !payment.isCompleted
    );

    const getMonthRange = (payments) => {
      const [monthValue, year] = payments[0]?.month.split("-");
      const [monthValueBefore, yearBefore] =
        payments[payments.length - 1]?.month.split("-");
      if (payments.length === 1) {
        return `${monthValue}-${year}`;
      }
      const startMonth = utils.getMonthName(utils.getMonthIndex(monthValue));
      const endMonth = utils.getMonthName(
        utils.getMonthIndex(monthValueBefore)
      );
      return `${startMonth}-${year} a ${endMonth}-${yearBefore}`;
    };

    let summary = "";

    if (completedPayments.length > 0) {
      const completedMonths = getMonthRange(completedPayments);
      summary += `Abono a saldo pendiente de ${completedMonths}`;
    }

    if (partialPayments.length > 0) {
      if (summary.length > 0) {
        summary += " y ";
      }
      const [monthValue, year] = partialPayments[0]?.month.split("-");
      const partialMonth = utils.getMonthName(utils.getMonthIndex(monthValue));
      summary += `Pago parcial de ${partialMonth}-${year}`;
    }

    return summary;
  };

  const handleSaveInvoice = async () => {
    invoice?.invoiceDetail
      ?.where((x) => x.description?.toLowerCase().includes("seguridad"))
      ?.forEach((detail) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Los meses son 0-indexados en JavaScript
        const paymentDateYear = detail.paymentdate.getFullYear();
        const paymentDateMonth = detail.paymentdate.getMonth();

        const isSameDate =
          currentYear === paymentDateYear && currentMonth === paymentDateMonth;

        if (isSameDate) {
          detail.paymentdate = addMonths(detail.paymentdate, detail.quantity);
        }

        detail.paymentdate = detail.paymentdate.toLocaleDateString();
      });

    const request = {
      invoice: {
        ...invoice,
        invoiceDate: dateInvoice,
        residentialNo: residentialSelected.residentialNo,
        accountId: residenceList
          .firstOrDefault((x) => x.id === invoice.residenceId)
          ?.accounts?.firstOrDefault()?.id,
      },
    };

    const response = await InvoiceServices.createOrUpdateInvoice(request);
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
    if (response?.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Factura creada con exito",
        life: 3000,
      });
      setInvoice(response.invoice);
      return;
    }
  };

  const getPartialPayment = (partialPaymentsList) => {
    let newPartialPaymentsList = invoice?.partialPayments || [];
    partialPaymentsList.forEach((partial) => {
      newPartialPaymentsList.push(partial);
    });
    setInvoice({ ...invoice, partialPayments: newPartialPaymentsList });
    setShowPartialPayment(false);
  };

  const renderFooter = () => {
    return (
      <div className="footer-buttons">
        {invoice?.id > 0 && (
          <Button
            label="Nuevo"
            icon="pi pi-file"
            className="p-button-raised p-button-warning p-button-sm"
            onClick={() => {
              const newInvoice = {
                invoiceNo: "",
                depositNo: "",
                comments: "",
                descriptionEx: "",
                invoiceDate: null,
                customer: null,
                invoiceDetail: [],
              };

              setInvoice(newInvoice);
            }}
          />
        )}
        {invoice?.id > 0 && (
          <Button
            label="Imprimir"
            icon="pi pi-print"
            className="p-button-raised p-button-info p-button-sm"
            onClick={() => setShowPrintMenu(true)}
          />
        )}
        {utils.isNullOrEmpty(invoice?.invoiceNo) && (
          <div>
            <Button
              label="Guardar"
              icon="pi pi-check"
              className="p-button-raised p-button-success p-button-sm"
              onClick={handleSaveInvoice}
            />
            <Button
              label="Cerrar"
              icon="pi pi-times"
              className="p-button-raised p-button-danger p-button-sm"
              onClick={() => onDissmis()}
            />
          </div>
        )}
      </div>
    );
  };
  const hasPendingPayment = () => {
    if (utils.isNullOrEmpty(detail.paymentTypeNo)) return false;
    if (utils.evaluateArray(partialPeymentOlds)) return true;
    const invoiceDetailOldSelected = peymentOlds.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );

    if (utils.evaluateFullObjetct(invoiceDetailOldSelected)) {
      const date = new Date(invoiceDetailOldSelected.paymentdate);

      const actualDate = new Date();
      return date <= actualDate;
    }

    const paymentInitial = paymentTypeList.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo && x.initialPaymentDate
    );

    if (utils.evaluateFullObjetct(paymentInitial)) {
      const date = new Date(paymentInitial.initialPaymentDate);

      const actualDate = new Date();
      return date <= actualDate;
    }
  };

  const deleteDetail = (detail, index) => {
    let newDetail = [...invoice.invoiceDetail]; // Crear una copia de la lista
    newDetail.splice(index, 1);
    let newInvoice = { ...invoice };
    if (newInvoice?.partialPayments) {
      newInvoice.partialPayments = newInvoice.partialPayments.filter(
        (x) => x.paymentNo !== detail.paymentTypeNo
      );
    }
    let comments = "Por concepto de pago de ";
    if (newDetail.length > 0) {
      newDetail.forEach((detail, index) => {
        const isPartialPayment = newInvoice?.partialPayments?.some(
          (x) => x.paymentNo === detail.paymentTypeNo
        );

        if (detail?.paymentTypeNo !== "PT0000000") {
          comments += `${detail.description} del mes de ${handleDetermineMonth(
            detail,
            detail.paymentdate,
            isPartialPayment
          )}${
            newDetail.length === index + 1
              ? `. ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}, `
                    : detail.descriptionEx
                }`
              : `, ${
                  !utils.isNullOrEmpty(detail.descriptionEx)
                    ? `${detail.descriptionEx}, `
                    : detail.descriptionEx
                }`
          }`;
        } else {
          comments += `${detail.description}. ${detail.descriptionEx}`;
        }
      });
    }
    let total = newDetail.reduce((total, item) => {
      return total + item.quantity * item.cost + (item.amountEx || 0);
    }, 0);

    if (invoice?.partialPayments?.length > 0) {
      const totalPartialPay = invoice.partialPayments.reduce(
        (acc, current) => acc + current.partialPay,
        0
      );
      total += totalPartialPay;
      comments += generatePaymentSummary(invoice.partialPayments);
    }
    setInvoice({
      ...newInvoice,
      invoiceDetail: newDetail,
      comments: comments,
      total: total,
    });
  };

  const getPaymentType = () => {
    const paymentType = paymentTypeList.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );
    return paymentType || null;
  };

  const onDissmisPartialPayment = () => {
    setShowPartialPayment(false);
  };

  const handleClean = () => {
    setPaymentTypeList([]);
    setPeymentOlds([]);
    setPartialPeymentOlds([]);
    setInvoice({
      ...invoice,
      invoiceNo: "",
      comments: "",
      descriptionEx: "",
      invoiceDate: null,
      customer: null,
      total: 0,
      invoiceDetail: [],
      partialPayments: [],
    });
    setDetail({
      paymentTypeNo: null,
      description: "",
      descriptionEx: "",
      quantity: 0,
      cost: 0,
      amount: 0,
      amountEx: 0,
      amountPartial: 0,
      isPartialMothPay: false,
    });
  };

  const handleBlockDescription = () => {
    if (detail?.paymentTypeNo === "PT0000000") return false;
    const payment = paymentTypeList.firstOrDefault(
      (x) => x.paymentTypeNo === detail.paymentTypeNo
    );
    if (payment) {
      return payment.isFollowing;
    }
    return true;
  };

  return (
    <Dialog
      header={`Recibo de Ingreso ${
        invoice?.invoiceNo ? `#${invoice?.invoiceNo}` : ""
      } ${
        !utils.isNullOrEmpty(invoice?.userCreate)
          ? `Creado por: ${invoice?.userCreate}`
          : ""
      }`}
      visible={isOpen}
      onHide={() => onDissmis()}
      style={{ width: "70vw", height: "100vh" }}
      footer={renderFooter()}
    >
      <CreateOrUpdateInvoiceModalStyled>
        <Toast ref={toast} />
        <div>
          <label
            style={{
              fontSize: "12pt",
              fontWeight: "700",
            }}
          >
            General
          </label>
        </div>

        <div className="header-fields">
          <div>
            <Dropdown
              className="commandbox"
              value={invoice.paymentWay}
              options={paymentWays}
              onChange={(e) => setInvoice({ ...invoice, paymentWay: e.value })}
              optionLabel="name"
              optionValue="name"
              placeholder="Seleccione el metodo de pago"
              disabled={!utils.isNullOrEmpty(invoice?.invoiceNo)}
            />
          </div>
          {!utils.isNullOrEmpty(invoice.paymentWay) &&
            invoice?.paymentWay !== "Efectivo" && (
              <div>
                <span className="p-float-label">
                  <InputText
                    id="depositNo"
                    value={invoice.depositNo}
                    onChange={(e) =>
                      setInvoice({ ...invoice, depositNo: e.target.value })
                    }
                    disabled={!utils.isNullOrEmpty(invoice?.invoiceNo)}
                  />
                  <label htmlFor="depositNo">
                    {`${invoice?.paymentWay} No`}
                  </label>
                </span>
              </div>
            )}
          <div>
            <span className="p-float-label">
              <Calendar
                id="invoiceDate"
                value={dateInvoice}
                onChange={(e) => setDateInvoice(e.value)}
                showIcon
                disabled={!utils.isNullOrEmpty(invoice?.invoiceNo)}
              />
              <label htmlFor="invoiceDate">Fecha</label>
            </span>
          </div>
          <div>
            {!utils.isNullOrEmpty(invoice?.customer) ? (
              <div style={{ alignItems: "center", display: "flex" }}>
                <InputText value={invoice.customer} readOnly={true} />
                <Button
                  icon="pi pi-times"
                  className="p-button-rounded p-button-danger p-button-text"
                  aria-label="Cancel"
                  onClick={() => handleClean()}
                  disabled={!utils.isNullOrEmpty(invoice?.invoiceNo)}
                />
              </div>
            ) : (
              <CustomDropdown
                customers={customers}
                getPaymeType={getPaymeType}
                invoice={invoice}
                setInvoice={setInvoice}
              />
            )}
          </div>

          <div>
            <span className="p-float-label">
              <InputNumber id="total" value={invoice.total} readOnly />
              <label htmlFor="total">Total</label>
            </span>
          </div>
          <div>
            <span className="p-float-label">
              <InputTextarea
                id="comments"
                value={invoice.comments}
                readOnly
                style={{ width: "100%" }}
              />
              <label htmlFor="comments">Concepto</label>
            </span>
          </div>
        </div>
        <strong>Detalle</strong>
        {utils.isNullOrEmpty(invoice?.invoiceNo) && (
          <div>
            <div className="detail-fields">
              <div>
                <span className="p-float-label">
                  <Dropdown
                    id="paymentTypeNo"
                    value={getPaymentType()}
                    options={paymentTypeList}
                    onChange={(e) => {
                      const paymentOld = peymentOlds.find(
                        (x) => x.paymentTypeNo === e.value.paymentTypeNo
                      );
                      const valueToAdd = residentialSelected.chargeCurrentMonth
                        ? 0
                        : 1;

                      const date = utils.evaluateFullObjetct(paymentOld)
                        ? new Date(paymentOld?.paymentdate)
                        : new Date(e.value.initialPaymentDate);

                      const getAdjustedDate = (date, adjustment) => {
                        const newDate = new Date(date);
                        newDate.setMonth(date.getMonth() - adjustment);
                        return newDate;
                      };

                      const actualDate = getAdjustedDate(date, valueToAdd);
                      const lastDate = utils.evaluateFullObjetct(paymentOld)
                        ? getAdjustedDate(date, 1)
                        : null;

                      const actualMonth = getMonth(actualDate);
                      const actualYear = actualDate.getFullYear();

                      const lastMonthPayment = lastDate
                        ? getMonth(lastDate)
                        : "";
                      const lastYear = lastDate ? lastDate.getFullYear() : "";

                      setDetail({
                        ...detail,
                        paymentTypeNo: e.value.paymentTypeNo,
                        description:
                          e.value.paymentTypeNo === "PT0000000"
                            ? ""
                            : e.value.name,
                        cost: e.value.cost - e.value.discount,
                        isFollowing: e.value.isFollowing,
                        lastMonthPayment: `${lastMonthPayment} - ${lastYear}`,
                        monthPayment: `${actualMonth} - ${actualYear}`,
                      });
                    }}
                    placeholder="Seleccione el Tipo de Ingreso"
                    optionLabel="name"
                  />
                  <label htmlFor="paymentTypeNo">Tipo de Ingreso</label>
                </span>
              </div>
              <div>
                <span className="p-float-label">
                  <InputText
                    id="description"
                    value={detail.description}
                    onChange={(e) =>
                      setDetail({ ...detail, description: e.target.value })
                    }
                    readOnly={handleBlockDescription()}
                  />
                  <label htmlFor="description">Descripción</label>
                </span>
              </div>
              <div>
                <span className="p-float-label">
                  <InputNumber
                    id="quantity"
                    value={detail.quantity}
                    onChange={(e) => {
                      setDetail({
                        ...detail,
                        quantity: parseInt(e.value || 0),
                      });
                    }}
                    size={2}
                  />
                  <label htmlFor="quantity">Cantidad</label>
                </span>
              </div>

              <div>
                <span className="p-float-label">
                  <InputNumber
                    id="cost"
                    value={detail.cost || 0}
                    onChange={(e) =>
                      setDetail({ ...detail, cost: parseFloat(e.value || 0) })
                    }
                    readOnly={detail?.paymentTypeNo !== "PT0000000"}
                    mode="decimal"
                    minFractionDigits={2}
                    maxFractionDigits={5}
                    size={10}
                  />
                  <label htmlFor="cost">Costo</label>
                </span>
              </div>
              {detail?.paymentTypeNo !== "PT0000000" &&
                !hasPendingPayment() &&
                detail.isFollowing && (
                  <div style={{ textAlign: "center" }}>
                    <div>
                      <Checkbox
                        icon="pi pi-check"
                        checked={detail.isPartialMothPay}
                        onChange={(e) => {
                          setDetail({
                            ...detail,
                            isPartialMothPay: e.checked,
                          });
                        }}
                      />
                    </div>
                    <div>Pago Parcial</div>
                  </div>
                )}
              {detail.isPartialMothPay && (
                <div>
                  <span className="p-float-label">
                    <InputNumber
                      id="amountPartial"
                      value={detail.amountPartial || 0}
                      onChange={(e) =>
                        setDetail({
                          ...detail,
                          amountPartial: parseFloat(e.value || 0),
                        })
                      }
                      mode="decimal"
                      minFractionDigits={2}
                      maxFractionDigits={5}
                      size={10}
                    />
                    <label htmlFor="amountPartial">Costo Parcial</label>
                  </span>
                </div>
              )}
              {detail?.paymentTypeNo !== "PT0000000" && (
                <div>
                  <span className="p-float-label">
                    <InputNumber
                      id="amountEx"
                      value={detail.amountEx}
                      onChange={(e) =>
                        setDetail({
                          ...detail,
                          amountEx: parseFloat(e.value || 0),
                        })
                      }
                      size={10}
                    />
                    <label htmlFor="amountEx">Pago Extra</label>
                  </span>
                </div>
              )}
              {detail?.amountEx > 0 &&
                detail?.paymentTypeNo !== "PT0000000" && (
                  <div>
                    <span className="p-float-label">
                      <InputText
                        id="descriptionEx"
                        value={detail?.descriptionEx}
                        onChange={(e) =>
                          setDetail({
                            ...detail,
                            descriptionEx: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="descriptionEx">Descripción Extra</label>
                    </span>
                  </div>
                )}
              {!utils.isNullOrEmpty(detail?.paymentTypeNo) &&
                detail?.paymentTypeNo !== "PT0000000" &&
                paymentTypeList.some(
                  (x) =>
                    x.paymentTypeNo === detail.paymentTypeNo && x.isFollowing
                ) && (
                  <div>
                    {invoice?.partialPayments?.length > 0 ? (
                      <div>
                        <Button
                          label="Eliminar Abono"
                          icon="pi pi-wallet"
                          className="p-button-rounded p-button-danger p-button-sm"
                          onClick={() => {
                            setInvoice({ ...invoice, partialPayments: [] });
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        {hasPendingPayment() && (
                          <Button
                            label="Abonar a deuda"
                            icon="pi pi-wallet"
                            className="p-button-rounded p-button-secondary p-button-sm"
                            onClick={() => {
                              setShowPartialPayment(true);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              <div>
                <lable>Ultimo Mes Pagado: </lable>
                <strong>{detail?.lastMonthPayment}</strong>
              </div>
              {paymentTypeList.some(
                (x) => x.paymentTypeNo === detail.paymentTypeNo && x.isFollowing
              ) && (
                <div>
                  <lable>Mes a Pagar: </lable>
                  <strong>{detail?.monthPayment}</strong>
                </div>
              )}
            </div>

            <div style={{ marginLeft: "10px" }}>
              <Button
                label="Agregar Detalle"
                icon="pi pi-plus"
                className="p-button-raised p-button-info p-button-sm"
                onClick={addDetail}
                style={{ height: "30px" }}
              />
            </div>
          </div>
        )}
        <div className="header-detail">
          <div></div>
          <div>Tipo de Ingreso</div>
          <div>Descripción</div>
          <div>Cantidad</div>
          <div>Costo</div>
          <div>Total</div>
          <div></div>
        </div>
        <div className="detail-list">
          {invoice.invoiceDetail.map((d, index) => (
            <div className="detail-item" key={index}>
              <div>{index + 1}</div>
              <div>{d.paymentTypeNo}</div>
              <div>{d.description}</div>
              <div>{d.quantity}</div>
              <div>{formatter.format(d.cost)}</div>
              <div>{formatter.format(d.amount)}</div>
              <div>
                <Button
                  icon="pi pi-times"
                  className="p-button-rounded p-button-danger p-button-text"
                  aria-label="Cancel"
                  onClick={() => deleteDetail(d, index)}
                  disabled={!utils.isNullOrEmpty(invoice?.invoiceNo)}
                />
              </div>
            </div>
          ))}
        </div>
        {showPartialPayment && (
          <PartialPaymentModal
            isOpen={showPartialPayment}
            onDissmis={onDissmisPartialPayment}
            detail={detail}
            paymentTypeList={paymentTypeList}
            partialPeymentOlds={partialPeymentOlds}
            peymentOlds={peymentOlds}
            getPartialPayment={getPartialPayment}
            residentialSelected={residentialSelected}
          />
        )}
        {showPrintMenu && (
          <InvoicePrint
            visible={showPrintMenu}
            onDismissPrintMenu={() => setShowPrintMenu(false)}
            invoice={invoice}
            residentialSelected={residentialSelected}
          />
        )}
      </CreateOrUpdateInvoiceModalStyled>
    </Dialog>
  );
};

export default CreateOrUpdateInvoiceModal;
