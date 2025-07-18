import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Result } from "antd";
import styles from "./modal.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
const ModalAddNhomSP = (props: any) => {
  const { isShowModal, onClose, handleDeleteDB, name } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {};

  return (
    <div>
      <Modal
        width={550}
        open={isShowModal}
        title={
          <div
            style={{
              background: "#4C5BD4",
              width: "111%",
              margin: "-20px -24px",
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
              Thêm mới nhóm sản phẩm
            </div>
          </div>
        }
        onOk={handleOk}
        onCancel={onClose}
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
              onClick={onClose}
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
                alert("Thêm mới sản phẩm thành công"), onClose();
              }}
            >
              Gửi
            </Button>
            ,
          </div>,
        ]}
      >
        <div
          style={{ width: "100%", alignItems: "center", paddingTop: "20px" }}
        >
          <div style={{ paddingBottom: 22 }}>
            <div style={{ fontSize: 19, fontWeight: 500 }}> Tên nhóm</div>
            <Input placeholder="Nhập tên nhóm"></Input>
          </div>

          <div>
            <div style={{ fontSize: 19, fontWeight: 500 }}> Mô tả</div>
            <textarea
              style={{
                width: "100%",
                height: 100,
                maxWidth: "100%",
                fontSize: 18,
                padding: 10,
              }}
            >
              {/* <option value="" style={{fontSize:12}}>Tiền mặt</option>
                        <option value="">Chuyển khoản</option> */}
            </textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddNhomSP;
