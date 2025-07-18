"use client";
import React from "react";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { base_url } from "../../service/function";
import styles from "../../potential/potential.module.css";

const Cookies = require("js-cookie");
interface ModalCompleteStepProps {
  modal1Open: boolean;
  setModal1Open: any;
  // title: string;
  link: string;
  editorContent?: any;
  cusId?: any;
}

const ModalCompleteStep: React.FC<ModalCompleteStepProps> = ({
  modal1Open = true,
  setModal1Open,
  title,
  editorContent,
  cusId,
}: any) => {

  const handleClick = async () => {
    setModal1Open(false);
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
          className="custom_mdal_sucess popup_sucess"
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              fontSize: "16px",
            }}
          >
            <p>Bàn giao công việc cho </p>
            <span className={styles.span_success_custom}>{title}</span>
            <p>thành công!</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalCompleteStep;
