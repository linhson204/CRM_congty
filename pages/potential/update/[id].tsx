import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import AddGeneralInfo from "@/components/crm/potential/potential_add_files/general_infor";
import AddPersonalInfo from "@/components/crm/potential/potential_add_files/personal_info";
import AddDesriptionAndSystemInfo from "@/components/crm/potential/potential_add_files/description_system_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import { axiosCRM } from "@/utils/api/api_crm";
import { useRouter } from "next/router";
import { notifyError } from "@/utils/function";
import UpdateOrganizeInfo from "@/components/crm/potential/potential_add_files/organize_update";
import UpdateAddressInfo from "@/components/crm/potential/potential_add_files/update_address";
import { MModalCompleteStep } from "@/components/commodity/modal";
import { error } from "highcharts";

const EditFilesPotential: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [formData, setFormData] = useState<any>({
    logo: "",
    vocative: 0,
    stand_name: "",
    name: "",
    pos_id: 0,
    department: 0,
    private_phone: "",
    office_phone: "",
    office_email: "",
    private_email: "",
    resource: 0,
    tax_code: "",
    classify: "",
    Facebook: "",
    Zalo: "",
    Twitter: "",
    Instagram: "",
    Telegram: "",
    Tiktok: "",
    Skype: "",
    Youtube: "",
    Linkedn: "",
    emp_id: 0,
    gender: 0,
    birthday: "",
    office: "",
    bank_account: "",
    bank_id: "",
    founding_date: "",
    business_type: "",
    sector: [],
    category: [],
    revenue: 0,
    city_id: 0,
    district_id: 0,
    ward: "",
    address: "",
    area_code: "",
    description: "",
    status: "",
    share_all: false,
  });
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/potential/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axiosCRM
      .post("/potential/detail-potential", { cus_id: id })
      .then((res) => {
        console.log("CHeckres", res.data.data.data);
        handleData({
          ...res.data.data.data,
        });
      })
      .catch((err) => {
        console.log("CHeckerr", err), notifyError("Vui lòng thử lại sau");
      });
  }, []);
  const handleData = async (datas) => {
    const convertSocialArr = [];
    for (const key in datas.potential_id.social) {
      if (datas.potential_id.social[key]) {
        convertSocialArr.push(key);
      }
    }
    const convertSector = [];
    datas?.potential_id?.sector?.split(",")?.forEach((item) => {
      convertSector.push(Number(item));
    });
    const convertCategory = [];
    datas?.potential_id?.category?.split(",")?.forEach((item) => {
      convertCategory.push(Number(item));
    });
    const convertData = {
      ...datas,
      ...datas.potential_id,
      ...datas.potential_id.social,
      arrSocial: convertSocialArr,
      category: convertCategory,
      sector: convertSector,
      area_code: datas.bill_area_code,
    };
    console.log("check convertData", convertData);
    setFormData({ ...convertData });
  };
  const handleClickImg = () => {
    imgRef?.current?.click();
  };

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  const handleUpdate = () => {
    axiosCRM
      .post("/potential/edit_potential", {
        ...formData,
        category: formData?.category?.join(","),
        sector: formData?.sector?.join(","),
      })
      .then((res) => setModal1Open(true))
      .catch((error) => {
        console.log("checkerrrr", error);
        notifyError("Vui lòng thử lại sau");
      });
  };
  if (!formData.name) {
    return "loadding";
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chỉnh sửa tiềm năng</title>
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
              <div className={styles.main__title}>Chỉnh sửa tiềm năng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <p className={styles["main__body__type"]}>Ảnh</p>
                    <div id="upload">
                      <img
                        src="/crm/upload_logo.png"
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
                      />
                    </div>
                  </div>

                  <AddGeneralInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddPersonalInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <UpdateOrganizeInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <UpdateAddressInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddDesriptionAndSystemInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
                <div className={styles.main__footer}>
                  <button
                    className={styles.save}
                    type="submit"
                    onClick={() => {
                      handleUpdate();
                    }}
                  >
                    Lưu
                  </button>

                  <MModalCompleteStep
                    modal1Open={modal1Open}
                    setModal1Open={setModal1Open}
                    title={`Sửa tiềm năng ${formData.name} thành công`}
                    link={`/potential/detail/${id}`}
                  />
                </div>
                {/* <PotentialFooterAddFiles
                  handleSave={handleUpdate}
                  title="Sửa tiềm năng tên Tiềm năng thành công"
                  contentCancel={
                    "Bạn có chắc chắn muốn hủy sửa tiềm năng Tên tiềm năng mọi thông tin bạn nhập sẽ không được lưu lại?"
                  }
                  titleCancel={"Xác nhận hủy sửa tiềm năng"}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFilesPotential;
