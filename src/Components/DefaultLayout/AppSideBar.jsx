import React, { useEffect, useMemo, useRef, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars, FaCalendar, FaShoppingCart, FaFileAlt } from "react-icons/fa";
import { RiMenuUnfold4Line, RiMenuFold4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AppSidebarStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { setShowMenuOnMobile, setShowSideBar } from "./reducer";
import routes from "../../Routes";
import { utils } from "../../Helpers/utils";
import { getRequestUserInfo } from "../../Helpers/restClient";
import {
  MOBILE_BREAKPOINT,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  px,
} from "../../Styles/layout";
import LogoImage from "../../Assets/Logo.png";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const AppSidebar = ({
  mobileSidebarVisible,
  setMobileSidebarVisible,
  returnFocusRef,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  );
  const sidebarContainerRef = useRef(null);
  const wasMobileOpenRef = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accesses } = useMemo(() => getRequestUserInfo(), []);
  const { showMenuOnMobile } = useSelector((store) => store.DefaultLayout);

  /**
   * On mobile the sidebar is an overlay drawer that the user opens on purpose,
   * so it always shows full labels. Collapsing only makes sense on desktop,
   * where the rail is permanently on screen and competes with the content for
   * width — in a 300px drawer a 70px icon rail is just a worse menu.
   */
  const isCollapsed = isMobile ? false : collapsed;

  const toggleSidebar = (event) => {
    event.preventDefault();
    if (isMobile) {
      setMobileSidebarVisible(!mobileSidebarVisible);
      return;
    }
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    dispatch(setShowSideBar(!newCollapsedState));
  };

  useEffect(() => {
    const handleResize = () => {
      const _value = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(_value);
      if (_value) {
        setMobileSidebarVisible(false);
        dispatch(setShowMenuOnMobile(false));
      } else {
        setMobileSidebarVisible(true);
        dispatch(setShowMenuOnMobile(true));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Para obtener el tamaño al cargar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !mobileSidebarVisible) {
      if (wasMobileOpenRef.current) {
        wasMobileOpenRef.current = false;
        returnFocusRef?.current?.focus?.();
      }
      return undefined;
    }

    wasMobileOpenRef.current = true;
    const container = sidebarContainerRef.current;
    const focusFirst = () => {
      const first = container?.querySelector(FOCUSABLE_SELECTOR);
      first?.focus?.();
    };
    const timer = window.setTimeout(focusFirst, 40);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileSidebarVisible(false);
        return;
      }

      if (event.key !== "Tab" || !container) return;
      const focusables = Array.from(
        container.querySelectorAll(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobile, mobileSidebarVisible, setMobileSidebarVisible, returnFocusRef]);

  const closeMobileSidebar = () => {
    if (isMobile) {
      setMobileSidebarVisible(false);
    }
  };

  return (
    <AppSidebarStyled
      ref={sidebarContainerRef}
      mobileSidebarVisible={mobileSidebarVisible}
      role={isMobile && mobileSidebarVisible ? "dialog" : undefined}
      aria-modal={isMobile && mobileSidebarVisible ? "true" : undefined}
      aria-label={isMobile ? "Menú principal" : undefined}
    >
      {isMobile && mobileSidebarVisible && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileSidebarVisible(false)}
          aria-hidden="true"
        />
      )}
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor="transparent"
        width={px(SIDEBAR_WIDTH)}
        collapsedWidth={px(SIDEBAR_COLLAPSED_WIDTH)}
        transitionDuration={500}
        className={`side ${isCollapsed ? "side--collapsed" : ""}`}
        style={{
          display: mobileSidebarVisible ? "block" : "none", // Toggle sidebar on mobile
        }}
      >
        <div
          style={{
            padding: isCollapsed ? "20px 10px" : "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "10px",
            height: "100px" // Fixed height so it doesn't jump weirdly
          }}
        >
          <img
            src={LogoImage}
            alt="Quintas del Sol"
            style={{
              maxHeight: isCollapsed ? "40px" : "80px",
              maxWidth: "100%",
              objectFit: "contain",
              transition: "all 0.3s ease",
              transform: isCollapsed ? "scale(0.8)" : "scale(1)",
              filter: "brightness(0) invert(1)" // Force to white
            }}
            onClick={() => {
              navigate("/dashboard");
              closeMobileSidebar();
            }}
          />
        </div>
        {/*
          Colours come from tokens rather than literals so the sidebar follows
          the theme. The previous active state painted #ffffff text on an
          #f8f8f2 background, which made the selected item unreadable.
        */}
        <Menu
          menuItemStyles={{
            button: {
              color: "var(--app-nav-text)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.14)",
                color: "var(--app-nav-text)",
              },
              "&.active": {
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                color: "var(--app-nav-text)",
                fontWeight: 600,
              },
            },
          }}
        >
          <MenuItem
            className="show-and-unshown-menu-item"
            icon={
              collapsed ? (
                <RiMenuFold4Line size={35} />
              ) : (
                <RiMenuUnfold4Line size={35} />
              )
            }
            component={<Link to="/dashboard" />}
            onClick={(event) => {
              if (isMobile) {
                closeMobileSidebar();
                return;
              }
              toggleSidebar(event);
            }}
            title={collapsed ? "Dashboard" : ""} // Tooltip only when collapsed
          >
            <span
              onClick={(event) => {
                event.preventDefault();
                navigate("/dashboard");
                closeMobileSidebar();
              }}
            >
              Dashboard
            </span>
          </MenuItem>
          {routes.map((route) => {
            const isRolAllow = accesses?.some(
              (x) =>
                x.rolName === route.accesses ||
                x?.permissions?.some((y) => y.name === "SuperRoot")
            );

            if (isRolAllow) {
              return (
                <SubMenu
                  key={route.path}
                  icon={route.icon}
                  label={route.name}
                  className="submenu"
                >
                  {utils.evaluateArray(route.subRoutes) ? (
                    route.subRoutes.map((subRoute) => {
                      const isAllowView = accesses?.some(
                        (x) =>
                          x.rolName === subRoute.accesses ||
                          x?.permissions?.some(
                            (y) =>
                              y.name === subRoute.accesses ||
                              y.name === "SuperRoot"
                          )
                      );
                      if (isAllowView) {
                        return (
                          <MenuItem
                            key={subRoute.path}
                            component={<Link to={subRoute.path} />}
                            title={subRoute.name}
                            icon={subRoute.icon}
                            onClick={closeMobileSidebar}
                          >
                            {subRoute.name}
                          </MenuItem>
                        );
                      }

                      return null;
                    })
                  ) : (
                    <MenuItem
                      icon={route.icon}
                      component={<Link to={route.path} />}
                      title={route.name}
                      key={route.path}
                      onClick={closeMobileSidebar}
                    >
                      {route.name}
                    </MenuItem>
                  )}
                </SubMenu>
              );
            }

            return null;
          })}
        </Menu>
      </Sidebar>
    </AppSidebarStyled>
  );
};

export default AppSidebar;
