import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast"; // Para mostrar notificaciones
import { Dialog } from "primereact/dialog";
import { InvoiceServices } from "../../Invoice.Service";
import { Image } from "primereact/image";

const InvoicesByUser = ({ residenceNo, isOpen, onDissmis }) => {
  const [payments, setPayments] = useState([]);
  const [first, setFirst] = useState(0); // Página actual
  const [rows, setRows] = useState(10); // Cantidad de filas por página
  const [totalRecords, setTotalRecords] = useState(0); // Total de registros
  const [pageIndex, setPageIndex] = useState(0); // Índice de la página actual
  const toast = useRef(null);

  const handleGetInvoiceByUser = async (pageIndex, pageSize) => {
    debugger;
    const request = {
      paymentByUser: {
        residenceNo: residenceNo,
      },
      queryInfo: {
        pageSize: pageSize,
        pageIndex: pageIndex,
      },
    };

    const response = await InvoiceServices.getPaymentByUserVoucher(request);
    if (response?.success) {
      setPayments(response.paymentByUsers);
      setTotalRecords(response.totalRecords || 0); // Total de registros devuelto por la API
    }
  };

  useEffect(() => {
    handleGetInvoiceByUser(pageIndex, rows); // Cargar datos al iniciar y al cambiar de página
  }, [pageIndex, rows]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageIndex(event.page); // Actualizar el índice de la página actual
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div>
        <Image src={rowData.url} preview width="50px"/>
      </div>
    );
  };
  const renderFooter = () => {
    return (
      <div className="footer-buttons">
        <Button
          label="Cerrar"
          icon="pi pi-times"
          className="p-button-raised p-button-danger p-button-sm"
          onClick={() => onDissmis()}
        />
      </div>
    );
  };
  return (
    <Dialog
      header="Comprobantes"
      visible={isOpen}
      onHide={() => onDissmis()}
      style={{ width: "50vw", height: "100vh" }}
      footer={renderFooter}
    >
      <Toast ref={toast} />
      <h1>Pagos de Usuarios</h1>
      <DataTable value={payments} paginator={false}>
        <Column field="residenceNo" header="No. de Residencia" />
        <Column field="paymentName" header="Nombre del Pago" />
        <Column field="month" header="Mes" />
        <Column field="year" header="Año" />
        <Column header="Comprobante" body={imageBodyTemplate} />
      </DataTable>

      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      />
    </Dialog>
  );
};

export default InvoicesByUser;
