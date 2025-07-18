import React, { useState } from "react";
import { Tabs } from "antd";
import Link from "next/link";
import styles from "../bill.module.css";
import AddBillGeneralInfo from "@/components/crm/bill/bill_detail/bill_general_infor";
import AddBillBonusInfo from "@/components/crm/bill/bill_detail/bill_bonus_infor";
import AddBillDeliveryInfo from "@/components/crm/bill/bill_detail/bill_delivery_infor";
// import AddOrderDetailStatus from "@/components/crm/order/order_detail/order_detail_status";
import AddBillDetailDiary from "@/components/crm/bill/bill_detail/bill_detail_diary";
import AddBillDetailTable from "@/components/crm/bill/bill_detail/bill_detail_table";
const { TabPane } = Tabs;
import TableDataBillOrder from "@/components/crm/table/table-bill-order";
import TableDataOrderDetailAppointment from "@/components/crm/table/table-order-detail-appointment";
import TableDataBillDetailAttach from "@/components/crm/table/table-bill-detail-attach";
import TableDataBillDetailShareList from "@/components/crm/table/table-order-detail-share-list";
import BillDetailAppointmentInputGroup from "@/components/crm/bill/bill_detail/bill_detail_appointment_input_group";
import BillOrderInputGroup from "@/components/crm/bill/bill_detail/bill_detail_order_input_group";
// import OrderDetailGivebackInputGroup from "@/components/crm/order/order_detail/order_detail_giveback_input_group";
// import TableDataOrderQuote from "@/components/crm/table/table-order-quote";
import SelectOrderDetailModal from "@/components/crm/bill/bill_detail/bill_detail_action_modal/select_order_detail_action_mdal";
import ShareActionModal from "@/components/crm/bill/bill_detail/bill_detail_action_modal/share_bill_detail_action_mdal";
import InsertFileActionModal from "@/components/crm/bill/bill_detail/bill_detail_action_modal/insert_file_bill_detail_attach_mdal";
import Image from "next/image";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isInsertFileOpen, setIsInsertFileOpen] = useState(false);

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Thông tin chi tiết" key="tab1">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.main__title}>Thông tin đơn hàng</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <AddBillGeneralInfo />
                    <AddBillBonusInfo />
                    <AddBillDetailTable />
                    <AddBillDeliveryInfo />
                  </div>
                </div>
                <div>&nbsp;</div>
                <div className={styles.main__title}>Nhật ký</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <AddBillDetailDiary />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Đơn hàng" key="tab2">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <BillOrderInputGroup />
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo số đơn hàng, người thực hiện"
                        />
                        <button className={styles.kinh_lup}>
                          <Image
                            width={20}
                            height={20}
                            className={styles.img__search}
                            src="/crm/search.svg"
                            alt="hungha365.com"
                          />
                        </button>
                      </form>
                    </div>
                    <div className={`${styles.main__control_add} flex_end`}>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsModalCancel(true);
                          }}
                          className={`${styles.dropbtn_add} flex_align_center`}
                        >
                          <i className="bi bi-check2-square"></i>
                          Chọn vào
                        </button>
                      </div>
                    </div>
                  </div>
                  <TableDataBillOrder />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Lịch hẹn" key="tab3">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <BillDetailAppointmentInputGroup />
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo tên lịch hẹn"
                        />
                        <button className={styles.kinh_lup}>
                          <Image
                            width={20}
                            height={20}
                            className={styles.img__search}
                            src="/crm/search.svg"
                            alt="kinhlup"
                          />
                        </button>
                      </form>
                    </div>
                    <div className={`${styles.main__control_add} flex_end`}>
                      <Link href="#">
                        <button
                          type="button"
                          className={`${styles.dropbtn_add} flex_align_center`}
                        >
                          <Image
                            alt="add"
                            width={13}
                            height={13}
                            src="/crm/add.svg"
                          />
                          Thêm mới
                        </button>
                      </Link>
                    </div>
                  </div>
                  <TableDataOrderDetailAppointment />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Tài liệu đính kèm" key="tab4">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    {/* <OrderDetailAppointmentInputGroup /> */}
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo tên tài liệu đính kèm"
                        />
                        <button className={styles.kinh_lup}>
                          <Image
                            width={20}
                            height={20}
                            className={styles.img__search}
                            src="/crm/search.svg"
                            alt="hungha365.com"
                          />
                        </button>
                      </form>
                    </div>
                    <div className={`${styles.main__control_add} flex_end`}>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsInsertFileOpen(true);
                          }}
                          className={`${styles.dropbtn_add} flex_align_center`}
                        >
                          <Image
                            alt="add"
                            width={13}
                            height={13}
                            src="/crm/add.svg"
                          />
                          Thêm mới
                        </button>
                      </div>
                      <InsertFileActionModal
                        isModalCancel={isInsertFileOpen}
                        setIsModalCancel={setIsInsertFileOpen}
                      />
                    </div>
                  </div>
                  <TableDataBillDetailAttach />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Danh sách chia sẻ" key="tab5">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    {/* <OrderDetailAppointmentInputGroup /> */}
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo tên đối tượng được chia sẻ"
                        />
                        <button className={styles.kinh_lup}>
                          <Image
                            width={20}
                            height={20}
                            className={styles.img__search}
                            src="/crm/search.svg"
                            alt="hungha365.com"
                          />
                        </button>
                      </form>
                    </div>
                    <div className={`${styles.main__control_add} flex_end`}>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpenShare(true);
                          }}
                          className={`${styles.dropbtn_add} flex_align_center`}
                        >
                          <Image
                            width={16}
                            height={14}
                            src="/crm/share_white.svg"
                            alt="share"
                          />
                          Chia sẻ
                        </button>
                      </div>
                    </div>
                  </div>
                  <TableDataBillDetailShareList />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>

      <SelectOrderDetailModal
        isModalCancel={isModalCancel}
        setIsModalCancel={setIsModalCancel}
        title="Chọn đơn hàng"
        // content="Hello"
      />

      <ShareActionModal
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
    </div>
  );
};

export default TabComponent;
