import React, { useContext, useState } from "react";
import { Button, DatePicker, Input, Modal, Result, UploadProps } from "antd";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useRouter } from "next/router";
import { axiosCRMUpfile } from "@/utils/api/api_crm";
import Image from "next/image";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { useFormData } from "../../context/formDataContext";

const PotentailModalAddTL = (props: any) => {
  const { handleRecall } = useContext(useFormData);
  const { isShowModalAddTL, onClose } = props;
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState<any>();

  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleChangeFile = (e) => {
    if (e?.target?.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };
  const handleDeleteFile = () => {
    setFileName("");
    setFile(null);
  };
  const handleAddTL = () => {
    const formPost: any = new FormData();
    formPost.append("cus_id", id.toString());
    formPost.append("document", file);
    axiosCRMUpfile
      .post("/potential/createAttachment", formPost)
      .then((res) => {
        handleRecall();
        setOpenSuccess(true);
      })
      .catch((err) => notifyError());
  };

  const handleClose = () => {
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
        // onOk={handleOk}
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
              onClick={() => {
                handleAddTL();
                // handleAddDB(), setOpenSuccess(true);
              }}
            >
              Đồng ý
            </Button>
            ,
          </div>,
        ]}
      >
        <div style={{ paddingTop: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="document">
              <Image width={100} height={100} alt="/" src="/crm/upload.png" />
            </label>
            {fileName && (
              <p>
                {fileName}{" "}
                <button
                  onClick={handleDeleteFile}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  {" "}
                  x{" "}
                </button>
              </p>
            )}
            <input
              onChange={(e) => handleChangeFile(e)}
              style={{ display: "none" }}
              type="file"
              name="document"
              id="document"
            />
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
              onClick={() => (setOpenSuccess(false), onClose())}
            >
              Đóng
            </Button>
            ,
          </div>,
        ]}
      >
        <div></div>
        <Result status="success" title={<div>Thêm mới thành công</div>} />
      </Modal>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default PotentailModalAddTL;
