import React, { useContext, useEffect, useState } from "react";
import styles from "../../potential/potential2.module.css";
import Link from "next/link";
import PotentialSelectBox from "@/components/crm/potential/potential_selectt";
import HandeOverModal from "@/components/crm/potential/potential_action_modal/hand_over_mdal";
import NoteModalAddOrEdit from "@/components/crm/customer/note/note_mdal_add";
import { Modal } from "antd";
import { MTextArea } from "@/components/commodity/input";
import { useRouter } from "next/router";
import { notifyError, notifyWarning } from "@/utils/function";
import { axiosCRM } from "@/utils/api/api_crm";
import { MModalCompleteStep } from "@/components/commodity/modal";
import { useFormData } from "../../context/formDataContext";
import { axiosQLC } from "@/utils/api/api_qlc";
import SelectSingle from "@/components/commodity/select";

interface TypeAddNote {
  cus_id: any;
  content: string;
}
export default function NoteDetailBtnsGroup() {
  const { formData, setFormData, handleChangeData, handleRecall } =
    useContext(useFormData);
  useEffect(() => {
    setFormData({ ...formData, page: 1, pageSize: 10 });
  }, []);
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
  const [listEmp, setListEmp] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [formAdd, setFormAdd] = useState<TypeAddNote>({
    cus_id: id,
    content: "",
  });
  const handleAddNote = () => {
    if (!formAdd?.content) {
      notifyWarning("Vui lòng nhập ghi chú");
      return;
    } else {
      axiosCRM
        .post("/potential/createNoteForPotential", formAdd)
        .then((res) => {
          setFormAdd({ ...formAdd, content: "" });
          setIsOpen(false);
          setIsOpenSuccess(true);
        })
        .catch((err) => notifyError("Vui lồng thử lại sau"));
    }
  };
  const handleChangeSearch = async (e) => {
    e.preventDefault();
    e && (await handleChangeData(e));
    e && (await handleRecall());
  };
  console.log("form", formData);
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div
          style={{
            // height: "40px",
            minWidth: "300px",
          }}
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian thực hiện
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input
              type="date"
              onChange={(e) => handleChangeSearch(e)}
              name="fromDate"
              id="start_time"
            />
          </div>
          -
          <div className={`${styles.input_item_time} flex_between`}>
            <input
              type="date"
              onChange={(e) => handleChangeSearch(e)}
              name="toDate"
              id="start_time"
            />
          </div>
        </div>
        <SelectSingle
          title="Người tạo"
          data={listEmp}
          name="emp_id"
          setFormData={setFormData}
        />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={handleChangeSearch}>
            <input
              value={formData.emp_name}
              style={{ height: "46px" }}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, emp_name: e.target.value })
              }
              className={styles.input__search}
              name="emp_name"
              defaultValue=""
              placeholder="Tìm kiếm theo tên nguời ghi chú"
            />
            <button onClick={handleChangeSearch} className={styles.kinh_lup}>
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
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </button>
        </div>
      </div>
      <Modal
        title={"Thêm ghi chú"}
        centered
        open={isOpen}
        onOk={handleAddNote}
        onCancel={() => setIsOpen(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          <MTextArea
            value={formAdd.content}
            setFormData={setFormAdd}
            name="content"
            label="Ghi chú"
            placeholder="Nhập ghi chú"
          />
        </div>
      </Modal>
      <MModalCompleteStep
        handleUpdate={() =>
          setFormData({ ...formData, recall: !formData.recall })
        }
        title="Thêm mới ghi chú thành công"
        modal1Open={isOpenSuccess}
        setModal1Open={setIsOpenSuccess}
      />
    </div>
  );
}
