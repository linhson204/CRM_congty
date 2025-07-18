import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import stylesCustomer from "../customer.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import WriteBillRowInforText from "../detail/write_data_row";
import SystemCustomerInfoContact from "./detail_information/system_info_contact";
import GeneralRowInforTextContact from "./detail_information/general_contact_info";
import Image from "next/image";
import DiaryContact from "./detail_information/diary_contact";
import stylesDetail from "./detail_information/styles_diary.module.css";
import Link from "next/link";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";

interface PropsDetail {
  id1: any;
  id2: any;
}

const DetailInformationContact: React.FC<PropsDetail> = ({ id1, id2 }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <CancelModal
        isModalCancel={isOpenModalCancel}
        setIsModalCancel={setIsOpenModalCancel}
        content={
          "Bạn có chắc chắn muốn hủy thêm mới khách hàng Nguyễn Trần Kim Phượng không ?"
        }
        title={"Xác nhận hủy thêm mới khách hàng"}
        link={`customer/contact/list/${id1}`}
      />
      <div style={{ paddingTop: 0 }} className={styleHome.main} ref={mainRef}>
        <div className={stylesDetail["main__control-btn"]}>
          <Link href="#" className={stylesDetail["btn_edit"]}>
            <Image alt="image" width={16} height={16} src="/crm/edit_kh.svg" />
            Chỉnh sửa
          </Link>
          <button
            className={`${stylesDetail["btn"]} ${stylesDetail["btn_delete"]} ${stylesDetail["h_delete_cus"]}`}
            onClick={() => setIsOpenModalCancel(true)}
          >
            <Image
              alt="image"
              width={16}
              height={16}
              src="/crm/delete_kh.svg"
            />
            Xóa
          </button>
        </div>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Chi tiết liên hệ</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    {/* Image and Contact */}
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                        gap: "15px",
                      }}
                    >
                      <div style={{ maxWidth: "50%", flex: "0 0 50% " }}>
                        <p className={styles["main__body__type"]}>Ảnh</p>
                        <div id="upload">
                          <img
                            src="/assets/img/crm/customer/upload_logo.png"
                            alt=""
                            className={styles["show_avatar"]}
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

                      <div
                        style={{
                          maxWidth: "50%",
                          flex: "0 0 40% ",
                          marginRight: "30px",
                        }}
                      >
                        <p className={styles["main__body__type"]}>
                          Loại liên hệ
                        </p>
                        <div className={styles.chekbox_contact}>
                          <p
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "1rem",
                            }}
                          >
                            <Image
                              width={16}
                              height={16}
                              alt="check"
                              src="/crm/dungchung_kh.svg"
                            />
                            Liên hệ đại diện
                          </p>
                          <p
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "1rem",
                            }}
                          >
                            <Image
                              width={16}
                              height={16}
                              alt="check"
                              src="/crm/dungchung_kh.svg"
                            />
                            Liên hệ nhận hóa đơn
                          </p>
                          <p
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "1rem",
                            }}
                          >
                            <Image
                              width={16}
                              height={16}
                              alt="check"
                              src="/crm/dungchung_kh.svg"
                            />
                            Liên hệ giao hàng
                          </p>
                          <p
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "1rem",
                            }}
                          >
                            <Image
                              width={16}
                              height={16}
                              alt="check"
                              src="/crm/dungchung_kh.svg"
                            />
                            Liên hệ thủ trưởng đơn vị
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Thong tin chung */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin chung
                    </p>
                    <GeneralRowInforTextContact />

                    {/* Thông tin địa chỉ */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin địa chỉ
                    </p>
                    <WriteBillRowInforText />

                    {/* Thong tin giao hang */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin giao hàng
                    </p>
                    <WriteBillRowInforText />

                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin mô tả
                    </p>
                    <div className={styles.col_lg_input}>
                      <div
                        style={{ justifyContent: "flex-start", border: "0" }}
                        className={stylesCustomer.main_profile_body_item}
                      >
                        <div
                          className={
                            stylesCustomer.main__profile__body__item__title
                          }
                        >
                          Mô tả:
                        </div>
                        <div
                          className={
                            stylesCustomer.main__profile__body__item__value
                          }
                        >
                          ádsdasd
                        </div>
                      </div>
                    </div>

                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SystemCustomerInfoContact />
      <DiaryContact />
    </>
  );
};

export default DetailInformationContact;
