import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_step";
import ModalCompleteStep from "@/components/crm/campaign/campaign_steps/complete_modal";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const CallModal: React.FC<MyComponentProps> = ({
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
        title={"Trợ lý kinh doanh"}
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
            <label className={`${styles.form_label} `}>
              {"Nhân viên thực hiện"}
            </label>
            <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
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

export default CallModal;
