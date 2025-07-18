import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import ProductReturnChecktModal from "./product_return_modal/product_check_action_mdal";
import ProductReturnDeclineModal from "./product_return_modal/product_decline_action_mdal";
import ProductReturnUpdateModal from "./product_return_modal/product_update_action_mdal";
import ProductReturnCancelModal from "./product_return_modal/product_return_cancel_mdal";
import DelActionModalProductReturn from "./product_return_modal/product_return_del_mdal";
import Link from "next/link";

const ProductActionDropDown: React.FC = () => {
  const [isOpenModalCheck, setIsOpenModalCheck] = useState(false);
  const [isOpenModalDecline, setIsOpenModalDecline] = useState(false);
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalCheck(true)}
        >
          <Image width={16} height={16} src="/crm/check.svg" alt="check" />
          Duyệt
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalDecline(true)}
        >
          <Image width={16} height={16} src="/crm/decline.svg" alt="check" />
          Từ chối
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
          <Image width={16} height={16} src="/crm/cancel.svg" alt="check" />
          Huỷ
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
          <Image
            width={16}
            height={16}
            src="/crm/update_status.svg"
            alt="check"
          />
          Cập nhật tình trạng thực hiện
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <Link href="/product_return/update">
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

      <ProductReturnChecktModal
        isModalCancel={isOpenModalCheck}
        setIsModalCancel={setIsOpenModalCheck}
      />
      <ProductReturnDeclineModal
        isModalCancel={isOpenModalDecline}
        setIsModalCancel={setIsOpenModalDecline}
      />

      <ProductReturnCancelModal
        isModalCancel={isOpenModalCancel}
        setIsModalCancel={setIsOpenModalCancel}
      />

      <ProductReturnUpdateModal
        isModalCancel={isOpenModalUpdateStatus}
        setIsModalCancel={setIsOpenModalUpdateStatus}
      />

      <DelActionModalProductReturn
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
      />
    </>
  );
};

export default ProductActionDropDown;
