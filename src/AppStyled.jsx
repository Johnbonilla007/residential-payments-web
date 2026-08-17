import { createGlobalStyle } from "styled-components";
import { media } from "./Styles/themes";

/**
 * Global styles.
 *
 * Two rules govern this file:
 *
 *   1. No colors are declared here. Colors come from the token custom
 *      properties written by `ThemeContext`; this file only reads them.
 *   2. No bare type selectors for form controls (`input`, `button`, `select`,
 *      `textarea`). Those selectors also match every PrimeReact control and,
 *      loading after the PrimeReact theme, silently override its padding,
 *      border and radius — which desynchronises control heights across forms.
 *      Style application controls through their own class instead.
 */
const GlobalStyles = createGlobalStyle`
  :root {
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;

    /* Border radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
    --radius-full: 9999px;

    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--surface-ground);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Scoped reset: only the elements whose default margins we actually fight. */
  h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd {
    margin: 0;
  }

  ul, ol {
    margin: 0;
  }

  img, picture, svg, video, canvas {
    max-width: 100%;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    color: var(--text-color);
    margin-bottom: var(--spacing-md);
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  p {
    font-size: 1rem;
    line-height: 1.75;
    margin-bottom: var(--spacing-md);
  }

  /**
   * Theme switch cross-fade.
   *
   * ThemeContext adds the theme-transition class to the root element for the
   * duration of the switch only. Keeping a colour transition on everything
   * permanently would
   * make each hover repaint the subtree, so this is deliberately temporary and
   * limited to the properties a theme change actually alters.
   */
  html.theme-transition,
  html.theme-transition *,
  html.theme-transition *::before,
  html.theme-transition *::after {
    transition:
      background-color var(--transition-base),
      background-image var(--transition-base),
      border-color var(--transition-base),
      color var(--transition-base),
      fill var(--transition-base),
      box-shadow var(--transition-base) !important;
    transition-delay: 0s !important;
  }

  /**
   * Interaction polish for PrimeReact controls.
   *
   * Transitions and shadows only — never padding, border-width or font-size,
   * which would shift layout and desynchronise control heights. Each selector
   * is scoped to a PrimeReact class rather than a bare type selector.
   */
  .p-button,
  .p-inputtext,
  .p-dropdown,
  .p-multiselect,
  .p-calendar .p-inputtext,
  .p-inputnumber .p-inputtext,
  .p-checkbox .p-checkbox-box,
  .p-radiobutton .p-radiobutton-box {
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      color var(--transition-fast);
  }

  /**
   * Control boundaries carry the accessible border token, not the divider one.
   * WCAG 1.4.11 asks for 3:1 against the adjacent surface for any boundary that
   * identifies a control; the softer divider colour does not reach it.
   */
  .p-inputtext,
  .p-dropdown,
  .p-multiselect,
  .p-calendar .p-inputtext,
  .p-inputnumber .p-inputtext,
  .p-checkbox .p-checkbox-box,
  .p-radiobutton .p-radiobutton-box {
    border-color: var(--app-control-border);
  }

  .p-button:not(:disabled):not(.p-disabled):hover {
    box-shadow: var(--app-shadow-md);
  }

  .p-button:not(:disabled):not(.p-disabled):active {
    transform: translateY(1px);
  }

  /* Keyboard focus must stay visible on every control, in both themes. */
  .p-button:focus-visible,
  .p-inputtext:focus-visible,
  .p-dropdown:focus-within,
  .p-multiselect:focus-within {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  /**
   * Floating labels.
   *
   * This is the project's single label pattern. Applying it here makes every
   * existing call site behave the same without editing each one.
   *
   * A floating label sits inside the field until the field has a value, so it
   * reads as a placeholder while empty — that is the intended behaviour, but it
   * only works if the label is a sibling of the control and the control is not
   * also given a placeholder. Both are enforced by the FormField component.
   */
  .p-float-label {
    display: block;
  }

  .p-float-label > label {
    color: var(--text-color-secondary);
    transition:
      top var(--transition-fast),
      font-size var(--transition-fast),
      color var(--transition-fast);
  }

  /* The raised label crosses the field border, so it needs its own ground. */
  .p-float-label input:focus ~ label,
  .p-float-label input.p-filled ~ label,
  .p-float-label textarea:focus ~ label,
  .p-float-label textarea.p-filled ~ label,
  .p-float-label .p-inputwrapper-focus ~ label,
  .p-float-label .p-inputwrapper-filled ~ label {
    background: var(--surface-section);
    padding: 0 0.25rem;
    color: var(--app-primary);
  }

  /* A textarea's label must sit at the top, not vertically centred. */
  .p-float-label textarea ~ label {
    top: 1rem;
    transform: none;
  }

  /* Rows and clickable cards settle instead of snapping. */
  .p-datatable .p-datatable-tbody > tr,
  .p-paginator .p-paginator-page,
  .p-tabview .p-tabview-nav li .p-tabview-nav-link {
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  /**
   * Responsive dialogs, applied once for every call site.
   *
   * Most dialogs in this app set an inline width of 50vw (and some an inline
   * height), which on a phone is an unusable sliver. The PrimeReact breakpoints
   * prop only generates media queries like these, so overriding here fixes
   * every dialog at once instead of editing each call site. The !important is
   * required because the widths are inline styles.
   */
  ${media.lg} {
    .p-dialog {
      width: 75vw !important;
    }
  }

  ${media.md} {
    .p-dialog {
      width: 92vw !important;
      max-width: 92vw !important;
      /* Inline fixed heights would clip the content on short screens. */
      height: auto !important;
      max-height: 90vh;
      margin: 0;
    }

    .p-dialog .p-dialog-content {
      overflow-y: auto;
    }

    /* Controls carrying hardcoded widths must not overflow the dialog. */
    .p-dialog .p-inputtext,
    .p-dialog .p-dropdown,
    .p-dialog .p-calendar,
    .p-dialog .p-inputnumber {
      max-width: 100%;
    }
  }

  /* Overlays enter with a short, non-bouncy motion. */
  .p-dialog,
  .p-sidebar,
  .p-overlaypanel,
  .p-toast .p-toast-message {
    box-shadow: var(--app-shadow-lg);
  }

  .p-dialog-enter-active {
    transition: transform var(--transition-base), opacity var(--transition-base);
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  /* Scrollbars */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--app-primary) var(--surface-ground);
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--surface-ground);
    border-radius: var(--radius-full);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--app-primary);
    border-radius: var(--radius-full);
    transition: background var(--transition-base);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--app-primary-hover);
  }

  /* Animations */
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

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Responsive typography */
  ${media.md} {
    html {
      font-size: 14px;
    }

    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.1rem; }
    h6 { font-size: 1rem; }
  }

  ${media.sm} {
    html {
      font-size: 13px;
    }
  }

  /* Toasts adapted to dark/light themes */
  .p-toast .p-toast-message {
    background: var(--surface-card) !important;
    border: 1px solid var(--surface-border) !important;
    color: var(--text-color) !important;
  }
  .p-toast .p-toast-message .p-toast-message-text {
    color: var(--text-color) !important;
  }
  .p-toast .p-toast-message .p-toast-icon-close {
    color: var(--text-color) !important;
  }
  .p-toast .p-toast-message .p-toast-icon-close:hover {
    background: var(--surface-hover) !important;
    color: var(--text-color) !important;
  }

  /* Specific border colors for each severity */
  .p-toast .p-toast-message.p-toast-message-warn {
    border-left: 6px solid var(--warning-color, #b26a00) !important;
  }
  .p-toast .p-toast-message.p-toast-message-warn .p-toast-message-icon {
    color: var(--warning-color, #b26a00) !important;
  }
  .p-toast .p-toast-message.p-toast-message-error {
    border-left: 6px solid var(--error-color, #ef5350) !important;
  }
  .p-toast .p-toast-message.p-toast-message-error .p-toast-message-icon {
    color: var(--error-color, #ef5350) !important;
  }
  .p-toast .p-toast-message.p-toast-message-success {
    border-left: 6px solid var(--success-color, #4caf50) !important;
  }
  .p-toast .p-toast-message.p-toast-message-success .p-toast-message-icon {
    color: var(--success-color, #4caf50) !important;
  }
  .p-toast .p-toast-message.p-toast-message-info {
    border-left: 6px solid var(--info-color, #0277bd) !important;
  }
  .p-toast .p-toast-message.p-toast-message-info .p-toast-message-icon {
    color: var(--info-color, #0277bd) !important;
  }

  /* Global override for react-pro-sidebar popout submenus */
  .ps-submenu-content {
    background: var(--app-nav-gradient) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 8px;
    box-shadow: var(--shadow-lg) !important;
    padding: 0.5rem !important;
  }

  .ps-submenu-content .ps-menu-button {
    color: var(--app-nav-text) !important;
  }

  .ps-submenu-content .ps-menu-button:hover {
    background: rgba(255, 255, 255, 0.14) !important;
  }

  .ps-submenu-content .ps-menu-label {
    display: block !important;
    color: var(--app-nav-text) !important;
  }
`;

export default GlobalStyles;
