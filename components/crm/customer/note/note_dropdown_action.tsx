import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import DelActionModalContactCustomer from "../contact/delete_action_modal";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import NoteModalAddOrEdit from "./note_mdal_add";

const NoteActionDropDown: React.FC<any> = () => {
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const items: MenuProps["items"] = [
    {
      key: "4",
      label: (
        <button
          style={{ display: "flex", gap: 5, fontSize: 15, fontWeight: 900 }}
          onClick={() => setIsOpenModalUpdateStatus(true)}
        >
          <i className="bi bi-pencil-square"></i> <p>Chỉnh sửa</p>
        </button>
      ),
    },
    {
      key: "5",
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

      <CancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn xóa ghi chú?"}
        title={"Xóa ghi chú"}
        link={"#"}
      />
      <NoteModalAddOrEdit
        isModalCancel={isOpenModalUpdateStatus}
        setIsModalCancel={setIsOpenModalUpdateStatus}
        title={"Chỉnh sửa ghi chú"}
        content={"Chỉnh sửa ghi chú thành công"}
      />
    </>
  );
};

export default NoteActionDropDown;
