import React, { useCallback, useEffect, useState } from "react";
import styles from "./customer_group.module.css";
import btnStyles from "@/styles/crm/button.module.css";
import Link from "next/link";
import GroupCustomerAction from "./group_customert_action";
import { ModalGroupCustomerDelete } from "./modal_delete";
import ModalGroupCustomerMove from "./modal_move";
import ModalGroupCustomerAddEmp from "./modal_add_emp";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import FilterCart from "./modal_filter_cart";
import { ID_HUNGHA } from "@/constants/home-constants";
export default function HeaderBtnsCustomerGroup({
  isSelectedRow,
  selectedRow,
  updateData,
  valFilter,
  setValFilter,
  handleClickSearch,
}: any) {
  const [isOpenModalMove, setIsOpenModalMove] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalAddEmp, setIsOpenModalAddEmp] = useState(false);

  const handleChangeInput = useCallback((e: any) => {
    setValFilter(e.target.value);
  }, []);
  const [company_id, setCompanyId] = useState(null);
  const [typeComp, setTypeComp] = useState(0);

  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
      setTypeComp(decodedToken?.data?.type);
    }
  }, []);
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn}`}>
        <div className={styles.wrapInput}>
          <form
            style={{
              position: "relative",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            className={styles.main__control_search}
            onSubmit={(e) => {
              e.preventDefault(), handleClickSearch();
            }}
          >
            <input
              type="text"
              className={styles.input__search}
              name="search"
              placeholder="Tìm kiếm theo tên nhóm khách hàng"
              value={valFilter}
              onChange={handleChangeInput}
            />
            <button onClick={handleClickSearch} className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>{" "}
        <FilterCart />
      </div>
      <ModalGroupCustomerDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
      />
      <ModalGroupCustomerMove
        isOpenModalMove={isOpenModalMove}
        setIsOpenModalMove={setIsOpenModalMove}
      />{" "}
      <ModalGroupCustomerAddEmp
        isOpenModalAddEmp={isOpenModalAddEmp}
        setIsOpenModalAddEmp={setIsOpenModalAddEmp}
      />
      <div className={styles.action_box}>
        {" "}
        <GroupCustomerAction
          isSelectedRow={isSelectedRow}
          selectedRow={selectedRow}
          updateData={updateData}
        />
        <div className={`${styles.main__control_add}`}>
          {Number(company_id) === ID_HUNGHA && typeComp === 1 && (
            <div className={`${styles.main__control_add} flex_end`}>
              <button
                type="button"
                onClick={() => setIsOpenModalDelete(true)}
                className={`${btnStyles.delete_button} flex_align_center`}
              >
                Xóa giỏ cán bộ
              </button>{" "}
              <button
                onClick={() => setIsOpenModalMove(true)}
                type="button"
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                Chuyển giỏ
              </button>
              <button
                onClick={() => setIsOpenModalAddEmp(true)}
                type="button"
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <img src="/crm/add.svg" />
                Thêm cán bộ
              </button>
            </div>
          )}

          <Link href="/customer/group/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
