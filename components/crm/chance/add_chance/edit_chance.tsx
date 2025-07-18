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
import { timestampToCustomString } from "../../ultis/convert_date";
import useLoading from "../../hooks/useLoading";
import { Spin } from "antd";
export default function ChanceEdit() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, hanldeClearRecall, setFormData } = useContext(useFormData);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalComplete, setIsModalComplete] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token_base365");

  const fetchAPIChance = async (url: string, bodyAPI = {}, type = "post") => {
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    if (type !== "post") {
      const data = dataApi?.data;
      setFormData({
        chance_id: id,
        id_customer: data?.detailChance?.cus_id,
        contact_id: data?.detailChance?.contact_id,
        chance_name: data?.detailChance?.name,
        chance_type: data?.detailChance?.type,
        reason: data?.detailChance?.reason,
        group_commodities: data?.detailChance?.group_commities,
        result: data?.detailChance?.result,
        stages: data?.detailChance?.stages,
        success_rate: data?.detailChance?.success_rate,
        expected_sales: data?.detailChance?.expected_sales,
        expected_end_date: timestampToCustomString(
          data?.detailChance?.expected_end_date / 1000
        ),
        campaign_id: data?.detailChance?.campaign_id,
        soure: data?.detailChance?.source,
        total_money: data?.detailChance?.total_money,
        description: data?.detailChance?.description,
        country: "Việt Nam",
        district_id: data?.detailChance?.district_chance,
        cit_id: data?.detailChance?.city_chance,
        district_chance: data?.detailChance?.district_chance,
        ward: data?.detailChance?.ward_chance,
        street_chance: data?.detailChance?.street_chance,
        area_code_chance: data?.detailChance?.area_code_chance,
        address_chance: data?.detailChance?.address_chance,
        share_all: data?.detailChance?.share_all ? true : false,
        emp_id: data?.detailChance?.emp_id?.idQLC,
        productData: data?.data?.map((item, i) => {
          return {
            ...item,
            _id: item?.product_id,
            dvt: {
              unit_name: item?.unit_name,
              unit_id: item?.dvt,
            },
            key: i,
            count: item?.count || Number(item?.min_amount) || 0,
            money:
              item?.money ||
              item?.product_cost ||
              item?.price * Number(item?.min_amount) ||
              0,
            discount_rate: item?.discount_rate || 0,
            discount_money: item?.discount_money || item?.money_discount || 0,
            tax_rate: item?.tax_rate || 0,
            tax_money: item?.tax_money || item?.money_tax || 0,
            total: item?.total
              ? item?.total
              : item?.price * Number(item?.min_amount),
          };
        }),
      });
    }
    stopLoading();
    return dataApi;
  };

  const handleSave = async () => {
    const body = {
      ...formData,
      // productData: {},
      name: formData?.chance_name,
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

    if (formData?.chance_name && formData?.expected_end_date) {
      const data = await fetchAPIChance(
        "http://localhost:3007/api/crm/chance/edit-chance",
        body
      );
      if (data) {
        setIsModalComplete(true);
      }
    } else {
      alert("Vui lòng điền đẩy đủ các thông tin bắt buộc");
    }
  };

  useEffect(() => {
    setFormData({ recall: false });
    fetchAPIChance(
      "http://localhost:3007/api/crm/chance/detail-chance",
      {
        chance_id: id,
      },
      "get"
    );
  }, []);

  return (
    <>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Chỉnh sửa cơ hội</div>

            {isLoading ? (
              <Spin
                style={{ width: "100%", margin: "auto", marginTop: "30px" }}
              />
            ) : (
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <AddGeneralInfoChance />
                  <TableChanceProduct
                    setFormData={setFormData}
                    dataTable={formData?.productData}
                  />
                  <div
                    style={{ marginBottom: -10 }}
                    className={styles["main__body__type"]}
                  >
                    Thông tin mô tả
                  </div>

                  <MTextAreaV2 label="Mô tả" />

                  <AddAddressInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
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
                    content="Bạn có chắc chắn muốn hủy chỉnh sửa cơ hội, mọi thông tin bạn nhập sẽ không được lưu lại?"
                    title="Xác nhận huỷ chỉnh sửa cơ hội"
                  />

                  <CompleteModalChance
                    modal1Open={isModalComplete}
                    setModal1Open={setIsModalComplete}
                    title="Chỉnh sửa cơ hội thành công"
                    link="/chance/list"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
