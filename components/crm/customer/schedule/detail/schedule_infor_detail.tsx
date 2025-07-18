import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../../home/home.module.css";
import styles from "../../../potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import InforText from "../../detail/text_info";
import stylesCustomer from "@/components/crm/customer/customer.module.css";
import TextAndIconInfo from "../../detail/text_and_icon_infor";

interface ComponentProps {}

const DetailInformationSchedule: React.FC<ComponentProps> = () => {
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
              <div className={styles.main__title}>Thông tin lịch hẹn</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <div className={stylesCustomer.customer_infor_text}>
                      <InforText field="Tên lịch hẹn:" value="937843" />
                      <InforText field="Trạng thái:" value="937843" />
                      <InforText field="Ngày bắt đầu:" value="937843" />
                      <InforText field="Ngày kết thúc:" value="937843" />
                      <TextAndIconInfo
                        field="Nhân viên thực hiện:"
                        value="Lê Thị Thu"
                        src="/crm/user_kh.png"
                      />
                      <InforText field="Địa điểm:" value="937843" />
                      <InforText
                        field="Mô tả:"
                        value="Wikipedia là một bách khoa toàn thư mở trực tuyến đa ngôn ngữ được sáng lập và duy trì bởi một cộng đồng biên tập viên tình nguyện và chạy trên nền tảng wiki."
                      />
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

export default DetailInformationSchedule;
