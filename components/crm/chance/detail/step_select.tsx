import React, { useState } from "react";
import { Steps } from "antd";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import Item from "antd/es/list/Item";
import ModalUpdateResultChance from "@/components/crm/customer/chance/modal_chance/modal_update_result";
import ModalUpdateResultDefeatChance from "./modal_update_result_defeat";
import { useTrigger } from "../../context/triggerContext";
import { fetchApi } from "../../ultis/api";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import CompleteModalChance from "../modals/complete_modal";

interface StepProps {
  stages: number;
  result: number;
}

const StepSelection: React.FC<StepProps> = ({ stages, result }) => {
  const { trigger, setTrigger } = useTrigger();
  const router = useRouter();
  const { id } = router.query;
  const [openMdalSuccess, setOpenModalSuccess] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalUpdateDefeat, setOpenModalUpdateDefeat] = useState(false);
  const token = Cookies.get("token_base365");

  const fetchApiChance = async (body = {}) => {
    const data = await fetchApi(
      "http://localhost:3007/api/crm/chance/edit-chance",
      token,
      body,
      "POST"
    );
    if (data) {
      setOpenModalSuccess(true);
    }
  };

  const items = [
    {
      title: "",
      description: "Mở đầu",
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
      description: "Thành công",
      title: "",
    },
    {
      description: "Thất bại",
      // title: "wait",
    },
  ];

  const onChange = async (value: number) => {
    if (value !== 4 && value !== 5) {
      await fetchApiChance({ chance_id: id, stages: value + 1 });
      setTrigger(true);
    }
    if (value === 4) {
      setOpenModalUpdate(true);
    } else {
      if (value === 5) {
        setOpenModalUpdateDefeat(true);
      } else {
        setOpenModalSuccess(true);
      }
    }
    // setValueProccess(items[value]?.description);
  };

  return (
    <>
      <ModalUpdateResultChance
        isModalCancel={openModalUpdate}
        setIsModalCancel={setOpenModalUpdate}
      />
      <ModalUpdateResultDefeatChance
        isModalCancel={openModalUpdateDefeat}
        setIsModalCancel={setOpenModalUpdateDefeat}
      />
      {/* <ModalCompleteStep
        modal1Open={openMdalSuccess}
        setModal1Open={setOpenModalSuccess}
        title={"Cập nhật giai đoạn thành công!"}
        link={""}
      /> */}
      <CompleteModalChance
        modal1Open={openMdalSuccess}
        setModal1Open={setOpenModalSuccess}
        title={"Cập nhật giai đoạn thành công!"}
      />
      <Steps
        size="small"
        status={!result ? "process" : result === 1 ? "finish" : "error"}
        current={stages - 1}
        onChange={onChange}
        labelPlacement="vertical"
        className="site-navigation-steps"
        items={items}
      />
    </>
  );
};

export default StepSelection;
