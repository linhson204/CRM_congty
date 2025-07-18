import React, { useState } from "react";
import { Button, Divider, Input, Modal } from "antd";
import styles from "../quote.module.css";
import { useRouter } from "next/router";
// import TabOrderList from './tab_order_list';

import TableDataQuotePromotion from "@/components/crm/table/table-quote-promotion";
import Apply2 from "./quote_apply2";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  // content: string;
  title: string;
}
const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  title = "Áp dụng cho hàng hóa",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
  };
  const ComBack = () => {
    setIsModalCancel(true);
  };
  const [apply2, setApply2] = useState(false);
  return (
    <>
      <Apply2
        apply2={apply2}
        ComBack={ComBack}
        setApply2={setApply2}
        title="Áp dụng cho đơn hàng"
        // content="Hello"
      />
      <Modal
        title={title}
        centered
        open={isModalCancel}
        onOk={() => (setApply2(true), setIsModalCancel(false))}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal"}
        okText={"Tiếp theo"}
      >
        {/* <TabOrderList /> */}
        <div
          style={{ marginTop: "5px" }}
          className={`${styles.main__control_btn} `}
        >
          <div className={styles.apply_promotion}>
            <div
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
          <TableDataQuotePromotion />
          <TableDataQuotePromotion />
        </div>
      </Modal>
    </>
  );
};

export default CancelModal;
