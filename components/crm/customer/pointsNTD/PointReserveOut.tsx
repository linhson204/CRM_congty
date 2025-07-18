import React, {  useEffect } from "react";
import style from "../../marketing/email/email.module.css";

import { useHeader } from "@/components/crm/hooks/useHeader";


import PointReserveOut from "../../table/table_customer_point_reserve_out";

const EmailPersonalTable: React.FC = () => {
    const {
        setHeaderTitle,
    }: any = useHeader();





    useEffect(() => {
        setHeaderTitle("Điểm Nhà tuyển dụng");
    }, [setHeaderTitle]);

    return (
        <>
            <div className={style.main__setting_email}>
                <div className={style.main_setting_body}>
                    <PointReserveOut
                        setSelected={function (value: boolean): void {
                            throw new Error("Function not implemented.");
                        }}
                        setNumberSelected={undefined}
                    />
                </div>
            </div>
        </>
    );
};

export default EmailPersonalTable;
