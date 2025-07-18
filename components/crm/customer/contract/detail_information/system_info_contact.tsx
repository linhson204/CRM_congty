import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import stylesCustomer from "../../customer.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import TextAndIconInfo from "../../detail/text_and_icon_infor";
import InforText from "../../detail/text_info";

const SystemCustomerInfoContact: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);

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
                    <div className={stylesCustomer.row_input_text}>
                      <TextAndIconInfo
                        field="Người tạo:"
                        src="/crm/user_kh.png"
                      />
                      <InforText field="Ngày tạo:" value="12/12/2024" />
                      <TextAndIconInfo
                        field="Người sửa:"
                        src="/crm/user_kh.png"
                      />
                      <InforText field="Ngày sửa:" value="26/07/2023" />
                      <TextAndIconInfo
                        field="Dùng chung:"
                        src="/crm/dungchung_kh.svg"
                      />
                    </div>
                    {/*  */}
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

export default SystemCustomerInfoContact;
