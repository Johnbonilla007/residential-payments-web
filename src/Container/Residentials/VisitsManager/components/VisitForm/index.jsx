import { Dialog } from "primereact/dialog";
import { VisitFormStyled } from "./styles";

export const VisitForm = ({ onClose, title = "Agregando Visita" }) => {
  return (
    <Dialog visible onHide={onClose} header={title}>
      <VisitFormStyled>
        <h1>{title}</h1>
      </VisitFormStyled>
    </Dialog>
  );
};
