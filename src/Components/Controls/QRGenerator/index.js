// QRGenerator.js
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { QRGeneratorStyled } from "./styles";

const QRGenerator = ({ value, size = 256 }) => {
  return (
    <QRGeneratorStyled>
      <QRCodeCanvas value={value} size={size} />
    </QRGeneratorStyled>
  );
};

export default QRGenerator;
