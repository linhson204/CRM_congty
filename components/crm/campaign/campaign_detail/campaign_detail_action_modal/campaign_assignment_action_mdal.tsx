import React, { useEffect, useRef, useState } from "react";
import { Modal, Select } from "antd";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_step";
import ModalCompleteStep from "@/components/crm/campaign/campaign_steps/complete_modal";
import { fetchApi } from "@/components/crm/ultis/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTrigger } from "@/components/crm/context/triggerContext";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  rowSelected?: { cus_id: number }[];
}

const AssignmentModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  rowSelected,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const token = Cookies.get("token_base365");
  const { trigger, setTrigger } = useTrigger();
  const router = useRouter();
  const [emp, setEmp] = useState([]);
  const [body, setBody] = useState({ emp_id: 0 });

  const fetchAPIAssignEmployee = async (id) => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/campaign/update-assignment-campaign-cus",
      token,
      {
        ...body,
        cam_id: Number(router.query.id),
        cus_id: id,
      },
      "POST"
    );
  };

  const handleOK = async () => {
    setIsModalCancel(false);
    const apiPromises = rowSelected?.map(async (item) =>
      fetchAPIAssignEmployee(item?.cus_id)
    );
    try {
      await Promise.all(apiPromises);
      setTrigger(true);
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
    } catch (error) {
      alert("Có lỗi xảy ra trong quá trình xử lý yêu cầu API");
      console.error("Có lỗi xảy ra trong quá trình xử lý yêu cầu API", error);
    }
  };

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmp(
      dataApi?.data?.data?.map((item) => {
        return {
          label: item?.userName,
          value: item?.ep_id,
        };
      })
    );
  };

  useEffect(() => {
    fetchAPIEmployee();
  }, []);

  return (
    <>
      <Modal
        title={"Phân công thực hiện"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal} style={{ minHeight: "0px" }}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} `}>
              {"Nhân viên thực hiện"}
            </label>
            <Select
              showSearch
              optionFilterProp="children"
              className={styles.selectAntd}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              style={{ marginTop: "10px", height: "40px" }}
              placeholder="Người thực hiện: "
              value={body?.emp_id ? body?.emp_id : null}
              onChange={(value) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    emp_id: value,
                  };
                });
              }}
              options={emp ? [...emp] : []}
            />
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc thành công!"}
        link={"/"}
      />
    </>
  );
};

export default AssignmentModal;
