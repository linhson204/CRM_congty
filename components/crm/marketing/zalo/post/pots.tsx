import React, { useEffect, useState } from "react";
import styleCampaignInput from "@/components/crm/campaign/campaign.module.css";
import GroupFormInputGroup from "./post_form_input";
import styles from "./post.module.css";
import TableDataZaloPost from "@/components/crm/table/table_marketing_zalo_post";
import CurrentGroup from "../group/current_group";
import { axiosCRM, axiosCRMv2 } from "@/utils/api/api_crm";
import { notifyError } from "@/utils/function";
import { Spin } from 'antd';
import { useHeader } from "@/components/crm/hooks/useHeader";

const PostZalo = () => {
  const [ isLoading, setIsLoading ]= useState(false);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<String>();
  const [data, setData] = useState<any>();
  const [dataTable, setDataTaable] = useState<any>();
  const [valueInput, setValueInput] = useState<string>("");
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Zalo/ Lịch đăng bài");
    setShowBackButton(true);
    setCurrentPath("/marketing/zalo/post");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const listPage = [{
    'name': "Tài khoản Zalo",
    'path' : '/',
  }, {
    'name': "Kịch bản tin",
    'path' : '/kich-ban-tin',
  },
  {
    'name': "Lịch đăng bài",
    'path' : '/post-add',
  },
  {
    'name': "Shop",
    'path' : '/zalo',
  } ];

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    await axiosCRM
      .post("/marketingZalo/getListPostSchedule")
      .then((res) => {
        setData(res.data.data), setDataTaable(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => notifyError("Đã có lỗi laasy dữ liệu!"));
  };

  const filterData = (name: string) => {
    const filterData = dataTable.data.filter(
      (itemData) => itemData?.list_acc.includes(name) == true
    );
    setData({
      count: filterData.length,
      data: filterData
    });
  };

  const handleFilterDate = async () => {
    if(dateStart && dateEnd) {
      setIsLoading(true)
      let dataFilterDate = await axiosCRMv2(
        "/marketingZalo/getListPostSchedule",
        {
          date_start: dateStart?.replace(/-/g, "/"),
          date_end: dateEnd?.replace(/-/g, "/")
        }
      );
      console.log('dataFilterDate', dataFilterDate);
      setData({
        count: dataFilterDate.length,
        data: dataFilterDate
      });
      setIsLoading(false)
    } 
     return 0;
  };

  useEffect(() => {
    handleDeleteProduct();
    handleFilterDate();
  }, []);

  useEffect(() => {
    handleFilterDate();
    if (valueInput) {
      filterData(valueInput);
    } else {
      setData(dataTable);
    }
  }, [valueInput, dateStart, dateEnd]);
  return (
    <div id="page_post" className={styles.post__module}>
      <div style={{ marginBottom: "1.25rem" }}>
        <CurrentGroup numberCurrentDetailForGroup={2} listDetail={listPage} slug={"post"} />
      </div>
      {/* date */}
      <div
        className={`${styleCampaignInput.select_item} flex_align_center_item ${styleCampaignInput.select_item_time} ${styles.post_date} `}
      >
        <label htmlFor="" className={styles.post_hidden}>
          Ngày đặt hàng:
        </label>
        <label
          htmlFor=""
          className={`${styles.post_hidden_notmobile} ${styles.custom_fontdate}`}
        >
          Ngày tạo:
        </label>
        <div
          className={`${styleCampaignInput.input_item_time} flex_between ${styles.date_nowrap}`}
        >
          <input
            className={styles.custom_fontdate}
            type="date"
            name=""
            id="start_time"
            onChange={(e) => setDateStart(e.target.value)}
          />{" "}
          -{" "}
          <input
            className={styles.custom_fontdate}
            type="date"
            name=""
            id="end_time"
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>
      </div>
      <div>
        <GroupFormInputGroup
          isSelectedRow={false}
          changeValueInput={(e) => setValueInput(e)}
        />
      </div>
      {
        isLoading && !data ? <Spin /> :  <TableDataZaloPost
        changeNumberPage={() => {}}
        dataTable={data}
        isLoading={isLoading} handleFilter={(e) => {
          let newData = 
          {
            'count': data.data.length - 1,
            'data': data.data.filter((item) => item.schedule_id !== e)
          }
          setData(newData)
        }}/>
      }
     
    </div>
  );
};

export default PostZalo;


