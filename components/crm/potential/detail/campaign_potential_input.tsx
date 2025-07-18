import React, { useContext, useEffect, useState } from "react";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignAction from "@/components/crm/campaign/campaign_action";
import CampaignSelectBox from "@/components/crm/campaign/campaign_selectt";
import Link from "next/link";
import ShowCampaignPOMD from "../mdal_action/mdal_show_campaignPO";
import SelectSingle from "@/components/commodity/select";
import { useFormData } from "../../context/formDataContext";
import { axiosQLC } from "@/utils/api/api_qlc";
import { notifyError } from "@/utils/function";
import TableDataCampaign from "../../table/table-campaign";
import Cookies from "js-cookie";
import useLoading from "../../hooks/useLoading";
import { fetchApi } from "../../ultis/api";
import { useTrigger } from "../../context/triggerContext";
import { Spin } from "antd";
import { useRouter } from "next/router";
export default function CampaignInputGroupsPO({ isSelectedRow }: any) {
  const handleClickSelectoption = () => {};
  const [isModalCancelPO, setIsModalCancelPO] = useState(false);
  const {
    setFormData,
    handleChangeData,
    formData,
    handleRecall,
    handleChangeAndRecall,
  } = useContext(useFormData);
  const [listEmp, setListEmp] = useState([]);
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const token = Cookies.get("token_base365");
  const [data, setData] = useState([]);
  const { trigger, setTrigger } = useTrigger();
  const url = "https://api.timviec365.vn/api/crm/campaign/listCampaign";
  const dataStatus = [
    { label: "Chưa cập nhật", value: 1 },
    { label: "Chưa diễn ra", value: 2 },
    { label: "Đã kết thúc", value: 3 },
    { label: "Đang tạm dừng", value: 4 },
    { label: "Đang diễn ra", value: 5 },
  ];

  const onClose = () => {
    setIsModalCancelPO(false);
  };

  const fetchAPICampaign = async () => {
    const bodyAPI = {
      ...formData,
      status: formData?.status ? formData?.status : "",
      empID: formData?.empID ? formData?.empID : "",
      nameCampaign: formData?.nameCampaign ? formData?.nameCampaign : "",
      cus_id: router.query.id,
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setData(dataApi?.data);
    stopLoading();
  };

  useEffect(() => {
    axiosQLC
      .post("/managerUser/listUser", { ep_status: "Active" })
      .then((res) => convertDataEmp(res.data.data.data))
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  }, []);
  const convertDataEmp = (datas) => {
    setListEmp(
      datas.map((item: any) => ({
        ...item,
        value: item.ep_id,
        label: item.userName,
      }))
    );
  };

  useEffect(() => {
    if (trigger) {
      fetchAPICampaign();
    }
    setTrigger(false);

    return () => {
      setTrigger(true);
    };
  }, [trigger]);

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        {/* <CampaignSelectBox title="Tình trạng:" value="Tất cả" /> */}
        <SelectSingle
          onChange={handleRecall}
          data={dataStatus}
          title="Trạng thái"
          setFormData={setFormData}
          name="status"
        />
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian tạo:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>
        {/* <CampaignSelectBox title="Người phụ trách:" value="Tất cả" /> */}
        <SelectSingle
          onChange={handleRecall}
          data={listEmp}
          title="Người phụ trách:"
          setFormData={setFormData}
          name="ep_id"
        />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên chiến dịch"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <button
            onClick={() => setIsModalCancelPO(true)}
            type="button"
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="check-square"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path>
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path>
            </svg>
            Chọn vào
          </button>
          <ShowCampaignPOMD
            isModalCancelPO={isModalCancelPO}
            onClose={onClose}
          />
        </div>
      </div>

      <CampaignAction />
      {isLoading ? (
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      ) : (
        <TableDataCampaign
          dataAPI={data}
          empList={listEmp}
          setBody={setFormData}
          body={formData}
        />
      )}
    </div>
  );
}
