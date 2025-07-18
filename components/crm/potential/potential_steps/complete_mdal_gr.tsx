"use client";
import React from "react";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

interface ModalCompleteStepGrProps {
  modal1Open: boolean;
  setModal1Open: any;
  title: string;
  link: string;
}

const ModalCompleteStepGr: React.FC<ModalCompleteStepGrProps> = ({
  modal1Open = true,
  setModal1Open,
  title,
  link = "/",
}: any) => {
  const router = useRouter();
  const handleClick = () => {
    setModal1Open(false);
    router.push(link);
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
          onCancel={handleClick}
        >
          <div style={{ textAlign: "center" }}>{title}</div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalCompleteStepGr;
