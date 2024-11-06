import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { utils } from "../../../Helpers/utils";
import { columnsReportPDF } from "./setting";

const DocPdfReport = ({ visitList, residential, dateSelected }) => {
  
  const handleFomartValues = (item, visit) => {
    if (item.fieldName === "isFrequent") {
      const isFrequent = visit.isFrequent ? "Si" : "No";

      return isFrequent;
    }

    if (item.fieldName === "imgCar" && utils.evaluateFullObjetct(visit)) {
      visit.imgCar = visit.imgCar?.replace(/,/g, ", ");
      return visit.imgCar;
    }
    return visit[item.fieldName];
  };

  const handleOnRenderRow = (item) => {
    if (utils.evaluateFullObjetct(item)) {
      return visitList.map((visit) => (
        <View style={[styles.tableCol, { width: item.width }]}>
          <Text style={[styles.tableCell, { width: item.width }]}>
            {handleFomartValues(item, visit)}
          </Text>
        </View>
      ));
    }
  };
  const myColumns = columnsReportPDF();

  return (
    <Document>
      <Page style={styles.body}>
        <View
          style={{
            display: "flex",
            flexDirection: "Column",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Image
            alt="logo"
            source={require("../../../Assets/Logo.png")}
            style={{ width: "50px", height: "50px", alignSelf: "center" }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
              margin: 10,
            }}
          >
            Reporte de Visitas
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
              margin: 10,
            }}
          >
            {residential}
          </Text>

          <Text
            style={{
              textAlign: "right",
              fontSize: 12,
              fontWeight: "900",
              margin: 5,
            }}
          >
            Fecha de reporte: {dateSelected} Total: {visitList.length}
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {myColumns?.map((item) => {
                if (!item.noExport) {
                  return (
                    <View
                      style={[styles.tableColHeader, { width: item.width }]}
                    >
                      <Text
                        style={[styles.tableCellHeader, { width: item.width }]}
                      >
                        {item.name}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
            <View style={styles.tableRow}>
              {myColumns?.map((item) => {
                if (!item.noExport) {
                  return <View> {handleOnRenderRow(item)}</View>;
                }
              })}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 2,
  },
  table: {
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 1,
    fontSize: 7,
    fontWeight: "800",
    backgroundColor: "#006633",
    color: "#fff",
    padding: "5px",
    borderRadius: 2,
    height: "20px",
    textAlign: "center",
    justifyContent: "center",
  },
  tableCell: {
    margin: "auto",
    margin: 1,
    fontSize: 8,
    height: "60px",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    flexWrap: "wrap",
  },
});

export default DocPdfReport;
