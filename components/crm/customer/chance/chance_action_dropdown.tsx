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
import SharingCustomerModal from "../../chance/chance_share_action_mdal";

const ChanceActionDropDown: React.FC = ({ idRow = "row" }: any) => {
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
        <Link href="/order/add" className="btn-huy flex-start">
          <i className="bi bi-cart"></i>
          Thêm đơn hàng
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/quote/add" className="btn-huy flex-start">
          <i
            className="bi bi-currency-dollar"
            style={{
              display: "block",
              marginRight: "3px",
              border: "solid 1px black",
            }}
          ></i>
          Thêm báo giá
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalCancel(true)}
        >
          <i className="bi bi-reply"></i>
          Chia sẻ
        </button>
      ),
    },
    {
      key: "4",
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
          Bàn giao công việc
        </button>
      ),
    },
    {
      key: "5",
      label: (
        <Link href={`update`}>
          <button className="btn-huy flex-start">
            <Image width={16} height={16} src="/crm/edit.svg" alt="check" />
            Chỉnh sửa
          </button>
        </Link>
      ),
    },
    {
      key: "6",
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

      <HandeOverModal
        isModalCancel={isOpenModalUpdateStatus}
        setIsModalCancel={setIsOpenModalUpdateStatus} listNV={undefined}      />

      <SharingCustomerModal
        isModalCancel={isOpenModalCancel}
        setIsModalCancel={setIsOpenModalCancel}
      />

      <ProductReturnDeclineModal
        isModalCancel={isOpenModalDecline}
        setIsModalCancel={setIsOpenModalDecline}
      />

      <DelActionModalProductReturn
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
      />

      <CancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn xoá cơ hội này không?"}
        title={"Xác nhận xoá cơ hội"}
        link={`customer/chance/list/${id}`}
      />
    </>
  );
};

export default ChanceActionDropDown;
