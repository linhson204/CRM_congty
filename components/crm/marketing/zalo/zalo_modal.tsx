import { Modal, Button, Form, Image, Input, Table, Checkbox, Upload } from "antd"
import { SuccessIcon, CrossBlack } from '@/public/img/marketing'
import styles from '../marketing.module.css'
import { useState } from "react"


export const ModalSucess = ({ openModalSucess, setOpenModalSucess, text = "Thành công" }) => {
    return (
        <>
            <Modal
                open={openModalSucess}
                onCancel={() => { setOpenModalSucess(false) }}
                footer={[
                    <>
                        <div className={styles.facebook_modal_footer_success}>
                            <Button size="large" onClick={() => { setOpenModalSucess(false) }}>
                                Đóng
                            </Button>
                        </div>
                    </>
                ]}
            >
                <div className={styles.facebook_modal_success}>
                    <div>
                        <SuccessIcon />
                    </div>
                    <p>
                        {text}
                    </p>
                </div>
            </Modal>
        </>
    )
}

export const ModalDel = ({ openModalDel, setOpenModalDel, text, textSuccess = 'Thành công', handleOke= async () => {return true}, textTitle = 'Xóa tài khoản' }) => {
    const [openModalSucess, setOpenModalDelSucess] = useState(false)
    return (
        <>
            <Modal
                className='custom_modal_del'
                open={openModalDel}
                onCancel={() => { setOpenModalDel(false) }}
                footer={[
                    <>
                        <div className={styles.facebook_modal_footer_del}>
                            <Button type="primary"
                                style={{
                                    background: '#4C5BD4',
                                    color: '#FFF'
                                }} size="large" onClick={() => {
                                    setOpenModalDel(false)
                                    const status = handleOke()
                                    if (status) {
                                        setOpenModalDelSucess(true)
                                    } else alert('Lỗi')
                                }}>
                                Có
                            </Button>
                            <Button style={{
                                color: '#4C5BD4',
                                border: '1px solid #4C5BD4'
                            }} size="large" onClick={() => {
                                setOpenModalDel(false)
                            }}>
                                Không
                            </Button>
                        </div>
                    </>
                ]}
            >
                <div className={styles.facebook_modal_del}>
                    <h3>{textTitle}</h3>
                    <img className={styles.cross} src="/crm/img/marketing/cross.svg" alt="hungha.com" onClick={() => { setOpenModalDel(false) }} />
                    <p>
                        {text}
                    </p>
                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalDelSucess} text={textSuccess} />
        </>
    )
}