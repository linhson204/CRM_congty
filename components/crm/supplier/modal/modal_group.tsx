import React, { useState } from "react";
import { Button, DatePicker, Input, Modal, Result } from "antd";
import styles from "./index.module.css";
import SupplierSelectBoxStep from "@/components/crm/supplier/supplier_steps/select_box_step";
const ModalSupplierGroup = (props: any) => {
  const { isShowModalAdd, setClose, handleAddDB, name } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {};

  const handleClose = () => {
    setClose(false);
  };
  return (
    <div>
      <Modal
        width={600}
        open={isShowModalAdd}
        title={
          <div
            style={{
              background: "#4c5bd4",
              width: "115%",
              margin: "-20px -30px",
              borderRadius: "6px 6px 0 0",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                margin: "14px 0 10px 0",
              }}
            >
              Thêm nhóm nhà cung cấp
            </div>
          </div>
        }
        onOk={handleOk}
        onCancel={() => setClose(false)}
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
                handleClose(), setOpenSuccess(true);
              }}
            >
              Đồng ý
            </Button>
            ,
          </div>,
        ]}
      >
        <div className={styles.container}>
          <div style={{ fontWeight: "bold" }} className={styles.title}>
            Tên nhóm <b>*</b>
          </div>
          <div>
            <Input
              required={true}
              width={"100%"}
              placeholder={"Nhập tên nhóm"}
            ></Input>
          </div>
          <div style={{ fontWeight: "bold" }} className={styles.title}>
            Mô tả nhóm nhà cung cấp
          </div>
          <div>
            <textarea
              style={{ width: "100%", padding: 15 }}
              placeholder={"Nhập mô tả nhóm nhà cung cấp"}
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
                background: "blue",
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
        <Result status="success" title={<div>Thêm mới thành công</div>} />
      </Modal>
    </div>
  );
};

export default ModalSupplierGroup;
