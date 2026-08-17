import styled from "styled-components";

export const StyledWaitControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: var(--maskbg);
  z-index: 100000;

  .animation-content {
    .comb__Wrapper .twdJW {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }

  .loader {
    border: 10px solid var(--surface-border);
    border-top: 10px solid var(--app-primary);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    margin: 20px auto;
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
    border-radius: var(--radius-lg);
    background-color: var(--surface-border);
    position: relative;
    overflow: hidden;
  }

  .progress-bar {
    width: 0%;
    height: 100%;
    border-radius: var(--radius-lg);
    background-color: var(--app-primary);
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

  @media (prefers-reduced-motion: reduce) {
    .loader {
      animation: none;
    }

    .progress-bar {
      animation: none;
      width: 50%;
    }
  }
`;
