import React, { useState } from "react";
import { Button, Input, Modal, Result } from "antd";
import styles from "./index.module.css";
const ModalConnect = (props: any) => {
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
        width={500}
        open={isShowModalAdd}
        title={
          <div
            style={{
              background: "#4C5BD4",
              width: "111%",
              margin: "-20px -30px",
            }}
          >
            <div style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Vui lòng đăng nhập để kết nối
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
                border: "1px solid blue",
                color: "#4C5BD4",
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
                background: "#4C5BD4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              type="primary"
              loading={loading}
              onClick={() => alert("Tài khoản kết nối không tồn tại")}
              // onClick={() => {
              //   handleAddDB(), setOpenSuccess(true);
              // }}
            >
              Đồng ý
            </Button>
            ,
          </div>,
        ]}
      >
        <div className={styles.container}>
          <div className={styles.title}>
            Tài khoản <b>*</b>
          </div>
          <div>
            <Input
              required={true}
              width={"100%"}
              placeholder={"Nhập tên tài khoản"}
            ></Input>
          </div>
          <div className={styles.title}>
            Mật khẩu <b>*</b>
          </div>
          <div>
            <Input
              required={true}
              width={"100%"}
              placeholder={"Nhập mật khẩu"}
            ></Input>
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
            }}
          >
            <Button
              key={"2"}
              style={{
                width: "100%",
                height: 36,
                background: "#4C5BD4",
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
        <Result status="success" title={<div>Thêm mới thành công</div>} />
      </Modal>
    </div>
  );
};

export default ModalConnect;
