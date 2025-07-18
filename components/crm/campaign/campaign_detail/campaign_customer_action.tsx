import styles from "@/components/crm/campaign/campaign.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataCampaginCustomerAction } from "@/components/crm/ultis/consntant";
import { useState } from "react";
import OrderBrowsingModal from "@/components/crm/order/order_action_modal/order_browsing_action_mdal";
import DenyActionModal from "@/components/crm/order/order_action_modal/deny_action_mdal";
import CancelActionModal from "@/components/crm/order/order_action_modal/cancel_action_mdal";
import ShareActionModal from "@/components/crm/order/order_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_assignment_action_mdal";
import StatusActionModal from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_status_action_mdal";
import CallActionModal from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_call_action_mdal";
import DelActionModalCusCampaign from "./campaign_detail_mdal/del_cus_campaign_mdal";

export default function CampaignCusAction({
  isSelectedRow,
  fetchAPIEdit,
  link,
  bodyAPI,
}: any) {
  const [isOpenOrderBrowsing, setIsOpenOrderBrowsing] = useState(false);
  const [isOpenDeny, setIsOpenDeny] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenCall, setIsOpenCall] = useState(false);

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "add_calendar") {
      // setIsOpenOrderBrowsing(true);
    }
    if (type === "add_care") {
      // setIsOpenDeny(true);
    }
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "call") {
      // setIsOpenCall(true);
    }
    if (type === "hand_over") {
      setIsOpenHandOver(true);
    }
    if (type === "status") {
      setIsOpenStatus(true);
    }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataCampaginCustomerAction.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataCampaginCustomerAction[i].link !== "#" ? (
            <Link href={link} className="flex-start-btn">
              <i className={dataCampaginCustomerAction[i].img}></i>
              {dataCampaginCustomerAction[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataCampaginCustomerAction[i].type)
              }
            >
              <i className={dataCampaginCustomerAction[i].img}></i>
              {dataCampaginCustomerAction[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  const handleApiReq = async (type: string, data = {}) => {
    let body = {
      ...bodyAPI?.filter((record) => record.typeAPI === type)[0],
      ...data,
    };

    const apiPromises = isSelectedRow?.map((items) =>
      fetchAPIEdit(items?.cus_id, body)
    );

    try {
      await Promise.all(apiPromises);
    } catch (error) {
      console.error("Có lỗi xảy ra trong quá trình xử lý yêu cầu API", error);
    }
  };

  return (
    <div className={styles.div__thaotac}>
      <div>
        <label>Đã chọn:</label>
        <b className={styles.checked_count}>{isSelectedRow?.length || 0}</b>
      </div>
      <Dropdown
        disabled={isSelectedRow?.length == 0}
        menu={{ items }}
        placement="bottomLeft"
      >
        <button
          className={styles.button_thaotac}
          style={{
            background: isSelectedRow?.length == 0 ? "#e6e6ee" : "#ffff",
          }}
        >
          <img src="/crm/3_cham.png" alt="hungha365" />
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
        isModalCancel={isOpenOrderBrowsing}
        setIsModalCancel={setIsOpenOrderBrowsing}
      />

      <DenyActionModal
        isModalCancel={isOpenDeny}
        setIsModalCancel={setIsOpenDeny}
      />

      <DelActionModalCusCampaign
        handleApiReq={handleApiReq}
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

      <CallActionModal
        isModalCancel={isOpenCall}
        setIsModalCancel={setIsOpenCall}
      />

      <StatusActionModal
        isModalCancel={isOpenStatus}
        setIsModalCancel={setIsOpenStatus}
        rowSelected={isSelectedRow}
      />

      <HandOverActionModal
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
        rowSelected={isSelectedRow}
      />
    </div>
  );
}
