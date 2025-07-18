import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Result } from "antd";
import styles from "./modal.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/router";
const ModalChangeSoQuy = (props: any) => {
  const { isShowModalChange, onClose, name } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const router = useRouter();
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {};
  const handleChange = () => {
    alert("Cập nhật thành công");
    router.reload();
  };
  return (
    <div>
      <Modal
        width={550}
        open={isShowModalChange}
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
              Chỉnh sửa sổ quỹ
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
                width: 200,
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
                width: 200,
                height: 36,
                background: "#4C5BD4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              type="primary"
              loading={loading}
              onClick={handleChange}
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
          <div>
            <div style={{ fontSize: 19, fontWeight: 500 }}> Tên sổ quỹ</div>
            <Input placeholder="Nhập tên sổ quỹ"></Input>
          </div>

          <div>
            <div style={{ fontSize: 19, fontWeight: 500 }}> Mô tả</div>
            <textarea style={{ width: "100%", height: 100 }}></textarea>
          </div>

          <div>
            <div style={{ fontSize: 19, fontWeight: 500 }}>
              Chọn người quản lý
            </div>
            <div style={{ height: 40 }}>
              <PotentialSelectBoxStep
                value="Chọn người quản lý"
                placeholder="Chọn người quản lý"
              />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 19, fontWeight: 500 }}>Trạng thái</div>
            <div style={{ height: 40 }}>
              <PotentialSelectBoxStep
                value="Hoạt động"
                placeholder="Chọn trạng thái"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalChangeSoQuy;
