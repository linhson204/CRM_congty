import React, { useState } from "react";
import { Button, Tabs } from "antd";
import Link from "next/link";
import styles from "@/components/crm/quote/quote.module.css";
import AddQuoteDetailTable from "@/components/crm/quote/quote_detail/quote_detail_table";
const { TabPane } = Tabs;
import TableDataQuoteDetailBill from "@/components/crm/table/table-quote-detail-bill";
import QuoteDetailBillInputGroup from "@/components/crm/quote/quote_detail/quote_detail_bill_input_group";
import AddQuoteDetailInfo from "@/components/crm/quote/quote_detail/quote_detail_diary";
import ModalThemMoiLichhen from "@/components/crm/cskh/modal/modalthemmoilichhen";
import TableDataLichhen from "@/components/crm/table/table-lich-hen-quote";
import OrderDetailSelectBox from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_select";
import ModalAddTL from "@/components/crm/quote/quote_action_modal/m-dal-themmoi-tailieudinhkem";
import TableAddTLDK from "@/components/crm/table/table-tailieudinhkem";
import TableTLChiaSe from "@/components/crm/table/table-DSchia-se";
import ShareDSCSActionModal from "@/components/crm/quote/quote_action_modal/share_dsChiaSe.mdal";

type Props = {};

const Danh_sach_chia_se_Po = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [isShowModalAddTL, setIsShowModalAddTL] = useState(false);
  const [isShowModalShareCS, setIsShowModalShareCS] = useState(false);

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
    setIsShowModalAddTL(false);
    setIsShowModalShareCS(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  return (
    <div className={styles.main_importfile}>
      <div className={styles.formInfoStep}>
        <div className={styles.info_step}>
          <div className={styles.form_add_potential}>
            <div className={`${styles.main__control_btn} `}></div>
            <div className={`${styles.main__control_btn} flex_between`}>
              <div className={styles.main__control_search}>
                <form onSubmit={() => false}>
                  <input
                    type="text"
                    className={styles.input__search}
                    name="search"
                    defaultValue=""
                    placeholder="Tìm kiếm theo đối tượng được chia sẻ"
                  />
                  <button className={styles.kinh_lup}>
                    <img
                      className={styles.img__search}
                      src="/crm/search.svg"
                      alt="hungha365.com"
                    />
                  </button>
                </form>
              </div>
              <div className={`${styles.main__control_add} flex_end`}>
                <button
                  onClick={() => setIsShowModalShareCS(true)}
                  type="button"
                  className={`${styles.dropbtn_add} flex_align_center`}
                >
                  <img src="/crm/share_white.svg" />
                  Chia sẻ
                </button>
              </div>
            </div>
            <TableTLChiaSe />
            <ShareDSCSActionModal
              isShowModalShareCS={isShowModalShareCS}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Danh_sach_chia_se_Po;
