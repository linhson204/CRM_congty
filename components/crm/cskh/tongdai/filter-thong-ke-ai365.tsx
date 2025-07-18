import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "./tongdai.module.css";
import { NodeIndexOutlined } from "@ant-design/icons";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface MyComponentProps {
  isModalFilter: any;
  setIsModalFilter: any;
  fillStart: any;
  setFillStart: any;
  fillEnd: any;
  setFillEnd: any;
  handleFilter: any;
  nv: any;
  setNv: any;
  status: any;
  setStatus: any;
}
const FilterGhiAm: React.FC<MyComponentProps> = ({
  isModalFilter,
  setIsModalFilter,
  fillStart,
  setFillStart,
  fillEnd,
  setFillEnd,
  handleFilter,
  nv,
  setNv,
  status,
  setStatus,
}) => {
  const [listNv, setListNv] = useState([])
  const showModal = () => {
    setIsModalFilter(true);
  };

  const handleOk = () => {
    setIsModalFilter(false);
    handleFilter();
  };

  const handleCancel = () => {
    setIsModalFilter(false);
  };
  const handleDateChange = (e: any) => {
    setFillStart(`${e.target.value} 00:00:00`);
  };
  const handleDateChange2 = (e: any) => {
    setFillEnd(`${e.target.value} 23:59:59`);
  };
  const handleSlectNv = (value: any) => {
    setNv(value)
  }
  const handleGetListNv = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/scheduleAutoCall/getListAdminUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json()
      setListNv(data?.data?.admin);
    } catch (error) { }
  };
  useEffect(() => {
    handleGetListNv();
  }, []);
  return (
    <>
      <button className={styles.filter} onClick={showModal}>
        <Image width={23} height={23} src={"/crm/filter_alt.svg"} alt="" />
        <p>Bộ lọc</p>
      </button>
      <Modal
        open={isModalFilter}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles.main_filter2}
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
            <div style={{ width: 130 }}>Chuyên viên</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <Select
                  onChange={handleSlectNv}
                  style={{ width: '100% !important' }}
                  value={nv}
                  placeholder="Chọn chuyên viên"
                >
                  <option>Chuyên viên</option>
                  {listNv &&
                    listNv.length > 0 &&
                    listNv?.map((item: any, index: number) => {
                      return (
                        <option key={index} value={`${item.emp_id} - ${item.emp_name}`}>
                          {item.emp_id} - {item.emp_name}
                        </option>
                      );
                    })}
                </Select>
              </div>
            </div>
          </div>
          <div className={styles.item1}>
            <div style={{ width: 130 }}>Trạng thái</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <Select
                  placeholder="Trạng thái cuộc gọi"
                  value={status}
                  onChange={(value) => setStatus(value)}
                >
                  <option>Trạng thái</option>
                  <option value={'Nghe máy'}>Nghe máy</option>
                  <option value='Không nghe máy'>Không nghe máy</option>
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

export default FilterGhiAm;
