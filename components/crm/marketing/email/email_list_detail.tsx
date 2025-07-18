import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../../marketing/email/email.module.css";
import styles from "../../marketing/marketing.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Form } from "antd";
import Send_mail from "@/components/crm/marketing/email/modal/send_mail_modal"
import EmailFormTable from "../../table/table-marketing-send-mail-form";

const EmailPersonalTable: React.FC = () => {
    const [form] = Form.useForm();
    const [openSendMail, setOpenSendMail] = useState(false)

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


            <div className={`${styles.main__control_add}`}>
                <button
                    type="button"
                    className={`${styles.dropbtn_add} flex_align_center`}
                    onClick={() => setOpenSendMail(true)}
                >
                    <img src="/crm/add.svg" />
                    Gửi thư
                </button>
                {/* </Link> */}
            </div>


            {
                openSendMail && (<Send_mail
                    open={openSendMail}
                    setOpen={setOpenSendMail}
                    form={form}
                />)
            }

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
