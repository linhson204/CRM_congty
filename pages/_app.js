import React, { useEffect, useState } from "react";
import { AccessContextComponent } from "@/components/crm/context/accessContext";
import { SidebarResize } from "@/components/crm/context/resizeContext";
import Header from "@/components/crm/header/header";
import useModal from "@/components/crm/hooks/useModal";
import Sidebar from "@/components/crm/sidebar/sidebar";
import { ConfigProvider, Spin } from "antd";
import { useRouter } from "next/router";
import ChatBusiness from "@/components/crm/chat/chat";
import { NavigateContextComponent } from "@/components/crm/context/navigateContext";
import { UpdateTLKDComponent } from "../components/crm/context/updateTlkd";
import { TriggerProvider } from "@/components/crm/context/triggerContext";
import TitleHeaderMobile from "@/components/crm/header/title_header_mobile";
import styles from "@/components/crm/sidebar/sidebar.module.css";
import { Provider } from "react-redux";
import Seo from "@/components/head";
import { TongDaiContext } from "@/components/crm/context/tongdaiContext";
import { store } from "@/components/crm/redux/store";
import { checkAndRedirectToHomeIfNotLoggedIn } from "../components/crm/ultis/checkLogin";
import Cookies from "js-cookie";
import { base_url } from "@/components/crm/service/function";
import Head from "next/head";
import { FormDataContext } from "@/components/crm/context/formDataContext";
import { NotificationContext } from "@/components/crm/context/notificationContext";
import { DataContainerProvider } from "@/components/crm/context/dataContainer";
import { MessageContextComponent } from "@/components/crm/context/messageContext";
import Message from "@/components/crm/message/message"
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export const LoadingComp = () => {
  return (
    <Spin
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
      }}
    />
  );
};

