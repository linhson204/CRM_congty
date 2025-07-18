import { Button, Dropdown, Image, MenuProps, Modal, Input, List } from "antd";
import { DxhdReqAction } from "./dxhd_process_action";
import { MouseEvent, useContext, useState } from "react";
import { isAccepted, isReqAccepted } from "../dxhd_status";
import modalStyles from './dxhd_process_modal.module.css'
import Link from "next/link";
import { DxhdDetailContext } from "../dxhd_detail_context";
import { useFormData } from "../../context/formDataContext";
import { getPropOrDefault } from "../utils";
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const { TextArea } = Input

const fakeData = [
    {
        dxhd_id: 1
    },
    {
        dxhd_id: 2
    },
]

const fakeDiary = [
    {
        key: 1,
        action: 'Từ chối',
        user: 'Trần Chuyên Viên (1)',
        created_at: '20/12/2023 - 07:05:06'
    },
    {
        key: 2,
        action: 'Từ chối',
        user: 'Trần Chuyên Viên (1)',
        created_at: '20/12/2023 - 07:05:06'
    },
    {
        key: 3,
        action: 'duyệt',
        user: 'Trần Chuyên Viên (1)',
        created_at: '20/12/2023 - 07:05:06'
    },
]

interface DataType {
    key: React.Key,
    action: string,
    user: string
    created_at: string
}

