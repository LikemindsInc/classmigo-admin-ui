export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://classmigo.herokuapp.com/api/v1/";
export const ADMIN_BASE_URL = "admin";

export const APP_ROLES = ["MANAGER", "TEACHER", "SYSTEM_ADMIN"];
export const WEEK_OPTIONS = [
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
  {
    label: 5,
    value: 5,
  },
  {
    label: 6,
    value: 6,
  },
];


export const SUBSCRIPTION_TYPES = [
  {
    label: "Free",
    value: "FREE"
  },
  {
    label: "Free For 7 Days",
    value: "FREE_7DAYS"
  },
  {
    label: "1 Month",
    value: "1_MONTH_PER_CLASS"
  },
  {
    label: "3 Months",
    value: "3_MONTH_PER_CLASS"
  },
  {
    label: "6 Months",
    value: "6_MONTH_PER_CLASS"
  },
]



export const PAYMENT_DATES = [
  {
    label: "Today",
    value: "TODAY"
  },
  {
    label: "This Week",
    value: "THIS_WEEK"
  },
  {
    label: "This Month",
    value: "THIS_MONTH"
  },
  {
    label: "This Year",
    value: "THIS_YEAR"
  },
  {
    label: "All Time",
    value: "ALL_TIME"
  },
]