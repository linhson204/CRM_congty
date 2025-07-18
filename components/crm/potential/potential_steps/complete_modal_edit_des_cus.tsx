"use client";
import React from "react";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { base_url } from "../../service/function";
const Cookies = require("js-cookie");
interface ModalCompleteStepProps {
  modal1Open: boolean;
  setModal1Open: any;
  title: string;
  link: string;
  editorContent?: any;
  cusId?: any;
}

const ModalCompleteEditDesCus: React.FC<ModalCompleteStepProps> = ({
  modal1Open = true,
  setModal1Open,
  title,
  editorContent,
  cusId,
}: any) => {
  const router = useRouter();

  const handleClick = async () => {
    setModal1Open(false);
    // router.push(link);
    const url = `${base_url}/api/crm/customerdetails/editCustomer`;

    const formData = new FormData();
    formData.append("description", editorContent);
    formData.append("type", "2");
    formData.append("cus_id", cusId);

    const headers = {
      Authorization: `Bearer ${Cookies.get("token_base365")}`,
    };

    const config = {
      method: "POST",
      headers: headers,
      body: formData,
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    router.push("/customer/list");
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

export default ModalCompleteEditDesCus;
