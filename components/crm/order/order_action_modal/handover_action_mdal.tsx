import React, { useEffect, useRef, useState } from "react";
import { Modal, Select } from "antd";
import styles from "../order.module.css";
import OrderSelectBoxStep from "../order_steps/select_box_step";
import ModalCompleteStep from "../order_steps/complete_modal";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record?: any;
  handleApiReq?: (type: string) => Promise<void>;
}

const HandeOverModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  handleApiReq,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const token = Cookies.get("token_base365");
  const [emp, setEmp] = useState([]);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "http://210.245.108.202:3000/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmp(dataApi?.data?.data);
  };

  useEffect(() => {
    fetchAPIEmployee();
  }, []);

  useEffect(() => {
    $(".em-select2-modal").select2();

    // $(".em-select2-modal").on("change", (e) => {
    //   const selectedValue = e.target.value;
    //   setBody((prev) => {
    //     return {
    //       ...prev,
    //       stages: Number(selectedValue),
    //     };
    //   });
    // });
  }, []);

  return (
    <>
      <Modal
        title={"Bàn giao công việc"}
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
              {"Người nhận công việc"}
            </label>
            <Select
              showSearch
              style={{ width: "100%", margin: "10px 0px" }}
              placeholder="Người thực hiện"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={
                emp
                  ? [
                      {
                        label: "Người thực hiện",
                        value: 0,
                      },
                      ...emp?.map((item) => {
                        return {
                          label: item?.userName,
                          value: item.ep_id,
                        };
                      }),
                    ]
                  : [
                      {
                        label: "Người thực hiện",
                        value: 0,
                      },
                    ]
              }
            />
          </div>
          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            <input type="checkbox" id="" name="share_all" defaultValue={1} />
            <div>
              Với danh sách liên quan (đơn hàng, báo giá, lịch hẹn, ...).
            </div>
          </div>
          <link href="path/to/select2.min.css" rel="stylesheet" />
          <script src="path/to/select2.min.js"></script>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc cho Nguyễn Văn Nam thành công!"}
        // link={"/potential/list"}
      />
    </>
  );
};

export default HandeOverModal;
