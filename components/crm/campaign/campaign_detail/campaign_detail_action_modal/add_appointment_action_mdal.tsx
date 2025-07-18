import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_step";
import ModalCompleteStep from "@/components/crm/campaign/campaign_steps/complete_modal";
import { Input } from "antd";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const HandeOverModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={"Thêm lịch hẹn"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Tên lịch hẹn"}
            </label>
            <CampaignSelectBoxStep
              value="Chọn nhân viên thực hiện"
              placeholder="Chọn nhân viên thực hiện"
            />
          </div>
        </div>

        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} `}>{"Ngày bắt đầu"}</label>
            <Input
              placeholder="Nhập địa điểm"
              type="date"
              className={`${styles.input_width}`}
            />
            <Input
              placeholder=""
              type="time"
              className={`${styles.input_width}`}
            />
          </div>
        </div>

        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} `}>{"Ngày kết thúc"}</label>
            <Input
              placeholder="Nhập địa điểm"
              type="date"
              className={`${styles.input_width}`}
            />
            <Input
              placeholder=""
              type="time"
              className={`${styles.input_width}`}
            />
          </div>
        </div>

        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Nhân viên thực hiện"}
            </label>
            <CampaignSelectBoxStep
              value="Chọn nhân viên thực hiện"
              placeholder="Chọn nhân viên thực hiện"
            />
          </div>
        </div>
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} `}>{"Tên lịch hẹn"}</label>
            <Input placeholder="Nhập địa điểm" />
          </div>
        </div>
        <div>&nbsp;</div>
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} `}>{"Mô tả"}</label>
            <textarea
              name="note"
              placeholder="Nhập nội dung mô tả"
              className={`${styles.note_campaign_cus} ${styles.textarea}`}
            ></textarea>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc cho Nguyễn Văn Nam thành công!"}
        link={"/potential/list"}
      />
    </>
  );
};

export default HandeOverModal;
