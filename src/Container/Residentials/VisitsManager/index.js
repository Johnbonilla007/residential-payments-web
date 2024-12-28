// VisitsManager.js
import React, { useEffect, useMemo, useState } from "react";
import Container from "../../../Components/ContainerControl";
import {
  ButtonFullWidth,
  DateFilter,
  FiltersWrapper,
  StyeledDataTable,
  UserFilter,
  UserGroup,
  VisitsManagerStyled,
} from "./styles";
import QRScanner from "../../../Components/Controls/QRScanner";
import QRGenerator from "../../../Components/Controls/QRGenerator";
import { getRequestUserInfo } from "../../../Helpers/restClient";
import { utils } from "../../../Helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { UsersServices } from "../../Users/User/users.service";
import { setResidences } from "../../Invoice/reducer";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import TableControl from "../../../Components/Controls/TableControl";
import { VisitsManagerService } from "./VisitsManager.Service";
import { columnsTable, dummyVisits, fieldsVisitForm } from "./settings";
import { setVisits } from "./reducer";
import { FaPlus } from "react-icons/fa";
import VisitsTable from "./components/VisitsTable";
import { VisitForm } from "./components/VisitForm";
import DynamicFormDialog from "../../../Components/DynamicFormDialog";
import moment from "moment";

