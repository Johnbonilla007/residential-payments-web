// Container.js
import React from "react";

import { ContainerControlStyled } from "./styled";
import CommandBarControl from "../CommandBarControl";

const Container = ({ commands, children }) => {
  return (
    <ContainerControlStyled>
      {commands && <CommandBarControl commands={commands} />}
      <div className="content">{children}</div>
    </ContainerControlStyled>
  );
};

export default Container;
