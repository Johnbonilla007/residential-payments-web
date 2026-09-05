import React from "react";
import { utils } from "../../../../Helpers/utils";
import { getDate } from "../../../../Helpers/FormatDate";
import { ReportDetailPdfStyled } from "./styled";

const ReportDetailPdf = ({
  componentRef,
  reportDetail,
  residentialSelected,
  filters,
  residences,
}) => {
  
  return (
    <ReportDetailPdfStyled
      ref={componentRef}
      isIncoming={filters.reportType === "Incomes"}
    >
      <div>
        <div className="container-header">
          <img
            alt="logo residencial"
            src={
              !utils.isNullOrEmpty(residentialSelected?.logoResidential)
                ? residentialSelected.logoResidential
                : "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/residenciales.jpg"
            }
            className="header-logo"
          />
          <div className="header-info">
            <div className="header-residential-name">{residentialSelected?.name}</div>
            <div className="header-department">
              {!utils.isNullOrEmpty(filters.residenceNo)
                ? "Estado de Cuenta"
                : `Reporte de ${
                    filters.reportType === "Incomes" ? "Ingresos" : "Gastos"
                  }`}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!utils.isNullOrEmpty(filters.startDate) &&
            !utils.isNullOrEmpty(filters.endDate) && (
              <div>
                <div>
                  <strong>Comprendido entre las fechas</strong>
                </div>
                <div>
                  <strong>
                    {getDate(filters.startDate)} - {getDate(filters.endDate)}
                  </strong>
                </div>
              </div>
            )}
        </div>
        <div className="date-range">
          <div className="table">
            <div className="header-item">
              <div>
                <strong>Fecha</strong>
              </div>
              <div>
                <strong>Correlativo</strong>
              </div>
              {filters.reportType === "Incomes" && (
                <div>
                  <strong>Residencia</strong>
                </div>
              )}
              {filters.reportType === "Incomes" && (
                <div>
                  <strong>Bloque y Casa</strong>
                </div>
              )}
              <div>
                <strong>{`Tipo de ${
                  filters.reportType === "Incomes" ? "Ingreso" : "Gasto"
                }`}</strong>
              </div>
              {filters.reportType === "Incomes" && (
                <div>
                  <strong>Úlitmo Mes Pagado</strong>
                </div>
              )}
              <div>
                <strong>Monto</strong>
              </div>
            </div>
            <div className="item-container">
              {reportDetail?.map((item) => (
                <div className="item">
                  <div>{item?.invoiceDate}</div>
                  <div>{item?.invoiceNo}</div>
                  {filters.reportType === "Incomes" && (
                    <div>{item?.residenceName}</div>
                  )}
                  {filters.reportType === "Incomes" && (
                    <div>{item?.blockAndHouseNumber}</div>
                  )}
                  <div>{item?.description}</div>
                  {filters.reportType === "Incomes" && (
                    <div>{item?.lastPaidMonth}</div>
                  )}
                  <div style={{ textAlign: "right" }}>
                    {utils.formateLps(item?.amount)}
                  </div>
                </div>
              ))}
              <div className="total">
                <div>
                  <strong>
                    {!utils.isNullOrEmpty(filters.residenceNo)
                      ? "Total"
                      : `Total de ${
                          filters.reportType === "Incomes"
                            ? "Ingresos"
                            : "Gastos"
                        }`}
                    :{" "}
                  </strong>
                </div>
                <div></div>
                <div style={{ textAlign: "right", fontWeight: "900" }}>
                  {utils.formateLps(
                    reportDetail.reduce((accumulator, item) => {
                      return accumulator + item.amount;
                    }, 0)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportDetailPdfStyled>
  );
};

export default ReportDetailPdf;
