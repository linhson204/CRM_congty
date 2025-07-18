import styles from "./price_policy.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
import DelActionModal from "../supplier/modal/supplier_delete_modal";
import ModalCompleteStep from "@/components/crm/supplier/supplier_steps/complete_modal";
import ModalSupplierGroup from "./modal/modal_group";

export default function SupplierActionTable() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [modalCompleteOpen, setModalCompleteOpen] = useState(false);

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpenModal(true)}
        style={{
          padding: "7px 12px",
          fontSize: "14px",
          borderRadius: "30px 0 0 30px",
          color: "#4C5BD4;",
          border: "1px solid #4C5BD4;",
        }}
      >
        Sửa
      </button>
      <button
        onClick={() => setIsDelOpen(true)}
        style={{
          padding: "7px 12px",
          fontSize: "14px",
          borderRadius: "0 30px 30px 0",
          color: "#FF3333;",
          border: "1px solid #FF3333;",
        }}
      >
        Xóa
      </button>

      {
        <DelActionModal
          isModalCancel={isDelOpen}
          setIsModalCancel={setIsDelOpen}
        />
      }
      <ModalSupplierGroup
        isShowModalAdd={isOpenModal}
        setClose={setIsOpenModal}
      />
    </>
  );
}
