import Invoice from "../Container/Invoice";
import Permission from "../Container/Permission";
import ReportsContainer from "../Container/Reports";
import IncomeAndSpendingReportSummarized from "../Container/Reports/IncomeAndSpendingReportSummarized";
import IncomeAndSpendingReportDetailed from "../Container/Reports/IncomesAndSpendingReportDetailed";
import PendingPaymentReport from "../Container/Reports/PendingPaymentReport";
import Report from "../Container/Reports/VisitsReport";
import UsersContainer from "../Container/Users";
import Users from "../Container/Users/User";
import { TipoCuentas } from "../Helpers/Constant";
import ImportUserOption from "../Container/Users/ImportUserOption";
import {
  FaPaste,
  FaFileImport,
  FaUsers,
  FaLock,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { TbReport, TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { FaHouse, FaPersonBurst, FaPersonMilitaryToPerson } from "react-icons/fa6";
import AlertReport from "../Container/Reports/AlertReport";
import AccessReport from "../Container/Reports/AccessReport";
import ResidentialContainer from "../Container/Residentials";
import SpecialVisit from "../Container/Residentials/SpecialVisit";
const routes = [
  {
    path: "/invoice",
    name: "Facturación",
    isMenu: false,
    isSecurity: true,
    color: "#ae976a",
    accesses: "Facturas",
    icon: <FaFileInvoiceDollar />,
    permissions: [TipoCuentas.administrador],
    Element: <Invoice />,
  },
  {
    path: "/reports",
    name: "Reportes",
    isMenu: false,
    isSecurity: true,
    color: "#FFA07A",
    icon: <FaPaste />,
    permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
    accesses: "Reportes",
    module: "reports",
    Element: <ReportsContainer />,
    subRoutes: [
      {
        path: "/reports/visits-report",
        name: "Reporte de Visitas",
        isMenu: false,
        isSecurity: true,
        color: "#FFA07A",
        icon: <FaPersonMilitaryToPerson />,
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        accesses: "ReportesVisitas",
        Element: <Report />,
      },
      {
        path: "/reports/incomes-report",
        name: "Reporte de Ingresos y Gastos Detallado",
        isMenu: false,
        isSecurity: true,
        color: "#A2C8CC",
        icon: <TbReportAnalytics />,
        accesses: "ReporteIngresoEgresoDetallado",
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        Element: <IncomeAndSpendingReportDetailed />,
      },
      {
        path: "/reports/pending-payment-report",
        name: "Reporte de Pagos Pendientes",
        isMenu: false,
        isSecurity: true,
        color: "orange",
        icon: <TbReportSearch />,
        accesses: "ReportesPendientes",
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        Element: <PendingPaymentReport />,
      },
      {
        path: "/reports/income-and-spending-report",
        name: "Reporte de Ingresos y Gastos Sumarizado",
        isMenu: false,
        isSecurity: true,
        color: "lightgreen",
        icon: <TbReport />,
        accesses: "ReporteIngresoEgresoSumarizado",
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        Element: <IncomeAndSpendingReportSummarized />,
      },
      {
        path: "/reports/alerts-report",
        name: "Reporte de Alertas",
        isMenu: false,
        isSecurity: true,
        color: "lightblue",
        icon: <TbReport />,
        accesses: "ReporteAlertas",
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        Element: <AlertReport />,
      },
      {
        path: "/reports/access-report",
        name: "Reporte de Accesos",
        isMenu: false,
        isSecurity: true,
        color: "lightpink",
        icon: <TbReport />,
        accesses: "AccessosReporte",
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        Element: <AccessReport />,
      },
    ],
  },
  {
    path: "/users",
    name: "Usuarios",
    isMenu: false,
    isSecurity: true,
    color: "#87CEFA",
    icon: <FaUsers />,
    accesses: "Usuarios",
    permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
    Element: <UsersContainer />,
    module: "Usuarios",
    subRoutes: [
      {
        path: "/users/user",
        name: "Usuarios",
        isMenu: false,
        isSecurity: true,
        color: "#FFA07A",
        icon: <FaUsers />,
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        accesses: "VerUsuario",
        Element: <Users />,
      },
      {
        path: "/users/importUserOption",
        name: "Importar Usuarios",
        isMenu: false,
        isSecurity: true,
        color: "#FFA07A",
        icon: <FaUsers />,
        permissions: [TipoCuentas.administrador, TipoCuentas.subAdministrador],
        accesses: "VerImportarUsuarios",
        Element: <ImportUserOption />,
      },
    ],
  },
  {
    path: "/permission",
    name: "Seguridad",
    isMenu: false,
    isSecurity: true,
    color: "#A2C8CC",
    icon: <FaLock />,
    accesses: "Seguridad",
    permissions: [TipoCuentas.administrador],
    Element: <Permission />,
  },
  {
    path: "/residential",
    name: "Residenciales",
    isMenu: false,
    isSecurity: true,
    color: "#87CEFA",
    icon: <FaHouse />,
    accesses: "Residenciales",
    permissions: [TipoCuentas.administrador],
    Element: <ResidentialContainer />,
    module: "residential",
    subRoutes: [
      {
        path: "/residentials/special-visit",
        name: "Visitas Especiales",
        isMenu: false,
        isSecurity: true,
        color: "#FFA07A",
        icon: <FaPersonBurst />,
        permissions: [TipoCuentas.administrador],
        accesses: "VerVisitasEspeciales",
        Element: <SpecialVisit />,
      },
    ],
  },
];

export default routes;
