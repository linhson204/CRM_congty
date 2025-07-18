import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "./tongdai.module.css";
import { NodeIndexOutlined } from "@ant-design/icons";
import Image from "next/image";

const App: React.FC = (props?: any) => {
  const { datatable, isModalOpen, setIsModalOpen, fillStart, setFillStart, fillEnd, setFillEnd, handleGet } = props
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleGet()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDateChange = (e: any) => {
    setFillStart(`${e.target.value} 00:00:00`)
  }
  const handleDateChange2 = (e: any) => {
    setFillEnd(`${e.target.value} 23:59:59`)
  }
  const uniqueCounts = Array.from(new Set(datatable?.map(item => item.caller))); // Lọc giá trị duy nhất

  return (
    <>
      <button className={styles.filter} onClick={showModal}>
        <Image
          width={23}
          height={23}
          src={"filter_alt.svg"}
          alt=""
        />
        <p>Bộ lọc</p>
      </button>
      <Modal
        title="Bộ lọc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles.main_filter}
      >
        <div className={styles.containerfillter}>
          <div className={styles.item1}>
            <div style={{ width: 120 }}>Thời gian</div>
            <div style={{ display: "flex", alignItems: "center", paddingRight: 10, gap: 10 }}>
              <div>Từ</div>
              <div>
                <Input onChange={handleDateChange} type="date"></Input>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div>Đến</div>
              <div>
                <Input onChange={handleDateChange2} type="date"></Input>
              </div>
            </div>
          </div>
          <div className={styles.item1}>
            <div style={{ width: 128 }}>Số gọi</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

              <div style={{ width: "100%" }}>
                {/* <div style={{ width: 145 }}>
                  <Input type="text"></Input>
                </div> */}
                <Select style={{ width: 145 }} placeholder="Chọn số gọi">
                  {uniqueCounts.map((count: any, index: number) => {
                    return (
                      <option key={index} value={count}>{count}</option>
                    )
                  })}
                </Select>
              </div>
            </div>

          </div>
          <div className={styles.item1}>
            <div style={{ width: 128 }}>Số người nghe</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

              <div style={{ width: 145 }}>
                <Input type="text"></Input>
              </div>
            </div>

          </div>
          <div className={styles.footerBTN}>
            <div style={{ color: "#4c5bd4" }}>
              <Button onClick={handleCancel} style={{ color: "#4c5bd4", border: "1px solid #4c5bd4" }}> Hủy</Button>
            </div>
            <div>
              <Button style={{ color: "#fff", background: "#4c5bd4" }} onClick={handleGet}>
                Tìm kiếm
              </Button>

            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;
