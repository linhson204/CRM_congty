import AddGeneralInfoChance from "./general_info_chance";
import styles from "../../potential/potential2.module.css";
import TableChanceProduct from "@/components/crm/table/table-chance-product";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";
import GeneralCustomerInfor from "./general_customer_info";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useFormData } from "../../context/formDataContext";
import { MTextAreaV2 } from "../../input_select/input";
import { MModalCompleteStep } from "@/components/commodity/modal";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";
import CompleteModalChance from "../modals/complete_modal";
import CancelModalChance from "../modals/cancel_modal";
import { stringToDateNumber } from "../../ultis/convert_date";
export default function ChanceAddInfo() {
  const { formData, hanldeClearRecall, setFormData } = useContext(useFormData);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalComplete, setIsModalComplete] = useState(false);
  const router = useRouter();
  const token = Cookies.get("token_base365");

  const fetchAPIChance = async () => {
    const body = {
      ...formData,
      // productData: {},
      district_chance: formData?.district_id,
      city_chance: formData?.cit_id,
      ward_chance: formData?.ward,
      share_all: formData?.share_all ? 1 : 0,
      country_chance: 1,
      expected_end_date: stringToDateNumber(formData?.expected_end_date),
    };

    if (formData?.productData?.length && !formData?.productData?.product_ids) {
      const productData = {
        product_ids: [],
        counts: [],
        dvts: [],
        tax_rates: [],
        discount_rates: [],
        prices: [],
      };

      formData?.productData?.forEach((item) => {
        productData.product_ids.push(item._id);
        productData.counts.push(item.count);
        productData.dvts.push(item.unit_id);
        productData.tax_rates.push(item.tax_rate);
        productData.discount_rates.push(item.discount_rate);
        productData.prices.push(item.price);
      });

      body.productData = productData;
    }

    const dataApi = await fetchApi(
      "http://localhost:3007/api/crm/chance/add-chance",
      token,
      body,
      "POST"
    );

    setIsModalComplete(true);
  };

  const handleSave = async () => {
    if (formData?.chance_name && formData?.expected_end_date) {
      await fetchAPIChance();
    } else {
      alert("Vui lòng điền đẩy đủ các thông tin bắt buộc");
    }
  };

  useEffect(() => {
    setFormData({ recall: false });
  }, []);

  return (
    <>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thêm mới cơ hội</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <AddGeneralInfoChance />
                <TableChanceProduct setFormData={setFormData} />
                <div
                  style={{ marginBottom: -10 }}
                  className={styles["main__body__type"]}
                >
                  Thông tin mô tả
                </div>

                <MTextAreaV2 label="Mô tả" />

                <AddAddressInfo formData={formData} setFormData={setFormData} />
                <GeneralCustomerInfor />
              </div>
              <div
                className={styles.main__footer}
                style={{ marginTop: "20px" }}
              >
                <button type="button" onClick={() => setIsModalCancel(true)}>
                  Hủy
                </button>
                <button
                  className={styles.save}
                  type="submit"
                  onClick={() => {
                    handleSave();
                    // setModal1Open(true);
                  }}
                >
                  Lưu
                </button>

                <CancelModalChance
                  isModalCancel={isModalCancel}
                  setIsModalCancel={setIsModalCancel}
                  link="/chance/list"
                />

                <CompleteModalChance
                  modal1Open={isModalComplete}
                  setModal1Open={setIsModalComplete}
                  title="Thêm mới cơ hội thành công"
                  link="/chance/list"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
