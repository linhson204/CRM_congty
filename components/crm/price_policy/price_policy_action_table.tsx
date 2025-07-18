import styles from "./price_policy.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionPricePolicy } from "../ultis/consntant";
import { useState } from "react";
import DelActionModal from "./price_policy_action_modal/deltete_action_mdal";

export default function PricePolicyActionTable() {
  const [isDelOpen, setIsDelOpen] = useState(false);

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label :  ( <><Link href="update">Chỉnh sửa</Link></> ),
    },
    {
      key: "2",
      label: (
        <div onClick={()=>setIsDelOpen(true)}>Xóa</div>
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
