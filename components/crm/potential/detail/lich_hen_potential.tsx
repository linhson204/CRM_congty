import React, { useContext, useEffect, useState } from "react";
import styles from "@/components/crm/quote/quote.module.css";

type Props = {};
import ModalThemMoiLichhen from "@/components/crm/cskh/modal/modalthemmoilichhen";
import TableDataLichhen from "@/components/crm/table/table-lich-hen-quote";
import OrderDetailSelectBox from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select";
import { useRouter } from "next/router";
import { useFormData } from "../../context/formDataContext";
import PotentialCreateAppointment from "../mdal_action/modal_create_appointment";
import SelectSingle from "@/components/commodity/select";
import { axiosQLC } from "@/utils/api/api_qlc";
import { notifyError } from "@/utils/function";
import { LIST_APPOINTMENT_STATUS } from "@/utils/listOption";
const Lich_hen_potential = (props: Props) => {
  const router = useRouter();
  const {
    setFormData,
    handleChangeData,
    formData,
    handleRecall,
    handleChangeAndRecall,
  } = useContext(useFormData);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [isShowModalAddTL, setIsShowModalAddTL] = useState(false);
  const [isShowModalShareCS, setIsShowModalShareCS] = useState(false);
  const [listEmp, setListEmp] = useState([]);
  useEffect(() => {
    axiosQLC
      .post("/managerUser/listUser", { ep_status: "Active" })
      .then((res) => convertDataEmp(res.data.data.data))
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  }, []);
  const convertDataEmp = (datas) => {
    setListEmp(
      datas.map((item: any) => ({
        value: item.ep_id,
        label: item.userName,
      }))
    );
  };
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
    setIsShowModalAddTL(false);
    setIsShowModalShareCS(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  return (
    <div className={styles.main_importfile}>
      <div className={styles.formInfoStep}>
        <div className={styles.info_step}>
          <div className={styles.form_add_potential}>
            <div className={`${styles.main__control_btn} `}>
              <div
                style={{ display: "flex", paddingBottom: 20 }}
                className={`${styles.main__control_btn}`}
              >
                <div
                  style={{ paddingBottom: 10, width: 100 }}
                  className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
                >
                  <label htmlFor="" className="">
                    Thời gian thực hiện:
                  </label>
                  <div className={`${styles.input_item_time} flex_between`}>
                    <input
                      style={{ border: "none", marginRight: "5px" }}
                      type="date"
                      name="fromDate"
                      id="fromDate"
                      onChange={handleChangeAndRecall}
                    />
                    -
                    <input
                      type="date"
                      style={{ border: "none", marginLeft: "5px" }}
                      name="toDate"
                      id="toDate"
                      onChange={handleChangeAndRecall}
                    />
                  </div>
                </div>
                <div style={{ width: "40%" }}>
                  {" "}
                  <SelectSingle
                    onChange={handleRecall}
                    data={listEmp}
                    title="Nhân viên thực hiện:"
                    setFormData={setFormData}
                    name="ep_id"
                  />
                </div>
                <div style={{ width: "30%" }}>
                  {" "}
                  <SelectSingle
                    onChange={handleRecall}
                    data={LIST_APPOINTMENT_STATUS}
                    title="Trạng thái"
                    setFormData={setFormData}
                    name="status"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.main__control_btn} flex_between`}>
              <div className={styles.main__control_search}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRecall();
                  }}
                >
                  <input
                    type="text"
                    className={styles.input__search}
                    onChange={handleChangeData}
                    name="name"
                    defaultValue=""
                    placeholder="Tìm kiếm theo tên lịch hẹn"
                  />
                  <button onClick={handleRecall} className={styles.kinh_lup}>
                    <img
                      className={styles.img__search}
                      src="/crm/search.svg"
                      alt="hungha365.com"
                    />
                  </button>
                </form>
              </div>
              <div className={`${styles.main__control_add} flex_end`}>
                <button
                  onClick={() => setIsShowModalAdd(true)}
                  type="button"
                  className={`${styles.dropbtn_add} flex_align_center`}
                >
                  <img src="/crm/add.svg" />
                  Thêm mới
                </button>
              </div>
            </div>
            <TableDataLichhen />
            <PotentialCreateAppointment
              isShowModalAdd={isShowModalAdd}
              onClose={onClose}
              handleAddDB={handleAddDB}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lich_hen_potential;
