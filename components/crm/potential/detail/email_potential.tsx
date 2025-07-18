import React from "react";
import styles from "@/components/crm/customer/detail/customer_detail.module.css";
import OrderDetailSelectBox from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select";
import Link from "next/link";
import TableDataEmailPo from "@/components/crm/table/table-pontential-Email";

type Props = {};

const Email_potential = (props: Props) => {
  return (
    <div className={styles.main_importfile}>
      <div className={styles.formInfoStep}>
        <div className={styles.info_step}>
          <div className={styles.form_add_potential}>
            <div className={`${styles.main__control_btn} `}>
              <div
                style={{ display: "flex", paddingBottom: 20 }}
                className={`${styles.main__control_btn}`}
              >
                <div
                  style={{ paddingBottom: 10, width: 100 }}
                  className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
                >
                  <label htmlFor="" className="">
                    Ngày gửi:
                  </label>
                  <div className={`${styles.input_item_time} flex_between`}>
                    <input type="date" name="" id="start_time" />-
                    <input type="date" name="" id="start_time" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.main__control_btn} flex_between`}>
              <div className={styles.main__control_search}>
                <form onSubmit={() => false}>
                  <input
                    type="text"
                    className={styles.input__search}
                    name="search"
                    defaultValue=""
                    placeholder="Tìm kiếm theo tên email"
                  />
                  <button className={styles.kinh_lup}>
                    <img
                      className={styles.img__search}
                      src="/crm/search.svg"
                      alt="hungha365.com"
                    />
                  </button>
                </form>
              </div>
              <div className={`${styles.main__control_add} flex_end`}>
                <Link
                  href={"/marketing/email/add"}
                  type="button"
                  className={`${styles.dropbtn_add} flex_align_center`}
                >
                  <img src="/crm/add.svg" />
                  Thêm mới
                </Link>
              </div>
            </div>
            <TableDataEmailPo />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Email_potential;
