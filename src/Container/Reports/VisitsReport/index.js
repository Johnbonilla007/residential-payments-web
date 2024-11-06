/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { ReportStyled } from "./styled";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { getRequestUserInfo, restClient } from "../../../Helpers/restClient";
import { utils } from "../../../Helpers/utils";
import { FilterMatchMode } from "primereact/api";
import TableControl from "../../../Components/Controls/TableControl";
import { columnsReport } from "./setting";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DocPdfReport from "./DocPdfReport";
import { TipoCuentas } from "../../../Helpers/Constant";
import { Toast } from "primereact/toast";
import { getDate, getHours } from "../../../Helpers/FormatDate";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { UsersServices } from "../../Users/User/users.service";

const Report = () => {
  const [residentialSelected, setResidentialSelected] = useState(null);
  const [residentialList, setResidentialList] = useState([]);
  const [dateQuery, setDateQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataVisits, setDataVisits] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [viewImageModal, setViewImageModal] = useState(false);
  const [permissionAccount, setPermissionAccount] = useState("");
  const [filters, setFilters] = useState({
    fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    residence: { value: null, matchMode: FilterMatchMode.CONTAINS },
    houseNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    block: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isFrequent: { value: null, matchMode: FilterMatchMode.CONTAINS },
    eventName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    visitActive: { value: null, matchMode: FilterMatchMode.CONTAINS },
    imgCar: { value: null, matchMode: FilterMatchMode.CONTAINS },
    label: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef(null);
  const userInfo = getRequestUserInfo();

  useEffect(() => {
    handleFechtResidential();
  }, []);

  const handleFechtResidential = async () => {
    if (utils.evaluateFullObjetct(userInfo)) {
      const account = userInfo.accounts[0];
      const permission = account.accountType;
      setPermissionAccount(permission);

      if (
        permission === TipoCuentas.administrador ||
        utils.hasPermission("VerTodasLasResidenciales")
      ) {
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

  const filterFields = [
    "fullName",
    "userName",
    "residence",
    "houseNumber",
    "block",
    "isFrequent",
    "isDelivery",
    "isActive",
    "imgCar",
  ];

  const handleOnchangeResidential = (e) => {
    setResidentialSelected(e.value);
  };
  const handleGenerateReport = async () => {
    if (!utils.evaluateFullObjetct(residentialSelected)) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Seleccione una residencial",
        life: 3000,
      });
      return;
    }

    if (!dateQuery) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Seleccione una Fecha",
        life: 3000,
      });
      return;
    }

    const request = {
      residentialNo: residentialSelected.residentialNo,
      fechaConsulta: dateQuery,
    };

    setLoading(true);
    const response = await restClient.httpPost(
      "/visit/query-visit-web",
      request
    );
    setLoading(false);
    if (response?.success) {
      if (response.visitWebDto.length <= 0) {
        toast.current.show({
          severity: "warn",
          summary: "Advertencia",
          detail: "No se encontraron visitas en esta fecha",
          life: 3000,
        });
        setDataVisits([]);
        return;
      }
      const ReportList = response.visitWebDto.map((item, index) => {
        item.visitCreateDate = `${getDate(item.visitCreateDate)} - ${getHours(
          item.visitCreateDate
        )}`;
        item.dateIn = `${getDate(item.dateIn)} - ${getHours(item.dateIn)}`;
        item.dateOut = `${getDate(item.dateOut)} - ${getHours(item.dateOut)}`;
        item.index = index + 1;
        return item;
      });
      setDataVisits(ReportList);
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Reporte Generado",
        life: 3000,
      });
    }
    if (!response?.success) {
      setDataVisits([]);
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
    }
    return;
  };

  const handleGetImgId = async (id) => {
    const request = {
      img: "Id",
      visitInId: id,
    };

    setLoading(true);
    const response = await restClient.httpPost("/visit/get-image", request);

    setLoading(false);

    if (response?.success) {
      setImgUrl(response.imgUrl);

      setViewImageModal(true);
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
    }
  };

  const handleGetImgCar = async (id) => {
    const request = {
      img: "Car",
      visitInId: id,
    };

    setLoading(true);
    const response = await restClient.httpPost("/visit/get-image", request);

    setLoading(false);

    if (response?.success) {
      setImgUrl(response.imgUrl);
      setViewImageModal(true);
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
    }
  };

  const onRenderButtomImgId = (row) => {
    const id = row.visitInId;
    return (
      <div>
        <Button
          label="Identidad"
          icon="pi pi-check"
          loading={loading}
          onClick={async () => {
            await handleGetImgId(id);
          }}
          className="button p-button-rounded p-button-sm"
        />
      </div>
    );
  };

  const onRenderButtomImgCar = (row) => {
    const id = row.visitInId;
    return (
      <div>
        <Button
          label="Placa"
          icon="pi pi-check"
          loading={loading}
          onClick={async () => {
            await handleGetImgCar(id);
          }}
          className="button p-button-rounded p-button-sm"
        />
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          onClick={() => setViewImageModal(false)}
          className="p-button-text"
        />
      </div>
    );
  };

  return (
    <ReportStyled>
      <Toast ref={toast} />
      <div className="container">
        <div className="options">
          <Dropdown
            className="commandbox"
            value={residentialSelected}
            options={residentialList}
            onChange={handleOnchangeResidential}
            optionLabel="name"
            placeholder="Seleccione una Residencial"
          />
          <div className="calendar">
            <label htmlFor="basic">Seleccione una fecha: </label>
            <Calendar
              id="basic"
              value={dateQuery}
              onChange={(e) => {
                setDateQuery(e.value);
              }}
            />
          </div>
          <Button
            label="Generar"
            icon="pi pi-check"
            loading={loading}
            onClick={handleGenerateReport}
            className="button"
          />
          {dataVisits.length > 0 && (
            <PDFDownloadLink
              document={
                <DocPdfReport
                  visitList={dataVisits}
                  residential={residentialSelected.name}
                  dateSelected={`${getDate(dateQuery)}`}
                />
              }
              fileName={`ReporteSSA-${getDate(dateQuery)}.pdf`}
            >
              <div>Descargar Reporte</div>
            </PDFDownloadLink>
          )}
        </div>
        <div className="table">
          <div
            style={{
              textAlign: "right",
              marginRight: "30px",
              fontSize: "14pt",
              fontWeight: "bold",
            }}
          >
            Total de visitas: {dataVisits.length}
          </div>
          {dataVisits.length > 0 && (
            <TableControl
              items={dataVisits}
              title="Reporte de Visitas"
              filter={filters}
              rows={5}
              setFilter={setFilters}
              filterFields={filterFields}
              columns={columnsReport(
                onRenderButtomImgId,
                permissionAccount,
                onRenderButtomImgCar
              )}
              emptyMessage="No hay visitas en esta fecha"
            />
          )}
        </div>
        {/* <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <DocPdfReport visitList={dataVisits} />
        </PDFViewer> */}
      </div>
      <Dialog
        visible={viewImageModal}
        onHide={() => setViewImageModal(false)}
        style={{ width: "80vw", height: "90vh" }}
        footer={renderFooter()}
      >
        <div style={{ textAlign: "-webkit-center" }}>
          {!utils.isNullOrEmpty(imgUrl) && <Image src={imgUrl} preview />}
        </div>
      </Dialog>
    </ReportStyled>
  );
};

export default Report;
