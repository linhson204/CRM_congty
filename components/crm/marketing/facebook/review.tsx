import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../marketing.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const ShareActionModalS: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [label, setLabel] = useState("");
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  const handleAddElement = (condition: string) => {
    const newElement = <div className={styles.content_obj} key={label}></div>;
    if (label === condition) {
      setElements((prevElements) => [...prevElements, newElement]);
    } else {
      setElements([newElement]);
    }
  };

  return (
    <>
      <Modal
        title={"Xem trước sms"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        className={"mdal_cancel email_add_mdal custom_review_mdal"}
        style={{ minWidth: "700px" }}
      >
        <div className={styles.row_mdal}>
          <div className={styles.btn_share}>
            <div className="mb-3 col-lg-12">Wikipedia là một bách khoa toàn thư mở trực tuyến đa ngôn ngữ đượcsáng lập và duy trì bởi một cộng đồng biên tập viên tình nguyện vàchạy trên nền tảng wiki. Wikipedia là một bách khoa toàn thư mởtrực tuyến đa ngôn ngữ được sáng lập và duy trì bởi một cộng đồngbiên tập viên tình nguyện và chạy trên nền tảng wiki.<br />Wikipedia là một bách khoa toàn thư mở trực tuyến đa ngôn ngữ đượcsáng lập và duy trì bởi một cộng đồng biên tập viên tình nguyện vàchạy trên nền tảng wiki.<br />Wikipedia là một bách khoa toàn thư mở trực tuyến đa ngôn ngữ đượcsáng lập và duy trì bởi một cộng đồng biên tập viên tình nguyện vàchạy trên nền tảng wiki.<br />Wikipedia là một bách khoa toàn thư mở trực tuyến đa ngôn ngữ đượcsáng lập và duy trì bởi một cộng đồng biên tập viên tình nguyện vàchạy trên nền tảng wiki.</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareActionModalS;
