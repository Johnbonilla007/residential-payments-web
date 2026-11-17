/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { PendingPaymentReportStyled } from "./styles";
import TableControl from "../../../Components/Controls/TableControl";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { PendingPaymentReportService } from "./PendingPaymentReport.Service";
import { utils } from "../../../Helpers/utils";
import { pendingPaymentColumns } from "./settings";
import { getRequestUserInfo } from "../../../Helpers/restClient";
import { TipoCuentas } from "../../../Helpers/Constant";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { ReportPdfControl } from "../Components/ReportPdfControl";
import CustomDropDown from "../../../Components/Controls/CustomDropDown";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { setResidentialSelected } from "../../Invoice/reducer";
import { useIsMobile } from "../../../Helpers/useIsMobile";
import MobilePage from "../../../Components/Controls/MobilePage";
import FilterChips from "../../../Components/Controls/FilterChips";
import FilterSheet from "../../../Components/Controls/FilterSheet";
import CollapsibleFilters from "../../../Components/Controls/CollapsibleFilters";

const MOBILE_PAGE_SIZE = 20;

const PendingPaymentReport = () => {
  const isMobile = useIsMobile();
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({ onlyPending: true });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pandingPayments, setPandingPayments] = useState([]);
  const [printReport, setPrintReport] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const toast = useRef(null);

  const [filtersTable, setFiltersTable] = useState({
    accountNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residentName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    paymentName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    blockAndHouse: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pendingAmount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastPayment: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastMonth: { value: null, matchMode: FilterMatchMode.CONTAINS },
    monthQuantityDelayed: { value: null, matchMode: FilterMatchMode.CONTAINS },
    hasPartialPayment: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const { residentialSelected, residentials } = useSelector(
    (store) => store.Invoice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (utils.evaluateFullObjetct(residentialSelected)) {
      loadPaymentTypes();
      loadAccounts();
    }
  }, [residentialSelected]);

  const userInfo = useMemo(() => {
    return getRequestUserInfo();
  }, []);

  const loadPaymentTypes = async () => {
    setLoading(true);

    const response = await PendingPaymentReportService.getPaymentTypes(
      residentialSelected.residentialNo
    );

    if (utils.evaluateArray(response.paymentTypes)) {
      response.paymentTypes.unshift({
        paymentTypeNo: "",
        name: "Todos",
      });
    }

    setPaymentTypes(response.paymentTypes);
    setLoading(false);
  };

  const loadAccounts = async () => {
    setLoading(true);

    const response = await PendingPaymentReportService.getManagerAccounts(
      residentialSelected.residentialNo
    );

    if (utils.evaluateArray(response.accounts)) {
      setAccounts(response.accounts);
    }
    setLoading(false);
  };

  const handleOnChangeFilters = (event) => {
    setFilters({ ...filters, [event.target.name]: event.value });
  };

  const handleGenerateReport = async (nextPage = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    const request = {
      ...filters,
      residentialNo: residentialSelected.residentialNo,
      month: utils.FormatDate(filters?.month),
      ...(isMobile
        ? {
            pageNumber: nextPage,
            pageSize: MOBILE_PAGE_SIZE,
            searchTerm: mobileSearch?.trim() || undefined,
          }
        : {}),
    };
    const response = await PendingPaymentReportService.generateReport(request);
    setLoading(false);
    setLoadingMore(false);

    if (response?.success) {
      const incoming = response.pendingPayments || [];
      setPandingPayments((prev) => (append ? [...prev, ...incoming] : incoming));
      setPageNumber(nextPage);
      setHasMore(Boolean(response.hasMore));
      return;
    }

    toast.current.show({
      severity: "warn",
      summary: "Advertencia",
      detail: response?.validationErrorMessage || "No se pudo generar el reporte",
      life: 3000,
    });
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    await handleGenerateReport(pageNumber + 1, true);
  };

  const handleResetFilters = () => {
    setFilters({ onlyPending: true });
    setMobileSearch("");
  };

  const displayedMobilePayments = useMemo(() => {
    const q = mobileSearch.trim().toLowerCase();
    if (!q) return pandingPayments;
    return (pandingPayments || []).filter(
      (item) =>
        item.residentName?.toString().toLowerCase().includes(q) ||
        item.blockAndHouse?.toLowerCase().includes(q) ||
        item.paymentName?.toLowerCase().includes(q) ||
        item.accountNumber?.toString().toLowerCase().includes(q),
    );
  }, [pandingPayments, mobileSearch]);

  const canShowResidentialControl = useMemo(() => {
    const account = userInfo?.accounts[0];
    const permission = account?.accountType;
    return (
      permission === TipoCuentas.administrador ||
      utils.hasPermission("VerTodasLasResidenciales")
    );
  }, [userInfo]);

  const handleOnchangeResidential = (e) => {
    dispatch(setResidentialSelected(e.value));
  };

  const filterFields = [
    "accountNumber",
    "residentName",
    "paymentName",
    "blockAndHouse",
    "pendingAmount",
    "lastPayment",
    "lastMonth",
    "monthQuantityDelayed",
    "hasPartialPayment",
  ];

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

  const getAccountsValue = () => {
    const residenceName = accounts.find(
      (x) => x.residenceNo === filters.residenceNo
    );
    return residenceName?.fullName || "";
  };

  const excelFileName = useMemo(() => {
    const monthText = filters.month
      ? utils.FormatDateMonth(filters.month)
      : "";
    return monthText
      ? `Lista de Pagos Pendientes - ${monthText}`
      : "Lista de Pagos Pendientes";
  }, [filters.month]);

  const renderFilterFields = () => (
    <div className="filters">
      {canShowResidentialControl && (
        <div className="filter-item">
          <label>Residencial</label>
          <Dropdown
            value={residentialSelected}
            options={residentials}
            onChange={handleOnchangeResidential}
            optionLabel="name"
            placeholder="Seleccione una Residencial"
            filter
          />
        </div>
      )}
      <div className="filter-item">
        <label>Tipo de Pago</label>
        <Dropdown
          name="paymentTypeNo"
          value={filters.paymentTypeNo}
          options={paymentTypes}
          onChange={handleOnChangeFilters}
          optionLabel="name"
          optionValue="paymentTypeNo"
          placeholder="Seleccione Un Tipo de Pago"
          filter
        />
      </div>
      <div className="filter-item">
        <label>Residencia</label>
        {utils.isNullOrEmpty(filters.residenceNo) ? (
          <CustomDropDown
            items={accounts}
            itemTemplate={itemTemplate}
            onChange={(value) => {
              setFilters({
                ...filters,
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
          <div className="selected-residence-container">
            <InputText value={getAccountsValue()} readOnly={true} />
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger p-button-text"
              aria-label="Limpiar residencia"
              onClick={() => setFilters({ ...filters, residenceNo: "" })}
            />
          </div>
        )}
      </div>
      <div className="filter-item">
        <label htmlFor="basic">Mes</label>
        <Calendar
          id="basic"
          name="month"
          value={filters.month}
          onChange={handleOnChangeFilters}
          view="month"
          dateFormat="mm/yy"
          placeholder="Seleccione Mes"
        />
      </div>
    </div>
  );

  const activeFilterCount = [
    filters.paymentTypeNo,
    filters.residenceNo,
    filters.month,
  ].filter(Boolean).length;

  const mobileChips = [
    {
      id: "month",
      label: filters.month ? utils.FormatDateMonth(filters.month) : "Mes",
      active: Boolean(filters.month),
      icon: "pi pi-calendar",
      dropdown: true,
      onToggle: () => setFilterSheetOpen(true),
    },
    {
      id: "paymentType",
      label:
        paymentTypes?.find((p) => p.paymentTypeNo === filters.paymentTypeNo)
          ?.name || "Tipo de Pago",
      active: Boolean(filters.paymentTypeNo),
      dropdown: true,
      onToggle: () => setFilterSheetOpen(true),
    },
    {
      id: "onlyPending",
      label: "Solo pendientes",
      active: Boolean(filters.onlyPending),
      onToggle: () =>
        setFilters((prev) => ({ ...prev, onlyPending: !prev.onlyPending })),
    },
  ];

  const desktopHeader = (
    <CollapsibleFilters>
      <div className="filter-card">
        {renderFilterFields()}

        <div className="filter-actions">
          <Button
            label="Generar Reporte"
            icon="pi pi-check"
            onClick={() => handleGenerateReport(1, false)}
            className="btn-generate"
          />
          {utils.evaluateArray(pandingPayments) && (
            <Button
              label="Imprimir"
              icon="pi pi-print"
              onClick={() => setPrintReport(true)}
              className="btn-print"
              tooltip="Vista Previa de impresión"
              tooltipOptions={{ position: "top" }}
            />
          )}
        </div>
      </div>
    </CollapsibleFilters>
  );

  return (
    <Container>
      <Toast ref={toast} />
      <PendingPaymentReportStyled>
        <MobilePage
          title="Reporte de Pagos Pendientes"
          desktopHeader={desktopHeader}
          search={{
            value: mobileSearch,
            onChange: setMobileSearch,
            placeholder: "Buscar residente, bloque/casa o cuenta...",
          }}
          filters={
            <FilterChips
              chips={mobileChips}
              activeCount={activeFilterCount}
              onOpenSheet={() => setFilterSheetOpen(true)}
            />
          }
          headerActions={
            utils.evaluateArray(pandingPayments)
              ? [
                  {
                    label: "Imprimir PDF",
                    icon: "pi pi-print",
                    onClick: () => setPrintReport(true),
                  },
                ]
              : []
          }
          onRefresh={
            filters?.month ? () => handleGenerateReport(1, false) : undefined
          }
          refreshing={loading}
          fab={{
            icon: "pi pi-sliders-h",
            label: "Filtros / Generar",
            onClick: () => setFilterSheetOpen(true),
          }}
        >
          {printReport && (
            <ReportPdfControl
              visible={printReport}
              reportType="reportPending"
              title="Reporte de Saldos Pendientes"
              propsPending={{
                reportPending: pandingPayments,
                residentialSelected: residentialSelected,
                filters: filters,
              }}
              onDismiss={() => setPrintReport(false)}
            />
          )}
          <div className="table-container">
            <TableControl
              loading={loading}
              items={isMobile ? displayedMobilePayments : pandingPayments}
              title="Reporte De Pagos Pendientes"
              filter={filtersTable}
              setFilter={setFiltersTable}
              filterFields={filterFields}
              columns={pendingPaymentColumns}
              emptyMessage="Seleccione un mes y presione Generar Reporte"
              isExportExcel
              fileName={excelFileName}
              hasMore={isMobile && hasMore}
              onLoadMore={isMobile && hasMore ? handleLoadMore : undefined}
              loadingMore={loadingMore}
            />
          </div>
        </MobilePage>

        <FilterSheet
          visible={filterSheetOpen}
          onHide={() => setFilterSheetOpen(false)}
          title="Filtros del Reporte"
          applyLabel="Generar Reporte"
          onApply={() => handleGenerateReport(1, false)}
          onReset={handleResetFilters}
        >
          <FilterSheet.Section>{renderFilterFields()}</FilterSheet.Section>
        </FilterSheet>
      </PendingPaymentReportStyled>
    </Container>
  );
};

export default PendingPaymentReport;
