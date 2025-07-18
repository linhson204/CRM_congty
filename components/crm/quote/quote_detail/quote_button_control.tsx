// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./quote_detail.module.css";
import { useContext, useState } from "react";
import { Switch } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import OrderBrowsingModal from "@/components/crm/quote/quote_action_modal/quote_browsing_action_mdal";
import DenyActionModal from "@/components/crm/quote/quote_action_modal/deny_action_mdal";
import DelActionModal from "@/components/crm/quote/quote_action_modal/delete_action_mdal";
import CancelActionModal from "@/components/crm/quote/quote_action_modal/cancel_action_mdal";
import ShareActionModal from "@/components/crm/quote/quote_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/quote/quote_action_modal/handover_action_mdal";
import { dataActionQuote } from "@/components/crm/ultis/consntant";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import StatusModal from "../quote_action_modal/status-mdal";
import { useRouter } from "next/router";
import ModalRole from "../quote_role/quote_role_modal";
import { QuoteContext } from "../quoteContext";

export default function AddButtonControl({ isSelectedRow }: any) {
  const { checkRoleFull, recordId, checkRoleEdit } = useContext(QuoteContext)
  const [isOpenOrderBrowsing, setIsOpenOrderBrowsing] = useState(false);
  const [isOpenDeny, setIsOpenDeny] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [record, setRecode] = useState();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [allkey, setAllkey] = useState();

  const [roleOpen, setRoleOpen] = useState(false)

  const handleClickAction = async (e: any, type: string | undefined) => {
    if (type === "order_browsing") {
      setIsOpenOrderBrowsing(true);
    }
    if (type === "deny") {
      setIsOpenDeny(true);
    }
    if (type === "update-status") {
      setIsOpenUpdate(true);
    }
    if (type === "send") {
      setIsOpenSend(true);
    }
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "cancel") {
      setIsOpenCancel(true);
    }
    if (type === "share") {
      const isAllowed = await checkRoleFull(recordId)
      if (isAllowed) {
        setIsOpenShare(true);
      } else {
        setRoleOpen(true)
      }
      // setIsOpenShare(true);
    }
    if (type === "hand_over") {
      const isAllowed = await checkRoleFull(recordId)
      if (isAllowed) {
        setIsOpenHandOver(true);
      } else {
        setRoleOpen(true)
      }
      // setIsOpenHandOver(true);
    }
  };
  const router = useRouter();
  const path = router.query;
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionQuote.length; i++) {
    // Ẩn các nút đã hiện ở vị trí khác
    if (["edit", "delete", "update-status", "send", "download", "printer"].includes(dataActionQuote[i].type)) {
      continue;
    }
    items.push({
      key: i,
      label: (
        <>
          {dataActionQuote[i].link !== "#" ? (
            <Link href={dataActionQuote[i].link} className="flex-start-btn">
              <i className={dataActionQuote[i].img}></i>
              {dataActionQuote[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionQuote[i].type)}
            >
              <i className={dataActionQuote[i].img}></i>
              {dataActionQuote[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  const onChange = (checked: boolean) => { };
  return (
    <div>
      <div className={`${styles.main}`}>
        <div className={styles.row_input}>
          <div className={`${styles.main__control_btn} ${styles.flex_end} `}>
            <div className={`${styles.flex_1}`}>
              {/* <Switch defaultChecked onChange={onChange} /> */}
            </div>
            <div>
              <button
                style={{ width: 140 }}
                type="button"
                onClick={async () => {
                  const isAllowed = await checkRoleEdit(recordId)
                  if (isAllowed) {
                    setIsOpenUpdate(true);
                  } else {
                    setRoleOpen(true)
                  }
                  // setIsOpenUpdate(true);
                }}
                className={`${styles.btn_deny} flex_align_center`}
              >
                <i className="bi bi-arrow-up-circle"></i>
                Tình trạng
              </button>
            </div>
            <Link href={`/quote/edit/${path.id}`}>
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
                onClick={async () => {
                  const isAllowed = await checkRoleFull(recordId)
                  if (isAllowed) {
                    setIsDelOpen(true);
                  } else {
                    setRoleOpen(true)
                  }
                  // setIsDelOpen(true);
                }}
                className={`${styles.btn_delete} flex_align_center`}
              >
                &nbsp;&nbsp;&nbsp;
                <i className="bi bi-trash3"></i>
                Xóa
              </button>
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
        record={path.id}
        allkey={[]}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />

      <CancelActionModal
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
      />

      <ShareActionModal
        record={path.id}
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
      <StatusModal
        record={path.id}
        allkey={[]}
        isModalCancel={isOpenUpdate}
        setIsModalCancel={setIsOpenUpdate}
      />
      <HandOverActionModal
        record={record}
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />

      <ModalRole
        modal1Open={roleOpen}
        setModal1Open={setRoleOpen}
        title="Bạn không có quyền để thực hiện thao tác này"
        link=""
      />
    </div>
  );
}
