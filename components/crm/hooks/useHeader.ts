import { useContext } from "react";
import { NavigateContext } from "../context/navigateContext";

export function useHeader() {
    return useContext(NavigateContext);
  }