import React from "react";
import { utils } from "../../../../Helpers/utils";
import { ReportSumarizePdfStyled } from "./styled";

const ReportSumarizePdf = ({
  componentRef,
  reportSumarize,
  residentialSelected,
  filters,
}) => {
  const getTotalMonth = () => {
    if (reportSumarize) {
      const back = reportSumarize?.previousMonthlyBalance?.bank || 0;
      const cash = reportSumarize?.previousMonthlyBalance?.cash || 0;

      const value = reportSumarize.totalIncomesMonthly + back + cash;

      return value;
    }
    return 0;
  };

  const getTotalEnableMonth = () => {
    if (reportSumarize) {
      const totalIncoming = getTotalMonth();
      const totalSpendinging =
        reportSumarize?.currentMonthlyBalance?.totalAmounthSpendingCash +
        reportSumarize?.currentMonthlyBalance?.totalAmounthSpendingBank;

      return totalIncoming - totalSpendinging;
    }
    return 0;
  };
  const getAvailableInBank = () => {
    if (reportSumarize) {
      const bankIncoming =
        (reportSumarize?.previousMonthlyBalance?.bank || 0) +
        (reportSumarize?.currentMonthlyBalance?.totalAmounthIncomeBank || 0);
      const totalBank =
        bankIncoming -
        (reportSumarize?.currentMonthlyBalance?.totalAmounthSpendingBank || 0) +
        reportSumarize?.currentMonthlyBalance?.bankFinancialMovement;

      return totalBank;
    }
    return 0;
  };

  const getAvailableInCash = () => {
    if (reportSumarize) {
      const cashIncoming =
        (reportSumarize?.previousMonthlyBalance?.cash || 0) +
        (reportSumarize?.currentMonthlyBalance?.totalAmounthIncomeCash || 0);
      const totalCash =
        cashIncoming -
        (reportSumarize?.currentMonthlyBalance?.totalAmounthSpendingCash || 0) -
        reportSumarize?.currentMonthlyBalance?.bankFinancialMovement;

      return totalCash;
    }
    return 0;
  };

  return (
    <ReportSumarizePdfStyled ref={componentRef}>
      <div>
        <div className="container-header">
          <div>
            <img
              alt="logo"
              src={
                !utils.isNullOrEmpty(residentialSelected?.logoResidential)
                  ? residentialSelected.logoResidential
                  : "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/residenciales.jpg"
              }
              style={{ width: "80px", height: "80px", alignSelf: "center" }}
            />
          </div>
          <div>
            <div style={{ fontSize: "14pt" }}>
              <strong>{residentialSelected.name}</strong>
            </div>
            <div style={{ fontSize: "14pt" }}>
              <span>DEPARTAMENTO DE CONTABILIDAD</span>
            </div>
          </div>
          <div style={{ border: "2px #ccc solid", borderRadius: 10 }}>
            <img
              alt="logo"
              src={require("../../../../Assets/Logo.png")}
              style={{ width: "80px", height: "80px", alignSelf: "center" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "16pt",
          }}
        >
          <strong>REPORTE DE INGRESOS Y GASTOS MESUALES</strong>
        </div>
        <div style={{ fontWeight: "700", fontSize: "16pt" }}>
          <div>
            <strong>{utils.FormatDateMonth(filters?.month)}</strong>
          </div>
        </div>
        <div className="date-range">
          <div className="table">
            <div className="header-title">
              <strong>INGRESOS DEL MES</strong>
            </div>
            <div className="header-item">
              <div>
                <strong>Correlativo</strong>
              </div>
              <div>
                <strong>Nombre</strong>
              </div>
              <div>
                <strong>Monto</strong>
              </div>
            </div>
            <div className="item-container">
              {reportSumarize?.incomesReportSumarized?.map((item) => (
                <div className="item">
                  <div>{item?.documentNo}</div>
                  <div>{item?.name}</div>
                  <div style={{ textAlign: "right" }}>{item?.amount}</div>
                </div>
              ))}
              <div className="total">
                <div>
                  <strong>Total Ingresos del Mes: </strong>
                </div>
                <div></div>
                <div style={{ textAlign: "right", fontWeight: "900" }}>
                  {utils.formateLps(reportSumarize?.totalIncomesMonthly)}
                </div>
              </div>
            </div>
          </div>

          <div className="table">
            <div className="header-title">
              <strong>GASTOS DEL MES</strong>
            </div>
            <div className="header-item">
              <div>
                <strong>Correlativo</strong>
              </div>
              <div>
                <strong>Nombre</strong>
              </div>
              <div>
                <strong>Monto</strong>
              </div>
            </div>
            <div className="item-container">
              {reportSumarize?.spendingReportSumarized?.map((item) => (
                <div className="item">
                  <div>{item?.documentNo}</div>
                  <div>{item?.name}</div>
                  <div style={{ textAlign: "right" }}>{item?.amount}</div>
                </div>
              ))}
              <div className="total">
                <div>
                  <strong>Total Gasto del Mes: </strong>
                </div>
                <div></div>
                <div style={{ textAlign: "right", fontWeight: "900" }}>
                  {reportSumarize?.totalSpendingMonthly}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-summarize">
          {/* Tabla de Ingresos */}
          <div className="section-container">
            <div className="table-section">
              <div className="item">
                <div className="title">
                  <strong>+ Saldo Anterior en Banco:</strong>
                </div>
                <div
                  className={`total ${
                    reportSumarize?.previousMonthlyBalance?.bank > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(
                    reportSumarize?.previousMonthlyBalance?.bank
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>+ Saldo Anterior en Efectivo:</strong>
                </div>
                <div
                  className={`total ${
                    reportSumarize?.previousMonthlyBalance?.cash > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(
                    reportSumarize?.previousMonthlyBalance?.cash
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>+ Ingreso del mes en Banco:</strong>
                </div>
                <div
                  className={`total ${
                    reportSumarize?.currentMonthlyBalance
                      ?.totalAmounthIncomeBank > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(
                    reportSumarize?.currentMonthlyBalance
                      ?.totalAmounthIncomeBank
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>+ Ingreso del mes en Efectivo:</strong>
                </div>
                <div
                  className={`total ${
                    reportSumarize?.currentMonthlyBalance
                      ?.totalAmounthIncomeCash > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(
                    reportSumarize?.currentMonthlyBalance
                      ?.totalAmounthIncomeCash
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>Total Ingresos del Mes:</strong>
                </div>
                <div
                  className={`total ${
                    getTotalMonth() > 0 ? "positive" : "negative"
                  }`}
                >
                  {utils.formateLps(getTotalMonth())}
                </div>
              </div>
            </div>

            {/* Tabla de Gastos */}
            <div className="table-section">
              <div className="item">
                <div className="title">
                  <strong>- Gasto del mes en Banco:</strong>
                </div>
                <div className="total negative">
                  {utils.formateLps(
                    reportSumarize?.currentMonthlyBalance
                      ?.totalAmounthSpendingBank
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>- Gasto del mes en Efectivo:</strong>
                </div>
                <div className="total negative">
                  {utils.formateLps(
                    reportSumarize?.currentMonthlyBalance
                      ?.totalAmounthSpendingCash
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>Total Gastos del Mes:</strong>
                </div>
                <div className="total negative">
                  {utils.formateLps(
                    reportSumarize?.currentMonthlyBalance
                      ?.totalAmounthSpendingCash +
                      reportSumarize?.currentMonthlyBalance
                        ?.totalAmounthSpendingBank
                  )}
                </div>
              </div>
            </div>
            {/* Disponible del Mes */}
            <div className="table-section">
              <div className="item">
                <div className="title">
                  <strong>Disponible en Banco:</strong>
                </div>
                <div
                  className={`total ${
                    getAvailableInBank() > 0 ? "positive" : "negative"
                  }`}
                >
                  {utils.formateLps(getAvailableInBank())}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>Disponible en Efectivo:</strong>
                </div>
                <div
                  className={`total ${
                    getAvailableInCash() > 0 ? "positive" : "negative"
                  }`}
                >
                  {utils.formateLps(getAvailableInCash())}
                </div>
              </div>
              <div className="item">
                <div className="title">
                  <strong>DISPONIBLE DEL MES:</strong>
                </div>
                <div
                  className={`total ${
                    getTotalEnableMonth() > 0 ? "positive" : "negative"
                  }`}
                >
                  {utils.formateLps(getTotalEnableMonth())}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportSumarizePdfStyled>
  );
};

export default ReportSumarizePdf;
