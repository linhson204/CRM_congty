import React, { useState } from "react";
import { Steps } from "antd";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import Item from "antd/es/list/Item";
import ModalUpdateResultChance from "../modal_chance/modal_update_result";

interface StepProps {
  setValueProccess: any;
}

const StepSelection: React.FC<StepProps> = ({ setValueProccess }) => {
  const [current, setCurrent] = useState(0);
  const [openMdalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const items = [
    {
      title: "",
      description: "Mở đầu",
    },
    {
      description: "a",
      title: "",
    },
    {
      description: "Khách hàng quan tâm",
      title: "",
    },
    {
      description: "Demo/Giới thiệu",
      title: "",
    },
    {
      description: "Đàm phán thương lượng",
      title: "",
    },
    {
      description: "Kết thúc thành công",
      title: "",
    },
    {
      description: "Kết thúc thất bại",
      // title: "wait",
    },
    {
      description: "Quy trình kiểm thử phần mềm",
      // title: "wait",
    },
  ];

  const onChange = (value: number) => {
    setCurrent(value);
    if (value === 7) {
      setOpenModalUpdate(true);
    } else {
      setOpenModalSuccess(true);
    }
    setValueProccess(items[value]?.description);
  };

  return (
    <>
      <ModalUpdateResultChance
        isModalCancel={openModalUpdate}
        setIsModalCancel={setOpenModalUpdate}
      />
      <ModalCompleteStep
        modal1Open={openMdalSuccess}
        setModal1Open={setOpenModalSuccess}
        title={"Cập nhật giai đoạn thành công!"}
        link={"#"}
      />
      <Steps
        size="small"
        current={current}
        onChange={onChange}
        labelPlacement="vertical"
        className="site-navigation-steps"
        items={items}
      />
    </>
  );
};

export default StepSelection;
