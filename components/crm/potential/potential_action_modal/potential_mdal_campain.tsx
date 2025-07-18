import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../potential.module.css";
import TableDataCampaignPopup from "@/components/crm/table/table-campaign-popup";
import Link from "next/link";
import ModalCompleteStep from "../potential_steps/complete_modal";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  setSelected: any;
  setNumberSelected: any;
}
const CanmpaignModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  setSelected,
  setNumberSelected,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Chọn chiến dịch"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          <div className={`${styles.main__control_btn} flex_between`}>
            <div className={styles.main__control_search_campaign}>
              <form onSubmit={() => false}>
                <input
                  type="text"
                  className={styles.input__search}
                  name="search"
                  defaultValue=""
                  placeholder="Tìm kiếm theo tên tiềm năng"
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
              <Link href="/campaign/add">
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
          <TableDataCampaignPopup
            setSelected={setSelected}
            setNumberSelected={setNumberSelected}
          />
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Thêm khách hàng vào chiến dịch thành công!"}
        link={"/potential/list"}
      />
    </>
  );
};

export default CanmpaignModal;
