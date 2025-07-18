import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "@/components/crm/campaign/campaign.module.css";
import { useRouter } from "next/router";
import OrderSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_step";
import ModalCompleteStep from "@/components/crm/campaign/campaign_steps/complete_modal";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import { axiosQLC } from "@/utils/api/api_qlc";
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const ShareActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [label, setLabel] = useState("");
  const [listOption, setListOption] = useState([]);
  const [elements, setElements] = useState<any>([]);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [listEmpApi, setListEmpApi] = useState([]);
  const [listDepApi, setListDepApi] = useState([]);
  const [arrEmp, setArrEmp] = useState([]);
  const [loadSelect, setLoadSelect] = useState(false);
  const [arrDep, setArrDep] = useState([]);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    console.log(arrDep);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };
  useEffect(() => {
    axiosQLC
      .post("/department/list", {})
      .then((res) => {
        let data = res?.data?.data?.items;
        setListDepApi(
          data?.map((dep, index) => ({
            value: dep.dep_id,
            label: dep.dep_name,
          }))
        );
      })
      .catch((err) => console.log("error"));
    axiosQLC
      .post("/managerUser/listUser", {})
      .then((res) => {
        let data = res?.data?.data?.data;
        setListEmpApi(
          data?.map((emp, index) => ({
            value: emp.ep_id,
            label: emp.userName,
          }))
        );
        // setArrEmp(res.data.data.data);
      })
      .catch((err) => console.log("error>>", err));
  }, []);

  useEffect(() => {
    $(".js-example-basic-single").select2();
    $(".js-example-basic-single").on("change", (e) => {
      const selectedValue = e.target.value;
      setArrDep([...arrDep, selectedValue]);
      // setBody((prev) => {
      //   return {
      //     ...prev,
      //     status: Number(selectedValue),
      //   };
      // });
    });
  }, [loadSelect]);

  const handleAddElement = (condition: string) => {
    // const newElement = (
    //   <div className={styles.content_obj} key={label}>
    //     <div className={styles.choose_obj}>
    //       <label className={`${styles.form_label} required`}>{condition}</label>
    //       {/* <OrderSelectBoxStep
    //         value="Tất cả phòng ban"
    //         placeholder="Chọn phòng ban"
    //       /> */}
    //       <div className={`${styles.main__control_select} flex_align_center`}>
    //         <div className={`${styles.main__control_select} flex_align_center`}>
    //           <select
    //             className="js-example-basic-single"
    //             name="state"
    //             // Chọn nhân viên
    //           >
    //             {condition == "Phòng ban được chia sẻ" ? (
    //               <>
    //                 <option value={0}>Chọn phòng ban</option>
    //                 {listDepApi?.map((item, i) => (
    //                   <option key={i} value={item.value}>
    //                     {item?.label}
    //                   </option>
    //                 ))}
    //               </>
    //             ) : (
    //               <>
    //                 <option value={0}>Chọn nhân viên</option>
    //                 {listEmpApi?.map((item, i) => (
    //                   <option key={i} value={item.value}>
    //                     {item?.label}
    //                   </option>
    //                 ))}
    //               </>
    //             )}
    //           </select>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={styles.choose_obj}>
    //       <label className={`${styles.form_label} required`}>
    //         Quyền sử dụng
    //       </label>
    //       <OrderSelectBoxStep value="Tất cả phòng ban" placeholder="Chọn" />
    //     </div>
    //   </div>
    // );

    if (label === condition) {
      if (condition === "Phòng ban được chia sẻ") {
        setListOption((prevList) => [
          ...prevList,
          { dep_id: null, role: null },
        ]);
      } else {
        setListOption((prevList) => [
          ...prevList,
          { emp_id: null, role: null },
        ]);
      }
    } else {
      if (condition === "Phòng ban được chia sẻ") {
        setListOption([{ dep_id: null, role: null }]);
      } else {
        setListOption([{ emp_id: null, role: null }]);
      }
      // setElements([newElement]);
      //   console.log("shit",elements)
      //  let el= [];
      //   el.push(newElement)
      //   setElements(el)
      // setElements([newElement]);
    }
  };
  console.log("checkkkk listOption", listOption);
  return (
    <>
      <Modal
        title={"Chia sẻ đơn hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.btn_share}>
            <button
              onClick={() => {
                setLoadSelect(!loadSelect);
                handleAddElement("Phòng ban được chia sẻ");
                setLabel("Phòng ban được chia sẻ");
              }}
              className={`${styles.department} ${styles.btn_obj}`}
            >
              Phòng ban
            </button>
            <button
              onClick={() => {
                setLoadSelect(!loadSelect);
                handleAddElement("Nhân viên được chia sẻ");
                setLabel("Nhân viên được chia sẻ");
              }}
              className={`${styles.employ} ${styles.btn_obj}`}
            >
              Nhân viên
            </button>
          </div>
          {listOption?.map((item) => (
            <div className={styles.content_obj} key={label}>
              <div className={styles.choose_obj}>
                <label className={`${styles.form_label} required`}>
                  {label}
                </label>
                {/* <OrderSelectBoxStep
                value="Tất cả phòng ban"
                placeholder="Chọn phòng ban"
              /> */}
                <div
                  className={`${styles.main__control_select} flex_align_center`}
                >
                  <div
                    className={`${styles.main__control_select} flex_align_center`}
                  >
                    <select
                      // className="js-example-basic-single"
                      name="state"
                      // Chọn nhân viên
                    >
                      {label == "Phòng ban được chia sẻ" ? (
                        <>
                          <option value={0}>Chọn phòng ban</option>
                          {listDepApi?.map((item, i) => (
                            <option key={i} value={item.value}>
                              {item?.label}
                            </option>
                          ))}
                        </>
                      ) : (
                        <>
                          <option value={0}>Chọn nhân viên</option>
                          {listEmpApi?.map((item, i) => (
                            <option key={i} value={item.value}>
                              {item?.label}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.choose_obj}>
                <label className={`${styles.form_label} required`}>
                  Quyền sử dụng
                </label>
                <OrderSelectBoxStep
                  value="Tất cả phòng ban"
                  placeholder="Chọn"
                />
              </div>
            </div>
          ))}
          {/* <div>{isOpenSelect && elements}</div> */}
          <div className={`${styles.mb_3} ${styles["col-lg-12"]}`}>
            <input type="checkbox" id="" name="share_all" defaultValue={1} />
            <div>
              Với danh sách liên quan (đơn hàng, báo giá, lịch hẹn, ...).
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Chia sẻ chiến dịch thành công!"}
        link={"#"}
      />
    </>
  );
};

export default ShareActionModal;
