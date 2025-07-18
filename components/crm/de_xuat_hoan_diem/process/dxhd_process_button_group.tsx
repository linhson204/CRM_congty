import { useContext, useEffect, useState } from 'react'
import styles from './dxhd_btn_group.module.css'
import modalStyles from './dxhd_process_modal.module.css'
import { useFormData } from '../../context/formDataContext'
import { Button, Modal } from 'antd'
import { useRouter } from 'next/router'
import { getPropOrDefault } from '../utils'
import { DxhdDetailContext } from '../dxhd_detail_context'

export default function DxhdProcessBtnGroup({ }: any) {
    const { axiosTimViecAdminCall, dxhdDetail } = useContext(DxhdDetailContext)
    const { formData } = useContext(useFormData)
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false)
    const [isModalSaveOpen, setIsModalSaveOpen] = useState(false)
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false)
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false)
    const [reqChangeList, setReqChangeList] = useState([])
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            setReqChangeList([...getPropOrDefault(formData, 'req', [])])
        }
    }, [formData, id])

    const handleCancel = () => {
        setIsModalCancelOpen(false)
        router.push(`/de-xuat-hoan-diem/detail/${id}`)
    }

    const handleSave = async () => {
        setIsModalCancelOpen(false)
        // console.log('save', formData)
        const list_req = getPropOrDefault(formData, 'req', [])
            .map(req => ({
                id: getPropOrDefault(req, 'id', 0),
                status: getPropOrDefault(req, 'status', 1),
                verify_reason: getPropOrDefault(req, 'verify_reason', '')
            }))
        await axiosTimViecAdminCall
            .post('/supporterProcessDxhd', {
                dxhd_id: getPropOrDefault(formData, 'id', 0),
                list_req: JSON.stringify(list_req)
            })
            .then(res => {
                setIsModalSuccessOpen(true)
            })
            .catch(e => {
                console.log(e)
                setIsModalErrorOpen(true)
            })

        // setIsModalErrorOpen(true)
        // setIsModalSuccessOpen(true)
    }

    const handleOk = () => {
        router.push(`/de-xuat-hoan-diem/detail/${id}`)
    }

    return (
        <>
            {reqChangeList.length > 0 && <div className={`${styles.main}`}>
                <div className={styles.row_input}>
                    <div className={`${styles.main__control_btn}`}>
                        <button
                            type="button"
                            className={`${styles.btn_cancel} flex_align_center`}
                            onClick={(e) => setIsModalCancelOpen(true)}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className={`${styles.btn_save} flex_align_center`}
                            onClick={(e) => setIsModalSaveOpen(true)}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>}

            <Modal // Cancel
                open={isModalCancelOpen}
                onOk={handleCancel}
                onCancel={(e) => setIsModalCancelOpen(false)}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.cancel_btn} onClick={(e) => setIsModalCancelOpen(false)}>
                            Hủy
                        </Button>
                        <Button className={modalStyles.submit_btn} onClick={handleCancel}>
                            Tiếp tục
                        </Button>
                    </div>
                }
            >
                <div className={modalStyles.modal_img}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
                        <path d="M40.5003 6.6665C22.1337 6.6665 7.16699 21.6332 7.16699 39.9998C7.16699 58.3665 22.1337 73.3332 40.5003 73.3332C58.867 73.3332 73.8337 58.3665 73.8337 39.9998C73.8337 21.6332 58.867 6.6665 40.5003 6.6665ZM38.0003 26.6665C38.0003 25.2998 39.1337 24.1665 40.5003 24.1665C41.867 24.1665 43.0003 25.2998 43.0003 26.6665V43.3332C43.0003 44.6998 41.867 45.8332 40.5003 45.8332C39.1337 45.8332 38.0003 44.6998 38.0003 43.3332V26.6665ZM43.567 54.5998C43.4003 55.0332 43.167 55.3665 42.867 55.6998C42.5337 55.9998 42.167 56.2332 41.767 56.3998C41.367 56.5665 40.9337 56.6665 40.5003 56.6665C40.067 56.6665 39.6337 56.5665 39.2337 56.3998C38.8337 56.2332 38.467 55.9998 38.1337 55.6998C37.8337 55.3665 37.6003 55.0332 37.4337 54.5998C37.267 54.1998 37.167 53.7665 37.167 53.3332C37.167 52.8998 37.267 52.4665 37.4337 52.0665C37.6003 51.6665 37.8337 51.2998 38.1337 50.9665C38.467 50.6665 38.8337 50.4332 39.2337 50.2665C40.0337 49.9332 40.967 49.9332 41.767 50.2665C42.167 50.4332 42.5337 50.6665 42.867 50.9665C43.167 51.2998 43.4003 51.6665 43.567 52.0665C43.7337 52.4665 43.8337 52.8998 43.8337 53.3332C43.8337 53.7665 43.7337 54.1998 43.567 54.5998Z" fill="#4C5BD4" />
                    </svg>
                </div>
                <div className={modalStyles.modal_text}>
                    <p className={modalStyles.warning_text}>Nếu bạn hủy duyệt, dữ liệu bạn đã nhập sẽ mất</p>
                    <p>Bạn có chắc chắn muốn hủy duyệt?</p>
                </div>
            </Modal>

            <Modal // Save
                open={isModalSaveOpen}
                onOk={handleSave}
                onCancel={(e) => setIsModalSaveOpen(false)}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.cancel_btn} onClick={(e) => setIsModalSaveOpen(false)}>
                            Hủy
                        </Button>
                        <Button className={modalStyles.submit_btn} onClick={handleSave}>
                            Tiếp tục
                        </Button>
                    </div>
                }
            >
                <div className={modalStyles.modal_img}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
                        <path d="M40.5003 6.6665C22.1337 6.6665 7.16699 21.6332 7.16699 39.9998C7.16699 58.3665 22.1337 73.3332 40.5003 73.3332C58.867 73.3332 73.8337 58.3665 73.8337 39.9998C73.8337 21.6332 58.867 6.6665 40.5003 6.6665ZM38.0003 26.6665C38.0003 25.2998 39.1337 24.1665 40.5003 24.1665C41.867 24.1665 43.0003 25.2998 43.0003 26.6665V43.3332C43.0003 44.6998 41.867 45.8332 40.5003 45.8332C39.1337 45.8332 38.0003 44.6998 38.0003 43.3332V26.6665ZM43.567 54.5998C43.4003 55.0332 43.167 55.3665 42.867 55.6998C42.5337 55.9998 42.167 56.2332 41.767 56.3998C41.367 56.5665 40.9337 56.6665 40.5003 56.6665C40.067 56.6665 39.6337 56.5665 39.2337 56.3998C38.8337 56.2332 38.467 55.9998 38.1337 55.6998C37.8337 55.3665 37.6003 55.0332 37.4337 54.5998C37.267 54.1998 37.167 53.7665 37.167 53.3332C37.167 52.8998 37.267 52.4665 37.4337 52.0665C37.6003 51.6665 37.8337 51.2998 38.1337 50.9665C38.467 50.6665 38.8337 50.4332 39.2337 50.2665C40.0337 49.9332 40.967 49.9332 41.767 50.2665C42.167 50.4332 42.5337 50.6665 42.867 50.9665C43.167 51.2998 43.4003 51.6665 43.567 52.0665C43.7337 52.4665 43.8337 52.8998 43.8337 53.3332C43.8337 53.7665 43.7337 54.1998 43.567 54.5998Z" fill="#4C5BD4" />
                    </svg>
                </div>
                <div className={modalStyles.modal_text}>
                    <p className={modalStyles.warning_text}>Nếu lưu, bạn không thể hoàn tác yêu cầu đã duyệt</p>
                    <p>Bạn có chắc chắn muốn lưu?</p>
                </div>
            </Modal>

            <Modal // Modal Success
                open={isModalSuccessOpen}
                onOk={handleOk}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.success_btn} onClick={handleOk}>
                            Đóng
                        </Button>
                    </div>
                }
            >
                <div className={modalStyles.modal_img}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
                        <path
                            d="M40.5003 6.66669C22.1337 6.66669 7.16699 21.6334 7.16699 40C7.16699 58.3667 22.1337 73.3333 40.5003 73.3333C58.867 73.3333 73.8336 58.3667 73.8336 40C73.8336 21.6334 58.867 6.66669 40.5003 6.66669ZM56.4337 32.3333L37.5337 51.2333C37.067 51.7 36.4337 51.9667 35.767 51.9667C35.1003 51.9667 34.467 51.7 34.0003 51.2333L24.567 41.8C23.6003 40.8333 23.6003 39.2333 24.567 38.2667C25.5337 37.3 27.1337 37.3 28.1003 38.2667L35.767 45.9333L52.9003 28.8C53.867 27.8334 55.467 27.8334 56.4337 28.8C57.4003 29.7667 57.4003 31.3333 56.4337 32.3333Z"
                            fill="#00CE2D"
                        />
                    </svg>
                </div>
                <div className={modalStyles.modal_text}>
                    <p>Thao tác thành công!</p>
                </div>
            </Modal>

            <Modal // Modal Error
                open={isModalErrorOpen}
                onOk={(e) => setIsModalErrorOpen(false)}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.error_btn} onClick={(e) => setIsModalErrorOpen(false)}>
                            Đóng
                        </Button>
                    </div>
                }
            >
                <div className={modalStyles.modal_img}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
                        <path
                            d="M40.5003 6.66669C22.1337 6.66669 7.16699 21.6334 7.16699 40C7.16699 58.3667 22.1337 73.3334 40.5003 73.3334C58.867 73.3334 73.8337 58.3667 73.8337 40C73.8337 21.6334 58.867 6.66669 40.5003 6.66669ZM51.7003 47.6667C52.667 48.6334 52.667 50.2334 51.7003 51.2C51.2003 51.7 50.567 51.9334 49.9337 51.9334C49.3003 51.9334 48.667 51.7 48.167 51.2L40.5003 43.5334L32.8337 51.2C32.3337 51.7 31.7003 51.9334 31.067 51.9334C30.4337 51.9334 29.8003 51.7 29.3003 51.2C28.3337 50.2334 28.3337 48.6334 29.3003 47.6667L36.967 40L29.3003 32.3334C28.3337 31.3667 28.3337 29.7667 29.3003 28.8C30.267 27.8334 31.867 27.8334 32.8337 28.8L40.5003 36.4667L48.167 28.8C49.1337 27.8334 50.7337 27.8334 51.7003 28.8C52.667 29.7667 52.667 31.3667 51.7003 32.3334L44.0337 40L51.7003 47.6667Z"
                            fill="#FF3333"
                        />
                    </svg>
                </div>
                <div className={modalStyles.modal_text}>
                    <p>Thao tác không thành công!</p>
                </div>
            </Modal>
        </>
    )
}