// FinancialMovement.js
import React, { useEffect, useRef, useState } from "react";
import { FinancialMovementStyled } from "./styled";
import { Dialog } from "primereact/dialog";
import { InvoiceServices } from "../../Invoice.Service";
import { getDate } from "../../../../Helpers/FormatDate";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import SpendingInvoicePrint from "../SpendingInvoicePrint";
import { InputText } from "primereact/inputtext";
import { useMemo } from "react";
import { utils } from "../../../../Helpers/utils";
import { Toast } from "primereact/toast";
import {
  FaMoneyBillWave,
  FaExchangeAlt,
  FaExternalLinkAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { FinancialMovementServices } from "../FinancialMovementForm/FinancialMovement.Service";

const FinancialMovement = ({
  visible,
  onDismiss,
  residentialSelected,
  confirmDialog,
}) => {
  const [financialMovements, setFinancialMovements] = useState([]);
  const [filterSpendingInvoice, setFilterSpendingInvoice] =
    useState(financialMovements);

  const toast = useRef(null);
  useEffect(() => {
    getFinancialMovements();
  }, []);

  const getFinancialMovements = async () => {
    const response = await FinancialMovementServices.getAll({
      searchValue: residentialSelected.residentialNo,
    });
    if (response.success) {
      setFinancialMovements(response.financialMovements);
      return;
    }
  };

  const deleteSpendingInvoiceSelected = async (financialMovement) => {
    const response = await FinancialMovementServices.remove({
      financialMovement: financialMovement,
    });
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
      getFinancialMovements();
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Movimineto eliminado con exito",
        life: 3000,
      });
    }
  };

  const FinancialMovementCard = (
    movement,
    deleteSpendingInvoiceSelected,
    index
  ) => {
    const renderIcon = (source) => {
      switch (source) {
        case "Cashbox":
          return <FaMoneyBillWave />;
        case "Bank":
          return <AiFillBank />;
        case "External":
          return <FaExternalLinkAlt />;
        default:
          return null;
      }
    };

    const renderDestinationIcon = (destination) => {
      switch (destination) {
        case "Cashbox":
          return <FaMoneyBillWave />;
        case "Bank":
          return <AiFillBank />;
        default:
          return null;
      }
    };

    const getvalueMovemntType = (value) => {
      switch (value) {
        case "Cashbox":
          return "Efectivo";
        case "Bank":
          return "Banco";
        default:
          return "Externo";
      }
    };

    return (
      <div className="financial-movement-card" key={index}>
        <div className="card-header">
          <h3>Movimiento Financiero</h3>
          <p>{utils.FormatDate(movement?.movementDate)}</p>
        </div>
        <div className="card-body">
          <div className="card-item">
            <p>
              <strong># Transferencia o Deposito:</strong>{" "}
              {movement?.transferNumber}
            </p>
          </div>
          <div className="card-item">
            <div className="item-icon">{renderIcon(movement?.source)}</div>
            <div className="item-details">
              <p>
                <strong>Origen:</strong> {getvalueMovemntType(movement?.source)}
              </p>
            </div>
          </div>
          <div className="card-item">
            <div className="item-icon">
              {renderDestinationIcon(movement?.destination)}
            </div>
            <div className="item-details">
              <p>
                <strong>Destino:</strong>{" "}
                {getvalueMovemntType(movement?.destination)}
              </p>
            </div>
          </div>
          <div className="card-item">
            <p>
              <strong>Monto:</strong> {utils.formateLps(movement?.amount)}
            </p>
          </div>
          <div className="card-item">
            <p>
              <strong>Razón:</strong> {movement?.reason}
            </p>
          </div>
          <div className="card-item">
            <p>
              <strong>Comentarios:</strong> {movement?.comments}
            </p>
          </div>
          <div className="card-item">
            <p>
              <strong>Creado Por:</strong> {movement?.userCreate}
            </p>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn-delete"
            disabled={!utils.hasPermission("EliminarMoviminetoFinanciero")}
            onClick={() => {
              confirmDialog({
                message: "¿Estas seguro que quieres eliminar este gasto?",
                header: "Advertencia",
                icon: "pi pi-info-circle",
                acceptClassName: "p-button-danger",
                position: "center",
                accept: async () => {
                  await deleteSpendingInvoiceSelected(movement);
                },
                reject: () => {},
              });
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    );
  };

  const handleOnChangeSearch = (event) => {
    const query = event.target.value.toLowerCase();

    if (query === "") {
      setFilterSpendingInvoice(financialMovements);
    } else {
      const filtered = financialMovements.filter(
        (type) =>
          type.transferNumber?.toLowerCase()?.includes(query) ||
          type.reason?.toLowerCase()?.includes(query) ||
          type.amount?.toLowerCase()?.includes(query)
      );
      setFilterSpendingInvoice(filtered);
    }
  };

  const itemsToIterate = useMemo(() => {
    if (utils.evaluateArray(filterSpendingInvoice)) {
      return filterSpendingInvoice;
    }

    return financialMovements;
  }, [financialMovements, filterSpendingInvoice]);

  return (
    <Dialog
      visible={visible}
      onHide={() => onDismiss()}
      style={{ width: "50vw" }}
    >
      <FinancialMovementStyled>
        <Toast ref={toast} />
        <div>
          <span className="p-float-label">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="Escriba algo para buscar"
                onChange={handleOnChangeSearch}
                // value={searchQuery}
              />
            </span>
          </span>
        </div>
        {utils.evaluateArray(itemsToIterate) &&
          itemsToIterate.map((movement, index) => {
            return FinancialMovementCard(
              movement,
              deleteSpendingInvoiceSelected,
              index
            );
          })}
      </FinancialMovementStyled>
    </Dialog>
  );
};

export default FinancialMovement;
