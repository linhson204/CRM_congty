import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, DatePicker, Input, Modal, Result, UploadFile, UploadProps } from "antd";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { useRouter } from "next/router";
import FormData from "form-data";
import { useFormData } from "../../context/formDataContext";
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) { },
};

const ModalAddTL = (props: any) => {
  const { isShowModalAddTL, onClose, handleAddDB, name } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const [fileList, setFileList] = useState([])
  const [successFiles, setSuccessFiles] = useState([])

  const uploadFile = async () => {
    setSuccessFiles([]);
    fileList.forEach(async (file) => {
      let formData = new FormData();
      formData.append('quote_id', id);
      formData.append('document', file);
      await axiosCRMCall
        .post('/quote/create-attachment', formData)
        .then(res => {
          setSuccessFiles(prev => [...prev, file.name]);
        })
        .catch((err) => console.log("err", err));
    })

    return true
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => { };

  const handleClose = () => {
    setFileList([])
    setSuccessFiles([])
    onClose();
  };
  return (
    <div>
      <Modal
        width={560}
        open={isShowModalAddTL}
        title={
          <div
            style={{
              background: "#4c5bd4",
              width: "110%",
              margin: "-20px -30px",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Thêm tệp đính kèm
            </div>
          </div>
        }
        onOk={handleOk}
        onCancel={onClose}
        centered
        closable={true}
        footer={[
          <div
            key={"1"}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
            }}
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
              onClick={async () => {
                await uploadFile()
                setFileList([]);
                setOpenSuccess(true);
              }}
            >
              Đồng ý
            </Button>
            ,
          </div>,
        ]}
      >
        <div style={{ paddingTop: 40 }}>
          <Dragger
            // {...props}
            onRemove={(file) => {
              const index = fileList.indexOf(f => f.uid === file.uid);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={(file) => {
              const maxSize = 2 * 1024 * 1024
              if (file.size > maxSize) {
                message.error(`File không lớn hơn 2MB`);
                return false
              }
              setFileList(prev => [...prev, file])
              return false
            }}
            fileList={fileList}
            multiple={true}
          // maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined rev={null} />
            </p>
            <p className="ant-upload-text">Kéo thả tệp vào đây</p>
            <p className="ant-upload-hint">
              <Button style={{ background: "blue", color: "#fff" }}>
                Hoặc chọn tệp
              </Button>
            </p>
          </Dragger>
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
              onClick={() => (setOpenSuccess(false), onClose())}
            >
              Đóng
            </Button>
            ,
          </div>,
        ]}
      >
        <div></div>
        <Result
          status={successFiles.length > 0 ? "success" : "error"}
          title={
            successFiles.length > 0 ?
              <div>Thêm mới {successFiles.length + ' tệp'} thành công: {'\n' + successFiles.join(', ')}</div> :
              <div>Thêm mới không thành công</div>
          }
        />
      </Modal>
    </div>
  );
};

export default ModalAddTL;
