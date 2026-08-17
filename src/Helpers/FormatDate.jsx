export const getHours = (dateMain) => {
  let date = new Date(dateMain);
  const hour = date.getHours();
  const min = date.getMinutes();
  const seg = date.getSeconds();
  let year = date.getFullYear();
  if (year < 2000) {
    return "";
  }
  const pmOrAm = hour >= 12 ? "pm" : "am";
  let hour12;
  if (Number(hour) > 12) {
    hour12 = Number(hour) - 12;
  } else {
    if (Number(hour) === 0) {
      hour12 = 12;
    } else {
      hour12 = Number(hour);
    }
  }
  let result = `${hour12}:${min}:${seg}  ${pmOrAm}`;
  return result;
};

export const getDate = (dateMain, dateOnly) => {
  let date = dateOnly || new Date(dateMain);
  let year = date.getFullYear();
  if (year < 2000) {
    return "";
  }
  const months = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let formatted_date =
    date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
  return formatted_date;
};

export const getMonth = (dateMain, dateOnly) => {
  let date = dateOnly || new Date(dateMain);
  let year = date.getFullYear();
  if (year < 2000) {
    return "";
  }
  const months = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DECIEMBRE",
  ];
  let monthsResponse = months[date.getMonth()];
  return monthsResponse;
};
