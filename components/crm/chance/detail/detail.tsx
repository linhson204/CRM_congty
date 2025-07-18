import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../potential/potential2.module.css";
import stylesChance from "../chance.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import GeneralRowInforText from "./general_row_info";
import AddressRowInforTextChance from "./address_info";
import SystemInfoRowChance from "./system_infor";
import CCCDInforRow from "./cccd_infor_row";
import DiaryChanceList from "./diary";
import AddOrderDetailTable from "../../order/order_detail/order_detail_table";
import ChanceProductDetailTable from "./chance_detail_table";

interface DetailChance {
  description: string;
  result: number;
  expected_end_date: number;
  expected_sales: number;
  total_money: number;
  stages: number;
  name: string;
  success_rate: number;
}

interface ComponentProps {
  cccd: boolean;
  isHideEmpty: boolean;
  dataApi: {
    result?: boolean;
    message?: string;
    total_money?: number;
    total_count?: number;
    total_product_cost?: number;
    total_tax?: number;
    total_money_discount?: number;
    data?: [];
    detailChance?: DetailChance;
  };
}

const DetailInformation: React.FC<ComponentProps> = ({
  cccd = true,
  dataApi,
  isHideEmpty,
}) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <div style={{ paddingTop: 0 }} className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin khách hàng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    {/* Thong tin chung */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin chung
                    </p>
                    <GeneralRowInforText
                      formData={dataApi}
                      isHideEmpty={isHideEmpty}
                    />
                    <br />
                    <ChanceProductDetailTable
                      formData={dataApi}
                    />
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin mô tả
                    </p>
                    <div className={styles.col_lg_input}>
                      <div
                        style={{
                          justifyContent: "flex-start",
                          border: "0",
                          display:
                            isHideEmpty &&
                            !dataApi?.detailChance?.description &&
                            "none",
                        }}
                        className={stylesChance.main_profile_body_item}
                      >
                        <div
                          className={
                            stylesChance.main__profile__body__item__title
                          }
                        >
                          Mô tả:
                        </div>
                        <div
                          className={
                            stylesChance.main__profile__body__item__value
                          }
                        >
                          {dataApi?.detailChance?.description ||
                            "Chưa cập nhật"}
                        </div>
                      </div>
                    </div>
                    {/* Thong tin hoa don */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin địa chỉ
                    </p>
                    <AddressRowInforTextChance
                      formData={dataApi}
                      isHideEmpty={isHideEmpty}
                    />

                    {/* Thong tin bo sung */}
                    <p
                      style={{ marginTop: "20px" }}
                      className={styles["main__body__type"]}
                    >
                      Thông tin hệ thống
                    </p>
                    <SystemInfoRowChance
                      formData={dataApi}
                      isHideEmpty={isHideEmpty}
                    />
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DiaryChanceList formData={dataApi} />
    </>
  );
};

export default DetailInformation;
