import React, { useEffect, useState } from "react";
import Container from "../../../Components/ContainerControl";
import { VisitsManagerStyled } from "./styles";
import { QrReader } from "react-qr-reader";

import { QRCodeCanvas } from "qrcode.react";

const VisitsManager = () => {
  const handleScan = (data) => {
    if (data) {
      console.log(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  return (
    <Container>
      <VisitsManagerStyled>
        <QRCodeCanvas delay={300} onError={handleError} onScan={handleScan} />
        <QrReader
          delay={100}
          onError={handleError}
          onResult={(result, error) => {
            debugger;
            if (result) handleScan(result.text);
            if (error) handleError(error);
          }}
        />
      </VisitsManagerStyled>
    </Container>
  );
};

export default VisitsManager;
