// InvoiceDocumentNormal.js
import React, { useEffect, useState } from "react";
import { InvoiceDocumentNormalStyled } from "./styles";
import { getDate } from "../../../Helpers/FormatDate";
import { utils } from "../../../Helpers/utils";
import logo from "../../../Assets/Logo.png";

const InvoiceDocumentNormal = ({
  invoice,
  residentialSelected,
  receipType,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const fetchResource = async () => {
    const response = await fetch(
      !utils.isNullOrEmpty(residentialSelected.logoResidential)
        ? residentialSelected.logoResidential
        : "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/residenciales.jpg",
      {
        headers: {
          "Cache-Control": "no-cache", // Evita que el navegador almacene en caché
        },
      },
    );
    const blob = await response.blob();
    const imageUrls = URL.createObjectURL(blob);
    setImageUrl(imageUrls);
  };

  useEffect(() => {
    fetchResource();
  }, []);
  const formatter = new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <InvoiceDocumentNormalStyled>
      <img className="watermark-img" src={imageUrl || logo} alt="" />
      <div className="header">
        <div className="logo">
          <img
            src={imageUrl}
            alt="Logo Residencial"
            style={{ width: "100%", height: "80px", objectFit: "contain" }}
          />
        </div>
        <div className="residential-name">{residentialSelected.name}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="app-name">
            <div>
              <strong>Sistema de Pagos Residenciales</strong>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60px", fontWeight: "700" }}>Telefono:</div>
              <label>+504 9443-2877</label>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "60px", fontWeight: "700" }}>Correo:</div>
              <label>residencialquintasdelsol2022@gmail.com</label>
            </div>
          </div>
        </div>
        {/* <div className="logo-app">
          <img
            src={require("./../../../Assets/ssaicon.png")}
            alt="Descripción de la imagen"
            width={60}
          />
        </div> */}
      </div>
      <div
        className="receipt-title"
        style={{
          textAlign: "center",
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          fontWeight: 700,
          fontSize: "14pt",
        }}
      >
        <label>RECIBO DE PAGO</label>
      </div>
      <div className="residential">
        <div className="invoice-date-container">
          <div className="invoice-date">
            <div>RECIBO #</div>
            <div>FECHA</div>
          </div>
          <div className="invoice-date-value">
            <div>{invoice?.invoiceNo}</div>
            <div>{getDate(invoice?.invoiceDate)}</div>
          </div>
        </div>

        <div className="total">
          <div className="customer">
            <div>
              <strong>Recibí de:</strong>
            </div>
            <div style={{ borderBottom: "2px solid #ccc" }}>
              {invoice?.remitance}
            </div>
          </div>
          {receipType === "invoice" && (
            <div className="block-house">
              <div>
                <strong>Bloque:</strong>
              </div>
              <div
                style={{ borderBottom: "2px solid #ccc", textAlign: "center" }}
              >
                {invoice?.block}
              </div>
            </div>
          )}
          {receipType === "invoice" && (
            <div className="house-number">
              <div>
                <strong>Casa:</strong>
              </div>
              <div
                style={{ borderBottom: "2px solid #ccc", textAlign: "center" }}
              >
                {invoice?.houseNumber}
              </div>
            </div>
          )}
          <div
            className="total-value"
            style={{
              position: receipType !== "invoice" && "absolute",
              right: receipType !== "invoice" && 30,
            }}
          >
            <strong>Total:</strong>
            <div className="value">{formatter.format(invoice?.total)}</div>
          </div>
        </div>
        <div className="concepto">
          <div className="concepto-container">
            <div>
              <strong>Concepto:</strong>
            </div>
            <div style={{ borderBottom: "2px solid #ccc" }}>
              {invoice?.comments || invoice?.comment}
            </div>
          </div>
        </div>
        <div className="payment-way-container">
          <div className="payment-way">
            <div>
              <strong>Forma de Pago:</strong>
            </div>
            <div
              style={{ borderBottom: "2px solid #ccc", textAlign: "center" }}
            >
              {invoice?.paymentWay}{" "}
              {invoice?.paymentWay !== "Efectivo"
                ? ` / ${invoice?.depositNo}`
                : ""}
            </div>
          </div>
          <div
            style={{
              display: receipType === "spending" ? "flex" : "block",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: receipType === "spending" ? 20 : 0,
            }}
          >
            {receipType === "spending" && (
              <div>
                <div style={{ borderBottom: "2px solid #ccc", width: 250 }}>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      border: "1px solid transparent", // Borde gris
                      outline: "2px solid transparent", // Outline azul cuando está activo
                      padding: "5px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                    autoFocuss
                  />
                </div>
                <div style={{ textAlign: "center" }} className="signature-item">
                  Identidad
                </div>
              </div>
            )}

            <div className="signature">
              <div style={{ borderBottom: "2px solid #ccc", width: 250 }}>
                {invoice?.signature?.includes("data:") ? (
                  <img src={invoice.signature} alt="signature" />
                ) : (
                  <span style={{ justifyContent: "center", display: "flex" }}>
                    {invoice?.signature}
                  </span>
                )}
              </div>
              <div className="signature-item">
                {receipType === "invoice" && (
                  <div>{invoice?.userCreate || "Firma o Sello"}</div>
                )}
                {receipType === "spending" && <div>Nombre</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvoiceDocumentNormalStyled>
  );
};

export default InvoiceDocumentNormal;
