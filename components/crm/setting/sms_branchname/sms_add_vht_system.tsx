import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../sms_branchname/sms.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import AddSMSFooter from "./add_sms_footer";

const AddSMSTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ SMS Brandname/ SMS hệ thống");
    setShowBackButton(true);
    setCurrentPath("/setting/sms");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <>
      <div className={styleHome.main} ref={mainRef}>
        <form className="main_sms_ct flex_column" id="form_setup_sms_system">
          <div className="main_form">
            <div className={style.main__title}>VHT</div>
            <div className={style.main__body}>
              <div className={style.main__body_item}>
                <div className={style.body__connect_system_row}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label} aria-required="true">
                      Tài khoản (API Key)
                    </label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="Nhập tên tài khoản"
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label} aria-required="true">
                      Mật khẩu (Serect Key)
                    </label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                  <div className="col-lg-6">
                    <button
                      type="button"
                      className={style.check_setting_system}
                    >
                      Kiểm tra thiết lập
                    </button>
                  </div>
                </div>
              </div>
              <div className={style.main__body_item}>
                <p className={style.main__body__type}>Thông tin máy chủ</p>
                <div className={style.body__connect_system_row}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label} aria-required="true">
                      Thương hiệu (Brandname)
                    </label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="Nhập thương hiệu (Brandname)"
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label}>Số dư</label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      style={{ backgroundColor: "#e9ecef" }}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AddSMSFooter />
        </form>
      </div>
    </>
  );
};

export default AddSMSTable;
