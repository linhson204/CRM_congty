// import OrderSelectBoxStep from "../order_steps/select_box_step";
import { useContext, useEffect, useState } from "react";
import styles from "./quote_detail.module.css";
// import InputText from "./input_text";
import { Input, Spin, Tooltip } from 'antd';
import { QuoteContext } from "../quoteContext";
import useLoading from "../../hooks/useLoading";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import dayjs from "dayjs";

export default function AddQuoteDetailInfo() {
    const { recordId, setRecordId, getPropOrDefault, shouldFetchDetailData, setShouldFetchDetailData } = useContext(QuoteContext)
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [shouldFetchHistory, setShouldFetchHistory] = useState(false);
    const [apiData, setApiData] = useState<any>([])
    const [data, setData] = useState<any>([])

    const convertData = () => {
        if (apiData.length > 0) {
            setData(apiData.map((item) => ({
                key: getPropOrDefault(item, '_id'),
                userName: getPropOrDefault(item, 'user_id.userName', 'Không tên'),
                modify_at: getPropOrDefault(item, 'modify_at'),
                action: getPropOrDefault(item, 'action')
            })))
        } else {
            setData([])
        }
    }

    useEffect(() => {
        if (shouldFetchDetailData) {
            startLoading();
            setShouldFetchHistory(true)
        }
    }, [shouldFetchDetailData])

    useEffect(() => {
        if (shouldFetchHistory && Number(recordId) && Number(recordId) !== 0) {
            axiosCRMCall
                .post('/quote/getQuoteHistory', { quote_id: Number(recordId) })
                .then((res) => {
                    res?.data?.data?.data ?
                        setApiData(res?.data?.data?.data) :
                        setApiData([])
                })
            setShouldFetchHistory(false)
            // setShouldFetchDetailData(false)
        }
    }, [shouldFetchHistory, shouldFetchDetailData])

    useEffect(() => {
        startLoading();
        convertData()
        stopLoading();
    }, [apiData])

    return (
        <>
            {isLoading ? (
                <Spin
                    style={{
                        margin: "auto",
                        width: "100%",
                        display: "block",
                        padding: "5px",
                        height: "100%",
                    }}
                />
            ) : (<div>

                <div className={styles.main__content__body}>
                    <div className={`${styles.main_content_nhatky} ${styles.row1}`}>
                        <div className={`${styles["col-lg-12"]} ${styles.content_nhatky}`}>
                            {
                                data.map((item) => (
                                    <div className={`${styles.main__body__item_nhatky}`} key={item.key}>
                                        <div className={`${styles.main__body__item__title_nhatky}`}><b>{dayjs(item.modify_at).format('HH:mm - DD/MM/YYYY')}</b></div>
                                        <div className={`${styles.main__body__item__value_nhatky}`}>{item.action + ' bởi ' + item.userName}</div>
                                    </div>
                                ))
                            }
                            {/* <div className={`${styles.main__body__item_nhatky}`}>
                                <div className={`${styles.main__body__item__title_nhatky}`}><b>10:10 - 10/10/2020</b></div>
                                <div className={`${styles.main__body__item__value_nhatky}`}>Nhóm khách hàng được cập nhật bởi Nguyễn Văn Nam</div>
                            </div> */}

                        </div>

                    </div>
                </div>

            </div>)}
        </>
    );
}
