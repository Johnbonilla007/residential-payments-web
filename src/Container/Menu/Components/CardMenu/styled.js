import styled from "styled-components";

export const CardMenuStyled = styled.div`
  .card {
    width: 100%;
    min-height: 140px;
    border-radius: var(--radius-xl);
    background: white;
    border: 1px solid rgba(102, 126, 234, 0.15);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
    position: relative;
    display: flex;
    align-items: center;
    padding: 1.75rem 1.5rem;
    cursor: pointer;
    overflow: hidden;

    /* Gradient overlay on hover */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${(props) => {
        const color = props.color || "#667eea";
        return `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`;
      }};
      opacity: 0;
      transition: opacity var(--transition-base);
      z-index: 0;
    }

    &:hover::before {
      opacity: 1;
    }

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: var(--shadow-2xl);
      border-color: ${(props) => props.color || "#667eea"};
    }

    &:active {
      transform: translateY(-4px) scale(1.01);
    }
  }

  .icon {
    background: ${(props) => {
      const color = props.color || "#667eea";
      return `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
    }};
    width: 70px;
    height: 70px;
    min-width: 70px;
    border-radius: var(--radius-xl);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 2rem;
    margin-right: 1.25rem;
    box-shadow: var(--shadow-lg);
    position: relative;
    z-index: 1;
    transition: all var(--transition-base);

    /* Glow effect */
    &::after {
      content: "";
      position: absolute;
      inset: -2px;
      background: ${(props) => props.color || "#667eea"};
      border-radius: var(--radius-xl);
      opacity: 0;
      filter: blur(10px);
      transition: opacity var(--transition-base);
      z-index: -1;
    }

    .card:hover & {
      transform: rotate(5deg) scale(1.1);
      box-shadow: var(--shadow-xl);

      &::after {
        opacity: 0.4;
      }
    }
  }

  .content-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    flex: 1;
    position: relative;
    z-index: 1;

    label {
      font-weight: 600;
      color: var(--color-dark);
      margin: 0;
      line-height: 1.4;
      cursor: pointer;
      transition: color var(--transition-base);
    }

    .card:hover & label {
      color: ${(props) => props.color || "var(--color-primary)"};
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .card {
      min-height: 120px;
      padding: 1.5rem 1.25rem;
    }

    .icon {
      width: 60px;
      height: 60px;
      min-width: 60px;
      font-size: 1.75rem;
      margin-right: 1rem;
    }

    .content-card label {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    .card {
      min-height: 100px;
      padding: 1.25rem 1rem;

      &:hover {
        transform: translateY(-4px) scale(1.01);
      }
    }

    .icon {
      width: 50px;
      height: 50px;
      min-width: 50px;
      font-size: 1.5rem;
      margin-right: 0.875rem;
      border-radius: var(--radius-lg);
    }

    .content-card label {
      font-size: 0.9rem;
    }
  }
`;
