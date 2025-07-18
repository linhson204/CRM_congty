import AddGeneralInfoChance from "./general_info_chance";
import styles from "../../potential/potential2.module.css";
import TableChanceProduct from "@/components/crm/table/table-chance-product";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";
import TextEditor from "@/components/crm/text-editor/text_editor";
import GeneralCustomerInfor from "../add_edit/general_customer_info";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import { useRouter } from "next/router";
export default function ChanceAddInfo() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thêm mới cơ hội</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <AddGeneralInfoChance />
                <TableChanceProduct />

                <div
                  style={{ marginBottom: -10 }}
                  className={styles["main__body__type"]}
                >
                  Thông tin mô tả
                </div>
                <label>Mô tả</label>
                <TextEditor />

                <AddAddressInfo />
                <GeneralCustomerInfor />
              </div>
              <PotentialFooterAddFiles
                link={`customer/chance/list/${id}`}
                titleCancel="Xác nhận hủy thêm mới cơ hội"
                title="Thêm mới cơ hội thành công!"
                contentCancel="Bạn có chắc chắn muốn hủy thêm mới cơ hội Tran Quang Duc Dung?"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
