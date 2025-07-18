import React, { useState } from "react";
import { Button, Divider, Input, Modal } from "antd";
import styles from "../quote.module.css";
import { useRouter } from "next/router";
// import TabOrderList from './tab_order_list';

import TableDataQuotePromotion from "@/components/crm/table/table-quote-promotion";
import TableDataQuotePromotion2 from "@/components/crm/table/table-quote-promotion2";
import FailModal from "./quote_fail_CTKM_modal";

interface MyComponentProps {
  apply2: boolean;
  setApply2: (value: boolean) => void;
  // content: string;
  title: string;
  ComBack: () => void;
}
const Apply2: React.FC<MyComponentProps> = ({
  ComBack,
  apply2,
  setApply2,
  // content = "Bạn có chắc chắn muốn hủy thêm mới đơn hàng thông tin bạn nhập sẽ không được lưu lại?",
  title = "Áp dụng cho báo giá",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setApply2(false);
    // router.push("/order/list");
  };
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <>
      <Modal
        title={title}
        centered
        open={apply2}
        footer={false}
        // onOk={() => handleOK()}
        onCancel={() => setApply2(false)}
        className={"mdal_cancel campign_mdal"}
      >
        {/* <TabOrderList /> */}
        <div
          style={{ marginTop: "5px" }}
          className={`${styles.main__control_btn} `}
        >
          <div className={styles.apply_promotion}>
            <div
              // className={styles.main__control_search_campaign}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <form onSubmit={() => false}>
                <Input
                  suffix={<img src="/crm/search.svg" alt="hungha365.com" />}
                  style={{ width: 400 }}
                  type="text"
                  className={styles.input__search}
                  name="search"
                  defaultValue=""
                  placeholder="Nhập mã khuyến mãi"
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
          </div>
          <TableDataQuotePromotion2 />

          <div
            style={{
              display: "flex",
              paddingTop: 20,
              justifyContent: "space-around",
            }}
          >
            <Button onClick={() => (ComBack(), setApply2(false))}>
              Quay lại
            </Button>
            <Button onClick={() => setApply2(false)}>Hủy</Button>
            <Button
              style={{ background: "#4C5BD4", color: "#fff" }}
              onClick={() => setIsModalCancel(true)}
            >
              Áp dụng
            </Button>
          </div>
          <FailModal
            isModalCancel={isModalCancel}
            setIsModalCancel={setIsModalCancel}
            title={title}
          />
        </div>
      </Modal>
    </>
  );
};

export default Apply2;
