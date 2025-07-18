import { Input, Modal, Button } from "antd"
import React, { useState } from "react";
import styles from './marketing.module.css'

const ModalOtpAccount = ({ open, setOpen, setOpenModalSuccess }) => {
    console.log(open);
    const [inputValue, setInputValue] = useState('')
    const handelKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('Enter đã được nhấn với giá trị:', inputValue);
            setOpen(false)
            setOpenModalSuccess(true)
        }
    }
    return (
        <>
            <Modal
                className="facebook_otp_acc"
                open={open}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={[
                    <>
                        <div className={styles.facebook_btn_submit}>
                            <Button type="primary" onClick={() => {
                                setOpen(false)
                            }}>Đóng</Button>
                        </div>
                    </>
                ]}
            >
                <div className={styles.facebook_otp_acc}>
                    <h3>Mã xác thực OTP</h3>
                    <img className={styles.cross} src="/crm/img/marketing/cross.svg" alt="hungha.com" onClick={() => { setOpen(false) }} />
                    <p>Mã xác thực của bạn là</p>
                    <div className={styles.input_otp}>
                        <input value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} maxLength={6} onKeyDown={handelKeyDown} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalOtpAccount