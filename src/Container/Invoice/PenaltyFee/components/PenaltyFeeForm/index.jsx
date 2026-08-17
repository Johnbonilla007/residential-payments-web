/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { PenaltyFeeFormStyled } from "./styles";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { utils } from "../../../../../Helpers/utils";
import { InputText } from "primereact/inputtext";
import UploadToS3WithDropzone from "../../../../../Components/Controls/UploadToS3WithDropzone";
import Camera from "../../../../../Components/Controls/Camera";
import { Button } from "primereact/button";
import { PenaltyFeeService } from "../../PenaltyFee.Service";
import { InputTextarea } from "primereact/inputtextarea";
import { useDispatch, useSelector } from "react-redux";
import { setPenaltiesFee } from "../../reducer";

export const PenaltyFeeForm = ({
  onClose,
  paymentTypeList,
  toast,
  residenceNo,
  selectedPenalty = {},
}) => {
  const [formData, setFormData] = useState({
    ...selectedPenalty,
    penaltyFeeDate: new Date(selectedPenalty?.penaltyFeeDate),
  });
  const [isOpenUploadImage, setIsOpenUploadImage] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const { penaltiesFee } = useSelector((store) => store.PenaltyFee);
  const { quantity, paymentTypeNo } = formData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (formData.cost && formData.quantity) {
      setFormData({
        ...formData,
        amount: formData.quantity * formData.cost,
      });
    }
  }, [formData.quantity]);

  useEffect(() => {
    if (formData.paymentTypeNo) {
      const paymentType = paymentTypeList.firstOrDefault(
        (x) => x.paymentTypeNo === formData.paymentTypeNo
      );
      setFormData({
        ...formData,
        amount: quantity * paymentType.cost,
        cost: paymentType.cost,
      });
    }
  }, [paymentTypeNo, quantity]);

  const handleOnChangeFormData = (event) => {
    setFormData({
      ...formData,
      [event.name || event.target.name]: event.value || event.target.value,
    });
  };

  const handleCapturePhoto = (image) => {
    setFormData({ ...formData, imageUrl: image });
    setIsOpenUploadImage(false);
  };
  const handleSubmitPenaltyFee = async () => {
    const penaltyFee = { ...formData, residenceNo };
    const request = { penaltyFee };

    const response = await PenaltyFeeService.createOrUpdate(request);

    if (response.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Transacción realizada con éxito!!",
        life: 3000,
      });

      if (utils.evaluateFullObjetct(selectedPenalty)) {
        const _penaltiesFee = penaltiesFee.where(
          (x) => x.penaltyFeeNo !== selectedPenalty.penaltyFeeNo
        );

        _penaltiesFee.unshift({ ...formData });

        dispatch(setPenaltiesFee(_penaltiesFee));
      }
      onClose();
    }
  };
  return (
    <Dialog
      visible
      onHide={onClose}
      style={{ minWidth: 450 }}
      footer={
        <Button
          label="Guardar"
          icon="pi pi-check"
          className="p-button-raised p-button-success p-button-sm"
          onClick={handleSubmitPenaltyFee}
        />
      }
    >
      <PenaltyFeeFormStyled>
        <div className="form-container">
          <div className="form-group">
            <span className="p-float-label">
              <Dropdown
                id="paymentTypeNo"
                value={formData.paymentTypeNo}
                optionValue="paymentTypeNo"
                onChange={handleOnChangeFormData}
                options={paymentTypeList}
                placeholder="Seleccione el Tipo de Multa"
                optionLabel="name"
                name="paymentTypeNo"
              />
              <label htmlFor="paymentTypeNo">Tipo de Multa</label>
            </span>
          </div>

          {/* Costo */}
          <div className="form-group">
            <span className="field-label">Costo:</span>
            <span className="field-value">{formData.cost || "0.00"}</span>
          </div>

          {/* Cantidad Input */}
          <div className="form-group">
            <span className="p-float-label">
              <InputText
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleOnChangeFormData}
                placeholder="Ej. 2"
              />
              <label htmlFor="quantity">Cantidad</label>
            </span>
          </div>

          {/* Monto Total */}
          <div className="form-group">
            <span className="field-label">Monto Total:</span>
            <span className="field-value">{formData.amount || "0.00"}</span>
          </div>

          {/* Fecha Selector */}
          <div className="form-group">
            <span className="p-float-label">
              <Calendar
                name="penaltyFeeDate"
                value={formData.penaltyFeeDate}
                onChange={handleOnChangeFormData}
                placeholder="Seleccionar Fecha"
              />
              <label htmlFor="penaltyFeeDate">Fecha</label>
            </span>
          </div>

          <div className="form-group">
            <span className="p-float-label">
              <InputTextarea
                name="comment"
                value={formData.comment}
                onChange={handleOnChangeFormData}
                placeholder="Comentario..."
                rows={3}
                cols={20}
              />
              <label htmlFor="comment">Comentario</label>
            </span>
          </div>

          {/* Image Upload and Preview */}
          <div className="form-group image-container">
            {formData.imageUrl && (
              <div className="image-preview">
                <img
                  src={formData.imageUrl || "/placeholder-image.png"}
                  alt="Uploaded Residence"
                  className="residence-image"
                  onClick={() => setIsImageModalVisible(true)}
                />
                <div className="edit-button" title="Edit Image">
                  <i
                    className="pi pi-pencil edit-icon"
                    onClick={() => setIsOpenUploadImage(true)}
                  ></i>
                </div>
              </div>
            )}

            <button
              className="upload-button"
              onClick={() => setIsOpenUploadImage(true)}
            >
              Subir Imagen
            </button>

            {showCamera && (
              <Dialog
                visible
                onHide={() => setShowCamera(false)}
                // style={{ width: "vw", height: "70vh", textAlign: "center" }}
              >
                <Camera handleCapturePhoto={handleCapturePhoto} />
              </Dialog>
            )}
          </div>

          {/* Modal for Full-Size Image */}
          <Dialog
            visible={isImageModalVisible}
            onHide={() => setIsImageModalVisible(false)}
            header="Vista Previa de Imagen"
            style={{ width: "50vw", textAlign: "center" }}
          >
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Full-Size Residence"
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

          <UploadToS3WithDropzone
            handleCapturePhoto={handleCapturePhoto}
            isOpen={isOpenUploadImage}
            folderPath={residenceNo}
            fileName={formData.paymentTypeNo}
            getUrl={(url) => {
              setFormData({ ...formData, imageUrl: url });
              setIsOpenUploadImage(false);
            }}
            onDissmis={() => setIsOpenUploadImage(false)}
          />
        </div>
      </PenaltyFeeFormStyled>
    </Dialog>
  );
};
