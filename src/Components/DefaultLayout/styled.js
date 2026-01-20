import styled from "styled-components";

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
  display: grid;
  grid-template-rows: auto 1fr auto;
  text-align: center;
  overflow: hidden;
  background-color: var(--color-light);

  /* Premium top navigation bar */
  .top-bar {
    ${({ authenticate, showSideBar, showMenuOnMobile }) =>
      authenticate &&
      `position: fixed; 
       top: 0;
       right: 0;
       left: ${showSideBar ? "200px" : showMenuOnMobile ? "70px" : "0"};
       z-index: 1000;`}

    transition: left var(--transition-base), background var(--transition-base);
    background: var(--primary-gradient);
    border: none;
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(10px);

    .p-menubar {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0.75rem 1.5rem;
    }

    /* App icon/logo section */
    .app-icon {
      margin-right: 1rem;
      padding: 0.5rem 0.75rem;
      background-color: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-base);
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.25);
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.98);
      }

      svg {
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }
    }

    /* Premium button styling */
    button {
      margin-right: 1.5rem;
      font-weight: 600;
      border-radius: var(--radius-lg);
      padding: 0.75rem 2rem;
      border: 2px solid white;
      background: white;
      color: var(--color-primary);
      transition: all var(--transition-base);
      box-shadow: var(--shadow-md);

      &:hover {
        background: transparent;
        color: white;
        border-color: white;
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      &:active {
        transform: translateY(0);
      }

      &.p-button-danger {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.3);
        color: #ef4444;

        &:hover {
          background: #ef4444;
          border-color: #ef4444;
          color: white;
        }
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
        padding: 0.625rem 1rem;
      }

      .app-icon {
        padding: 0.4rem 0.6rem;
        font-size: 1rem;
        margin-right: 0.75rem;
      }

      button {
        margin-right: 1rem;
        padding: 0.625rem 1.25rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .app-icon {
        padding: 0.35rem 0.5rem;
        font-size: 0.9rem;

        svg {
          width: 32px;
          height: 32px;
        }
      }

      button {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
        margin-right: 0.75rem;
      }
    }
  }

  /* Premium footer */
  .footer {
    justify-content: center;
    background: var(--primary-gradient);
    width: 100%;
    color: #fff;
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
    color: #fff;
    font-weight: 500;
    transition: all var(--transition-base);
  }

  .p-menubar
    .p-menubar-root-list
    > .p-menuitem
    > .p-menuitem-link
    .p-menuitem-icon {
    color: #fff;
    transition: all var(--transition-base);
  }

  .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-md);
  }

  .p-menubar.p-menubar-mobile-active .p-menubar-root-list {
    background: var(--primary-gradient);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-lg);
    margin-top: 0.5rem;
    box-shadow: var(--shadow-xl);
  }
`;

export const AppSidebarStyled = styled.div`
  .side {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    transition: left var(--transition-base);
    width: 200px;
    background: var(--primary-gradient);
    height: 100%;
    box-shadow: var(--shadow-xl);
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;

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

    /* Responsive behavior for mobile */
    @media only screen and (max-width: 600px) {
      position: fixed;
      z-index: 9998;
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
      color: #ffffff;
      transform: translateX(4px);

      &::before {
        opacity: 1;
      }
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      font-weight: 600;
      border-left: 4px solid #ffffff;
      box-shadow: var(--shadow-md);
    }
  }

  /* Submenu container styling */
  .side .submenu {
    text-align: left;
    margin-top: 0.25rem;

    .ps-submenu-content {
      background: rgba(255, 255, 255, 0.08);
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
    margin: 0.125rem 0.5rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    position: relative;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      transform: translateX(4px);
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
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

  /* Responsive adjustments for tablets */
  @media only screen and (max-width: 1024px) and (min-width: 601px) {
    .side {
      width: 180px;
    }

    .side .menuItem,
    .side .submenuItem {
      font-size: 0.9rem;
      padding: 0.625rem 0.875rem;
    }
  }

  /* Mobile-specific adjustments */
  @media only screen and (max-width: 600px) {
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
