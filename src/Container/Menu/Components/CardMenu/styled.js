import styled from "styled-components";

export const CardMenuStyled = styled.div`
  .card {
    width: 300px;
    height: 113px;
    border-radius: 8px;
    border: 0.5px solid ${(props) => (props.color ? props.color : "#c5c6c8")};
    overflow: visible;
    box-shadow: 4px 4px 6px #00000090;
    background-color: white;
    transition: transform 0.6s ease, box-shadow 0.6s ease,
    background-color 0.3s ease;
    position: relative;
  }
  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => (props.color ? props.color : "#c5c6c8")};
    .icon {
      background-color: #fff;
      color: ${(props) => (props.color ? props.color : "#c5c6c8")};
      margin-top: 71px;
      margin-left: 135px;
    }
    .content {
      label {
        color: #fff;
      }
    }
  }
  .icon {
    background-color: ${(props) => (props.color ? props.color : "#c5c6c8")};
    width: 50px;
    height: 50px;
    border-radius: 40px;
    display: flex;
    color: #fff;
    font-size: 20pt;
    position: absolute; /* Posiciona el icono absolutamente dentro de la tarjeta */
    top: -10px; /* Ajusta esta propiedad para mover el icono verticalmente */
    left: -10px; /* Ajusta esta propiedad para mover el icono horizontalmente */
    justify-content: center;
    align-items: center;
    z-index: 1; /* Asegura que el icono esté sobre la tarjeta */
  transition: 0.5s ease;
  }

  .wave {
    width: 100%;
    height: 60px;
  }

  .green {
    color: ${(props) => (props.color ? props.color : "#c5c6c8")};
  }

  .content {
    padding-top: 20px;
    padding-left: 10px;
    text-align: center;
    background-color: white;
    background-color: transparent;
    height: 58px;
    label {
      font-weight: 700;
      color: #5e5f61;
    }
    :hover {
    }
  }

  .content p {
    margin: 0;
    font-size: 26px;
    color: #000;
    font-weight: 600;
    text-align: center;
  }
`;
