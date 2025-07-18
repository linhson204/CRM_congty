import React, { useState } from "react";
import styles from "../../../csks.module.css";
import { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { Input, message, Modal, Upload, UploadFile } from "antd";

type Props = {};

const Themmoi_Image = (props: any) => {
  const { handleDleteImage } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const { handleThemmoi, handleDleteThemmoi } = props;
  return (
    <fieldset className={styles.left_option_themkhaosat}>
      <div>
        <div style={{ display: "flex" }}>
          <Input
            type="text"
            placeholder={"Nhập tiêu đề hình ảnh"}
            className={styles.inputtitle2_option}
          />
          <img
            onClick={handleDleteImage}
            style={{ paddingLeft: 20 }}
            src="/crm/delete.svg"
            alt=""
          />
        </div>
      </div>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </fieldset>
  );
};
export default Themmoi_Image;
