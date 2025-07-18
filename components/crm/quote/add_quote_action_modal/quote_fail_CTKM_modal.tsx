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
const FailModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  // content = "Bạn có chắc chắn muốn hủy thêm mới đơn hàng thông tin bạn nhập sẽ không được lưu lại?",
  title = "Áp dụng cho báo giá",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    // router.push("/order/list");
  };
  const ComBack = () => {
    setIsModalCancel(true);
  };
  const [apply2, setApply2] = useState(false);
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        width={300}
        title={title}
        centered
        onCancel={() => setIsModalCancel(false)}
        open={isModalCancel}
        className={"mdal_cancel campign_mdal"}
        footer={false}
      >
        {/* <TabOrderList /> */}
        <div>Không có chương trình khuyến mại phù hợp</div>
        <div>
          <img
            width={300}
            height={300}
            src="https://www.asteriscoit.com/wp-content/uploads/2021/07/No-data-pana.png"
            alt="hungha365.com"
          />
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 20,
            justifyContent: "space-around",
            alignItems: "end",
          }}
        >
          <Button onClick={() => setIsModalCancel(false)}>Quay lại</Button>
          <Button onClick={() => setIsModalCancel(false)}>Hủy</Button>
          <Button
            style={{ background: "#4C5BD4", color: "#fff" }}
            onClick={() => setIsModalCancel(false)}
          >
            Tiếp theo
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FailModal;
