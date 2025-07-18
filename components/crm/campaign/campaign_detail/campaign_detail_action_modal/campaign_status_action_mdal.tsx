import React, { useRef, useState } from "react";
import { Modal, Select } from "antd";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_step";
import ModalCompleteStep from "@/components/crm/campaign/campaign_steps/complete_modal";
import { fetchApi } from "@/components/crm/ultis/api";
import Cookies from "js-cookie";
import { useTrigger } from "@/components/crm/context/triggerContext";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  rowSelected?: { cus_id: number }[];
}

const StatusCustomerCampaignModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  rowSelected,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [body, setBody] = useState({ status: 0, note: "" });
  const token = Cookies.get("token_base365");
  const { trigger, setTrigger } = useTrigger();
  const router = useRouter();

  const statusList = [
    { value: 1, label: "Chưa liên hệ" },
    { value: 2, label: "Chưa gửi thư mời" },
    { value: 3, label: "Đã liên hệ" },
    { value: 4, label: "Đã gửi thư mời" },
    { value: 5, label: "Đã nhận" },
    { value: 6, label: "Đã mở" },
    { value: 7, label: "Xác nhận tham gia" },
    { value: 8, label: "Không liên hệ được" },
    { value: 9, label: "Đã tham gia" },
    { value: 10, label: "Chưa quan tâm" },
  ];

  const fetchAPIUpdateStatus = async (id) => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/campaign/update-status-campaign-cus",
      token,
      {
        ...body,
        cam_id: Number(router.query.id),
        cus_id: id,
      },
      "POST"
    );
  };

  const handleOK = async () => {
    setIsModalCancel(false);
    const apiPromise = rowSelected?.map((item) =>
      fetchAPIUpdateStatus(item?.cus_id)
    );
    try {
      await Promise.all(apiPromise);
      setTrigger(true);
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
    } catch (error) {
      alert("Có lỗi xảy ra trong quá trình xử lý yêu cầu API");
    }
  };

  return (
    <>
      <Modal
        title={"Cập nhật tình trạng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal} style={{ minHeight: "0px" }}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} `}>{"Tình trạng"}</label>
            <Select
              showSearch
              optionFilterProp="children"
              className={styles.selectAntd}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              style={{ marginTop: "10px", height: "40px" }}
              placeholder="Người thực hiện: "
              value={body?.status ? body?.status : null}
              onChange={(value) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    status: value,
                  };
                });
              }}
              options={statusList}
            />
          </div>
        </div>
        <br />
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} `}>{"Ghi chú"}</label>
            <textarea
              onChange={(e) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    note: e.target.value,
                  };
                });
              }}
              name="note"
              className={`${styles.note_campaign_cus} ${styles.textarea}`}
            ></textarea>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Cập nhật tình trạng thành công!"}
        link={"/"}
      />
    </>
  );
};

export default StatusCustomerCampaignModal;
