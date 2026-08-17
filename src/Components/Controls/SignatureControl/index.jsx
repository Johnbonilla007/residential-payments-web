// SignaturePadControl.js
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  SignatureContainer,
  SignatureCanvasWrapper,
  ButtonContainer,
  SavedSignature,
} from "./styles";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const SignaturePadControl = ({ handleGetSignature }) => {
  const sigCanvas = useRef(null); // Referencia al lienzo de la firma
  const [signatureURL, setSignatureURL] = useState(null); // Estado para la firma guardada
  const [showInputText, setShowInputText] = useState(false);
  const [signatureText, setSignatureText] = useState("");

  // Función para guardar la firma
  const saveSignature = () => {
    if (!signatureText) {
      if (sigCanvas.current) {
        const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();
        const signature = trimmedCanvas.toDataURL("image/png");
        setSignatureURL(signature);
        handleGetSignature({ type: "draw", value: signature });
      }

      return;
    }

    setSignatureText(signatureText);
    handleGetSignature({ type: "text", value: signatureText });
  };

  // Función para limpiar la firma
  const clearSignature = () => {
    sigCanvas?.current?.clear();
    setSignatureURL(null);
    setSignatureText(null);
    setShowInputText(false);
  };

  return (
    <SignatureContainer>
      <h3>Captura tu Firma Electrónica</h3>

      {/* Lienzo para la firma */}
      {!signatureURL && (
        <SignatureCanvasWrapper>
          {!showInputText && (
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                className: "signatureCanvas",
                width: 500,
                height: 80,
              }}
            />
          )}
          {showInputText && (
            <InputTextarea
              className="input-text"
              onChange={(event) => setSignatureText(event.target.value)}
            />
          )}
        </SignatureCanvasWrapper>
      )}

      {/* Botones para guardar o limpiar */}
      <ButtonContainer>
        <button className="save" onClick={saveSignature}>
          Guardar Firma
        </button>
        <button className="clear" onClick={clearSignature}>
          Limpiar Firma
        </button>
        <button className="digitar" onClick={() => setShowInputText(true)}>
          Digitar Firma
        </button>
      </ButtonContainer>

      {/* Mostrar firma guardada */}
      {signatureURL && (
        <SavedSignature>
          <h4>Firma Guardada:</h4>
          <img src={signatureURL} alt="Firma Electrónica" />
        </SavedSignature>
      )}
    </SignatureContainer>
  );
};

export default SignaturePadControl;
