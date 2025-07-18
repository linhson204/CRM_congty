import React, { useState } from "react";
import { Modal, Select } from "antd";
import { useRouter } from "next/router";
import styles from "../../product_return/product_return.module.css";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import dayjs from "dayjs";
import { TimePicker } from "antd";

const format = "HH:mm";
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  title: string;
  content: string;
}
const ScheduleModalAddOrEdit: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  title,
  content,
}) => {
  const [isMdalSucces, setIsMdalSuccess] = useState(false);
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  function handleChange() {}

  return (
    <>
      <Modal
        title={title}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div style={{ textAlign: "left" }}>
          <InputText label="Tên lịch hẹn" require={true} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "509px",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <InputText label="Ngày bắt đầu" require={true} type="date" />
            <TimePicker
              style={{ marginBottom: "1rem", height: "35px", borderRadius: 0 }}
              defaultValue={dayjs("12:08", format)}
              format={format}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "509px",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <InputText label="Ngày kết thú" require={true} type="date" />
            <TimePicker
              style={{ marginBottom: "1rem", height: "35px", borderRadius: 0 }}
              defaultValue={dayjs("12:08", format)}
              format={format}
            />
          </div>

          <label style={{ marginBottom: 0 }} className={`required`}>
            Nhân viên thực hiện
          </label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%", maxWidth: "509px", marginBottom: "1rem" }}
            placeholder="Chọn"
            onChange={handleChange}
          />
          <br />

          <InputText label="Địa điểm" placeholder="Nhập địa điểm" />

          <label style={{ marginBottom: 0 }}>Mô tả</label>
          <textarea
            style={{ maxWidth: "509px" }}
            placeholder="Nhập lý do"
            className={styles.form_control}
          />
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isMdalSucces}
        setModal1Open={setIsMdalSuccess}
        title={content}
        link={"#"}
      />
    </>
  );
};

export default ScheduleModalAddOrEdit;
