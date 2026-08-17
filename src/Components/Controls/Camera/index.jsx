import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { CameraWrapper } from "./styles";

const Camera = ({ handleCapturePhoto, showPreview = false }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capturePhoto = () => {
    if (webcamRef.current) {
      
      const image = webcamRef.current.getScreenshot();
      setImageSrc(image);
      handleCapturePhoto(image);
    }
  };

  return (
    <CameraWrapper>
      <h2>Tomar Foto</h2>
      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
      </div>
      <button className="capture-button" onClick={capturePhoto}>
        Capturar Foto
      </button>
      {imageSrc && showPreview && (
        <div className="captured-image">
          <h3>Foto Capturada:</h3>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </CameraWrapper>
  );
};

export default Camera;
