import styles from "./price_policy.module.css";
import { MenuProps, Modal } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
import DelActionModal from "@/components/crm/order/order_detail/order_detail_action_modal/delete_order_detail_share_list_mdal";
import { axiosCRM } from "@/utils/api/api_crm";

export default function OrderDetailAttachActionTable({record, setFormData}) {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const handleOK = () => {
    
    axiosCRM
      .post("/campaign/deleteShareCampaign", {
        _id: Number(record._id),
      })
      .then((res) => {
        setIsDelOpen(false);
        setFormData((pre)=>({...pre, recall: !pre.recall}));
      })
      .catch((err) => console.log("error"));
  };
  return (
    <>
      <div>
        <button
          style={{ justifyContent: "center" }}
          onClick={() => {
            setIsDelOpen(true);
          }}
        >
          <i className="bi bi-trash3"></i> Gỡ bỏ
        </button>
      </div>
      <Modal
        title={"Xác nhận gỡ bỏ chia sẻ"}
        centered
        open={isDelOpen}
        onOk={() => handleOK()}
        onCancel={() => setIsDelOpen(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?</div>
        
      </Modal>
    </>
  );
}
