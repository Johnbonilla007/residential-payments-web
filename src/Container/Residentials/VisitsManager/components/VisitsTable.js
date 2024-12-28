import { TableStyled } from "../styles";

const VisitsTable = ({ columns, data }) => {
  return (
    <TableStyled>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </TableStyled>
  );
};

export default VisitsTable;
