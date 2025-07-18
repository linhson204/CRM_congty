import styles from "@/components/crm/campaign/campaign_detail/campaign_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import { timestampToCustomString } from "../../ultis/convert_date";
import { useRouter } from "next/router";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function AddCampaignDetailInfo({
  formFields,
  isHideEmptyData,
  inforCampaign,
}) {
  const router = useRouter();
  const url = "https://api.timviec365.vn/api/crm/campaign/info-campaign";
  const token = Cookies.get("token_base365");
  // const [inforCampaign, setInforCampaign] = useState<any>({});

  // const fetchAPICampaign = async () => {
  //   const bodyAPI = {
  //     campaign_id: Number(router.query.id),
  //   };
  //   const dataApi = await fetchApi(url, token, bodyAPI, "POST");
  //   setInforCampaign(dataApi?.data?.data);
  // };

  const dataStatus = [
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div style={{ color: "#FFA800" }}>Chưa diễn ra</div>,
    <div style={{ color: "#34B632" }}>Đã kết thúc</div>,
    <div style={{ color: "#FF3333" }}>Đang tạm dừng</div>,
    <div style={{ color: "#4C5BD4" }}>Đang diễn ra</div>,
  ];

  const dataTypeCampaign = [
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>,
    <div>Gửi mail</div>,
    <div>Điện thoại</div>,
    <div>Tổ chức hội thảo tập huấn</div>,
    <div>Gặp mặt trực tiếp</div>,
    <div>Qua bưu điện</div>,
    <div>Mạng xã hội</div>,
  ];

  const renderText = (text) => {
    if (text && text !== "Chưa cập nhật") {
      return text;
    }
    return <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>;
  };

  return (
    <div>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div
            style={{
              display: isHideEmptyData(formFields?.nameCampaign || 0)
                ? "none"
                : null,
            }}
            className={`${styles["col-lg-6"]}`}
          >
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Tên chiến dịch:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                {formFields?.nameCampaign}
              </div>
            </div>
          </div>

          <div
            style={{
              display: isHideEmptyData(formFields?.typeCampaign || 0)
                ? "none"
                : "",
            }}
            className={`${styles["col-lg-6"]}`}
          >
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Loại:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                {dataTypeCampaign[formFields?.typeCampaign]}
              </div>
            </div>
          </div>

          <div
            style={{
              display: isHideEmptyData(formFields?.status || 0) ? "none" : "",
            }}
            className={`${styles["col-lg-6"]}`}
          >
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Tình trạng:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.stt_yellow}`}
              >
                {dataStatus[formFields?.status]}
              </div>
            </div>
          </div>

          <div
            style={{
              display: isHideEmptyData(formFields?.expectedSales || 0)
                ? "none"
                : "",
            }}
            className={`${styles["col-lg-6"]}`}
          >
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Doanh số kỳ vọng:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                {formFields?.expectedSales} VNĐ
              </div>
            </div>
          </div>

          <div
            style={{
              display: isHideEmptyData(formFields?.money || 0) ? "none" : null,
            }}
            className={`${styles["col-lg-6"]}`}
          >
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Số đã chi:</b>
              </div>
              <div className={`${styles.main__body__item__value} `}>
                {formFields?.money} VNĐ
              </div>
            </div>
          </div>

          <div
            style={{
              display: isHideEmptyData(formFields?.timeEnd || 0)
                ? "none"
                : null,
            }}
            className={`${styles["col-lg-6"]}`}
          >
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Ngày kỳ vọng/kết thúc:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                {timestampToCustomString(formFields?.timeEnd) ? (
                  renderText(timestampToCustomString(formFields?.timeEnd))
                ) : (
                  <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.table_stt} `}>
          <div className={`${styles.table_stt_content} ${styles.flex_column}`}>
            <div className={`${styles.table_stt_title}`}>
              <b>Tình trạng tham gia</b>
            </div>
            <div className={`${styles.table_stt_value} ${styles.flex_column}`}>
              <div className={`${styles.flex_between}`}>
                Khách hàng
                <span>
                  {inforCampaign?.customerCampaignSummary?.total_customer || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Chưa liên hệ
                <span>
                  {inforCampaign?.customerCampaignSummary?.not_contacted || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Chưa gửi thư mời
                <span>
                  {inforCampaign?.customerCampaignSummary?.not_invited || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã liên hệ
                <span>
                  {inforCampaign?.customerCampaignSummary?.contacted || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã gửi thư mời
                <span>
                  {inforCampaign?.customerCampaignSummary?.invited || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã nhận
                <span>
                  {inforCampaign?.customerCampaignSummary?.received || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã mở
                <span>
                  {inforCampaign?.customerCampaignSummary?.opened || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Xác nhận tham gia
                <span>
                  {inforCampaign?.customerCampaignSummary?.confirmation || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Không liên hệ được
                <span>
                  {inforCampaign?.customerCampaignSummary
                    ?.not_contacted_successfully || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Đã tham gia
                <span>
                  {inforCampaign?.customerCampaignSummary?.participated || 0}
                </span>
              </div>
              <div className={`${styles.flex_between}`}>
                Chưa quan tâm
                <span>
                  {inforCampaign?.customerCampaignSummary?.not_interested || 0}
                </span>
              </div>
            </div>
          </div>

          <div className={`${styles.table_stt_item}`}>
            <div
              className={`${styles.table_stt_content} ${styles.flex_column}`}
            >
              <div className={`${styles.table_stt_title}`}>
                <b>Doanh số theo cơ hội</b>
              </div>
              <div
                className={`${styles.table_stt_value} ${styles.flex_column}`}
              >
                <div className={`${styles.flex_between}`}>
                  Đang thực hiện
                  <span>{inforCampaign?.chanceSummary?.in_progress || 0}</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Chiến thắng
                  <span>{inforCampaign?.chanceSummary?.victory || 0}</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Thất bại
                  <span>{inforCampaign?.chanceSummary?.failure || 0}</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Tổng giá trị
                  <span>
                    {inforCampaign?.chanceSummary?.total_value_chance || 0}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`${styles.table_stt_content} ${styles.flex_column}`}
            >
              <div className={`${styles.table_stt_title}`}>
                <b>Doanh số theo đơn hàng</b>
              </div>
              <div
                className={`${styles.table_stt_value} ${styles.flex_column}`}
              >
                <div className={`${styles.flex_between}`}>
                  Chờ duyệt
                  <span>
                    {inforCampaign?.orderSummary?.pending_approval || 0}
                  </span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Đã duyệt
                  <span>{inforCampaign?.orderSummary?.approved || 0}</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Đã hủy
                  <span>{inforCampaign?.orderSummary?.cancelled || 0}</span>
                </div>
                <div className={`${styles.flex_between}`}>
                  Tổng giá trị
                  <span>
                    {inforCampaign?.orderSummary?.total_value_order || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
