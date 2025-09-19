import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import getFbAccountsData from "@/pages/api/toolFacebook/danhsachnhom/GetFbAccounts";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from 'react';
import TableOfContent from "../components/TableOfContent";
import style from './test.module.css';


export default function MessagingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    setHeaderTitle("Tool Facebook - Nhắn tin");
    setShowBackButton(true);
    setCurrentPath("/toolfacebook/tham-gia-nhom/HomePage");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    const test = async () => {
      const a = await getFbAccountsData(22865598, "", "");
      const data1 = a.results.map((item, index) => ({
        ...item,
        Mess: 1,
        STT: index + 1,
      }));
      setAccounts(data1);
    };
    test();
  }, []);

  console.log(accounts)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - TEST</title>
        <meta name="description" content="Nhắn tin với các tài khoản Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>TRANG TEST</div>
            <div className={styles.form_add_potential}>
              <div className={`${styles.main__body} ${style.messagingContainer}`}>
                <div className={style.userList}>
                    <TableOfContent
                        attributes={['Tên tài khoản', 'Email', 'Mật khẩu', 'Thiết bị quản lí', 'Trạng thái', 'Hành động' ]}
                        contents={accounts.map(account => ({
                          name: account.name,
                          account: account.account,
                          password: account.password || '***',
                          device: account.device_name,
                          status: account.status,
                          actions: 'Actions'
                        }))}
                    ></TableOfContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}