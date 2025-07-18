import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import SetupEmailMarketingFooter from "./setup_email_marketing_footer";

const EmailMarketingTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ Email/ Email Marketing");
    setShowBackButton(true);
    setCurrentPath("/setting/email");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <>
      <div className={styleHome.main} ref={mainRef}>
        <div className="main_form">
          <div className={style.main__title}>ZetaMail</div>
          <form
            className="form_setup_email_marketing"
            id="form_setup_email_marketing"
          >
            <div className={style.main__body}>
              <div className="main__body_item">
                <p className={style.main__body__type}>Thông tin token</p>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label className="form-label required">Serect Token</label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="Điền thông tin token"
                    />
                  </div>
                </div>
              </div>
              <div className="main__body_item">
                <p className={style.main__body__type}>Ghép trường thông tin</p>
                <div className={style.main__tittle_token}>
                  <p
                    className={style.title_token}
                    style={{ textAlign: "left" }}
                  >
                    Tên trường trên ZetaMail
                  </p>
                  <p className={style.title_token}>Tiềm năng</p>
                  <p className={style.title_token}>Liên hệ</p>
                  <p className={style.title_token}>Khách hàng</p>
                </div>
                <div className={style.main__content_token}>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Birth Date</p>
                    <select className={style.form_control}>
                      <option>Ngày sinh</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Ngày sinh</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Ngày sinh</option>
                    </select>
                  </div>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Company</p>
                    <select className={style.form_control}>
                      <option>Tổ chức</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Tổ chức</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Tổ chức</option>
                    </select>
                  </div>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>First Name</p>
                    <select className={style.form_control}>
                      <option>Tên</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Tên</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Tên</option>
                    </select>
                  </div>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Last Name</p>
                    <select className={style.form_control}>
                      <option>Họ và đệm</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Họ và đệm</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Họ và đệm</option>
                    </select>
                  </div>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Mobile</p>
                    <select className={style.form_control}>
                      <option>Điện thoại cá nhân</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Điện thoại cá nhân</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Điện thoại cá nhân</option>
                    </select>
                  </div>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Phone</p>
                    <select className={style.form_control}>
                      <option>Điện thoại cơ quan</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Điện thoại cơ quan</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Điện thoại cơ quan</option>
                    </select>
                  </div>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Website</p>
                    <select className={style.form_control}>
                      <option>Chọn</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Chọn</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Chọn</option>
                    </select>
                  </div>

                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Xưng hô</p>
                    <select className={style.form_control}>
                      <option>Xưng hô</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Xưng hô</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Chọn</option>
                    </select>
                  </div>
                  <div className={style.row_content_token}>
                    <p className={style.form_label}>Địa chỉ</p>
                    <select className={style.form_control}>
                      <option>Địa chỉ</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Địa chỉ</option>
                    </select>
                    <select className={style.form_control}>
                      <option>Địa chỉ (Hóa đơn)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <SetupEmailMarketingFooter />
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailMarketingTable;
