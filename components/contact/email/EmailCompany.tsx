import styles from "@/components/crm/potential/potential.module.css";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { notifyError, notifySuccess } from "@/utils/function";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import SelectSingle from "@/components/commodity/select";
import { ToastContainer } from "react-toastify";

interface DataType {
  key: string;
  time_create: string;
  emp_name: string;
  list_group: string;
  time_start_update: string;
  time_end_update: string;
  time_start: string;
  count_phone: number;
  status: number;
  status_doing: string;
  index: number;
}
function EmailCompany() {
  const [dataTable, setDataTable] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    recall: true,
    status: "1",
  });
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setDataTable({ ...dataTable, emp_name: decodedToken?.data.userName });
    }
  }, []);
  useEffect(() => {
    setHeaderTitle("Danh sách Email");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axiosCRMCall
      .post("/scheduleEmail/getListSchedule", formData)
      .then((res) => {
        handleDataTable(res.data.data.data);
      })
      .catch((err) => {
        notifyError("Vui lòng thử lại sau");
      });
  }, [formData.recall, formData.status]);
  const columns: ColumnsType<DataType> = [
    {
      title: "Ngày đề xuất",
      dataIndex: "time_create",
      key: "time_create",
      width: 200,
    },
    {
      title: "Người phụ trách",
      dataIndex: "emp_name",
      key: "emp_name",
      width: 300,
    },
    {
      title: "Loại",
      dataIndex: "list_group",
      key: "list_group",
      width: 350,
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
    },
    {
      title: "Số lượng",
      dataIndex: "count_phone",
      width: 150,
    },
    {
      title: "Xét duyệt",
      fixed: "right",
      dataIndex: "approval",
      width: 200,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={() => handleOneProposed(record.key, 2)}>
            Duyệt
          </Button>
          <Button onClick={() => handleOneProposed(record.key, 3)}>
            Từ chối
          </Button>
        </div>
      ),
    },
  ];

  const handleDataTable = (datas) => {
    setDataTable(
      datas?.map((item) => ({
        ...item,
        key: item._id,
        list_group: item.list_group?.map((group) => group.gr_name)?.join(", "),
      }))
    );
  };
  const handleOneProposed = (id: string, status: number) => {
    axiosCRMCall
      .post("/scheduleEmail/duyet", {
        data: JSON.stringify([{ id: id, status: status }]),
      })
      .then((res) => {
        setFormData({ ...formData, recall: !formData.recall });
        notifySuccess(status == 2 ? "Đã duyệt đề xuất" : "Đã từ chối đề xuất");
      })
      .catch((err) => notifyError());
  };
  const handleSelectProposed = (status: number) => {
    axiosCRMCall
      .post("/scheduleEmail/duyet", {
        data: JSON.stringify(
          selectedRowKeys.map((item) => ({ id: item, status: status }))
        ),
      })
      .then((res) => {
        setFormData({ ...formData, recall: !formData.recall });
        notifySuccess(
          status == 2
            ? `Đã duyệt ${selectedRowKeys.length} đề xuất`
            : `Đã từ chối ${selectedRowKeys.length} đề xuất`
        );
      })
      .catch((err) => notifyError());
  };
  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button>Cài đặt quyền</Button>
        {selectedRowKeys.length > 0 && (
          <div>
            <Button
              onClick={() => handleSelectProposed(2)}
              style={{ marginRight: "10px" }}
            >
              Duyệt {selectedRowKeys.length} đề xuất
            </Button>
            <Button
              onClick={() => handleSelectProposed(3)}
              style={{ color: "white", backgroundColor: "#E1655F" }}
            >
              Từ chối {selectedRowKeys.length} đề xuất
            </Button>
          </div>
        )}
      </div>

      <Table
        rowSelection={rowSelection}
        scroll={{ x: 1700 }}
        columns={columns}
        dataSource={dataTable.length > 0 ? dataTable : [dataTable]}
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default EmailCompany;
