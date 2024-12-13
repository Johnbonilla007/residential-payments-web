import React, { useEffect, useRef, useState } from "react";
import { SpecialVisitStyled } from "./styled";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { AiFillDelete } from "react-icons/ai"; // Icono de eliminar
import Container from "../../../Components/ContainerControl";
import { FaPlus } from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";
import { utils } from "../../../Helpers/utils";
import { Toast } from "primereact/toast";
import { SpecialVisitServices } from "./SpecialVisit.service";
import DynamicFormDialog from "../../../Components/DynamicFormDialog";
import { fieldsSpecialVisit } from "./setting";
import { useDispatch, useSelector } from "react-redux";
import { setResidentialSelected } from "../../Invoice/reducer";

const SpecialVisit = () => {
  const [specialVisits, setSpecialVisits] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);
  const toast = useRef(null);

  const { residentialSelected, residentials } = useSelector(
    (store) => store.Invoice
  );
  const residentialList = residentials;
  const dispatch = useDispatch();

  useEffect(() => {
    if (utils.evaluateFullObjetct(residentialSelected)) {
      
      handleGetSpecialVisit(residentialSelected.residentialNo);
    }
  }, [residentialSelected]);

  const handleGetSpecialVisit = async (residentialNo) => {
    const request = {
      specialVisit: {
        residentialNo: residentialNo,
      },
    };

    const response = await SpecialVisitServices.getSpecialVisit(request);
    if (response?.success) {
      setSpecialVisits(response.specialVisits);
      return;
    }
  };

  const handleDelete = async (id) => {
    const request = { specialVisit: { id: id } };
    const response = await SpecialVisitServices.RemoveSpecialVisit(request);
    if (response?.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Visita Especial Eliminada",
        life: 3000,
      });
      if (utils.evaluateFullObjetct(residentialSelected)) {
        handleGetSpecialVisit(residentialSelected.residentialNo);
      }
      setShowModalForm(false);
      return;
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
  };
  const commands = [
    {
      label: "Crear Visita Especial",
      action: () => {
        setShowModalForm(true);
      },
      icon: () => {
        return <FaPlus size={16} color="#84b6f4" />;
      },
    },
  ];

  const handleOnchangeResidential = (e) => {
    dispatch(setResidentialSelected(e.value));
  };

  const templateResidentials = (row) => {
    return <label>{row.name}</label>;
  };

  const handleSubmit = async (value) => {
    const request = { specialVisit: value };
    const response = await SpecialVisitServices.createOrUpdateUser(request);
    if (response?.success) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Visita Especial Creada",
        life: 3000,
      });
      if (utils.evaluateFullObjetct(residentialSelected)) {
        handleGetSpecialVisit(residentialSelected.residentialNo);
      }
      setShowModalForm(false);
      return;
    }
    if (!response?.success) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: response.validationErrorMessage,
        life: 3000,
      });
      return;
    }
  };

  return (
    <Container commands={commands}>
      <SpecialVisitStyled>
        <Toast ref={toast} />
        <Dropdown
          className="commandbox"
          value={residentialSelected}
          options={residentialList}
          onChange={handleOnchangeResidential}
          optionLabel="name"
          placeholder="Seleccione una Residencial"
        />
        <h1>Visitas Especiales </h1>

        {specialVisits?.length > 0 && (
          <div className="container-card">
            {specialVisits.map((visit) => (
              <div key={visit.id} className="p-col-12 p-md-4">
                <Card
                  title={visit.name}
                  subTitle={`Residential No: ${visit.residentialNo}`}
                >
                  <p>
                    {visit.isRegisteredExit
                      ? "Registra Salida"
                      : "No Registra Salida"}
                  </p>
                  <Button
                    label="Eliminar"
                    className="p-button-danger"
                    icon={<AiFillDelete />}
                    onClick={() => handleDelete(visit.id)}
                  />
                </Card>
              </div>
            ))}
          </div>
        )}
        {showModalForm && (
          <DynamicFormDialog
            title="Crear Visita Especial"
            fields={fieldsSpecialVisit(residentialList, templateResidentials)}
            isOpen
            onDismiss={() => {
              setShowModalForm(false);
            }}
            onSubmit={handleSubmit}
          />
        )}
      </SpecialVisitStyled>
    </Container>
  );
};

export default SpecialVisit;
