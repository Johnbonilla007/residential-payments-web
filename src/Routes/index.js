import Invoice from "../Container/Invoice";
import Permission from "../Container/SecurityAndManagement/Permission";
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
  FaUsers,
  FaLock,
  FaFileInvoiceDollar,
  FaPuzzlePiece,
} from "react-icons/fa";
import { TbReport, TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import {
  FaHouse,
  FaPersonBurst,
  FaPersonMilitaryToPerson,
} from "react-icons/fa6";
import AlertReport from "../Container/Reports/AlertReport";
import AccessReport from "../Container/Reports/AccessReport";
import ResidentialContainer from "../Container/Residentials";
import SpecialVisit from "../Container/Residentials/SpecialVisit";
import SecurityAndManagementContainer from "../Container/SecurityAndManagement";
import BillingContainer from "../Container/Billing";
import PaymentType from "../Container/Billing/PaymentType";
import SpendingType from "../Container/SecurityAndManagement/SpendingType";
import { CreateOrUpdatePaymentType } from "../Container/Invoice/Components/CreateOrUpdatePaymentType";
import PenaltyFee from "../Container/Invoice/PenaltyFee";
const routes = [
  {
    path: "/billing",
    name: "Pagos",
    isMenu: false,
    isSecurity: true,
    color: "#ae976a",
    accesses: "Facturas",
    icon: <FaFileInvoiceDollar size={30} />,
    permissions: [TipoCuentas.administrador],
    Element: <BillingContainer />,
    module: "billing",
    subRoutes: [
      {
        path: "/billing/receipt",
        name: "Recibos",
        isMenu: false,
        isSecurity: true,
        color: "#ae976a",
        accesses: "Recibos",
        icon: <FaFileInvoiceDollar size={30} />,
        permissions: [TipoCuentas.administrador],
        Element: <Invoice />,
      },
      {
        path: "/billing/penalty-fee",
        name: "Multas",
        isMenu: false,
        isSecurity: true,
        color: "#ae98ca",
        accesses: "Multas",
        icon: <FaFileInvoiceDollar size={30} />,
        permissions: [TipoCuentas.administrador],
        Element: <PenaltyFee />,
      },
    ],
  },
  {
    path: "/reports",
    name: "Reportes",
    isMenu: false,
    isSecurity: true,
    color: "#FFA07A",
    icon: <FaPaste size={30} />,
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
    icon: <FaUsers size={30} />,
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
    path: "/security-and-management",
    name: "Administración y Seguridad",
    isMenu: false,
    isSecurity: true,
    color: "#A2C8CC",
    icon: <FaPuzzlePiece size={30} />,
    accesses: "Seguridad",
    permissions: [TipoCuentas.administrador],
    module: "security-and-management",
    Element: <SecurityAndManagementContainer />,
    subRoutes: [
      {
        path: "/security-and-management/security",
        name: "Seguridad",
        isMenu: false,
        isSecurity: true,
        color: "#FFA07A",
        icon: <FaLock />,
        permissions: [TipoCuentas.administrador],
        accesses: "VerImportarUsuarios",
        Element: <Permission />,
      },
      {
        path: "/security-and-management/payment-type",
        name: "Tipos de Pago",
        isMenu: false,
        isSecurity: true,
        color: "#A2C8BB",
        icon: <FaLock />,
        permissions: [TipoCuentas.administrador],
        accesses: "VerImportarUsuarios",
        Element: <PaymentType />,
      },
      {
        path: "/security-and-management/spending-type",
        name: "Tipos de Gastos",
        isMenu: false,
        isSecurity: true,
        color: "#A8C37A",
        icon: <FaLock />,
        permissions: [TipoCuentas.administrador],
        accesses: "VerImportarUsuarios",
        Element: <SpendingType />,
      },
    ],
  },
  {
    path: "/residential",
    name: "Residenciales",
    isMenu: false,
    isSecurity: true,
    color: "#87CEFA",
    icon: <FaHouse size={30} />,
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
        icon: <FaPersonBurst size={30} />,
        permissions: [TipoCuentas.administrador],
        accesses: "VerVisitasEspeciales",
        Element: <SpecialVisit />,
      },
    ],
  },
];

export default routes;
