import React from "react";
import { HomeStyled } from "./styled";
import { FaHome, FaMoneyBillWave, FaChartLine, FaUsers } from "react-icons/fa";

const Home = () => {
  return (
    <HomeStyled>
      <div className="hero-container">
        <h1>Sistema de Pagos Residenciales</h1>
        <p>
          Administra y gestiona los pagos de tu residencial de manera eficiente.
          Lleva el control de visitas, ingresos, gastos y más, todo desde una
          sola plataforma.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaHome />
            </div>
            <h3>Gestión de Residencias</h3>
            <p>Administra múltiples residenciales y sus propiedades</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Control de Pagos</h3>
            <p>Registra ingresos, gastos y genera recibos</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Reportes Detallados</h3>
            <p>Visualiza estadísticas y reportes financieros</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Control de Acceso</h3>
            <p>Gestiona visitas y permisos de usuarios</p>
          </div>
        </div>
      </div>
    </HomeStyled>
  );
};

export default Home;
