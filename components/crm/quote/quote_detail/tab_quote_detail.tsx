import React, { useContext, useEffect, useState } from "react";
import { Button, Tabs } from "antd";
import Link from "next/link";
import styles from "../quote.module.css";
import AddQuoteDetailTable from "@/components/crm/quote/quote_detail/quote_detail_table";
const { TabPane } = Tabs;
import TableDataQuoteDetailBill from "@/components/crm/table/table-quote-detail-bill";
import QuoteDetailBillInputGroup from "@/components/crm/quote/quote_detail/quote_detail_bill_input_group";
import AddQuoteDetailInfo from "@/components/crm/quote/quote_detail/quote_detail_diary";
import AddQuoteDetailStatus from "./quote_detail_status";
import ModalThemMoiLichhen from "@/components/crm/cskh/modal/modalthemmoilichhen";
import TableDataLichhen from "@/components/crm/table/table-quote-lich-hen-quote";
import OrderDetailSelectBox from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_select";
import ModalAddTL from "../quote_action_modal/m-dal-themmoi-tailieudinhkem";
import TableAddTLDK from "@/components/crm/table/table-quote-tailieudinhkem";
// import TableTLChiaSe from "@/components/crm/table/table-DSchia-se";
import ShareDSCSActionModal from "../quote_action_modal/share_dsChiaSe.mdal";
import Form_quote_detail from "../form_quote/form_quote-detail";
import { useFormData } from "../../context/formDataContext";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { QuoteContext } from "../quoteContext";
import AppointEmpDetailSelectBox from "./tab_detail/appointment_emp_detail_select";
import AppointmentDetailSelectBox from "./tab_detail/appointment_detail_select";
import ShareActionModal from "../quote_action_modal/share_action_mdal";
import TableTLChiaSe from "../../table/table-quote-DSchia-se";
const TabComponent = () => {
  const { detailData, recordId } = useContext(QuoteContext)
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [isShowModalAddTL, setIsShowModalAddTL] = useState(false);
  const [isShowModalShareCS, setIsShowModalShareCS] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { handleRecall } = useContext(useFormData)

  // Quote file
  const [quoteFileNameInput, setQuoteFileNameInput] = useState('')
  const [quoteFileName, setQuoteFileName] = useState('')
  const handleSearchQuoteFile = (e) => {
    e.preventDefault()
    setQuoteFileName(quoteFileNameInput)
    handleRecall()
  }
  useEffect(() => {
    handleRecall()
  }, [quoteFileName])

  // Order
  const [orderKeywordInput, setOrderKeywordInput] = useState('')
  const [orderKeyword, setOrderKeyword] = useState('')
  const [orderDate, setOrderDate] = useState<null | Date>(null)
  const [orderStatus, setOrderStatus] = useState(0)
  const handleSearchOrder = (e) => {
    e.preventDefault()
    setOrderKeyword(orderKeywordInput)
    handleRecall()
  }
  useEffect(() => {
    handleRecall()
  }, [orderDate, orderStatus, orderKeyword])

  // Appointment
  const [appointFromDate, setAppointFromDate] = useState<null | Date>(null)
  const [appointToDate, setAppointToDate] = useState<null | Date>(null)
  const [appointEmpId, setAppointEmpId] = useState(0)
  const [appointStatus, setAppointStatus] = useState(0)
  const [appointKeyword, setAppointKeyword] = useState('')
  const [appointKeywordInput, setAppointKeywordInput] = useState('')
  const [appointCusId, setAppointCusId] = useState(0)
  const handleSearchAppoint = (e) => {
    e.preventDefault()
    setAppointKeyword(appointKeywordInput)
    handleRecall()
  }
  useEffect(() => {
    handleRecall()
  }, [appointFromDate, appointToDate, appointEmpId, appointStatus, appointCusId, appointKeyword])
  useEffect(() => {
    detailData &&
      detailData.hasOwnProperty('customer_id') &&
      detailData.customer_id &&
      Number(detailData.customer_id) &&
      setAppointCusId(Number(detailData.customer_id))
  }, [detailData])

  // Share
  const [roleUserKeyword, setRoleUserKeyword] = useState('')
  const [shouldGetRole, setShouldGetRole] = useState(false)
  const handleSearchRole = (e) => {
    e.preventDefault()
    setShouldGetRole(true)
  }
  useEffect(() => {
    // Nếu đóng modal chia sẻ, refresh
    if (!isShowModalShareCS) {
      setShouldGetRole(true)
    }
  }, [isShowModalShareCS])


  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
    setIsShowModalAddTL(false);
    setIsShowModalShareCS(false);
    handleRecall();
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  return (
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Thông tin chi tiết" key="tab1">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      paddingBottom: 20,
                    }}
                  >
                    <Button>
                      <Link
                        href={`/quote/form_quote/list_form_quote/${id}`}
                        style={{ display: "flex" }}
                      >
                        <div>
                          <img
                            src="/crm/change_quote.svg"
                            alt="hungha365.com"
                          />
                        </div>
                        <div>Đổi mẫu</div>
                      </Link>
                    </Button>
                  </div>
                  <div className={styles.main__body}>
                    {/* <AddQuoteDetailTable /> */}
                    <Form_quote_detail />
                  </div>
                  <div className={styles.main__body}>
                    <AddQuoteDetailStatus />
                  </div>
                </div>
                <div>&nbsp;</div>
                <div className={styles.main__title}>Nhật ký</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <AddQuoteDetailInfo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>

        <TabPane tab="Đơn hàng" key="tab3">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div
                    style={{ display: "flex", paddingBottom: 20 }}
                    className={`${styles.main__control_btn}`}
                  >
                    <div
                      style={{ paddingBottom: 10, width: 100 }}
                      className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
                    >
                      <label htmlFor="" className="">
                        Ngày hóa đơn:
                      </label>
                      <div className={`${styles.input_item_time} flex_between`}>
                        <input
                          type="date"
                          name=""
                          id="start_time"
                          value={orderDate ? dayjs(orderDate).format('YYYY-MM-DD') : ''}
                          onChange={(e) => setOrderDate(e.target.valueAsDate)}
                        />
                      </div>
                    </div>
                    <OrderDetailSelectBox
                      title="Tình trạng:"
                      value="Tất cả"
                      setValue={setOrderStatus}
                      num={orderStatus}
                    />
                  </div>

                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={handleSearchOrder}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="searchOrder"
                          value={orderKeywordInput}
                          onChange={(e) => setOrderKeywordInput(e.target.value)}
                          placeholder="Tìm kiếm theo số đơn hàng, người thực hiện"
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
                      <Link href="/order/add">
                        <button
                          type="button"
                          className={`${styles.dropbtn_add} flex_align_center`}
                        >
                          <img src="/crm/add.svg" />
                          Thêm mới
                        </button>
                      </Link>
                    </div>
                  </div>
                  <TableDataQuoteDetailBill
                    keyword={orderKeyword}
                    date={orderDate}
                    status={orderStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Lịch hẹn" key="tab4">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <div
                      style={{ display: "flex", paddingBottom: 20 }}
                      className={`${styles.main__control_btn}`}
                    >
                      <div
                        style={{ paddingBottom: 10, width: 100 }}
                        className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
                      >
                        <label htmlFor="" className="">
                          Thời gian thực hiện:
                        </label>
                        <div
                          className={`${styles.input_item_time} flex_between`}
                        >
                          <input
                            type="date"
                            name=""
                            id="start_time"
                            value={appointFromDate ? dayjs(appointFromDate).format('YYYY-MM-DD') : ''}
                            onChange={(e) => setAppointFromDate(e.target.valueAsDate)}
                          />-
                          <input
                            type="date"
                            name=""
                            id="end_time"
                            value={appointToDate ? dayjs(appointToDate).format('YYYY-MM-DD') : ''}
                            onChange={(e) => setAppointToDate(e.target.valueAsDate)}
                          />
                        </div>
                      </div>
                      <AppointEmpDetailSelectBox
                        title="Nhân viên thực hiện:"
                        value="Tất cả"
                        setValue={setAppointEmpId}
                        num={appointEmpId}
                      />

                      <AppointmentDetailSelectBox
                        title="Tình trạng:"
                        value="Tất cả"
                        setValue={setAppointStatus}
                        num={appointStatus}
                      />
                    </div>
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={handleSearchAppoint}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="searchAppoint"
                          placeholder="Tìm kiếm theo tên lịch hẹn"
                          value={appointKeywordInput}
                          onChange={(e) => setAppointKeywordInput(e.target.value)}
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
                        onClick={() => setIsShowModalAdd(true)}
                        type="button"
                        className={`${styles.dropbtn_add} flex_align_center`}
                      >
                        <img src="/crm/add.svg" />
                        Thêm mới
                      </button>
                    </div>
                  </div>
                  <TableDataLichhen
                    fromDate={appointFromDate}
                    toDate={appointToDate}
                    cus_id={appointCusId}
                    emp_id={appointEmpId}
                    status={appointStatus}
                    keyword={appointKeyword}
                  />
                  <ModalThemMoiLichhen
                    isShowModalAdd={isShowModalAdd}
                    onClose={onClose}
                    handleAddDB={handleAddDB}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Tài liệu đính kèm" key="tab6">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}></div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={handleSearchQuoteFile}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="searchFile"
                          // defaultValue=""
                          value={quoteFileNameInput}
                          onChange={(e) => setQuoteFileNameInput(e.target.value)}
                          placeholder="Tìm kiếm theo tên tài liệu đính kèm"
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
                        onClick={() => setIsShowModalAddTL(true)}
                        type="button"
                        className={`${styles.dropbtn_add} flex_align_center`}
                      >
                        <img src="/crm/add.svg" />
                        Thêm mới
                      </button>
                    </div>
                  </div>
                  <TableAddTLDK keyword={quoteFileName} />
                  <ModalAddTL
                    isShowModalAddTL={isShowModalAddTL}
                    onClose={onClose}
                    handleAddDB={handleAddDB}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Danh sách chia sẻ" key="tab7">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}></div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={handleSearchRole}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="searchRole"
                          // defaultValue=""
                          placeholder="Tìm kiếm tên người được chia sẻ"
                          value={roleUserKeyword}
                          onChange={(e) => setRoleUserKeyword(e.target.value)}
                        />
                        <button
                          className={styles.kinh_lup}
                          onClick={handleSearchRole}
                        >
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
                  <TableTLChiaSe
                    keyword={roleUserKeyword}
                    shouldFetch={shouldGetRole}
                    setShouldFetch={setShouldGetRole}
                  />
                  {/* <ShareDSCSActionModal
                    isShowModalShareCS={isShowModalShareCS}
                    onClose={onClose}
                  /> */}
                  <ShareActionModal
                    isModalCancel={isShowModalShareCS}
                    setIsModalCancel={setIsShowModalShareCS}
                    record={recordId}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabComponent;
