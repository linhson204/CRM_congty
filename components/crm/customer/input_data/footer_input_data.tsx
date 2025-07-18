import { useState } from "react";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import Cookies from "js-cookie";
import ModalCompleteStepADDInput from "../../potential/potential_steps/complete_nhap_lieu";
import { notification } from "antd";
import { useRouter } from "next/router";
import { base_url } from "../../service/function";

export default function PotentialFooterAddFiles({
  link,
  title,
  contentCancel,
  titleCancel,
  dataAdd,
  setDataAdd,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const router = useRouter();
  const handleAddInput = async () => {
    try {
      if (dataAdd.name && dataAdd.phone_number) {
        const res = await fetch(`${base_url}/api/crm/nhaplieu/NhapLieu`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify(dataAdd),
        });
        const data = await res.json();
        if (data && data?.data?.result) {
          setModal1Open(true);
        }
        if (data && data.error) {
          notification.error({ message: data?.error?.message });
        }
      } else {
        notification.error({
          message: "Tên khách hàng, số điện thoại là bắt buộc",
        });
      }
    } catch (error) {}
  };
  return (
    <div className={styles.main__footer}>
      <button
        type="button"
        onClick={() => (
          setDataAdd(""),
          notification.success({ message: "Làm mới thành công" }),
          router.push("/customer/input/add")
        )}
      >
        Làm mới
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={() => handleAddInput()}
      >
        Lưu
      </button>

      <ModalCompleteStepADDInput
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
      />
    </div>
  );
}
