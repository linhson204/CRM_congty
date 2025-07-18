import React, { useState } from "react";
import styles from "@/components/crm/potential/potential.module.css";
import Image from "next/image";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import Link from "next/link";
import { Switch } from "antd";
import ProductReturnChecktModal from "../product_return_modal/product_check_action_mdal";
import ProductReturnDeclineModal from "../product_return_modal/product_decline_action_mdal";
import ProductReturnCancelModal from "../product_return_modal/product_return_cancel_mdal";
export default function ProductReturnDetailBtns({ id }: any) {
  const [isOpenModalCheck, setIsOpenModalCheck] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [isOpenModalDecline, setIsOpenModalDecline] = useState(false);

  function handleChaneSwitch(): void {}

  return (
    <>
      <div
        className={styles.main__control}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Switch onChange={handleChaneSwitch} />
          <span> Ẩn dữ liệu trống</span>
        </div>
        <div
          className={`${styles.main__control_btn}`}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "5px",
            gap: "15px",
          }}
        >
          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              onClick={() => setIsOpenModalCancel(true)}
              style={{ background: "#ABABAB" }}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image
                alt="+"
                width={16}
                height={16}
                src="/crm/icon_cancel.svg"
              />
              Hủy bỏ
            </button>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#FFA800" }}
              onClick={() => setIsOpenModalDecline(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image
                alt="+"
                width={16}
                height={16}
                src="/crm/pause_white.svg"
              />
              Từ chối
            </button>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#2A38A2" }}
              onClick={() => setIsOpenModalCheck(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image
                alt="+"
                width={16}
                height={16}
                src="/crm/duyet_white.svg"
              />
              Duyệt
            </button>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <Link href={"/product_return/update"}>
              <button
                type="button"
                style={{ background: "#4C5BD4" }}
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <Image alt="+" width={16} height={16} src="	/crm/edit_kh.svg" />
                Chỉnh sửa
              </button>
            </Link>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#FFF", color: "red" }}
              onClick={() => setIsOpenModalDel(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image alt="+" width={16} height={16} src="/crm/delete_kh.svg" />
              Xóa
            </button>
          </div>
        </div>
      </div>

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

      <CancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn xóa đề nghị trả hàng Số đề nghị?"}
        title={"Xóa đề nghị trả hàng"}
        link={`/product_return/list`}
      />
    </>
  );
}
