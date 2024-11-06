// CommandBar.js
import React from "react";
import { CommandBarControlStyled } from "./styled";
import { utils } from "../../Helpers/utils";

const CommandBarControl = ({ commands }) => {
  return (
    <CommandBarControlStyled>
      {commands.map((command, index) => {
        ;
        const style = command.disabled ? "-disabled" : "";

        return (
          <div
            key={index}
            onClick={!command.disabled ? command.action : null}
            className={`command-button${style}`}
          >
            {command.icon && <div className="icon">{command.icon()}</div>}
            <div className="title">{command.label}</div>
          </div>
        );
      })}
    </CommandBarControlStyled>
  );
};

export default CommandBarControl;
