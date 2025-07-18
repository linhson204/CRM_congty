"use client";
import React from "react";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

interface ModalCompleteStepProps {
  modal1Open: boolean;
  setModal1Open: any;
  title: string;
  routerback: string;
}

const ModalCompleteStep: React.FC<ModalCompleteStepProps> = ({
  modal1Open = true,
  setModal1Open,
  title,
  routerback,
}: any) => {
  const router = useRouter();
  const handleClick = () => {
    setModal1Open(false);
    router.push("/setting/switch_fpt");
  };
  return (
    <div>
      <div>
        <Modal
          title={
            <Image width={112} height={112} alt="logo" src="/crm/success.svg" />
          }
          style={{ top: 20 }}
          open={modal1Open}
          onOk={handleClick}
          className="custom_mdal_sucess"
          onCancel={() => setModal1Open(false)}
        >
          <div style={{ textAlign: "center" }}>{title}</div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalCompleteStep;
