import React, { useState } from "react";
import { Button, Modal, Result } from "antd";
import styles from "./modal.module.css";
import { Router, useRouter } from "next/router";
const ModalReturn = (props: any) => {
  const router = useRouter();
  const { isShowModalReturn, onClose, handleReturnDB, name, handleSave, path } =
    props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleBack = () => {
    if (
      router.pathname == "/them-phieu-thu-khach-hang" ||
      router.pathname == "/them-phieu-thu-nha-cung-cap" ||
      router.pathname == "/them-phieu-chi-nha-cung-cap" ||
      router.pathname == "/them-phieu-chi-khach-hang" ||
      router.pathname == "/them-moi-san-pham" ||
      router.pathname.startsWith("/chinh-sua-san-pham")
    ) {
      router.back();
    }

    onClose();
    if (path) {
      if (router.pathname.startsWith("/chinh-sua-phieu-chi"))
        router.push(`/chi-tiet-phieu-chi/${path.id}`);
      else {
        router.push(`/chi-tiet-phieu-thu/${path.id}`);
      }
    }
  };
  return (
    <>
      <Modal
        width={500}
        open={isShowModalReturn}
        title={
          <div
            style={{
              background: "#4C5BD4",
              width: "115%",
              margin: "-20px -30px",
              borderRadius: "8px 8px 0 0",
              padding: 10,
            }}
          >
            <div style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              {name ? "Xác nhận thoát" : " Xác nhận khôi phục dữ liệu"}
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
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <Button
              style={{
                width: 140,
                height: 36,
                border: "1px solid #4C5BD4",
                color: "#4C5BD4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              key="back"
              onClick={onClose}
            >
              Huỷ
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
                if (name) {
                  handleBack();
                } else {
                  handleReturnDB(), setOpenSuccess(true);
                }
              }}
            >
              {name ? "Đồng ý" : "Khôi phục"}
            </Button>
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
          {name ? (
            <div>
              Thay đổi sẽ không được lưu
              <br />
              <p style={{ fontWeight: 800 }}>Bạn có chắc muốn thoát?</p>
            </div>
          ) : (
            "Bạn có chắc chắn muốn khôi phục dữ liệu bạn đã chọn không?"
          )}
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
            style={{ display: "flex", justifyContent: "center", gap: 20 }}
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
        <Result
          status="success"
          title={<div>Khôi phục dữ liệu thành công</div>}
        />
      </Modal>
    </>
  );
};

export default ModalReturn;
