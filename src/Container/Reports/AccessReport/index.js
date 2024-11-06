/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { AccessReportStyled } from "./styles";
import { getRequestUserInfo } from "../../../Helpers/restClient";
import { TipoCuentas } from "../../../Helpers/Constant";
import { utils } from "../../../Helpers/utils";
import { Dropdown } from "primereact/dropdown";
import { UsersServices } from "../../Users/User/users.service";
import { IncomeAndSpendingReportSummarizedService } from "../IncomeAndSpendingReportSummarized/IncomeAndSpendingReport.Service";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import {
  ButtonContainer,
  StyledButton,
  StyledLabel,
} from "../AlertReport/styles";
import TableControl from "../../../Components/Controls/TableControl";
import { FilterMatchMode } from "primereact/api";
import { columns } from "./settings";
import { InputNumber } from "primereact/inputnumber";
import { AccessReportService } from "./AccessReport.Service";
import { Toast } from "primereact/toast";

const filterObject = {
  page: 1,
  pageSize: 20,
  userName: "",
  residentialNo: "",
  day: new Date(),
};

const AccessReport = () => {
  const toast = useRef(null);

  const userInfo = getRequestUserInfo();
  const [residentials, setResidentials] = useState([]);
  const [residentialSelected, setResidentialSelected] = useState(null);
  const [filters, setFilters] = useState(filterObject);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filtersTable, setFiltersTable] = useState({
    userName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residential: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    code: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isActive: { value: null, matchMode: FilterMatchMode.CONTAINS },
    modifiedBy: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [accesses, setAccesses] = useState([]);

  useEffect(() => {
    handleFechtResidential();
  }, []);

  useEffect(() => {
    loadUsersByResidentialNo();
    filters.userName = "";
    filters.page = 1;
    setFilters(filters);
  }, [residentialSelected]);

  const loadUsersByResidentialNo = async () => {
    const request = { searchValue: residentialSelected.residentialNo };

    const response = await UsersServices.getUsers(request);

    if (utils.evaluateArray(response?.users)) {
      const _userNames = response.users.map((x) => x.userName);

      setUsers(_userNames);
    }
  };

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
          setResidentials(response.residentials);
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

      const response =
        await IncomeAndSpendingReportSummarizedService.getResidentialByAccountType(
          request
        );

      if (response.success) {
        setResidentials([response.residential]);
        setResidentialSelected({
          ...response.residential,
          residentialSelected: response.residential,
        });
      }
    }
  };
  const canShowResidentialControl = useMemo(() => {
    const account = userInfo.accounts[0];
    const permission = account.accountType;
    return (
      permission === TipoCuentas.administrador ||
      utils.hasPermission("VerTodasLasResidenciales")
    );
  }, [userInfo]);

  const handleOnChangeFilters = (event) => {
    const { target, checked } = event;
    const value = event.value || event.target.value;
    const fieldName = target.name;

    setFilters({ ...filters, [fieldName]: value || checked });
  };

  const searchItems = (event) => {
    let query = event.query;
    let _filteredItems = [];
    users.forEach((user) => {
      if (user?.toLowerCase()?.includes(query)) {
        _filteredItems.push(user);
      }
    });

    setFilteredUsers(_filteredItems);
  };

  const handleGenerateReport = async () => {
    const request = {
      ...filters,
      residentialNo: residentialSelected?.residentialNo,
    };

    const response = await AccessReportService.generateReport(request);

    if (response.success) {
      setAccesses(response.accesses);
      return;
    }

    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "No se puedo generar el reporte",
      life: 3000,
    });
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
      <AccessReportStyled>
        <Toast ref={toast} />

        <div className="filters">
          {canShowResidentialControl && (
            <Dropdown
              className="commandbox"
              value={residentialSelected}
              filter
              options={residentials}
              onChange={(e) => {
                setResidentialSelected(e.value);
              }}
              optionLabel="name"
              placeholder="Seleccione una Residencial"
            />
          )}
          <div className="calendar">
            <label htmlFor="basic">Fecha: </label>
            <Calendar
              id="basic"
              name="day"
              value={filters.day}
              onChange={handleOnChangeFilters}
            />
          </div>
          <span className="p-float-label">
            <AutoComplete
              name="userName"
              autoHighlight
              value={filters.userName}
              suggestions={filteredUsers}
              completeMethod={searchItems}
              onChange={handleOnChangeFilters}
              virtualScrollerOptions={{ itemSize: 38 }}
              dropdown
            />
            <label htmlFor="ac">Nombre Usuario</label>
          </span>
          <Button
            label="Generar"
            icon="pi pi-check"
            onClick={() => handleGenerateReport()}
            className="button"
          />
        </div>
        <div>
          <TableControl
            rows={100000}
            isExportExcel
            paginator={false}
            items={accesses}
            // onPage={handleOnPage}
            title="Reporte de Alertas"
            filter={filtersTable}
            setFilter={setFiltersTable}
            filterFields={Object.keys(filtersTable).map((x) => x)}
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
            <span className="p-float-label">
              <InputNumber
                min={1}
                showButtons={false}
                value={filters.page}
                onChange={(event) => handleOnPage(undefined, event.value)}
              />
              <label htmlFor="ac">Pág.</label>
            </span>
            <span className="p-float-label">
              <Dropdown
                min={1}
                options={[20, 50, 100, 200, 500, 800, 1000]}
                showButtons={false}
                value={filters.pageSize}
                name="pageSize"
                onChange={handleOnChangeFilters}
              />
              <label htmlFor="ac">Tam. Pág.</label>
            </span>
          </StyledLabel>
          <StyledButton
            label="Adelante"
            icon="pi pi-angle-right"
            className="p-button-raised p-button-info p-button-sm p-button-outlined"
            onClick={() => handleOnPage("forward")}
          />
        </ButtonContainer>
      </AccessReportStyled>
    </Container>
  );
};

export default AccessReport;
