import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "@/components/crm/order/order.module.css";
import { useRouter } from "next/router";
import OrderSelectBox from "@/components/crm/order/order_selectt";
// import TabOrderList from './tab_order_list';
import TableDataOrderDetailContactSelect from "@/components/crm/table/table-order-detail-contact-select";

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
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
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
        {/* <TabOrderList /> */}
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
        {
          <TableDataOrderDetailContactSelect
            setSelected={setIsSelectedRow}
            setNumberSelected={setNumberSelected}
          />
        }
      </Modal>
    </>
  );
};

export default CancelModal;
