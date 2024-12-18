import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";
import { TableControlStyled } from "./styled";
import { Button } from "primereact/button";
import { isBoolean, isDate } from "lodash";
import { utils } from "../../../Helpers/utils";

const TableControl = ({
  title,
  items,
  filter,
  setFilter,
  filterFields,
  columns,
  emptyMessage,
  isExportExcel,
  fileName,
  loading,
  rows,
  onPage,
  rowsPerPageOptions = undefined,
  paginator = true,
  onFilter,
  columnsToExcelExport = undefined,
}) => {
  const verifiedRowFilterTemplate = (options, item) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const verifiedBodyTemplate = (rowData, item) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData[item.fieldName],
          "false-icon pi-times-circle": !rowData[item.fieldName],
        })}
      ></i>
    );
  };
  const saveAsExcelFile = (buffer) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(data, fileName + EXCEL_EXTENSION);
      }
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const _columns = columnsToExcelExport || columns;

      const customizedItems = items?.map((item) => {
        const customizedItem = {};

        _columns.forEach((column) => {
          let value = item[column.fieldName];

          if (isBoolean(value)) {
            value = value ? "Si" : "No";
          }

          if (column.isDate) {
            value = new Date(value).toLocaleDateString();
          }
          customizedItem[column.name] = value;
        });
        return customizedItem;
      });

      const worksheet = xlsx.utils.json_to_sheet(customizedItems, {
        header: _columns.map((column) => column.name),
      });

      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "customizedFile");
    });
  };

  const header = (
    <div className="flex align-items-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file-excel"
        onClick={exportExcel}
        className="p-button-success mr-2"
        data-pr-tooltip="XLS"
      />
    </div>
  );

  return (
    <TableControlStyled>
      <div className="card">
        <h5>{title}</h5>
        <DataTable
          loading={loading}
          value={items}
          paginator={paginator}
          className="p-datatable-customers"
          rows={rows ? rows : 10}
          dataKey="id"
          size="small"
          filters={filter}
          filterDisplay="row"
          header={isExportExcel ? header : null}
          responsiveLayout="scroll"
          onPage={onPage}
          currentPageReportTemplate={500}
          rowsPerPageOptions={rowsPerPageOptions}
          // globalFilterFields={filterFields}
          emptyMessage={emptyMessage ? emptyMessage : " "}
          onFilter={onFilter}
        >
          {columns &&
            columns.map((item) => {
              if (!item.noVisible) {
                return item.isFilter ? (
                  item.isBoolean ? (
                    <Column
                      {...item}
                      field={item.fieldName}
                      header={item.name}
                      dataType="boolean"
                      style={{ minWidth: "6rem" }}
                      body={(rowData) => {
                        if (item.body) {
                          return item.body(rowData);
                        } else {
                          return verifiedBodyTemplate(rowData, item);
                        }
                      }}
                      filter
                      filterElement={(options) =>
                        verifiedRowFilterTemplate(options, item)
                      }
                    />
                  ) : (
                    <Column
                      {...item}
                      field={item.fieldName}
                      header={item.name}
                      filter
                      filterPlaceholder={item.filterPlaceHolder}
                      style={{ minWidth: item.width }}
                    />
                  )
                ) : item.isBoolean ? (
                  <Column
                    {...item}
                    field={item.fieldName}
                    header={item.name}
                    dataType="boolean"
                    style={{ minWidth: "6rem" }}
                  />
                ) : item.body ? (
                  <Column
                    {...item}
                    field={item.fieldName}
                    header={item.name}
                    style={{ minWidth: item.width }}
                    body={item.body}
                  />
                ) : (
                  <Column
                    {...item}
                    field={item.fieldName}
                    header={item.name}
                    style={{ minWidth: item.width }}
                  />
                );
              }
            })}
        </DataTable>
      </div>
    </TableControlStyled>
  );
};

export default TableControl;
