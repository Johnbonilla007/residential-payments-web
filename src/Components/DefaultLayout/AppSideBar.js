import React, { useEffect, useMemo, useState } from "react";
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

const AppSidebar = ({ mobileSidebarVisible, setMobileSidebarVisible }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  );
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
    setCollapsed(!collapsed);
    dispatch(setShowSideBar(collapsed));
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

  return (
    <AppSidebarStyled mobileSidebarVisible={mobileSidebarVisible}>
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
            src={require("../../Assets/Logo.png")}
            alt="Quintas del Sol"
            style={{
              maxHeight: isCollapsed ? "40px" : "80px",
              maxWidth: "100%",
              objectFit: "contain",
              transition: "all 0.3s ease",
              transform: isCollapsed ? "scale(0.8)" : "scale(1)",
              filter: "brightness(0) invert(1)" // Force to white
            }}
            onClick={() => navigate("/dashboard")}
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
            onClick={toggleSidebar}
            title={collapsed ? "Dashboard" : ""} // Tooltip only when collapsed
          >
            <span
              onClick={(event) => {
                event.preventDefault();
                navigate("/dashboard");
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
