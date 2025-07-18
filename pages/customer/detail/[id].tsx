"use client";
import DetailInformation from "@/components/crm/customer/detail/detail";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { base_url } from "@/components/crm/service/function";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
import Head from "next/head";
const Cookies = require("js-cookie");
import queryString from 'query-string';

export default function DetailCustomer() {
  const pathname = usePathname();
  const router = useRouter();
  const { id } = router.query;
  const [name, setname] = useState<any>();
  const [listData, setListData] = useState<any>();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const getNameDetail = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: id }),
    });
    const data = await res.json();
    setListData(data?.data);
  };
  console.log("check", router.query)
  useEffect(() => {
    getNameDetail();
    setShowBackButton(true);
    setHeaderTitle(`${listData?.name} / Thông tin khách hàng`);
    const queryParams = {
      ...router.query
    }
    delete queryParams.id
    delete queryParams.name
    delete queryParams.abc
    const queryStringParams = queryString.stringify(queryParams);

    setCurrentPath(`/customer/list?${queryStringParams}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id, listData?.name]);



  return (
    <>

      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thông tin khách hàng</title>
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

      {!checkAndRedirectToHomeIfNotLoggedIn() ? null : (
        <div>
          <CustomerHeaderTab activeName={"Thông tin khách hàng"} />
          <DetailInformation cccd={true} listData={listData} />
        </div>
      )}
    </>
  );
}
