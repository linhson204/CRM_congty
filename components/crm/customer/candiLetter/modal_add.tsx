import { MTextArea, MInputTextAndOption } from "@/components/commodity/input";
import { axiosCRM, axiosCRMv2 } from "@/utils/api/api_crm";
import { Modal } from "antd";
import btnStyles from "@/styles/crm/button.module.css";
import React, { useEffect, useState } from "react";
import { decodeToken, notifyError, notifyWarning } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
type TypeAddPoint = {
    enable: number,
    new_id: number,
    content: string;
};
export default function ModalAddPoint({ isOpenModalAdd, setIsOpenModalAdd, newId, content }) {
  const router = useRouter();
  const [formData, setFormData] = useState<TypeAddPoint>({
    enable:1,
    content: content,
    new_id: Number(newId)
  });
  useEffect(()=>{
    setFormData({ enable:1, new_id: newId, content });
  },[newId])
  const { idQLC } = decodeToken();
  const handleAdd = async () => {
    
    if (!formData.content || !formData.new_id) {
      notifyWarning("Nhập đầy đủ thông tin");
      return;
    }
    if(!isNaN(Number(formData.new_id)) && (Number(formData.new_id) > 0) ){
        axiosCRM
        .post("https://api.timviec365.vn/api/timviec/new/enableSendLetter", formData)
        .then((res) => {
        //   setFormData({ enable:1, new_id: newId, content });
          console.log(res);
          alert(newId?"Cập nhật thành công":"Tạo thành công");
          setIsOpenModalAdd(false);
          router.refresh();
        })
        .catch((err) => {
          let message = err?.response?.data?.error?.message?err?.response?.data?.error?.message:"Đã có lỗi xảy ra!";
          notifyError(message);
        });
    }
    else{
        notifyWarning("Nhập sai thông tin");
    }
  };
  return (
    <>
      <Modal
        open={isOpenModalAdd}
        className={"mdal_default email_add_mdal shared_factor"}
        title="Thư mời phỏng vấn"
        onCancel={() => setIsOpenModalAdd(false)}
        footer={null}
        width={500}
      >
        {!newId && 
        <MInputTextAndOption
          require
          label="ID tin"
          placeholder="Nhập ID tin"
          setFormData={setFormData}
          value={formData.new_id?formData.new_id:''}
          name="new_id"
        />
        }
        
        <MTextArea
          require
          label="Nội dung thư"
          placeholder="Nhập nội dung thư"
          setFormData={setFormData}
          value={formData.content}
          name="content"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={btnStyles.btn_add} onClick={handleAdd}>
            {newId?'Cập nhật':'Tạo'}
          </button>
        </div>
      </Modal>
      <ToastContainer autoClose={1500} />
    </>
  );
}
