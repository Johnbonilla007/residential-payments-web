import React, { useEffect, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import {
  AlertReportStyled,
  ButtonContainer,
  StyledButton,
  StyledLabel,
} from "./styles";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import TableControl from "../../../Components/Controls/TableControl";
import { columns } from "./settings";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { AlertReportService } from "./AlertReport.Service";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";

const AlertReport = () => {
  const toast = useRef(null);

  const [filters, setFilters] = useState({ page: 1, pageSize: 20 });
  const [filtersTable, setFiltersTable] = useState({
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    error: { value: null, matchMode: FilterMatchMode.CONTAINS },
    senderUser: { value: null, matchMode: FilterMatchMode.CONTAINS },
    receiverUser: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sendDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [alerts, setAlerts] = useState([]);
  const handleGenerateReport = async (_filters) => {
    let request = { ...filters };
    if (_filters) {
      request = { ..._filters, page: filters.page === 0 ? 1 : filters.page };
    }

    const response = await AlertReportService.generateRepore(request);

    if (response?.success) {
      response.alerts.push(...response.alerts);
      setAlerts(response.alerts);
      return;
    }

    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "No se puedo generar el reporte",
      life: 3000,
    });
  };

  const handleOnChangeFilters = (event) => {
    const { target, checked } = event;
    const value = event.value || event.target.value;
    const fieldName = target.name;

    setFilters({ ...filters, [fieldName]: value || checked });
  };

  const handleOnPage = (movement, value) => {
    const _filters = filters;

    if (movement) {
      if (movement === "back") {
        _filters.page = _filters.page > 0 ? _filters.page - 1 : 0;
      } else {
        _filters.page = _filters.page + 1;
      }
    }

    if (value) {
      _filters.page = value;
    }

    setFilters({ ..._filters });
    handleGenerateReport(_filters);
  };

  return (
    <Container>
      <Toast ref={toast} />

      <AlertReportStyled>
        <div className="filters">
          <InputText
            placeholder="Escribe algo..."
            name="searchValue"
            value={filters.searchValue}
            onChange={handleOnChangeFilters}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "space-around",
              alignItems: "center",
              gap: 5,
            }}
          >
            <label htmlFor="basic">Solo alertas Recibídas</label>
            <Checkbox
              checked={filters.onlyAlertReceived}
              icon="pi pi-check"
              name="onlyAlertReceived"
              onChange={handleOnChangeFilters}
              // checked={filtersReport.includeDates}
              // loading={loading}
              // onChange={handleCleanDates}
            />
          </div>
          <Button
            label="Generar"
            icon="pi pi-check"
            onClick={() => handleGenerateReport()}
            className="button"
          />
        </div>

        <div>
          <TableControl
            rows={20}
            isExportExcel
            paginator={false}
            items={alerts}
            // onPage={handleOnPage}
            title="Reporte de Alertas"
            filter={filtersTable}
            setFilter={setFiltersTable}
            filterFields={[
              "description",
              "error",
              "senderUser",
              "receiverUser",
              "sendDate",
            ]}
            columns={columns}
            fileName="Reporte Alertas"
            emptyMessage="No hay alertas para mostrar"
          />
        </div>
        <ButtonContainer>
          <StyledButton
            label="Atrás"
            icon="pi pi-angle-left"
            className="p-button-raised p-button-info p-button-sm p-button-outlined"
            onClick={() => handleOnPage("back")}
          />
          <StyledLabel>
            <InputNumber
              allowEmpty
              min={1}
              showButtons={false}
              value={filters.page}
              onChange={(event) => handleOnPage(undefined, event.value)}
            />
          </StyledLabel>
          <StyledButton
            label="Adelante"
            icon="pi pi-angle-right"
            className="p-button-raised p-button-info p-button-sm p-button-outlined"
            onClick={() => handleOnPage("forward")}
          />
        </ButtonContainer>
      </AlertReportStyled>
    </Container>
  );
};

export default AlertReport;
