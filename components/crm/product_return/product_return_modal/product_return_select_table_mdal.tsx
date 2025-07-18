import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import PotentialSelectBox from "@/components/crm/potential/potential_selectt";
import TableDataEmailMarketing from "@/components/crm/table/table-email-marketing";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import Image from "next/image";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const SelectOrederProductReturnModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      <Modal
        title={"Chọn đơn hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal product_return"}
        okText="Đồng ý"
        cancelText="Huỷ"
        style={{ width: "auto" }}
      >
        <div className={styles.producT_return_wrap}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div className={styles.date_order}>
              <div className="">Ngày đặt hàng: </div>
              <input type="date" name="start_time" id="start_time" /> -
              <input type="date" name="end_time" id="end_time" />
            </div>
            <div className={styles.email_select_mdal}>
              <PotentialSelectBox title="Trạng thái:" value="Tất cả" />
            </div>
          </div>

          <div
            style={{ marginTop: "20px" }}
            className={`${styles.main__control_btn} flex_between`}
          >
            <div
              className={styles.main__control_search_campaign}
              style={{ width: "100%" }}
            >
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
                    alt=""
                  />
                </button>
              </form>
            </div>
          </div>
          <TableDataEmailMarketing />
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Thêm tiềm năng vào danh sách nhận email thành công!"}
        link={"/potential/list"}
      />
    </>
  );
};

export default SelectOrederProductReturnModal;
