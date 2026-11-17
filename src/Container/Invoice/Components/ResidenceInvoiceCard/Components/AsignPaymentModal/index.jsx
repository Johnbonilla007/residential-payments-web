import React, { useEffect, useRef, useState } from "react";
import { AsignPaymentModalStyled } from "./styled";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InvoiceServices } from "../../../../Invoice.Service";
import { utils } from "../../../../../../Helpers/utils";
import { getDate } from "../../../../../../Helpers/FormatDate";
import DynamicFormDialog from "../../../../../../Components/DynamicFormDialog";
import { fieldsPaymentAsign } from "./dataFactory";
import { dialogSizing } from "../../../../../../Components/Controls/dialogStyles";
import { useIsMobile } from "../../../../../../Helpers/useIsMobile";

export const AsignPaymentModal = ({
  isOpen,
  onDissmis,
  residenceSelected,
  confirmDialog,
}) => {
  const isMobile = useIsMobile();
  const toast = useRef(null);
  const [payments, setPayments] = useState([]);
  const [paymentAsignSelected, setPaymentAsignSelected] = useState({});
  const [showModalForm, setShowModalForm] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await getPaymentTypes();
    await getResidencePaymentTypes();
  };

  const getPaymentTypes = async () => {
    const response = await InvoiceServices.getPaymentTypes(
      residenceSelected.residentialNo
    );
    if (response && response.success) {
      setPaymentTypes(response.paymentTypes);
      return;
    }

    if (response && !response.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }

    if (response && !response.success) {
      toast.current.show({
        severity: "error",
        summary: "Advertencia",
        detail: "Error de servicio",
        life: 3000,
      });
      return;
    }
  };

  const getResidencePaymentTypes = async () => {
    const request = {
      residenceId: residenceSelected.id,
    };
    const response = await InvoiceServices.getResidencePaymentsByResidence(
      request
    );
    if (response && response.success) {
      setPayments(response.residencePayments);
      return;
    }

    if (response && !response.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }

    if (response && !response.success) {
      toast.current.show({
        severity: "error",
        summary: "Advertencia",
        detail: "Error de servicio",
        life: 3000,
      });
      return;
    }
  };

  const addPayment = async (item) => {
    if (item.paymentNo) {
      const request = {
        paymentNo: item.paymentNo,
        id: paymentAsignSelected.id,
        residences: [
          {
            residenceId: residenceSelected.id,
            residenceNo: residenceSelected.residenceNo,
            discount: item.discount || 0,
            hasFollowUp: item.hasFollowUp,
            hasFollowUpApp: item.hasFollowUpApp,
            initialPaymentDate: item.initialPaymentDate,
          },
        ],
      };
      if (utils.isNullOrEmpty(request.id) || request.id <= 0) {
        const hasPayment = payments?.some(
          (x) => x.paymentNo === item.paymentNo
        );
        if (hasPayment) {
          toast.current.show({
            severity: "warn",
            summary: "Advertencia",
            detail:
              "Este pago ya esta asignado, por favor si quieres cambiar algo, edita el pago",
            life: 3000,
          });
          return;
        }
      }
      const response = await InvoiceServices.createResidencePayment(request);
      if (response && response.success) {
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: "Pago agregado con exito!.",
        });
        setPaymentAsignSelected({});
        setShowModalForm(false);
        await getResidencePaymentTypes();
      }
      if (response && !response.success) {
        toast.current.show({
          severity: "warn",
          summary: "Advertencia",
          detail: response.validationErrorMessage,
          life: 3000,
        });
        return;
      }

      if (response && !response.success) {
        toast.current.show({
          severity: "error",
          summary: "Advertencia",
          detail: "Error de servicio",
          life: 3000,
        });
        return;
      }
    }
  };

  const deletePayment = async (id) => {
    const response = await InvoiceServices.removeResidencePayment({ id: id });
    if (response && response.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Pago eliminado con exito!.",
      });
      await getResidencePaymentTypes();
    }
    if (response && !response.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }

    if (response && !response.success) {
      toast.current.show({
        severity: "error",
        summary: "Advertencia",
        detail: "Error de servicio",
        life: 3000,
      });
      return;
    }
  };
  const templatePayment = (item) => {
    return <div>{item.description}</div>;
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          disabled={!utils.hasPermission("EliminarPagoAsignado")}
          onClick={() =>
            confirmDialog({
              message: "¿Estas seguro que quieres eliminar este pago?",
              header: "Advertencia",
              icon: "pi pi-info-circle",
              acceptClassName: "p-button-danger",
              position: "center",
              accept: async () => {
                await deletePayment(rowData.id);
              },
              reject: () => {},
            })
          }
        />
      </div>
    );
  };

  const actionEditBodyTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info"
          onClick={() => {
            setPaymentAsignSelected(rowData);
            setShowModalForm(true);
          }}
        />
      </div>
    );
  };

  const getPaymentName = (paymentNo) => {
    if (paymentTypes?.length > 0) {
      const payment = paymentTypes.firstOrDefault(
        (c) => c.paymentTypeNo === paymentNo
      );
      if (utils.evaluateFullObjetct(payment)) {
        return payment.name;
      }
      return "";
    }
    return "";
  };

  const handleSubmit = (item) => {
    confirmDialog({
      message: utils.evaluateFullObjetct(paymentAsignSelected)
        ? "¿Estas seguro que quieres editar este ingreso?"
        : "¿Estas seguro que quieres asignar este ingreso?",
      header: "Advertencia",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      position: "center",
      accept: async () => {
        await addPayment(item);
      },
      reject: () => {},
    });
  };

  return (
    <Dialog
      header={"Asignación de tipos de pagos"}
      visible={isOpen}
      onHide={() => onDissmis()}
      {...dialogSizing(62, { fullScreenOnMobile: true })}
    >
      <AsignPaymentModalStyled>
        <Toast ref={toast} />
        <div>
          <div>
            <Button
              label="Agregar Pago"
              icon="pi pi-plus"
              className="p-button-sm"
              style={{ borderRadius: "8px" }}
              onClick={() => setShowModalForm(true)}
            />
          </div>
        </div>
        {isMobile ? (
          <div className="mobile-payment-cards">
            {payments?.map((rowData, idx) => (
              <div className="mobile-payment-card" key={rowData.id || idx}>
                <div className="mobile-payment-header">
                  <strong>{getPaymentName(rowData.paymentNo)}</strong>
                  <div className="action-buttons">
                    {actionEditBodyTemplate(rowData)}
                    {actionBodyTemplate(rowData)}
                  </div>
                </div>
                <div className="mobile-payment-grid">
                  <div>
                    <span className="label">Descuento</span>
                    <span className="val">{rowData.discount || 0}</span>
                  </div>
                  <div>
                    <span className="label">Inicio de Pago</span>
                    <span className="val">
                      {getDate(rowData.initialPaymentDate)}
                    </span>
                  </div>
                  <div>
                    <span className="label">Seguimiento Fechas</span>
                    <span className="val">
                      {rowData.hasFollowUp ? "Sí" : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="label">Seguimiento App</span>
                    <span className="val">
                      {rowData.hasFollowUpApp ? "Sí" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="payment-table">
            {payments?.length > 0 && (
              <DataTable
                value={payments}
                rows={5}
                responsiveLayout="scroll"
                paginator
              >
                <Column
                  field="type"
                  header="Tipo de Pago"
                  body={(rowData) => `${getPaymentName(rowData.paymentNo)}`}
                />
                <Column
                  field="discount"
                  header="Descuento"
                  body={(rowData) => `${rowData.discount || 0}`}
                />

                <Column
                  field="discount"
                  header="Inicio de Pago"
                  body={(rowData) => `${getDate(rowData.initialPaymentDate)}`}
                />
                <Column
                  field="hasFollowUp"
                  header="Seguimiento de fechas"
                  body={(rowData) => `${rowData.hasFollowUp ? "Si" : "No"}`}
                />
                <Column
                  field="hasFollowUpApp"
                  header="Seguimiento App"
                  body={(rowData) => `${rowData.hasFollowUpApp ? "Si" : "No"}`}
                />
                <Column body={actionBodyTemplate} header="Eliminar" />
                <Column body={actionEditBodyTemplate} header="Editar" />
              </DataTable>
            )}
          </div>
        )}
        {showModalForm && (
          <DynamicFormDialog
            title={
              utils.evaluateFullObjetct(paymentAsignSelected)
                ? "Editando Pago asignado"
                : "Asignando Pago"
            }
            itemToEdit={paymentAsignSelected}
            fields={fieldsPaymentAsign(paymentTypes, templatePayment)}
            isOpen
            onDismiss={() => {
              setPaymentAsignSelected({});
              setShowModalForm(false);
            }}
            onSubmit={handleSubmit}
          />
        )}
      </AsignPaymentModalStyled>
    </Dialog>
  );
};
