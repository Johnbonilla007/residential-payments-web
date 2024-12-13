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

const PendingPaymentReport = () => {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({ onlyPending: true });
  const [loading, setLoading] = useState(false);
  const [pandingPayments, setPandingPayments] = useState([]);
  const [printReport, setPrintReport] = useState(false);
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

  const handleGenerateReport = async () => {
    setLoading(true);

    const request = {
      ...filters,
      residentialNo: residentialSelected.residentialNo,
      month: utils.FormatDate(filters?.month),
    };
    const response = await PendingPaymentReportService.generateReport(request);
    setLoading(false);

    if (response.success) {
      setPandingPayments(response.pendingPayments);
      return;
    }

    toast.current.show({
      severity: "warn",
      summary: "Advertencia",
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

  return (
    <Container>
      <Toast ref={toast} />
      <PendingPaymentReportStyled>
        <div className="filters">
          {canShowResidentialControl && (
            <Dropdown
              className="commandbox"
              value={residentialSelected}
              options={residentials}
              onChange={handleOnchangeResidential}
              optionLabel="name"
              placeholder="Seleccione una Residencial"
              filter
            />
          )}
          <Dropdown
            className="commandbox"
            name="paymentTypeNo"
            value={filters.paymentTypeNo}
            options={paymentTypes}
            onChange={handleOnChangeFilters}
            optionLabel="name"
            optionValue="paymentTypeNo"
            placeholder="Seleccione Un Tipo de Pago"
            filter
          />
          <div>
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
              <div style={{ alignItems: "center", display: "flex" }}>
                <InputText value={getAccountsValue()} readOnly={true} />
                <Button
                  icon="pi pi-times"
                  className="p-button-rounded p-button-danger p-button-text"
                  aria-label="Cancel"
                  onClick={() => setFilters({ ...filters, residenceNo: "" })}
                />
              </div>
            )}
          </div>
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
          {utils.evaluateArray(pandingPayments) && (
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
        <TableControl
          loading={loading}
          items={pandingPayments}
          title="Reporte De Pagos Pendientes"
          filter={filtersTable}
          setFilter={setFiltersTable}
          filterFields={filterFields}
          columns={pendingPaymentColumns}
          emptyMessage="No hay registros para mostrar"
        />
      </PendingPaymentReportStyled>
    </Container>
  );
};

export default PendingPaymentReport;