export default function DxhdProcessActionDropdown({ id, status, link, handleReqAdd, handleReqRemove }) {
    const { axiosTimViecAdminCall, dxhdDetail } = useContext(DxhdDetailContext)
    const { formData } = useContext(useFormData)
    const [isModalReasonOpen, setIsModalReasonOpen] = useState(false)
    const [isModalAlreadyAcceptOpen, setIsModalAlreadyAcceptOpen] = useState(false)
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false)
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false)
    const [isAcceptModal, setIsAcceptModal] = useState(false)
    // const { id, status, link, handleReqAdd, handleReqRemove } = props
    const router = useRouter()
    const { id: dxhd_id } = router.query

    const [reason, setReason] = useState('')
    const [foundDxhd, setFoundDxhd] = useState([])
    const [diary, setDiary] = useState([])

    // axiosTimViecAdminCall.interceptors.request.use((config: any) => {
    //     let accessToken = Cookies.get("token_base365");
    //     return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
    // });

    const handleClickAction = async (e, type: string) => {
        if (type === 'info') {
            const ntd_id = getPropOrDefault(dxhdDetail, 'ntd.id', 0)
            await axiosTimViecAdminCall
                .post('/getSupporterDxhdList', {
                    link: link,
                    ntd_id: ntd_id
                })
                .then(res => {
                    const listDx = getPropOrDefault(res, 'data.data.data.list', [])
                    if (listDx.length > 0) {
                        setFoundDxhd(listDx
                            .filter(dx => `${dx.id}` !== dxhd_id)
                            .map(dx => ({
                            dxhd_id: dx.id
                        })))
                    } else {
                        setFoundDxhd([])
                    }
                })
                .catch(e => console.log(e))
            // setFoundDxhd(fakeData)
            setDiary(fakeDiary)
            setIsModalInfoOpen(true)
            return
        }
        const checkAccepted = isAlreadyAcceptAndSave()
        if (checkAccepted) {
            setIsModalAlreadyAcceptOpen(true)
            return
        }

        if (type === 'accept') {
            setIsAcceptModal(true)
            setIsModalReasonOpen(true)
        }
        if (type === 'deny') {
            setIsAcceptModal(false)
            setIsModalReasonOpen(true)
        }
        if (type === 'cancel') {
            setIsModalCancelOpen(true)
        }
    }

    const isAlreadyAcceptAndSave = () => {
        // check status
        // if status already accepted then true
        // else false
        const list_req = getPropOrDefault(dxhdDetail, 'req', [])
        if (list_req.length > 0) {
            const index = list_req.findIndex(req => Number(req.id) === Number(id))
            if (index > -1) {
                if (list_req[index].status === 1) {
                    return false
                }
            }
        }
        return true

        // test
        // return isReqAccepted(Number(status))
    }

    const handleAccept = () => {
        handleReqAdd(id, 3, reason)
        setReason('')
        setIsModalReasonOpen(false)
    }

    const handleDeny = () => {
        handleReqAdd(id, 2, reason)
        setReason('')
        setIsModalReasonOpen(false)
    }

    const handleCancel = () => {
        handleReqRemove(id)
        setIsModalCancelOpen(false)
    }

    const items: MenuProps["items"] = []
    for (let i = 0; i < DxhdReqAction.length; i++) {
        const element = DxhdReqAction[i];
        items.push({
            key: i,
            label: (
                <>
                    <button
                        className="flex-start-btn"
                        onClick={(e) => handleClickAction(e, element.type)}
                    >
                        <i className={element.img}></i>
                        {element.name}
                    </button>
                </>
            )
        })
    }

    return (
        <>
            <div>
                <Dropdown menu={{ items }} trigger={["click"]}>
                    <button style={{ justifyContent: "center" }}>
                        <Image src="/crm/3_cham.png" width={15} height={15} preview={false} />
                        Thao tác
                    </button>
                </Dropdown>
            </div>

            <Modal // Reason
                open={isModalReasonOpen}
                onOk={isAcceptModal ? handleAccept : handleDeny}
                onCancel={(e) => setIsModalReasonOpen(false)}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.cancel_btn} onClick={(e) => { setReason(''); setIsModalReasonOpen(false) }}>
                            Hủy
                        </Button>
                        <Button className={modalStyles.submit_btn} onClick={(e) => { isAcceptModal && handleAccept(); !isAcceptModal && handleDeny() }}>
                            Tiếp tục
                        </Button>
                    </div>
                }
                title={
                    <div className={modalStyles.header}>
                        {`Lý do ${isAcceptModal ? 'duyệt' : 'từ chối'} yêu cầu`}
                    </div>
                }
            >
                <TextArea
                    className={modalStyles.textarea}
                    rows={4}
                    value={reason}
                    placeholder={`Nhập lý do ${isAcceptModal ? 'duyệt' : 'từ chối'} đề xuất`}
                    onChange={(e) => setReason(e.target.value)}
                />
            </Modal>

            <Modal // Already accepted
                open={isModalAlreadyAcceptOpen}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.submit_btn} onClick={(e) => setIsModalAlreadyAcceptOpen(false)}>
                            Đóng
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
                    <p>Yêu cầu này đã được xử lý</p>
                    <p>Bạn không thể thay đổi yêu cầu đã xử lý</p>
                </div>
            </Modal>

            <Modal // Cancel
                open={isModalCancelOpen}
                onOk={handleCancel}
                onCancel={(e) => setIsModalCancelOpen(false)}
                className={modalStyles.modal}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.cancel_btn} onClick={(e) => { setReason(''); setIsModalCancelOpen(false) }}>
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
                    <p>Nếu bạn hủy duyệt, dữ liệu bạn đã nhập sẽ mất</p>
                    <p>Bạn có chắc chắn muốn hủy duyệt?</p>
                </div>
            </Modal>

            <Modal
                open={isModalInfoOpen}
                onOk={(e) => setIsModalInfoOpen(false)}
                footer={
                    <div className={modalStyles.modal_btn}>
                        <Button className={modalStyles.submit_btn} onClick={(e) => setIsModalInfoOpen(false)}>
                            Đóng
                        </Button>
                    </div>
                }
                title={
                    <div className={modalStyles.header}>
                        Thông tin hệ thống
                    </div>
                }
            >
                {foundDxhd.length > 0 ? (
                    <div
                        className={modalStyles.modal_text}
                        style={{
                            textAlign: 'start'
                        }}
                    >
                        <p>{'NTD đã đề xuất link ứng viên này đã có ở đề xuất: '}
                            {foundDxhd.map((dx, index) => (
                                <>
                                    <Link
                                        href={`/de-xuat-hoan-diem/detail/${dx.dxhd_id}`}
                                        target="_blank"
                                    >
                                        {`#${dx.dxhd_id}`}
                                    </Link>
                                    {index < foundDxhd.length - 1 && <span>, </span>}
                                </>
                            ))}
                        </p>
                    </div>
                ) : (
                    <div
                        className={modalStyles.modal_text}
                    >
                        <p>Không có</p>
                    </div>
                )}
            </Modal>
        </>
    )
}


// export default DxhdProcessActionDropdown