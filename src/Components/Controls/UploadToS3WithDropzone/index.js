import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog } from "primereact/dialog";
import { Amplify, Storage } from "aws-amplify";
import awsConfig from "../../../aws-exports-ssa";
import { Toast } from "primereact/toast";
import { UploadToS3WithDropzoneStyled } from "./styled";
import { Button } from "primereact/button";
import { utils } from "../../../Helpers/utils";
import { ProgressBar } from 'primereact/progressbar';

Amplify.configure(awsConfig);

const UploadToS3WithDropzone = ({
  isOpen,
  onDissmis,
  folderPath,
  getUrl,
  fileName,
}) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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

    if (!file) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "No hay archivo para subir",
        life: 3000,
      });
      return;
    }

    setUploading(true);

    const fileExtension = file.name.split(".").pop(); // Obtiene la extensión del archivo
    const finalFileName = fileName ? fileName + "." + fileExtension : file.name;
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
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <Dialog
      header={"Subir Imagen"}
      visible={isOpen}
      onHide={() => onDissmis()}
      style={{ width: "70vw", height: "60vh" }}
    >
      <UploadToS3WithDropzoneStyled>
        <Toast ref={toast} />
        {utils.isNullOrEmpty(fileUrl) && !uploading && (
          <div
            {...getRootProps()}
            style={{
              ...dropzoneStyle,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input {...getInputProps()} />
            <p>
              Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno
            </p>
          </div>
        )}
        {fileUrl && !uploading && (
          <div>
            <h3>Vista Previa:</h3>
            <img src={fileUrl} alt="Preview" style={{ width: "300px" }} />
          </div>
        )}
        {fileUrl && !uploading && (
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
        {uploading &&   <ProgressBar value={progress}></ProgressBar>}
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
