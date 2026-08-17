import React from "react";
import { utils } from "../../../../Helpers/utils";
import { getDate } from "../../../../Helpers/FormatDate";
import { ReportPendingPdfStyled } from "./styled";

const ReportPendingPdf = ({
  componentRef,
  reportPending,
  residentialSelected,
  filters,
}) => {
  
  const month = filters.month.getMonth();
  const year = filters.month.getFullYear().toString(); 
  const monthYearString = `${utils.getMonthName(month )} - ${year}`;
  return (
    <ReportPendingPdfStyled
      ref={componentRef}
      isIncoming={filters.reportType === "Incomes"}
    >
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
              <span>Reporte de Saldos Pendientes</span>
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
            alignItems: "center",
          }}
        >
          <div>
            <div>
              <strong>Reporte Mes de {monthYearString}</strong>
            </div>
          </div>
        </div>
        <div className="date-range">
          <div className="table">
            <div className="header-item">
              <div>
                <strong>Residente</strong>
              </div>
              <div>
                <strong>Tipo de Ingreso</strong>
              </div>
              <div>
                <strong>Bloque y Casa</strong>
              </div>
              <div>
                <strong>Último Pago</strong>
              </div>

              <div>
                <strong>Último Mes Pagado</strong>
              </div>
              <div>
                <strong>Meses Adeudados</strong>
              </div>
              <div>
                <strong>Tiene Arreglo de Pago</strong>
              </div>
              <div style={{ textAlign: "center" }}>
                <strong>Saldo</strong>
              </div>
            </div>
            <div className="item-container">
              {reportPending?.map((item) => (
                <div className="item">
                  <div>{item?.residentName}</div>
                  <div>{item?.paymentName}</div>
                  <div>{item?.blockAndHouse}</div>
                  <div>{item?.lastPayment}</div>
                  <div>{item?.lastMonth}</div>
                  <div>{item?.monthQuantityDelayed}</div>
                  <div>{item?.hasPartialPayment}</div>
                  <div style={{ textAlign: "right" }}>
                    {utils.formateLps(item?.pendingAmount)}
                  </div>
                </div>
              ))}
              <div className="total">
                <div>
                  <strong>Total de Deuda:</strong>
                </div>
                <div></div>
                <div style={{ textAlign: "right", fontWeight: "900" }}>
                  {utils.formateLps(
                    reportPending?.reduce(
                      (accumulator, item) => {
                        return accumulator + item.pendingAmount;
                      },
                      0
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportPendingPdfStyled>
  );
};

export default ReportPendingPdf;
