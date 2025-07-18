"use client";
import { Middleware } from "redux";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  // console.log("Action:", action);
  const result = next(action);
  const nextState = store.getState();
  // console.log(" State:", store.getState()?.navbar?.activeNavbarId);
  localStorage.setItem(
    "activeNavbarId",
    store.getState()?.navbar?.activeNavbarId
  );
  localStorage.setItem("reduxState", JSON.stringify(nextState));
  return result;
};

export default localStorageMiddleware;
