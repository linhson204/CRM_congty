import React, { useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import styles from "../bill_detail.module.css";
import { useRouter } from "next/router";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ModalCompleteStep from "@/components/crm/bill/bill_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
    // router.push("order/detail");
  };

  return (
    <>
      <Modal
        title={"Thêm tệp đính kèm"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal"}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <div
          style={{ marginTop: "5px" }}
          className={`${styles.main__control_btn} `}
        >
          <div className={`${styles.modal_body} `}>
            <div className={`${styles.n_form} flex_space_between`}>
              <div className={`${styles.n_form_content} `}>
                <div className={`${styles.n_title} `}>
                  Kéo và thả tệp vào đây
                </div>
                <div className={`${styles.n_or} `}>hoặc</div>

                {/* <input id="n_upfile" type="file" className={`${styles.input} ${styles.hidden} `} name="search_contact" multiple></input> */}
                <div>
                  <Upload {...props}>
                    <Button type="primary">Chọn tệp</Button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Thêm tài liệu đính kèm thành công!"}
        link={"#"}
      />
    </>
  );
};

export default DelActionModal;
