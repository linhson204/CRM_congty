import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddAddressInfoCustomer from "@/components/crm/customer/add_edit/address_info";
import AddDeliveryInfo from "@/components/crm/potential/potential_add_files/delivery_info";
import { useHeader } from "@/components/crm/hooks/useHeader";
import AddPersonalCustomerInfor from "@/components/crm/customer/add_edit/personal_infor";
import AddCustomerBankInfo from "@/components/crm/customer/add_edit/bank_infor";
import TextEditor from "@/components/crm/text-editor/text_editor";
import GeneralCustomerInfor from "@/components/crm/customer/add_edit/general_customer_info";
import CustomomerFooterAddFile from "@/components/crm/customer/add_edit/customer_footer_add_file";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
import Head from "next/head";

const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    cus_id: "",
    stand_name: "",
    logo: "",
    birthday: "",
    tax_code: "",
    cit_id: "",
    district_id: "",
    ward: "",
    address: "",
    ship_invoice_address: "",
    gender: "",
    cmnd_ccnd_number: "",
    cmnd_ccnd_address: "",
    cmnd_ccnd_time: "",
    description: "",
    introducer: "",
    contact_name: "",
    phone_number: "",
    contact_email: "",
    contact_phone: "",
    contact_gender: "",
    company_id: "",
    emp_id: "",
    user_create_id: "",
    user_create_type: "",
    user_edit_id: "",
    user_edit_type: "",
    group_id: "",
    status: "",
    business_areas: "",
    category: "",
    business_type: "",
    classify: "",
    bill_city: "",
    bil_district: "",
    bill_ward: "",
    bill_address: "",
    bill_area_code: "",
    bill_invoice_address: "",
    bill_invoice_address_email: "",
    ship_city: "",
    ship_area: "",
    bank_id: "",
    bank_account: "",
    revenue: "",
    size: "",
    rank: "",
    website: "",
    number_of_day_owed: "",
    deb_limit: "",
    share_all: "",
    type: 1,
    is_input: "",
    is_delete: "",
    created_at: "",
    updated_at: "",
    id_cus_from: "",
    cus_from: "",
    link: "",
  });

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Khách hàng / Thêm mới");
    setShowBackButton(true);
    setCurrentPath("/customer/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const handleClickImg = () => {
    const img = imgRef?.current?.click();
  };
  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setFormData((preData: any) => {
        return {
          ...preData,
          logo: selectedImage,
        };
      });
    }
  };
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
        <title>Thêm mới khách hàng</title>
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
                      <p className={styles["main__body__type"]}>Loại hình</p>
                      <div className="d_flex">
                        <label className="lbl_container">
                          <input
                            type="radio"
                            defaultChecked
                            className="get_data"
                            name="type"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                type: parseInt(e.target.value),
                              })
                            }
                            value={1}
                          />
                          Khách hàng doanh nghiệp
                          <span className="checkmark" />
                        </label>
                        <label className="lbl_container">
                          <input
                            type="radio"
                            className="get_data"
                            name="type"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                type: parseInt(e.target.value),
                              })
                            }
                            value={2}
                          />
                          Khách hàng cá nhân
                          <span className="checkmark" />
                        </label>
                      </div>

                      {/* Image */}
                      <p className={styles["main__body__type"]}>Ảnh</p>
                      <div id="upload">
                        <img
                          src="/crm/choose_img.png"
                          alt="hungha365.com"
                          className={styles["show_avatar"]}
                          onClick={handleClickImg}
                        />
                        <input
                          ref={imgRef}
                          type="file"
                          name="logo"
                          className=""
                          id="logo"
                          hidden
                          accept="image/png,image/gif,image/jpeg"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    <AddPersonalCustomerInfor
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <AddAddressInfoCustomer
                      formData={formData}
                      setFormData={setFormData}
                      title="Thông tin viết hóa đơn"
                    />
                    <AddDeliveryInfo title="Thông tin giao hàng" />
                    <AddCustomerBankInfo />

                    {/* Text Editor */}
                    <div
                      style={{ marginBottom: -10 }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin mô tả
                    </div>
                    <TextEditor />
                    <GeneralCustomerInfor />
                  </div>
                  <CustomomerFooterAddFile
                    link="/customer/list"
                    titleCancel="Xác nhận hủy thêm mới khách hàng"
                    title="Thêm mới khách hàng qwe thành công!"
                    contentCancel="Bạn có chắc chắn muốn hủy thêm mới khách hàng Nguyễn Trần Kim Phượng không ?"
                    formData={formData}
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
