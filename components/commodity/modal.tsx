import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../potential.module.css";
import stylesAdd from "./add_file_commodity.module.css";

import { Router, useRouter } from "next/router";
import Image from "next/image";
import { MInputText, MTextArea } from "./input";
const Cookies = require("js-cookie");
interface MyComponentProps {
  isModalCancel?: boolean;
  setIsModalCancel?: (value: boolean) => void;
  content?: any;
  title?: string;
  link?: string;
  id?: any;
  name?: string;
  description?: string;
  updateData?: any;
}
export const MCancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content,
  title,
  link = null,
  updateData = null,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    updateData && updateData();
    link && router.push(link);
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={title}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>{content}</div>
      </Modal>
    </>
  );
};
interface ModalCompleteStepProps {
  modal1Open: boolean;
  setModal1Open: any;
  title?: string;
  link?: string;
  editorContent?: any;
  cusId?: any;
  setRecall?: any;
  handleUpdate?:any
}

export const MModalCompleteStep: React.FC<ModalCompleteStepProps> = ({
  modal1Open = true,
  setModal1Open,
  title = "Hihi",
  link = "",
  setRecall,
  handleUpdate,
}: any) => {
  const router = useRouter();
  const handleClick = async () => {
    setModal1Open(false);
    handleUpdate && handleUpdate();
    link && router.push(link);
    setRecall && setRecall((preData) => !preData);
  };
  return (
    <div>
      <div className="sucess-mdal">
        <Modal
          title={
            <Image
              width={112}
              height={112}
              alt="logo"
              src={"/crm/success.svg"}
            />
          }
          style={{ top: 20 }}
          open={modal1Open}
          onOk={handleClick}
          className="custom_mdal_sucess"
        >
          <div style={{ textAlign: "center" }}>{title}</div>
        </Modal>
      </div>
    </div>
  );
};

// import CancelModal from "../potential_steps/cancel_modal";
// import ModalCompleteStep from "../potential_steps/complete_modal";
type TypeModalAddProps = {
  openModalAdd: boolean;
  setOpenModalAdd: (value: boolean) => void;
  title?: string;
  label: string;
  handleAdd: any;
  setFormAdd: any;
  id?: any;
  name?: string;
  formAdd?: any;
  placeholder?: string;
  description?: string;
};
export const MAddModal: React.FC<TypeModalAddProps> = ({
  openModalAdd = true,
  setOpenModalAdd,
  title,
  label,
  name,
  setFormAdd,
  placeholder,
  description = "",
  handleAdd,
}) => {
  const handleOK = () => {
    setOpenModalAdd(false);
    handleAdd();
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={title}
        centered
        open={openModalAdd}
        onOk={() => handleOK()}
        onCancel={() => setOpenModalAdd(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          <MInputText
            label={label}
            require={true}
            name={name}
            placeholder={placeholder}
            setFormData={setFormAdd}
          />
          <MTextArea setFormData={setFormAdd} />
        </div>
      </Modal>
    </>
  );
};
type TypeEditModalProps = {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  title?: string;
  label: string;
  value?: string;
  handleUpdate: any;
  setFormEdit: any;
  id?: any;
  name?: string;
  placeholder?: string;
  description?: string;
};
export const MEditModal: React.FC<TypeEditModalProps> = ({
  openEditModal = false,
  setOpenEditModal,
  title,
  label,
  name,
  value,
  setFormEdit,
  placeholder,
  description,
  handleUpdate,
}) => {
  const handleOK = () => {
    setOpenEditModal(false);
    handleUpdate();
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={title}
        centered
        open={openEditModal}
        onOk={() => handleOK()}
        onCancel={() => setOpenEditModal(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          <MInputText
            label={label}
            require={true}
            name={name}
            value={value}
            placeholder={placeholder}
            setFormData={setFormEdit}
          />
          <MTextArea value={description} setFormData={setFormEdit} />
        </div>
      </Modal>
    </>
  );
};
export default function FooterAddFiles({
  link,
  titleComplete,
  contentCancel,
  titleCancel,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <div className={stylesAdd.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <button
        className={stylesAdd.save}
        type="submit"
        onClick={() => {
          setModal1Open(true);
        }}
      >
        Lưu
      </button>

      {
        <MCancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={contentCancel}
          title={titleCancel}
          link={link}
        />
      }

      <MModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={titleComplete}
        link={link}
      />
    </div>
  );
}
