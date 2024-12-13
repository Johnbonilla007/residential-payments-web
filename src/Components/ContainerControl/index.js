// Container.js
import React from "react";

import { ContainerControlStyled } from "./styled";
import CommandBarControl from "../CommandBarControl";
import { useSelector } from "react-redux";

const Container = ({ commands, children }) => {
  const { showSideBar } = useSelector((state) => state.DefaultLayout);
  const { authenticate } = useSelector((state) => state.Login);

  return (
    <ContainerControlStyled
      showSideBar={showSideBar}
      authenticate={authenticate}
    >
      {commands && <CommandBarControl commands={commands} />}
      <div className="content">{children}</div>
    </ContainerControlStyled>
  );
};

export default Container;
