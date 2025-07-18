import { useContext, useEffect, useState } from "react";
// import { SelectSingleTitleV2, SelectSingleV2 } from "../../input_select/select"
import { dxhd_status, dxhd_status_admin_available, dxhd_status_available } from "../dxhd_status"
import styles from "./dxhd_list.module.css"
import { useFormData } from "../../context/formDataContext";
import { InputSearchV2 } from "../../input_select/input";
import { DxhdDetailContext } from "../dxhd_detail_context";
import Cookies from "js-cookie";
import axios from "axios";
import { getPropOrDefault } from "../utils";
import { SelectSingleTitleV2 } from "./dxhd_status-dropdown";

export default function DxhdInputGroup() {
    const { setFormData, formData, handleChange, handleChangeAndRecall, handleRecall } = useContext(useFormData);
    const { axiosTimViecAdminCall } = useContext(DxhdDetailContext)
    const [isAdmin, setIsAdmin] = useState(0)

    // axiosTimViecAdminCall.interceptors.request.use((config: any) => {
    //     let accessToken = Cookies.get("token_base365");
    //     return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
    // });

    useEffect(() => {
        axiosTimViecAdminCall
        .post('/checkSupportAdmin')
        .then(res => {
            const isAdminData = getPropOrDefault(res, 'data.data.data.isAdmin', 0)
            // console.log(res)
            setIsAdmin(isAdminData)
        })
        .catch(e => console.log(e))
    }, [])

    return (
        <div className={styles.main__control}>
            <div className={`${styles.main__control_select} flex_align_center`}>
                <div className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}>
                    <label htmlFor="" className="">
                        Ngày tạo đề xuất:
                    </label>
                    <div className={`${styles.input_item_time} flex_between`}>
                        <input
                            type="date"
                            name="startDate"
                            id="start_time"
                            onChange={handleChangeAndRecall}
                        />
                        -
                        <input
                            type="date"
                            name="endDate"
                            id="end_time"
                            onChange={handleChangeAndRecall}
                        />
                    </div>

                </div>
                <SelectSingleTitleV2
                    title="Trạng thái"
                    data={isAdmin ? dxhd_status_admin_available() : dxhd_status_available()}
                    name="status"
                    onChange={handleRecall}
                />
            </div>

            <div className={`${styles.main__control_select} flex_align_center`}>
                <InputSearchV2
                    name={"keyword"}
                    placeholder={"Tìm kiếm theo mã đề xuất, tên đề xuất, hoặc tên NTD"}
                    onSubmit={true}
                />
            </div>
        </div>
    )
}