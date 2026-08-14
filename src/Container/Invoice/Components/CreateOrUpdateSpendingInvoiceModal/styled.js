import styled from "styled-components";
import { media } from "../../../../Styles/themes";

/** Column template shared by the detail header and its rows so they stay aligned. */
const detailColumns = "3rem minmax(0, 1fr) 9rem 3rem";

export const CreateOrUpdateSpendingInvoiceModalStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-color);
  }

  /**
   * Auto-fit columns collapse to a single column on narrow screens without a
   * media query, and every control gets the same track width — which is what
   * keeps input and dropdown heights visually aligned.
   */
  .header-fields,
  .detail-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem 1.25rem;
    background-color: var(--surface-section);
    border: 1px solid var(--surface-border);
    box-shadow: var(--app-shadow-sm);
    padding: 1.75rem 1rem 1rem 1rem;
    border-radius: var(--radius-md);
    transition:
      background-color var(--transition-base),
      border-color var(--transition-base);
  }

  /* Control sizing and label layout come from FormField. */
  .p-inputtextarea {
    min-height: 4.5rem;
    resize: vertical;
  }

  .detail-actions {
    display: flex;
  }

  .header-detail {
    margin-top: 0.5rem;
    background-color: var(--app-nav-bg);
    color: var(--app-nav-text);
    display: grid;
    grid-template-columns: ${detailColumns};
    width: 100%;
    padding: 0.5rem;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    font-weight: 600;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .detail-list {
    max-height: 180px;
    overflow: auto;
    border: 1px solid var(--surface-border);
    border-top: none;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    scrollbar-width: thin;
    scrollbar-color: var(--app-primary) var(--surface-card);
  }

  .detail-list:empty::after {
    content: "Sin detalle agregado";
    display: block;
    padding: 1.25rem;
    text-align: center;
    color: var(--text-color-secondary);
    font-size: 0.9rem;
  }

  .detail-item {
    display: grid;
    grid-template-columns: ${detailColumns};
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid var(--surface-border);
    transition: background-color var(--transition-fast);

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--surface-hover);
    }

    div {
      text-align: center;
      overflow-wrap: anywhere;
    }
  }

  .footer-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }

  ${media.md} {
    .header-fields,
    .detail-fields {
      gap: 1.5rem 1rem;
      padding: 1.5rem 0.75rem 0.75rem 0.75rem;
    }

    /* Amount and row-number columns shrink before the description does. */
    .header-detail,
    .detail-item {
      grid-template-columns: 2rem minmax(0, 1fr) 6.5rem 2.5rem;
      font-size: 0.9rem;
    }

    .footer-buttons {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
`;
