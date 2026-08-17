import styled from "styled-components";

export const SpecialVisitStyled = styled.div`
  /**
   * Auto-fit grid: cards wrap to one column on a phone and share the row on
   * wider screens. This replaces the PrimeFlex classes the markup used to
   * carry, which never applied because PrimeFlex's stylesheet was not imported.
   */
  .container-card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    justify-content: center;
    gap: 35px;
    padding-top: 50px;
    max-height: 70vh;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--app-primary) var(--surface-card);
  }

  .container-card > .visit-card {
    min-width: 0;
  }
`;
