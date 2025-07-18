import React, { useContext, useEffect, useState } from "react"
import styles from './dxhd_detail_inner.module.css'
import modalStyles from './dxhd_detail_modal.module.css'
import { DxhdDetailContext } from "../dxhd_detail_context"
import { useFormData } from "../../context/formDataContext"
import { getPropOrDefault } from "../utils"
import { useRouter } from "next/router"
import { Button, Modal, Input, Tooltip, message } from "antd"
import Link from "next/link"
import { isAccepted, isDenied, isWaiting } from "../dxhd_status"
import axios from "axios"
import Cookies from "js-cookie";
const { TextArea } = Input

export default function DxhdDetailBtnGroup({ }: any) {
    const [isModalDenyOpen, setIsModalDenyOpen] = useState(false)
    const [isModalAcceptOpen, setIsModalAcceptOpen] = useState(false)
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false)
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false)
    const [denyReason, setDenyReason] = useState('')
    const { dxhdDetail, setGetData, axiosTimViecAdminCall } = useContext(DxhdDetailContext)
    const { formData, setFormData } = useContext(useFormData)
    const [getDataAfterId, setGetDataAfterId] = useState(false)

    const [dxhdStatus, setDxhdStatus] = useState(0)
    const [dxhdResult, setDxhdResult] = useState('')
    const router = useRouter();
    const { id } = router.query
    const [isAdminAccept, setIsAdminAccept] = useState(0)
    const [isAdmin, setIsAdmin] = useState(0)
    const [admin, setAdmin] = useState(null)

    // axiosTimViecAdminCall.interceptors.request.use((config: any) => {
    //     let accessToken = Cookies.get("token_base365");
    //     return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
    // });

    useEffect(() => {
        setFormData((prev) => ({ ...prev, id: id }))
        id && setGetDataAfterId(true)
    }, [id])

    useEffect(() => {
        if (getDataAfterId) {
            setGetData(true)
            axiosTimViecAdminCall
            .post('/checkSupportAdmin')
            .then(res => {
                setIsAdmin(getPropOrDefault(res, 'data.data.data.isAdmin', 0))
                setAdmin(getPropOrDefault(res, 'data.data.data.admin', null))
            })
            .catch(e => console.log(e))
            setGetDataAfterId(false)
        }
    }, [formData, getDataAfterId])

    useEffect(() => {
        setDxhdStatus(getPropOrDefault(dxhdDetail, 'status', 1))
        setDxhdResult(getPropOrDefault(dxhdDetail, 'result', 'Không có'))
        setIsAdminAccept(getPropOrDefault(dxhdDetail, 'admin_accept', 0))
    }, [dxhdDetail])

    const handleModalDenyOk = async (e) => {
        // console.log('deny', denyReason)
        await axiosTimViecAdminCall
        .post('/supporterCancelDxhd', {
            dxhd_id: id,
            deny_reason: denyReason
        })
        .then(res => {
            setIsModalSuccessOpen(true)
        })
        .catch(e => {
            console.log(e)
            setIsModalErrorOpen(true)
        })
        setIsModalDenyOpen(false)
        // setIsModalErrorOpen(true)
    }

    const handleModalAcceptOk = async (e) => {
        // console.log('accept')
        await axiosTimViecAdminCall
        .post('/supporterTakeInDxhd', {
            dxhd_id: id
        })
        .then(res => {
            setIsModalSuccessOpen(true)
        })
        .catch(e => {
            console.log(e)
            setIsModalErrorOpen(true)
        })
        setIsModalAcceptOpen(false)
    }

    const handleAdminAccept = async (e) => {
        await axiosTimViecAdminCall
        .post('/adminAcceptDxhd', {
            dxhd_id: id,
            admin_id: getPropOrDefault(admin, 'adm_id', 0)
        })
        .then(res => {
            setIsModalSuccessOpen(true)
        })
        .catch(e => {
            console.log(e)
            setIsModalErrorOpen(true)
        })
    }

    const handleAdminCancel = async (e) => {
        await axiosTimViecAdminCall
        .post('/adminCancelDxhd', {
            dxhd_id: id,
            admin_id: getPropOrDefault(admin, 'adm_id', 0)
        })
        .then(res => {
            setIsModalSuccessOpen(true)
        })
        .catch(e => {
            console.log(e)
            setIsModalErrorOpen(true)
        })
    }

    const handleModalSuccessOk = (e) => {
        // console.log('success')
        setIsModalSuccessOpen(false)
        router.push(`/de-xuat-hoan-diem/detail/${id}`)
    }

    const handleModalErrorOk = (e) => {
        // console.log('error')
        setIsModalErrorOpen(false)
        router.push(`/de-xuat-hoan-diem/detail/${id}`)
    }

    return (
        <>
            <div className={`${styles.main}`}>
                <div className={styles.row_input}>
                    <div className={`${styles.main__control_btn} ${styles.flex_end} `}>
                        {isWaiting(dxhdStatus) &&
                            <>
                                <div>
                                    <button
                                        type="button"
                                        className={`${styles.btn_accept} flex_align_center`}
                                        onClick={(e) => {
                                            setIsModalAcceptOpen(true)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M22.418 2.61719L14.218 10.8172" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.418 6.78711V11.6171H18.248" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.418 2.61719H9.41797C4.41797 2.61719 2.41797 4.61719 2.41797 9.61719V15.6172C2.41797 20.6172 4.41797 22.6172 9.41797 22.6172H15.418C20.418 22.6172 22.418 20.6172 22.418 15.6172V13.6172" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Tiếp nhận
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDenyReason('')
                                            setIsModalDenyOpen(true)
                                        }}
                                        className={`${styles.btn_delete} flex_align_center`}
                                    >
                                        {/* &nbsp;&nbsp;&nbsp; */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M12.418 22.6172C17.918 22.6172 22.418 18.1172 22.418 12.6172C22.418 7.11719 17.918 2.61719 12.418 2.61719C6.91797 2.61719 2.41797 7.11719 2.41797 12.6172C2.41797 18.1172 6.91797 22.6172 12.418 22.6172Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.58789 15.4471L15.2479 9.78711" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.2479 15.4471L9.58789 9.78711" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Từ chối
                                    </button>
                                </div>
                            </>
                        }

                        {
                            dxhdStatus === 5 && isAdmin === 1 && admin && isAdminAccept === 1 &&
                            <>
                                <div>
                                    <button
                                        type="button"
                                        className={`${styles.btn_accept} flex_align_center`}
                                        onClick={handleAdminAccept}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M22.418 2.61719L14.218 10.8172" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.418 6.78711V11.6171H18.248" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.418 2.61719H9.41797C4.41797 2.61719 2.41797 4.61719 2.41797 9.61719V15.6172C2.41797 20.6172 4.41797 22.6172 9.41797 22.6172H15.418C20.418 22.6172 22.418 20.6172 22.418 15.6172V13.6172" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Duyệt
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleAdminCancel}
                                        className={`${styles.btn_delete} flex_align_center`}
                                    >
                                        {/* &nbsp;&nbsp;&nbsp; */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M12.418 22.6172C17.918 22.6172 22.418 18.1172 22.418 12.6172C22.418 7.11719 17.918 2.61719 12.418 2.61719C6.91797 2.61719 2.41797 7.11719 2.41797 12.6172C2.41797 18.1172 6.91797 22.6172 12.418 22.6172Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.58789 15.4471L15.2479 9.78711" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.2479 15.4471L9.58789 9.78711" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Hủy 
                                    </button>
                                </div>
                            </>
                        }

                        {isDenied(dxhdStatus) &&
                            <Tooltip
                                placement="topLeft"
                                title={`${dxhdResult}`}
                                color="white"
                                overlayInnerStyle={{ color: 'black', backgroundColor: 'white' }}
                            >
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // setIsDelOpen(true);
                                        }}
                                        className={`${styles.btn_delete_already} flex_align_center`}
                                        disabled
                                        style={{
                                            cursor: 'default'
                                        }}
                                    >
                                        {/* &nbsp;&nbsp;&nbsp; */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M12.418 22.6172C17.918 22.6172 22.418 18.1172 22.418 12.6172C22.418 7.11719 17.918 2.61719 12.418 2.61719C6.91797 2.61719 2.41797 7.11719 2.41797 12.6172C2.41797 18.1172 6.91797 22.6172 12.418 22.6172Z" stroke="#FF3333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.58789 15.4471L15.2479 9.78711" stroke="#FF3333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.2479 15.4471L9.58789 9.78711" stroke="#FF3333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Đã từ chối
                                    </button>
                                </div>
                            </Tooltip>
                        }

                        {isAccepted(dxhdStatus) &&
                            <>
                                {dxhdStatus !== 5 && <div>
                                    <Link
                                    href={`/de-xuat-hoan-diem/process/${id}`}
                                    >
                                        <button
                                            type="button"
                                            className={`${styles.btn_edit} flex_align_center`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                <path d="M11.418 2.61719H9.41797C4.41797 2.61719 2.41797 4.61719 2.41797 9.61719V15.6172C2.41797 20.6172 4.41797 22.6172 9.41797 22.6172H15.418C20.418 22.6172 22.418 20.6172 22.418 15.6172V13.6172" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M16.4578 3.63744L8.57785 11.5174C8.27785 11.8174 7.97785 12.4074 7.91785 12.8374L7.48785 15.8474C7.32785 16.9374 8.09785 17.6974 9.18785 17.5474L12.1978 17.1174C12.6178 17.0574 13.2078 16.7574 13.5178 16.4574L21.3978 8.57744C22.7578 7.21744 23.3978 5.63744 21.3978 3.63744C19.3978 1.63744 17.8178 2.27744 16.4578 3.63744Z" stroke="white" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.3279 4.76758C15.9979 7.15758 17.8679 9.02758 20.2679 9.70758" stroke="white" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            Xử lý
                                        </button>
                                    </Link>
                                </div>}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // setIsDelOpen(true);
                                        }}
                                        className={`${styles.btn_accept_already} flex_align_center`}
                                        disabled
                                        style={{
                                            cursor: 'not-allowed'
                                        }}
                                    >
                                        {/* &nbsp;&nbsp;&nbsp; */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M22.418 2.61719L14.218 10.8172" stroke="#00CE2D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.418 6.78711V11.6171H18.248" stroke="#00CE2D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.418 2.61719H9.41797C4.41797 2.61719 2.41797 4.61719 2.41797 9.61719V15.6172C2.41797 20.6172 4.41797 22.6172 9.41797 22.6172H15.418C20.418 22.6172 22.418 20.6172 22.418 15.6172V13.6172" stroke="#00CE2D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Đã tiếp nhận
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            <Modal // Deny
                open={isModalDenyOpen}
                onOk={handleModalDenyOk}
                onCancel={(e) => setIsModalDenyOpen(false)}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.cancel_btn} onClick={(e) => setIsModalDenyOpen(false)}>
                            Hủy
                        </Button>
                        <Button className={modalStyles.submit_btn} onClick={handleModalDenyOk}>
                            Tiếp tục
                        </Button>
                    </div>
                }
                title={
                    <div className={modalStyles.header}>
                        Lý do từ chối
                    </div>
                }
            >
                <TextArea
                    className={modalStyles.textarea}
                    rows={4}
                    value={denyReason}
                    placeholder="Nhập lý do từ chối đề xuất"
                    onChange={(e) => setDenyReason(e.target.value)}
                />
                <div className={modalStyles.modal_text}>
                    <p className={modalStyles.warning_text}>LƯU Ý: Bạn không thể hoàn tác thao tác này</p>
                    <p>Bạn có muốn tiếp tục?</p>
                </div>
            </Modal>

            <Modal // Accept
                open={isModalAcceptOpen}
                onOk={handleModalAcceptOk}
                onCancel={(e) => setIsModalAcceptOpen(false)}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.cancel_btn} onClick={(e) => setIsModalAcceptOpen(false)}>
                            Hủy
                        </Button>
                        <Button className={modalStyles.submit_btn} onClick={handleModalAcceptOk}>
                            Tiếp tục
                        </Button>
                    </div>
                }
                title={
                    <div className={modalStyles.header}>
                        Tiếp nhận đề xuất
                    </div>
                }
            >
                <div className={modalStyles.modal_text}>
                    <p className={modalStyles.warning_text}>LƯU Ý: Bạn không thể hoàn tác thao tác này</p>
                    <p>Bạn có muốn tiếp tục?</p>
                </div>
            </Modal>

            <Modal // Modal Success
                open={isModalSuccessOpen}
                onOk={handleModalSuccessOk}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.success_btn} onClick={handleModalSuccessOk}>
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
                onOk={handleModalErrorOk}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.error_btn} onClick={handleModalErrorOk}>
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