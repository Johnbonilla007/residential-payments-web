import { FilterMatchMode } from "primereact/api";

export const itemTemplate = (item) => {
  return (
    <div className={`dropdown-item ${item.isEmptyLot ? "empty-lot" : ""}`}>
      <div>
        <div className="dropdown-value">{item.fullName}</div>
      </div>
      <div>
        <span className="dropdown-label">#Bloque</span>
        <span className="dropdown-value">{item.block}</span>
      </div>
      <div>
        <span className="dropdown-label">#Lote</span>
        <span className="dropdown-value">{item.houseNumber}</span>
      </div>
      <div style={{ fontWeight: "bold", color: "red" }}>
        {item.isEmptyLot && "Es lote baldío"}
      </div>
    </div>
  );
};

export const filterFields = [
  "paymentName",
  "penaltyFeeNo",
  "quantity",
  "cost",
  "amount",
  "penaltyFeeDate",
  "residenceNo",
  "imageUrl",
  "comment",
  "residenceName",
];

export const columnsTable = (handleViewPhoto) => [
  {
    fieldName: "paymentName", // Tipo de Pago
    name: "Tipo de Pago",
    width: "150px",
    filter: true,
  },
  {
    fieldName: "residenceName", // Número de Multa
    name: "Nombre del Propietario",
    width: "200px",
    filter: true,
  },
  {
    fieldName: "penaltyFeeNo", // Número de Multa
    name: "Número de Multa",
    width: "150px",
    filter: true,
  },
  {
    fieldName: "quantity", // Cantidad
    name: "Cantidad",
    width: "100px",
    filter: true,
  },
  {
    fieldName: "cost", // Costo
    name: "Costo",
    width: "100px",
    filter: true,
    body: ({ cost }) => `HNL ${cost?.toFixed(2)}`, // Formato de moneda
  },
  {
    fieldName: "amount", // Monto Total
    name: "Monto Total",
    width: "150px",
    filter: true,
    body: ({ amount }) => `HNL ${amount?.toFixed(2)}`, // Formato de moneda
  },
  {
    fieldName: "penaltyFeeDate", // Fecha de Multa
    name: "Fecha de Multa",
    width: "180px",
    filter: true,
    isDate: true,
    body: ({ penaltyFeeDate }) => new Date(penaltyFeeDate).toLocaleDateString(), // Formato de fecha
  },
  {
    fieldName: "residenceNo", // Número de Residencia
    name: "Número de Residencia",
    width: "150px",
    filter: true,
  },
  {
    fieldName: "imageUrl", // Imagen
    name: "Imagen",
    width: "200px",
    body: ({ imageUrl }) => {
      return (
        imageUrl && (
          <img
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleViewPhoto(imageUrl);
            }}
            src={imageUrl}
            alt="Imagen"
            width="50"
          />
        )
      );
    },
  },
  {
    fieldName: "comment", // Comentario
    name: "Comentario",
    width: "250px",
    filter: false,
  },
  {
    fieldName: "wasPaid", // Pagado
    name: "Pagado",
    width: "100px",
    body: ({ wasPaid }) => (wasPaid ? "Sí" : "No"), // Renderiza como texto "Sí" o "No"
  },
];

export const initialfilters = {
  paymentName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  penaltyFeeNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
  quantity: { value: null, matchMode: FilterMatchMode.CONTAINS },
  cost: { value: null, matchMode: FilterMatchMode.CONTAINS },
  amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
  penaltyFeeDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
  residenceNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
  imageUrl: { value: null, matchMode: FilterMatchMode.CONTAINS },
  comment: { value: null, matchMode: FilterMatchMode.CONTAINS },
  residenceName: { value: null, matchMode: FilterMatchMode.CONTAINS },
};
