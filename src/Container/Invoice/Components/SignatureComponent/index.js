import { Dialog } from "primereact/dialog";
import { SignatureComponentStyled } from "./styles";
import SignaturePadControl from "../../../../Components/Controls/SignatureControl";
import { InvoiceServices } from "../../Invoice.Service";

export const SignatureComponent = ({
  onClose,
  userId,
  toast,
  invoice,
  setShowSignatureSaved,
  canSaveSignature = true,
}) => {
  const handleGetSignature = async (signature) => {
    if (canSaveSignature) {
      const request = { userId, signature: signature.value };

      const response = await InvoiceServices.updateSignature(request);

      if (response?.success) {
        toast?.current?.show({
          severity: "success",
          summary: "Exito",
          detail: "La firma ha sido actualizada exitosamente!!",
          life: 3000,
        });
      }
    }

    invoice.signature = signature.value;
    setShowSignatureSaved(true);
    onClose();
  };
  return (
    <Dialog visible onHide={onClose}>
      <SignatureComponentStyled>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Firma Electrónica
        </h1>
        <SignaturePadControl handleGetSignature={handleGetSignature} />
      </SignatureComponentStyled>
    </Dialog>
  );
};
