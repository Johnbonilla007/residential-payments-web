/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { InvoiceStyled } from "./styled";
import Container from "../../Components/ContainerControl";
import { FaArrowLeft, FaEye, FaPlus } from "react-icons/fa";
import { UsersServices } from "../Users/User/users.service";
import { utils } from "../../Helpers/utils";
import ResidenceInoviceCard from "./Components/ResidenceInvoiceCard";
import CreateOrUpdateInvoiceModal from "./Components/CreateOrUpdateInvoiceModal";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import CreateOrUpdateSpendingInvoiceModal from "./Components/CreateOrUpdateSpendingInvoiceModal";
import SpendingInvoces from "./Components/SpendingInvoces";
import { Button } from "primereact/button";
import { CreateOrUpdatePaymentType } from "./Components/CreateOrUpdatePaymentType";
import { CreateOrUpdateSpendingType } from "./Components/CreateOrUpdateSpendingType";
import { getRequestUserInfo, restClient } from "../../Helpers/restClient";
import { TipoCuentas } from "../../Helpers/Constant";
import UploadToS3WithDropzone from "../../Components/Controls/UploadToS3WithDropzone";
import { InvoiceServices } from "./Invoice.Service";
import { FilterControl } from "../../Components/Controls/FilterControl";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterResidences,
  setFilterResidential,
  setResidences,
  setResidentials,
  setResidentialSelected,
} from "./reducer";
import FinancialMovementForm from "./Components/FinancialMovementForm";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import FinancialMovement from "./Components/FinancialMovement";

