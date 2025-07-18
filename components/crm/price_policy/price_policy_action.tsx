import styles from "./price_policy.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionPricePolicy } from "../ultis/consntant";
import { useState } from "react";
import DelActionModal from "./price_policy_action_modal/deltete_action_mdal";

export default function PricePolicyAction({ isSelectedRow }: any) {
  const [isOpenCampaign, setIsOpenCampaign] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionPricePolicy.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionPricePolicy[i].link !== "#" ? (
            <Link
              href={dataActionPricePolicy[i].link}
              className="flex-start-btn"
            >
              <i className={dataActionPricePolicy[i].img}></i>
              {dataActionPricePolicy[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataActionPricePolicy[i].type)
              }
            >
              <i className={dataActionPricePolicy[i].img}></i>
              {dataActionPricePolicy[i].name}
            </button>
          )}
        </>
      ),
    });
  }
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

      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
    </div>
  );
}
