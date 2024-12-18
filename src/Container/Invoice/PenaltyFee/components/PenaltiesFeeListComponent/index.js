import { Dialog } from "primereact/dialog";
import { PenaltiesFeeListComponentStyled } from "./styles";
import { useEffect, useState } from "react";
import { PenaltyFeeService } from "../../PenaltyFee.Service";
import { Button } from "primereact/button";
import { PayPenaltyFee } from "../PayPenaltyFee";
import { confirmDialog } from "primereact/confirmdialog";
import { utils } from "../../../../../Helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { setPenaltiesFee } from "../../reducer";

export const PenaltiesFeeListComponent = ({
  onClose,
  residenceNo,
  ownerPropertyName,
  residenceName,
  accountId,
  block,
  houseNumber,
  id,
  paymentTypeList,
  toast,
  handleShowEditPenalty,
}) => {
  const { penaltiesFee } = useSelector((store) => store.PenaltyFee);
  const [loading, setLoading] = useState(true); // Loading state
  const [isImageModalVisible, setIsImageModalVisible] = useState(false); // Modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Selected image for modal
  const [selectedPenalty, setSelectedPenalty] = useState(null); // Estado para almacenar la penalidad seleccionada
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false); // Estado para mostrar el modal de pago
  const dispatch = useDispatch();

  useEffect(() => {
    loadPenaltiesFee();
  }, []);

  const loadPenaltiesFee = async () => {
    const request = { residenceNo, onPending: true };
    try {
      const response = await PenaltyFeeService.getAll(request);
      if (response.success) {
        dispatch(setPenaltiesFee(response.penaltiesFee));
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
          const _penaltiesFee = penaltiesFee.filter(
            (penalty) => penalty.id !== id
          );

          dispatch(setPenaltiesFee(_penaltiesFee)); // Actualiza la lista de penalidades
        } else {
          alert("Error al eliminar la multa");
        }
      },
      reject: () => {},
    });
  };

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Exito",
      detail: message,
      life: 3000,
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
        const request = {
          penaltyFee: {
            id: penalty.id,
            penaltyFeeNo: penalty.penaltyFeeNo,
            wasPaid: true,
          },
        };
        const response = await PenaltyFeeService.executePaymentPenaltyFee(
          request
        );
        if (response.success) {
          const _penaltiesFee = utils.copyOf(penaltiesFee);
          const _penalty = _penaltiesFee.firstOrDefault(
            (x) => x.id === penalty.id
          );
          _penalty.wasPaid = true;

          const filteredOnlyWasnPayed = _penaltiesFee.where(
            (item) => !item.wasPaid
          );

          dispatch(setPenaltiesFee([...filteredOnlyWasnPayed]));
          showSuccess();
        } else {
          alert("Error al condonar la multa");
        }
      },
      reject: () => {},
    });
  };

  const updatePenaltiesFee = (penalty) => {
    const _penaltiesFee = penaltiesFee.where(
      (x) => x.penaltyFeeNo !== penalty.penaltyFeeNo
    );

    dispatch(setPenaltiesFee(_penaltiesFee));
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
                    onClick={() => handleShowEditPenalty(penalty)}
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
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Full-Size"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        )}
      </Dialog>

      {isPaymentModalVisible && (
        <PayPenaltyFee
          isPaymentModalVisible={isPaymentModalVisible}
          setIsPaymentModalVisible={setIsPaymentModalVisible}
          selectedPenalty={selectedPenalty}
          accountId={accountId}
          residenceNo={residenceNo}
          block={block}
          houseNumber={houseNumber}
          ownerPropertyName={ownerPropertyName}
          residenceId={id}
          paymentTypeList={paymentTypeList}
          toast={toast}
          updatePenaltiesFee={updatePenaltiesFee}
        />
      )}
    </Dialog>
  );
};
