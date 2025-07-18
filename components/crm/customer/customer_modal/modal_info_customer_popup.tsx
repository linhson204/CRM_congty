import { Button, Col, DatePicker, Input, Modal, Row, TimePicker } from "antd";
import axios from "axios";
import { de } from "date-fns/locale";
import jwt_decode from "jwt-decode";
import mqtt from "mqtt";
import { useEffect, useState } from "react";
const Cookies = require("js-cookie");



const ModalInfoCustomer = ({ isOpenModalInfoNTD, setIsOpenModalInfoNTD, infoNTD, linekd}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [client, setClient] = useState<any>(null);
  const currentCookie = Cookies.get("token_base365");
  const decodedToken: any = jwt_decode(currentCookie);
  const [key, setKey] = useState<any>('');
  const [inCalling, setInCalling] = useState(false);

  const [note, setNote] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  useEffect(() => {
    const protocol = 'wss'
    const host = 'ht.timviec365.vn'
    const port = '8084'
    const clientId = `mqttx_${Math.random().toString(16).slice(3)}`
    const connectUrl = `${protocol}://${host}:${port}/mqtt`


    const mqttClient = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: 'root',
      password: '123123a',
      reconnectPeriod: 1000
    })

    mqttClient.on('connect', () => {
      console.log('Connected to broker');
      mqttClient.subscribe("test")
    });

    // Log khi có lỗi xảy ra
    mqttClient.on('error', (error) => {
      console.error('Error:', error);
    });

    mqttClient.subscribe("handle_call")

    setClient(mqttClient);
    setKey(`${decodedToken?.data?._id}${new Date().getTime()}${Math.floor(Math.random() * 999999)}`)
    return () => {
      mqttClient.end();
    };
  }, [])

  useEffect(() => {
    if (client && isOpenModalInfoNTD )  {
      call();
    }
  }, [client,isOpenModalInfoNTD]);


  const call = async () => {
    if (client) {
      console.log("client", client);
      console.log("key", key);
      console.log("infoNTD?.phone_number", infoNTD?.phone_number);
      console.log("kdinfo?.extension_number", linekd);

      client.publish("handle_call", `start;${infoNTD?.phone_number};${linekd};${decodedToken?.data?._id};${key};${decodedToken?.data?.userName};${infoNTD?._id}`)

      client.on('message', async (topic, data) => {
        if (topic == "handle_call" && data.toString().split(';')[1] == decodedToken?.data?._id && data.toString().split(';')[2] == key) {
          const dataArr = data.toString().split(';');
          console.log("DATAHEHREHEHHE", topic, data)
          if (dataArr[0] == "begin") {
            console.log("start call");
            setInCalling(true);
            
          }
          if (dataArr[0] == "end") {
            console.log("end call");
            setInCalling(false);
            setIsOpenModalInfoNTD(false)
          }
          if (dataArr[0] == "reject") {
            console.log("reject call");
            setInCalling(false);
            setIsOpenModalInfoNTD(false)
          }
          if (dataArr[0] == "success") {
            console.log("TOTAL CALL", dataArr[3]);
            setIsOpenModalInfoNTD(false)
            setInCalling(false);
            if (parseInt(dataArr[3], 10) < 20) {
              await handleChangeToGroupKNN();
            }
          }
        };
      });
    }
  }

  const handleChangeToGroupKNN = async () => {
    const url = "https://api.timviec365.vn/api/crm/customerdetails/updateCustomerAfterPopup";
    const formData = new FormData();

    if (decodedToken?.data?.idQLC == 22495550) {
      formData.append("group_id", "448");
    } else {
      formData.append("group_id", "498");
    }
    formData.append("content_call", note);
    formData.append("cus_id", infoNTD?.cus_id);


    const headers = {
      Authorization: `Bearer ${Cookies.get("token_base365")}`,
    };

    const config = {
      method: "POST",
      headers: headers,
      body: formData,
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="AI365 kết nối tới khách hàng"
      open={isOpenModalInfoNTD}
      width={800}
      onCancel={() => {
        handleChangeToGroupKNN();
        setIsOpenModalInfoNTD(false)
        setInCalling(false)
      }}
      footer={null}
      centered
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginBottom: "12px" }}>
        <h2 style={{ color: "#1E40AF" }}>{infoNTD?.name ?? "Chưa cập nhật"}</h2>
        <h4>
          {infoNTD?.link && (
            <a
              href={infoNTD.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1E40AF", textDecoration: "underline" }}
            >
              Xem trang công ty
            </a>
          )}
        </h4>
      </div>
      <Row gutter={24}>

      <Col span={10}>
          <h3 style={{ color: "red" }}>AI365 Gợi ý tư vấn</h3>
          <p>Em chào a/c công ty <b style={{ color: "#1E40AF", marginLeft: "2px", marginRight: "2px" }}>{infoNTD?.name ?? "Chưa cập nhật"}</b>,
            em được biết bên mình đang tuyển dụng <b style={{ color: "#1E40AF", marginLeft: "2px", marginRight: "2px" }}>{infoNTD?.new_title ?? "Chưa cập nhật"}</b>
            tại <b style={{ color: "#1E40AF", marginLeft: "2px", marginRight: "2px" }}>{infoNTD?.new_addr ?? "Chưa cập nhật"}</b>,
            không biết bên mình cần tuyển bao nhiêu để em hỗ trợ mình luôn ạ.
          </p>
          <h4 style={{ color: "#1E40AF" }}>Chuyên viên tư vấn nên thực hiện các bước sau để tạo ấn tượng tốt với khách hàng:</h4>
          <p><b style={{ color: "red" }}>Bước 2:</b> Khai thác thông tin còn thiếu: tên HR? Vị trí? Số lượng? Kinh nghiệm? Tuyển gấp hay không? Tài chính thế nào? Đã đăng ở đâu?</p>
          <p><b style={{ color: "red" }}>Bước 3:</b> Uy tín chuyên viên.</p>
          <p><b style={{ color: "red" }}>Bước 4:</b> Phân tích.</p>
          <p><b style={{ color: "red" }}>Bước 5:</b> Đôn thúc.</p>
        </Col>
        <Col span={14}>
          <p>Họ tên HR phụ trách:<b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD?.hr ?? "Chưa cập nhật"}</b></p>
          <p>Vị trí tuyển dụng:<b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD?.new_title ?? "Chưa cập nhật"}</b></p>
          <p>Khu vực:<b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD?.new_addr ?? "Chưa cập nhật"}</b></p>
          <p>Số lượng tuyển dụng:<b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD?.count ?? "Chưa cập nhật"}</b></p>
          <p>Nguồn:<b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD?.cus_from ?? infoNTD?.fromWeb ?? "Chưa cập nhật"}</b></p>
          <p>
            Nội dung tuyển dụng:{" "}
            {!infoNTD?.new_mota ? (
              <b style={{ color: "#1E40AF", marginLeft: "4px" }}>Chưa cập nhật</b>
            ) : (
              <>
                {isExpanded && <b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD.new_mota}</b>}
                <Button
                  type="link"
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{ padding: 0, fontSize: "14px", marginLeft: "6px" }}
                >
                  {isExpanded ? "Rút gọn" : "Xem thêm"}
                </Button>
              </>
            )}
          </p>
          <p>Số điện thoại:<b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD?.phone_number ?? "Chưa cập nhật"}</b></p>
          <p>Gmail:<b style={{ color: "#1E40AF", marginLeft: "4px" }}>{infoNTD?.email ?? "Chưa cập nhật"}</b></p>
        </Col>

        {/* Gợi ý tư vấn */}
        
      </Row>

      {/* Thông tin khách hàng thiếu */}
      <br />
      <h3>Thông tin khách hàng thiếu:</h3>
      <Row gutter={16}>
        <Col span={6}><Input placeholder="Số lượng tuyển dụng" /></Col>
        <Col span={6}><Input placeholder="Kinh nghiệm" /></Col>
        <Col span={6}><Input placeholder="Tài chính" /></Col>
        <Col span={6}><Input placeholder="Tuyển gấp" /></Col>
      </Row>

      <br />
      <h3>Ghi chú của chuyên viên:</h3>
      <Input.TextArea
        placeholder="Nhập ghi chú"
        rows={3}
        value={note}
        onChange={handleInputChange}
      />

      <br />
      <br />
      <h3>Hẹn gọi lại:</h3>
      <Row gutter={16}>
        <Col span={12}><TimePicker format="HH:mm" style={{ width: "100%" }} /></Col>
        <Col span={12}><DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} /></Col>
      </Row>

      <br />

      {inCalling ? <div style={{ textAlign: "center", marginTop: 16 }}>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "green", borderColor: "green" }}
          onClick={() => { }}
        >
          Đang gọi...
        </Button>
      </div> : <div style={{ textAlign: "center", marginTop: 16 }}>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "red", borderColor: "red" }}
          onClick={() => {
            handleChangeToGroupKNN();
            setIsOpenModalInfoNTD(false)
            setInCalling(false)
          }}
        >
          Đóng
        </Button></div>}

    </Modal>
  );
};

export default ModalInfoCustomer;
