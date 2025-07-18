import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "../../home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableDataOrder from "@/components/crm/table/table-order";
import CampaignInputGroups from "@/components/crm/campaign/campaign_input_group";
import OrderDetailsInputGroups from "./input_order_group";

export default function OrderDetails() {
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
    setHeaderTitle("Quản lý đơn hàng");
    setShowBackButton(false);
    setCurrentPath("/order/list");
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
      <OrderDetailsInputGroups isSelectedRow={isSelectedRow} />
      <TableDataOrder
        setSelected={setIsSelectedRow}
        setNumberSelected={setNumberSelected}
      />
    </div>
  );
}
