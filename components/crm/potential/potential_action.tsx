import styles from "./potential.module.css";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import CanmpaignModal from "./potential_action_modal/potential_mdal_campain";
import EmailModal from "./potential_action_modal/potential_mdal_email";
import DelActionModal from "./potential_action_modal/deltete_action_mdal";
import ConvertModal from "./potential_action_modal/convert_modal";
import ShareActionModal from "./potential_action_modal/potential_share_action_mdal";
import HandeOverModal from "./potential_action_modal/hand_over_mdal";
import { useRouter } from "next/router";

export default function PotentialAction({
  isSelectedRow,
  isRowDataSelected,
  isNumberSelected,
  setSelected,
  setNumberSelected,
  listNV,
}: any) {
  const [isOpenCampaign, setIsOpenCampaign] = useState(false);
  const [isOpenEmail, setIsOpenIsEmail] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCovert, setIsOpenConvert] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isHandOverOpen, setIsHandOverOpen] = useState(false);
  const router = useRouter();

  const ids = "123";

  const [dataActionPotential, setDataActionPotential] = useState([
    {
      link: "",
      name: "Gọi điện",
      img: "bi bi-telephone",
      type: "call",
    },
    {
      link: "#",
      name: "Chọn vào chiến dịch",
      img: "bi bi-check-square",
      type: "campaign",
    },
    {
      link: "#",
      name: "Email marketing",
      img: `bi bi-envelope`,
      type: "email",
    },
    {
      link: "/marketing/sms/add",
      name: "Gửi sms",
      img: `bi bi-chat-left-dots`,
      type: "sms",
    },
    {
      link: "#",
      name: "Chia sẻ",
      img: `bi bi-reply-fill`,
      type: "share",
    },
    {
      link: "#",
      name: "Bàn giao công việc",
      img: `bi bi-bag`,
      type: "hand_over",
    },
    {
      link: `/potential/duplicate/${ids}`,
      name: "Nhân bản",
      img: `bi bi-back`,
      type: "blank",
    },
    {
      link: "/potential/check_merge",
      name: "Kiểm tra trùng",
      img: `bi bi-search`,
      type: "",
    },
    {
      link: "/potential/merge",
      name: "Gộp trùng",
      img: `bi bi-share`,
      type: "",
    },
    {
      link: "#",
      name: "Chuyển đổi",
      img: "bi bi-check-square",
      type: "convert",
    },
    {
      link: `/potential/update/${ids}`,
      name: "Chỉnh sửa",
      img: "bi bi-pencil-square",
      type: "edit",
    },
    {
      link: "#",
      name: "Xoá",
      img: "bi bi-trash3",
      type: "delete",
    },
  ]);

  useEffect(() => {
    setDataActionPotential(dataActionPotential);
  });

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "campaign") {
      setIsOpenCampaign(true);
    }
    if (type === "email") {
      setIsOpenIsEmail(true);
    }
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "convert") {
      setIsOpenConvert(true);
    }
    if (type === "share") {
      setIsOpenShare(true);
    }
    if (type === "hand_over") {
      setIsHandOverOpen(true);
    }
  };

  const dataToSend = {
    data: isRowDataSelected,
    length: isNumberSelected,
  };

  sessionStorage.setItem("myData", JSON.stringify(dataToSend));

  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionPotential.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionPotential[i].link === "/potential/merge" ? (
            <div
              className="flex-start-btn"
              onClick={() =>
                router.push({
                  pathname: dataActionPotential[i].link,
                })
              }
            >
              <i className={dataActionPotential[i].img}></i>
              {dataActionPotential[i].name}
            </div>
          ) : dataActionPotential[i].link !== "#" ? (
            <Link href={dataActionPotential[i].link} className="flex-start-btn">
              <i className={dataActionPotential[i].img}></i>
              {dataActionPotential[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionPotential[i].type)}
            >
              <i className={dataActionPotential[i].img}></i>
              {dataActionPotential[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  // const handover = "2020202";
  // useEffect(() => {
  //   const newData = dataActionPotential.slice();
  //   const indexCheckMerge = newData.findIndex(
  //     (item) => item.name === "Kiểm tra trùng"
  //   );

  //   const indexMerge = newData.findIndex((item) => item.name === "Gộp trùng");
  //   newData.splice(indexCheckMerge, 1, {
  //     link: handover?.split(",")?.length > 1 ? "#" : "/customer/check_merge",
  //     name: "Kiểm tra trùng",
  //     img: `bi bi-search`,
  //     type: "",
  //   });

  //   newData.splice(indexMerge, 1, {
  //     link: handover?.split(",")?.length <= 1 ? "#" : "/customer/same_filter",
  //     name: "Gộp trùng",
  //     img: `bi bi-share`,
  //     type: "",
  //   });

  //   setDataActionPotential(newData);
  // }, [handover]);

  return (
    <div className={styles.div__thaotac}>
      <div>
        <label>Đã chọn:</label>
        <b className={styles.checked_count}>{dataToSend.length}</b>
      </div>
      <Dropdown
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
      </Dropdown>

      <CanmpaignModal
        isModalCancel={isOpenCampaign}
        setIsModalCancel={setIsOpenCampaign}
        setSelected={setSelected}
        setNumberSelected={setNumberSelected}
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
        listNV={listNV}
      />

      <HandeOverModal
        isModalCancel={isHandOverOpen}
        setIsModalCancel={setIsHandOverOpen}
        listNV={listNV}
        // handover={handover}
        // fetchData={fetchData}
      />
    </div>
  );
}
