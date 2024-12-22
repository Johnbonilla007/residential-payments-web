import React, { useEffect, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { VisitsManagerStyled } from "./styles";
import { BrowserQRCodeReader } from "@zxing/browser";
import { Toast } from "primereact/toast";

const VisitsManager = () => {
  const videoRef = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader?.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, error) => {
        if (result) {
          debugger;
          const text = result.getText();
          console.log(text);
          toast.current.show({
            severity: "warn",
            summary: "Advertencia",
            detail: text,
            life: 3000,
          });
        }
        if (error) {
          console.error(error);
        }
      }
    );

    return () => {
      codeReader?.reset();
    };
  }, []);
  return (
    <Container>
      <Toast ref={toast} />

      <VisitsManagerStyled>
        <video ref={videoRef} style={{ width: "100%" }} />
      </VisitsManagerStyled>
    </Container>
  );
};

export default VisitsManager;
