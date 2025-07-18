import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Link from "next/link";
import InputGroup from "./email_form_input_group";
import EmailFormTable from "../../table/table-marketing-email-form";

const EmailPersonalTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
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
          <InputGroup />
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
