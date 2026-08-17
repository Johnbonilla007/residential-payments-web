import styled from "styled-components";

export const CardMenuStyled = styled.div`
  height: 100%;

  .card {
    width: 100%;
    height: 100%;
    min-height: 120px;
    border-radius: 24px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
      transform: translateY(-4px);
      border-color: ${(props) => props.color || props.theme.colors.secondary}55;
    }
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
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-color);
    color: var(--text-color-secondary);
    font-size: 12px;
    transition: all 0.3s ease;
    z-index: 10;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .card:hover .chevron-shift {
    background: ${(props) => props.color || props.theme.colors.secondary};
    color: #ffffff;
    transform: translateX(4px);
  }

  .glow-background {
    display: none;
  }
`;
