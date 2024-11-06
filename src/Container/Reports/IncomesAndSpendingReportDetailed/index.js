/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { IncomeReportStyled } from "./styles";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { getRequestUserInfo, restClient } from "../../../Helpers/restClient";
import { utils } from "../../../Helpers/utils";
import { Calendar } from "primereact/calendar";
import TableControl from "../../../Components/Controls/TableControl";
import { columnsIncomesReport, columnsSpendingsReport } from "./settings";
import { Checkbox } from "primereact/checkbox";
import { UsersServices } from "../../Users/User/users.service";
import { REPORT_TYPE, TipoCuentas } from "../../../Helpers/Constant";
import { CreateOrUpdateSpendingTypeService } from "../../Invoice/Components/CreateOrUpdateSpendingType/CreateOrUpdateSpendingType.Service";
import { InvoiceServices } from "../../Invoice/Invoice.Service";
import { IncomeAndSpendingReportDetailedService } from "./IncomeAndSpendingReportDetailed.Service";
import { FilterMatchMode } from "primereact/api";
import { Toast } from "primereact/toast";
import CustomDropDown from "../../../Components/Controls/CustomDropDown";
import { InputText } from "primereact/inputtext";
import { ReportPdfControl } from "../Components/ReportPdfControl";

const IncomeAndSpendingReportDetailed = () => {
  const [residences, setResidences] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [filtersReport, setFiltersReport] = useState({
    includeDates: true,
    reportType: REPORT_TYPE.Incomes,
  });
  const [loading, setLoading] = useState(false);
  const [itemsReport, setItemsReport] = useState([]);
  const [residentialSelected, setResidentialSelected] = useState(null);
  const [residentialList, setResidentialList] = useState([]);
  const [spendingTypes, setSpendingTypes] = useState([]);
  const [printReport, setPrintReport] = useState(false);
  const [filtersIncomesReport, setFiltersIncomesReport] = useState({
    invoiceDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    depositNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    paymentTypeName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    paymentWay: { value: null, matchMode: FilterMatchMode.CONTAINS },
    blockAndHouseNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residenceName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [filtersSpendingReport, setFiltersSpendingReport] = useState({
    invoiceDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    spendingTypeName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    vendor: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef(null);
  useEffect(() => {
    loadPaymentTypes();
    loadSpendingTypes();
    loadResidences();
  }, [residentialSelected]);

  const loadSpendingTypes = async () => {
    if (residentialSelected?.residentialNo) {
      const response = await CreateOrUpdateSpendingTypeService.getSpendingTypes(
        residentialSelected.residentialNo
      );
      if (response?.success) {
        if (utils.evaluateArray(response.spendingTypes)) {
          response.spendingTypes.unshift({
            spendingTypeNo: "",
            name: "Todos",
          });
        }
        setSpendingTypes(response.spendingTypes);
        return;
      }
    }
  };

  const loadPaymentTypes = async () => {
    if (residentialSelected?.residentialNo) {
      const response = await InvoiceServices.getPaymentTypes(
        residentialSelected.residentialNo
      );

      if (utils.evaluateArray(response.paymentTypes)) {
        response.paymentTypes.unshift({
          paymentTypeNo: "PT0000000",
          name: "Otros",
        });
        response.paymentTypes.unshift({
          paymentTypeNo: "",
          name: "Todos",
        });
        setPaymentTypes(response.paymentTypes);
      }
    }
  };

  useEffect(() => {
    handleFechtResidential();
  }, []);

  const userInfo = getRequestUserInfo();

  const handleFechtResidential = async () => {
    if (utils.evaluateFullObjetct(userInfo)) {
      const account = userInfo.accounts[0];
      const permission = account.accountType;
      const showAllResidentials =
        permission === TipoCuentas.administrador ||
        utils.hasPermission("VerTodasLasResidenciales");

      if (showAllResidentials) {
        const response = await UsersServices.getAllResidential({});
        if (response?.success) {
          setResidentialList(response.residentials);
          if (utils.evaluateFullObjetct(residentialSelected)) {
            const residential = response.residentials.find(
              (x) => x.residentialId === residentialSelected.residentialId
            );
            setResidentialSelected(residential);
          }
        }
        return;
      }

      const request = {
        searchValue: userInfo.residentialNo,
      };
      const response = await restClient.httpGet(
        "/security/residentials/get-residentials",
        request
      );
      if (response.success) {
        setResidentialList([response.residential]);
        setResidentialSelected(response.residential);
      }
    }
  };

  const handleOnchangeResidential = (e) => {
    setResidentialSelected(e.value);
  };

  const loadResidences = async () => {
    if (residentialSelected) {
      const response =
        await IncomeAndSpendingReportDetailedService.getResidencesByResidentialNo(
          residentialSelected.residentialNo
        );

      if (utils.evaluateArray(response.residences)) {
        const filteredResidences = response.residences.filter((residence) => {
          // Filtra solo las residencias que tienen al menos un objeto en accounts
          return (
            Array.isArray(residence.accounts) && residence.accounts.length > 0
          );
        });
        const residenceAndManeger = filteredResidences.map(item=>{
          const account = item.accounts.find(x=>x.isManager) || item.accounts[0]
          item.fullName = account.fullName;
          return item;
        })
        setResidences(residenceAndManeger);
      }
    }
  };

  const handleOnChangeFilters = (event) => {
    if (event.target.name === "reportType") {
      if (event.value !== "Incomes") {
        setFiltersReport({
          ...filtersReport,
          [event.target.name]: event.value,
          residenceNo: null,
        });
        return;
      }
    }
    setFiltersReport({ ...filtersReport, [event.target.name]: event.value });
  };
  const formatDateToMMDDYYYY = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes en formato MM
    const day = date.getDate().toString().padStart(2, "0"); // Día en formato DD
    const year = date.getFullYear(); // Año en formato YYYY
    return `${month}/${day}/${year}`; // Formato MM/DD/YYYY
  };
  const handleGenerateReport = async () => {
    setLoading(true);

    const request = {
      ...filtersReport,
      residentialNo: residentialSelected.residentialNo,
      startDate:
        filtersReport.includeDates &&
        filtersReport.startDate &&
        formatDateToMMDDYYYY(filtersReport.startDate),
      endDate:
        filtersReport.includeDates &&
        filtersReport.endDate &&
        formatDateToMMDDYYYY(filtersReport.endDate),
    };

    const response =
      await IncomeAndSpendingReportDetailedService.generateReport(request);

    if (response && response.success) {
      if (filtersReport.reportType === REPORT_TYPE.Incomes) {
        setItemsReport(response.incomesReport);
      } else {
        setItemsReport(response.spendingsReport);
      }
      setLoading(false);

      return;
    }
    setLoading(false);

    toast.current.show({
      severity: "warn",
      summary: "Advertencia",
      detail: response.validationErrorMessage,
      life: 3000,
    });
  };

  const handleCleanDates = (event) => {
    setFiltersReport({ ...filtersReport, includeDates: event.target.checked });
  };

  const canShowResidentialControl = useMemo(() => {
    const account = userInfo.accounts[0];
    const permission = account.accountType;
    return (
      permission === TipoCuentas.administrador ||
      utils.hasPermission("VerTodasLasResidenciales")
    );
  }, [userInfo]);

  const filterFieldsIncomesReport = useMemo(() => {
    return [
      "invoiceDate",
      "invoiceNo",
      "depositNo",
      "paymentTypeName",
      "description",
      "amount",
      "paymentWay",
      "residenceName",
      "blockAndHouseNumber",
    ];
  }, []);

  const filterFieldsSpendingReport = useMemo(() => {
    return [
      "invoiceDate",
      "invoiceNo",
      "spendingTypeName",
      "description",
      "amount",
      "vendor",
    ];
  }, []);

  const propertiesTable = useMemo(() => {
    if (filtersReport.reportType === REPORT_TYPE.Incomes) {
      return {
        columns: columnsIncomesReport,
        title: "Reporte de Ingresos",
        filters: filtersIncomesReport,
        filterFields: filterFieldsIncomesReport,
        setFilters: setFiltersIncomesReport,
        emptyMessage: "No hay ingresos en estas fecha",
      };
    }
    return {
      columns: columnsSpendingsReport,
      title: "Reporte de Gastos",
      filters: filtersSpendingReport,
      filterFields: filterFieldsSpendingReport,
      setFilters: setFiltersSpendingReport,
      emptyMessage: "No hay gastos en estas fecha",
    };
  }, [filtersReport.reportType]);

  const itemTemplate = (item) => {

    return (
      <div
        className="dropdown-item"
        style={{
          display: "grid",
          gridTemplateColumns: "70% 15% 15%",
          padding: "5px",
          cursor: "pointer",
        }}
      >
        <div>{item.fullName}</div>
        <div>{item.block}</div>
        <div>{item.houseNumber}</div>
      </div>
    );
  };
  const getRersidenceValue = () => {
    const residenceName = residences.find(
      (x) => x.residenceNo === filtersReport.residenceNo
    );
    return residenceName?.fullName || "";
  };
  return (
    <Container>
      <Toast ref={toast} />

      <IncomeReportStyled>
        <div className="filters">
          {canShowResidentialControl && (
            <Dropdown
              className="commandbox"
              value={residentialSelected}
              options={residentialList}
              onChange={handleOnchangeResidential}
              optionLabel="name"
              placeholder="Seleccione una Residencial"
              filter
            />
          )}
          <Dropdown
            className="commandbox"
            name="reportType"
            value={filtersReport.reportType}
            options={[
              { name: "Ingresos", reportType: "Incomes" },
              { name: "Gastos", reportType: "Spending" },
            ]}
            onChange={handleOnChangeFilters}
            optionLabel="name"
            optionValue="reportType"
            placeholder="Seleccione el tipo de reporte"
          />
          {filtersReport.reportType === REPORT_TYPE.Incomes && (
            <div>
              {utils.isNullOrEmpty(filtersReport.residenceNo) ? (
                <CustomDropDown
                  items={residences}
                  itemTemplate={itemTemplate}
                  onChange={(value) => {
                    setFiltersReport({
                      ...filtersReport,
                      residenceNo: value,
                    });
                  }}
                  placeholder="Seleccione una Residencia"
                  filterProperties={["name", "block", "houseNumber"]}
                  combinedProperties={[
                    (item) => `${item.block}${item.houseNumber}`,
                  ]}
                  optionValue="residenceNo"
                />
              ) : (
                <div style={{ alignItems: "center", display: "flex" }}>
                  <InputText value={getRersidenceValue()} readOnly={true} />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-text"
                    aria-label="Cancel"
                    onClick={() =>
                      setFiltersReport({ ...filtersReport, residenceNo: "" })
                    }
                  />
                </div>
              )}
            </div>
          )}
          {filtersReport.reportType === REPORT_TYPE.Incomes && (
            <Dropdown
              className="commandbox"
              name="paymentTypeNo"
              value={filtersReport.paymentTypeNo}
              options={paymentTypes}
              onChange={handleOnChangeFilters}
              optionLabel="name"
              optionValue="paymentTypeNo"
              placeholder="Seleccione Un Tipo de Pago"
              filter
            />
          )}
          {filtersReport.reportType === REPORT_TYPE.Spending && (
            <Dropdown
              className="commandbox"
              name="spendingTypeNo"
              value={filtersReport.spendingTypeNo}
              options={spendingTypes}
              onChange={handleOnChangeFilters}
              optionLabel="name"
              optionValue="spendingTypeNo"
              placeholder="Seleccione Un Tipo de Gasto"
              filter
            />
          )}
          <div className="calendar">
            <label htmlFor="basic">Desde: </label>
            <Calendar
              id="basic"
              name="startDate"
              value={filtersReport.startDate}
              onChange={handleOnChangeFilters}
            />
          </div>

          <div className="calendar">
            <label htmlFor="basic">Hasta: </label>
            <Calendar
              id="basic"
              name="endDate"
              value={filtersReport.endDate}
              onChange={handleOnChangeFilters}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "space-around",
              alignItems: "center",
              gap: 5,
            }}
          >
            <label htmlFor="basic">Incluir Fechas</label>
            <Checkbox
              icon="pi pi-check"
              checked={filtersReport.includeDates}
              loading={loading}
              onChange={handleCleanDates}
            />
          </div>
          <Button
            label="Generar"
            icon="pi pi-check"
            onClick={handleGenerateReport}
            className="button"
          />
          {utils.evaluateArray(itemsReport) && (
            <Button
              label="Vista Previa de impresión"
              icon="pi pi-print"
              onClick={() => setPrintReport(true)}
              className="p-button-rounded p-button-info"
            />
          )}
        </div>
        {printReport && (
          <ReportPdfControl
            visible={printReport}
            reportType="reportDetail"
            title="Reporte Ingresos y Gastos"
            propsDetail={{
              reportDetail: itemsReport,
              residentialSelected: residentialSelected,
              filters: filtersReport,
            }}
            onDismiss={() => setPrintReport(false)}
            residences={residences}
          />
        )}
        <div>
          <TableControl
            loading={loading}
            items={itemsReport}
            title={propertiesTable.title}
            filter={propertiesTable.filters}
            setFilter={propertiesTable.setFilters}
            filterFields={propertiesTable.filterFields}
            columns={propertiesTable.columns}
            emptyMessage={propertiesTable.emptyMessage}
          />
        </div>
      </IncomeReportStyled>
    </Container>
  );
};

export default IncomeAndSpendingReportDetailed;
