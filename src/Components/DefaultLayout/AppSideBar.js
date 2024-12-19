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

const AppSidebar = ({ mobileSidebarVisible, setMobileSidebarVisible }) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accesses } = useMemo(() => getRequestUserInfo(), []);
  const { showMenuOnMobile } = useSelector((store) => store.DefaultLayout);

  const toggleSidebar = (event) => {
    event.preventDefault();
    setCollapsed(!collapsed);
    dispatch(setShowSideBar(collapsed));
  };

  useEffect(() => {
    const handleResize = () => {
      const _value = window.innerWidth <= 768;
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
      <Sidebar
        collapsed={collapsed}
        backgroundColor="#001f3f"
        width="200px"
        collapsedWidth="70px"
        transitionDuration={500}
        className="side"
        style={{
          display: mobileSidebarVisible ? "block" : "none", // Toggle sidebar on mobile
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              color: "#b6c8d9",
              "&:hover": {
                backgroundColor: "#f8f8f2",
                color: "#333333",
              },
              "&.active": {
                backgroundColor: "#f8f8f2",
                color: "#ffffff",
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
                  component={<Link to={route.path} />}
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
