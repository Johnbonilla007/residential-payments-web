import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { CreateOrUpdateSpendingInvoiceModalStyled } from "./styled";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { utils } from "../../../../Helpers/utils";
import { InvoiceServices } from "../../Invoice.Service";
import SpendingInvoicePrint from "../SpendingInvoicePrint";
import { CreateOrUpdateSpendingTypeService } from "../CreateOrUpdateSpendingType/CreateOrUpdateSpendingType.Service";
import { useMemo } from "react";

const CreateOrUpdateSpendingInvoiceModal = ({
  isOpen,
  onDissmis,
  invoiceSelected,
  isEdit,
  residentialSelected,
}) => {
  const [invoice, setInvoice] = useState(
    utils.evaluateFullObjetct(invoiceSelected)
      ? invoiceSelected
      : {
          invoiceNo: "",
          depositNo: "",
          comment: "",
          invoiceDate: null,
          vendor: "",
          spendingInvoiceDetail: [],
        }
  );
  const [spendingTypes, setSpendingTypes] = useState([]);

  const [detail, setDetail] = useState({
    description: "",
    amount: 0,
  });

  const [dateInvoice, setDateInvoice] = useState(
    !utils.isNullOrEmpty(invoiceSelected?.invoiceDate)
      ? new Date(invoiceSelected?.invoiceDate)
      : new Date()
  );
  const [paymentWays, setPaymentWays] = useState([]);
  const [showPrintMenu, setShowPrintMenu] = useState(false);

  useEffect(() => {
    getPaymentWay();
    loadSpendingTypes();
  }, []);

  const loadSpendingTypes = async () => {
    const response = await CreateOrUpdateSpendingTypeService.getSpendingTypes(
      residentialSelected.residentialNo
    );
    if (response?.success) {
      setSpendingTypes(response.spendingTypes);
      return;
    }
  };

  const formatter = new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getPaymentWay = async () => {
    const response = await InvoiceServices.getAllPaymentWay({});
    if (response?.success) {
      setPaymentWays(response.paymentWays);
      return;
    }
  };

  const toast = useRef(null);

  const addDetail = () => {
    let detailToAdd = { ...detail };
    let newDetails = invoice.spendingInvoiceDetail;

    newDetails.push(detailToAdd);
    let comments = "";

    if (newDetails.length > 0) {
      newDetails.forEach((detail, index) => {
        comments += `${detail.description}${
          newDetails.length === index + 1 ? "." : ", "
        }`;
      });
    }

    let total = newDetails.reduce((total, item) => {
      return total + (item.amount || 0);
    }, 0);

    setInvoice({
      ...invoice,
      spendingInvoiceDetail: newDetails,
      total: total,
      comment: comments,
    });
    setDetail({
      description: "",
      amount: 0,
    });
  };

  const handleSaveInvoice = async () => {
    const request = {
      spendingInvoice: {
        ...invoice,
        invoiceDate: dateInvoice,
        residentialNo: residentialSelected.residentialNo,
      },
    };

    const response = await InvoiceServices.createOrUpdateSpendingInvoice(
      request
    );
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
      setInvoice(response.spendingInvoice);

      return;
    }
  };

  const canShowButtonPrint = useMemo(() => {
    if (isEdit || invoice?.id) {
      return true;
    }

    return false;
  }, [isEdit, invoice?.id]);

  const renderFooter = () => {
    return (
      <div className="footer-buttons">
        {canShowButtonPrint && (
          <Button
            label="Imprimir"
            icon="pi pi-print"
            className="p-button-raised p-button-info p-button-sm"
            onClick={() => setShowPrintMenu(true)}
          />
        )}
        {!canShowButtonPrint && (
          <Button
            label="Guardar"
            icon="pi pi-check"
            className="p-button-raised p-button-success p-button-sm"
            onClick={() => handleSaveInvoice()}
          />
        )}
        <Button
          label="Cerrar"
          icon="pi pi-times"
          className="p-button-raised p-button-danger p-button-sm"
          onClick={() => onDissmis()}
        />
      </div>
    );
  };

  const deleteDetail = (detail) => {
    const newDetail = invoice.spendingInvoiceDetail.filter(
      (x) => x.description !== detail.description
    );

    let newInvoice = { ...invoice };

    let comments = "";
    if (newDetail.length > 0) {
      newDetail.forEach((detail, index) => {
        comments += `${detail.description}${
          newDetail.length === index + 1 ? "." : ", "
        }`;
      });
    }
    let total = newDetail.reduce((total, item) => {
      return total + (item.amount || 0);
    }, 0);

    setInvoice({
      ...newInvoice,
      spendingInvoiceDetail: newDetail,
      comment: comments,
      total: total,
    });
  };

  return (
    <Dialog
      header={`Recibo de Gasto ${
        invoice?.invoiceNo
          ? `#${invoice?.invoiceNo}  ${
              !utils.isNullOrEmpty(invoice?.userCreate)
                ? `Creado por: ${invoice?.userCreate}`
                : ""
            }`
          : ""
      }`}
      visible={isOpen}
      onHide={() => onDissmis()}
      style={{ width: "50vw", height: "100vh" }}
      footer={renderFooter}
    >
      <CreateOrUpdateSpendingInvoiceModalStyled>
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
              value={invoice?.paymentWay}
              options={paymentWays}
              onChange={(e) => {
                setInvoice({ ...invoice, paymentWay: e.value });
              }}
              optionLabel="name"
              optionValue="name"
              placeholder="Seleccione el metodo de pago"
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
              />
              <label htmlFor="invoiceDate">Fecha</label>
            </span>
          </div>
          <div>
            <span className="p-float-label">
              <InputText
                id="vendor"
                value={invoice.vendor}
                onChange={(e) =>
                  setInvoice({ ...invoice, vendor: e.target.value })
                }
              />
              <label htmlFor="vendor">Proveedor</label>
            </span>
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
                id="comment"
                value={invoice.comment}
                readOnly
                style={{ width: "100%" }}
              />
              <label htmlFor="comment">Concepto</label>
            </span>
          </div>
        </div>
        <strong>Detalle</strong>
        <div className="detail-fields">
          <div>
            <Dropdown
              className="commandbox"
              style={{ width: 200 }}
              value={detail.spendingTypeNo}
              options={spendingTypes}
              onChange={(e) => {
                const spendingType = spendingTypes.firstOrDefault(
                  (x) => x.spendingTypeNo === e.value
                );
                setDetail({
                  ...detail,
                  spendingTypeNo: spendingType?.spendingTypeNo,
                  description: spendingType?.description,
                  amount: spendingType?.amount,
                });
              }}
              optionLabel="name"
              optionValue="spendingTypeNo"
              placeholder="Seleccione tipo de gasto"
            />
          </div>
          <div>
            <span className="p-float-label">
              <InputText
                id="description"
                value={detail.description}
                onChange={(e) =>
                  setDetail({ ...detail, description: e.target.value })
                }
                style={{ width: "28vw" }}
              />
              <label htmlFor="description">Descripción</label>
            </span>
          </div>
          <div>
            <span className="p-float-label">
              <InputNumber
                id="amount"
                value={detail.amount}
                onChange={(e) =>
                  setDetail({ ...detail, amount: parseFloat(e.value || 0) })
                }
                mode="decimal"
                minFractionDigits={2}
                maxFractionDigits={5}
                size={10}
              />
              <label htmlFor="cost">Costo</label>
            </span>
          </div>
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
        <div className="header-detail">
          <div></div>
          <div>Descripción</div>
          <div>Costo</div>
          <div></div>
        </div>
        <div className="detail-list">
          {invoice.spendingInvoiceDetail?.map((d, index) => (
            <div className="detail-item" key={index}>
              <div>{index + 1}</div>
              <div>{d.description}</div>
              <div>{formatter.format(d.amount)}</div>
              <div>
                <Button
                  icon="pi pi-times"
                  className="p-button-rounded p-button-danger p-button-text"
                  aria-label="Cancel"
                  onClick={() => deleteDetail(d)}
                />
              </div>
            </div>
          ))}
        </div>

        {showPrintMenu && (
          <SpendingInvoicePrint
            visible={showPrintMenu}
            onDismissPrintMenu={() => setShowPrintMenu(false)}
            invoice={invoice.id ? invoice : invoiceSelected}
            residentialSelected={residentialSelected}
          />
        )}
      </CreateOrUpdateSpendingInvoiceModalStyled>
    </Dialog>
  );
};

export default CreateOrUpdateSpendingInvoiceModal;
