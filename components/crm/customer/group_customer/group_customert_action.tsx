import styles from "../../potential/potential.module.css"
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import CancelModalDelGroup from "./delete_mdal_gr_cus";
import { useApi } from "../../hooks/useApi";
import { base_url } from "../../service/function";
import Cookies from "js-cookie";
import React from "react";
export default function GroupCustomerAction({
  isSelectedRow,
  selectedRow,
  updateData,
}: any) {
  const [isDelOpen, setIsDelOpen] = useState(false);

  const accessToken = Cookies.get("token_base365");

  const handleClickAction = (e: any) => {
    setIsDelOpen(true);
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <>
          <button
            className="flex-start-btn"
            onClick={(e) => handleClickAction(e)}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 3.7998H3.15H14.35"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.24844 3.8V2.4C5.24844 2.0287 5.39594 1.6726 5.65849 1.41005C5.92104 1.1475 6.27713 1 6.64844 1H9.44844C9.81974 1 10.1758 1.1475 10.4384 1.41005C10.7009 1.6726 10.8484 2.0287 10.8484 2.4V3.8M12.9484 3.8V13.6C12.9484 13.9713 12.8009 14.3274 12.5384 14.5899C12.2758 14.8525 11.9197 15 11.5484 15H4.54844C4.17713 15 3.82104 14.8525 3.55849 14.5899C3.29594 14.3274 3.14844 13.9713 3.14844 13.6V3.8H12.9484Z"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.65039 7.2998V11.4998"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.44922 7.2998V11.4998"
                stroke="#474747"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Xoá
          </button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.div__thaotac}>
      <div>
        <label>Đã chọn:</label>
        <b className={styles.checked_count}>0</b>
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

      <CancelModalDelGroup
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
        content={"Bạn có đồng ý xóa nhóm khách hàng này không?"}
        title={"Xác nhận xóa nhóm khách hàng"}
        link={"#"}
        keyDeleted={selectedRow}
        updateData={updateData}
        setChange={updateData}
      />
    </div>
  );
}
