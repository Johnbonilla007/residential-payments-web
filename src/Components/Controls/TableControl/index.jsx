import React, { useEffect, useMemo, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";
import {
  DetailLabel,
  DetailList,
  DetailRow,
  DetailValue,
  MobileActionsWrap,
  MobileTableHeader,
  MobileTableTitle,
  TableControlStyled,
} from "./styled";
import { Button } from "primereact/button";
import { isBoolean } from "lodash";
import { useIsMobile } from "../../../Helpers/useIsMobile";
import MobileList, { MobileListItem } from "../MobileList";
import BottomSheet from "../BottomSheet";
import StickyActionBar from "../StickyActionBar";

const ACTION_COL_RE = /(acci[oó]n|acciones|actions?|opciones)/i;
const INDEX_COL_RE = /^(#|index|no\.?)$/i;
const TRAILING_COL_RE =
  /(amount|cost|total|saldo|monto|precio|pend|fecha|date|payment|pago)/i;
const STATUS_COL_RE = /(status|estado|active|activo|partial|arreglo|multa)/i;

const isActionColumn = (col) =>
  Boolean(col?.isActions) ||
  ACTION_COL_RE.test((col?.name || "").trim()) ||
  (!col?.fieldName && Boolean(col?.body));

const isIndexColumn = (col) =>
  INDEX_COL_RE.test((col?.name || "").trim()) ||
  col?.fieldName === "index";

const formatCellValue = (row, col) => {
  if (!row || !col) return "—";
  const raw = col.fieldName ? row[col.fieldName] : undefined;
  if (raw === null || raw === undefined || raw === "") return "—";
  if (typeof raw === "boolean") return raw ? "Sí" : "No";
  if (col.isDate) {
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? String(raw) : parsed.toLocaleDateString();
  }
  return String(raw);
};

const getInitials = (text) => {
  if (!text || text === "—") return "•";
  const parts = String(text).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
};

const TableControl = ({
  title,
  items = [],
  filter,
  setFilter,
  filterFields,
  columns = [],
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
  scrollable = false,
  scrollHeight = undefined,
  mobileItem,
  hasMore = false,
  onLoadMore,
  loadingMore = false,
  onExportExcel,
}) => {
  const isMobile = useIsMobile();
  const pageSize = rows || 15;
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const visibleColumns = useMemo(
    () => (columns || []).filter((col) => col && !col.noVisible),
    [columns],
  );

  const actionColumns = useMemo(
    () =>
      visibleColumns.filter(
        (col) => isActionColumn(col) || (col.isBoolean && Boolean(col.body)),
      ),
    [visibleColumns],
  );

  const dataColumns = useMemo(
    () => visibleColumns.filter((col) => !isActionColumn(col)),
    [visibleColumns],
  );

  const verifiedRowFilterTemplate = (options) => (
    <TriStateCheckbox
      value={options.value}
      onChange={(e) => options.filterApplyCallback(e.value)}
    />
  );

  const verifiedBodyTemplate = (rowData, item) => (
    <i
      className={classNames("pi", {
        "true-icon pi-check-circle": rowData[item.fieldName],
        "false-icon pi-times-circle": !rowData[item.fieldName],
      })}
      aria-label={rowData[item.fieldName] ? "Sí" : "No"}
    />
  );

  const saveAsExcelFile = (buffer) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        module.default.saveAs(data, (fileName || "reporte") + EXCEL_EXTENSION);
      }
    });
  };

  const exportExcel = async () => {
    const exportSource = onExportExcel ? await onExportExcel() : items;
    if (!Array.isArray(exportSource) || exportSource.length === 0) return;

    import("xlsx").then((xlsx) => {
      const _columns = columnsToExcelExport || columns;

      const customizedItems = exportSource.map((item) => {
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
    <div className="export-buttons">
      <Button
        type="button"
        icon="pi pi-file-excel"
        label="Excel"
        onClick={exportExcel}
        className="p-button-success p-button-sm"
        aria-label="Exportar a Excel"
        data-pr-tooltip="Exportar a Excel"
      />
    </div>
  );

  const buildAutoMobileItem = (row) => {
    const contentCols = dataColumns.filter((col) => !isIndexColumn(col));
    const titleCol =
      contentCols.find((col) => !col.isBoolean) ||
      contentCols[0] ||
      dataColumns[0];

    const trailingCol = contentCols.find(
      (col) =>
        col !== titleCol &&
        !col.isBoolean &&
        TRAILING_COL_RE.test(`${col.fieldName || ""} ${col.name || ""}`),
    );

    const statusCol = contentCols.find(
      (col) =>
        col !== titleCol &&
        (col.isBoolean ||
          STATUS_COL_RE.test(`${col.fieldName || ""} ${col.name || ""}`)),
    );

    const subtitleCols = contentCols
      .filter(
        (col) =>
          col !== titleCol &&
          col !== trailingCol &&
          col !== statusCol &&
          !col.isBoolean,
      )
      .slice(0, 2);

    const titleText = titleCol ? formatCellValue(row, titleCol) : "Registro";
    const subtitleParts = subtitleCols
      .map((col) => formatCellValue(row, col))
      .filter((val) => val && val !== "—");

    let statusBadge;
    if (statusCol) {
      const rawStatus = statusCol.fieldName ? row[statusCol.fieldName] : null;
      if (typeof rawStatus === "boolean") {
        statusBadge = {
          label: rawStatus ? "Activo" : "Inactivo",
          variant: rawStatus ? "success" : "danger",
          icon: rawStatus ? "pi pi-check-circle" : "pi pi-times-circle",
        };
      } else if (rawStatus !== null && rawStatus !== undefined && rawStatus !== "") {
        const str = String(rawStatus);
        const isPositive = /^(si|sí|pagado|activo|completado)$/i.test(str);
        statusBadge = {
          label: `${statusCol.name}: ${str}`,
          variant: isPositive ? "success" : "warning",
        };
      }
    }

    return {
      leading: {
        initials: getInitials(titleText),
        tone: statusBadge?.variant === "danger" ? "danger" : "primary",
      },
      title: titleText,
      subtitle: subtitleParts.join(" · "),
      trailing: trailingCol ? formatCellValue(row, trailingCol) : undefined,
      status: statusBadge,
      chevron: actionColumns.length === 0,
    };
  };

  if (isMobile) {
    const safeItems = Array.isArray(items) ? items : [];
    const usesServerLoadMore = Boolean(onLoadMore);
    const displayedItems = usesServerLoadMore
      ? safeItems
      : safeItems.slice(0, visibleCount);
    const canLoadMore = usesServerLoadMore
      ? Boolean(hasMore)
      : safeItems.length > visibleCount;
    const remaining = safeItems.length - displayedItems.length;

    return (
      <TableControlStyled>
        {(title || isExportExcel) && (
          <MobileTableHeader>
            {title ? <MobileTableTitle>{title}</MobileTableTitle> : <span />}
            {isExportExcel && (
              <Button
                type="button"
                icon="pi pi-file-excel"
                label="Excel"
                onClick={exportExcel}
                className="p-button-success p-button-outlined p-button-sm"
                aria-label="Exportar a Excel"
                style={{ minHeight: "40px", whiteSpace: "nowrap" }}
              />
            )}
          </MobileTableHeader>
        )}

        <MobileList
          loading={loading}
          empty={{
            icon: "pi pi-inbox",
            title: title || "Sin registros",
            message:
              emptyMessage && emptyMessage.trim()
                ? emptyMessage
                : "No hay elementos para mostrar.",
          }}
          hasMore={canLoadMore}
          loadingMore={loadingMore}
          loadMoreLabel={
            usesServerLoadMore
              ? "Cargar más"
              : `Cargar más (${remaining} restantes)`
          }
          onLoadMore={() => {
            if (usesServerLoadMore) {
              onLoadMore?.();
            } else {
              setVisibleCount((prev) => prev + pageSize);
            }
          }}
        >
          {displayedItems.map((row, index) => {
            const props = mobileItem
              ? mobileItem(row, index)
              : buildAutoMobileItem(row, index);

            return (
              <MobileListItem
                key={row.id ?? row.key ?? index}
                {...props}
                onClick={() => setSelectedRow(row)}
                onMore={
                  actionColumns.length > 0
                    ? () => setSelectedRow(row)
                    : undefined
                }
              />
            );
          })}
        </MobileList>

        <BottomSheet
          visible={Boolean(selectedRow)}
          onHide={() => setSelectedRow(null)}
          title={title || "Detalle"}
          footer={
            selectedRow && actionColumns.length > 0 ? (
              <StickyActionBar inSheet>
                <MobileActionsWrap
                  onClick={(e) => {
                    if (e.target.closest("button")) {
                      window.setTimeout(() => setSelectedRow(null), 0);
                    }
                  }}
                >
                  {actionColumns.map((col, idx) => (
                    <div key={col.name || idx}>{col.body?.(selectedRow)}</div>
                  ))}
                </MobileActionsWrap>
              </StickyActionBar>
            ) : null
          }
        >
          {selectedRow && (
            <DetailList>
              {dataColumns.map((col, idx) => (
                <DetailRow key={col.fieldName || col.name || idx}>
                  <DetailLabel>{col.name}</DetailLabel>
                  <DetailValue>
                    {col.body && !col.isBoolean
                      ? col.body(selectedRow)
                      : formatCellValue(selectedRow, col)}
                  </DetailValue>
                </DetailRow>
              ))}
            </DetailList>
          )}
        </BottomSheet>
      </TableControlStyled>
    );
  }

  return (
    <TableControlStyled>
      <div className="card">
        {(title || isExportExcel) && (
          <div className="table-card-header">
            {title ? <h5>{title}</h5> : <span />}
            {isExportExcel && header}
          </div>
        )}
        <DataTable
          loading={loading}
          value={items}
          paginator={paginator}
          className="p-datatable-customers"
          rows={rows ? rows : 10}
          dataKey="id"
          filters={filter}
          filterDisplay="row"
          onPage={onPage}
          rowsPerPageOptions={rowsPerPageOptions}
          emptyMessage={emptyMessage ? emptyMessage : " "}
          onFilter={onFilter}
          scrollable={scrollable}
          scrollHeight={scrollHeight}
        >
          {columns &&
            columns.map((item, idx) => {
              if (!item.noVisible) {
                const key = item.fieldName || item.name || idx;
                return item.isFilter ? (
                  item.isBoolean ? (
                    <Column
                      key={key}
                      {...item}
                      field={item.fieldName}
                      header={item.name}
                      dataType="boolean"
                      style={{ minWidth: "6rem" }}
                      body={(rowData) => {
                        if (item.body) {
                          return item.body(rowData);
                        }
                        return verifiedBodyTemplate(rowData, item);
                      }}
                      filter
                      filterElement={(options) =>
                        verifiedRowFilterTemplate(options, item)
                      }
                    />
                  ) : (
                    <Column
                      key={key}
                      {...item}
                      field={item.fieldName}
                      header={item.name}
                      filter
                      filterPlaceholder={item.filterPlaceHolder || "Filtrar..."}
                      style={{ minWidth: item.width || "11rem" }}
                    />
                  )
                ) : item.isBoolean ? (
                  <Column
                    key={key}
                    {...item}
                    field={item.fieldName}
                    header={item.name}
                    dataType="boolean"
                    style={{ minWidth: "6rem" }}
                  />
                ) : item.body ? (
                  <Column
                    key={key}
                    {...item}
                    field={item.fieldName}
                    header={item.name}
                    style={{ minWidth: item.width }}
                    body={item.body}
                  />
                ) : (
                  <Column
                    key={key}
                    {...item}
                    field={item.fieldName}
                    header={item.name}
                    style={{ minWidth: item.width }}
                  />
                );
              }
              return null;
            })}
        </DataTable>
      </div>
    </TableControlStyled>
  );
};

export default TableControl;
