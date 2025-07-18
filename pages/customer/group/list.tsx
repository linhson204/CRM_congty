import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableDataGroupListCustomer from "@/components/crm/table/table-group-list";
import HeaderBtnsCustomerGroup from "@/components/crm/customer/group_customer/header_btns_group_customer";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
import Head from "next/head";
import { useApi } from "@/components/crm/hooks/useApi";

export default function GroupCustomer() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const [selectedRows, setSelectedRow] = useState<any>([]);
  const [change, setChange] = useState(0);
  const [valFilter, setValFilter] = useState("");
  const [dataFilter, setDataFilter] = useState<any>();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const accessToken = Cookies.get("token_base365");

  useEffect(() => {
    setHeaderTitle("Danh sách nhóm khách hàng");
    setShowBackButton(false);
    // setCurrentPath("/customer/roup/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const handleGetGr = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ page: 1, perPage: 100 }),
        }
      );
      const data = await res.json();
      if (data && data?.data) setDataFilter(data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleGetGr();
  }, [change]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const handleClickSearch = () => {
    const newDataFilter = dataFilter?.filter((item) => {
      if (valFilter) {
        const defaultVal = item?.gr_name?.toLowerCase();
        return defaultVal?.includes(valFilter.toLowerCase());
      } else {
        handleGetGr();
      }
      return item;
    });
    setDataFilter(newDataFilter);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Danh sách nhóm khách hàng</title>
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
        <div ref={mainRef} className={styleHome.main}>
          <HeaderBtnsCustomerGroup
            isSelectedRow={isSelectedRow}
            selectedRow={selectedRows}
            updateData={handleGetGr}
            valFilter={valFilter}
            setValFilter={setValFilter}
            handleClickSearch={handleClickSearch}
          />
          <TableDataGroupListCustomer
            setSelected={setIsSelectedRow}
            setNumberSelected={setNumberSelected}
            setSelectedRow={setSelectedRow}
            setChange={setChange}
            change={change}
            data={dataFilter}
            updateData={handleGetGr}
          />
        </div>
      )}
    </>
  );
}
