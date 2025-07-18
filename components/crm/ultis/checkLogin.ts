import Cookies from "js-cookie";
import router from "next/router";

export const checkAndRedirectToHomeIfNotLoggedIn = () => {
  const acc_token = Cookies.get("token_base365");
  const rf_token = Cookies.get("rf_token");
  const role = Cookies.get("role");
  if (!acc_token || !rf_token || !role) {
    if (router.pathname !== "/") {
      router.push("/");
    }
    return false;
  }
  return true;
};

export const checkHomeIfLoggedIn = () => {
  const acc_token = Cookies.get("token_base365");
  const rf_token = Cookies.get("rf_token");
  const role = Cookies.get("role");

  if (acc_token && rf_token && role) {
    if (router.pathname === "/") {
      router.push("/home");
    }
    return false;
  }
  return true;

};