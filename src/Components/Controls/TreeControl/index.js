/**
 *
 * TreeControl
 *
 */

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Tree } from "primereact/tree";

import { StyledTreeControl } from "./styles";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { utils } from "../../../Helpers/utils";

const TreeControl = (props) => {
  const {
    items,
    groupName,
    childrenName,
    iconGroup,
    childrenProperties,
    filter = true,
    style,
    title,
    handleDeleteWholeGroup,
    handleDeleteSubItem,
  } = props;
  const [expandedKeys, setExpandedKeys] = useState({});

  const itemsValue = useMemo(() => {
    if (utils.evaluateArray(items)) {
      const itemsToReturn = items.map((item) => ({
        key: item.id,
        label: item[groupName],
        icon: iconGroup || "pi pi-fw pi-inbox",
        data: item[groupName],
        children: item[childrenName]?.map((child) => ({
          key: child.id,
          label: child[childrenProperties.label],
          data: child[childrenProperties.data] || item[groupName],
          icon: childrenProperties.icon || "pi pi-fw pi-inbox",
        })),
      }));

      return itemsToReturn;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleRemoveItem = (item, event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "¿Estás seguro que deseas eliminar el registro?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        if (item.children) {
          handleDeleteWholeGroup(item, event);
          return;
        }

        handleDeleteSubItem(item, event);
      },
      reject: () => {},
    });
  };

  const nodeTemplate = (node, options) => {
    let label = <h4>{node.label}</h4>;

    if (node.url) {
      label = <h4>{node.label}</h4>;
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 50px",
          justifyContent: "space-between",
          gap: 100,
        }}
        className={options.className}
      >
        <div> {label}</div>

        <div style={{ display: "flex", color: "red", alignItems: "center" }}>
          <i
            onClick={(event) => handleRemoveItem(node, event)}
            className="p-button-icon p-c pi pi-trash"
          ></i>
        </div>
      </div>
    );
  };

  return (
    <StyledTreeControl>
      <ConfirmPopup />

      {title && <h4>{title}</h4>}
      <Tree
        className="tree-control"
        filter={filter}
        style={style}
        selectionMode="multiple"
        value={itemsValue}
        onSelect={(e) => setExpandedKeys(e.node)}
        nodeTemplate={nodeTemplate}
        selectionKeys={expandedKeys}
      />
    </StyledTreeControl>
  );
};

TreeControl.propTypes = {
  items: PropTypes.array.isRequired,
  groupName: PropTypes.string.isRequired,
  childrenName: PropTypes.string.isRequired,
  iconChilddren: PropTypes.string.isRequired,
  iconGroup: PropTypes.string.isRequired,
  childrenProperties: PropTypes.shape({
    label: PropTypes.string.isRequired,
    data: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.array,
  }),
  onRemoveItem: PropTypes.func.isRequired,
  style: PropTypes.object,
  filter: PropTypes.bool,
  title: PropTypes.string,
  handleDeleteWholeGroup: PropTypes.func.isRequired,
  handleDeleteSubItem: PropTypes.func.isRequired,
};

export default TreeControl;
