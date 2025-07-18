import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import TableDataShareCustomer from "../../table/table-setting-share-customer";
// import AddGeneralInfo from "@/components/crm/price_policy/price_policy_add_files/general_infor";
// import AddDesriptionAndSystemInfo from "@/components/crm/price_policy/price_policy_add_files/description_system_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import SalesProcessSelectBoxStep from "../sales_process_steps/select_box_step";

const ShareCustomerTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ Danh sách nhân viên");
    setShowBackButton(true);
    setCurrentPath("/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <SalesProcessSelectBoxStep />
                <TableDataShareCustomer
                  setSelected={function (value: boolean): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCustomerTable;
