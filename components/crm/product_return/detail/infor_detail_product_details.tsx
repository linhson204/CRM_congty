import AddOrderDetailInfo from "@/components/crm/order/order_detail/order_detail_info";
import styles from "./product_return_details.module.css";
import AddOrderDetailDiary from "@/components/crm/order/order_detail/order_detail_diary";
import AddOrderDetailTable from "@/components/crm/order/order_detail/order_detail_table";
import InforText from "@/components/crm/potential/detail/text_info";
import stylesInformation from "../../potential/detail/information.module.css";

export default function InforDetailProductReturnText() {
  return (
    <div className={styles.main_importfile}>
      <div className={styles.formInfoStep}>
        <div className={styles.info_step}>
          <div className={styles.main__title}>Thông tin chi tiết</div>
          <div className={styles.form_add_potential}>
            <div className={styles.main__body}>
              <AddOrderDetailInfo />
              <AddOrderDetailTable />
              {/* <AddOrderDetailStatus /> */}
              <>
                <p
                  style={{ fontSize: "20px" }}
                  className={stylesInformation.table_description}
                >
                  Thông tin địa chỉ
                </p>
                <div className={stylesInformation.row_input_text}>
                  <InforText field="Quốc gia:" value="Việt Nam" />
                  <InforText field="Tỉnh/Thành phố:" value="Hà Nội" />
                  <InforText field="Quận/Huyện:" value="Hoàng mai" />
                  <InforText field="Phường/Xã:" value="Định công" />
                  <InforText
                    field="Số nhà, đường phố:"
                    value="1 Trần Nguyên Đán"
                  />
                  <InforText field="Mã vùng:" value="" />
                  <InforText
                    field="Địa chỉ đơn hàng:"
                    value="1 Trần Nguyên Đán, Định Công,Hoàng Mai, Hà Nội.1 Trần Nguyên Đán, Định Công,Hoàng Mai, Hà Nội"
                  />
                </div>
                <div>
                  <p
                    style={{ fontSize: "20px" }}
                    className={stylesInformation.table_description}
                  >
                    Thông tin mô tả
                  </p>
                  <div
                    className={stylesInformation.custom_potential_input_text}
                  >
                    <InforText field="Mô tả:" value="" />
                  </div>
                </div>
                <div>
                  <p
                    style={{ fontSize: "20px" }}
                    className={stylesInformation.table_description}
                  >
                    Thông tin hệ thống
                  </p>
                  <div className={stylesInformation.row_input_text}>
                    <InforText field="Người tạo:" value="Việt Nam" />
                    <InforText field="Ngày tạo:" value="Hà Nội" />
                    <InforText field="Người sửa:" value="Hoàng mai" />
                    <InforText field="Ngày sửa:" value="Định công" />
                  </div>
                </div>
              </>
            </div>
          </div>

          <div>&nbsp;</div>
          <div className={styles.main__title}>Nhật ký</div>
          <div className={styles.form_add_potential}>
            <div className={styles.main__body}>
              <AddOrderDetailDiary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
