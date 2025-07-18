import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import DelActionModal from "@/components/crm/campaign/campaign_delete_action_mdal";

export default function CampaignActionTable(props: any) {
  const { record, handleDelete } = props;
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
          <Link href={`/campaign/edit/${record}`}>
            <i className="bi bi-pencil-square"></i> Chỉnh sửa
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
          <button style={{ justifyContent: "center", color: "#4C5BD4" }}>
            <Image
              src="/crm/3_cham.png"
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
          handleDelete={handleDelete}
          id = {record}
        />
      }
    </>
  );
}
