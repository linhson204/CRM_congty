import styles from "./order.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionOrderDetailGiveback } from "@/components/crm/ultis/consntant";
import { useState } from "react";
import OrderBrowsingModal from "@/components/crm/order/order_action_modal/order_browsing_action_mdal";
import DenyActionModal from "@/components/crm/order/order_action_modal/deny_action_mdal";
import DelActionModal from "@/components/crm/order/order_action_modal/delete_action_mdal";
import CancelActionModal from "@/components/crm/order/order_action_modal/cancel_action_mdal";
import ShareActionModal from "@/components/crm/order/order_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/order/order_action_modal/handover_action_mdal";

export default function OrderActionTable() {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOrderBrowsingOpen, setIsOrderBrowsingOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "order_browsing") {
      setIsOrderBrowsingOpen(true);
    }
    if (type === "deny") {
      setIsDenyOpen(true);
    }
    if (type === "cancel") {
      setIsCancelOpen(true);
    }
    if (type === "share") {
      setIsOpenShare(true);
    }
    if (type === "hand_over") {
      setIsOpenHandOver(true);
    }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionOrderDetailGiveback.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionOrderDetailGiveback[i].link !== "#" ? (
            <Link
              href={dataActionOrderDetailGiveback[i].link}
              className="flex-start-btn"
            >
              <i className={dataActionOrderDetailGiveback[i].img}></i>
              {dataActionOrderDetailGiveback[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataActionOrderDetailGiveback[i].type)
              }
            >
              <i className={dataActionOrderDetailGiveback[i].img}></i>
              {dataActionOrderDetailGiveback[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <Dropdown menu={{ items }}>
          <button style={{ justifyContent: "center" }}>
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <OrderBrowsingModal
        isModalCancel={isOrderBrowsingOpen}
        setIsModalCancel={setIsOrderBrowsingOpen}
      />
      <DenyActionModal
        isModalCancel={isDenyOpen}
        setIsModalCancel={setIsDenyOpen}
      />
      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      <CancelActionModal
        isModalCancel={isCancelOpen}
        setIsModalCancel={setIsCancelOpen}
      />
      <ShareActionModal
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
      <HandOverActionModal
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />
    </>
  );
}
