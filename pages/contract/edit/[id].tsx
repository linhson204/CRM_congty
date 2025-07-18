import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/contract/contract_action.module.css";
import EditContract from "@/components/crm/contract/contract_actionn/editContract";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import { id } from "date-fns/locale";
import { useRouter } from "next/router";

const EditContractPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { isOpen } = useContext<any>(SidebarContext);
  const [ContractData, setContractData] = useState<any>();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Danh sách hợp đồng / Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/contract/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  //   const getImageBase64 = async () => {
  //     try {
  //       const res = await fetch(`${base_url}/api/crm/contractAI/view`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${Cookies.get("token_base365")}`,
  //         },
  //         body: JSON.stringify({ contract_id: id }),
  //       });

  //       if (res.ok) {
  //         const data = await res.json();

  //         setContractData(data?.data);
  //       } else {
  //         console.error("Error fetching data:", res.status);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error.message);
  //     }
  //   };

  //   useEffect(() => {
  //     getImageBase64();
  //   }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chỉnh sửa hợp đồng</title>
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
        <div className={styles.main_addContract}>
          <div className={styles.formAddContract}>
            <EditContract
              setCheckFile={setCheckFile}
              contractData={ContractData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditContractPage;
