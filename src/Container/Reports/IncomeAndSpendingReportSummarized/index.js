/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { IncomeAndSpendingReportSummarizedStyled } from "./styles";
import { Dropdown } from "primereact/dropdown";
import { IncomeAndSpendingReportSummarizedService } from "./IncomeAndSpendingReport.Service";
import { utils } from "../../../Helpers/utils";
import { Button } from "primereact/button";
import { TipoCuentas } from "../../../Helpers/Constant";
import { getRequestUserInfo } from "../../../Helpers/restClient";
import { Calendar } from "primereact/calendar";
import TableControl from "../../../Components/Controls/TableControl";
import { Toast } from "primereact/toast";
import { ReportPdfControl } from "../Components/ReportPdfControl";
import { useDispatch, useSelector } from "react-redux";
import { setResidentialSelected } from "../../Invoice/reducer";

const IncomeAndSpendingReportSummarized = () => {
  const [filters, setFilters] = useState({});
  const [report, setReport] = useState({});
  const [dateReport, setDateReport] = useState({});
  const [printReport, setPrintReport] = useState(false);
  const toast = useRef(null);
  const userInfo = getRequestUserInfo();
  const { residentialSelected, residentials } = useSelector(
    (store) => store.Invoice
  );
  const dispatch = useDispatch();

  const handleOnChangeFilters = (event) => {
    const { value, target } = event;
    const fieldName = target.name;

    setFilters({ ...filters, [fieldName]: value });
  };
  const handleGenerateReport = async () => {
    const request = {
      residentialNo: residentialSelected.residentialNo,
      month: utils.FormatDate(filters?.month),
    };
    const response =
      await IncomeAndSpendingReportSummarizedService.generateReport(request);

    if (response.success) {
      const newReport = {
        incomesReportSumarized: response.incomesReportSumarized.map((item) => ({
          ...item,
          amount: utils.formateLps(item.amount),
        })),
        spendingReportSumarized: response.spendingReportSumarized.map(
          (item) => ({
            ...item,
            amount: utils.formateLps(item.amount),
          })
        ),
        totalIncomesMonthly: response.totalIncomesMonthly,
        totalMonthlyDifference: response.totalMonthlyDifference,
        totalSpendingMonthly: utils.formateLps(response.totalSpendingMonthly),
        currentMonthlyBalance: response.currentMonthlyBalance,
        previousMonthlyBalance: response.previousMonthlyBalance,
      };
      setReport(newReport);

      return;
    }

    toast.current.show({
      severity: "error",
      summary: "info",
      detail: response.validationErrorMessage,
      life: 3000,
    });
  };

  const canShowResidentialControl = useMemo(() => {
    const account = userInfo?.accounts[0];
    const permission = account?.accountType;
    return (
      permission === TipoCuentas.administrador ||
      utils.hasPermission("VerTodasLasResidenciales")
    );
  }, [userInfo]);

  const columnsTable = useMemo(() => {
    return [
      {
        fieldName: "documentNo",
        name: "Correlativo",
      },
      {
        fieldName: "name",
        name: "Nombre",
      },
      {
        fieldName: "amount",
        name: "Monto",
      },
    ];
  }, []);

  const getTotalMonth = () => {
    if (report) {
      const back = report?.previousMonthlyBalance?.bank || 0;
      const cash = report?.previousMonthlyBalance?.cash || 0;

      const value = report.totalIncomesMonthly + back + cash;

      return value;
    }
    return 0;
  };

  const getTotalEnableMonth = () => {
    if (report) {
      const totalIncoming = getTotalMonth();
      const totalSpendinging =
        report?.currentMonthlyBalance?.totalAmounthSpendingCash +
        report?.currentMonthlyBalance?.totalAmounthSpendingBank;

      return totalIncoming - totalSpendinging;
    }
    return 0;
  };

  const getAvailableInBank = () => {
    if (report) {
      const bankIncoming =
        (report?.previousMonthlyBalance?.bank || 0) +
        (report?.currentMonthlyBalance?.totalAmounthIncomeBank || 0);
      const totalBank =
        bankIncoming -
        (report?.currentMonthlyBalance?.totalAmounthSpendingBank || 0);

      return totalBank;
    }
    return 0;
  };

  const getAvailableInCash = () => {
    if (report) {
      const cashIncoming =
        (report?.previousMonthlyBalance?.cash || 0) +
        (report?.currentMonthlyBalance?.totalAmounthIncomeCash || 0);
      const totalCash =
        cashIncoming -
        (report?.currentMonthlyBalance?.totalAmounthSpendingCash || 0);
      return totalCash;
    }
    return 0;
  };

  return (
    <Container>
      <Toast ref={toast} />

      <IncomeAndSpendingReportSummarizedStyled>
        <div className="filters">
          {canShowResidentialControl && (
            <Dropdown
              className="commandbox"
              value={residentialSelected}
              filter
              options={residentials}
              onChange={(e) => {
                dispatch(setResidentialSelected(e.value));
              }}
              optionLabel="name"
              placeholder="Seleccione una Residencial"
            />
          )}
          <div className="calendar">
            <label htmlFor="basic">Mes: </label>
            <Calendar
              id="basic"
              name="month"
              value={filters.month}
              onChange={handleOnChangeFilters}
              view="month"
              dateFormat="mm/yy"
            />
          </div>

          <Button
            label="Generar"
            icon="pi pi-check"
            onClick={handleGenerateReport}
            className="button"
          />
          {report.totalSpendingMonthly && (
            <Button
              label="Vista Previa de impresión"
              icon="pi pi-print"
              onClick={() => setPrintReport(true)}
              className="p-button-rounded p-button-info"
            />
          )}
        </div>
        <div className="tables">
          <TableControl
            columns={columnsTable}
            items={report.incomesReportSumarized}
            title="Ingresos"
          />

          <TableControl
            items={report.spendingReportSumarized}
            columns={columnsTable}
            title="Gastos"
          />
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
                    report?.previousMonthlyBalance?.bank > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(report?.previousMonthlyBalance?.bank)}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>+ Saldo Anterior en Efectivo:</strong>
                </div>
                <div
                  className={`total ${
                    report?.previousMonthlyBalance?.cash > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(report?.previousMonthlyBalance?.cash)}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>+ Ingreso del mes en Banco:</strong>
                </div>
                <div
                  className={`total ${
                    report?.currentMonthlyBalance?.totalAmounthIncomeBank > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(
                    report?.currentMonthlyBalance?.totalAmounthIncomeBank
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>+ Ingreso del mes en Efectivo:</strong>
                </div>
                <div
                  className={`total ${
                    report?.currentMonthlyBalance?.totalAmounthIncomeCash > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {utils.formateLps(
                    report?.currentMonthlyBalance?.totalAmounthIncomeCash
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
                    report?.currentMonthlyBalance?.totalAmounthSpendingBank
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>- Gasto del mes en Efectivo:</strong>
                </div>
                <div className="total negative">
                  {utils.formateLps(
                    report?.currentMonthlyBalance?.totalAmounthSpendingCash
                  )}
                </div>
              </div>

              <div className="item">
                <div className="title">
                  <strong>Total Gastos del Mes:</strong>
                </div>
                <div className="total negative">
                  {utils.formateLps(
                    report?.currentMonthlyBalance?.totalAmounthSpendingCash +
                      report?.currentMonthlyBalance?.totalAmounthSpendingBank
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
        {printReport && (
          <ReportPdfControl
            visible={printReport}
            reportType="reportSumarize"
            title="Reporte Ingresos y Gastos"
            propsSumarize={{
              reportSumarize: report,
              residentialSelected: residentialSelected,
              dateReport: dateReport,
              filters: filters,
            }}
            onDismiss={() => setPrintReport(false)}
          />
        )}
      </IncomeAndSpendingReportSummarizedStyled>
    </Container>
  );
};

export default IncomeAndSpendingReportSummarized;
