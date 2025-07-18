import { useContext } from 'react'
import styles from './dxhd_detail_inner.module.css'
import { DxhdDetailContext } from '../dxhd_detail_context'
import { getPropOrDefault } from '../utils'
import dayjs from 'dayjs'
import { dxhd_req_status_num_to_string, dxhd_status_admin_num_to_color, dxhd_status_admin_num_to_string, dxhd_status_num_to_color, dxhd_status_num_to_string } from '../dxhd_status'

export default function DxhdDetailInfo() {
    const { dxhdDetail } = useContext(DxhdDetailContext)

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
                            <b>Trạng thái:</b>
                        </div>
                        <div
                            className={styles.row1quote_right}
                            style={{
                                color:
                                    Number(getPropOrDefault(dxhdDetail, 'status', -1)) === 5 && Number(getPropOrDefault(dxhdDetail, 'admin_accept', -1)) > 1 ?
                                        dxhd_status_admin_num_to_color(Number(getPropOrDefault(dxhdDetail, 'admin_accept', -1))) :
                                        dxhd_status_num_to_color(Number(getPropOrDefault(dxhdDetail, 'status', -1)))
                            }}
                        >
                            {
                                Number(getPropOrDefault(dxhdDetail, 'status', -1)) === 5 && Number(getPropOrDefault(dxhdDetail, 'admin_accept', -1)) > 1 ?
                                    dxhd_status_admin_num_to_string(Number(getPropOrDefault(dxhdDetail, 'admin_accept', -1))) :
                                    dxhd_status_num_to_string(Number(getPropOrDefault(dxhdDetail, 'status', -1)))
                            }
                        </div>
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className={styles.row1quote}>
                        <div className={styles.row1quote_left}>
                            <b>Kết quả:</b>
                        </div>
                        <div
                            className={styles.row1quote_right}
                            style={{
                                maxWidth: '80%'
                            }}
                        >
                            {getPropOrDefault(dxhdDetail, 'result', 'Chưa cập nhật')}
                        </div>
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