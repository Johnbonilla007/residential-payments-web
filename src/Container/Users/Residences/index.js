import { Dialog } from "primereact/dialog";
import { ResidenceComponentStyled } from "./styles";
import { useEffect, useState } from "react";
import { UsersServices } from "../User/users.service";
import TableControl from "../../../Components/Controls/TableControl";
import { columnsResidences, fieldsResidence } from "../User/setting";
import { Button } from "primereact/button";
import DynamicFormDialog from "../../../Components/DynamicFormDialog";
import { useSelector } from "react-redux";
import { confirmDialog } from "primereact/confirmdialog";

export const ResidenceComponent = ({
  onClose,
  accountId,
  toast,
  userSelected,
}) => {
  const [residences, setResidences] = useState([]);
  const [residenceSelected, setResidenceSelected] = useState();
  const { residentialSelected } = useSelector((store) => store.Invoice);
  const [showFormResidence, setShowFormResidence] = useState(false);
  useEffect(() => {
    getResidenceByResidential();
  }, []);

  const getResidenceByResidential = async () => {
    const _searchValue = userSelected.detail.select((x) => x.id);
    _searchValue.push(accountId);
    const request = {
      searchValue: _searchValue.toString(),
    };

    const response = await UsersServices.getResidence(request);

    if (response?.success) {
      setResidences(response.residences);

      return;
    }
  };

  const handleDeleteResidence = async ({ id, accountId, residenceNo }) => {
    let request = { accountId, residenceNo };
    let response = await UsersServices.deleteAccount(request);

    if (response.success) {
      request = { id };
      response = await UsersServices.deleteResidence(request);

      if (response.success) {
        const _residences = residences.where((x) => x.id !== id);
        setResidences(_residences);

        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: "Transacción realizada exitosamente",
          life: 3000,
        });

        return;
      }
    }
  };

  const renderEditResidence = (row) => {
    return (
      <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
        <Button
          icon="pi pi-pencil"
          onClick={(event) => {
            event.preventDefault();
            setShowFormResidence(true);
            setResidenceSelected(row);
          }}
          className={
            "p-button-raised p-button-warning p-button-sm p-button-rounded"
          }
        />
        <Button
          icon="pi pi-trash"
          onClick={(event) => {
            confirmDialog({
              message: `¿Estas seguro que desea eliminar esta residencia ${row.name}?`,
              header: "Advertencia",
              icon: "pi pi-info-circle",
              acceptClassName: "p-button-danger",
              position: "center",
              accept: async () => {
                await handleDeleteResidence(row);
              },
              reject: () => {},
            });
          }}
          className={
            "p-button-raised p-button-danger p-button-sm p-button-rounded"
          }
        />
      </div>
    );
  };

  const tryCreateAccount = async (residence) => {
    const request = {
      account: {
        userName: userSelected.userName,
        fullName: userSelected.fullName,
        email: userSelected.email,
        phoneNumber: userSelected.phoneNumber,
        residence: residence?.name,
        accountType: "RSD",
        residential: residentialSelected?.name,
        residenceId: residence.id,
        residentialId: residentialSelected?.id,
        allowEmergy: false,
        block: residence?.block,
        houseNumber: residence?.houseNumber,
        residentialNo: residentialSelected?.residentialNo,
        residenceNo: residence.residenceNo,
        userId: userSelected.userId,
        isManager: true,
      },
    };

    const response = await UsersServices.createOrUpdateAccount(request);

    if (response.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Transacción realizada exitosamente",
        life: 3000,
      });

      return;
    }
  };

  const handleSubmitResidence = async (values) => {
    const request = {
      residence: {
        ...values,
        accountId,
        residentialId: residentialSelected?.id,
        residentialName: residentialSelected?.name,
        residentialNo: residentialSelected?.residentialNo,
        name: !values.name && values.isEmptyLot ? "Lote Baldío" : values.name,
      },
    };

    const response = await UsersServices.createOrUpdateResidence(request);
    const _residences = residences.filter((x) => x.id !== values.id);
    _residences.push(response.residence);
    setResidences(_residences);

    if (response.success) {
      await tryCreateAccount(response.residence);
    }

    setResidenceSelected(undefined);
    setShowFormResidence(false);
  };

  const handleDismissForm = () => {
    setResidenceSelected(undefined);
    setShowFormResidence(false);
  };

  const handleClickAddResicence = () => {
    setShowFormResidence(true);
  };
  return (
    <Dialog
      visible
      style={{ width: "50vw", height: "50vh" }}
      onHide={onClose}
      footer={() => (
        <Button onClick={handleClickAddResicence} icon="pi pi-plus">
          Agregar Resicencia
        </Button>
      )}
      header={`Residencias de ${userSelected.fullname}`}
    >
      <ResidenceComponentStyled>
        <TableControl
          columns={columnsResidences(renderEditResidence)}
          items={residences}
        />
      </ResidenceComponentStyled>
      {showFormResidence && (
        <DynamicFormDialog
          title={residenceSelected ? "Editar Residencia" : "Crear Residencia"}
          fields={fieldsResidence}
          onSubmit={handleSubmitResidence}
          mode="modal"
          isOpen
          onDismiss={handleDismissForm}
          itemToEdit={residenceSelected}
        />
      )}
    </Dialog>
  );
};
