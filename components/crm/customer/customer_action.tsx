import styles from "../potential/potential.module.css";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import HandeOverModalCustomer from "./customer_modal/customer_handover_mdal";
import DelCustomerModal from "./modal/delete_list_Cus";
import SharingCustomerModal from "./modal/sharing_modal";

export default function CustomerListAction({
  clearOption,
  chooseAllOption,
  numberSelected,
  selectedCus,
  id,
  listNV,
  handover,
  fetchData,
  dataLength,
  selectedCusIds,
}: any) {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isHandOverOpen, setIsHandOverOpen] = useState(false);

  const dataToSend = {
    data: selectedCusIds,
  };

  sessionStorage.setItem("DataSelectedCustomer", JSON.stringify(dataToSend));

  const [dataCustomerListAction, setDataCustomerListAction] = useState([
    {
      link: "",
      name: "Gọi điện",
      img: "bi bi-telephone",
      type: "call",
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
      link: "/customer/check_merge",
      name: "Kiểm tra trùng",
      img: `bi bi-search`,
      type: "",
    },
    {
      link: "/customer/same_filter",
      name: "Gộp trùng",
      img: `bi bi-share`,
      type: "",
    },
    {
      link: `/customer/edit/${id}`,
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

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "share") {
      setIsOpenShare(true);
    }
    if (type === "hand_over") {
      setIsHandOverOpen(true);
    }
  };

  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataCustomerListAction.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataCustomerListAction[i].link !== "#" ? (
            <Link
              href={dataCustomerListAction[i].link}
              className="flex-start-btn"
            >
              <i className={dataCustomerListAction[i].img}></i>
              {dataCustomerListAction[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataCustomerListAction[i].type)
              }
            >
              <i className={dataCustomerListAction[i].img}></i>
              {dataCustomerListAction[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  useEffect(() => {
    const newData = dataCustomerListAction.slice();
    const indexCheckMerge = newData.findIndex(
      (item) => item.name === "Kiểm tra trùng"
    );

    const indexMerge = newData.findIndex((item) => item.name === "Gộp trùng");
    newData.splice(indexCheckMerge, 1, {
      link: handover?.split(",")?.length > 1 ? "#" : "/customer/check_merge",
      name: "Kiểm tra trùng",
      img: `bi bi-search`,
      type: "",
    });

    newData.splice(indexMerge, 1, {
      link: handover?.split(",")?.length <= 1 ? "#" : "/customer/same_filter",
      name: "Gộp trùng",
      img: `bi bi-share`,
      type: "",
    });

    setDataCustomerListAction(newData);
  }, [handover]);

  return (
    <>
      <div className={styles.div__thaotac2}>
        <div>
          <label>Đã chọn: &nbsp;</label>
          <b className={styles.checked_count}>{numberSelected}</b>
        </div>
        <div className={styles.box_check_customer}>
          <button
            disabled={numberSelected < 1 ? true : false}
            type="button"
            className={styles.remove_all}
            onClick={clearOption}
            style={{
              color: numberSelected >= 1 ? "#FF3333" : "rgba(255, 51, 51, 0.5)",
            }}
          >
            Bỏ chọn
          </button>
          <button
            type="button"
            className={styles.choose_all}
            onClick={chooseAllOption}
          >
            Chọn tất cả trên danh sách
          </button>
        </div>

        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          disabled={false}
          className={numberSelected < 1 ? "opacity" : ""}
          trigger={[numberSelected >= 1 ? "hover" : "contextMenu"]}
        >
          <button className={styles.button_thaotac2}>
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
        <SharingCustomerModal
          isModalCancel={isOpenShare}
          setIsModalCancel={setIsOpenShare}
          listNV={listNV}
          handover={handover}
        />
        <HandeOverModalCustomer
          isModalCancel={isHandOverOpen}
          setIsModalCancel={setIsHandOverOpen}
          listNV={listNV}
          handover={handover}
          fetchData={fetchData}
          dataLength={dataLength}
        />
        <DelCustomerModal
          isModalCancel={isDelOpen}
          setIsModalCancel={setIsDelOpen}
          selectedCus={selectedCus}
        />
      </div>
    </>
  );
}
