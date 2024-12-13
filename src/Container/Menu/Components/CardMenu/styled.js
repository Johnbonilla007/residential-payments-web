import styled from "styled-components";

export const CardMenuStyled = styled.div`
  .card {
    width: 300px;
    height: 115px;
    border-radius: 12px;
    border: 1px solid ${(props) => (props.color ? props.color : "#c5c6c8")};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    background-color: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Slightly deeper shadow */
  }

  .icon {
    background-color: ${(props) => (props.color ? props.color : "#c5c6c8")};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20pt;
    margin-right: 15px; /* Space between icon and label */
  }

  .content-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    label {
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }
`;
