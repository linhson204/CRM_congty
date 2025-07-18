import styles from "@/components/crm/potential/potential.module.css";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/function";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

interface DataType {
  key: string;
  emp_name: string;
  listGroup: any[];
  time: string;
  appointmentTime: string;
  index: number;
}
interface DataTableType {
  key: string;
  time_create: string;
  emp_name: string;
  list_group: any[];
  time: string;
  time_start_update: string;
  time_end_update: string;
  count_phone: number;
  index: number;
  status_doing: string;
}
type TypeFormPropose = {
  listGroup: string;
  timeStartUpdate: number;
  timeEndUpdate: number;
  timeStart: number;
  recall: boolean;
};
function EmailEmployee() {
  const router = useRouter();
  const [dataTableStatus, setDataTableStatus] = useState([]);

  const [dataTable, setDataTable] = useState<any>();
  const [formData, setFormData] = useState<TypeFormPropose>({
    listGroup: "",
    timeStartUpdate: 0,
    timeEndUpdate: 0,
    timeStart: 0,
    recall: true,
  });
  const [listGroup, setListGroup] = useState([]);
  const [count, setCount] = useState(0);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setDataTable({ ...dataTable, emp_name: decodedToken?.data.userName });
    }
  }, []);
  useEffect(() => {
    setHeaderTitle("Đề xuất Email");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axiosCRMCall
      .get("/scheduleAutoCall/getListGroupCompany")
      .then((res) => {
        handleGroup(res.data.data.list_group);
      })
      .catch((err) => {
        notifyError("Vui lòng thử lại sau");
      });
  }, []);
  //Lấy số lượng
  useEffect(() => {
    if (
      formData.listGroup &&
      formData.timeStartUpdate &&
      formData.timeEndUpdate
    ) {
      axiosCRMCall
        .post("/scheduleEmail/getGroupCustomer", formData)
        .then((res) => {
          res.data.data.data.length > 0
            ? setCount(res.data.data.data[0]?.count)
            : setCount(0);
        })
        .catch((err) => console.log(err));
    }
  }, [formData.listGroup, formData.timeStartUpdate, formData.timeEndUpdate]);
  useEffect(() => {
    axiosCRMCall
      .post("/scheduleAutoCall/getListSchedule", { status: "1,2,3" })
      .then((res) => setDataTableStatus(res.data.data.data))
      .catch((err) => notifyError("Đã có lỗi xảy ra"));
  }, [formData.recall]);
  const columns: ColumnsType<DataType> = [
    {
      title: "Người phụ trách",
      dataIndex: "emp_name",
      key: "emp_name",
      width: 300,
    },
    {
      title: "Loại",
      dataIndex: "listGroup",
      key: "listGroup",
      width: 350,
      render: () => (
        <Select
          mode="multiple"
          placeholder="Chọn loại"
          style={{ width: 330 }}
          onChange={(e) =>
            setFormData({ ...formData, listGroup: e?.join(",") })
          }
          options={listGroup}
        />
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      width: 350,
      render: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
          >
            <div className={`${styles.input_item_time} flex_between`}>
              <input
                type="date"
                onChange={(e) => handleChangeSearch(e)}
                name="timeStartUpdate"
                id="start_time"
              />
            </div>
            -
            <div className={`${styles.input_item_time} flex_between`}>
              <input
                type="date"
                onChange={(e) => handleChangeSearch(e)}
                name="timeEndUpdate"
                id="start_time"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Thời gian hẹn",
      width: 200,
      dataIndex: "appointmentTime",
      render: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
          >
            <div className={`${styles.input_item_time} flex_between`}>
              <input
                type="date"
                onChange={(e) => handleChangeSearch(e)}
                name="timeStart"
                id="start_time"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 150,
      render: () => <div> {count} </div>,
    },
    {
      title: "Đề xuất",
      fixed: "right",
      dataIndex: "propose",
      width: 100,
      render: () => <Button onClick={handlePropose}>Gửi</Button>,
    },
  ];
  const handleChangeSearch = async (e) => {
    const { name, value } = e.target;
    if (value) {
      const timeStamp = new Date(value);
      setFormData({ ...formData, [name]: timeStamp.getTime() / 1000 });
    } else {
      setFormData({ ...formData, [name]: 0 });
    }
  };
  const handleGroup = async (datas) => {
    const convert = await datas?.map((item) => ({
      value: item.gr_id,
      label: item.gr_name,
    }));
    setListGroup(convert);
  };
  const handlePropose = () => {
    for (const key in formData) {
      if (!formData[key]) {
        notifyWarning("Chọn đầy đủ thông tin");
        return;
      }
    }
    if (count == 0) {
      notifyWarning("Không có kết quả phù hợp");
      return;
    }
    axiosCRMCall
      .post("/scheduleEmail/suggest", formData)
      .then(() => {
        notifySuccess("Thành công");
      })
      .catch((err) => notifyError());
  };
  const columnsProposed: ColumnsType<DataTableType> = [
    {
      title: "Ngày đề xuất",
      dataIndex: "time_create",
      key: "time_create",
      width: 300,
      render(value, record, index) {
        return value;
      },
    },
    {
      title: "Loại",
      dataIndex: "list_group",
      key: "list_group",
      width: 350,
      render: (value) => (
        <div>{value?.map((item) => item.gr_name)?.join(", ")}</div>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      width: 350,
      render(value, record, index) {
        return (
          <p>
            <span style={{ color: "#0075FF" }}>{record.time_start_update}</span>{" "}
            - <span style={{ color: "#0075FF" }}>{record.time_end_update}</span>
          </p>
        );
      },
    },
    {
      title: "Thời gian hẹn",
      width: 200,
      dataIndex: "time_start",
      render: (value) => (
        <div style={{ display: "flex", justifyContent: "center" }}>{value}</div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "count_phone",
      width: 150,
    },
    {
      title: "Trạng thái",
      fixed: "right",
      dataIndex: "status_doing",
      width: 100,
    },
  ];
  return (
    <div>
      <Table
        scroll={{ x: 1700 }}
        columns={columns}
        dataSource={[dataTable]}
        pagination={false}
      />
      <p style={{ margin: "20px 0 10px 0", fontWeight: "600" }}>
        {" "}
        Danh sách đã đề xuất
      </p>
      <Table
        scroll={{ x: 1700 }}
        columns={columnsProposed}
        dataSource={dataTableStatus}
        // pagination={false}
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default EmailEmployee;
