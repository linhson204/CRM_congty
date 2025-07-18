// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./order_detail.module.css";
import { useState } from "react";
import { Switch } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import OrderBrowsingModal from "@/components/crm/order/order_action_modal/order_browsing_action_mdal";
import DenyActionModal from "@/components/crm/order/order_action_modal/deny_action_mdal";
import DelActionModal from "@/components/crm/order/order_action_modal/delete_action_mdal";
import CancelActionModal from "@/components/crm/order/order_action_modal/cancel_action_mdal";
import ShareActionModal from "@/components/crm/order/order_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/order/order_action_modal/handover_action_mdal";
import { dataActionOrder } from "@/components/crm/ultis/consntant";

export default function AddButtonControl({ isSelectedRow }: any) {
  const [isOpenOrderBrowsing, setIsOpenOrderBrowsing] = useState(false);
  const [isOpenDeny, setIsOpenDeny] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);

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
            <Link href={dataActionOrder[i].link} className="flex-start-btn">
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

  const onChange = (checked: boolean) => {};
  return (
    <div>
      <div className={`${styles.main}`}>
        <div className={styles.row_input}>
          <div className={`${styles.main__control_btn} ${styles.flex_end} `}>
            <div className={`${styles.flex_1}`}>
              <Switch defaultChecked onChange={onChange} />
              &nbsp;Ẩn dữ liệu trống
            </div>

            <div className={styles.leftIP}>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenDeny(true);
                  }}
                  className={`${styles.btn_deny} flex_align_center`}
                >
                  &nbsp;
                  <i className="bi bi-x-circle"></i>
                  Từ chối
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenOrderBrowsing(true);
                  }}
                  className={`${styles.btn_browse} flex_align_center`}
                >
                  &nbsp;&nbsp;
                  <i className="bi bi-check2-circle"></i>
                  Duyệt
                </button>
              </div>
              <Link href="/order/edit">
                <button
                  type="button"
                  className={`${styles.btn_edit} flex_align_center`}
                >
                  <i className="bi bi-pencil-square"></i>
                  Chỉnh sửa
                </button>
              </Link>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDelOpen(true);
                  }}
                  className={`${styles.btn_delete} flex_align_center`}
                >
                  &nbsp;&nbsp;&nbsp;
                  <i className="bi bi-trash3"></i>
                  Xóa
                </button>
              </div>
            </div>

            <Dropdown menu={{ items }} placement="bottomLeft">
              <button className={`${styles.btn_execute} flex_align_center`}>
                <img src="/crm/3_cham.png" />
                Thao tác
              </button>
            </Dropdown>
          </div>
        </div>
      </div>

      <OrderBrowsingModal
        isModalCancel={isOpenOrderBrowsing}
        setIsModalCancel={setIsOpenOrderBrowsing}
      />

      <DenyActionModal
        isModalCancel={isOpenDeny}
        setIsModalCancel={setIsOpenDeny}
      />

      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />

      <CancelActionModal
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
