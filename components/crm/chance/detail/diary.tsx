import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../potential/potential2.module.css";
import stylesCustomer from "../chance.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import InforText from "./text_info_diary";
import TextAndIconInfo from "./text_and_icon_infor";
import { timestampToCustomString } from "../../ultis/convert_date";

const DiaryChanceList = ({ formData }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);

  const renderActionDiary = (type: number) => {
    if (type === 0) {
      return "cập nhật";
    }
    if (type === 1) {
      return "Xoá";
    }
    if (type === 2) {
      return "khôi phục";
    }
    if (type === 3) {
      return "thêm";
    }
  };

  const numberToTimeString = (numberDate: number) => {
    const timestamp = numberDate;
    const dateObject = new Date(timestamp);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    var formattedDate = `${hours}:${minutes} - ${day}/${month}/${year}`;

    return formattedDate;
  };

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <div style={{ paddingTop: 0 }} className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin hệ thống</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <div
                      className={stylesCustomer.row_input_text}
                      style={{ maxHeight: "335px", overflowY: "scroll" }}
                    >
                      {formData &&
                        formData?.history &&
                        formData?.history?.map((item) => (
                          <InforText
                            field={numberToTimeString(item?.create_at * 1000)}
                            value={`Nhóm khách hàng được ${renderActionDiary(
                              item?.action
                            )} bởi ${item?.emp_id?.userName}`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiaryChanceList;
