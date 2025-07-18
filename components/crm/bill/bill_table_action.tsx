import styles from "./order.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionBill } from "../ultis/consntant";
import { useState } from "react";
import OrderBrowsingModal from "@/components/crm/bill/bill_action_modal/bill_browsing_action_mdal";
import DenyActionModal from "@/components/crm/bill/bill_action_modal/deny_action_mdal";
import DelActionModal from "@/components/crm/bill/bill_action_modal/delete_action_mdal";
import CancelActionModal from "@/components/crm/bill/bill_action_modal/cancel_action_mdal";
import ShareActionModal from "@/components/crm/bill/bill_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/bill/bill_action_modal/handover_action_mdal";
import Image from "next/image";

export default function OrderActionTable(props: any) {
  const { record } = props;
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
    if (type === "bill_browsing") {
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
  for (let i = 0; i < dataActionBill.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionBill[i].link !== "#" ? (
            <Link href={dataActionBill[i].link} className="flex-start-btn">
              <i className={dataActionBill[i].img}></i>
              {dataActionBill[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionBill[i].type)}
            >
              <i className={dataActionBill[i].img}></i>
              {dataActionBill[i].name}
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
            <Image
              width={16}
              height={16}
              alt="thao_tac"
              src="/crm/3_cham.png"
            />
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
