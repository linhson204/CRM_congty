import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import { MInputTextV2 } from "../../input_select/input";
import { SelectSingleV2 } from "../../input_select/select";
import { LIST_CITY } from "@/constants/address-constant";
import { getPotentialResource } from "@/utils/listOption";
import { useEffect, useState } from "react";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";
export default function AddGeneralInfoChance() {
  const [listCustomer, setListCustomer] = useState<any>([]);
  const [listContact, setListContact] = useState<any>([]);
  const [listCommodities, setListCommodities] = useState<any>([]);
  const [listReason, setListReason] = useState<any>([]);
  const [listCampaign, setListCampaign] = useState<any>([]);
  const [listEmp, setListEmp] = useState<any>([]);
  const token = Cookies.get("token_base365");

  const statusList = [
    { value: 1, label: "Chưa cập nhật" },
    { value: 2, label: "Mở đầu" },
    { value: 3, label: "Khách hàng quan tâm" },
    { value: 4, label: "Demo/Gthieu" },
    { value: 5, label: "Đàm phán/ thương lương" },
  ];

  const listReasons = [
    { value: 1, label: "Giá cả và chính sách bán hàng tốt" },
    { value: 2, label: "Dịch vụ chăm sóc khách hàng của công ty tốt" },
    { value: 3, label: "Tin tưởng thương hiệu của công ty" },
    { value: 4, label: "Khả năng thuyết phục khách hàng của NVKD tốt" },
    { value: 5, label: "Sản phẩm đáp ứng yêu cầu của khách hàng" },
  ];

  const fetchAPICustomer = async () => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/customer/list",
      token,
      {},
      "POST"
    );
    setListCustomer( dataApi?.data?.map((item) => {
      return {
        value: item?.cus_id,
        label: item?.name,
      };
    }));
  };

  const fetchAPICampaign = async () => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/campaign/listCampaign",
      token,
      {},
      "POST"
    );
    setListCampaign(
      dataApi?.data?.data?.map((item) => {
        return {
          value: item?._id,
          label: item?.nameCampaign,
        };
      })
    );
  };

  const fetchAPIGroupProduct = async () => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/product/show-product-group",
      token,
      {},
      "POST"
    );
    setListCommodities( dataApi?.data?.data?.map((item) => {
      return {
        value: item?._id,
        label: item?.gr_name,
      };
    }));
  };

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setListEmp(
      dataApi?.data?.data?.map((item) => {
        return {
          value: item?.ep_id,
          label: item?.userName,
        };
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchAPICustomer(),
          fetchAPIEmployee(),
          fetchAPIGroupProduct(),
          fetchAPICampaign(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <SelectSingleV2
          label={"Khách hàng"}
          name="id_customer"
          data={listCustomer}
          placeholder="Chọn"
        />
        <SelectSingleV2
          label="Liên hệ"
          name="contact_id"
          data={[]}
          placeholder="Chọn"
        />
      </div>

      <div className={styles.row_input}>
        <MInputTextV2
          label="Tên cơ hội"
          require
          placeholder="Nhập tên cơ hội"
          name="chance_name"
        />
        <SelectSingleV2
          label="Loại cơ hội"
          name="chance_type"
          data={[]}
          placeholder="Chọn"
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Nhóm hàng hóa"
          name="group_commodities"
          data={listCommodities}
          placeholder="Chọn"
        />
        <MInputTextV2
          label="Số tiền"
          type = "number"
          placeholder="Nhập số tiền"
          name="total_money"
          // disable = {true}
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Giai đoạn"
          name="reason"
          data={statusList}
          placeholder="Chọn"
        />
        <MInputTextV2
          label="Tỷ lệ thành công"
          type = "number"
          placeholder="Nhập tỉ lệ thành công"
          name="success_rate"
        />
      </div>

      <div className={styles.row_input}>
        <MInputTextV2
          label="Doanh số kỳ vọng"
          placeholder="Nhập doanh số kỳ vọng"
          name="expected_sales"
        />
        <MInputTextV2
          type="date"
          require={true}
          label="Ngày kỳ vọng/kết thúc"
          placeholder="Ngày kỳ vọng/kết thúc"
          name="expected_end_date"
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Chiến dịch"
          name="campaign_id"
          data={listCampaign}
          placeholder="Chọn"
        />
        <SelectSingleV2
          label="Nguồn gốc"
          name="soure"
          data={getPotentialResource}
          placeholder="Chọn"
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Nhân viên phụ trách"
          name="emp_id"
          data={listEmp}
          placeholder="Chọn"
        />
      </div>
    </div>
  );
}
