import styles from "./price_policy.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
import DelActionModal from "@/components/crm/order/order_detail/order_detail_action_modal/delete_file_attach_action_mdal";

export default function OrderDetailAttachActionTable() {
  const [isDelOpen, setIsDelOpen] = useState(false);

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <Link href="/customer/contact/edit/">
            <i className="bi bi-download"></i> Tải xuống
          </Link>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => setIsDelOpen(true)}>
          <i className="bi bi-trash3"></i> Xóa
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <Dropdown menu={{ items }}>
          <button style={{ justifyContent: "center" }}>
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
    </>
  );
}
