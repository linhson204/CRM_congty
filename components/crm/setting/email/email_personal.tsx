import React, { useContext, useEffect, useRef, useState } from "react";

import style from "./email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Link from "next/link";

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
    setHeaderTitle("Cài đặt/ Email");
    setShowBackButton(true);
    setCurrentPath("/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <div className={style.main__setting_email}>
      <div className={style.setting_email_body}>
        <p className={style.setting_email_body__title}>Thiết lập Email</p>

        <p>
          Thiết lập Email để gửi mail dễ dàng <br></br>
          Lưu ý: Việc sử dụng và chuyển đổi từ AMIS Bán Hàng sang bất cứ ứng
          dụng nào khác thông tin nhận được từ Google API sẽ luôn tuân thủ theo
          chính sách dữ liệu người dùng của Google (Google API Services User
          Data Policy), trong đó bao gồm cả yêu cầu về giới hạn sử dụng (Limited
          Use requirements).
        </p>
        <div className={style.setting_email_body__connect}>
          <div className={style.setting_email_body__connect_item}>
            <img
              width="50.85"
              height="60"
              className={style.connect_img}
              src="/crm/icon_email_per.svg"
            />
            <p className={style.connect_title}>POP3/IMAP</p>
            <Link href="/setting/setup_email_personal">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPersonalTable;
