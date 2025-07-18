import React, { useState, useRef } from "react";
import styles from "../marketing.module.css";
import Link from "next/link";
import DelActionModal from "./delete_action_mdal";

export default function CustomerListInputGroup({
  isSelectedRow,
  numberSelected,
  clearOption,
  chooseAllOption,
}: any) {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  return (
    <>
      <div className={`${styles.main__control} ${styles.customer_custom}`}>
        <div
          className={`${styles.main__control_add}`}
          style={{ width: "100%" }}
        >
          <Link href="update_form">
            <button type="button" className={styles.btn_edit}>
              <img src="/crm/edit_kh.svg" style={{ margin: "-3px 5px" }} />
              Chỉnh sửa
            </button>
          </Link>

          <button
            type="button"
            className={styles.btn_delete}
            onClick={() => setIsDelOpen(true)}
          >
            <img
              src="/crm/delete_kh.svg"
              alt="hungha365.com"
              style={{ margin: "-3px 5px" }}
            />
            Xoá
          </button>
          {
            <DelActionModal
              isModalCancel={isDelOpen}
              setIsModalCancel={setIsDelOpen}
            />
          }
        </div>
      </div>
    </>
  );
}
