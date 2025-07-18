import React, { useState } from 'react';
import { Button, InputNumber, Modal, Result } from 'antd';
import styles from "./modal.module.css"
const ModalUpdateThanhToan = (props: any) => {
    const { isShowModal, onClose, handleDeleteDB, name } = props
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false)

    const showModal = () => {
        setOpen(true);

    };

    const handleOk = () => {
      
    };

    return (
        <div>
            <Modal
                width={530}
                open={isShowModal}
                title={<div style={{ background: "#4C5BD4", width: "111%", margin: "-20px -24px" }}>
                    <div style={{ color: "white", fontSize: 20, textAlign: 'center', paddingTop: 5 }}>Cập nhật thanh toán</div></div>}
                onOk={handleOk}
                onCancel={onClose}
                closable={true}
                footer={[
                    <div key={"1"} style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                        <Button style={{
                            width: 140, height: 36, border: "1px solid blue", color: "#4C5BD4",
                            fontSize: 16, fontWeight: 1000
                        }} key="back" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button key={"2"} style={{ width: 140, height: 36, background: "#4C5BD4", fontSize: 16, fontWeight: 1000 }}
                            type="primary"
                            loading={loading} >
                            Cập nhật
                        </Button>,
                    </div>

                ]}
            >
                <div style={{ width: "100%", alignItems: "center", paddingTop: "20px" }}>
                    <div>
                        <div style={{ fontSize: 16 }}> Hình thức thanh toán</div>
                        <select required defaultValue={"Chọn hình thức thanh toán"} style={{ width: "100%", height: 35 }} >
                            <option  disabled value="" style={{ fontSize: 12 }}>Chọn hình thức thanh toán</option>
                            <option value="" style={{ fontSize: 12 }}>Tiền mặt</option>
                            <option value="">Chuyển khoản</option>
                        </select>
                    </div>

                    <div>
                        <div style={{ fontSize: 16 }}> Số tiền thanh toán</div>
                        <InputNumber defaultValue={3} style={{ width: "100%", height: 35 }} >
                            {/* <option value="" style={{fontSize:12}}>Tiền mặt</option>
                        <option value="">Chuyển khoản</option> */}
                        </InputNumber>
                    </div>

                    <div>
                        <div style={{ fontSize: 16 }}> Sổ quỹ</div>
                        <select required style={{ width: "100%", height: 35 }} >
                            <option disabled value="" style={{ fontSize: 12 }}>Chọn sổ quỹ</option>
                            <option value="" style={{ fontSize: 12 }}>Tiền mặt</option>
                            <option value="">Chuyển khoản</option>
                        </select>
                    </div>

                </div>

            </Modal>
        </div>
    );
};

export default ModalUpdateThanhToan;
