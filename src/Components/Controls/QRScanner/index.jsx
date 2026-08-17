// QRScanner.js
import React, { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { Toast } from "primereact/toast";
import { QRScannerStyled } from "./styles";

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const videoRef = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    codeReader?.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, error) => {
        if (result) {
          const text = result.getText();
          if (onScanSuccess) onScanSuccess(text);
          toast.current?.show({
            severity: "success",
            summary: "QR Escaneado",
            detail: text,
            life: 3000,
          });
        }
        if (error && onScanError) {
          onScanError(error);
        }
      }
    );

    return () => {
      const { reset } = codeReader;
      if (reset) {
        reset();
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <QRScannerStyled>
      <Toast ref={toast} />
      <video ref={videoRef} style={{ width: "100%" }} />
    </QRScannerStyled>
  );
};

export default QRScanner;
