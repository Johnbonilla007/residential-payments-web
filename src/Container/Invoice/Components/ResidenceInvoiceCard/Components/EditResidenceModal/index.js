/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { InvoiceServices } from "../../../../Invoice.Service";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { setResidences } from "../../../../reducer";
import { EditResidenceModalStyled, EditResidenceStyled } from "./styles";
import { utils } from "../../../../../../Helpers/utils";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import UploadToS3WithDropzone from "../../../../../../Components/Controls/UploadToS3WithDropzone";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { stages } from "../../../../../Users/User/setting";
import { UsersServices } from "../../../../../Users/User/users.service";

const EditResidenceModal = ({
  accounts,
  visible,
  onHide,
  residenceList,
  setResidenceList,
  setUserList,
  residence,
  setSelectedResidence,
}) => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const account = useMemo(() => {
    if (utils.evaluateArray(residence?.accounts)) {
      return residence.accounts?.firstOrDefault();
    }
    return {};
  }, [residence]);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    residence: { ...residence },
    account,
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [isOpenUploadImage, setIsOpenUploadImage] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const handleEditClick = () => setEditMode(true);

  const handleInputChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    if (formData.residence.imageUrl !== residence.imageUrl) {
      handleSaveClick();
    }
  }, [formData.residence.imageUrl]);

  const handleSaveClick = async () => {
    setEditMode(false);

    let request = { residence: formData.residence };
    let response = await UsersServices.createOrUpdateResidence(request);

    if (response.success) {
      request = {
        account: {
          ...formData.account,
          block: formData.residence.block,
          houseNumber: formData.residence.houseNumber,
        },
      };
      response = await UsersServices.createOrUpdateAccount(request);

      if (response.success) {
        const _residenceList = residenceList.where(
          (x) => x.id !== residence.id
        );

        const _residence = formData.residence;

        _residenceList.push(_residence);
        setSelectedResidence(_residence);
        setResidenceList(_residenceList);
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: "Transacción realizada con éxito",
          life: 3000,
        });
      }
    }
    console.log("Saved data:", { ...formData, uploadedImage });
  };

  const imageUrl = useMemo(() => {
    return (
      residence.imageUrl ||
      formData.residence.imageUrl ||
      "https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/residenciales.jpg"
    );
  }, [residence?.imageUrl, formData?.residence?.imageUrl]);

  return (
    <Dialog
      header={`${residence.name} - ${residence.residenceNo}`}
      visible={visible}
      style={{ width: "80vw", height: "90vh" }}
      onHide={onHide}
      footer={
        <EditResidenceStyled>
          {!editMode && (
            <button onClick={handleEditClick} className="primary-button">
              <i className="pi pi-pencil"></i> Edit
            </button>
          )}

          {editMode && (
            <button
              type="button"
              className="primary-button"
              onClick={handleSaveClick}
            >
              <i className="pi pi-save"></i> Save
            </button>
          )}
        </EditResidenceStyled>
      }
    >
      <Toast ref={toast} />
      <EditResidenceModalStyled>
        {!editMode ? (
          <>
            <div className="section">
              <h3>Detalle de la Casa</h3>
              <div className="residence-details">
                <div className="details-row">
                  <div>
                    <p>
                      <strong>Nombre:</strong> {residence.name}
                    </p>
                    <p>
                      <strong>Código:</strong> {residence.residenceNo}
                    </p>
                    <p>
                      <strong>Bloque:</strong> {residence.block}
                    </p>
                    <p>
                      <strong>Número de Casa:</strong> {residence.houseNumber}
                    </p>
                    <p>
                      <strong>Color de Casa:</strong> {residence.color}
                    </p>
                    <p>
                      <strong>Etapa:</strong> {residence.stage}
                    </p>
                  </div>
                </div>

                <div className="image-container">
                  <div className="card-image">
                    {/* Display Image */}
                    <img
                      src={imageUrl}
                      alt="Uploaded Residence"
                      className="residence-image"
                      onClick={() => setIsImageModalVisible(true)} // Open modal on click
                    />

                    {/* Edit Button */}
                    <div className="edit-button">
                      <i
                        className="pi pi-pencil edit-icon"
                        onClick={() => setIsOpenUploadImage(true)}
                      ></i>
                    </div>

                    {/* Image Modal */}
                    <Dialog
                      visible={isImageModalVisible}
                      onHide={() => setIsImageModalVisible(false)}
                      header="Full-Size Image"
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
                  </div>
                  <UploadToS3WithDropzone
                    isOpen={isOpenUploadImage}
                    folderPath="Residence00001"
                    fileName={residence.residenceNo}
                    getUrl={(url) => {
                      setFormData({
                        ...formData,
                        residence: { ...residence, imageUrl: url },
                      });
                      setIsOpenUploadImage(false);
                    }}
                    onDissmis={() => {
                      setIsOpenUploadImage(false);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="section">
              <h3>Detalle de Usuario</h3>
              <div className="details-row">
                <div>
                  <p>
                    <strong>Nombre:</strong> {account.fullName}
                  </p>
                  <p>
                    <strong>Correo Electrónico:</strong> {account.email}
                  </p>

                  <p>
                    <strong>Número de Teléfono:</strong> {account.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <form>
            <div className="section">
              <div
                style={{ display: "flex", flexDirection: "column", width: 300 }}
              >
                <h3>Residence Details</h3>

                <label>Name:</label>
                <InputText
                  value={formData.residence.name}
                  onChange={(e) =>
                    handleInputChange("residence", "name", e.target.value)
                  }
                />
                <label>Etapa:</label>
                <Dropdown
                  optionValue="stage"
                  optionLabel="stage"
                  value={formData.residence.stage}
                  options={[
                    { stage: stages["primeraEtapa"] },
                    { stage: stages["segundaEtapa"] },
                    { stage: stages["terceraEtapa"] },
                    { stage: stages["cuartaEtapa"] },
                  ]}
                  onChange={(e) => {
                    handleInputChange("residence", "stage", e.value);
                  }}
                />
                <label>Block:</label>
                <InputText
                  value={formData.residence.block}
                  onChange={(e) =>
                    handleInputChange("residence", "block", e.target.value)
                  }
                />
                <label>Número de Casa:</label>
                <InputText
                  value={formData.residence.houseNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "residence",
                      "houseNumber",
                      e.target.value
                    )
                  }
                />
                <label>Color:</label>
                <InputText
                  value={formData.residence.color}
                  onChange={(e) =>
                    handleInputChange("residence", "color", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="section">
              <div
                style={{ display: "flex", flexDirection: "column", width: 300 }}
              >
                <h3>User Details</h3>
                <label>Full Name:</label>
                <InputText
                  value={formData.account.fullName}
                  onChange={(e) =>
                    handleInputChange("account", "fullName", e.target.value)
                  }
                />
                <label>Email:</label>
                <InputText
                  value={formData.account.email}
                  onChange={(e) =>
                    handleInputChange("account", "email", e.target.value)
                  }
                />
                <label>Phone Number:</label>
                <InputText
                  value={formData.account.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("account", "phoneNumber", e.target.value)
                  }
                />
                <label>Manager:</label>
                <Checkbox
                  checked={formData.account.isManager}
                  onChange={(e) =>
                    handleInputChange("account", "isManager", e.checked)
                  }
                />
              </div>
            </div>
          </form>
        )}
      </EditResidenceModalStyled>
    </Dialog>
  );
};

export default EditResidenceModal;
