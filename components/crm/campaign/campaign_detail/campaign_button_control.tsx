// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./campaign_detail.module.css";
import { useState } from "react";
import { Switch } from "antd";
import Link from "next/link";

// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import { useRouter } from "next/router";
import DelActionModal from "../campaign_delete_action_mdal";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";

export default function DetailCampaignButtonControl({
  isHideEmptyData,
  setIsHideEmptyData,
}) {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const url = "https://api.timviec365.vn/api/crm/campaign/delete-campaign";
  const token = Cookies.get("token_base365");
  const onChange = (checked: boolean) => {
    setIsHideEmptyData(!isHideEmptyData);
  };

  const handleDelete = async (id: number) => {
    const bodyAPI = {
      cam_id: id,
    };
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    router.push("/campaign/list");
  };
  return (
    <div>
      <div className={`${styles.main}`}>
        <div className={styles.row_input}>
          <div className={`${styles.main__control_btn} ${styles.flex_end} `}>
            <div className={`${styles.flex_1}`}>
              <Switch checked={isHideEmptyData} onChange={onChange} />
              Ẩn dữ liệu trống
            </div>
            <div className={styles.group_button}>
              <Link href={`/campaign/edit/${id}`}>
                <button
                  type="button"
                  className={`${styles.btn_edit} flex_align_center`}
                >
                  <i className="bi bi-pencil-square"></i>
                  Chỉnh sửa
                </button>
              </Link>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDelOpen(true);
                  }}
                  className={`${styles.btn_delete} flex_align_center`}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <i className="bi bi-trash3"></i>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
        handleDelete={handleDelete}
        id={Number(id)}
      />
    </div>
  );
}
