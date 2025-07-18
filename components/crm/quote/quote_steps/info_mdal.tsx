"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

interface ModalErrorProps {
  modal1Open: boolean;
  setModal1Open: any;
  title: string;
  // link: string;
}

const ModalInfo: React.FC<ModalErrorProps> = ({
  modal1Open = true,
  setModal1Open,
  title,
  // link = "/",
}: any) => {
  // const router = useRouter();
  const handleClick = () => {
    setModal1Open(false);
    // router.push(link);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setModal1Open(false);
    }, 2000);

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="sucess-mdal">
        <Modal
          title={
            <Image width={112} height={112} alt="logo" src={"/crm/infor-del.svg"} />
          }
          style={{ top: 20 }}
          open={modal1Open}
          onOk={handleClick}
          className="custom_mdal_sucess"
        >
          <div style={{ textAlign: "center", whiteSpace: 'pre-line' }}>{title}</div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalInfo;
