import React, { useState } from "react";
import { Modal, Select, SelectProps } from "antd";
import { useRouter } from "next/router";
import styles from "../../product_return/product_return.module.css";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import InputText from "@/components/crm/potential/potential_add_files/input_text";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const ScheduleModalComplete: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isMdalSucces, setIsMdalSuccess] = useState(false);
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  function handleChange() {}
  const options: SelectProps["options"] = [
    {
      label: "Hiii",
      value: "Hiii",
    },
    {
      label: "name",
      value: "000",
    },
  ];

  return (
    <>
      <Modal
        title={"Hoàn thành thực hiện lịch hẹn"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          <label
            style={{ marginBottom: 0 }}
            className={`${styles.label} required `}
          >
            Trạng thái
          </label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Chọn"
            onChange={handleChange}
            options={options}
          />
          <label
            style={{ marginBottom: 0, marginTop: "15px" }}
            className={`${styles.label} `}
          >
            Nội dung cuộc gọi
          </label>
          <textarea
            placeholder="Nhập nội dung cuộc gọi"
            className={styles.form_control}
          />
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isMdalSucces}
        setModal1Open={setIsMdalSuccess}
        title={"Xác nhận hoàn thành lịch hẹn ĐH-0000 thành công!"}
        link={"#"}
      />
    </>
  );
};

export default ScheduleModalComplete;
