"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import DetailInformationContact from "@/components/crm/customer/contact/detail_contact";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import ChanceAddInfo from "@/components/crm/customer/chance/add_chance";
import DetailInformationChance from "@/components/crm/chance/detail/detail_step_infor";
import HeaderBarChanceDetails from "@/components/crm/chance/detail/header_bar_detail";
import DetailInformation from "@/components/crm/chance/detail/detail";
import Head from "next/head";
import { fetchApi } from "@/components/crm/ultis/api";
import Cookies from "js-cookie";
import useLoading from "@/components/crm/hooks/useLoading";
import { Spin } from "antd";
import { useTrigger } from "@/components/crm/context/triggerContext";

export default function ContactDetailCustomer() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState({});
  const { isOpen } = useContext<any>(SidebarContext);
  const { trigger, setTrigger } = useTrigger();
  const cccd = false;
  const [isHideEmpty, setIsHideEmpty] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const token = Cookies.get("token_base365");

  const fetchAPIChance = async (url: string, bodyAPI = {}) => {
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setData(dataApi?.data);
    stopLoading();
  };

  useEffect(() => {
    setHeaderTitle(`Cơ hội / Chi tiết`);
    setShowBackButton(true);
    setCurrentPath(`/chance/list`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  // useEffect(() => {
  //   fetchAPIChance("http://localhost:3007/api/crm/chance/detail-chance", {
  //     chance_id: id,
  //   });
  // }, []);

  useEffect(() => {
    if (trigger) {
      fetchAPIChance("http://localhost:3007/api/crm/chance/detail-chance", {
        chance_id: id,
      });
    }
    setTrigger(false);
  }, [trigger]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chi tiêt cơ hội</title>
        <meta
          name="description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta name="Keywords" content="Phần mềm CRM, phần mềm crm miễn phí" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
        />
        <meta
          property="og:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          name="twitter:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      {isLoading ? (
        <div
          style={{ marginBottom: "-40px" }}
          ref={mainRef}
          className={styleHome.main}
        >
          <Spin
            style={{
              width: "100%",
              margin: "auto",
              marginTop: "30px",
              height: "100%",
            }}
          />
        </div>
      ) : (
        <>
          <div
            style={{ marginBottom: "-40px" }}
            ref={mainRef}
            className={styleHome.main}
          >
            <DetailInformationChance
              isHideEmpty={isHideEmpty}
              dataApi={data}
              setIsHideEmty={setIsHideEmpty}
            />
            <HeaderBarChanceDetails keyTab={"1"} />
          </div>
          <DetailInformation cccd={cccd} dataApi={data} isHideEmpty={isHideEmpty}/>
        </>
      )}
    </>
  );
}
