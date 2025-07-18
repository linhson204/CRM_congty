import React, { use, useState } from "react";
import { Button, Modal, Result } from "antd";
import styles from "./modal.module.css";
import { useRouter } from "next/router";
const ModalCancel = (props: any) => {
  const { isShowModal, onClose } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setLoading(true);
    // setTimeout(() => {
    //     setLoading(false);
    //     setOpen(false);
    // }, 3000);
  };
  const router = useRouter();
  const handleClose = () => {
    onClose();
  };
  return (
    <div>
      <Modal
        width={500}
        open={isShowModal}
        title={
          <div
            style={{
              background: "#4C5BD4",
              width: "111%",
              margin: "-20px -30px",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                paddingTop: 5,
              }}
            >
              Hủy thêm mới hợp đồng
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
              onClick={() => {
                router.back();
              }}
            >
              Đồng ý
            </Button>
            ,
          </div>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            height: 200,
            fontSize: 15,
            padding: 63,
          }}
        >
          Bạn có đồng ý hủy thêm mới hợp đồng mọi dữ liệu sẽ không được lưu lại!
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
        <div></div>
        {/* <Result
                    status="success"
                    title={<div>Xóa dữ liệu thành công</div>}
                /> */}
      </Modal>
    </div>
  );
};

export default ModalCancel;
