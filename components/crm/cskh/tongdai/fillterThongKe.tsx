import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "./tongdai.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
interface MyComponentProps {
  datatable: any;
  isModalOpen: any;
  setIsModalOpen: any;
  fillStart: any;
  setFillStart: any;
  fillEnd: any;
  setFillEnd: any;
  handleFilter: any;
  phongban: any;
  setPhongban: any;
}
const FilterThongKe: React.FC<MyComponentProps> = ({
  datatable,
  isModalOpen,
  setIsModalOpen,
  fillStart,
  setFillStart,
  fillEnd,
  setFillEnd,
  handleFilter,
  phongban,
  setPhongban,
}) => {
  const [listPB, setlistPB] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleFilter();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDateChange = (e: any) => {
    setFillStart(`${e.target.value} 00:00:00`);
  };
  const handleDateChange2 = (e: any) => {
    setFillEnd(`${e.target.value} 23:59:59`);
  };
  const handleGetPhongBan = async () => {
    try {
      const decodedToken = await jwt_decode(Cookies.get("token_base365"))
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/organizeDetail/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          // body: JSON.stringify({ com_id: 10003087 }),
          body: JSON.stringify({ com_id: decodedToken["data"].com_id }),
        }
      );
      const data = await res.json()
      setlistPB(data?.data?.data);
    } catch (error) { }
  };

  const handleSlectPB = (value: any) => {
    setPhongban(value);
  };
  useEffect(() => {
    handleGetPhongBan();
  }, []);
  return (
    <>
      <button className={styles.filter} onClick={showModal}>
        {/* <NodeIndexOutlined /> */}
        <Image width={23} height={23} src={"filter_alt.svg"} alt="" />
        <p>Bộ lọc</p>
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles.main_filter}
      >
        <div className={styles.custom_filter}>Bộ lọc</div>

        <div className={styles.containerfillter}>
          <div className={styles.item1}>
            <div className={styles.item_time}>Thời gian</div>
            <div className={styles.filter_time}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: 10,
                  gap: 10,
                }}
              >
                <div>Từ</div>
                <div>
                  <Input onChange={handleDateChange} type="date" defaultValue={fillStart}></Input>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div>Đến</div>
                <div>
                  <Input onChange={handleDateChange2} type="date" defaultValue={fillEnd}></Input>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.item1}>
            <div style={{ width: 100 }}>Phòng ban</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "74%",
              }}
            >
              <div style={{ width: "100%" }}>
                <Select
                  onChange={handleSlectPB}
                  style={{ width: '100% !important' }}
                  value={phongban}
                  placeholder="Chọn tổ chức"
                >
                  <option>Chọn tổ chức</option>
                  {listPB &&
                    listPB.length > 0 &&
                    listPB?.map((item: any, index: number) => {
                      return (
                        <option key={index} value={item?.organizeDetailName}>
                          {item?.organizeDetailName}
                        </option>
                      );
                    })}
                </Select>
              </div>
            </div>
          </div>
          <div className={styles.footerBTN}>
            <div style={{ color: "#4c5bd4" }}>
              <Button
                onClick={handleCancel}
                style={{
                  color: "#4c5bd4",
                  border: "1px solid #4c5bd4",
                  width: 100,
                }}
              >
                Hủy
              </Button>
            </div>

            <Button
              style={{ color: "#fff", background: "#4c5bd4", width: 100 }}
              onClick={handleFilter}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterThongKe;
