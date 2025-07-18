import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/campaign/campaign.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddButtonControl from "@/components/crm/campaign/campaign_detail/campaign_button_control";
import AddDetailInfo from "@/components/crm/campaign/campaign_detail/campaign_detail_info";
import TabChanceList from "@/components/crm/campaign/campaign_detail/tab_campaign_detail";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import Cookies from "js-cookie";
import { fetchApi } from "@/components/crm/ultis/api";
import { useRouter } from "next/router";
import useLoading from "@/components/crm/hooks/useLoading";
import { useForm } from "@/components/crm/hooks/useForm";
import { Spin } from "antd";
import { useTrigger } from "@/components/crm/context/triggerContext";

const DetailCampaign: React.FC = () => {
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formFields, setFormFields } = useForm();
  const { trigger, setTrigger } = useTrigger();
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isHideEmptyData, setIsHideEmptyData] = useState(false);
  const [inforCampaign, setInforCampaign] = useState<any>({});
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const url = "https://api.timviec365.vn/api/crm/campaign/detail-campaign";
  const token = Cookies.get("token_base365");

  const hideEmptyDataFunc = (data) => {
    if (isHideEmptyData) {
      if (data !== null && data !== undefined && data !== 1 && data !== 0)
        return false;
      return true;
    }
    return false;
  };

  const fetchAPICampaign = async () => {
    const bodyAPI = {
      cam_id: router.query.id,
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setFormFields(dataApi?.data?.data);
    stopLoading();
  };

  const fetchAPIInforCampaign = async () => {
    const bodyAPI = {
      campaign_id: Number(router.query.id),
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/campaign/info-campaign",
      token,
      bodyAPI,
      "POST"
    );
    setInforCampaign(dataApi?.data?.data);
  };

  useEffect(() => {
    setHeaderTitle("Chiến dịch/ Chi tiết");
    setShowBackButton(true);
    setCurrentPath("/campaign/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    if (trigger) {
      fetchAPICampaign();
    }
    setTrigger(false);

    return () => {
      setTrigger(true);
    };
  }, [trigger]);

  useEffect(() => {
    fetchAPIInforCampaign();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chi tiết chiến dịch</title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
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
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
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

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            {isLoading ? (
              <Spin style={{ width: "100%", margin: "auto" }} />
            ) : (
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <AddButtonControl
                    isHideEmptyData={isHideEmptyData}
                    setIsHideEmptyData={setIsHideEmptyData}
                  />
                </div>
                <div className={styles.main__title}>Chi tiết chiến dịch</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <AddDetailInfo
                      inforCampaign={inforCampaign}
                      formFields={formFields}
                      isHideEmptyData={hideEmptyDataFunc}
                    />
                    {/* <AddDescriptionInfo /> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          <TabChanceList
            formFields={formFields}
            isHideEmptyData={hideEmptyDataFunc}
          />
        </div>
      </div>
    </>
  );
};

export default DetailCampaign;