const VisitsManager = () => {
  const [activeView, setActiveView] = useState("list");
  const [selectedVisit, setSelectedVisit] = useState({});
  const [scanResult, setScanResult] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showFormVisit, setShowFormVisit] = useState(false);
  const { residentialSelected, residences } = useSelector(
    (store) => store.Invoice
  );
  const { visits } = useSelector((store) => store.VisitManager);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const hasPermissionToSeeAllResidences = useMemo(() => {
    const hasPermissionToCheckAllResidences = utils.hasPermission(
      "VerTodasLasResidencias"
    );

    return hasPermissionToCheckAllResidences;
  }, []);
  useEffect(() => {
    loadResidences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermissionToSeeAllResidences, residentialSelected]);

  const loadResidences = async () => {
    const request = {
      searchValue: residentialSelected.residentialNo,
    };

    let response = await UsersServices.getResidence(request);

    const accountIds = userInfo.accounts.select((x) => x.id);

    if (!hasPermissionToSeeAllResidences) {
      response.residences = response.residences.filter((x) =>
        accountIds.includes(x.accountId)
      );
    }

    if (response?.success) {
      dispatch(setResidences(response.residences));
      return;
    }
  };

  useEffect(() => {
    if (utils.evaluateArray(residences)) {
      const customersList = residences
        .filter(
          (item) =>
            item.accounts !== null &&
            item.accounts !== undefined &&
            utils.evaluateArray(item.accounts)
        )
        .map((item) => {
          const account =
            item?.accounts?.find((x) => x.isManager) || item?.accounts[0];
          return {
            userName: account?.userName,
            fullName: account?.fullName,
            block: account?.block,
            houseNumber: account?.houseNumber,
            residenceId: item.id,
            residenceNo: item.residenceNo,
          };
        });

      setCustomers(customersList);
    }
  }, [residences]);

  const userInfo = useMemo(() => getRequestUserInfo(), []);

  const handleScanSuccess = (text) => {
    setScanResult(text);
    console.log("QR Escaneado:", text);
  };

  const handleCreateVisit = () => {
    setShowFormVisit(true);
  };

  const handleGetVisitsByUser = async () => {
    const request = {
      userName: filters.userName,
      date: filters?.date?.toLocaleDateString(),
      queryInfo: { pageIndex: 1, pageSize: 100 },
    };
    const response = await VisitsManagerService.getAllVisitsByUser(request);

    if (response.success) {
      dispatch(setVisits(response.visits));
    }
  };

  const handleOnHideForm = () => {
    setShowFormVisit(false);
    setSelectedVisit({});
  };

  const handleSubmitVisit = async (values) => {
    const { accounts } = userInfo;
    const account = accounts?.firstOrDefault();

    let visitCreateDate;
    debugger;
    if (values.visitCreateDate) {
      visitCreateDate = moment(values.visitCreateDate).format("YYYY-MM-DD");
    } else moment(new Date()).format("YYYY-MM-DD");

    const request = {
      userName: account?.userName,
      visits: [
        {
          ...values,
          visitCreateDate,
          block: account?.block,
          houseNumber: account?.houseNumber,
          residence: account?.residenceNo,
          residenceNo: account?.residenceNo,
          residentialNo: account?.residentialNo,
          residential: account.residential,
          userName: account?.userName,
        },
      ],
    };

    const response = await VisitsManagerService.createOrUpdateVisit(request);
  };

  return (
    <Container
      commands={[
        {
          label: "Crear Visita",
          action: handleCreateVisit,
          icon: () => {
            return <FaPlus size={16} color="#84b6f4" />;
          },
        },
        {
          label: "Generar QR",
          action: () => {},
          icon: () => {
            return <FaPlus size={16} color="#84b6f4" />;
          },
        },
        {
          label: "Escanear QR",
          action: () => {},
          icon: () => {
            return <FaPlus size={16} color="#84b6f4" />;
          },
        },
      ]}
    >
      <VisitsManagerStyled>
        <FiltersWrapper>
          {hasPermissionToSeeAllResidences && (
            <UserFilter>
              {!utils.isNullOrEmpty(filters?.userName) ? (
                <UserGroup>
                  <InputText
                    value={filters?.userName}
                    readOnly
                    aria-label="Usuario seleccionado"
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-text"
                    aria-label="Limpiar filtro de usuario"
                    onClick={() =>
                      setFilters({ ...filters, userName: undefined })
                    }
                  />
                </UserGroup>
              ) : (
                <Dropdown
                  options={customers}
                  optionLabel="fullName"
                  optionValue="userName"
                  onChange={(event) =>
                    setFilters({ ...filters, userName: event.value })
                  }
                  filter
                  placeholder="Selecciona un usuario"
                  aria-label="Selecciona un usuario"
                />
              )}
            </UserFilter>
          )}

          <DateFilter>
            <span className="p-float-label">
              <Calendar
                id="date"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
                aria-label="Selecciona una fecha"
              />
              <label htmlFor="date">Fecha</label>
            </span>
          </DateFilter>

          <ButtonFullWidth
            disabled={!filters.residenceNo && !filters.date}
            onClick={handleGetVisitsByUser}
            label="Ver Visitas"
            className="p-button-primary"
            aria-label="Ver visitas"
          />
        </FiltersWrapper>
        <div style={{ position: "relative" }}>
          <div className="table-container">
            <TableControl
              items={utils.evaluateArray(visits) ? visits : dummyVisits}
              columns={columnsTable}
              className="full-width-table"
            />
          </div>
        </div>

        {/* {showFormVisit && <VisitForm onClose={() => setShowFormVisit(false)} />} */}
        {showFormVisit && (
          <DynamicFormDialog
            title={
              utils.evaluateFullObjetct(selectedVisit)
                ? "Editando Visita"
                : "Creando Visita"
            }
            itemToEdit={selectedVisit}
            fields={fieldsVisitForm}
            isOpen
            onDismiss={handleOnHideForm}
            onSubmit={handleSubmitVisit}
          />
        )}

        {activeView === "scanner" && (
          <>
            <h4>Escáner de QR</h4>
            <QRScanner onScanSuccess={handleScanSuccess} />
            {scanResult && <p>Resultado del Escaneo: {scanResult}</p>}
          </>
        )}

        {activeView === "generator" && (
          <>
            <h4>Generador de QR</h4>
            <QRGenerator
              value={JSON.stringify({
                visitorName: "John Doe",
                houseNumber: 1,
              })}
            />
          </>
        )}
      </VisitsManagerStyled>
    </Container>
  );
};

export default VisitsManager;
