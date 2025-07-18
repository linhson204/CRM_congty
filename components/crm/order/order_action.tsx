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

export default function OrderAction({
  isSelectedRow,
  bodyAPI,
  fetchAPIEdit,
  link ="/"
}: any) {
  const [isOpenOrderBrowsing, setIsOpenOrderBrowsing] = useState(false);
  const [isOpenDeny, setIsOpenDeny] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);

  const handleApiReq = async (type: string, data = {}) => {
    const body = {
      ...bodyAPI?.filter((record) => record.typeAPI === type)[0],
      ...data,
    };

    const apiPromises = isSelectedRow?.map((items) =>
      fetchAPIEdit(items?._id, body)
    );

    try {
      await Promise.all(apiPromises);
    } catch (error) {
      console.error("Có lỗi xảy ra trong quá trình xử lý yêu cầu API", error);
    }
  };

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "order_browsing") {
      setIsOpenOrderBrowsing(true);
    }
    if (type === "deny") {
      setIsOpenDeny(true);
    }
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "cancel") {
      setIsOpenCancel(true);
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
    <div className={styles.div__thaotac}>
      <div>
        <label>Đã chọn:</label>
        <b className={styles.checked_count}></b>
      </div>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        disabled={isSelectedRow?.length == 0}
      >
        <button
          className={styles.button_thaotac}
          style={{
            background: isSelectedRow?.length == 0 ? "#e6e6ee" : "#ffff",
          }}
        >
          <img src="/crm/3_cham.png" />
          Thao tác
        </button>
      </Dropdown>
      {/* <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        disabled={false}
        className={!isSelectedRow ? "opacity" : ""}
        trigger={[isSelectedRow ? "hover" : "contextMenu"]}
      >
        <button className={styles.button_thaotac}>
          <img src="/crm/3_cham.png" />
          Thao tác
        </button>
      </Dropdown> */}

      <OrderBrowsingModal
        handleApiReq={handleApiReq}
        record={isSelectedRow}
        isModalCancel={isOpenOrderBrowsing}
        setIsModalCancel={setIsOpenOrderBrowsing}
      />

      <DenyActionModal
        handleApiReq={handleApiReq}
        isModalCancel={isOpenDeny}
        setIsModalCancel={setIsOpenDeny}
      />

      <DelActionModal
        handleApiReq={handleApiReq}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />

      <CancelActionModal
        handleApiReq={handleApiReq}
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
      />

      <ShareActionModal
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />

      <HandOverActionModal
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />
    </div>
  );
}
