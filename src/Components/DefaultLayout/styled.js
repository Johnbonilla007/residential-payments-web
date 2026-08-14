import styled from "styled-components";
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  px,
} from "../../Styles/layout";
import { media } from "../../Styles/themes";

export const DefaultLayoutStyled = styled.div`
  margin: 0;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--color-light);

  /* Premium top navigation bar */
  .top-bar {
    ${({ authenticate, showSideBar, showMenuOnMobile }) =>
      authenticate &&
      `position: fixed; 
       top: 0;
       right: 0;
       left: ${
         showSideBar
           ? px(SIDEBAR_WIDTH)
           : showMenuOnMobile
           ? px(SIDEBAR_COLLAPSED_WIDTH)
           : "0"
       };
       z-index: 1000;`}

    transition: left var(--transition-base), background var(--transition-base);
    background: var(--primary-gradient);
    border: none;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);

    .p-menubar {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0.875rem 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    /* Header brand container - logo + title */
    .header-brand {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      transition: all 0.3s ease;
      padding: 0.5rem;
      border-radius: 12px;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    }

    /* Posicionar el botón de cerrar sesión a la derecha */
    .p-menubar-start {
      flex: 0 0 auto;
    }

    .p-menubar-end {
      margin-left: auto !important;
      flex: 0 0 auto;
    }

    /* App icon/logo section - mejorado */
    .app-icon {
      padding: 0.75rem;
      background-color: transparent; /* Fondo transparente para integración total */
      backdrop-filter: blur(10px);
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.1); /* Borde muy sutil */

      .logo-img {
        height: 50px;
        width: auto;
        object-fit: contain;
        display: block;
        transition: all 0.3s ease;
        /* Forzar logo a blanco puro para contraste con el header oscuro */
        filter: brightness(0) invert(1);
      }

      /* No necesitamos media query specific para dark mode si el header siempre es oscuro */

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
        border-color: rgba(255, 255, 255, 0.3);

        .logo-img {
          transform: scale(1.05);
        }
      }

      &:active {
        transform: scale(0.98);
      }

      svg {
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
      }
    }

    /* System title styling */
    .system-title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.3;

      .title-main {
        color: white;
        font-size: 1.1rem;
        font-weight: 700;
        letter-spacing: 0.3px;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .title-sub {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        opacity: 0.95;
      }
    }

    /* Logout button styling */
    .logout-btn {
      margin-right: 1.5rem;
      font-weight: 600;
      border-radius: 10px;
      padding: 0.75rem 1.5rem;
      background: rgba(239, 68, 68, 0.1);
      border: 2px solid rgba(239, 68, 68, 0.4);
      color: var(--app-error);
      transition:
        background-color var(--transition-base),
        border-color var(--transition-base),
        color var(--transition-base),
        box-shadow var(--transition-base),
        transform var(--transition-base);
      box-shadow: var(--app-shadow-sm);

      &:hover {
        background: var(--app-error);
        border-color: var(--app-error);
        color: var(--app-nav-text);
        transform: translateY(-2px);
        box-shadow: var(--app-shadow-md);
      }

      &:active {
        transform: translateY(0);
      }

      .pi {
        font-size: 1.1rem;
      }
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      position: fixed;
      left: 0 !important;
      top: 0;
      width: 100%;
      z-index: 9999;

      .p-menubar {
        padding: 0.75rem 1.25rem;
        gap: 1rem;
      }

      .header-brand {
        gap: 0.875rem;
        padding: 0.35rem;
      }

      .app-icon {
        padding: 0.5rem 0.75rem;
        font-size: 1rem;

        .logo-img {
          height: 42px;
        }

        svg {
          width: 36px;
          height: 36px;
        }
      }

      .system-title {
        .title-main {
          font-size: 1rem;
        }

        .title-sub {
          font-size: 0.75rem;
        }
      }

      .logout-btn {
        margin-right: 1rem;
        padding: 0.625rem 1.25rem;
        font-size: 0.9rem;

        .pi {
          font-size: 1rem;
        }
      }
    }

    @media (max-width: 480px) {
      .p-menubar {
        padding: 0.625rem 1rem;
        gap: 0.75rem;
      }

      .header-brand {
        gap: 0.625rem;
        padding: 0.25rem;
      }

      .app-icon {
        padding: 0.45rem 0.65rem;
        font-size: 0.95rem;

        .logo-img {
          height: 38px;
        }

        svg {
          width: 32px;
          height: 32px;
        }
      }

      .system-title {
        .title-main {
          font-size: 0.9rem;
        }

        .title-sub {
          font-size: 0.7rem;
        }
      }
    }
  }

  /* Premium footer */
  .footer {
    justify-content: center;
    background: var(--primary-gradient);
    width: 100%;
    color: var(--app-nav-text);
    font-weight: 500;
    padding: 1rem;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    font-size: 0.95rem;

    @media (max-width: 768px) {
      padding: 0.875rem;
      font-size: 0.875rem;
    }

    @media (max-width: 480px) {
      padding: 0.75rem;
      font-size: 0.8rem;
    }
  }

  /* Menu item colors - white text for visibility on gradient */
  .p-menubar
    .p-menubar-root-list
    > .p-menuitem
    > .p-menuitem-link
    .p-menuitem-text {
    color: var(--app-nav-text);
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;
  }

  .p-menubar
    .p-menubar-root-list
    > .p-menuitem
    > .p-menuitem-link
    .p-menuitem-icon {
    color: var(--app-nav-text);
    transition: all 0.3s ease;
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }

  .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .p-menubar.p-menubar-mobile-active .p-menubar-root-list {
    background: var(--primary-gradient);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    margin-top: 0.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
  }

  /* Responsive para menu items */
  @media (max-width: 768px) {
    .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
      padding: 0.625rem 1.25rem;

      .p-menuitem-text {
        font-size: 0.95rem;
      }

      .p-menuitem-icon {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
      padding: 0.5rem 1rem;

      .p-menuitem-text {
        font-size: 0.9rem;
      }

      .p-menuitem-icon {
        font-size: 0.95rem;
        margin-right: 0.4rem;
      }
    }
  }
`;

