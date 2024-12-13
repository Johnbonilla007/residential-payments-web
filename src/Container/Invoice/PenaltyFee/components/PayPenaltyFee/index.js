import { Dialog } from "primereact/dialog";
import { PayPenaltyFeeStyled } from "./styles";
import { Button } from "primereact/button";

export const PayPenaltyFee = ({
  isPaymentModalVisible,
  setIsPaymentModalVisible,
  selectedPenalty,
}) => {
  return (
    <Dialog
      visible={isPaymentModalVisible}
      onHide={() => setIsPaymentModalVisible(false)}
      header="Formulario de Pago"
      style={{ width: "50vw", textAlign: "center" }}
    >
      <PayPenaltyFeeStyled>
        {selectedPenalty && (
          <div>
            <h4>Pagar Penalidad #{selectedPenalty.penaltyFeeNo}</h4>
            <form>
              <div>
                <label>Numero de Tarjeta</label>
                <input
                  type="text"
                  placeholder="Ingrese el número de tarjeta"
                  required
                />
              </div>
              <div>
                <label>Fecha de Expiración</label>
                <input type="month" required />
              </div>
              <div>
                <label>Código de Seguridad</label>
                <input
                  type="text"
                  placeholder="Ingrese el código de seguridad"
                  required
                />
              </div>
              <Button
                label="Pagar"
                className="p-button p-button-primary"
                onClick={() => alert("Pago realizado con éxito")}
              />
            </form>
          </div>
        )}
      </PayPenaltyFeeStyled>
    </Dialog>
  );
};
