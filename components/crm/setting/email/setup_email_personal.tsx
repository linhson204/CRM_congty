import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import SetupEmailPersonalFooter from "./setup_email_personal_footer";

const EmailPersonalTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Cài đặt/ Email/ Email cá nhân");
    setShowBackButton(true);
    setCurrentPath("/setting/email");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <>
      <div className={styleHome.main} ref={mainRef}>
        <div className="main_form">
          <div className={style.main__title}>Thiết lập email</div>
          <div className={style.main__body}>
            <div className="main__body_item">
              <p className="main__body__p">
                Kết nối email của bạn với CRM.TIMVIEC365.VN để thay đổi cách bán
                hàng
              </p>
            </div>
            <div className="main__body_item">
              <p className={style.main__body__type}>Thông tin máy chủ</p>
              <div className={style.body__connect_system_row}>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Máy chủ mail</label>
                  <br></br>
                  <input
                    type="text"
                    className={style.form_control}
                    name="server_mail"
                    id="server_mail"
                    placeholder="Nhập tên máy chủ mail"
                    value=""
                  />
                  <input type="hidden" name="id" value="13" />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Cổng</label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="port_number"
                    id="port_number"
                    placeholder="Nhập"
                    value=""
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Địa chỉ email gửi</label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="address_send_mail"
                    id="address_send_mail"
                    placeholder="Nhập địa chỉ email gửi"
                    value=""
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Tên hiển thị</label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="name_mail"
                    id="name_mail"
                    placeholder="Nhập tên hiển thị"
                    value=""
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Tên đăng nhập</label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="name_login"
                    id="name_login"
                    placeholder="Nhập tên đăng nhập"
                    value=""
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Mật khẩu</label>
                  <input
                    type="password"
                    className={style.form_control}
                    name="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>
                    Phương thức bảo mật
                  </label>
                  <div className={style.div_phuongthuc}>
                    <p className="d-flex ">
                      <input type="radio" value="0" name="method_security" />
                      Không
                    </p>
                    <p className="d-flex ">
                      <input type="radio" value="1" name="method_security" />
                      TLS
                    </p>
                    <p className="d-flex ">
                      <input type="radio" value="2" name="method_security" />
                      SSL
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="main__body_item">
              <p className={style.main__body__type}>Thông tin máy chủ</p>
              <div className={style.body__connect_system_row}>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Số mail/1 lần gửi</label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="number_email_sent"
                    id="number_email_sent"
                    placeholder="Nhập"
                    value=""
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>
                    Thời gian giữa các lần gửi (s)
                  </label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="time_send_mail"
                    id="time_send_mail"
                    placeholder="Nhập"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SetupEmailPersonalFooter />
      </div>
    </>
  );
};

export default EmailPersonalTable;
