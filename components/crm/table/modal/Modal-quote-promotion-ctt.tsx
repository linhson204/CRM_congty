import { Button, Checkbox, Modal } from "antd";
import React from "react";

type Props = {
  isShowModalctt: boolean;
  setIsShowModalctt: (value: boolean) => void;
};

const Modalquotepromotionctt = (props: Props) => {
  const { isShowModalctt, setIsShowModalctt } = props;
  return (
    <Modal
      title={
        <div
          style={{
            background: "#4C5BD4",
            width: "111%",
            margin: "-20px -24px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              paddingTop: 5,
            }}
          >
            Thay đổi hàng tặng
          </div>
        </div>
      }
      centered
      open={isShowModalctt}
      footer={
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            style={{
              width: "20%",
              fontSize: 15,
              height: 30,
              alignItems: "center",
            }}
            onClick={() => setIsShowModalctt(false)}
          >
            <div> Hủy</div>
          </Button>
          <Button
            style={{ color: "#fff", background: "#4C5BD4", width: "20%" }}
            onClick={() => setIsShowModalctt(false)}
          >
            Đồng ý
          </Button>
        </div>
      }
    >
      <div style={{ display: "block", paddingTop: 30 }}>
        <div>
          <Checkbox style={{ fontSize: 20 }}>SC000 - Sữa chua (2)</Checkbox>
        </div>
        <div>
          <Checkbox style={{ fontSize: 20 }}>SC000 - Sữa chua (2)</Checkbox>
        </div>
        <div>
          <Checkbox style={{ fontSize: 20 }}>SC000 - Sữa chua (2)</Checkbox>
        </div>
      </div>
    </Modal>
  );
};
export default Modalquotepromotionctt;
