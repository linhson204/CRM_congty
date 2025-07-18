import React, { useState } from "react";
import { Tabs } from "antd";
import styles from "../quote.module.css";
const { TabPane } = Tabs;
import TableDataOrderList from "@/components/crm/table/table-order-list";
import TableDataOrderQuote from "@/components/crm/table/table-order-quote";
import TableDataQuoteQuote from "@/components/crm/table/table-quote-quote";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Danh sách báo giá" key="tab1" className={styles.tablink}>
          <div>
            <div
              style={{ marginTop: "5px" }}
              className={`${styles.main__control_btn} flex_between`}
            >
              <div className={styles.main__control_search_campaign}>
                <form onSubmit={() => false}>
                  <input
                    type="text"
                    className={styles.input__search}
                    name="search"
                    defaultValue=""
                    placeholder="Tìm kiếm theo tên khách hàng"
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
                {/* <Link href="/potential/add_file"> */}
                <button
                  type="button"
                  // onClick={() => setIsOpenAddNewOpen(true)}
                  className={`${styles.dropbtn_add} flex_align_center`}
                >
                  <img src="/crm/add.svg" />
                  Thêm mới
                </button>
                {/* </Link> */}
              </div>
            </div>
            <TableDataOrderList />
          </div>
        </TabPane>
        <TabPane tab="Báo giá" key="tab2" className={styles.tablink}>
          <div>
            {/* <div className={styles.email_select_mdal}>
            <OrderSelectBox title="Nhà cung cấp:" value="Tất cả" />
          </div> */}

            <div
              style={{ marginTop: "5px" }}
              className={`${styles.main__control_btn} flex_between`}
            >
              <div className={styles.main__control_search_campaign}>
                <form onSubmit={() => false}>
                  <input
                    type="text"
                    className={styles.input__search}
                    name="search"
                    defaultValue=""
                    placeholder="Tìm kiếm theo tên khách hàng"
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
                {/* <Link href="/potential/add_file"> */}
                <button
                  type="button"
                  // onClick={() => setIsOpenAddNewOpen(true)}
                  className={`${styles.dropbtn_add} flex_align_center`}
                >
                  <img src="/crm/add.svg" />
                  Thêm mới
                </button>
                {/* </Link> */}
              </div>
            </div>
            <TableDataQuoteQuote />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabComponent;
