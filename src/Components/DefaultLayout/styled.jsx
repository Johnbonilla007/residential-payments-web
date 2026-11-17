import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import {
  HEADER_HEIGHT,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  px,
} from "../../Styles/layout";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const DefaultLayoutStyled = styled.div`
  margin: 0;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    sans-serif;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--surface-ground);

  .top-bar {
    ${({ $authenticate, $showSideBar, $showMenuOnMobile }) =>
      $authenticate &&
      `position: fixed;
       top: 0;
       right: 0;
       left: ${
         $showSideBar
           ? px(SIDEBAR_WIDTH)
           : $showMenuOnMobile
             ? px(SIDEBAR_COLLAPSED_WIDTH)
             : "0"
       };
       z-index: 900;`}
    height: ${px(HEADER_HEIGHT)};
    padding: 0 1.25rem;
    background: var(--app-nav-gradient);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;

    @media (max-width: 768px) {
      position: fixed;
      left: 0 !important;
      right: 0;
      top: 0;
      height: var(--mobile-header-h, ${px(HEADER_HEIGHT)});
      padding: env(safe-area-inset-top, 0px) 0.75rem 0;
      z-index: 900;
    }
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1 1 0;
    min-width: 0;
  }

  .header-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 2 1 0;
    min-width: 0;
  }

  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    flex: 1 1 0;
    min-width: 0;
  }

  .mobile-back-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.06);
    color: var(--app-nav-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:active {
      transform: scale(0.95);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }

  .user-avatar-badge {
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: 9999px;
    background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  }

  .page-title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--app-nav-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 0.98rem;
    }
  }

  .logout-btn {
    font-weight: 600;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    background: rgba(239, 68, 68, 0.14);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #fca5a5;
    min-height: 40px;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      transform 0.2s ease;

    @media (hover: hover) {
      &:hover {
        background: var(--app-error);
        border-color: var(--app-error);
        color: #ffffff;
        transform: translateY(-1px);
      }
    }

    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      min-width: 40px;
      padding: 0;
      border-radius: 9999px;
    }
  }

  .main-content {
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    ${({ $authenticate, $showSideBar }) =>
      $authenticate &&
      `margin-left: ${
        $showSideBar ? px(SIDEBAR_WIDTH) : px(SIDEBAR_COLLAPSED_WIDTH)
      };`}

    @media (max-width: 768px) {
      margin-left: 0 !important;
    }
  }
`;

