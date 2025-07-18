// import OrderSelectBoxStep from "../order_steps/select_box_step";
import { useEffect, useMemo, useState } from "react";
import { timestampToCustomString } from "../../ultis/convert_date";
import styles from "./campaign_detail.module.css";
// import InputText from "./input_text";
import Cookies from "js-cookie";
import { color } from "highcharts";

export default function AddCampaignGeneralDetailInfo({
  formFields,
  isHideEmptyData,
  empList,
}: any) {
  const dataChanelCampaign = [
    { value: 0, label: "Chưa cập nhật" },
    { value: 1, label: "Chưa cập nhật" },
    { value: 2, label: "Website" },
    { value: 3, label: "Báo điện tử" },
    { value: 4, label: "Báo viết" },
    { value: 5, label: "Truyền hình" },
    { value: 6, label: "Mạng xã hôi" },
    { value: 7, label: "Tài trợ" },
    { value: 8, label: "Hội thảo-Triển lãm" },
  ];

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
  const token = Cookies.get("token_base365");

  const renderText = (text) => {
    if (text && text !== "Chưa cập nhật") {
      return text;
    }
    return <div style={{ color: "#CCCCCC" }}>Chưa cập nhật</div>;
  };

  // useEffect(() => {
  //   getDataEmp;
  // }, []);
  return (
    <div>
      <div className={styles.main__campaign__body}>
        <p className={styles.main__body__type}>Thông tin chung</p>
        <div className={styles.main__content__body}>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Tên chiến dịch:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {" "}
                  {formFields?.nameCampaign}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.typeCampaign || 0)
                  ? "none"
                  : null,
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
                  {dataTypeCampaign?.[formFields?.typeCampaign]}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.status || 0)
                  ? "none"
                  : null,
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
                display: isHideEmptyData(formFields?.timeStart || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-3"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày bắt đầu:</b>
                </div>
                <div className={`${styles.main__body__item__value} `}>
                  {renderText(timestampToCustomString(formFields?.timeStart))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.timeEnd || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-3"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày kết thúc:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(timestampToCustomString(formFields?.timeEnd))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.investment || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-3"]} `}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngân sách:</b>
                </div>
                <div className={`${styles.main__body__item__value} `}>
                  {formFields?.investment} VNĐ
                </div>
              </div>
            </div>
            <div
              style={{
                display: isHideEmptyData(formFields?.expectedSales || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-3"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Doanh số:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {formFields?.expectedSales} VNĐ
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.chanelCampaign || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-6"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Kênh truyền thống:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {dataChanelCampaign?.[formFields?.chanelCampaign]?.label}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.money || 0)
                  ? "none"
                  : null,
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
                display: isHideEmptyData(formFields?.empID || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-6"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Nhân viên phụ trách:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(
                    empList?.filter(
                      (item) => item?.ep_id === formFields?.empID
                    )[0]?.userName
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.main__body__type}>Thông tin mô tả</p>
        <div className={styles.main__content__body}>
          <div className={styles.row}>
            <div
              style={{
                display: isHideEmptyData(formFields?.description || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-6"]}`}
            >
              <div
                className={`${styles.main__body__item_des} ${styles.d_flex} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Mô tả:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(formFields?.description)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.main__body__type}>Thông tin hệ thống</p>
        <div className={styles.main__content__body}>
          <div className={styles.row}>
            <div
              style={{
                display: isHideEmptyData(
                  formFields?.userIdCreate === formFields?.companyID
                    ? 0
                    : formFields?.userIdCreate
                )
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-6"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Người tạo:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(
                    empList?.filter(
                      (item) => item?.ep_id === formFields?.userIdCreate
                    )[0]?.userName
                  )}
                  {/* <div style={{ display: "flex", justifyContent: 'center' }}> <div><img src="/crm/user_kh.png" alt="hungha365.com" /></div>&nbsp;Nguyễn Văn Nam</div> */}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.createdAt || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-6"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày tạo:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(timestampToCustomString(formFields?.createdAt))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(
                  formFields?.userIdUpdate === formFields?.companyID
                    ? 0
                    : formFields?.userIdUpdate
                )
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-6"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Người sửa:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(
                    empList?.filter(
                      (item) => item?.ep_id === formFields?.userIdUpdate
                    )[0]?.userName
                  )}
                  {/* <div style={{ display: "flex", justifyContent: 'center' }}> <div><img src="/crm/user_kh.png" alt="hungha365.com" /></div>&nbsp;Nguyễn Văn Nam</div> */}
                </div>
              </div>
            </div>

            <div
              style={{
                display: isHideEmptyData(formFields?.updatedAt || 0)
                  ? "none"
                  : null,
              }}
              className={`${styles["col-lg-6"]}`}
            >
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Ngày sửa:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {renderText(timestampToCustomString(formFields?.updatedAt))}
                </div>
              </div>
            </div>

            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
              >
                <div className={`${styles.main__body__item__title}`}>
                  <b>Dùng chung:</b>
                </div>
                <div className={`${styles.main__body__item__value}`}>
                  {formFields?.shareAll ? (
                    <i
                      style={{ color: "green", width: "16px", height: "16px" }}
                      className="bi bi-check2-circle"
                    ></i>
                  ) : (
                    <i className="bi bi-check2-circle"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
