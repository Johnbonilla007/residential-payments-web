import styled from "styled-components";

export const HomeStyled = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-container {
    max-width: 900px;
    width: 100%;
    text-align: center;
    background: white;
    border-radius: 24px;
    padding: 3rem 2.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 33, 71, 0.08);
    animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  h1 {
    font-size: 2.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #002147 0%, #004080 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.25rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.2rem;
    color: #546e7a;
    line-height: 1.8;
    max-width: 650px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 2.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);

    .feature-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      padding: 1.75rem;
      border-radius: 16px;
      border: 1px solid rgba(0, 33, 71, 0.06);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 30px rgba(0, 33, 71, 0.12);
        border-color: #002147;
      }

      .feature-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #002147 0%, #004080 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        color: white;
        font-size: 1.5rem;
      }

      h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.9rem;
        color: #666;
        line-height: 1.6;
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    padding: 2rem;

    h1 {
      font-size: 2.35rem;
    }

    p {
      font-size: 1.1rem;
    }

    .hero-container {
      padding: 2.5rem 2rem;
    }

    .features-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.25rem;
      margin-top: 2rem;
      padding-top: 2rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }

    .hero-container {
      padding: 2rem 1.5rem;
      border-radius: 20px;
    }

    .features-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;

      .feature-card {
        padding: 1.5rem;

        .feature-icon {
          width: 45px;
          height: 45px;
          font-size: 1.3rem;
        }

        h3 {
          font-size: 1rem;
        }

        p {
          font-size: 0.875rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    min-height: auto;

    h1 {
      font-size: 1.75rem;
    }

    p {
      font-size: 0.95rem;
    }

    .hero-container {
      padding: 1.75rem 1.25rem;
      border-radius: 16px;
    }

    .features-grid {
      gap: 0.875rem;
      margin-top: 1.25rem;
      padding-top: 1.25rem;

      .feature-card {
        padding: 1.25rem 1rem;

        .feature-icon {
          width: 40px;
          height: 40px;
          font-size: 1.2rem;
        }
      }
    }
  }

  @media (max-width: 360px) {
    padding: 0.875rem;

    h1 {
      font-size: 1.5rem;
    }

    .hero-container {
      padding: 1.5rem 1rem;
    }
  }
`;
