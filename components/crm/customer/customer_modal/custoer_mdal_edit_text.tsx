import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import TextEditor from "@/components/crm/text-editor/text_editor";
import ModalCompleteEditDesCus from "../../potential/potential_steps/complete_modal_edit_des_cus";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  cusId: any;
  des: any;
  setDes: any;
}

const EditTextCustomerList: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  cusId,
  des,
  setDes,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
  };
  return (
    <>
      <Modal
        title={"Chỉnh sửa mô tả"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal} style={{ padding: "0 20px" }}>
          <label
            className={`${styles.form_label}`}
            style={{
              textAlign: "left",
              marginBottom: "6px",
              marginLeft: "4.5px",
            }}
          >
            {"Mô tả"}
          </label>
          <TextEditor
            cusId={cusId}
            setEditorContent={setEditorContent}
            des={des}
            setDes={setDes}
          />
        </div>
      </Modal>
      <ModalCompleteEditDesCus
        editorContent={editorContent}
        cusId={cusId}
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Cập nhật thành công"}
        link={"/customer/list"}
      />
    </>
  );
};

export default EditTextCustomerList;
