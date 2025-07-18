import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import { useRouter } from "next/router";

const DocumentActionDropDown: React.FC = ({ idRow = "row" }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalUpdateStatus(true)}
        >
          <i className="bi bi-download"></i>
          Tải xuống
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
        content={"Bạn có chắc chắn muốn xóa tài liệu đính kèm 456.PNG?"}
        title={"Xóa tài liệu đính kèm"}
        link={`#`}
      />
    </>
  );
};

export default DocumentActionDropDown;
