import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../potential.module.css";
import PotentialSelectBox from "../potential_selectt";
import AddNewActionModal from "./add_new_potential_mdal";
import TableDataEmailMarketing from "@/components/crm/table/table-email-marketing";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const EmailModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const [isOpenAddNewOpen, setIsOpenAddNewOpen] = useState(false);
  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      <Modal
        title={"Danh sách người nhận"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        style={{ width: "auto" }}
      >
        <div>
          <div className={styles.email_select_mdal}>
            <PotentialSelectBox title="Nhà cung cấp:" value="Tất cả" />
          </div>

          <div
            style={{ marginTop: "20px" }}
            className={`${styles.main__control_btn} flex_between`}
          >
            <div className={styles.main__control_search_campaign}>
              <form onSubmit={() => false}>
                <input
                  type="text"
                  className={styles.input__search}
                  name="search"
                  defaultValue=""
                  placeholder="Tìm kiếm theo danh sách"
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
                onClick={() => setIsOpenAddNewOpen(true)}
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <img src="/crm/add.svg" />
                Thêm mới
              </button>
              {/* </Link> */}
            </div>
          </div>
          <TableDataEmailMarketing />
        </div>
      </Modal>

      <AddNewActionModal
        isModalOpen={isOpenAddNewOpen}
        setIsModalOpen={setIsOpenAddNewOpen}
      />

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Thêm tiềm năng vào danh sách nhận email thành công!"}
        link={"/potential/list"}
      />
    </>
  );
};

export default EmailModal;
