import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal_bangiao";
import { Select } from "antd";
import { base_url } from "@/components/crm/service/function";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  listNV: any;
  handover: any;
  fetchData: any;
  dataLength: any;
}

const HandeOverModalCustomer: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  listNV,
  handover,
  fetchData,
  dataLength,
}) => {
  const router = useRouter();
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>(undefined);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [errorSelectedValue, setErrorSelectedValue] = useState(false);

  const apiUrl = `${base_url}/api/crm/customerdetails/bangiao`;
  const handleOK = async () => {
    const isValidSharing = validate();
    if (isValidSharing) {
      try {
        await fetch(`${apiUrl}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emp_id: selectedItems,
            cus_id: handover,
          }),
        });
      } catch (error) {}
      setIsModalCancel(false);
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
      await fetchData();
    }
  };

  const handleCancel = () => {
    setSelectedItems(undefined);
    setIsModalCancel(false);
  };

  const validate = () => {
    if (!selectedItems) {
      setErrorSelectedValue(true);
      return false;
    } else {
      setErrorSelectedValue(false);
      return true;
    }
  };
  // const name = selectedItems?.ep_name;
  useEffect(() => {
    if (Array.isArray(listNV)) {
      const updatedOptions = [
        { value: "", label: "Chọn người bàn giao" },
        ...listNV.map((item) => {
          const name = item?.ep_name || "";
          const id = item?.ep_id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptions(updatedOptions);
    }
  }, [listNV]);

  return (
    <>
      <Modal
        title={"Bàn giao công việc"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => handleCancel()}
        className={"mdal_cancel email_add_mdal "}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Người nhận công việc"}
            </label>

            <Select
              showSearch
              placeholder="Chọn người nhận công việc"
              value={selectedItems?.ep_id}
              onChange={(value) => {
                if (value) {
                  setSelectedItems(value);
                  setErrorSelectedValue(false);
                } else {
                  setSelectedItems(undefined);
                }
              }}
              style={{ width: "100%" }}
              options={options}
              filterOption={(input, option) =>
                option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
            <div className={`error ${styles.error}`}>
              {errorSelectedValue && "Bạn chưa người nhận công việc."}
            </div>
          </div>
          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            <div>
              Chức năng này sẽ chuyển toàn bộ đối tượng (Tiềm năng, Khách hàng,
              Liên hệ) và toàn bộ công việc dở dang (Cơ hội, Báo giá, Đơn hàng,
              Hóa đơn, Trả lại hàng bán, Lịch hẹn, Lịch chăm sóc) của người bàn
              giao sang cho người được bàn giao.
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        // title={Title}
        link={"customer/list"}
      />
    </>
  );
};

export default HandeOverModalCustomer;
