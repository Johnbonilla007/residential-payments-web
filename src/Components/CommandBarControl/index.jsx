import React, { useMemo, useState } from "react";
import { CommandBarControlStyled, MobileChipBar, MobileChipBtn } from "./styled";
import { useSelector } from "react-redux";
import { useIsMobile } from "../../Helpers/useIsMobile";
import Fab from "../Controls/Fab";
import ActionSheet from "../Controls/ActionSheet";

const BACK_RE = /^(atr[aá]s|volver|regresar)$/i;
const PRIMARY_RE = /(crear|nuevo|nueva|recibo de ingreso|agregar)/i;

const CommandBarControl = ({ commands = [] }) => {
  const { showSideBar } = useSelector((state) => state.DefaultLayout);
  const isMobile = useIsMobile();
  const [moreOpen, setMoreOpen] = useState(false);

  const mobileSplit = useMemo(() => {
    const backCmd = commands.find((cmd) => BACK_RE.test((cmd.label || "").trim()));
    const nonBack = commands.filter((cmd) => cmd !== backCmd);
    const primaryCmd = nonBack.find(
      (cmd) => !cmd.disabled && PRIMARY_RE.test(cmd.label || ""),
    );
    const secondary = nonBack.filter((cmd) => cmd !== primaryCmd);
    return { backCmd, primaryCmd, secondary };
  }, [commands]);

  if (isMobile) {
    const { backCmd, primaryCmd, secondary } = mobileSplit;
    const inlineChips = secondary.length > 2 ? secondary.slice(0, 2) : secondary;
    const overflowActions =
      secondary.length > 2
        ? secondary.slice(2).map((cmd, idx) => ({
            id: cmd.label || idx,
            label: cmd.label,
            icon: cmd.icon ? cmd.icon() : undefined,
            disabled: Boolean(cmd.disabled),
            onClick: cmd.action,
          }))
        : [];

    if (!backCmd && !primaryCmd && secondary.length === 0) {
      return null;
    }

    return (
      <>
        {(backCmd || inlineChips.length > 0) && (
          <CommandBarControlStyled showSideBar={showSideBar}>
            <MobileChipBar role="toolbar" aria-label="Acciones rápidas">
              {backCmd && (
                <MobileChipBtn
                  type="button"
                  disabled={Boolean(backCmd.disabled)}
                  onClick={backCmd.action}
                  aria-label={backCmd.label}
                >
                  <i className="pi pi-arrow-left" aria-hidden="true" />
                  <span>{backCmd.label}</span>
                </MobileChipBtn>
              )}
              {inlineChips.map((cmd, index) => (
                <MobileChipBtn
                  key={cmd.label || index}
                  type="button"
                  disabled={Boolean(cmd.disabled)}
                  onClick={cmd.action}
                >
                  {cmd.icon && (
                    <span className="chip-icon" aria-hidden="true">
                      {cmd.icon()}
                    </span>
                  )}
                  <span>{cmd.label}</span>
                </MobileChipBtn>
              ))}
              {overflowActions.length > 0 && (
                <MobileChipBtn
                  type="button"
                  onClick={() => setMoreOpen(true)}
                  aria-label="Más acciones"
                >
                  <i className="pi pi-ellipsis-v" aria-hidden="true" />
                  <span>Más</span>
                </MobileChipBtn>
              )}
            </MobileChipBar>
          </CommandBarControlStyled>
        )}

        {primaryCmd && (
          <Fab
            extended
            icon={primaryCmd.icon ? primaryCmd.icon() : "pi pi-plus"}
            label={primaryCmd.label}
            onClick={primaryCmd.action}
            disabled={Boolean(primaryCmd.disabled)}
          />
        )}

        {overflowActions.length > 0 && (
          <ActionSheet
            visible={moreOpen}
            onHide={() => setMoreOpen(false)}
            title="Acciones"
            actions={overflowActions}
          />
        )}
      </>
    );
  }

  return (
    <CommandBarControlStyled showSideBar={showSideBar}>
      {commands.map((command, index) => (
        <button
          key={command.label || index}
          type="button"
          disabled={Boolean(command.disabled)}
          onClick={!command.disabled ? command.action : undefined}
          className={
            command.disabled ? "command-button-disabled" : "command-button"
          }
        >
          {command.icon && (
            <span className="icon" aria-hidden="true">
              {command.icon()}
            </span>
          )}
          <span className="title">{command.label}</span>
        </button>
      ))}
    </CommandBarControlStyled>
  );
};

export default CommandBarControl;
