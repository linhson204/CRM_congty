import React, { useState } from "react";
import { Button, DatePicker, Input, Modal, Result } from "antd";
import styles from "./index.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
const AddTaiLieuDinhKem = (props: any) => {
  const { isShowModalAdd, onClose, handleAddDB, name } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {};

  const handleClose = () => {
    onClose();
  };
  return (
    <div>
      <Modal
        width={560}
        open={isShowModalAdd}
        title={
          <div
            style={{
              background: "#4c5bd4",
              width: "110%",
              margin: "-20px -30px",
            }}
          >
            <div style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Thêm lịch hẹn
            </div>
          </div>
        }
        onOk={handleOk}
        onCancel={onClose}
        centered
        closable={true}
        footer={[
          <div
            key={"1"}
            style={{ display: "flex", justifyContent: "center", gap: 20 }}
          >
            <Button
              style={{
                width: 140,
                height: 36,
                border: "1px solid #4c5bd4",
                color: "#4c5bd4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              key="back"
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button
              key={"2"}
              style={{
                width: 140,
                height: 36,
                background: "#4c5bd4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              type="primary"
              loading={loading}
              onClick={() => {
                handleAddDB(), setOpenSuccess(true);
              }}
            >
              Đồng ý
            </Button>
            ,
          </div>,
        ]}
      >
        <div className={styles.container}>
          <div className={styles.title}>
            Tên lịch hẹn <b>*</b>
          </div>
          <div>
            <Input
              required={true}
              width={"100%"}
              placeholder={"Nhập tên lịch hẹn"}
            ></Input>
          </div>
          <div className={styles.title}>
            Khách hàng <b>*</b>
          </div>
          <div>
            <Input width={"100%"} placeholder={"Nhập ID khách hàng"}></Input>
          </div>
          <div>
            <div className={styles.title}>
              Ngày bắt đầu <b>*</b>
            </div>
            <div className={styles.formdate}>
              <DatePicker picker="date" className={styles.dateinput} />
              <DatePicker picker="time" className={styles.dateinput} />
            </div>
          </div>
          <div>
            <div className={styles.title}>
              Ngày kết thúc <b>*</b>
            </div>
            <div className={styles.formdate}>
              <DatePicker picker="date" className={styles.dateinput} />
              <DatePicker picker="time" className={styles.dateinput} />
            </div>
          </div>
          <div className={styles.title}>
            Nhân viên thực hiện <b>*</b>
          </div>
          <div style={{ maxWidth: 500 }}>
            <PotentialSelectBoxStep
              value="Chọn nhân viên thực hiện"
              placeholder="Chọn nhân viên thực hiện"
            />
          </div>
          <div className={styles.title}>
            Địa điểm <b>*</b>
          </div>
          <div>
            <Input width={"100%"} placeholder={"Nhập địa điểm"}></Input>
          </div>
          <div className={styles.title}>
            Mô tả<span>*</span>
          </div>
          <div>
            <textarea
              style={{ width: "100%", padding: 15 }}
              placeholder={"Nhập mô tả"}
            ></textarea>
          </div>
        </div>
      </Modal>
      <Modal
        width={500}
        open={openSuccess}
        centered
        closable={true}
        footer={[
          <div
            key={"1"}
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingLeft: 50,
            }}
          >
            <Button
              key={"2"}
              style={{
                width: "100%",
                height: 36,
                background: "#4c5bd4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              type="primary"
              loading={loading}
              onClick={() => setOpenSuccess(false)}
            >
              Đóng
            </Button>
            ,
          </div>,
        ]}
      >
        {" "}
        <div></div>
        <Result status="success" title={<div>Thêm mới thành công</div>} />
      </Modal>
    </div>
  );
};

export default AddTaiLieuDinhKem;
