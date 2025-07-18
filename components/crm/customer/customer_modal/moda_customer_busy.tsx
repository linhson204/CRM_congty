import { Button, Input, Modal } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
const Cookies = require("js-cookie");


const ModalAgentBusy = ({ isOpenModalBusy, setIsOpenModalBusy }) => {
  const [time, setTime] = useState(0);
  const [reason, setReason] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [fromTime, setFromTime] = useState(null);
  const currentCookie = Cookies.get("token_base365");
  const decodedToken: any = jwt_decode(currentCookie);

  useEffect(() => {
    let interval;
    setIsMounted(true);

    if (isOpenModalBusy) {
      const now = new Date();
      setFromTime(new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString());
      changeData();
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      setIsMounted(false);
    };
  }, [isOpenModalBusy]);

  const changeData = async () => {
    try {
      await axios.post(`https://api.timviec365.vn/api/crm/busy/changeBusyState`, {
        isBusy: 1,
        kd_id: decodedToken?.data.idQLC,
      })
      if (isMounted) {
      }
    } catch (error) {
      if (isMounted) {
      }
      console.error("API Error:", error);
    }
  };

  const onCancelBusy = async () => {
    try {
      const toTime = new Date(new Date(fromTime).getTime() + time * 1000).toISOString();
      console.log("fromTime:", fromTime);
      console.log("toTime:", toTime);
      console.log("reason:", reason);
      console.log("duration:", time);
      console.log("IDQLC:", decodedToken?.data.idQLC);
      console.log("userName:", decodedToken?.data.userName);
      await axios.post(`https://api.timviec365.vn/api/crm/busy/changeBusyState`, {
        from: fromTime,
        to: toTime,
        reason,
        isBusy: 0,
        duration: time,
        kd_id: decodedToken?.data.idQLC,
        kd_name: decodedToken?.data.userName,
      })
      setIsOpenModalBusy(false);
      setTime(0);
      setReason("");
    } catch (error) {
      console.error("API onCancelBusy:", error);

    }
  }

  return (
    <Modal
      title="NHÂN VIÊN ĐANG BẬN"
      open={isOpenModalBusy}
      onCancel={() => onCancelBusy()}
      footer={null}
      centered
    >
      <div>
        <label>
          Lý do bận <span style={{ color: "red" }}>*</span>
        </label>
        <Input
          placeholder="Nhập lý do bận"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "#E0E0E0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              border: "10px solid #8080FF",
              margin: "auto",
            }}
          >
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {String(time % 60).padStart(2, "0")}
          </div>
        </div>

        <Button type="primary" danger block onClick={() => onCancelBusy()}>
          Hủy bận
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAgentBusy;
