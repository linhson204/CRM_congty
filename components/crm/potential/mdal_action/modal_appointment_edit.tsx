import React, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Input, Modal, Result } from "antd";
import styles from "./index.module.css";
import { useFormData } from "../../context/formDataContext";
import { axiosQLC } from "@/utils/api/api_qlc";
import { convertTimeToDatePicker, notifyError } from "@/utils/function";
import { SelectSingleAndOption } from "@/components/commodity/select";
import { axiosCRM } from "@/utils/api/api_crm";

const ModalPotentialEditAppointment = (props: any) => {
  const { isShowModalAdd, onClose, record } = props;
  const { handleRecall } = useContext(useFormData);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(record);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [listEmp, setListEmp] = useState([]);
  useEffect(() => {
    setEditForm(record);
  }, [record._id]);
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
  const handleEditDataForm = (e: any) => {
    const { value, name } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };
  const handleEditAppointment = () => {
    axiosCRM
      .post("/potential/updateAppointment", {
        ...editForm,
        id_schedule: editForm._id,
      })
      .then((res) => {
        setOpenSuccess(true);
        handleRecall();
      })
      .catch((err) => notifyError());
  };

  const handleClose = () => {
    setOpenSuccess(false);
    onClose();
  };
  return (
    <div>
      <Modal
        width={560}
        open={isShowModalAdd}
        title={
          <div
            style={{
              background: "#4c5bd4",
              width: "110%",
              margin: "-20px -30px",
            }}
          >
            <div style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Thêm lịch hẹn
            </div>
          </div>
        }
        onOk={handleEditAppointment}
        onCancel={onClose}
        centered
        closable={true}
        footer={[
          <div
            key={"1"}
            style={{ display: "flex", justifyContent: "center", gap: 20 }}
          >
            <Button
              style={{
                width: 140,
                height: 36,
                border: "1px solid #4c5bd4",
                color: "#4c5bd4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              key="back"
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button
              key={"2"}
              style={{
                width: 140,
                height: 36,
                background: "#4c5bd4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              type="primary"
              loading={loading}
              onClick={handleEditAppointment}
            >
              Đồng ý
            </Button>
            ,
          </div>,
        ]}
      >
        <div className={styles.container}>
          <div className={styles.title}>
            Tên lịch hẹn <b>*</b>
          </div>
          <div>
            <Input
              required={true}
              width={"100%"}
              name="schedule_name"
              value={editForm.schedule_name}
              onChange={handleEditDataForm}
              placeholder={"Nhập tên lịch hẹn"}
            ></Input>
          </div>

          <div>
            <div className={styles.formdate}>
              <div>
                <div className={styles.title}>
                  Ngày bắt đầu <b>*</b>
                </div>
                <DatePicker
                  showTime
                  /* value={convertTimeToDatePicker(
                    editForm.start_date_schedule,
                    "YYYY-MM-DD HH:mm:ss"
                  )} */
                  placeholder={convertTimeToDatePicker(
                    editForm.start_date_schedule,
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  // defaultValue={defaultTimeStart}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      start_date_schedule: e.unix() * 1000,
                    })
                  }
                  className={styles.dateinput}
                />
              </div>
              <div>
                <div className={styles.title}>
                  Ngày kết thúc <b>*</b>
                </div>
                <DatePicker
                  showTime
                  className={styles.dateinput}
                  placeholder={convertTimeToDatePicker(
                    editForm.end_date_schedule,
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      end_date_schedule: e.unix() * 1000,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.title}>
            Nhân viên thực hiện <b>*</b>
          </div>
          <div>
            <SelectSingleAndOption
              data={listEmp}
              value={editForm.ep_id}
              setFormData={setEditForm}
              formData={editForm}
              name="ep_id"
              placeholder="Chọn nhân viên thực hiện"
            />
          </div>
          <div className={styles.title}>
            Địa điểm <b>*</b>
          </div>
          <div>
            <Input
              name="address"
              value={editForm.address}
              onChange={handleEditDataForm}
              width={"100%"}
              placeholder={"Nhập địa điểm"}
            ></Input>
          </div>
          <div className={styles.title}>
            Mô tả<span>*</span>
          </div>
          <div>
            <textarea
              onChange={handleEditDataForm}
              value={editForm.description}
              style={{ width: "100%", padding: 15 }}
              name="description"
              placeholder={"Nhập mô tả"}
            ></textarea>
          </div>
        </div>
      </Modal>
      <Modal
        width={500}
        open={openSuccess}
        centered
        closable={true}
        footer={[
          <div
            key={"1"}
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingLeft: 50,
            }}
          >
            <Button
              key={"2"}
              style={{
                width: "100%",
                height: 36,
                background: "#4c5bd4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              type="primary"
              loading={loading}
              onClick={handleClose}
            >
              Đóng
            </Button>
            ,
          </div>,
        ]}
      >
        {" "}
        <div></div>
        <Result status="success" title={<div>Chỉnh sửa thành công</div>} />
      </Modal>
    </div>
  );
};

export default ModalPotentialEditAppointment;
