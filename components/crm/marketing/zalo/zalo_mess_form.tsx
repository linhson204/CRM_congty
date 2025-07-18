import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Link from "next/link";
import InputGroup from "./zalo_mess_form_input_group";
import ZaloHistoryTable from "../../table/table-marketing-zalo-mess-form";
import ZaloAddMessPlan from "./zalo_add_mess_plan"
const ZaloPersonalTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [addMessPlan, setAddMessPlan] = useState(false);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Marketing / Zalo");
    setShowBackButton(true);
    setCurrentPath("/marketing/zalo");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <>
      <div className={style.main__setting_email}>
        <div className={style.main_setting_body}>
         
          <InputGroup  />
       <ZaloHistoryTable  setSelected={function (value: boolean): void {
              throw new Error("Function not implemented.");
            }}
            setNumberSelected={undefined}/> 
         
        </div>
      </div>
    </>
  );
};

export default ZaloPersonalTable;
