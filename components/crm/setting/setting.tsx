import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";
import styles from "./setting.module.css";
import Link from "next/link";
import HandOver from "./hand_over";

export default function Setting() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Cài đặt");
    setShowBackButton(false);
    setCurrentPath("/setting");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <div ref={mainRef} className={styleHome.main}>
      <div className={styles.col}>
        <div className={styles.main_setting_tittle}>Cơ hội</div>
        <div className={styles.main_setting_body}>
          <Link
            className={styles.main_setting_item}
            href="/setting/sales_process"
          >
            Quy trình bán hàng
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.main_setting_tittle}>Marketing</div>
        <div className={styles.main_setting_body}>
          <Link className={styles.main_setting_item} href="/setting/email">
            Email
          </Link>

          <Link className={styles.main_setting_item} href="/setting/sms">
            Sms Brandname
          </Link>

          <Link
            className={styles.main_setting_item}
            href="/setting/switch_board"
          >
            Tổng đài điện thoại
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.main_setting_tittle}>Tiềm năng</div>
        <div className={styles.main_setting_body}>
          <Link
            className={styles.main_setting_item}
            href="/setting/webform/list"
          >
            Webform
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.main_setting_tittle}>Khách hàng</div>
        <div className={styles.main_setting_body}>
          <Link
            className={styles.main_setting_item}
            href="/setting/share_customer"
          >
            Chia sẻ khách hàng
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.main_setting_tittle}>Quản trị dữ liệu</div>
        <div className={styles.main_setting_body}>
          <button
            type="button"
            onClick={() => setIsModalCancel(true)}
            className={styles.main_setting_item}
          >
            Bàn giao công việc
          </button>
          {
            <HandOver
              isModalCancel={isModalCancel}
              setIsModalCancel={setIsModalCancel}
            />
          }
        </div>
      </div>
    </div>
  );
}
