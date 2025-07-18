import React, { useState } from "react";
import styles from "../../../csks.module.css";
import { Upload, Button, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
type Props = {};

const AddVideo = (props: any) => {
  const { handleDletevideo } = props;
  const [fileList, setFileList] = useState<any>([]);
  const [videoSrc, setVideoSrc] = useState<any>(null);

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;

    try {
      // Simulate upload delay
      setTimeout(() => {
        onSuccess(); // Mark the upload as successful
        const videoURL = URL.createObjectURL(file);
        setVideoSrc(videoURL);
        message.success("Tải lên video thành công");
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi tải lên video:", error);
      onError();
      message.error("Đã xảy ra lỗi khi tải lên video");
    }
  };
  return (
    <fieldset className={styles.left_option_themkhaosat_video}>
      <div style={{ display: "flex", paddingBottom: 20 }}>
        <Input
          type="text"
          placeholder={"Nhập tiêu đề video"}
          className={styles.inputtitle2_option}
        />
        <img
          onClick={handleDletevideo}
          style={{ paddingLeft: 20 }}
          src="/crm/delete.svg"
          alt=""
        />
      </div>
      <Upload
        customRequest={handleUpload}
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
      >
        <Button icon={<UploadOutlined />}>Tải lên video</Button>
      </Upload>
      {videoSrc && (
        <div style={{ maxHeight: "100%" }}>
          <video controls width="100%">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </fieldset>
  );
};
export default AddVideo;
