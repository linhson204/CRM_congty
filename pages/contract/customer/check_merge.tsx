import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import CheckMergeBody from "@/components/crm/potential/check_merge/check_merge_body";
import CheckMergeInputGroup from "@/components/crm/potential/check_merge/check_merge_input_group";
import Head from "next/head";

const CheckMergeCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkDocument, setCheckDocument] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const [numberSelected, setNumberSelected] = useState(0);
  const [type, setType] = useState("hoặc");
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Danh sách khách hàng / Kiểm tra trùng");
    setShowBackButton(true);
    setCurrentPath("/customer/list");
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
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thiết lập điều kiện</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main_body_merge}>
                  <CheckMergeBody type={type} setType={setType} />
                  <CheckMergeInputGroup
                    label="Tên khách hàng"
                    defaultValue="q1"
                  />
                  <CheckMergeInputGroup
                    type={type}
                    label="Điện thoại"
                    placeholder="Nhập số điện thoại"
                  />
                  <CheckMergeInputGroup
                    type={type}
                    label="Mã số thuế"
                    placeholder="Nhập mã số thuế"
                  />
                  <CheckMergeInputGroup
                    type={type}
                    label="Website"
                    placeholder="Nhập website"
                  />
                  <div>
                    <button className={styles.btn_serach}>Tìm kiếm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckMergeCustomerList;
