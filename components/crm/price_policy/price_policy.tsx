import TableDataPricePolicy from "../table/table-price-policy";
import PricePolicyInputGroup from "./price_policy_input_group";
import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";

export default function PricePolicy() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Chính sách giá");
    setShowBackButton(false);
    setCurrentPath("/price_policy");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <div ref={mainRef} className={styleHome.main}>
      <PricePolicyInputGroup isSelectedRow={isSelectedRow} />
      <TableDataPricePolicy
        setSelected={setIsSelectedRow}
        setNumberSelected={setNumberSelected}
      />
    </div>
  );
}
