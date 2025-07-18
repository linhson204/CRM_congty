import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import styles from "../../crm/potential/potential.module.css";
import Image from "next/image";
import Link from "next/link";
import DelActionModalProductReturn from "@/components/crm/product_return/product_return_modal/product_return_del_mdal";
import ProductReturnDeclineModal from "@/components/crm/product_return/product_return_modal/product_decline_action_mdal";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import HandeOverModal from "@/components/crm/potential/potential_action_modal/hand_over_mdal";
import SharingCustomerModal from "./chance_share_action_mdal";
import CancelModalChance from "./modals/cancel_modal";
import { fetchApi } from "../ultis/api";
import Cookies from "js-cookie";
import { useTrigger } from "../context/triggerContext";
import { useRouter } from "next/router";

interface Myprops {
  data?: any;
  selectedRow?: any;
  setSelectedRow?: any;
}

const ChanceHeaderActionDropDown: React.FC<Myprops> = ({
  data,
  selectedRow,
  setSelectedRow,
}) => {
  const [isOpenModalCheck, setIsOpenModalCheck] = useState(false);
  const token = Cookies.get("token_base365");
  const { trigger, setTrigger } = useTrigger();
  const [isOpenModalDecline, setIsOpenModalDecline] = useState(false);
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/order/add" className="btn-huy flex-start">
          <i className="bi bi-cart"></i>
          Thêm đơn hàng
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/quote/add" className="btn-huy flex-start">
          <i
            className="bi bi-currency-dollar"
            style={{
              display: "block",
              marginRight: "3px",
              border: "solid 1px black",
            }}
          ></i>
          Thêm báo giá
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalCancel(true)}
        >
          <i className="bi bi-reply"></i>
          Chia sẻ
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalUpdateStatus(true)}
        >
          <Image
            width={16}
            height={16}
            src="/crm/update_status.svg"
            alt="check"
          />
          Bàn giao công việc
        </button>
      ),
    },
    {
      key: "5",
      label: (
        <>
          {selectedRow?.length === 1 ? (
            <Link href={`/chance/edit/${selectedRow[0]?.id}`}>
              <button className="btn-huy flex-start">
                <i className="bi bi-pencil-square"></i>
                Chỉnh sửa
              </button>
            </Link>
          ) : (
            <button
              className="btn-huy flex-start"
              disabled
              style={{ color: "grey" }}
            >
              <i className="bi bi-pencil-square"></i>
              Chỉnh sửa
            </button>
          )}
        </>
      ),
    },
    {
      key: "6",
      label: (
        <button
          className="btn-huy flex-start"
          onClick={() => setIsOpenModalDel(true)}
        >
          <Image width={16} height={16} src="/crm/del.svg" alt="check" />
          Xoá
        </button>
      ),
    },
  ];

  const fetchApiChance = async () => {
    const promiseChanceDel = selectedRow?.map((item) =>
      fetchApi(
        "http://localhost:3007/api/crm/chance/delete-chance",
        token,
        { chance_id: item?.id },
        "POST"
      )
    );
    Promise.all(promiseChanceDel);
    setTrigger(true);
    setSelectedRow([]);
  };

  return (
    <>
      <div className={styles.div__thaotac} style={{ marginLeft: "15px" }}>
        <div>
          <label>Đã chọn:</label>
          <b className={styles.checked_count}> {selectedRow?.length || 0}</b>
        </div>
        <Space direction="vertical">
          <Space wrap>
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              className={
                selectedRow?.length < 1 || !selectedRow ? "opacity" : ""
              }
              trigger={[selectedRow?.length > 0 ? "hover" : "contextMenu"]}
            >
              <button className="action_table">
                <img src="/crm/3_cham.png" alt="hungha365" />
                Thao tác
              </button>
            </Dropdown>
          </Space>
        </Space>
        <HandeOverModal
          isModalCancel={isOpenModalUpdateStatus}
          setIsModalCancel={setIsOpenModalUpdateStatus}
          listNV={undefined}
        />

        <SharingCustomerModal
          isModalCancel={isOpenModalCancel}
          setIsModalCancel={setIsOpenModalCancel}
        />

        <ProductReturnDeclineModal
          isModalCancel={isOpenModalDecline}
          setIsModalCancel={setIsOpenModalDecline}
        />

        <CancelModalChance
          isModalCancel={isOpenModalDel}
          setIsModalCancel={setIsOpenModalDel}
          content="Bạn có chắc chắn muốn xoá cơ hội này không?"
          title="Xác nhận xoá cơ hội"
          fetchApi={fetchApiChance}
        />
      </div>
    </>
  );
};

export default ChanceHeaderActionDropDown;
