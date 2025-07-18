import styles from "@/components/commodity/potential2.module.css";
import Image from "next/image";
import { MCancelModal, MModalCompleteStep } from "./modal";
import { useState } from "react";
import { axiosCRM } from "@/utils/api/api_crm";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

function CommodityAction({ record, setRecall }) {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const handleDeleteProduct = () => {
    axiosCRM
      .post("/product/del-product", { prod_id: record.idCommodity })
      .then((res) => setOpenComplete(true))
      .catch((err) => notifyError("Đã có lỗi xảy ra vui lòng thử lại sau!"));
  };
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", width: "100px" }}
      >
        {" "}
        <div
          className={`${styles.table_sua}`}
          onClick={() => router.push(`/commodity/edit/${record.idCommodity}`)}
        >
          <Image width={16} height={16} alt="/" src="/crm/sua.png" /> Sửa
        </div>{" "}
        <div className={styles.table_xoa} onClick={() => setOpenDelete(true)}>
          {" "}
          <Image width={16} height={16} alt="/" src="/crm/xoa.png" />
          Xóa
        </div>
      </div>
      <MCancelModal
        updateData={() => {
          handleDeleteProduct();
          setOpenDelete(false);
        }}
        isModalCancel={openDelete}
        setIsModalCancel={setOpenDelete}
        title="Xóa vật tư,hàng hóa"
        content={`Bạn muốn xóa ${record.name} khỏi danh sách hàng hóa?`}
      />
      <MModalCompleteStep
        modal1Open={openComplete}
        setModal1Open={setOpenComplete}
        title="Xóa thành công!"
        setRecall={setRecall}
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default CommodityAction;
