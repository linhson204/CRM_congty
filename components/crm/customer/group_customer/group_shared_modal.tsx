import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import TableSharedFactor from "@/components/crm/table/table-shared-factor";
import Cookies from "js-cookie";
import { useApi } from "../../hooks/useApi";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  empId: any;
  depId: any;
}
const GroupSharedAFactorModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  empId,
  depId,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
  };
  const accessToken = Cookies.get("token_base365");
  const com_id = Cookies.get("com_id");

  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
    accessToken,
    "POST",
    { com_id: Number(com_id) }
  );

  const empIdArr = empId?.split(",").map((item) => parseInt(item.trim(), 10));

  return (
    <>
      <Modal
        title={
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div>Đối tượng được chia sẻ</div>{" "}
            <div
              onClick={() => setIsModalCancel(false)}
              style={{ cursor: "pointer", position: "absolute", right: 15 }}
            >
              X
            </div>
          </div>
        }
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal shared_factor"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        {depId && depId !== "all" && empId && empId !== "all" ? (
          <div style={{ marginTop: "-96px" }}>
            <TableSharedFactor data={data} empIdArr={empIdArr} />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>Tất cả nhân viên</div>
        )}
      </Modal>
    </>
  );
};

export default GroupSharedAFactorModal;
