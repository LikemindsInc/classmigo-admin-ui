export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://classmigo.herokuapp.com/api/v1/";
export const ADMIN_BASE_URL = "admin";

export const APP_ROLES = ["MANAGER", "TEACHER", "ACCOUNTANT", "SYSTEM_ADMIN"];

export const generateWeekoptions = () => {
  const WEEK_OPTIONS = [];
  for (let i: number = 0; i <= 33; i++) {
    WEEK_OPTIONS.push({
      label: i,
      value: i,
    });
  }
  return WEEK_OPTIONS;
};

export const SUBSCRIPTION_TYPES = [
  {
    label: "Free",
    value: "FREE",
  },
  {
    label: "Free For 7 Days",
    value: "FREE_7DAYS",
  },
  {
    label: "1 Month",
    value: "1_MONTH_PER_CLASS",
  },
  {
    label: "3 Months",
    value: "3_MONTH_PER_CLASS",
  },
  {
    label: "6 Months",
    value: "6_MONTH_PER_CLASS",
  },
];

export const PAYMENT_DATES = [
  {
    label: "Today",
    value: "TODAY",
  },
  {
    label: "This Week",
    value: "THIS_WEEK",
  },
  {
    label: "This Month",
    value: "THIS_MONTH",
  },
  {
    label: "This Year",
    value: "THIS_YEAR",
  },
  {
    label: "All Time",
    value: "ALL_TIME",
  },
];
