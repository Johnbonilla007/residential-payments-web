import { Button } from "primereact/button";
import { utils } from "../../../../../Helpers/utils";

export const CardComponent = ({
  residence,
  index,
  handleOnAddOrEditPenaltyFee,
  handleShowPenaltiesFee,
}) => {
  return (
    <div className="residence-card" key={index}>
      <div className="residence-image">
        <img
          src={
            residence.imageUrl ||
            "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/casa.jpg"
          }
          alt="Descripción de la imagen"
          width={20}
        />
      </div>
      <div className="residence-content">
        <p>
          <strong>Nombre del Propietario:</strong>{" "}
          {residence.accounts?.firstOrDefault()?.fullName}
        </p>
        <p>
          <strong>Nombre:</strong> {residence.name}
        </p>
        <p>
          <strong>Bloque:</strong> {residence.block}
        </p>
        <p>
          <strong>Número de Casa:</strong> {residence.houseNumber}
        </p>
      </div>
      <div className="buttons-container">
        <div style={{ flexGrow: 1, minWidth: "120px" }}>
          <Button
            label="Editar Propiedad"
            className="p-button-raised p-button-warning"
            onClick={() => {}}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div style={{ flexGrow: 1, minWidth: "120px" }}>
          <Button
            label="Ver Multas"
            icon="pi pi-eye"
            className="p-button-raised p-button-success"
            onClick={() => handleShowPenaltiesFee(residence)}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        {utils.hasPermission("AgregarMulta") && (
          <div style={{ flexGrow: 1, minWidth: "120px" }}>
            <Button
              label="Agregar Multa"
              className="p-button-raised p-button-primary"
              onClick={() => handleOnAddOrEditPenaltyFee(residence)}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
