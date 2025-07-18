import React, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, Input, Modal, Result } from "antd";
import styles from "./index.module.css";
import { useFormData } from "../../context/formDataContext";
import { axiosQLC } from "@/utils/api/api_qlc";
import { convertTimeToDatePicker, notifyError } from "@/utils/function";
import { SelectSingleAndOption } from "@/components/commodity/select";
import { axiosCRM } from "@/utils/api/api_crm";
import { MInputText } from "@/components/commodity/input";
import { useRouter } from "next/router";

const PotentialCreateAppointment = (props: any) => {
  const { isShowModalAdd, onClose } = props;
  const router = useRouter();
  const { id } = router.query;
  const [formAddData, setFormAddData] = useState<any>({});
  const { formData, handleChangeData, handleRecall } = useContext(useFormData);
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [listEmp, setListEmp] = useState([]);
  useEffect(() => {
    axiosQLC
      .post("/managerUser/listUser", { ep_status: "Active" })
      .then((res) => convertDataEmp(res.data.data.data))
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  }, []);
  useEffect(() => {
    setFormAddData({
      schedule_name: "",
      ep_id: null,
      address: "",
      start_date_schedule: null,
      end_date_schedule: null,
      description: "",
    });
  }, [formData.recall]);
  const convertDataEmp = (datas) => {
    setListEmp(
      datas.map((item: any) => ({
        value: item.ep_id,
        label: item.userName,
      }))
    );
  };

  const handleCreateAppointment = () => {
    axiosCRM
      .post("/potential/createAppointment", { ...formAddData, cus_id: id })
      .then((res) => {
        setOpenSuccess(true);

        // setFormAddData({ recall: !formAddData.recall });
        handleRecall();
      })
      .catch((err) => notifyError());
  };

  const handleClose = () => {
    setOpenSuccess(false);
    onClose();
  };
  console.log("CHeck", formAddData);
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
        onOk={handleCreateAppointment}
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
              onClick={handleCreateAppointment}
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
            <MInputText
              required={true}
              width={"100%"}
              name="schedule_name"
              value={formAddData.schedule_name}
              setFormData={setFormAddData}
              placeholder={"Nhập tên lịch hẹn"}
            />
          </div>

          <div>
            <div className={styles.formdate}>
              <div>
                <div className={styles.title}>
                  Ngày bắt đầu <b>*</b>
                </div>
                <MInputText
                  type="datetime-local"
                  value={convertTimeToDatePicker(
                    formAddData.start_date_schedule,
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  setFormData={setFormAddData}
                  name="start_date_schedule"
                />
              </div>
              <div>
                <div className={styles.title}>
                  Ngày kết thúc <b>*</b>
                </div>
                <MInputText
                  type="datetime-local"
                  value={convertTimeToDatePicker(
                    formAddData.end_date_schedule,
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  setFormData={setFormAddData}
                  name="end_date_schedule"
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
              value={formAddData.ep_id}
              setFormData={setFormAddData}
              formData={formAddData}
              name="ep_id"
              placeholder="Chọn nhân viên thực hiện"
            />
          </div>
          <div className={styles.title}>
            Địa điểm <b>*</b>
          </div>
          <div>
            <MInputText
              name="address"
              value={formAddData.address}
              setFormData={setFormAddData}
              placeholder={"Nhập địa điểm"}
            />
          </div>
          <div className={styles.title}>
            Mô tả<span>*</span>
          </div>
          <div>
            <textarea
              onChange={(e) =>
                setFormAddData({
                  ...formAddData,
                  [e.target.name]: e.target.value,
                })
              }
              value={formAddData.description}
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
        <Result status="success" title={<div>Thêm mới thành công</div>} />
      </Modal>
    </div>
  );
};

export default PotentialCreateAppointment;
