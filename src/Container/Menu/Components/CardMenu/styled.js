import styled from "styled-components";

export const CardMenuStyled = styled.div`
  height: 100%;

  .card {
    width: 100%;
    height: 100%;
    min-height: 120px;
    border-radius: var(--radius-xl);
    background-color: color-mix(in srgb, var(--card-bg) 60%, transparent);
    backdrop-filter: blur(12px);
    border: 1px solid var(--surface-border);
    border-top: 1px solid color-mix(in srgb, var(--text-color) 10%, var(--surface-border));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      background-color: color-mix(in srgb, var(--card-bg) 85%, transparent);
      border-top: 1px solid color-mix(in srgb, var(--text-color) 25%, var(--surface-border));
      box-shadow: var(--app-shadow-lg);
      transform: translateY(-2px);
    }
  }

  .left-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    position: relative;
    z-index: 10;
  }

  .icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    min-width: 48px;
    border-radius: var(--radius-lg);
    background-color: var(--surface-section);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--surface-border);
    box-shadow: var(--app-shadow-sm);
    position: relative;
    z-index: 10;
    font-size: 28px;
    /* Apply dynamic glow based on route color */
    color: ${(props) => props.color || props.theme.colors.secondary};
    text-shadow: 0 0 16px ${(props) => props.color || props.theme.colors.secondary}99;
  }

  .text-content {
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  }

  .title {
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: var(--text-color);
    margin: 0 0 0.25rem 0;
    letter-spacing: -0.01em;
  }

  .description {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-color-secondary);
    margin: 0;
  }

  .chevron-shift {
    color: var(--text-color-secondary);
    font-size: 20px;
    transition: transform 0.3s ease, color 0.3s ease;
    z-index: 10;
  }

  .card:hover .chevron-shift {
    transform: translateX(4px);
    color: var(--text-color);
  }

  .glow-background {
    position: absolute;
    top: 0;
    right: 0;
    width: 128px;
    height: 128px;
    background-color: ${(props) => props.color || props.theme.colors.secondary};
    opacity: 0;
    filter: blur(50px);
    transition: opacity 0.5s ease;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  .card:hover .glow-background {
    opacity: 0.15;
  }

  @media (min-width: 768px) {
    .title {
      font-size: 28px;
      line-height: 36px;
    }
  }
`;
