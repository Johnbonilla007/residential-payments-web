import { Dialog } from "primereact/dialog";
import { PenaltiesFeeListComponentStyled } from "./styles";
import { useEffect, useState } from "react";
import { PenaltyFeeService } from "../../PenaltyFee.Service";
import { Button } from "primereact/button";
import { PayPenaltyFee } from "../PayPenaltyFee";
import { confirmDialog } from "primereact/confirmdialog";
import { utils } from "../../../../../Helpers/utils";

export const PenaltiesFeeListComponent = ({
  onClose,
  residenceNo,
  ownerPropertyName,
  residenceName,
}) => {
  const [penaltiesFee, setPenaltiesFee] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [isImageModalVisible, setIsImageModalVisible] = useState(false); // Modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Selected image for modal
  const [selectedPenalty, setSelectedPenalty] = useState(null); // Estado para almacenar la penalidad seleccionada
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false); // Estado para mostrar el modal de pago
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false); // Modal de confirmación

  useEffect(() => {
    loadPenaltiesFee();
  }, []);

  const loadPenaltiesFee = async () => {
    const request = { residenceNo, onPending: true };
    try {
      const response = await PenaltyFeeService.getAll(request);
      if (response.success) {
        setPenaltiesFee(response.penaltiesFee);
      } else {
        console.error("Failed to load penalties");
      }
    } catch (error) {
      console.error("Error fetching penalties: ", error);
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  const showImageModal = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the selected image for the modal
    setIsImageModalVisible(true); // Show modal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePaymentClick = (penalty) => {
    setSelectedPenalty(penalty); // Guardar la penalidad seleccionada
    setIsPaymentModalVisible(true); // Mostrar el modal de pago
  };

  const handleDeletePenalty = async ({ id }) => {
    confirmDialog({
      message: "¿Estas seguro que quieres eliminar la multa?",
      header: "Advertencia",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      position: "center",
      accept: async () => {
        const response = await PenaltyFeeService.remove(id);
        if (response.success) {
          setPenaltiesFee(penaltiesFee.filter((penalty) => penalty.id !== id)); // Actualiza la lista de penalidades
        } else {
          alert("Error al eliminar la multa");
        }
      },
      reject: () => {},
    });
  };

  const handleCondonePenalty = async (penalty) => {
    confirmDialog({
      message: "¿Estas seguro que quieres condonar la multa?",
      header: "Advertencia",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      position: "center",
      accept: async () => {
        const request = { penaltyFee: { ...penalty, wasPayed: true } };
        const response = await PenaltyFeeService.createOrUpdate(request);
        if (response.success) {
          penalty.wasPayed = true;

          const filteredOnlyWasnPayed = penaltiesFee.where(
            (item) => !item.wasPayed
          );

          setPenaltiesFee([...filteredOnlyWasnPayed]);
          setIsConfirmationModalVisible(false); // Cerrar modal de confirmación
        } else {
          alert("Error al condonar la multa");
        }
      },
      reject: () => {},
    });
  };

  return (
    <Dialog
      onHide={onClose}
      visible
      style={{ minWidth: "50vw" }}
      header={`Multas de ${ownerPropertyName} en ${residenceName}`}
    >
      <PenaltiesFeeListComponentStyled>
        {penaltiesFee.length === 0 ? (
          <div>No penalties found.</div>
        ) : (
          penaltiesFee.map((penalty) => (
            <div key={penalty.id} className="penalty-item">
              <div className="item-header">Multa #{penalty.penaltyFeeNo}</div>
              <div className="item-detail">
                <span>Fecha:</span>{" "}
                {new Date(penalty.penaltyFeeDate).toLocaleDateString()}
              </div>
              <div className="item-detail">
                <span>Códido de Residencia:</span> {penalty.residenceNo}
              </div>
              <div className="item-detail">
                <span>Cantidad:</span> {penalty.quantity}
              </div>
              <div className="item-detail">
                <span>Costo:</span> HNL {penalty.cost?.toFixed(2)}
              </div>
              <div className="item-detail">
                <span>Total:</span> HNL {penalty.amount?.toFixed(2)}
              </div>
              {penalty.comment && (
                <div className="item-detail">
                  <span>Comentario:</span> {penalty.comment}
                </div>
              )}
              {penalty.imageUrl && (
                <div className="image-preview">
                  <img
                    src={penalty.imageUrl}
                    alt={`Penalidad ${penalty.penaltyFeeNo}`}
                    onClick={() => showImageModal(penalty.imageUrl)} // Show modal on click
                    className="thumbnail"
                  />
                </div>
              )}

              <div className="commands">
                {utils.hasPermission("PagarMulta") && (
                  <Button
                    label="Pagar Multa"
                    onClick={() => handlePaymentClick(penalty)}
                    className="p-button p-button-success"
                  />
                )}

                {utils.hasPermission("EliminarMulta") && (
                  <Button
                    label="Eliminar Multa"
                    onClick={() => handleDeletePenalty(penalty)}
                    className="p-button p-button-danger"
                  />
                )}

                {utils.hasPermission("CondonarMulta") && (
                  <Button
                    label="Condonar Multa"
                    onClick={() => handleCondonePenalty(penalty)}
                    className="p-button p-button-warning"
                  />
                )}
                {utils.hasPermission("EditarMulta") && (
                  <Button
                    label="Editar Multa"
                    //  onClick={handleCondonePenalty}
                    className="p-button p-button-info"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </PenaltiesFeeListComponentStyled>

      {/* Image Modal */}
      <Dialog
        visible={isImageModalVisible}
        onHide={() => setIsImageModalVisible(false)}
        header="Imagen de Evidencia"
        style={{ width: "50vw", textAlign: "center" }}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Full-Size Image"
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

      <PayPenaltyFee
        isPaymentModalVisible={isPaymentModalVisible}
        setIsPaymentModalVisible={setIsPaymentModalVisible}
        selectedPenalty={selectedPenalty}
      />
    </Dialog>
  );
};
