import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { Select, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { getToken } from "../api/api-hr/token";
import jwt_decode from "jwt-decode";
import { ID_HUNGHA } from "@/constants/home-constants";

interface TypeData {
  key: React.Key;
  emp_name: string;
  emp_id: number;
  auto_call: number;
  email: number;
}
function PhoneSetRole() {
  const mainRef = useRef(null);
  const [userType, setUserType] = useState(3);
  const [idQLC, setIdQLC] = useState(3);
  const [listEmp, setListEmp] = useState([]);
  const [listEmpShow, setListEmpShow] = useState([]);
  const [formSearch, setFormSearch] = useState({
    userName: "",
    type: 0,
    recall: true,
  });
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken("token_base365");
      if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
        setUserType(decodedToken?.data?.type);
        setIdQLC(decodedToken?.data?.idQLC);
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
    setHeaderTitle("Xét duyệt");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const columns: ColumnsType<TypeData> = [
    {
      title: "Tên nhân viên",
      dataIndex: "emp_name",
      key: "emp_name",
      width: 700,
    },
    {
      title: "Kiểm duyệt AutoCall",
      dataIndex: "auto_call",
      render: (value, record, index) => (
        <Select
          style={{ width: 300 }}
          value={value}
          onChange={(e) => handleSetRoleCall(record.emp_id, e)}
          options={[
            { value: 1, label: "Cần xét duyệt" },
            { value: 2, label: "Không cần xét duyệt" },
          ]}
        />
      ),
    },
    {
      title: "Kiểm duyệt AutoEmail",
      dataIndex: "mail",
      render: (value, record, index) => (
        <Select
          style={{ width: 300 }}
          value={value}
          onChange={(e) => handleSetRoleEmail(record.emp_id, e)}
          options={[
            { value: 1, label: "Cần xét duyệt" },
            { value: 2, label: "Không cần xét duyệt" },
          ]}
        />
      ),
    },
  ];
  const handleSetRoleCall = (emp_id, value) => {
    axiosCRMCall
      .post("/permissionAccount/createPermisionUser", {
        emp_id: emp_id,
        role_auto_call: value,
      })
      .then((res) => {
        setFormSearch({ ...formSearch, recall: !formSearch.recall });
      })
      .catch((err) => notifyError());
  };
  const handleSetRoleEmail = (emp_id, value) => {
    axiosCRMCall
      .post("/permissionAccount/createPermisionUser", {
        emp_id: emp_id,
        role_mail: value,
      })
      .then((res) => {
        setFormSearch({ ...formSearch, recall: !formSearch.recall });
      })
      .catch((err) => notifyError());
  };

  useEffect(() => {
    axiosCRMCall
      .get("/permissionAccount/getListPermisionUser")
      .then((res) => setListEmp(res.data.data.data))
      .catch((err) => notifyError("Đã có lỗi xảy ra!"));
  }, [formSearch.recall]);
  if (userType !== 1 && idQLC !== ID_HUNGHA) {
    return;
  }
  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <Table columns={columns} dataSource={listEmp} />
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
}

export default PhoneSetRole;
