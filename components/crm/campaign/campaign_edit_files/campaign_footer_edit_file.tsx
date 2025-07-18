import { useState } from "react";
import CancelModal from "../campaign_steps/cancel_modal";
import styles from "./edit_file_campaign.module.css";
import ModalCompleteStep from "../campaign_steps/complete_modal";

export default function CampaignFooterEditFiles({
  link = "/campaign/list",
  title,
  contentCancel,
  titleCancel,
  handleChange,
  formFields,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={async () => {
          if (formFields?.nameCampaign) {
            await handleChange();
            setModal1Open(true);
          } else {
            alert("Trường tên chiến dịch không được bỏ trống");
          }
        }}
      >
        Lưu
      </button>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={contentCancel}
          title={titleCancel}
        />
      }

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
        link={link}
      />
    </div>
  );
}
