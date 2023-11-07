export const ROUTES = {
  // Shopper
  SHOPPER_URL: "/product/*",
  SHOPPER_MAIN: "",
  SHOPPER_INFO: "info",

  // Trader
  TRADER_URL: "/m/*",
  TRADER_LANDING: "",
  TRADER_MAIN: "main",
  TRADER_LOGIN: "login",
  TRADER_CONFIRM: "confirm/:billId",
  TRADER_CREATE: "create",
  TRADER_GETLIST: "list",
  TRADER_SECTION: "section",
  TRADER_SIGN: "sign/:billId",
  TRADER_STATE: "state",

  // Officer
  OFFICER_URL: "/*",
  OFFICER_LOGIN: "/",
  OFFICER_MAIN: "/",
  OFFICER_CREATE: "/create",
  OFFICER_DETAIL: "/detail",
  OFFICER_MANAGE: "/manage",
  OFFICER_STOCK: "/stock",
  OFFICER_NOTICE: "/notice",
};
