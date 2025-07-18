import React, { useState } from "react";
import { Modal } from "antd";
import styles from "@/components/crm/bill/bill.module.css";
import { useRouter } from "next/router";
// import TabOrderList from './tab_order_list';
import TableDataBillOrderSelect from "@/components/crm/table/table-bill-order-select";
import BillDetailSelectBox from "@/components/crm/bill/bill_detail/bill_detail_action_modal/bill_detail_select";
import Image from "next/image";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  // content: string;
  title: string;
}

const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  // content = "Bạn có chắc chắn muốn hủy thêm mới đơn hàng thông tin bạn nhập sẽ không được lưu lại?",
  title = "Chọn liên hệ",
}) => {
  const router = useRouter();
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const handleOK = () => {
    setIsModalCancel(false);
    // router.push("/order/list");
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div
          style={{ marginTop: "5px" }}
          className={`${styles.main__control_btn} flex_between`}
        >
          <div className={`${styles.main__control_select} flex_align_center`}>
            <div
              className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
            >
              <label htmlFor="" className="">
                Ngày đặt:
              </label>
              <div className={`${styles.input_item_time} flex_between`}>
                <input type="date" name="" id="start_time" /> -
                <input type="date" name="" id="end_time" />
              </div>
            </div>

            <BillDetailSelectBox title="Tình trạng:" value="Tất cả" />
          </div>
          <div className={`${styles.main__control_search_campaign} `}>
            <form onSubmit={() => false}>
              <input
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên khách hàng"
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
        </div>
        {
          <TableDataBillOrderSelect
            setSelected={setIsSelectedRow}
            setNumberSelected={setNumberSelected}
          />
        }
      </Modal>
    </>
  );
};

export default CancelModal;
