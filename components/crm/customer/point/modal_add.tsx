import { MInputText, MInputTextAndOption } from "@/components/commodity/input";
import { axiosCRM, axiosCRMv2 } from "@/utils/api/api_crm";
import { Modal } from "antd";
import btnStyles from "@/styles/crm/button.module.css";
import React, { useState } from "react";
import { decodeToken, notifyError, notifyWarning } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
type TypeAddPoint = {
  point: string;
};
export default function ModalAddPoint({ isOpenModalAdd, setIsOpenModalAdd }) {
  const router = useRouter();
  const [formData, setFormData] = useState<TypeAddPoint>({
    point: null,
  });
  const { idQLC } = decodeToken();
  const handleAddPoint = async () => {
    if (!formData.point) {
      notifyWarning("Nhập đầy đủ thông tin");
      return;
    }
    if(!isNaN(Number(formData.point)) && (Number(formData.point) > 0) ){
        axiosCRM
        .post("/customer/DexuatCongDiem", { ...formData, idCrm: idQLC })
        .then((res) => {
          setFormData({ point: "" });
          alert("Tạo thành công");
          setIsOpenModalAdd(false);
          router.refresh();
        })
        .catch((err) => notifyError("Kiểm tra lại thông tin!"));
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
        title="Dữ liệu chia khách hàng"
        onCancel={() => setIsOpenModalAdd(false)}
        footer={null}
        width={500}
      >
        <MInputTextAndOption
          require
          label="Điểm cộng"
          placeholder="Nhập số điểm cộng"
          setFormData={setFormData}
          value={formData.point}
          name="point"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={btnStyles.btn_add} onClick={handleAddPoint}>
            Gửi đề xuất
          </button>
        </div>
      </Modal>
      <ToastContainer autoClose={1500} />
    </>
  );
}
