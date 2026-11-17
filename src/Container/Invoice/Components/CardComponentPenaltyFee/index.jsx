import { Button } from "primereact/button";
import { utils } from "../../../../Helpers/utils";
import { CardComponentPenaltyFeeStyled, MobileResidenceCard } from "./styles";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { FaUser } from "react-icons/fa";
import { useIsMobile } from "../../../../Helpers/useIsMobile";
import ActionSheet from "../../../../Components/Controls/ActionSheet";
import { dialogSizing } from "../../../../Components/Controls/dialogStyles";

const DEFAULT_IMAGE =
  "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/casa.jpg";

export const CardComponentPenaltyFee = ({
  residence,
  index,
  handleOnAddPenaltyFee,
  handleOnEditResidence,
  handleShowPenaltiesFee,
  handleShowReceiptPenaltiesFee,
}) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  const { imageUrl } = residence;
  const ownerName =
    residence.accounts?.firstOrDefault()?.fullName ||
    residence.name ||
    "Propietario no asignado";
  const showSecondaryName = Boolean(residence.name && residence.name !== ownerName);
  const hasCustomImage = Boolean(imageUrl && imageUrl !== DEFAULT_IMAGE);

  const mobileActions = [
    {
      label: "Ver Multas",
      icon: "pi pi-eye",
      onClick: () => handleShowPenaltiesFee(residence),
    },
    {
      label: "Ver Recibos",
      icon: "pi pi-file",
      onClick: () => handleShowReceiptPenaltiesFee(residence),
    },
    utils.hasPermission("AgregarMulta") && {
      label: "Agregar Multa",
      icon: "pi pi-plus",
      onClick: () => handleOnAddPenaltyFee(residence),
    },
    {
      label: "Editar Casa",
      icon: "pi pi-pencil",
      onClick: () => handleOnEditResidence(residence),
    },
    hasCustomImage && {
      label: "Ver Foto",
      icon: "pi pi-image",
      onClick: () => setIsImageModalVisible(true),
    },
  ].filter(Boolean);

  if (isMobile) {
    return (
      <>
        <MobileResidenceCard key={index}>
          <button
            type="button"
            className="mob-main-trigger"
            onClick={() => setSheetOpen(true)}
          >
            <div className="mob-badge" aria-hidden="true">
              {hasCustomImage ? (
                <img loading="lazy" decoding="async" src={imageUrl} alt="" />
              ) : (
                <>
                  <span>B{residence.block || "-"}</span>
                  <span>C{residence.houseNumber || "-"}</span>
                </>
              )}
            </div>
            <div className="mob-info">
              <div className="mob-owner">{ownerName}</div>
              <div className="mob-sub">
                Bloque {residence.block || "-"} · Casa {residence.houseNumber || "-"}
                {showSecondaryName ? ` · ${residence.name}` : ""}
              </div>
            </div>
          </button>
          <div className="mob-actions">
            <button
              type="button"
              className="mob-quick-btn"
              onClick={() => handleShowPenaltiesFee(residence)}
            >
              <i className="pi pi-eye" aria-hidden="true" />
              <span>Multas</span>
            </button>
            <button
              type="button"
              className="mob-more-btn"
              aria-label={`Más acciones para ${ownerName}`}
              onClick={() => setSheetOpen(true)}
            >
              <i className="pi pi-ellipsis-v" aria-hidden="true" />
            </button>
          </div>
        </MobileResidenceCard>

        <ActionSheet
          visible={sheetOpen}
          onHide={() => setSheetOpen(false)}
          title={`${ownerName} (${residence.block || "-"}-${residence.houseNumber || "-"})`}
          actions={mobileActions}
        />

        <Dialog
          visible={isImageModalVisible}
          onHide={() => setIsImageModalVisible(false)}
          header="Foto"
          {...dialogSizing(44, { fullScreenOnMobile: true })}
          style={{
            ...dialogSizing(44, { fullScreenOnMobile: true }).style,
            textAlign: "center",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Full-Size Residence"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          ) : (
            <p>No image available</p>
          )}
        </Dialog>
      </>
    );
  }

  return (
    <CardComponentPenaltyFeeStyled key={index}>
      <div className="edit-button">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          onClick={() => handleOnEditResidence(residence)}
          aria-label="Editar casa"
        />
      </div>

      <div className="residence-image">
        <img
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            setIsImageModalVisible(true);
          }}
          src={residence.imageUrl || DEFAULT_IMAGE}
          alt="Descripción de la imagen"
        />
      </div>

      <div className="residence-content">
        <div className="owner-title">
          <FaUser className="info-icon" />
          <span>{ownerName}</span>
        </div>

        {showSecondaryName && (
          <div className="residence-name">
            <strong>{residence.name}</strong>
          </div>
        )}

        <div className="residence-details-grid">
          <div className="detail-item">
            <strong>Bloque</strong>
            <span>{residence.block || "-"}</span>
          </div>
          <div className="detail-item">
            <strong>Casa</strong>
            <span>{residence.houseNumber || "-"}</span>
          </div>
        </div>
      </div>

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
        {...dialogSizing(44, { fullScreenOnMobile: true })}
        style={{
          ...dialogSizing(44, { fullScreenOnMobile: true }).style,
          textAlign: "center",
        }}
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