export default function App({ Component, pageProps }) {
  const { isOpen, toggleModal } = useModal("icon_menu_nav", [styles.sidebar]);
  const router = useRouter();
  const { updateTlkd, setUpdateTLKD } = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(
    router?.pathname?.includes("/crm/") ? false : true
  );
  const [openModalOTPCompany, setOpenModalOTPCompany] = useState(false);
  const [openModalModalOTPEmployee, setOpenModalOTPEmployee] = useState(false);

  const [success, setSuccess] = useState(false)

  const check_token = async () => {
    try {
      const token = Cookies.get("token_base365")
      const refresh_token = Cookies.get("refresh_token");
      if (!token) {
        if (refresh_token) {
          const resp = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/qlc/employee/getNewToken`,
            { rf_token: refresh_token }
          )
          if (resp?.status === 200) {
            const token_new = resp?.data?.data?.token
            if (token_new) {
              let data = jwtDecode(token_new)
              if (data) {
                console.log("data", data)
                data = data?.data

                Cookies.set('token_base365', token_new)
                Cookies.set('rf_token', resp?.data?.data?.refreshToken)
                Cookies.set('role', data?.type)
                Cookies.set('userID', data?.idQLC)
                Cookies.set('userName', data?.userName)
                Cookies.set('phone', data?.phoneTK)
                Cookies.set('com_id', data?.com_id)
              }
            }
          }
        }

      }

    } catch (error) {
      console.log("errorerror", error)
    }
  }

  useEffect(() => {
    const call = async () => {
      try {
        await check_token()
        setSuccess(true)
      } catch (error) {
        setSuccess(true)
        console.log("error", error)
      }
    }
    call()
  }, [])

  useEffect(() => {
    const doLoading = () => {
      const start = () => {
        setLoading(true);
      };
      const end = () => {
        setLoading(false);
      };
      setTimeout(() => {
        router.events.on("routeChangeStart", start);
      }, 200);
      setTimeout(() => {
        router.events.on("routeChangeComplete", end);
      }, 200);
      router.events.on("routeChangeError", end);
      return () => {
        router.events.off("routeChangeStart", start);
        router.events.off("routeChangeComplete", end);
        router.events.off("routeChangeError", end);
      };
    };
    if (router?.pathname?.includes("/crm/")) {
    } else {
      doLoading();
    }
  }, []);

  useEffect(() => {
    if (!router.pathname.includes("/crm/")) {
      const timeout = setTimeout(() => {
        setFirstLoad(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [router?.pathname]);

  const importGlobalStyles = () => {
    if (router.pathname?.includes("/")) {
      import("../styles/crm/stylecrm.css");
      import("../styles/crm/styles.css");
      import("../styles/crm/hight_chart.css");
    }
  };

  useEffect(() => {
    importGlobalStyles();
  }, [router.pathname]);

  const [com_auth, setCom_auth] = useState("");
  const [employee_auth, setEmployee_auth] = useState("");
  const role = parseInt(Cookies.get("role"));

  const getInfoLoginCompany = async () => {
    try {
      const res = await fetch(`${base_url}/api/qlc/company/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });
      const data = await res.json();
      setCom_auth(parseInt(data?.data.data.com_authentic));
    } catch (error) { }
  };

  const getInfoLoginEmployee = async () => {
    try {
      const res = await fetch(`${base_url}/api/qlc/employee/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });
      const data = await res.json();
      setEmployee_auth(parseInt(data?.data.data.authentic));
      const userID = Cookies.get('userID')
      if (!userID || (!!userID && userID != data?.data?.data?.idQLC)) {
        Cookies.set('userID', data?.data?.data?.idQLC)
      }
    } catch (error) { }
  };
  useEffect(() => {
    if (role === 1) {
      getInfoLoginCompany();
    }
    if (role === 2) {
      getInfoLoginEmployee();
    }

    if (role === 1 && com_auth !== 1 && com_auth !== "") {
      // return false;
      router.push(`https://hungha365.com/xac-thuc-ma-otp-cong-ty.html`);
    }

    if (role === 2 && employee_auth !== 1 && employee_auth !== "") {
      router.push(`https://hungha365.com/xac-thuc-ma-otp-nhan-vien.html`);
    }
  }, [role]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="index,follow" />
        <link
          rel="icon"
          href="https://hungha365.com/favicon/HH365.ico"
          sizes="any"
        />
        <meta
          name="google-site-verification"
          content="q4vBfRDO92RvPdYuA-xEEalSufKbzQiQQYpUBGTOqC4"
        />
        <title>
          Phần Mềm CRM Giải Pháp Tuyệt Vời Chăm Sóc Khách Hàng Tự Động Của AI365
        </title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta property="og:url" content="https://hungha365.com/crm" />

        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <meta
          property="og:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          property="og:image"
          content="https://hungha365.com/img/HH365.svg"
        />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL3KDJW5');
`,
          }}
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6LT1XMTDC3"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Phần Mềm CRM 365",
                        "description": "CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi",
                        "url": "https://hungha365.com/crm",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://timviec365.vn/tim-kiem?keyword={keyword}",
                            "query-input": "required name=keyword"
                        },
                        "additionaltype": ["https://en.wikipedia.org/wiki/Human_resource_management", "https://www.wikidata.org/wiki/Q1056396"]}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6LT1XMTDC3');
`,
          }}
        ></script>

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      {loading ? (
        <LoadingComp />
      ) : !firstLoad ? (
        <ConfigProvider
          theme={{
            token: {
              screenLG: 1025,
              screenLGMin: 1025,
              screenLGMax: 1025,
              screenMD: 769,
              screenMDMin: 769,
            },
          }}
        >
          {router?.pathname?.includes("bang-gia-tong-dai") ? (
            <Component {...pageProps} />
          ) : (
            <Provider store={store}>
              <DataContainerProvider>
                <FormDataContext>
                  <AccessContextComponent>
                    <NotificationContext>
                      <UpdateTLKDComponent>
                        <SidebarResize>
                          <NavigateContextComponent>
                            <MessageContextComponent>
                              {checkAndRedirectToHomeIfNotLoggedIn() ? (
                                <>
                                  <Header toggleModal={toggleModal} />
                                  <Sidebar isOpened={isOpen} />
                                  {/* <ChatBusiness /> */}
                                  <Message />
                                </>
                              ) : null}
                              <TitleHeaderMobile />
                              <TriggerProvider>
                                <TongDaiContext>
                                  <Component {...pageProps} />
                                </TongDaiContext>
                              </TriggerProvider>
                            </MessageContextComponent>
                          </NavigateContextComponent>
                        </SidebarResize>
                      </UpdateTLKDComponent>
                    </NotificationContext>
                  </AccessContextComponent>
                </FormDataContext>
              </DataContainerProvider>
            </Provider>
          )}
        </ConfigProvider>
      ) : (
        <LoadingComp />
      )}
    </>
  );
}
