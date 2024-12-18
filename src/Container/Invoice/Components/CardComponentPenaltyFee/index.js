import { Button } from "primereact/button";
import { utils } from "../../../../Helpers/utils";
import { CardComponentPenaltyFeeStyled } from "./styles";
import { useState } from "react";
import { Dialog } from "primereact/dialog";

export const CardComponentPenaltyFee = ({
  residence,
  index,
  handleOnAddPenaltyFee,
  handleOnEditResidence,
  handleShowPenaltiesFee,
  handleShowReceiptPenaltiesFee,
}) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const { imageUrl } = residence;

  return (
    <CardComponentPenaltyFeeStyled key={index}>
      {/* Botón flotante Editar */}
      <div className="edit-button">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          onClick={() => handleOnEditResidence(residence)}
        />
      </div>

      {/* Imagen */}
      <div className="residence-image">
        <img
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            setIsImageModalVisible(true);
          }}
          src={
            residence.imageUrl ||
            "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/casa.jpg"
          }
          alt="Descripción de la imagen"
        />
      </div>

      {/* Contenido */}
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

      {/* Botones */}
      <div className="buttons-container">
        <Button
          label="Ver Multas"
          icon="pi pi-eye"
          className="p-button-raised p-button-success"
          onClick={() => handleShowPenaltiesFee(residence)}
        />
        <Button
          label="Ver Recibos"
          icon="pi pi-file"
          className="p-button-raised p-button-info"
          onClick={() => handleShowReceiptPenaltiesFee(residence)}
        />
        {utils.hasPermission("AgregarMulta") && (
          <Button
            label="Agregar Multa"
            icon="pi pi-plus"
            className="p-button-raised p-button-primary"
            onClick={() => handleOnAddPenaltyFee(residence)}
          />
        )}
      </div>

      <Dialog
        visible={isImageModalVisible}
        onHide={() => setIsImageModalVisible(false)}
        header="Foto"
        style={{ width: "50vw", textAlign: "center" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Full-Size Residence"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        ) : (
          <p>No image available</p>
        )}
      </Dialog>
    </CardComponentPenaltyFeeStyled>
  );
};
