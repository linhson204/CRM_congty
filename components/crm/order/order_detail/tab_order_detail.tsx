import React, { useState } from "react";
import { Tabs } from "antd";
import Link from "next/link";
import styles from "../order.module.css";
import AddOrderDetailInfo from "@/components/crm/order/order_detail/order_detail_info";
import AddOrderDetailStatus from "@/components/crm/order/order_detail/order_detail_status";
import AddOrderDetailDiary from "@/components/crm/order/order_detail/order_detail_diary";
import AddOrderDetailTable from "@/components/crm/order/order_detail/order_detail_table";
const { TabPane } = Tabs;
import TableDataOrderDetailContact from "@/components/crm/table/table-order-detail-contact";
import TableDataOrderDetailBill from "@/components/crm/table/table-order-detail-bill";
import TableDataOrderDetailAppointment from "@/components/crm/table/table-order-detail-appointment";
import TableDataOrderDetailGiveback from "@/components/crm/table/table-order-detail-giveback";
import TableDataOrderDetailAttach from "@/components/crm/table/table-order-detail-attach";
import TableDataOrderDetailShareList from "@/components/crm/table/table-order-detail-share-list";
import OrderDetailBillInputGroup from "@/components/crm/order/order_detail/order_detail_bill_input_group";
import OrderDetailAppointmentInputGroup from "@/components/crm/order/order_detail/order_detail_appointment_input_group";
import OrderDetailGivebackInputGroup from "@/components/crm/order/order_detail/order_detail_giveback_input_group";
// import TableDataOrderQuote from "@/components/crm/table/table-order-quote";
import OrderApplyModal from "@/components/crm/order/order_detail/order_detail_action_modal/contact_order_detail_action_mdal";
import ShareActionModal from "@/components/crm/order/order_detail/order_detail_action_modal/share_order_detail_action_mdal";
import InsertFileActionModal from "@/components/crm/order/order_detail/order_detail_action_modal/insert_file_order_detail_attach_mdal";

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
                    <AddOrderDetailInfo />
                    <AddOrderDetailTable />
                    <AddOrderDetailStatus />
                  </div>
                </div>
                <div>&nbsp;</div>
                <div className={styles.main__title}>Nhật ký</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <AddOrderDetailDiary />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Liên hệ" key="tab2">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo tên người liên hệ"
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
                  <TableDataOrderDetailContact />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Hóa đơn" key="tab3">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <OrderDetailBillInputGroup />
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo số đề nghị"
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
                      <Link href="#">
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
                  <TableDataOrderDetailBill />
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
                    <OrderDetailAppointmentInputGroup />
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
                          <img
                            className={styles.img__search}
                            src="/crm/search.svg"
                            alt="hungha365.com"
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
                          <img src="/crm/add.svg" />
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
        <TabPane tab="Trả lại hàng bán" key="tab5">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <OrderDetailGivebackInputGroup />
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo số đề nghị"
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
                      <Link href="#">
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
                  <TableDataOrderDetailGiveback />
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
                          <img
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
                          <img src="/crm/add.svg" />
                          Thêm mới
                        </button>
                      </div>
                      <InsertFileActionModal
                        isModalCancel={isInsertFileOpen}
                        setIsModalCancel={setIsInsertFileOpen}
                      />
                    </div>
                  </div>
                  <TableDataOrderDetailAttach />
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
                          <img
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
                          <img src="/crm/share_white.svg" />
                          Chia sẻ
                        </button>
                      </div>
                    </div>
                  </div>
                  <TableDataOrderDetailShareList />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>

      <OrderApplyModal
        isModalCancel={isModalCancel}
        setIsModalCancel={setIsModalCancel}
        title="Áp dụng cho hàng hóa"
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
