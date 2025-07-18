import React, { useRef, useState } from "react";
import { Input, Modal } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import { MModalCompleteStep } from "@/components/commodity/modal";
import { SelectSingleAndOption } from "@/components/commodity/select";
import { LIST_APPOINTMENT_STATUS_COMPLETE } from "@/utils/listOption";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  formData: any;
  setFormData: any;
  handleComplete: any;
}

const ModalCompleteAppointment: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  formData,
  setFormData,
  handleComplete,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    handleComplete() != false &&
      (setIsModalCancel(false),
      setIsOpenMdalSuccess(true),
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000));
  };

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
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Trạng thái"}
            </label>
            <SelectSingleAndOption
              value={formData?.status}
              name="status"
              data={LIST_APPOINTMENT_STATUS_COMPLETE}
              setFormData={setFormData}
              formData={formData}
              placeholder="Chọn"
            />
          </div>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Nội dung lịch hẹn"}
            </label>
            <textarea
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              value={formData?.content}
              style={{ width: "100%", padding: 10 }}
              placeholder="Nhập nội dung lịch hẹn"
            ></textarea>
          </div>
        </div>
      </Modal>
      <MModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={`Cập nhật tình trạng lịch hẹn thành công`}
      />
    </>
  );
};

export default ModalCompleteAppointment;
