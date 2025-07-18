import styles from "./order.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionOrder } from "../ultis/consntant";
import { useState } from "react";
import OrderBrowsingModal from "./order_action_modal/order_browsing_action_mdal";
import DenyActionModal from "./order_action_modal/deny_action_mdal";
import DelActionModal from "./order_action_modal/delete_action_mdal";
import CancelActionModal from "./order_action_modal/cancel_action_mdal";
import ShareActionModal from "./order_action_modal/share_action_mdal";
import HandOverActionModal from "./order_action_modal/handover_action_mdal";

export default function OrderActionTable(props: any) {
  const { record, fetchAPIEdit, bodyAPI, link = "/order/edit" } = props;
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOrderBrowsingOpen, setIsOrderBrowsingOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);

  const handleApiReq = async (type: string, data = {}) => {
    const body = {
      ...bodyAPI?.filter((record) => record.typeAPI === type)[0],
      ...data,
    };
    await fetchAPIEdit(record?._id, body);
  };

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
  for (let i = 0; i < dataActionOrder.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionOrder[i].link !== "#" ? (
            <Link href={link} className="flex-start-btn">
              <i className={dataActionOrder[i].img}></i>
              {dataActionOrder[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionOrder[i].type)}
            >
              <i className={dataActionOrder[i].img}></i>
              {dataActionOrder[i].name}
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
          <button
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              margin: "auto",
            }}
          >
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <OrderBrowsingModal
        handleApiReq={handleApiReq}
        record={[record]}
        isModalCancel={isOrderBrowsingOpen}
        setIsModalCancel={setIsOrderBrowsingOpen}
      />
      <DenyActionModal
        handleApiReq={handleApiReq}
        record={[record]}
        isModalCancel={isDenyOpen}
        setIsModalCancel={setIsDenyOpen}
      />
      <DelActionModal
        handleApiReq={handleApiReq}
        record={[record]}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      <CancelActionModal
        handleApiReq={handleApiReq}
        record={[record]}
        isModalCancel={isCancelOpen}
        setIsModalCancel={setIsCancelOpen}
      />
      <ShareActionModal
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
      <HandOverActionModal
        handleApiReq={handleApiReq}
        record={[record]}
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />
    </>
  );
}
