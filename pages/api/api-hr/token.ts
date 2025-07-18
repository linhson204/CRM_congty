import { getCookie } from 'cookies-next';
import Cookies from "js-cookie";
export function getToken(token) {
  const isToken = Cookies.get(token)
  return isToken
}


export function getTokenFromCookie(cookieString) {
  const cookieParts = cookieString.split('=');
  if (cookieParts.length === 2) {
      return cookieParts[1];
  } else {
      return null;
  }
}