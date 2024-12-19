/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog } from "primereact/dialog";
import { Amplify, Storage } from "aws-amplify";
import awsConfig from "../../../aws-exports-ssa";
import { Toast } from "primereact/toast";
import { UploadToS3WithDropzoneStyled } from "./styled";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { CameraWrapper } from "../Camera/styles";
import Webcam from "react-webcam";

Amplify.configure(awsConfig);

const UploadToS3WithDropzone = ({
  isOpen,
  onDissmis,
  folderPath,
  getUrl,
  fileName,
  handleCapturePhoto = undefined,
}) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showUploadPhoto, setShowUploadPhoto] = useState(true);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImageSrc(image);
      setShowCamera(false);
      setShowUploadPhoto(true);
      handleCapturePhoto && handleCapturePhoto(image);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen]);

  const toast = useRef(null);

  // Valida que el archivo sea una imagen
  const validateImage = (file) => {
    const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
    return acceptedFormats.includes(file.type);
  };

  const onDrop = (acceptedFiles) => {
    const droppedFile = acceptedFiles[0];

    // Verifica que el archivo sea una imagen
    if (!validateImage(droppedFile)) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Solo se aceptan imágenes",
        life: 3000,
      });
      return;
    }

    // Crear una URL de vista previa
    const previewUrl = URL.createObjectURL(droppedFile);
    setFile(droppedFile);
    setFileUrl(previewUrl);
  };
  const uploadProgress = (progress) => {
    const percentage = Math.round((progress.loaded / progress.total) * 100);
    console.log(`Upload is ${percentage}% done`);
    setProgress(percentage);
  };

  const handleSave = async () => {
    if (!folderPath) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Debes especificar una ruta",
        life: 3000,
      });
      return;
    }

    const _file = file;

    if (!_file) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "No hay archivo para subir",
        life: 3000,
      });
      return;
    }

    setUploading(true);

    const fileExtension = _file.name.split(".").pop(); // Obtiene la extensión del archivo
    const finalFileName = fileName
      ? fileName + "." + fileExtension
      : _file.name;
    const filePath = `${folderPath}/${finalFileName}`;

    try {
      // Sube el archivo al bucket existente en la ruta especificada
      const result = await Storage.put(filePath, file, {
        level: "public",
        contentType: file.type,
        progressCallback: uploadProgress,
      });

      const url = `https://sasapp764c0b20515d4bb69a4c5978319c04a1213255-dev.s3.amazonaws.com/public/${result.key}`;
      setFileUrl(url);
      getUrl(url);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Archivo subido correctamente",
        life: 3000,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al subir el archivo",
        life: 3000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null); // Limpiar el archivo seleccionado
    setFileUrl(""); // Limpiar la vista previa
    setImageSrc("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const videoConstraints = {
    facingMode: "environment", // Usar la cámara trasera
    width: 1280, // Ancho del video
    height: 720, // Alto del video
  };

  return (
    <Dialog header={"Subir Imagen"} visible={isOpen} onHide={onDissmis}>
      <UploadToS3WithDropzoneStyled>
        <Toast ref={toast} />

        <div className="button-group">
          {!showUploadPhoto && (
            <button
              disabled={showUploadPhoto}
              className="upload-button"
              onClick={() => {
                setShowUploadPhoto(true);
                setShowCamera(false);
                handleClose();
              }}
            >
              Subir Imagen
            </button>
          )}

          {!showCamera && handleCapturePhoto && (
            <button
              className="upload-button"
              onClick={() => {
                setShowCamera(true);
                setShowUploadPhoto(false);
                handleClose();
              }}
            >
              Tomar Foto
            </button>
          )}
        </div>

        {!fileUrl && !uploading && (
          <div className="upload-section">
            {showUploadPhoto && (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>
                  Arrastra y suelta un archivo aquí, o haz clic para seleccionar
                  uno
                </p>
              </div>
            )}

            {showCamera && (
              <CameraWrapper>
                <h2>Tomar Foto</h2>
                <div className="webcam-container">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="webcam"
                    videoConstraints={videoConstraints} // Establecer las restricciones de la cámara
                  />
                </div>
                <button className="capture-button" onClick={capturePhoto}>
                  Capturar Foto
                </button>
              </CameraWrapper>
            )}
          </div>
        )}
        {(fileUrl || imageSrc) && !uploading && (
          <div>
            <h3>Vista Previa:</h3>
            <img
              src={imageSrc || fileUrl}
              alt="Preview"
              style={{ width: "300px" }}
            />
          </div>
        )}
        {(imageSrc || fileUrl) && !uploading && (
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Button label="Guardar" onClick={handleSave} disabled={uploading} />

            <Button label="Cancelar" onClick={handleClose} />
          </div>
        )}
        {uploading && <ProgressBar value={progress}></ProgressBar>}
      </UploadToS3WithDropzoneStyled>
    </Dialog>
  );
};

const dropzoneStyle = {
  border: "2px dashed #007BFF",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  height: "50vh",
};

export default UploadToS3WithDropzone;
