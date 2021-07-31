export const getFullYear = (date) => {
  const newDate = new Date(date);

  return newDate.getFullYear();
};

export const getMonthName = (date) => {
  const newDate = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[newDate.getMonth()];
};

export const getDaysName = (date) => {
  const newDate = new Date(date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[newDate.getDay()];
};

export const getDate = (date) => {
  const newDate = new Date(date);

  return newDate.getDate();
};
