import React, { useState, useEffect } from "react";
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
import TableDataNoteDetailList from "@/components/crm/table/table-note-customer";
import NoteDetailBtnsGroup from "@/components/crm/potential/detail/note_potential_input";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

type Props = {};

const Note_potential = (props: Props) => {
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
    <div className={styles.form_add_potential}>
      {/* Thêm mới */}
      <NoteDetailBtnsGroup  />
      <TableDataNoteDetailList />
      <ShareDSCSActionModal
        isShowModalShareCS={isShowModalShareCS}
        onClose={onClose}
      />
    </div>
  );
};
export default Note_potential;
