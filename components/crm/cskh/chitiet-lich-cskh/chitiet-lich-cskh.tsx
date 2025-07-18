import styles from "../chitietkhaosat/index.module.css";
import styless from "../../potential/potential2.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Table } from "antd";
export default function ChiTietLichCSKH() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    street: string;
    building: string;
    number: number;
    companyAddress: string;
    companyName: string;
    gender: string;
  }
  const router = useRouter();
  const path = router.query;
  const handleSave = () => {
    setIsShowModal(true);
  };
  const handleDelete = (e: any) => {
    var result = window.confirm("Bạn có chắc muốn xóa không?");
    if (result) {
      router.push("/phieu-thu");
    } else {
    }
  };
  const columns: any = [
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "Thứ trong tuần",
      children: [
        {
          title: "Thứ 2",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 3",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 4",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 5",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 6",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Thứ 7",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Chủ nhật",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
      ],
    },

    {
      title: "Tuần",
      children: [
        {
          title: "Tuần 1",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Tuần 2",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Tuần 3",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
        {
          title: "Tuần 4",
          dataIndex: "building",
          key: "building",
          width: 50,
        },
      ],
    },
    {
      title: "Diễn ra tháng",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Tổng chăm sóc",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Bắt đầu",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
  ];

  const data: DataType[] = [];
  //   for (let i = 0; i < 50; i++) {
  //     data.push({
  //       key: i,
  //       name: "John Brown",
  //       age: i + 1,
  //       street: "Lake Park",
  //       building: "C",
  //       number: 2035,
  //       companyAddress: "Lake Street 42",
  //       companyName: "SoftLake Co",
  //       gender: "M",
  //     });
  //   }
  return (
    <div>
      <div style={{ paddingBottom: 17 }}></div>
      <div style={{ display: "flex", gap: 30, paddingBottom: 30 }}>
        <button
          onClick={() =>
            router.push(`/sua-lich-cham-soc-khach-hang/${path.id}`)
          }
          style={{ background: "#4C5BD4" }}
          type="button"
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <img src="/crm/edit.svg" alt="" />
          <p style={{ color: "#ffffff" }}>Chỉnh sửa</p>
        </button>
        <button
          style={{
            background: "#FF3333",
            width: 100,
            display: "flex",
            justifyContent: "center",
          }}
          type="button"
          //   onClick={(e) => {
          //     handleDelete(e);
          //   }}
          onClick={() => router.push("/lich-cham-soc-khach-hang")}
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <p style={{ color: "#ffffff" }}>Xóa</p>
        </button>
      </div>
      <div className={styles.headercontentCS}>
        Chi tiết lịch chăm sóc khách hàng
      </div>
      <div className={styles.contentheader}>
        <div className={styles.title}>Lịch chăm sóc khách hàng</div>
        <fieldset className={styles.fieldset}>
          <div className={styles.info}>
            <div className={styles.left}>Tên lịch </div>
            <div className={styles.right}>3123</div>
          </div>
          <div className={styles.full_width_div}>
            <span></span>
          </div>
          <div className={styles.info}>
            <div className={styles.left}>Người tạo </div>
            <div className={styles.right}>Trường</div>
          </div>
          <div className={styles.full_width_div}>
            <span></span>
          </div>
          <div className={styles.info}>
            <div className={styles.left}>Ngày tạo </div>
            <div className={styles.right}>12-03-2002</div>
          </div>
          <div className={styles.full_width_div}>
            <span></span>
          </div>
          <div className={styles.info}>
            <div className={styles.left}>Mô tả </div>
            <div className={styles.right}>Đẹp trai {":))"}</div>
          </div>
        </fieldset>

        <Table
          style={{ paddingTop: 20 }}
          columns={columns}
          dataSource={data}
          bordered
          size="middle"
          scroll={{ x: 1500, y: "100%" }}
        />
      </div>
    </div>
  );
}
