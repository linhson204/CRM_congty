import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import AddGeneralInfo from "@/components/crm/potential/potential_add_files/general_infor";
import AddPersonalInfo from "@/components/crm/potential/potential_add_files/personal_info";
import AddOrganizeInfo from "@/components/crm/potential/potential_add_files/organize_info";
import AddDesriptionAndSystemInfo from "@/components/crm/potential/potential_add_files/description_system_add_files";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import { notifyWarning } from "@/utils/function";
import { axiosCRMUpfile } from "@/utils/api/api_crm";
import { MCancelModal, MModalCompleteStep } from "@/components/commodity/modal";
import { useRouter } from "next/router";
const AddFilesPotential: React.FC = () => {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [urlImg, setUrlImg] = useState("/crm/upload.png");
  const [logo, setLogo] = useState<any>();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [formData, setFormData] = useState<any>({
    arrSocial: [],
    sector: [],
    category: [],
  });
  const [arrPrivatePhone, setArrPrivatePhone] = useState<any>([""]);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Thêm mới");
    setShowBackButton(true);
    setCurrentPath("/potential/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const handleClickImg = () => {
    imgRef?.current?.click();
  };
  const handleChangeLogo = (e) => {
    if (e.target.files[0]) {
      setUrlImg(URL.createObjectURL(e.target.files[0]));
      setLogo(e.target.files[0]);
    }
  };
  const formAdd = new FormData();
  const handleAddFile = () => {
    if (!formData.name) {
      notifyWarning("Nhập tên khách hàng");
      return;
    }
    for (const key in formData) {
      formAdd.append(key, formData[key]);
    }
    logo && formAdd.append("logo", logo);
    formAdd.append("private_phone", arrPrivatePhone);
    axiosCRMUpfile
      .post("/potential/add_potential", formAdd)
      .then((res) => setModal1Open(true))
      .catch((err) => console.log("handleAddFileERR", formAdd));
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
        <title>Thêm mới tiềm năng</title>
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
              <div className={styles.main__title}>Thêm mới tiềm năng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <p className={styles["main__body__type"]}>Ảnh</p>
                    <div id="upload">
                      <img
                        src={urlImg}
                        alt="hungha365.com"
                        className={styles["show_avatar"]}
                        onClick={handleClickImg}
                      />
                      <input
                        onChange={(e) => handleChangeLogo(e)}
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
                    //done
                    arrPrivatePhone={arrPrivatePhone}
                    setArrPrivatePhone={setArrPrivatePhone}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  {/* Done */}
                  <AddPersonalInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddOrganizeInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddAddressInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddDesriptionAndSystemInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
                <div className={styles.main__footer}>
                  <button type="button" onClick={() => setIsModalCancel(true)}>
                    Hủy
                  </button>
                  <button
                    className={styles.save}
                    type="submit"
                    onClick={() => {
                      handleAddFile();
                      // setModal1Open(true);
                    }}
                  >
                    Lưu
                  </button>

                  {
                    <MCancelModal
                      isModalCancel={isModalCancel}
                      setIsModalCancel={setIsModalCancel}
                      content={`Bạn có chắc chắn muốn hủy thêm mới tiềm năng ${formData.name}, mọi thông tin bạn nhập sẽ không được lưu lại ? `}
                      title={"Hủy thêm mới"}
                      updateData={() => router.reload()}
                      // link={link}
                    />
                  }

                  <MModalCompleteStep
                    modal1Open={modal1Open}
                    setModal1Open={setModal1Open}
                    title={"Thêm mới Tiềm năng thành công!"}
                    link={"/potential/list"}
                  />
                </div>
                {/* <PotentialFooterAddFiles title="Thêm mới tiềm năng tên Tiềm năng thành công" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFilesPotential;
