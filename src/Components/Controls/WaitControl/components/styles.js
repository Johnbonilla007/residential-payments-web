import styled from "styled-components";

export const StyledWaitControl = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  width: 100vw;
  align-items: center;
  background: rgba(0, 69, 139, 0.5);
  position: absolute;

  z-index: 100000;
  .animation-content {
    .comb__Wrapper .twdJW {
      position: relative;
      width: 100vw;
      height: 100vh;
    }
  }

  .loader {
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    margin: 20px auto; /* Center the spinner */
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .progress-container {
    width: 200px;
    height: 20px;
    border-radius: 10px;
    background-color: #ccc;
    position: relative;
  }

  .progress-bar {
    width: 0%;
    height: 100%;
    border-radius: 10px;
    background-color: #00bfff;
    position: absolute;
    animation: progress-bar-animation 2s ease-in-out infinite;
  }

  @keyframes progress-bar-animation {
    0% {
      width: 0%;
    }
    50% {
      width: 50%;
    }
    100% {
      width: 0%;
    }
  }
`;
