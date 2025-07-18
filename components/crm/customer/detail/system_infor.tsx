import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../potential/potential.module.css";
import stylesCustomer from "../customer.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import InforText from "./text_info";
import TextAndIconInfo from "./text_and_icon_infor";
export interface Props {
  formData: any;
}
const SystemCustomerInfo: React.FC<Props> = ({ formData }: any) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  var seconds = formData?.ngay_tao; // Chia cho 1000 để chuyển từ milliseconds thành seconds

  // Tạo đối tượng Date từ số giây
  var date = new Date(seconds * 1000); // Nhân cho 1000 để chuyển từ seconds thành milliseconds

  // Lấy ngày, tháng và năm
  var day = date.getDate();
  var month = date.getMonth() + 1; // Lưu ý rằng tháng trong JavaScript bắt đầu từ 0
  var year = date.getFullYear();

  // Định dạng ngày theo yêu cầu (thêm '0' ở trước nếu cần)
  var ngay_tao =
    (day < 10 ? "0" : "") +
    day +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    year;

  var seconds2 = formData?.ngay_sua;
  var date2 = new Date(seconds2 * 1000); // Nhân cho 1000 để chuyển từ seconds thành milliseconds
  var day = date2.getDate();
  var month = date2.getMonth() + 1; // Lưu ý rằng tháng trong JavaScript bắt đầu từ 0
  var year = date2.getFullYear();
  var ngay_sua =
    (day < 10 ? "0" : "") +
    day +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    year;

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
                        src={
                          formData?.anh_dai_dien
                            ? formData?.anh_dai_dien
                            : "/crm/user_kh.png"
                        }
                        value={formData?.nguoi_tao}
                      />
                      <InforText
                        field="Ngày tạo:"
                        value={ngay_tao ? ngay_tao : "Chưa cập nhật"}
                      />
                      <TextAndIconInfo
                        field="Người sửa:"
                        src={
                          formData?.logo ? formData?.logo : "/crm/user_kh.png"
                        }
                        value={formData?.nguoi_sua}
                      />

                      <InforText
                        field="Ngày sửa:"
                        value={ngay_sua ? ngay_sua : "Chưa cập nhật"}
                      />
                      <InforText field="Đơn vị:" />
                      <TextAndIconInfo
                        field="Loại hình:"
                        value={
                          formData?.loai_hinh
                            ? formData?.loai_hinh
                            : "Chưa cập nhật"
                        }
                        src="/crm/edit_blue.svg"
                      />
                      <InforText
                        field="Ngày giao dịch gần nhất:"
                        value={"Chưa cập nhật"}
                      />
                      <InforText
                        field="Ngày mua hàng gần nhất:"
                        value="Chưa cập nhật"
                      />
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

export default SystemCustomerInfo;
