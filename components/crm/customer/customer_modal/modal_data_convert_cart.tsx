import { axiosCRM } from "@/utils/api/api_crm";
import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";

export default function ModalDataConvertCart({
  isOpenModalConvertCart,
  setIsOpenModalConvertCart,
}) {
  const [empList, setEmpList] = useState([]);
  const [nextEmp, setNextEmp] = useState("");
  const getDataConvertCart = () => {
    axiosCRM
      .get("/account/takeDuLieuChuyenGio")
      .then((res) => {
        setNextEmp(res.data.KdNext);
        setEmpList(res.data.listKD?.map((emp) => ({ empName: emp })));
      })
      .catch((err) => console.log("/account/takeDuLieuChuyenGio", err));
  };
  useEffect(() => {
    if (isOpenModalConvertCart) {
      getDataConvertCart();
    }
  }, [isOpenModalConvertCart]);
  const columns: ColumnsType = [
    {
      title: "Tên nhân viên",
      dataIndex: "empName",
      key: "empName",
      width: 350,
    },
  ];
  return (
    <Modal
      open={isOpenModalConvertCart}
      className={"mdal_default email_add_mdal shared_factor"}
      title="Dữ liệu chia khách hàng"
      onCancel={() => setIsOpenModalConvertCart(false)}
      footer={null}
      width={800}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Table
          pagination={{ pageSize: 1000 }}
          style={{ width: "400px" }}
          columns={columns}
          dataSource={empList}
          scroll={{ y: 500 }}
        />
        <div style={{ margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "18px",
            }}
          >
            <p>Kinh doanh nhận khách tiếp theo </p>
            <p style={{ color: "#FFA800" }}>{nextEmp.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
