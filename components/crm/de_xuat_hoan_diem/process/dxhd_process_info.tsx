import { useContext, useEffect, useState } from 'react'
import styles from './dxhd_process_info.module.css'
import { getPropOrDefault } from '../utils'
import dayjs from 'dayjs'
import { dxhd_req_status_num_to_string, dxhd_status_num_to_color, dxhd_status_num_to_string, isAccepted } from '../dxhd_status'
import { useRouter } from 'next/router'
import { useFormData } from '../../context/formDataContext'
import { DxhdDetailContext } from '../dxhd_detail_context'

export default function DxhdProcessInfo() {
    const { dxhdDetail, setGetData } = useContext(DxhdDetailContext)
    const { formData, setFormData } = useContext(useFormData)
    const [getDataAfterId, setGetDataAfterId] = useState(false)

    const router = useRouter();
    const { id } = router.query

    useEffect(() => {
        setFormData((prev) => ({ ...prev, id: id }))
        id && setGetDataAfterId(true)
    }, [id])

    useEffect(() => {
        if (getDataAfterId) {
            setGetData(true)
            setGetDataAfterId(false)
        }
    }, [formData, getDataAfterId])

    // Check tiếp nhận 
    useEffect(() => {
        const status = getPropOrDefault(dxhdDetail, 'status', -1)
        if (status !== -1 && id) {
            if (!isAccepted(status)) {
                alert('Đề xuất chưa được tiếp nhận')
                router.push(`/de-xuat-hoan-diem/detail/${id}`)
            }
        }
    }, [dxhdDetail, id])

    return (
        <div>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={styles.row1quote}>
                        <div className={styles.row1quote_left}>
                            <b>Tên đề xuất:</b>
                        </div>
                        <div className={styles.row1quote_right}>{getPropOrDefault(dxhdDetail, 'title', "Chưa cập nhật")}</div>
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className={styles.row1quote}>
                        <div className={styles.row1quote_left}>
                            <b>Ngày tạo:</b>
                        </div>

                        <div className={styles.row1quote_right}>{dayjs(getPropOrDefault(dxhdDetail, 'created_at', '')).format('DD/MM/YYYY')}</div>
                    </div>
                </div>
                <div style={{ display: "flex", marginTop: -10 }}>
                    <div className={styles.full_width_div}>
                        <span></span>
                    </div>     <div className={styles.full_width_div}>
                        <span></span>
                    </div>
                </div>



                <div className={styles.row}>
                    <div className={styles.row1quote}>
                        <div className={styles.row1quote_left}>
                            <b>Mã đề xuất:</b>
                        </div>
                        <div className={styles.row1quote_right}>{getPropOrDefault(dxhdDetail, 'id', 'Chưa cập nhật')}</div>
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className={styles.row1quote}>
                        <div className={styles.row1quote_left}>
                            <b>Nhà tuyển dụng:</b>
                        </div>
                        <div className={styles.row1quote_right}>{`${getPropOrDefault(dxhdDetail, 'ntd.id', 0)} - ${getPropOrDefault(dxhdDetail, 'ntd.name', 'Chưa cập nhật')}`}</div>
                    </div>
                </div>
                <div style={{ display: "flex", marginTop: -10 }}>
                    <div className={styles.full_width_div}>
                        <span></span>
                    </div>     <div className={styles.full_width_div}>
                        <span></span>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.row1quote}>
                        <div className={styles.row1quote_left}>
                            <b>Ghi chú:</b>
                        </div>
                        <div
                            className={styles.row1quote_right}
                            style={{
                                maxWidth: '90%'
                            }}
                        >
                            {getPropOrDefault(dxhdDetail, 'note', '')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}