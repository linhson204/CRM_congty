import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { useState } from "react";
import DelActionModal from "@/components/crm/bill/bill_detail/bill_detail_action_modal/delete_file_attach_action_mdal";
import Image from "next/image";

export default function BillDetailAttachActionTable() {
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
          <Link href="/bill/detail/">
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
            <Image
              alt="thao_tac"
              width={16}
              height={16}
              src="/crm/3_cham.png"
            />
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
