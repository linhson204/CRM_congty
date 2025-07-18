import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";

import { useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Button, Table } from "antd";
import axios from "axios";
import { convertTimestampToFull, notifyError } from "@/utils/function";
import type { ColumnsType } from "antd/es/table";
import jwt_decode from "jwt-decode";

import Link from "next/link";
import { getToken } from "../api/api-hr/token";
import { useRouter } from "next/router";
import { ID_HUNGHA } from "@/constants/home-constants";

interface DataType {
  key: string;
  cv_id: number;
  hoso_id: number;
  bad_use_id: number;
  bad_use_link: string;
  bad_use_text: string;
  createAt: string;
  accept: any;
  delete: any;
}
function ListBand() {
  const router = useRouter();
  const mainRef = useRef(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [checkReceiver, setCheckReceiver] = useState(false);
  const [listBand, setListBand] = useState<any[]>([]);
  const [recall, setRecall] = useState(true);
  const userType: any = getToken("role");
  useEffect(() => {
    const fetchDataType = async () => {
      console.log("userType", userType);
      const currentCookie = getToken("token_base365");
      if (currentCookie) {
        const decodedToken: any = await jwt_decode(currentCookie);
        if (decodedToken?.data.idQLC != ID_HUNGHA || Number(userType) != 1) {
          window.alert("Bạn không có quyền truy cập!");
          router.push("/");
          return;
        }
      } else {
        const interval = setInterval(async () => {
          clearInterval(interval);
          fetchDataType();
        }, 500);
      }
    };
    fetchDataType();
  }, []);

  useEffect(() => {
    setHeaderTitle("Danh sách vi phạm");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axios
      .post(
        "https://api.timviec365.vn/api/timviec/candidate/TakeListUserBadContent"
      )
      .then((res) => setListBand(res.data.data.listUser))
      .catch((err) => notifyError("Vui lòng thử lại sau"));
  }, [recall]);
  const handleAccept = (id) => {
    axios
      .post(
        "https://api.timviec365.vn/api/timviec/candidate/AcceptUserBadContent",
        { cv_id: id }
      )
      .then((res) => setRecall(!recall))
      .catch((err) => notifyError());
  };
  const handleDelete = (id) => {
    axios
      .post(
        "https://api.timviec365.vn/api/timviec/candidate/BanUserUserBadContent",
        { cv_id: id }
      )
      .then((res) => setRecall(!recall))
      .catch((err) => notifyError());
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "ID CV",
      dataIndex: "cv_id",
      key: "cv_id",
      width: 130,
    },
    {
      title: "ID HỒ SƠ",
      dataIndex: "hoso_id",
      key: "hoso_id",
      width: 130,
    },
    {
      title: "ID ỨNG VIÊN",
      dataIndex: "bad_use_id",
      key: "bad_use_id",
      width: 170,
    },
    {
      title: "LINK ỨNG VIÊN",
      dataIndex: "bad_use_link",
      key: "bad_use_link",
      width: 170,
      render: (_, record) => (
        <Link href={record.bad_use_link} target="blank">
          <p style={{ color: "#1DD0EC", fontSize: "16px" }}>Chi tiết</p>
        </Link>
      ),
    },
    {
      title: "TỪ NHẠY CẢM",
      dataIndex: "bad_use_text",
      width: 250,
      key: "bad_use_text",
    },
    {
      title: "THỜI GIAN PHÁT HIỆN",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, record) => <p>{convertTimestampToFull(record.createAt)}</p>,
    },
    {
      title: "DUYỆT",
      dataIndex: "accept",
      width: 150,
      key: "accept",
      render: (_, record) => (
        <Button
          onClick={() => handleAccept(record.cv_id)}
          style={{ color: "#66D0EC", borderColor: "#66D0EC" }}
        >
          Duyệt
        </Button>
      ),
    },
    {
      title: "XÓA",
      dataIndex: "delete",
      width: 150,
      key: "delete",
      render: (_, record) => (
        <Button
          onClick={() => handleDelete(record.cv_id)}
          style={{ color: "#FF2020", borderColor: "#FF2020" }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.form_add_potential}>
              <Table columns={columns} dataSource={listBand} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBand;
