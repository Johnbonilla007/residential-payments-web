// styles.js
import styled from "styled-components";

export const SignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  font-family: Arial, sans-serif;

  h3 {
    margin-bottom: 10px;
    color: #333;
  }
`;

export const SignatureCanvasWrapper = styled.div`
  border: 2px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  height: 80px;
  width: 500px;
  position: relative;

  .input-text {
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  button {
    padding: 8px 15px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;

    &.save {
      background-color: #4caf50;
      color: #fff;
    }

    &.clear {
      background-color: #f44336;
      color: #fff;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const SavedSignature = styled.div`
  margin-top: 20px;
  text-align: center;

  img {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 500px;
    height: auto;
  }

  h4 {
    margin-bottom: 10px;
    color: #333;
  }
`;
