import styles from "./order.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionLichHenQuote } from "../ultis/consntant";
import { useContext, useEffect, useState } from "react";
import QuoteBrowsingModal from "./quote_action_modal/quote_browsing_action_mdal";
import DenyActionModal from "./quote_action_modal/deny_action_mdal";
import DelActionModal from "./quote_action_modal/delete_action_mdal";
import CancelActionModal from "./quote_action_modal/cancel_action_mdal";
import ShareActionModal from "./quote_action_modal/share_action_mdal";
import HandOverActionModal from "./quote_action_modal/handover_action_mdal";
import StatusModal from "./quote_action_modal/status-mdal";
import SendMailModal from "./quote_action_modal/send_mail_mdal";
import CallModal from "./quote_action_modal/complete-mdal";
import CanCel_LichHen_Mdal from "./quote_action_modal/cancel_lichhen_mdal";
import ModalSuaLichhen from "../cskh/modal/modalsualichhen";
import DelLichHenModal from "./quote_action_modal/delete_lich_hen-mdal";
import ModalPotentialEditAppointment from "../potential/mdal_action/modal_appointment_edit";
import { useFormData } from "../context/formDataContext";
import { axiosCRM } from "@/utils/api/api_crm";
import { notifyError, notifyWarning } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import ModalCompleteAppointment from "../potential/mdal_action/modal_complete";

export default function QuoteActionLichHenTable(props: any) {
  const { record, allkey } = props;
  const { handleRecall } = useContext(useFormData);
  const [formComplete, setFormComplete] = useState<any>();
  const [dataRecord, setDataRecord] = useState(record);
  const [cancelContent, setCancelContent] = useState({ reason_cancel: "" });
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOrderBrowsingOpen, setIsOrderBrowsingOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  useEffect(() => {
    setDataRecord(record);
  }, [record._id]);
  const handleAddDB = () => {
    setIsShowModalAdd(false);
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
    if (type === "edit") {
      setIsShowModalAdd(true);
    }
    if (type === "complete") {
      setIsOpenUpdate(true);
    }
    if (type === "send") {
      setIsOpenSend(true);
    }
  };
  const handleDelete = () => {
    axiosCRM
      .post("/dataDeleted/deleteMany", {
        arr_id: [record._id],
        type: 1, //1-> xóa tạm thời, 2-> khôi phục, 3-> xóa vĩnh viễn
        model: "appointment",
      })
      .then((res) => {
        onClose(), handleRecall();
      })
      .catch((err) => notifyError());
  };
  const handleCancel = () => {
    if (!cancelContent.reason_cancel) {
      notifyWarning("Nhập lý do!");
      return false;
    }
    axiosCRM
      .post("/potential/cancelAppointment", {
        id_schedule: record._id,
        ...cancelContent,
      })
      .then((res) => {
        onClose(), handleRecall();
      })
      .catch((err) => notifyError());
  };
  const handleComplete = () => {
    if (!formComplete.content || !formComplete.status) {
      notifyWarning("Nhập đầy đủ thông tin!");
      return false;
    }
    axiosCRM
      .post("/potential/changeStatusAppointment", {
        id_schedule: record._id,
        ...formComplete,
      })
      .then((res) => {
        setFormComplete({});
        onClose(), handleRecall();
      })
      .catch((err) => notifyError());
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionLichHenQuote.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionLichHenQuote[i].link !== "#" ? (
            <Link
              href={`${dataActionLichHenQuote[i].link}/${record}`}
              className="flex-start-btn"
            >
              <i className={dataActionLichHenQuote[i].img}></i>
              {dataActionLichHenQuote[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataActionLichHenQuote[i].type)
              }
            >
              <i className={dataActionLichHenQuote[i].img}></i>
              {dataActionLichHenQuote[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button style={{ justifyContent: "center" }}>
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
      </div>

      {/* Chỉnh sửa */}
      <ModalPotentialEditAppointment
        record={record}
        isShowModalAdd={isShowModalAdd}
        onClose={onClose}
        handleAddDB={handleAddDB}
      />
      {/* Xóa */}
      <DelLichHenModal
        handleDelete={handleDelete}
        record={record?.schedule_name}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      {/* hủy */}
      <CanCel_LichHen_Mdal
        name="reason_cancel"
        handleCancel={handleCancel}
        setCancelContent={setCancelContent}
        cancelContent={cancelContent.reason_cancel}
        record={record?.schedule_name}
        isModalCancel={isCancelOpen}
        setIsModalCancel={setIsCancelOpen}
      />
      {/* Hoàn thành cuộc hẹn */}
      <ModalCompleteAppointment
        handleComplete={handleComplete}
        formData={formComplete}
        setFormData={setFormComplete}
        isModalCancel={isOpenUpdate}
        setIsModalCancel={setIsOpenUpdate}
      />
      <ToastContainer autoClose={2000} />
    </>
  );
}
