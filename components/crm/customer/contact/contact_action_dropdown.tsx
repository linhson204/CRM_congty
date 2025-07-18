import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import DelActionModalContactCustomer from "./delete_action_modal";
import { useRouter } from "next/router";

const ContactActionDropDown: React.FC<any> = () => {
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const items: MenuProps["items"] = [
    {
      key: "4",
      label: (
        <Link href={`customer/contact/edit/${id}`}>
          <button className="btn-huy flex-start">
            <Image width={16} height={16} src="/crm/edit.svg" alt="check" />
            Chỉnh sửa
          </button>
        </Link>
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

      {/* <ProductReturnUpdateModal
        isModalCancel={isOpenModalUpdateStatus}
        setIsModalCancel={setIsOpenModalUpdateStatus}
      /> */}

      <DelActionModalContactCustomer
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        id={id}
      />
    </>
  );
};

export default ContactActionDropDown;
