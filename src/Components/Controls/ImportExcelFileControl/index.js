import React, { useState } from "react";
import * as XLSX from "xlsx";
import { ImportExcelFileControlStyled } from "./styled";

function ImportExcelFileControl({ handleImportUser }) {
  const [fileName, setFileName] = useState("No hay archivo seleccionado");
  const [file, setFile] = useState();

  const readExcel = (file) => {
    setFileName(file.name);
    setFile(file);
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      handleImportUser(d);
    });
  };

  return (
    <ImportExcelFileControlStyled>
      <main>
        <form
          action=""
          onClick={() => document.querySelector(".input-field").click()}
        >
          {!file && (
            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
              className="input-field"
              hidden
            />
          )}
          <div className="buttom">
            <i
              className="pi pi-upload"
              style={{ fontSize: "1em", marginRight: "5px" }}
            />{" "}
            Cargar Archivo
          </div>
        </form>
        <section>
          <div className="item-content">
            <i
              className="pi pi-file"
              style={{ fontSize: "1em", marginRight: "10px" }}
            />
            <div>{fileName}</div>
            <i
              className="pi pi-trash"
              style={{ fontSize: "1em", marginLeft: "10px" }}
              onClick={() => {
                handleImportUser([]);
                setFileName("No hay archivo seleccionado");
                setFile(undefined);
              }}
            />
          </div>
        </section>
      </main>
    </ImportExcelFileControlStyled>
  );
}

export default ImportExcelFileControl;
