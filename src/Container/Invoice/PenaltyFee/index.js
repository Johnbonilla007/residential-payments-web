/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { PenaltyFeeStyled } from "./styles";
import ResidenceInoviceCard from "../Components/ResidenceInvoiceCard";
import { useDispatch, useSelector } from "react-redux";
import { UsersServices } from "../../Users/User/users.service";
import { getRequestUserInfo } from "../../../Helpers/restClient";
import { setFilterResidences, setResidences } from "../reducer";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { FilterControl } from "../../../Components/Controls/FilterControl";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";
import { ResidenceInvoiceCardStyled } from "../Components/ResidenceInvoiceCard/styled";
import { utils } from "../../../Helpers/utils";
import { InvoiceServices } from "../Invoice.Service";
import { CardComponent } from "./components/CardComponent";
import { PenaltyFeeForm } from "./components/PenaltyFeeForm";
import { PenaltyFeeService } from "./PenaltyFee.Service";
import { PenaltiesFeeListComponent } from "./components/PenaltiesFeeListComponent";

const PenaltyFee = () => {
  const { residentialSelected, residences, filterResidences } = useSelector(
    (state) => state.Invoice
  );
  const [residenceSelected, setResidenceSelected] = useState({});
  const [residenceList, setResidenceList] = useState([]);
  const userInfo = useMemo(() => getRequestUserInfo(), []);
  const toast = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [onlyEmptyLot, setOnlyEmptyLot] = useState(true);
  const [paymentTypeList, setPaymentTypeList] = useState([]);
  const [showPenaltyFeeForm, setShowPenaltyFeeForm] = useState(false);
  const [showPenaltiesFee, setShowPenaltiesFee] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    initialLoad();
  }, [onlyEmptyLot]);

  useEffect(() => {
    loadPaymentTypeList();
  }, [residentialSelected]);

  const initialLoad = async () => {
    const request = {
      searchValue: residentialSelected.residentialNo,
      onlyEmptyLot,
    };

    await loadResidences(request);
  };

  const loadPaymentTypeList = async () => {
    const request = { searchValue: residentialSelected.residentialNo };

    const response = await InvoiceServices.getPaymentTypes(request);

    if (response?.paymentTypes) {
      setPaymentTypeList(
        response.paymentTypes?.where((x) => x.canBeUseToPenaltyFee)
      );
    }
  };

  const loadResidences = async (request) => {
    let response = await UsersServices.getResidence(request);

    const hasPermission = userInfo.accesses?.some((x) =>
      x?.permissions?.some((y) => y.name === "VerMisResidencias")
    );

    const accountIds = userInfo.accounts.select((x) => x.id);

    if (hasPermission) {
      response.residences = response.residences.filter((x) =>
        accountIds.includes(x.accountId)
      );
    }

    if (response?.success) {
      setResidenceList(response.residences);
      dispatch(setResidences(response.residences));
      return;
    }
  };

  const handleOnChangeEmptyLot = async (e) => setOnlyEmptyLot(e.value);

  const handleOnAddOrEditPenaltyFee = (residence) => {
    setResidenceSelected(residence);
    setShowPenaltyFeeForm(true);
  };

  const handleCloaseForm = () => {
    setShowPenaltyFeeForm(false);
    setResidenceSelected({});
  };

  const handleShowPenaltiesFee = (residence) => {
    setShowPenaltiesFee(true);
    setResidenceSelected(residence);
  };

  return (
    <Container>
      <ConfirmDialog />
      <Toast ref={toast} />
      <PenaltyFeeStyled onlyEmptyLot={onlyEmptyLot}>
        <div className="filters">
          <FilterControl
            placeholder="Buscar lote..."
            items={residences}
            filter={filterResidences}
            setFilter={(value) => {
              dispatch(setFilterResidences(value));
            }}
            propertyFilter={[
              "name", // Top-level property
              "block", // Top-level property
              "houseNumber", // Top-level property
              { key: "accounts", subItems: ["fullName", "userName"] }, // Nested properties
            ]}
            combinedFilterProperties={["block", "houseNumber"]}
            onChange={(items) => {
              setResidenceList(items);
            }}
          />

          <ToggleButton
            checked={onlyEmptyLot}
            onLabel="Solo Lotes Baldíos"
            offLabel="Todos"
            invalid
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            onChange={handleOnChangeEmptyLot}
          />
        </div>
        <ResidenceInvoiceCardStyled
          isFromPenaltyFee={utils.hasPermission("AgregarMulta")}
        >
          {residenceList.length > 0 &&
            residenceList.map((residence, index) => (
              <CardComponent
                residence={residence}
                index={index}
                handleOnAddOrEditPenaltyFee={handleOnAddOrEditPenaltyFee}
                handleShowPenaltiesFee={handleShowPenaltiesFee}
              />
            ))}
        </ResidenceInvoiceCardStyled>
      </PenaltyFeeStyled>
      {showPenaltyFeeForm && (
        <PenaltyFeeForm
          residenceNo={residenceSelected.residenceNo}
          toast={toast}
          onClose={handleCloaseForm}
          paymentTypeList={paymentTypeList}
        />
      )}
      {showPenaltiesFee && (
        <PenaltiesFeeListComponent
          onClose={() => setShowPenaltiesFee(false)}
          residenceNo={residenceSelected.residenceNo}
          ownerPropertyName={
            residenceSelected.accounts?.firstOrDefault()?.fullName
          }
          residenceName={residenceSelected.name}
        />
      )}
    </Container>
  );
};

export default PenaltyFee;
