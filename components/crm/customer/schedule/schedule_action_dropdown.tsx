import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import DelActionModalProductReturn from "@/components/crm/product_return/product_return_modal/product_return_del_mdal";
import ProductReturnCancelModal from "@/components/crm/product_return/product_return_modal/product_return_cancel_mdal";
import ProductReturnDeclineModal from "@/components/crm/product_return/product_return_modal/product_decline_action_mdal";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import { useRouter } from "next/router";
import HandeOverModal from "@/components/crm/potential/potential_action_modal/hand_over_mdal";
import SharingCustomerModal from "../modal/sharing_modal";
import ScheduleModalCancel from "./schedule_modal_cancel";
import ScheduleModalComplete from "./schedule_modal_complete";
import ScheduleModalAddOrEdit from "./schedule_add_or_edit";

const ScheduleActionDropDown: React.FC = ({ idRow = "row" }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalCheck, setIsOpenModalCheck] = useState(false);
  const [isOpenModalDecline, setIsOpenModalDecline] = useState(false);
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button className="btn-huy flex-start">
          <i className="bi bi-telephone"></i>
          Gọi điện
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalCheck(true)}
        >
          <i className="bi bi-check2-circle"></i>
          Hoàn thành
        </button>
      ),
    },
    {
      key: "6",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalCancel(true)}
        >
          <i className="bi bi-reply"></i>
          Hủy lịch hẹn
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalUpdateStatus(true)}
        >
          <Image width={16} height={16} src="/crm/edit.svg" alt="check" />
          Chỉnh sửa
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalDel(true)}
        >
          <Image width={16} height={16} src="/crm/del.svg" alt="check" />
          Xoá
        </button>
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            className="custom_dropdown_product "
          >
            <button className="action_table">
              <img src="/crm/3_cham.png" />
              Thao tác
            </button>
          </Dropdown>
        </Space>
      </Space>

      <ScheduleModalComplete
        isModalCancel={isOpenModalCheck}
        setIsModalCancel={setIsOpenModalCheck}
      />

      <ScheduleModalCancel
        isModalCancel={isOpenModalCancel}
        setIsModalCancel={setIsOpenModalCancel}
      />

      <ScheduleModalAddOrEdit
        isModalCancel={isOpenModalUpdateStatus}
        setIsModalCancel={setIsOpenModalUpdateStatus}
        title={"Chỉnh sửa lịch hẹn"}
        content="Cập nhật lịch hẹn thành công!"
      />

      <CancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn xóa lịch hẹn này không ?"}
        title={"Xác nhận xóa lịch hẹn"}
        link={``}
      />
    </>
  );
};

export default ScheduleActionDropDown;
