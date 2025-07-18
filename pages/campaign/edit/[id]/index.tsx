import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/campaign/campaign.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import CampaignFooterEditFiles from "@/components/crm/campaign/campaign_edit_files/campaign_footer_edit_file";
import AddGeneralInfo from "@/components/crm/campaign/campaign_add_files/general_infor";
import AddDescriptionInfo from "@/components/crm/campaign/campaign_add_files/description_info";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import { useForm } from "@/components/crm/hooks/useForm";
import Cookies from "js-cookie";
import useLoading from "@/components/crm/hooks/useLoading";
import { fetchApi } from "@/components/crm/ultis/api";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { timestampToCustomString } from "@/components/crm/ultis/convert_date";

const CampageEditIndex: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formFields, handleChange, setFormFields } = useForm();
  const router = useRouter();
  const typeRef = useRef(null);
  const statusRef = useRef(null);
  const empRef = useRef(null);
  const chanelRef = useRef(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  const url = "https://api.timviec365.vn/api/crm/campaign/detail-campaign";

  const token = Cookies.get("token_base365");

  const fetchAPICampaign = async () => {
    const bodyAPI = {
      cam_id: router.query.id,
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setFormFields(dataApi?.data?.data);
    stopLoading();
  };

  const fetchAPIEditCampaign = async () => {
    const bodyAPI = {
      ...formFields,
      timeStart:
        typeof formFields?.timeStart === "number"
          ? timestampToCustomString(formFields?.timeStart, "input")
          : formFields?.timeStart,
      timeEnd:
        typeof formFields?.timeEnd === "number"
          ? timestampToCustomString(formFields?.timeEnd, "input")
          : formFields?.timeEnd,
      cam_id: router.query.id,
      shareAll: Number(formFields?.shareAll || 0),
      money: Number(formFields?.money || 0),
      investment: Number(formFields?.investment || 0),
      expectedSales: Number(formFields?.expectedSales || 0),
      status: statusRef?.current?.value ? Number(statusRef?.current?.value) : 0,
      chanelCampaign: chanelRef?.current?.value
        ? Number(chanelRef?.current?.value)
        : 0,
      typeCampaign: typeRef?.current?.value
        ? Number(typeRef?.current?.value)
        : 0,
      empID: empRef?.current?.value ? Number(empRef?.current?.value) : 0,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/campaign/edit-campaign",
      token,
      bodyAPI,
      "POST"
    );
  };

  useEffect(() => {
    fetchAPICampaign();
  }, []);

  useEffect(() => {
    setHeaderTitle("Chiến dịch/ Chỉnh sửa");
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

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chỉnh sửa chiến dịch khách hàng</title>
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
            <div className={styles.info_step}>
              <div className={styles.main__title}>Chỉnh sửa chiến dịch</div>
              <div className={styles.form_add_potential}>
                {isLoading ? (
                  <Spin style={{ width: "100%", margin: "auto" }} />
                ) : (
                  <div className={styles.main__body}>
                    <AddGeneralInfo
                      formFields={formFields}
                      handleChange={handleChange}
                      typeRef={typeRef}
                      chanelRef={chanelRef}
                      statusRef={statusRef}
                      empRef={empRef}
                    />
                    <AddDescriptionInfo
                      formFields={formFields}
                      handleChange={handleChange}
                    />
                  </div>
                )}
                <CampaignFooterEditFiles
                  title="Cập nhật Chiến dịch thành công"
                  formFields={formFields}
                  handleChange={fetchAPIEditCampaign}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampageEditIndex;
