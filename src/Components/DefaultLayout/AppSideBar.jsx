import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { useDispatch } from "react-redux";
import routes from "../../Routes";
import { utils } from "../../Helpers/utils";
import { getRequestUserInfo } from "../../Helpers/restClient";
import { setShowMenuOnMobile, setShowSideBar } from "./reducer";
import { MOBILE_BREAKPOINT } from "../../Styles/layout";
import LogoImage from "../../Assets/Logo.png";
import {
  BottomNavContainer,
  BottomNavItem,
  HoverMenu,
  HoverMenuItem,
  HoverMenuTitle,
  LogoIcon,
  LogoText,
  NavBottomSheet,
  NavBottomSheetBody,
  NavBottomSheetHeader,
  NavBottomSheetItem,
  NavBottomSheetOverlay,
  NavIconWrapper,
  NavItem,
  NavItemWrapper,
  NavSection,
  NavSectionTitle,
  NavText,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarLogo,
  SidebarNav,
  SubRoutesContainer,
  ToggleButton,
} from "./styled";

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState([]);
  const [activeHoverMenu, setActiveHoverMenu] = useState(null);
  const [hoverMenuTop, setHoverMenuTop] = useState(100);
  const [mobileBottomSheetModule, setMobileBottomSheetModule] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accesses } = useMemo(() => getRequestUserInfo() || {}, []);

  const allowedRoutes = useMemo(() => {
    const isSuperRoot = accesses?.some((x) =>
      x?.permissions?.some((y) => y.name === "SuperRoot"),
    );

    return routes
      .filter((route) =>
        accesses?.some((x) => x.rolName === route.accesses) || isSuperRoot,
      )
      .map((route) => {
        const subRoutes = utils.evaluateArray(route.subRoutes)
          ? route.subRoutes.filter(
              (subRoute) =>
                isSuperRoot ||
                accesses?.some(
                  (x) =>
                    x.rolName === subRoute.accesses ||
                    x?.permissions?.some((y) => y.name === subRoute.accesses),
                ),
            )
          : [];
        return { ...route, subRoutes };
      });
  }, [accesses]);

  // Expand the section matching the current route automatically on desktop
  useEffect(() => {
    const activeParent = allowedRoutes.find(
      (r) =>
        r.path === location.pathname ||
        r.subRoutes?.some((sr) => sr.path === location.pathname),
    );
    if (activeParent && !expandedSections.includes(activeParent.path)) {
      setExpandedSections((prev) => [...prev, activeParent.path]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      dispatch(setShowMenuOnMobile(!isMobile));
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    if (mobileBottomSheetModule === null) return undefined;
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setMobileBottomSheetModule(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileBottomSheetModule]);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      dispatch(setShowSideBar(!next));
      return next;
    });
    setActiveHoverMenu(null);
  }, [dispatch]);

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey)
        ? prev.filter((id) => id !== sectionKey)
        : [...prev, sectionKey],
    );
  };

  const handleMenuHover = (menuKey, event) => {
    if (!collapsed) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (menuKey !== null) {
      if (event) {
        const rect = event.currentTarget.getBoundingClientRect();
        setHoverMenuTop(rect.top);
      }
      setActiveHoverMenu(menuKey);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveHoverMenu(null);
      }, 250);
    }
  };

  const isExpanded = !collapsed;
  const activeSheetRoute =
    mobileBottomSheetModule && mobileBottomSheetModule !== "more"
      ? allowedRoutes.find((r) => r.path === mobileBottomSheetModule)
      : null;

  return (
    <>
      <Sidebar $collapsed={collapsed} aria-label="Navegación principal">
        <SidebarHeader $collapsed={collapsed}>
          <SidebarLogo to="/dashboard" $collapsed={collapsed}>
            <LogoIcon $collapsed={collapsed}>
              <img src={LogoImage} alt="Quintas del Sol" />
            </LogoIcon>
            <LogoText $visible={isExpanded}>Quintas del Sol</LogoText>
          </SidebarLogo>
          <ToggleButton
            $collapsed={collapsed}
            icon={collapsed ? "pi pi-angle-right" : "pi pi-angle-left"}
            className="p-button-text p-button-rounded p-button-sm"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          />
        </SidebarHeader>

        <SidebarNav>
          <NavItemWrapper>
            <NavItem
              to="/dashboard"
              $active={location.pathname === "/dashboard"}
              $collapsed={collapsed}
              className="nav-dashboard p-ripple"
            >
              <NavIconWrapper
                $color="#6366f1"
                $active={location.pathname === "/dashboard"}
              >
                <i className="pi pi-th-large" aria-hidden="true" />
              </NavIconWrapper>
              <NavText $visible={isExpanded}>Dashboard</NavText>
              <Ripple />
            </NavItem>
            {collapsed && (
              <Tooltip
                target=".nav-dashboard"
                content="Dashboard"
                position="right"
              />
            )}
          </NavItemWrapper>

          {allowedRoutes.map((route) => {
            const sectionExpanded = expandedSections.includes(route.path);
            const hasChildren = route.subRoutes && route.subRoutes.length > 0;

            return (
              <NavSection
                key={route.path}
                onMouseEnter={(e) => handleMenuHover(route.path, e)}
                onMouseLeave={() => handleMenuHover(null)}
              >
                {hasChildren ? (
                  <>
                    <NavSectionTitle
                      type="button"
                      $visible={isExpanded}
                      $expanded={sectionExpanded}
                      onClick={() => toggleSection(route.path)}
                    >
                      <span
                        className="section-icon"
                        style={{ color: route.color || "var(--app-primary)" }}
                        aria-hidden="true"
                      >
                        {route.icon}
                      </span>
                      <span>{route.name}</span>
                      <i className="pi pi-chevron-right chevron" aria-hidden="true" />
                    </NavSectionTitle>

                    <SubRoutesContainer $expanded={sectionExpanded || collapsed}>
                      {route.subRoutes.map((subRoute) => (
                        <NavItemWrapper key={subRoute.path}>
                          <NavItem
                            to={subRoute.path}
                            $active={location.pathname === subRoute.path}
                            $collapsed={collapsed}
                            title={collapsed ? subRoute.name : undefined}
                            className="p-ripple"
                          >
                            <NavIconWrapper
                              $color={route.color}
                              $active={location.pathname === subRoute.path}
                            >
                              {subRoute.icon || route.icon}
                            </NavIconWrapper>
                            <NavText $visible={isExpanded}>
                              {subRoute.name}
                            </NavText>
                            <Ripple />
                          </NavItem>
                        </NavItemWrapper>
                      ))}
                    </SubRoutesContainer>

                    {collapsed && activeHoverMenu === route.path && (
                      <HoverMenu
                        $top={hoverMenuTop}
                        onMouseEnter={(e) => handleMenuHover(route.path, e)}
                        onMouseLeave={() => handleMenuHover(null)}
                      >
                        <HoverMenuTitle $color={route.color}>
                          {route.name}
                        </HoverMenuTitle>
                        {route.subRoutes.map((subRoute) => (
                          <HoverMenuItem
                            key={subRoute.path}
                            to={subRoute.path}
                            $active={location.pathname === subRoute.path}
                            onClick={() => setActiveHoverMenu(null)}
                          >
                            {subRoute.name}
                          </HoverMenuItem>
                        ))}
                      </HoverMenu>
                    )}
                  </>
                ) : (
                  <NavItemWrapper>
                    <NavItem
                      to={route.path}
                      $active={location.pathname === route.path}
                      $collapsed={collapsed}
                      title={collapsed ? route.name : undefined}
                      className="p-ripple"
                    >
                      <NavIconWrapper
                        $color={route.color}
                        $active={location.pathname === route.path}
                      >
                        {route.icon}
                      </NavIconWrapper>
                      <NavText $visible={isExpanded}>{route.name}</NavText>
                      <Ripple />
                    </NavItem>
                  </NavItemWrapper>
                )}
              </NavSection>
            );
          })}
        </SidebarNav>

        <SidebarFooter $collapsed={collapsed}>
          <span className="footer-caption">
            {isExpanded ? "Quintas del Sol" : "QS"}
          </span>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavContainer aria-label="Navegación móvil">
        <BottomNavItem
          to="/dashboard"
          $active={
            location.pathname === "/dashboard" && mobileBottomSheetModule === null
          }
          onClick={() => setMobileBottomSheetModule(null)}
        >
          <i className="pi pi-th-large" aria-hidden="true" />
          <span>Inicio</span>
        </BottomNavItem>

        {allowedRoutes.slice(0, 3).map((route) => {
          const isModuleActive =
            mobileBottomSheetModule === route.path ||
            route.path === location.pathname ||
            route.subRoutes?.some((sr) => sr.path === location.pathname);

          return (
            <BottomNavItem
              key={route.path}
              as="button"
              type="button"
              $active={isModuleActive}
              onClick={() => {
                if (route.subRoutes && route.subRoutes.length > 0) {
                  setMobileBottomSheetModule((prev) =>
                    prev === route.path ? null : route.path,
                  );
                } else {
                  setMobileBottomSheetModule(null);
                  navigate(route.path);
                }
              }}
            >
              <span className="nav-icon" aria-hidden="true">
                {route.icon}
              </span>
              <span>{route.name}</span>
            </BottomNavItem>
          );
        })}

        {allowedRoutes.length > 3 && (
          <BottomNavItem
            as="button"
            type="button"
            $active={mobileBottomSheetModule === "more"}
            onClick={() =>
              setMobileBottomSheetModule((prev) =>
                prev === "more" ? null : "more",
              )
            }
          >
            <i className="pi pi-ellipsis-h" aria-hidden="true" />
            <span>Más</span>
          </BottomNavItem>
        )}
      </BottomNavContainer>

      {/* Smooth Animated Mobile Module Bottom Sheet */}
      <NavBottomSheetOverlay
        $visible={mobileBottomSheetModule !== null}
        onClick={() => setMobileBottomSheetModule(null)}
        aria-hidden={mobileBottomSheetModule === null}
      />
      <NavBottomSheet
        $visible={mobileBottomSheetModule !== null}
        role="dialog"
        aria-modal={mobileBottomSheetModule !== null ? "true" : undefined}
        aria-label="Módulos de navegación"
      >
        {mobileBottomSheetModule === "more" ? (
          <>
            <NavBottomSheetHeader>
              <h3>
                <i className="pi pi-ellipsis-h" aria-hidden="true" />
                <span>Más Módulos</span>
              </h3>
              <Button
                type="button"
                icon="pi pi-times"
                className="p-button-rounded p-button-text"
                aria-label="Cerrar menú"
                onClick={() => setMobileBottomSheetModule(null)}
                style={{ color: "#ffffff", minWidth: "44px", minHeight: "44px" }}
              />
            </NavBottomSheetHeader>
            <NavBottomSheetBody>
              {allowedRoutes.slice(3).map((route) => (
                <NavBottomSheetItem
                  key={route.path}
                  as="button"
                  type="button"
                  onClick={() => {
                    if (route.subRoutes && route.subRoutes.length > 0) {
                      setMobileBottomSheetModule(route.path);
                    } else {
                      setMobileBottomSheetModule(null);
                      navigate(route.path);
                    }
                  }}
                >
                  <span
                    className="sheet-icon"
                    style={{ color: route.color || "#60a5fa" }}
                    aria-hidden="true"
                  >
                    {route.icon}
                  </span>
                  <span>{route.name}</span>
                  <i className="pi pi-chevron-right sheet-chevron" aria-hidden="true" />
                </NavBottomSheetItem>
              ))}
            </NavBottomSheetBody>
          </>
        ) : activeSheetRoute ? (
          <>
            <NavBottomSheetHeader>
              <h3>
                <span
                  className="sheet-icon"
                  style={{ color: activeSheetRoute.color || "#60a5fa" }}
                  aria-hidden="true"
                >
                  {activeSheetRoute.icon}
                </span>
                <span>{activeSheetRoute.name}</span>
              </h3>
              <Button
                type="button"
                icon="pi pi-times"
                className="p-button-rounded p-button-text"
                aria-label="Cerrar menú"
                onClick={() => setMobileBottomSheetModule(null)}
                style={{ color: "#ffffff", minWidth: "44px", minHeight: "44px" }}
              />
            </NavBottomSheetHeader>
            <NavBottomSheetBody>
              {activeSheetRoute.subRoutes.map((sub) => (
                <NavBottomSheetItem
                  key={sub.path}
                  to={sub.path}
                  $active={location.pathname === sub.path}
                  onClick={() => setMobileBottomSheetModule(null)}
                >
                  <span
                    className="sheet-icon"
                    style={{ color: activeSheetRoute.color || "#60a5fa" }}
                    aria-hidden="true"
                  >
                    {sub.icon || activeSheetRoute.icon}
                  </span>
                  <span>{sub.name}</span>
                  <i className="pi pi-chevron-right sheet-chevron" aria-hidden="true" />
                </NavBottomSheetItem>
              ))}
            </NavBottomSheetBody>
          </>
        ) : null}
      </NavBottomSheet>
    </>
  );
};

export default AppSidebar;
