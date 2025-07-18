// import OrderSelectBoxStep from "../order_steps/select_box_step";
import { useContext, useEffect, useState } from "react";
import styles from "./quote_detail.module.css";
// import InputText from "./input_text";
import { Input, Spin, Tooltip } from "antd";
import useLoading from "../../hooks/useLoading";
import { QuoteContext } from "../quoteContext";
import dayjs from "dayjs";

export default function AddQuoteDetailStatus() {
  const { detailData, getPropOrDefault, shouldFetchDetailData } = useContext(QuoteContext)
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<any>({
    description: '',
    user_created: '',
    user_created_avatar: '',
    user_updated: '',
    user_updated_avatar: '',
    create_at: '',
    update_at: '',
    use_system_info: false
  })

  const convertData = () => {
    const newData = {
      description: getPropOrDefault(detailData, 'description'),
      user_created: getPropOrDefault(detailData, 'user_created_id.userName'),
      user_created_avatar: getPropOrDefault(detailData, 'user_created_id.avatarUser'),
      user_updated: getPropOrDefault(detailData, 'user_updated_id.userName'),
      user_updated_avatar: getPropOrDefault(detailData, 'user_updated_id.avatarUser'),
      create_at: getPropOrDefault(detailData, 'created_at'),
      update_at: getPropOrDefault(detailData, 'updated_at'),
      use_system_info: getPropOrDefault(detailData, 'use_system_info', false)
    }
    setData(newData)
  }

  useEffect(()=>{
    shouldFetchDetailData && startLoading();
  }, [shouldFetchDetailData])

  useEffect(() => {
    startLoading();
    convertData()
    stopLoading();
  }, [])

  // Đã fetch 
  // useEffect(() => {
  //   startLoading();
  //   setRecordId(Number(id) || 0)
  // }, [])

  // useEffect(() => {
  //   setShouldFetchDetailData(true)
  // }, [recordId])

  useEffect(() => {
    startLoading();
    convertData()
    stopLoading();
  }, [detailData])

  return (
    <>
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
      ) : (<div style={{ paddingTop: 20 }}>
        <p className={styles.main__body__type}>Thông tin mô tả</p>
        <div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <div className={`${styles.main__body__item_des} ${styles.d_flex} `}>
                <div className={`${styles.main__body__item__title}`}>
                  <b>Mô tả:</b>
                </div>
                <div
                  className={`${styles.main__body__item__value} ${styles.not_update}`}
                >
                  {data.description || 'Chưa cập nhật'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.main__body__type}>Thông tin hệ thống</p>
        <div className={styles.row}>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Người tạo:</b>
            </div>
            <div
              className={styles.row1quote_right}
              style={{ display: "flex", gap: 5 }}
            >
              <div>
                <img src={data.user_created_avatar || "/crm/user_kh.png"} alt="hungha365.com" />
              </div>
              <div>{data.user_created || 'Chưa cập nhật'}</div>
            </div>
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Ngày tạo:</b>
            </div>
            <div className={styles.row1quote_right}>{data.create_at ? dayjs.unix(data.create_at).format('DD/MM/YYYY') : 'Chưa cập nhật'}</div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: -20 }}>
          <div className={styles.full_width_div}>
            <span></span>
          </div>
          <div className={styles.full_width_div}>
            <span></span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Người sửa:</b>
            </div>
            <div
              className={styles.row1quote_right}
              style={{ display: "flex", gap: 5 }}
            >
              <div>
                <img src={data.user_updated_avatar || "/crm/user_kh.png"} alt="hungha365.com" />
              </div>
              <div>{data.user_updated || 'Chưa cập nhật'}</div>
            </div>
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>

          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Ngày sửa:</b>
            </div>
            <div className={styles.row1quote_right}>{data.update_at ? dayjs.unix(data.update_at).format('DD/MM/YYYY') : 'Chưa cập nhật'}</div>
          </div>
        </div>

        <div style={{ display: "flex", marginTop: -20 }}>
          <div className={styles.full_width_div}>
            <span></span>
          </div>
          <div className={styles.full_width_div}>
            <span></span>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.row1quote}>
            <div className={styles.row1quote_left}>
              <b>Dùng chung:</b>
            </div>
            <div>
              <img src={data.use_system_info ? "	/crm/dungchung_kh.svg" : '/crm/decline.svg'} alt="hungha365.com" />
            </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>

            <div className={styles.row1quote_right}></div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
