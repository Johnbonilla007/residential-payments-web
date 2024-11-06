import React from "react";
import routes from "../../Routes";
import CardMenu from "../Menu/Components/CardMenu";
import { ReportContainerStyled } from "./styles";
import { utils } from "../../Helpers/utils";

const ReportsContainer = () => {
  const _routes = routes.firstOrDefault((x) => x.module === "reports");

  return (
    <ReportContainerStyled>
      {_routes?.subRoutes?.map((route, index) => {
        const allowAccess = utils.hasPermission(route.accesses);

        if (allowAccess) {
          return (
            <div className="item"   key={index}>

              <CardMenu
                key={index}
                label={route.name}
                color={route.color}
                icon={route.icon}
                path={route.path}
              />
            </div>
          );
        }
      })}
    </ReportContainerStyled>
  );
};

export default ReportsContainer;
