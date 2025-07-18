import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/campaign/campaign.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import CampaignFooterAddFiles from "@/components/crm/campaign/campaign_add_files/campaign_footer_add_files";
import AddGeneralInfo from "@/components/crm/bill/bill_edit_files/general_info";
import AddBonusInfo from "@/components/crm/bill/bill_edit_files/edit_bonus_infor";
import AddTable from "@/components/crm/bill/bill_edit_files/table";
import AddAddressInfo from "@/components/crm/bill/bill_edit_files/address_infor";
import AddDescriptionInfo from "@/components/crm/bill/bill_edit_files/description_infor";

import { useHeader } from "@/components/crm/hooks/useHeader";

const AddFilesPotential: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Hóa đơn/ Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/bill/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>
              Chỉnh sửa đề nghị xuất hóa đơn
            </div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <AddGeneralInfo />
                <AddBonusInfo />
                <AddTable />
                <AddAddressInfo />
                <AddDescriptionInfo />
              </div>
              <CampaignFooterAddFiles title="Chỉnh sửa Hóa đơn thành công" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFilesPotential;
