import React, { Dispatch, useRef, useState } from "react";
import { Modal, Select, SelectProps } from "antd";
import styles from "../../../potential/potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import CompleteModalChance from "@/components/crm/chance/modals/complete_modal";
import { number } from "yup";
import { fetchApi } from "@/components/crm/ultis/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTrigger } from "@/components/crm/context/triggerContext";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
 
}

const ModalUpdateResultChance: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { setTrigger } = useTrigger();
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [formData, setFormData] = useState({
    total_money: "",
    reason: [],
    expected_end_date: 0,
  });
  const token = Cookies.get("token_base365");
  const listReasons = [
    { value: 1, label: "Giá cả và chính sách bán hàng tốt" },
    { value: 2, label: "Dịch vụ chăm sóc khách hàng của công ty tốt" },
    { value: 3, label: "Tin tưởng thương hiệu của công ty" },
    { value: 4, label: "Khả năng thuyết phục khách hàng của NVKD tốt" },
    { value: 5, label: "Sản phẩm đáp ứng yêu cầu của khách hàng" },
  ];

  function padZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  function getCurrentDate() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDate = `${padZero(day)}/${padZero(month)}/${padZero(year)}`;

    return formattedDate;
  }

  function stringToDate(dateString) {
    const timestamp = new Date(dateString).getTime();

    return timestamp;
  }

  const handleChange = (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        reason: value,
      };
    });
  };

  const fetchEditChance = async (body = {}) => {
    try {
      const dataApi = await fetchApi(
        "http://localhost:3007/api/crm/chance/edit-chance",
        token,
        // { chance_id: id, result: value + 1 },
        body,
        "POST"
      );
      setTrigger(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOK = async () => {
    if ( formData?.reason?.length > 0) {
      setIsModalCancel(false);
      await fetchEditChance({
        chance_id: Number(id),
        total_money: Number(formData?.total_money),
        result: 1,
        expected_end_date: stringToDate(getCurrentDate()),
        reason: formData?.reason,
      });
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <>
      <Modal
        title={"Cập nhật kết quả"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          {/* <div className={styles.choose_obj}>
            <InputText
              label="Số tiền"
              require={true}
              type="number"
              keyValue="total_money"
              setFormData={setFormData}
              value={formData?.total_money}
            />
          </div> */}

          <div className={styles.choose_obj}>
            <InputText
              label="Giai đoạn"
              placeholder="Kết thúc thành công"
              bonus="disabled"
            />
          </div>

          <div className={styles.choose_obj}>
            <div>
              <InputText
                label="Ngày kỳ vọng/kết thúc"
                require={true}
                placeholder={getCurrentDate()}
                bonus="disabled"
              />
            </div>
          </div>

          <div className={styles.choose_obj}>
            <div className={`${styles.form_label} required`}>
              {"Lý do thắng"}
            </div>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "98.1%", maxWidth: "509px", marginLeft: "10px" }}
              placeholder="Please select"
              onChange={handleChange}
              options={listReasons}
            />
          </div>
        </div>
      </Modal>
      {/* <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Cập nhật giai đoạn thành công!"}
        link={""}
      /> */}

      <CompleteModalChance
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Cập nhật giai đoạn thành công!"}
      />
    </>
  );
};

export default ModalUpdateResultChance;
