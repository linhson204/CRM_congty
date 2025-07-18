import { Button, Col, DatePicker, Input, Modal, Row, TimePicker } from "antd";
import axios from "axios";
import { de } from "date-fns/locale";
import jwt_decode from "jwt-decode";
import mqtt from "mqtt";
import { useEffect, useState } from "react";
const Cookies = require("js-cookie");



const ModalInfoUVien = ({ isOpenModalInfoUV, setIsOpenModalInfoUV, infoUV }) => {
  const currentCookie = Cookies.get("token_base365");
  const decodedToken: any = jwt_decode(currentCookie);

  const handleAcceptApplyNew = async () => {
    try {
      const res = await axios.post('https://api.timviec365.vn/api/timviec/admin/uv/activeUVUTS', {
        nhs_use_id: infoUV?.id_ungvien,
        nhs_new_id: infoUV?.id_tintd
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsOpenModalInfoUV(false)
      alert("Ứng viên đã được duyệt thành công!");
    } catch (error) {
      console.log("handleAcceptApplyNew ERR:", error);
    }
  }

  const handleDenyApplyNew = async () => {
    try {
      const res = await axios.post('https://api.timviec365.vn/api/timviec/admin/uv/deleteUVUTS', {
        nhs_use_id: infoUV?.id_ungvien,
        nhs_new_id: infoUV?.id_tintd
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsOpenModalInfoUV(false)
      alert("Ứng viên đã bị từ chối!");
    } catch (error) {
      console.log("handleAcceptApplyNew ERR:", error);
    }
  }

  const handleHaveJobNew = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://api.timviec365.vn/api/crm/customer/updateUngvienAICall",
        data: {
          "statusCall": 2,
          "line_kd": 0,
          "id": infoUV._id,
        },
        headers: {
          "Content-Type": "application/json",
        }
      })
      setIsOpenModalInfoUV(false)
      alert("Ứng viên đã có việc làm!");
    } catch (error) {
      console.log("handleAcceptApplyNew ERR:", error);
    }
  }
  const jobDescription = infoUV?.description_tintd ?? "Chưa cập nhật";

  return (
    <Modal
      title={<span style={{ fontSize: "30px", fontWeight: "bold" }}>AI365 kết nối tới ứng viên: {infoUV?.name_ungvien ?? "Chưa cập nhật"} đến công ty {infoUV?.name_ntd ?? "Chưa cập nhật"}</span>}
      open={isOpenModalInfoUV}
      width={1500}
      onCancel={() => {
        setIsOpenModalInfoUV(false)
      }}
      footer={null}
      centered
    >
      <div style={{
        maxHeight: "800px",
        overflowY: "auto",
        paddingRight: "8px"
      }}>
        <Row gutter={24} style={{ fontSize: "20px" }}>
          <Col span={10}>
            <h3 style={{ color: "red", fontSize: "22px" }}>Thông tin nhà tuyển dụng</h3>
            <div>
              <p>Tên NTD:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.name_ntd ?? "Chưa cập nhật"}</b></p>
              <p>Địa chỉ:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.address_tintd ?? "Chưa cập nhật"}</b></p>
              <p>Tiêu đề tin tuyển dụng:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.title_tintd ?? "Chưa cập nhật"}</b></p>
              <p>Mức lương:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px" }}>{infoUV?.salary_tintd ?? "Chưa cập nhật"}</b></p>
              <p>
                Mô tả:
                <b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>
                  <span dangerouslySetInnerHTML={{ __html: jobDescription }} />
                </b>
              </p>
              <p>Link NTD:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.link_ntd ?? "Chưa cập nhật"}</b></p>
              <p>Id tin:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.id_tintd ?? "Chưa cập nhật"}</b></p>
              <p>Id:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.id_ntd ?? "Chưa cập nhật"}</b></p>
            </div>
          </Col>

          <Col span={14}>
            <h3 style={{ color: "red", fontSize: "22px" }}>Thông tin ứng viên</h3>
            <p>Họ tên:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.name_ungvien ?? "Chưa cập nhật"}</b></p>
            <p>Công việc:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.title_ungvien ?? "Chưa cập nhật"}</b></p>
            <p>Tuổi:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.age_ungvien ?? "Chưa cập nhật"}</b></p>
            <p>Kinh nghiệm:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.exp_ungvien ?? "Chưa cập nhật"}</b></p>
            <p>Địa chỉ:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.address_ungvien ?? "Chưa cập nhật"}</b></p>
            <p>Số điện thoại:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.phone_ungvien ?? "Chưa cập nhật"}</b></p>
            <p>Gmail:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.email_ungvien ?? "Chưa cập nhật"}</b></p>
            <p>Id:<b style={{ color: "#1E40AF", marginLeft: "4px", fontSize: "18px", }}>{infoUV?.id_ungvien ?? "Chưa cập nhật"}</b></p>
          </Col>
        </Row>

        <Row justify="center" gutter={16} style={{ marginTop: 16 }}>
          <Col>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "red", borderColor: "red" }}
              onClick={handleDenyApplyNew}
            >
              Từ chối
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "green", borderColor: "green" }}
              onClick={handleAcceptApplyNew}
            >
              Duyệt
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "grey", borderColor: "grey" }}
              onClick={handleHaveJobNew}
            >
              Đã có việc làm
            </Button>
          </Col>

        </Row>
      </div>


    </Modal>
  );
};

export default ModalInfoUVien;
