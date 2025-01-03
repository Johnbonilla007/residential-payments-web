import styled from "styled-components";

export const LoginStyled = styled.div`
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 68px;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 70px);
    width: 100vw;
  }

  .login-box {
    background: rgba(255, 255, 255, 0.8);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }

  .logo {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .input {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 1rem;
  }

  .button:hover {
    background: #0056b3;
  }
`;
