import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Result } from "antd";
import styles from "./modal_custom.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
const ModalAddSoQuy = (props: any) => {
  const { isShowModalAdd, onClose, handleDeleteDB, name } = props;
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
        open={isShowModalAdd}
        onOk={handleOk}
        onCancel={onClose}
        closable={true}
        footer={[
          <div
            key={"1"}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              margin: "20px 0 ",
            }}
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
            >
              Thêm mới
            </Button>
          </div>,
        ]}
      >
        <div
          style={{ width: "100%", alignItems: "center", paddingTop: "20px" }}
        >
          <h3 className={styles.title}>Thêm mới sổ quỹ</h3>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, paddingTop: 30 }}>
              Tên sổ quỹ
            </div>
            <Input placeholder="Nhập tên sổ quỹ"></Input>
          </div>

          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}> Mô tả</div>
            <textarea
              style={{
                width: "100%",
                height: 100,
                fontSize: 20,
                padding: 5,
                border: "1px solid #ccc",
              }}
            ></textarea>
          </div>

          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>
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
            <div style={{ fontSize: 16, fontWeight: 500 }}>Trạng thái</div>
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

export default ModalAddSoQuy;
