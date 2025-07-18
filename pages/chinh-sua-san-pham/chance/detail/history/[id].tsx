"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import DetailInformationChance from "@/components/crm/chance/detail/detail_step_infor";
import HeaderBarChanceDetails from "@/components/crm/chance/detail/header_bar_detail";
import TableChanceDetailHistory from "@/components/crm/table/table-history-details";
import Head from "next/head";
import Cookies from "js-cookie";
import { fetchApi } from "@/components/crm/ultis/api";
import useLoading from "@/components/crm/hooks/useLoading";
import { useTrigger } from "@/components/crm/context/triggerContext";
import { Spin } from "antd";

export default function HistoryDetail() {
  const router = useRouter();
  const id = router.query.id;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const cccd = false;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const token = Cookies.get("token_base365");
  const [isHideEmpty, setIsHideEmpty] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState({});
  const { trigger, setTrigger } = useTrigger();

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
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);

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
        <title>
          CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận
        </title>
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
      <div ref={mainRef} className={styleHome.main}>
        {isLoading ? (
          <Spin
            style={{
              width: "100%",
              margin: "auto",
              marginTop: "30px",
              height: "100%",
              marginBottom: "30px",
            }}
          />
        ) : (
          <>
            <DetailInformationChance
              isHideEmpty={isHideEmpty}
              dataApi={data}
              setIsHideEmty={setIsHideEmpty}
            />
            <HeaderBarChanceDetails keyTab={"7"} />
          </>
        )}

        <TableChanceDetailHistory />
      </div>
    </>
  );
}