const Invoice = () => {
  const [residentialList, setResidentialList] = useState([]);
  const [residenceSelected, setResidenceSelected] = useState({});
  const [isOpenInvoiceModal, setisOpenInvoiceModal] = useState(false);
  const [isOpenSpendingInvoiceModal, setIsOpenSpendingInvoiceModal] =
    useState(false);
  const [invoiceSelected, setInvoiceSelected] = useState({});
  const [spendingInvoiceSelected, setSpendingInvoiceSelected] = useState({});
  const [isSpendingInvoiceEdit, setIsSpendingInvoiceEdit] = useState(false);
  const [residenceList, setResidenceList] = useState([]);
  const [showSpendingInvoices, setShowSpendingInvoices] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showModalPaymentType, setShowModalPaymentType] = useState(false);
  const [showModalSpendingType, setShowModalSpendingType] = useState(false);
  const [openUploadControl, setOpenUploadControl] = useState(false);
  const [showViewResidence, setShowViewResidence] = useState(true);
  const [showFinancialMovement, setShowFinancialMovement] = useState(false);
  const [showAddFinancialMovement, setShowAddFinancialMovement] =
    useState(false);
  const {
    residentials,
    filterResidential,
    residences,
    filterResidences,
    residentialSelected,
  } = useSelector((state) => state.Invoice);
  const dispatch = useDispatch();

  const toast = useRef(null);
  const userInfo = useMemo(() => getRequestUserInfo(), []);

  const commands = () => {
    if (utils.evaluateFullObjetct(residentialSelected)) {
      const commandsToReturn = [
        {
          label: "Recibo de Ingreso",
          action: () => {
            setisOpenInvoiceModal(true);
          },
          icon: () => {
            return <FaPlus size={16} color="#84b6f4" />;
          },
          disabled: !utils.hasPermission("CrearRecibo"),
        },
        {
          label: "Recibo de Gasto",
          action: () => {
            setIsOpenSpendingInvoiceModal(true);
          },
          icon: () => {
            return <FaPlus size={16} color="#84b6f4" />;
          },
          disabled: !utils.hasPermission("CrearGasto"),
        },
        {
          label: "Ver Recibos de Gastos",
          action: () => {
            setShowSpendingInvoices(true);
          },
          icon: () => {
            return <FaEye size={16} color="#84b6f4" />;
          },
          disabled: !utils.hasPermission("VerRecibosDeGastos"),
        },
        // {
        //   label: "Crear Movimiento Financiero",
        //   action: () => {
        //     setShowAddFinancialMovement(true);
        //   },
        //   icon: () => {
        //     return <FaPlus size={16} color="#84b6f4" />;
        //   },
        //   disabled: !utils.hasPermission("CrearMovimientoFinanciero"),
        // },
        // {
        //   label: "Movimientos Financieros",
        //   action: () => {
        //     setShowFinancialMovement(true);
        //   },
        //   icon: () => {
        //     return <FaMoneyBillTransfer size={16} color="#007111" />;
        //   },
        // },
      ];

      const allowGoBack = userInfo.accesses?.some((x) =>
        x?.permissions?.some((y) => y.name === "SuperRoot")
      );

      if (allowGoBack) {
        commandsToReturn.unshift({
          label: "Atras",
          action: () => {
            if (utils.evaluateFullObjetct(residenceSelected) && showInvoice) {
              setResidenceSelected({});
              setShowInvoice(false);
              return;
            }
            // dispatch(setResidentialSelected({}));
            dispatch(setResidences([]));
            setShowViewResidence(false);
          },
          icon: () => {
            return <FaArrowLeft size={16} color="#84b6f4" />;
          },
        });
      }

      return commandsToReturn;
    }
    return [];
  };

  const onDissmis = () => {
    setIsEdit(false);
    setInvoiceSelected({});
    setisOpenInvoiceModal(false);
  };
  const onDissmisSpendingInvoice = () => {
    setSpendingInvoiceSelected({});
    setIsSpendingInvoiceEdit(false);
    setIsOpenSpendingInvoiceModal(false);
  };

  const handleShowModalPaymentType = (residential) => {
    setResidentialSelected(residential);
    setShowModalPaymentType(true);
  };

  const handleShowModalSpendingType = (residential) => {
    setResidentialSelected(residential);
    setShowModalSpendingType(true);
  };

  const handleDissmisModalPaymentType = () => {
    setShowModalPaymentType(false);
    setResidentialSelected({});
  };

  const handleDissmisModalSpendingType = () => {
    setShowModalSpendingType(false);
    setResidentialSelected({});
  };

  const handleChangeChargeCurrentMonth = async (residential) => {
    const request = {
      residential: {
        residentialNo: residential.residentialNo,
        chargeCurrentMonth: !residential.chargeCurrentMonth,
      },
    };
    const response = await InvoiceServices.changeChargeCurrentMonth(request);
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
    if (response?.success) {
      // handleFechtResidential();
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Valor cambiado",
        life: 3000,
      });
    }
  };

  const CardComponent = (residentialList) => {
    return (
      <div className="card-container">
        {residentialList.map((residential, index) => (
          <div key={index} className="card">
            <div className="card-image">
              <img
                src={
                  !utils.isNullOrEmpty(residential.logoResidential)
                    ? residential.logoResidential
                    : "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/residenciales.jpg"
                }
                alt="Descripción de la imagen"
              />
              <i
                className="pi pi-pencil edit-icon"
                onClick={() => {
                  setResidentialSelected(residential);
                  setOpenUploadControl(true);
                }}
              ></i>
            </div>
            <div className="card-content">
              <div className="first-row">
                <label className="card-title">{residential.name}</label>
                <p className="card-text">Código: {residential.code}</p>
                <p className="card-text">Límite: {residential.limit}</p>
                {utils.hasPermission("ActivarMesPorConsumir") && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p className="card-text">Cobrar mes por consumir:</p>
                    <Button
                      icon={
                        residential.chargeCurrentMonth
                          ? "pi pi-check"
                          : "pi pi-times"
                      }
                      className={
                        residential.chargeCurrentMonth
                          ? "p-button-rounded p-button-success"
                          : "p-button-rounded p-button-danger"
                      }
                      aria-label="Cancel"
                      onClick={() =>
                        handleChangeChargeCurrentMonth(residential)
                      }
                    />
                  </div>
                )}
              </div>
              <div className="secound-row">
                <div>
                  <Button
                    label="Tipos de Ingreso"
                    className="p-button-raised p-button-secondary"
                    onClick={() => {
                      handleShowModalPaymentType(residential);
                    }}
                  />
                </div>
                <div>
                  <Button
                    label="Tipos de Gasto"
                    className="p-button-raised p-button-warning"
                    onClick={() => handleShowModalSpendingType(residential)}
                  />
                </div>
                <div>
                  <Button
                    label="Ver Casas"
                    className="p-button-raised p-button-warning"
                    onClick={(event) => {
                      setResidentialSelected(residential);
                      setShowViewResidence(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const isReadOnly = useMemo(() => {
    return userInfo.accesses?.some(
      (x) => x.rolName === TipoCuentas.Rol_Residente
    );
  }, [userInfo]);

  return (
    <Container commands={!isReadOnly && commands()}>
      <InvoiceStyled>
        <ConfirmDialog />
        <Toast ref={toast} />
        <div>
          {!utils.evaluateFullObjetct(residenceSelected) && (
            <strong>
              Buscar por {showViewResidence ? "Residencia" : "Residencial"}
            </strong>
          )}
          {showViewResidence ? (
            <div>
              <FilterControl
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
            </div>
          ) : (
            <FilterControl
              items={residentials}
              filter={filterResidential}
              setFilter={(value) => {
                dispatch(setFilterResidential(value));
              }}
              propertyFilter={["name"]}
              onChange={(items) => {
                setResidentialList(items);
              }}
            />
          )}
        </div>

        {!showViewResidence &&
          residentialList.length > 0 &&
          CardComponent(residentialList)}

        {utils.evaluateFullObjetct(residentialSelected) &&
          showViewResidence && (
            <ResidenceInoviceCard
              residentialSelected={residentialSelected}
              setResidenceSelected={setResidenceSelected}
              residenceSelected={residenceSelected}
              setInvoiceSelected={setInvoiceSelected}
              invoiceSelected={invoiceSelected}
              setisOpenInvoiceModal={setisOpenInvoiceModal}
              residenceList={residenceList}
              setResidenceList={setResidenceList}
              confirmDialog={confirmDialog}
              setIsEdit={setIsEdit}
              showInvoice={showInvoice}
              setShowInvoice={setShowInvoice}
            />
          )}

        {isOpenInvoiceModal && (
          <CreateOrUpdateInvoiceModal
            isOpen={isOpenInvoiceModal}
            onDissmis={onDissmis}
            invoiceSelected={invoiceSelected}
            residenceList={residenceList}
            residentialSelected={residentialSelected}
            isEdit={isEdit}
          />
        )}
        {isOpenSpendingInvoiceModal && (
          <CreateOrUpdateSpendingInvoiceModal
            isOpen={isOpenSpendingInvoiceModal}
            onDissmis={onDissmisSpendingInvoice}
            invoiceSelected={spendingInvoiceSelected}
            residentialSelected={residentialSelected}
            isEdit={isSpendingInvoiceEdit}
          />
        )}
        {showSpendingInvoices &&
          utils.evaluateFullObjetct(residentialSelected) && (
            <SpendingInvoces
              residentialSelected={residentialSelected}
              visible={showSpendingInvoices}
              onDismiss={() => setShowSpendingInvoices(false)}
              setIsOpenSpendingInvoiceModal={setIsOpenSpendingInvoiceModal}
              setSpendingInvoiceSelected={setSpendingInvoiceSelected}
              setIsSpendingInvoiceEdit={setIsSpendingInvoiceEdit}
              confirmDialog={confirmDialog}
            />
          )}
        {showModalPaymentType && (
          <CreateOrUpdatePaymentType
            isOpen
            onDissmis={handleDissmisModalPaymentType}
            residentialSelected={residentialSelected}
          />
        )}
        {showModalSpendingType && (
          <CreateOrUpdateSpendingType
            isOpen
            onDissmis={handleDissmisModalSpendingType}
            residentialSelected={residentialSelected}
          />
        )}

        {showAddFinancialMovement && (
          <FinancialMovementForm
            residentialNo={residentialSelected.residentialNo}
            onDismiss={() => setShowAddFinancialMovement(false)}
            isOpen={showAddFinancialMovement}
            toast={toast}
          />
        )}

        {showFinancialMovement && (
          <FinancialMovement
            residentialSelected={residentialSelected}
            onDismiss={() => setShowFinancialMovement(false)}
            visible={showFinancialMovement}
            confirmDialog={confirmDialog}
          />
        )}

        {openUploadControl && (
          <UploadToS3WithDropzone
            isOpen={openUploadControl}
            onDissmis={() => {
              setOpenUploadControl(false);
              setResidentialSelected({});
            }}
            folderPath="Residential"
            fileName={residentialSelected.residentialNo}
            getUrl={async (url) => {
              if (!utils.isNullOrEmpty(url)) {
                const request = {
                  residential: {
                    logoResidential: url,
                    residentialNo: residentialSelected.residentialNo,
                  },
                };
                const response = await InvoiceServices.addUrlResidentialLogo(
                  request
                );
                if (!response?.success) {
                  toast.current.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: response.validationErrorMessage,
                    life: 3000,
                  });
                  return;
                }
                if (response?.success) {
                  toast.current.show({
                    severity: "success",
                    summary: "Exito",
                    detail: "Logo guardado con Exito",
                    life: 3000,
                  });
                  setResidentialSelected({});
                  setOpenUploadControl(false);
                  // handleFechtResidential();
                  return;
                }
              }
            }}
          />
        )}
      </InvoiceStyled>
    </Container>
  );
};

export default Invoice;
