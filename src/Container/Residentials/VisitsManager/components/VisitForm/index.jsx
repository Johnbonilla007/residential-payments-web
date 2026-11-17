import { Dialog } from "primereact/dialog";
import { VisitFormStyled } from "./styles";
import { dialogSizing } from "../../../../../Components/Controls/dialogStyles";

export const VisitForm = ({ onClose, title = "Agregando Visita" }) => {
  return (
    <Dialog
      visible
      onHide={onClose}
      header={title}
      {...dialogSizing(36, { fullScreenOnMobile: true })}
    >
      <VisitFormStyled>
        <h1>{title}</h1>
      </VisitFormStyled>
    </Dialog>
  );
};