export const AppSidebarStyled = styled.div`
  /**
   * Dismiss layer for the mobile drawer.
   *
   * It must outrank the top bar (9999) because the drawer does: an open modal
   * drawer covers the bar rather than starting below it, which avoids pinning
   * the drawer's offset to the bar's measured height — that number changes with
   * the root font size and would silently hide the first menu item again.
   */
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: var(--maskbg);
  }

  .side {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    /* Width is set inline by react-pro-sidebar and animates on collapse. */
    transition:
      left var(--transition-base),
      background var(--transition-base);
    background: var(--app-nav-gradient);
    height: 100%;
    box-shadow: var(--app-shadow-lg);
    z-index: 1001; /* Mayor que top-bar (1000) */
    overflow-y: auto;
    overflow-x: hidden;

    /* Labels wrap instead of truncating while the sidebar is expanded. */
    .ps-menu-label {
      white-space: normal;
      line-height: 1.3;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .ps-menu-button {
      height: auto !important;
      min-height: 45px;
    }

    /* Icons align to the top only when the label wraps to several lines. */
    .ps-menu-icon {
      align-self: flex-start;
      margin-top: 12px;
    }
  }

  /**
   * Collapsed rail.
   *
   * react-pro-sidebar hides labels on collapse by clipping them, which the
   * rules above used to defeat with an overflow: visible override — so labels
   * kept rendering into a 70px rail and were cut mid-word. At this width the
   * label has no room at all, so remove it from layout and centre the icon;
   * the item's title attribute still carries the name as a tooltip.
   */
  .side--collapsed {
    .ps-menu-label,
    .ps-submenu-expand-icon {
      display: none;
    }

    .ps-menu-button {
      justify-content: center;
      padding-left: 0;
      padding-right: 0;
    }

    .ps-menu-icon {
      align-self: center;
      margin-top: 0;
      margin-right: 0;
    }
  }

  .side {
    /* Custom scrollbar for sidebar */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: var(--radius-full);

      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }

    /**
     * Overlay drawer on mobile.
     *
     * This breakpoint must match MOBILE_BREAKPOINT, which the resize handler
     * uses to flip showMenuOnMobile. It used to be 600px against the handler's
     * 768px, so between those widths the content was offset for a sidebar that
     * was already behaving as a full-width rail — it overlapped instead.
     */
    ${media.md} {
      position: fixed;
      /* Above the top bar (9999) and the backdrop (10000). */
      z-index: 10001;
      width: 80%;
      max-width: 300px;
      height: 100%;
      left: ${(props) => (props.mobileSidebarVisible ? "0" : "-100%")};
      top: 0;
      transition: left var(--transition-base);
      box-shadow: ${(props) =>
        props.mobileSidebarVisible ? "4px 0 20px rgba(0, 0, 0, 0.3)" : "none"};
    }
  }

  /* Border styling for sidebar sections */
  .css-156uyio {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: var(--shadow-lg);
  }

  /* Main menu item styles with premium effects */
  .side .menuItem {
    color: rgba(255, 255, 255, 0.9);
    transition: all var(--transition-base);
    padding: 0.75rem 1rem;
    margin: 0.25rem 0.5rem;
    border-radius: var(--radius-lg);
    font-weight: 500;
    position: relative;
    overflow: hidden;

    /* Subtle background on hover */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.1);
      opacity: 0;
      transition: opacity var(--transition-base);
      border-radius: var(--radius-lg);
    }

    &:hover {
      color: var(--app-nav-text);
      transform: translateX(4px);

      &::before {
        opacity: 1;
      }
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      color: var(--app-nav-text);
      font-weight: 600;
      border-left: 4px solid var(--surface-border);
      box-shadow: var(--shadow-md);
    }
  }

  /* Submenu container styling */
  .side .submenu {
    text-align: left;
    margin-top: 0.25rem;

    .ps-submenu-content {
      background: rgba(
        0,
        0,
        0,
        0.2
      ) !important; /* Fondo más oscuro para jerarquía */
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      border-radius: var(--radius-lg);
      margin: 0.25rem 0.5rem;
      padding: 0.25rem 0;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

      span {
        color: rgba(255, 255, 255, 0.85);
        font-size: 0.9rem;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.12);
      }
    }
  }

  /* Submenu item styles */
  .side .submenuItem {
    color: rgba(255, 255, 255, 0.8);
    transition: all var(--transition-base);
    padding: 0.625rem 1rem;
    margin: 0.125rem 0.5rem 0.125rem 1rem; /* Más indentación */
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: var(--app-nav-text);
      transform: translateX(4px);
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      color: var(--app-nav-text);
      font-weight: 600;
      border-left: 3px solid rgba(255, 255, 255, 0.8);
      box-shadow: var(--shadow-sm);
    }
  }

  /* Toggle menu button styling */
  .show-and-unshown-menu-item {
    color: white;
    transition: all var(--transition-base);
    padding: 0.5rem;
    border-radius: var(--radius-lg);

    svg {
      font-size: 1.25rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  /**
   * Tablet adjustments.
   *
   * Type and padding only. This block used to override the sidebar width to
   * 180px, a third value competing with SIDEBAR_WIDTH and the content offset —
   * any width set here desynchronises the layout.
   */
  @media only screen and (max-width: 1024px) and (min-width: 769px) {
    .side .menuItem,
    .side .submenuItem {
      font-size: 0.9rem;
      padding: 0.625rem 0.875rem;
    }
  }

  /* Mobile-specific adjustments */
  ${media.md} {
    .side .menuItem {
      padding: 0.875rem 1rem;
      margin: 0.25rem 0.75rem;
      font-size: 1rem;
    }

    .side .submenuItem {
      padding: 0.75rem 1rem;
      margin: 0.25rem 0.75rem;
    }

    .show-and-unshown-menu-item svg {
      font-size: 1.5rem;
    }
  }
`;
