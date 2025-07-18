import styles from "./campaign.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
// import { dataActionCampaign } from "../ultis/consntant";
import { useState } from "react";
// import CanmpaignModal from "./campaign_action_modal/potential_mdal_campain";
// import EmailModal from "./campaign_action_modal/potential_mdal_email";
// import DelActionModal from "./campaign_action_modal/deltete_action_mdal";
// import ConvertModal from "./campaign_action_modal/convert_modal";
// import ShareActionModal from "./campaign_action_modal/potential_share_action_mdal";
// import HandeOverModal from "./campaign_action_modal/hand_over_mdal";

export default function CampaignAction({ isSelectedRow }: any) {
  // const [isOpenCampaign, setIsOpenCampaign] = useState(false);
  // const [isOpenEmail, setIsOpenIsEmail] = useState(false);
  // const [isDelOpen, setIsDelOpen] = useState(false);
  // const [isOpenCovert, setIsOpenConvert] = useState(false);
  // const [isOpenShare, setIsOpenShare] = useState(false);
  // const [isHandOverOpen, setIsHandOverOpen] = useState(false);

  // const handleClickAction = (e: any, type: string | undefined) => {
  //   if (type === "campaign") {
  //     setIsOpenCampaign(true);
  //   }
  //   if (type === "email") {
  //     setIsOpenIsEmail(true);
  //   }
  //   if (type === "delete") {
  //     setIsDelOpen(true);
  //   }
  //   if (type === "convert") {
  //     setIsOpenConvert(true);
  //   }
  //   if (type === "share") {
  //     setIsOpenShare(true);
  //   }
  //   if (type === "hand_over") {
  //     setIsHandOverOpen(true);
  //   }
  // };
  const items: MenuProps["items"] = [];
  // for (let i = 0; i < dataActionCampaign.length; i++) {
  //   items.push({
  //     key: i,
  //     label: (
  //       <>
  //         {dataActionCampaign[i].link !== "#" ? (
  //           <Link href={dataActionCampaign[i].link} className="flex-start-btn">
  //             <i className={dataActionCampaign[i].img}></i>
  //             {dataActionCampaign[i].name}
  //           </Link>
  //         ) : (
  //           <button
  //             className="flex-start-btn"
  //             onClick={(e) => handleClickAction(e, dataActionCampaign[i].type)}
  //           >
  //             <i className={dataActionCampaign[i].img}></i>
  //             {dataActionCampaign[i].name}
  //           </button>
  //         )}
  //       </>
  //     ),
  //   });
  // }
  return (
    <div className={styles.div__thaotac}>
      <div>
        {/* <label>Đã chọn:</label>
        <b className={styles.checked_count}>0</b> */}
      </div>
      {/* <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        disabled={false}
        className={!isSelectedRow ? "opacity" : ""}
        trigger={[isSelectedRow ? "hover" : "contextMenu"]}
      >
        <button className={styles.button_thaotac}>
          <img src="/crm/3_cham.png" />
          Thao tác
        </button>
      </Dropdown> */}

      {/* <CanmpaignModal
        isModalCancel={isOpenCampaign}
        setIsModalCancel={setIsOpenCampaign}
      />
      <EmailModal
        isModalCancel={isOpenEmail}
        setIsModalCancel={setIsOpenIsEmail}
      />

      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />

      <ConvertModal
        isModalCancel={isOpenCovert}
        setIsModalCancel={setIsOpenConvert}
      />

      <ShareActionModal
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />

      <HandeOverModal
        isModalCancel={isHandOverOpen}
        setIsModalCancel={setIsHandOverOpen}
      /> */}
    </div>
  );
}
