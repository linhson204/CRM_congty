import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/customer/input_data/footer_input_data";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Info_cus from "@/components/crm/customer/input_data/info_cus";
import Bot_textEditor from "@/components/crm/customer/input_data/bot_textEditor";
import TextEditorNhapLieu from "@/components/crm/text-editor/text_editor_nhaplieu";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
import Head from "next/head";

const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [dataAdd, setDataAdd] = useState({
    name: "",
    phone_number: null,
    email: "",
    resoure: null,
    description: "",
    parent_group: null,
    user_create_id: null,
    // child_group:null
  });
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Thêm mới khách hàng");
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
        <title>Thêm mới nhập liệu khách hàng</title>
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
        <div className={styleHome.main} ref={mainRef}>
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.main__title}>Thêm mới khách hàng</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <div className={styles["main__body_item"]}>
                      {/* Type Customer */}
                      {/* Image */}
                      <Info_cus dataAdd={dataAdd} setDataAdd={setDataAdd} />
                    </div>

                    {/* Text Editor */}
                    <div
                      style={{ marginBottom: 0 }}
                      className={styles["main__body__type"]}
                    >
                      Mô tả khách hàng
                    </div>
                    <TextEditorNhapLieu
                      dataAdd={dataAdd}
                      setDataAdd={setDataAdd}
                    />
                    <Bot_textEditor dataAdd={dataAdd} setDataAdd={setDataAdd} />
                  </div>
                  <PotentialFooterAddFiles
                    link="/customer/list"
                    titleCancel="Xác nhận hủy thêm mới khách hàng"
                    title="Thêm mới khách hàng thành công!"
                    contentCancel="Bạn có chắc chắn muốn hủy thêm mới khách hàng không ?"
                    dataAdd={dataAdd}
                    setDataAdd={setDataAdd}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFilesCustomerList;
