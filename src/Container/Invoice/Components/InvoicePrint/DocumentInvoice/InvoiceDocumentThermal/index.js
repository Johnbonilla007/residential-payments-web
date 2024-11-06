// InvoiceDocumentThermal.js
import React, { useEffect, useState } from "react";
import { InvoiceDocumentThermalStyled } from "./styled";
import { getDate } from "../../../../../../Helpers/FormatDate";
import { utils } from "../../../../../../Helpers/utils";

const InvoiceDocumentThermal = ({ invoice, residentialSelected }) => {
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
      }
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
    <InvoiceDocumentThermalStyled logoResidential={imageUrl}>
      <div className="header">
        <div className="logo">
          <img src={imageUrl} alt="Descripción de la imagen" width={40} />
        </div>
        <div className="app-name">
          <div style={{ textAlign: "center" }}>
            <strong>Sistema de Seguridad Alpha</strong>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "5pt",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30px", fontWeight: "700" }}>Telefono:</div>
            <label style={{ fontSize: "6pt", marginLeft: 3 }}>
              +504 9920-6159
            </label>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "5pt",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30px", fontWeight: "700" }}>Correo:</div>
            <label style={{ fontSize: "6pt", marginLeft: 3 }}>
              administracion@sashonduras.com
            </label>
          </div>
        </div>

        <div className="logo-app">
          <img
            src={require("../../../../../../Assets/ssaicon.png")}
            alt="Descripción de la imagen"
            width={40}
          />
        </div>
      </div>
      <div className="residential-name">{residentialSelected.name}</div>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          fontWeight: 700,
          fontSize: "9pt",
        }}
      >
        <label>RECIBO DE INGRESO</label>
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
              <strong>Recibi de:</strong>
            </div>
            <div
              style={{
                borderBottom: "2px solid #ccc",
                textAlign: "center",
                width: "38mm",
              }}
            >
              {invoice?.customer}
            </div>
          </div>
          <div className="block-house">
            <div>
              <strong>Bloque:</strong>
            </div>
            <div
              style={{
                borderBottom: "2px solid #ccc",
                textAlign: "center",
                width: "38mm",
                marginLeft: 10,
              }}
            >
              {invoice?.block}
            </div>
          </div>
          <div className="house-number">
            <div>
              <strong>Casa:</strong>
            </div>
            <div
              style={{
                borderBottom: "2px solid #ccc",
                textAlign: "center",
                width: "38mm",
                marginLeft: 18,
              }}
            >
              {invoice?.houseNumber}
            </div>
          </div>
          <div className="total-value">
            <strong>Total:</strong>
            <div className="value">{formatter.format(invoice?.total)}</div>
          </div>
        </div>
      </div>
      <div className="concepto">
        <div className="concepto-container">
          <div>
            <strong>Concepto:</strong>
          </div>
          <div style={{ borderBottom: "2px solid #ccc" }}>
            {invoice?.comments}
          </div>
        </div>
      </div>
      <div className="payment-way-container">
        <div className="payment-way">
          <div>
            <strong>Forma de Pago:</strong>
          </div>
          <div style={{ borderBottom: "2px solid #ccc", textAlign: "center" }}>
            {invoice?.paymentWay}{" "}
            {invoice?.paymentWay !== "Efectivo"
              ? ` / ${invoice?.depositNo}`
              : ""}
          </div>
        </div>
        <div className="signature">
          <div style={{ borderBottom: "2px solid #ccc", width: "130px" }}></div>
          <div className="signature-item">
            <div>{invoice?.userCreate}</div>
            <strong>Firma o Sello</strong>
          </div>
        </div>
      </div>
    </InvoiceDocumentThermalStyled>
  );
};

export default InvoiceDocumentThermal;
