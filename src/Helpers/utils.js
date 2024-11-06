import _, { isArray, isEmpty, isNull, isObject, isUndefined } from "lodash";
import { getRequestUserInfo } from "./restClient";
import moment from "moment";
const getMonthName = (monthIndex) => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return monthNames[monthIndex];
};
const getMonthIndex = (monthName) => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const monthIndex = monthNames.indexOf(monthName);

  // Devuelve -1 si el mes no se encuentra
  if (monthIndex === -1) {
    return "";
  }

  return monthIndex;
};

const adjustMonthIndex = (monthIndex) => {
  return monthIndex < 0 ? 11 : monthIndex;
};

const getAdjustedDate = (date) => {
  const monthIndex = date.getMonth();
  const adjustedMonthIndex = adjustMonthIndex(monthIndex - 1);
  const adjustedYear =
    adjustedMonthIndex === 11 ? date.getFullYear() - 1 : date.getFullYear();
  return { monthIndex: adjustedMonthIndex, year: adjustedYear };
};

// Ejemplo de uso:
try {
  const monthName = "Marzo";
  const monthIndex = getMonthIndex(monthName);
  console.log(monthIndex); // 2
} catch (error) {
  console.error(error.message);
}

export class utils {
  static isNullOrEmpty = (value) => {
    let isNull = value === "" || value === null || !value;

    return isNull;
  };
  static isNum(val) {
    return !isNaN(val);
  }

  static getMonthName(val) {
    return getMonthName(val);
  }

  static getMonthIndex(val) {
    return getMonthIndex(val);
  }

  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getMonthRangeText(startDate, monthsToAdd, isInitialPay, chargeCurrentMonth) {
    let paymentToAddWhenIsInitial = monthsToAdd - 1;
    let startMonthIndex;
    let valueToadd = chargeCurrentMonth ? 1 : 2;
    if (isInitialPay) {
      startMonthIndex =
        (startDate.getMonth() - valueToadd - paymentToAddWhenIsInitial + 12) % 12;
    } else {
      startMonthIndex = (startDate.getMonth() - valueToadd + 12) % 12;
    }
    // Empezamos desde el mes siguiente

    // Si el mes ajustado está en el año anterior, ajustamos el año
    let startYear = startDate.getFullYear();
    if (startDate.getMonth() < valueToadd) {
      // Si enero (0) o febrero (1), cae en el año anterior
      startYear -= 1;
    }

    // Obtenemos el nombre del mes inicial
    const startMonthName = getMonthName(startMonthIndex);

    if (monthsToAdd === 1) {
      return `${startMonthName}-${startYear}`;
    }

    // Calculamos la fecha final sumando la cantidad de meses
    const endDate = new Date(startDate);
    endDate.setDate(1); // Ajustar al primer día del mes para evitar desbordamientos
    endDate.setMonth(startMonthIndex + monthsToAdd); // Usamos startMonthIndex ajustado

    // Reajustamos al último día del mes si es necesario
    endDate.setDate(
      Math.min(
        startDate.getDate(),
        new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
      )
    );

    const adjustedDate = getAdjustedDate(endDate);
    const endMonthName = getMonthName(adjustedDate.monthIndex);

    return `${startMonthName}-${startYear} a ${endMonthName}-${adjustedDate.year}`;
  }

  static calculateMonthsInRange = (startMonth, endMonth) => {
    const [startMonthValue, startYear] = startMonth.split('-');
    const [endMonthValue, endYear] = endMonth.split('-');

    const startIndex = getMonthIndex(startMonthValue);
    const endIndex = getMonthIndex(endMonthValue);

    if (startIndex === "" || endIndex === "") {
        return "Mes inválido proporcionado.";
    }

    const startYearInt = parseInt(startYear);
    const endYearInt = parseInt(endYear);

    // Calcula la diferencia en meses teniendo en cuenta los años
    let monthCount = (endYearInt - startYearInt) * 12 + (endIndex - startIndex + 1);

    return monthCount;
};


  static addMonths(date, months) {
    const result = new Date(date);
    const day = result.getDate();
    result.setMonth(result.getMonth() + months);

    // Ajustar el día si el mes resultante no tiene el día específico
    if (result.getDate() < day) {
      result.setDate(0);
    }

    return result;
  }

  static evaluateFullObjetct = (obj) => {
    if (
      !isNull(obj) &&
      !isUndefined(obj) &&
      !isEmpty(obj) &&
      isObject(obj) &&
      Object.keys(obj).length > 0 &&
      Object.values(obj).length > 0
    ) {
      return true;
    }
    return false;
  };

  static evaluateArray = (array) => {
    if (array && isArray(array) && array?.length > 0) {
      return true;
    }
    return false;
  };

  static hasPermission = (permisson) => {
    const userInfo = getRequestUserInfo();
    if (this.evaluateFullObjetct(userInfo)) {
      const accesses = userInfo.accesses;
      if (accesses?.length > 0) {
        const permission = accesses.flatMap((role) => role.permissions);
        const hasPermission = permission.some((x) => x.name === permisson);
        return hasPermission;
      }
    }
    return false;
  };

  static formateLps = (value) => {
    const formatter = new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const formattedValue = formatter.format(value || 0);
    const response = formattedValue.replace(/[^\d.,\s]+/, "L");

    return response;
  };

  /**
   * Formats a date or date string using the "MMM, DD YY" format.
   *
   * @param {Date|string} value - The date or date string to be formatted.
   * @returns {string} - The formatted date string or an empty string if the input is invalid.
   *
   * @example
   * const exampleDate = new Date();
   * const formattedDate = ClassName.FormatDate(exampleDate);
   * console.log(formattedDate); // e.g., "Jan, 01 22"
   *
   * @note The function parses date strings, handles cases where the input is a string, and uses the moment library for formatting.
   */
  static FormatDate(value) {
    let date = null;

    if (_.isString(value) && value) {
      date = value.split("/");
      const filter = date.filter((d) => d === "NaN");
      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    return date ? moment(date).format("MMM, DD YY") : "";
    // // return date ? moment(date).format("YY, MMM, DD") : "";
  }

  static FormatDateMonth(value) {
    let date = null;

    if (_.isString(value) && value) {
      date = value.split("/");
      const filter = date.filter((d) => d === "NaN");
      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    if (date) {
      const monthIndex = date.getMonth();
      const monthName = getMonthName(monthIndex);
      const year = moment(date).format("YYYY");
      return `${monthName}, ${year}`;
    }

    return "";
  }
}
