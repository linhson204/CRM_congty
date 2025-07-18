import { useState } from "react";
import CancelModal from "../campaign_steps/cancel_modal";
import styles from "./add_file_campaign.module.css";
import ModalCompleteStep from "../campaign_steps/complete_modal";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";

export default function CampaignFooterAddFiles({
  link = "/campaign/list",
  title,
  contentCancel,
  titleCancel,
  formFields,
  typeRef,
  chanelRef,
  statusRef,
  empRef,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [failModel, setFailModel] = useState(false);
  const url = "https://api.timviec365.vn/api/crm/campaign/createCampaign";
  const token = Cookies.get("token_base365");

  const fetchAPICampaign = async () => {
    const bodyAPI = {
      ...formFields,
      shareAll: Number(formFields?.shareAll || 0),
      money: Number(formFields?.money || 0),
      investment: Number(formFields?.investment || 0),
      expectedSales: Number(formFields?.expectedSales || 0),
      status: statusRef?.current?.value ? Number(statusRef?.current?.value) : 0,
      chanelCampaign: chanelRef?.current?.value
        ? Number(chanelRef?.current?.value)
        : 0,
      typeCampaign: typeRef?.current?.value
        ? Number(typeRef?.current?.value)
        : 0,
      empID: empRef?.current?.value ? Number(empRef?.current?.value) : 0,
    };
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    return dataApi;
  };

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
            const res = await fetchAPICampaign();
            console.log(res);
            if (res.data.message === "create campaign success!") {
              setModal1Open(true);
            } else {
              alert("Thêm mới chiến dịch thất bại");
            }
          } else {
            alert("Tên chiến dịch không được bỏ trống");
          }
        }}
      >
        Lưu
      </button>

      <CancelModal
        isModalCancel={isModalCancel}
        setIsModalCancel={setIsModalCancel}
        content={contentCancel}
        title={titleCancel}
      />

      <CancelModal
        isModalCancel={failModel}
        setIsModalCancel={setFailModel}
        content={"Thêm mới chiến dịch thất bại"}
        title={"Thất bại"}
      />

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
        link={link}
      />
    </div>
  );
}
