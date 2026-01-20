import styled from "styled-components";

export const LoginStyled = styled.div`
  background: linear-gradient(135deg, #001f3f 0%, #003366 50%, #004080 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  /* Animated background */
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Floating particles effect */
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
      radial-gradient(
        circle at 20% 50%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 20%,
        rgba(255, 255, 255, 0.08) 0%,
        transparent 50%
      );
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(30px, -30px);
    }
    66% {
      transform: translate(-20px, 20px);
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
    padding: var(--spacing-lg);
    position: relative;
    z-index: 1;
  }

  .login-box {
    /* Glassmorphism effect */
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow:
      0 8px 32px 0 rgba(31, 38, 135, 0.37),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.3);

    padding: 3rem 2.5rem;
    border-radius: var(--radius-2xl);
    max-width: 450px;
    width: 100%;

    /* Entry animation */
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  }

  .logo {
    text-align: center;
    margin-bottom: 2.5rem;

    svg {
      color: white;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
      animation: pulse 3s ease-in-out infinite;
    }

    h2 {
      color: white;
      font-size: 1.75rem;
      font-weight: 700;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      margin: 0;
    }
  }

  .input {
    margin-bottom: 1.5rem;
    width: 100%;
    position: relative;

    /* PrimeReact input styling override */
    .p-inputtext,
    .p-password input {
      width: 100%;
      padding: 0.875rem 1rem;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: var(--radius-lg);
      color: var(--color-dark);
      transition: all var(--transition-base);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      &::placeholder {
        color: var(--color-text-light);
      }

      &:hover {
        border-color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 1);
      }

      &:focus {
        border-color: white;
        background: white;
        box-shadow:
          0 0 0 4px rgba(255, 255, 255, 0.2),
          0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }
    }

    .p-password {
      width: 100%;
      display: block;
    }
  }

  /* Premium button styling */
  button {
    width: 100%;
    padding: 1rem;
    font-size: 1.05rem;
    font-weight: 600;
    background: white;
    color: var(--color-primary);
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    margin-top: 0.5rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      background: linear-gradient(135deg, #003366 0%, #001f3f 100%);
      color: white;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: var(--spacing-md);
    }

    .login-box {
      padding: 2.5rem 2rem;
      max-width: 100%;
    }

    .logo {
      margin-bottom: 2rem;

      svg {
        width: 70px;
        height: 70px;
      }

      h2 {
        font-size: 1.5rem;
      }
    }

    .input {
      margin-bottom: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: var(--spacing-sm);
    }

    .login-box {
      padding: 2rem 1.5rem;
      border-radius: var(--radius-xl);
    }

    .logo {
      svg {
        width: 60px;
        height: 60px;
      }

      h2 {
        font-size: 1.35rem;
      }

      p {
        font-size: 0.875rem;
      }
    }

    .input {
      .p-inputtext,
      .p-password input {
        padding: 0.75rem 0.875rem;
        font-size: 0.95rem;
      }
    }

    button {
      padding: 0.875rem;
      font-size: 1rem;
    }
  }

  /* Extra small devices */
  @media (max-width: 360px) {
    .login-box {
      padding: 1.5rem 1.25rem;
    }
  }
`;
