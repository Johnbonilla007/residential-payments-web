import React, { useEffect, useRef, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { VisitsManagerStyled } from "./styles";
import { BrowserQRCodeReader } from "@zxing/browser";

const VisitsManager = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, error) => {
        debugger;
        if (result) {
          console.log(result.getText());
        }
        if (error) {
          debugger;

          console.error(error);
        }
      }
    );

    return () => {
      codeReader.reset();
    };
  }, []);
  return (
    <Container>
      <VisitsManagerStyled>
        <video ref={videoRef} style={{ width: "100%" }} />
      </VisitsManagerStyled>
    </Container>
  );
};

export default VisitsManager;
