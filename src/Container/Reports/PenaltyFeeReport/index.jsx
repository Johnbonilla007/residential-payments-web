/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { PenaltyFeeReportStyled } from "./styles";
import CustomDropDown from "../../../Components/Controls/CustomDropDown";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import {
  columnsTable,
  filterFields,
  initialfilters,
  itemTemplate,
} from "./settings";
import { useSelector } from "react-redux";
import { InvoiceServices } from "../../Invoice/Invoice.Service";
import { utils } from "../../../Helpers/utils";
import { IncomeAndSpendingReportDetailedService } from "../IncomesAndSpendingReportDetailed/IncomeAndSpendingReportDetailed.Service";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import TableControl from "../../../Components/Controls/TableControl";
import { Checkbox } from "primereact/checkbox";
import { PenaltyFeeReportService } from "./PenaltyFeeReport.Service";
import { Dialog } from "primereact/dialog";

const PenaltyFeeReport = () => {
  const [residences, setResidences] = useState([]);
  const [filtersReport, setFiltersReport] = useState({
    includeDates: true,
    onlyEmptyLot: true,
    paymentTypeNo: "PT00000003",
  });
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [penaltiesFee, setPenaltiesFee] = useState([]);
  const { residentialSelected } = useSelector((store) => store.Invoice);
  const [filters, setFilters] = useState(initialfilters);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    loadPaymentTypes();
    loadResidences();
  }, [residentialSelected]);

  const loadPaymentTypes = async () => {
    if (residentialSelected?.residentialNo) {
      const response = await InvoiceServices.getPaymentTypes(
        residentialSelected.residentialNo
      );

      if (utils.evaluateArray(response.paymentTypes)) {
        response.paymentTypes.push({
          paymentTypeNo: "PT0000000",
          name: "Otros",
          canBeUseToPenaltyFee: true,
        });
        response.paymentTypes.unshift({
          paymentTypeNo: "",
          name: "Todos",
          canBeUseToPenaltyFee: true,
        });
        setPaymentTypes(response.paymentTypes);
      }
    }
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
        const residenceAndManeger = filteredResidences.map((item) => {
          const account =
            item.accounts.find((x) => x.isManager) || item.accounts[0];
          item.fullName = account.fullName;
          return item;
        });
        setResidences(residenceAndManeger);
      }
    }
  };

  const handleOnChangeFilters = (event) =>
    setFiltersReport({ ...filtersReport, [event.target.name]: event.value });

  const getRersidenceValue = () => {
    const residenceName = residences.find(
      (x) => x.residenceNo === filtersReport.residenceNo
    );
    return residenceName?.fullName || "";
  };

  const handleCleanDates = (event) =>
    setFiltersReport({ ...filtersReport, includeDates: event.target.checked });

  const itemsResidences = useMemo(() => {
    if (filtersReport.onlyEmptyLot) {
      return residences.where((x) => x.isEmptyLot);
    }

    return residences;
  }, [filtersReport.onlyEmptyLot]);

  const handleGenerateReport = async () => {
    const request = { ...filtersReport };

    const response = await PenaltyFeeReportService.generateReport(request);

    if (response.success) {
      setPenaltiesFee(response.penaltiesFee);
    }
  };

  const handleViewPhoto = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalVisible(true);
  };

  return (
    <Container>
      <PenaltyFeeReportStyled>
        <div className="filters">
          {/* Residence Dropdown */}
          <div className="filter-item">
            {utils.isNullOrEmpty(filtersReport.residenceNo) ? (
              <CustomDropDown
                items={itemsResidences}
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

          <div
            className="filter-item"
            style={{
              display: "flex",
              flexDirection: "space-around",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Checkbox
              icon="pi pi-check"
              checked={filtersReport.onlyEmptyLot}
              onChange={(event) =>
                setFiltersReport({
                  ...filtersReport,
                  onlyEmptyLot: event.checked,
                })
              }
            />
            <label htmlFor="basic">Solo lotes baldíos</label>
          </div>

          {/* Payment Type Dropdown */}
          <div className="filter-item">
            <Dropdown
              className="commandbox"
              name="paymentTypeNo"
              value={filtersReport.paymentTypeNo}
              options={paymentTypes?.where((x) => x.canBeUseToPenaltyFee)}
              onChange={handleOnChangeFilters}
              optionLabel="name"
              optionValue="paymentTypeNo"
              placeholder="Seleccione Un Tipo de Pago"
              filter
            />
          </div>

          {/* Start Date */}
          <div className="calendar">
            <label htmlFor="initialDate">Desde:</label>
            <Calendar
              id="initialDate"
              name="initialDate"
              placeholder="Fecha inicial"
              value={filtersReport.initialDate}
              onChange={handleOnChangeFilters}
            />
          </div>

          {/* End Date */}
          <div className="calendar">
            <label htmlFor="endDate">Hasta:</label>
            <Calendar
              id="finalDate"
              name="finalDate"
              placeholder="Fecha final"
              value={filtersReport.finalDate}
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
              onChange={handleCleanDates}
            />
          </div>
          <div className="filter-item">
            <Dropdown
              className="commandbox"
              name="wasPaid"
              value={filtersReport.wasPaid}
              options={[
                { name: "Multas Pagadas", wasPaid: true },
                { name: "Multas No Pagadas", wasPaid: false },
                { name: "Todas", wasPaid: null },
              ]}
              onChange={handleOnChangeFilters}
              optionLabel="name"
              optionValue="wasPaid"
              placeholder="Seleccione el tipo de multa"
              filter
            />
          </div>
          <Button
            label="Generar"
            icon="pi pi-check"
            onClick={handleGenerateReport}
            className="button"
          />
        </div>

        {/* Table Section */}
        <TableControl
          items={penaltiesFee}
          title="Reporte de Multas"
          filter={filters}
          setFilter={setFilters}
          filterFields={filterFields}
          columns={columnsTable(handleViewPhoto)}
          emptyMessage="No se encontraron multas pendientes..."
          isExportExcel={true}
          fileName="Reporte de Multas"
          columnsToExcelExport={columnsTable(handleViewPhoto)?.where(
            (x) => x.fieldName !== "imageUrl"
          )}
        />
      </PenaltyFeeReportStyled>

      <Dialog
        visible={isImageModalVisible}
        onHide={() => setIsImageModalVisible(false)}
        header="Vista Previa de Imagen"
        style={{ width: "50vw", textAlign: "center" }}
      >
        {selectedImageUrl ? (
          <img
            src={selectedImageUrl}
            alt="Full-Size Residence"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        ) : (
          <p>No hay imagen disponible</p>
        )}
      </Dialog>
    </Container>
  );
};

export default PenaltyFeeReport;
