import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../../marketing/email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";

import EmailFormTable from "../../table/table-marketing-statistic-mail-form";

const EmailPersonalTable: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [checkFile, setCheckFile] = useState(false);
    const { isOpen } = useContext<any>(SidebarContext);
    const [openSendMail, setOpenSendMail] = useState(false)
    const imgRef = useRef<HTMLInputElement>(null);
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();

    useEffect(() => {
        setHeaderTitle("Marketing/ Email");
        setShowBackButton(true);
        setCurrentPath("/marketing/email");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    return (
        <>


            <div className={style.main__setting_email}>
                <div className={style.main_setting_body}>
                    <EmailFormTable
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
