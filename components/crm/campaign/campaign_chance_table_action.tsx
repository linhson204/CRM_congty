import styles from "./price_policy.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionPricePolicy } from "@/components/crm/ultis/consntant";
import { useState } from "react";
import Image from "next/image";
import DelActionModal from "@/components/crm/campaign/campaign_delete_action_mdal";
import ModalCompleteStep from "@/components/crm/campaign/campaign_steps/complete_modal";

export default function CampaignChanceActionTable(props: any) {
  const { handleDel, id } = props;
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [modalCompleteOpen, setModalCompleteOpen] = useState(false);

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
          <Link href={`#`}>
            <i className="bi bi-pencil-square"></i> Chỉnh sửa
          </Link>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={async () => {
            setIsDelOpen(true);
          }}
        >
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
            <Image
              src="/crm/bacham_xanh.svg"
              alt="hungha365.com"
              width={15}
              height={15}
            />
            Thao tác
          </button>
        </Dropdown>
      </div>
      {
        <DelActionModal
          isModalCancel={isDelOpen}
          setIsModalCancel={setIsDelOpen}
          handleDelete={handleDel}
        />
      }
    </>
  );
}
