import styled from "styled-components";

export const CardMenuStyled = styled.div`
  height: 100%;

  .card {
    width: 100%;
    height: 100%;
    min-height: 112px;
    border-radius: 18px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.9rem;
    padding: 1.35rem 1.35rem 1.2rem;
    cursor: pointer;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: ${(props) => props.color || props.theme.colors.secondary};
      opacity: 0.85;
      transition: width 0.25s ease, opacity 0.25s ease;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    @media (hover: hover) {
      &:hover {
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
        transform: translateY(-3px);
        border-color: ${(props) => props.color || props.theme.colors.secondary}66;

        &::before {
          width: 6px;
          opacity: 1;
        }
      }
    }

    @media (max-width: 767px) {
      min-height: 68px;
      padding: 0.95rem 1rem 0.95rem 1.1rem;
      border-radius: 14px;
      gap: 0.65rem;
    }
  }

  .card-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .left-content {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    position: relative;
    z-index: 10;
    min-width: 0;
    flex: 1;
  }

  .icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 14px;
    background-color: ${(props) => props.color || props.theme.colors.secondary}22;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    position: relative;
    z-index: 10;
    font-size: 20px;
    color: ${(props) => props.color || props.theme.colors.secondary};
  }

  .card:hover .icon {
    background-color: ${(props) => props.color || props.theme.colors.secondary}33;
  }

  .text-content {
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    min-width: 0;
  }

  .title {
    font-family: 'Outfit', sans-serif;
    font-size: 17px;
    font-weight: 700;
    line-height: 22px;
    color: var(--text-color);
    margin: 0 0 0.25rem 0;
    letter-spacing: -0.01em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .description {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: var(--text-color-secondary);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chevron-shift {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    color: var(--text-color-secondary);
    transition: all 0.25s ease;
    z-index: 10;
    flex-shrink: 0;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  .card:hover .chevron-shift {
    background: ${(props) => props.color || props.theme.colors.secondary};
    border-color: ${(props) => props.color || props.theme.colors.secondary};
    color: #ffffff;
    transform: translateX(3px);
  }

  .quick-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    padding-top: 0.65rem;
    border-top: 1px solid var(--border-color);
    position: relative;
    z-index: 10;
  }

  .quick-chip {
    border: 1px solid var(--border-color);
    background: var(--background-color);
    color: var(--text-color-secondary);
    border-radius: 9999px;
    padding: 0.28rem 0.7rem;
    font-size: 0.76rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    line-height: 1.2;

    &:hover {
      border-color: ${(props) => props.color || props.theme.colors.secondary};
      color: var(--text-color);
      background: ${(props) => props.color || props.theme.colors.secondary}18;
    }
  }

  .quick-more {
    font-size: 0.74rem;
    color: var(--text-color-secondary);
    padding: 0 0.25rem;
  }

  .glow-background {
    display: none;
  }
`;