export const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) =>
    props.$collapsed ? px(SIDEBAR_COLLAPSED_WIDTH) : px(SIDEBAR_WIDTH)};
  height: 100vh;
  background: var(--app-nav-gradient);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  color: rgba(255, 255, 255, 0.88);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$collapsed ? "center" : "space-between")};
  padding: ${(props) => (props.$collapsed ? "0.5rem 0.25rem" : "0.75rem 1rem")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  min-height: ${px(HEADER_HEIGHT)};
  gap: ${(props) => (props.$collapsed ? "0.25rem" : "0.5rem")};
  overflow: hidden;
`;

export const SidebarLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  overflow: hidden;
  flex: ${(props) => (props.$collapsed ? "0 0 auto" : "1 1 auto")};
  min-width: 0;
`;

export const LogoIcon = styled.div`
  width: ${(props) => (props.$collapsed ? "28px" : "38px")};
  height: ${(props) => (props.$collapsed ? "28px" : "38px")};
  min-width: ${(props) => (props.$collapsed ? "28px" : "38px")};
  border-radius: ${(props) => (props.$collapsed ? "8px" : "10px")};
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.$collapsed ? "3px" : "5px")};
  transition: width 0.2s ease, height 0.2s ease, min-width 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
`;

export const LogoText = styled.span`
  font-size: 0.98rem;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${(props) => (props.$visible ? "block" : "none")};
`;

export const ToggleButton = styled(Button)`
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.85) !important;
  ${(props) =>
    props.$collapsed &&
    `
    width: 26px !important;
    height: 26px !important;
    min-width: 26px !important;
    padding: 0 !important;
  `}
`;

export const SidebarNav = styled.nav`
  flex: 1;
  overflow-y: auto;
  overflow-x: visible;
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

export const NavSection = styled.div`
  margin-bottom: 0.25rem;
  position: relative;
`;

export const NavSectionTitle = styled.button`
  display: ${(props) => (props.$visible ? "flex" : "none")};
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.75rem;
  width: 100%;
  border: none;
  background: transparent;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 10px;
  text-align: left;

  .section-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    flex-shrink: 0;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  .chevron {
    margin-left: auto;
    font-size: 0.75rem;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(${(props) => (props.$expanded ? "90deg" : "0deg")});
  }
`;

export const SubRoutesContainer = styled.div`
  overflow: hidden;
  max-height: ${(props) => (props.$expanded ? "600px" : "0")};
  opacity: ${(props) => (props.$expanded ? 1 : 0)};
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease;
  padding-left: 0.25rem;
`;

export const NavItemWrapper = styled.div`
  position: relative;
`;

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.5rem 0.6rem;
  margin: 0.2rem 0.25rem;
  border-radius: 12px;
  color: ${(props) => (props.$active ? "#ffffff" : "rgba(255, 255, 255, 0.76)")};
  background: ${(props) =>
    props.$active && !props.$collapsed
      ? "rgba(0, 210, 255, 0.14)"
      : "transparent"};
  border: 1px solid
    ${(props) =>
      props.$active && !props.$collapsed
        ? "rgba(0, 210, 255, 0.28)"
        : "transparent"};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  justify-content: ${(props) => (props.$collapsed ? "center" : "flex-start")};

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: ${(props) => (props.$active ? "20px" : "0px")};
    width: 3px;
    background: #38bdf8;
    border-radius: 0 4px 4px 0;
    transition: height 0.2s ease;
    opacity: ${(props) => (props.$collapsed ? 0 : 1)};
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
  }

  @media (hover: hover) {
    &:hover {
      background: ${(props) =>
        props.$active
          ? "rgba(0, 210, 255, 0.2)"
          : "rgba(255, 255, 255, 0.08)"};
      color: #ffffff;
      transform: translateX(2px);
    }
  }
`;

export const NavIconWrapper = styled.div`
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  background: ${(props) =>
    props.$active
      ? props.$color || "#38bdf8"
      : `${props.$color || "#38bdf8"}26`};
  color: ${(props) => (props.$active ? "#ffffff" : props.$color || "#93c5fd")};
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active ? `0 4px 12px ${props.$color || "#38bdf8"}45` : "none"};

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const NavText = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  display: ${(props) => (props.$visible ? "block" : "none")};
`;

export const HoverMenu = styled.div`
  position: fixed;
  left: 78px;
  top: ${(props) => props.$top || 100}px;
  min-width: 220px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45);
  padding: 0.5rem;
  z-index: 9999;
  animation: ${slideIn} 0.15s ease-out;
  color: rgba(255, 255, 255, 0.92);
`;

export const HoverMenuTitle = styled.div`
  padding: 0.45rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${(props) => props.$color || "#93c5fd"};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.35rem;
  text-align: left;
`;

export const HoverMenuItem = styled(Link)`
  display: block;
  padding: 0.55rem 0.75rem;
  color: ${(props) =>
    props.$active ? "#ffffff" : "rgba(255, 255, 255, 0.76)"};
  background: ${(props) =>
    props.$active ? "rgba(59, 130, 246, 0.45)" : "transparent"};
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.85rem;
  text-align: left;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }
`;

export const SidebarFooter = styled.div`
  padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: center;

  .footer-caption {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0.04em;
  }
`;

export const BottomNavContainer = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(68px + env(safe-area-inset-bottom, 0px));
    background: rgba(11, 18, 32, 0.94);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.25);
    z-index: 1000;
    justify-content: space-around;
    align-items: center;
    padding: 0 0.35rem env(safe-area-inset-bottom, 0px);
  }
`;

export const BottomNavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.$active ? "#ffffff" : "rgba(255, 255, 255, 0.52)"};
  padding: 0.35rem 0.5rem;
  border-radius: 14px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 60px;
  min-height: 48px;
  flex: 1 1 0;
  background: ${(props) =>
    props.$active
      ? "radial-gradient(circle at top, rgba(56, 189, 248, 0.2) 0%, transparent 72%)"
      : "transparent"};

  i,
  .nav-icon svg {
    font-size: 1.2rem;
    width: 19px;
    height: 19px;
    color: ${(props) => (props.$active ? "#38bdf8" : "inherit")};
    filter: ${(props) =>
      props.$active ? "drop-shadow(0 0 8px rgba(56, 189, 248, 0.65))" : "none"};
    transition: transform 0.25s ease, color 0.25s ease;
    transform: ${(props) => (props.$active ? "translateY(-2px)" : "none")};
  }

  .nav-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 0.68rem;
    font-weight: 600;
    max-width: 72px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const NavBottomSheetOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1001;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
  transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const NavBottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 78dvh;
  display: flex;
  flex-direction: column;
  background: rgba(11, 18, 32, 0.96);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding: 1.15rem 1.15rem calc(1.25rem + env(safe-area-inset-bottom, 0px));
  z-index: 1002;
  transform: ${(props) =>
    props.$visible ? "translateY(0)" : "translateY(105%)"};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.48);
  color: #ffffff;
`;

export const NavBottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;

  h3 {
    margin: 0;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.6rem;

    .sheet-icon svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const NavBottomSheetBody = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavBottomSheetItem = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 52px;
  padding: 0.85rem 1rem;
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 14px;
  background: ${(props) =>
    props.$active ? "rgba(56, 189, 248, 0.14)" : "rgba(255, 255, 255, 0.05)"};
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  gap: 0.85rem;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease, transform 0.15s ease;

  &:active {
    background: rgba(255, 255, 255, 0.14);
    transform: scale(0.99);
  }

  .sheet-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .sheet-chevron {
    margin-left: auto;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
  }
`;
