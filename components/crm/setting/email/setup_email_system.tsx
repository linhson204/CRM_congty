import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import SetupEmailSystemFooter from "./setup_email_system_footer";
import Link from "next/link";

const EmailSystemTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ Email/ Email hệ thống");
    setShowBackButton(true);
    setCurrentPath("/setting/email");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <>
      <div className={styleHome.main} ref={mainRef}>
        <div className="main_form">
          <p className={style.main__title}>Thiết lập Email</p>
          <div className={style.main__setting_email}>
            <div className={style.main_setting_body}>
              <div className="setting_email_body__note">
                <p>
                  Thiết lập server Email để hệ thống thực hiện gửi các Email
                  thông báo như thông báo bàn giao công việc, thông báo phê
                  duyệt, Gửi Email từ quy trình làm việc, quy trình tự động chăm
                  sóc,...
                </p>
              </div>
              <div className="setting_email_body__content">
                <div className={style.setting_email_body__connect_system}>
                  <p className={style.setting_email_body__title}>
                    Thông tin máy chủ
                  </p>
                  <div className={style.body__connect_system_row}>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className={style.form_label}>Máy chủ mail</label>
                      <input
                        type="text"
                        className={style.form_control}
                        name="server_mail"
                        id="server_mail"
                        placeholder="Tên máy chủ mail"
                        value="â"
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className={style.form_label}>Cổng</label>
                      <input
                        type="text"
                        className={style.form_control}
                        name="port_number"
                        id="port_number"
                        placeholder="Cổng"
                        value=""
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className={style.form_label}>
                        Địa chỉ email gửi
                      </label>
                      <input
                        type="text"
                        className={style.form_control}
                        name="address_send_mail"
                        id="address_send_mail"
                        placeholder="Địa chỉ email gửi"
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
                        placeholder="Tên hiển thị"
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
                        placeholder="Tên đăng nhập"
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
                        placeholder="Mật khẩu"
                        value="d41d8cd98f00b204e9800998ecf8427e"
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className={style.form_label}>
                        Phương thức bảo mật
                      </label>
                      <div className={style.div_phuongthuc}>
                        <p className={style.d_flex_center}>
                          <input
                            type="radio"
                            value="0"
                            name="method_security"
                          />
                          Không
                        </p>
                        <p className={style.d_flex_center}>
                          <input
                            type="radio"
                            value="1"
                            name="method_security"
                          />
                          TLS
                        </p>
                        <p className={style.d_flex_center}>
                          <input
                            type="radio"
                            value="2"
                            name="method_security"
                          />
                          SSL
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SetupEmailSystemFooter />
      </div>
    </>
  );
};

export default EmailSystemTable;
