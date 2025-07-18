import styles from "./order.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionOrderNew } from "../ultis/consntant";
import { useState } from "react";
import OrderBrowsingModal from "./order_new_action_modal/order_browsing_action_mdal";
import DenyActionModal from "./order_new_action_modal/deny_action_mdal";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


export default function OrderNewActionTable(props: any) {
  const { record, fetchAPIEdit, bodyAPI, link = "/order/edit" } = props;
  const [isOrderBrowsingOpen, setIsOrderBrowsingOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const decodedToken = jwt_decode(Cookies.get("token_base365"))
    if (decodedToken && decodedToken['data']) {
      return decodedToken['data']
    }
    return undefined
  })

  const handleApiReq = async (type: string, data = {}) => {
    const body = {
      _id: record._id,
      ...data,
    };
    let urlApi = '';

    if (user?.type === 2) {
      urlApi = 'https://api.timviec365.vn/api/crm/order/acceptOrderTimviecServiceByStaff';
    } else {
      urlApi = 'https://api.timviec365.vn/api/crm/order/acceptOrderTimviecServiceByCompany';
    }

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify(body),
      });
      const dataRes = await response.json();

      console.log("RES DUYET DON HANG", dataRes);

      return dataRes;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "order_browsing") {
      setIsOrderBrowsingOpen(true);
    }
    if (type === "deny") {
      setIsDenyOpen(true);
    }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionOrderNew.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionOrderNew[i].link !== "#" ? (
            <Link href={link} className="flex-start-btn">
              <i className={dataActionOrderNew[i].img}></i>
              {dataActionOrderNew[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionOrderNew[i].type)}
            >
              <i className={dataActionOrderNew[i].img}></i>
              {dataActionOrderNew[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <Dropdown menu={{ items }}>
          <button
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              margin: "auto",
            }}
          >
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <OrderBrowsingModal
        handleApiReq={handleApiReq}
        record={[record]}
        isModalCancel={isOrderBrowsingOpen}
        setIsModalCancel={setIsOrderBrowsingOpen}
      />
      <DenyActionModal
        handleApiReq={handleApiReq}
        record={[record]}
        isModalCancel={isDenyOpen}
        setIsModalCancel={setIsDenyOpen}
      />
    </>
  );
}
