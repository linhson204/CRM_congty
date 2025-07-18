import styles from "@/components/crm/potential/potential.module.css";
import { Button, Select, Table, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { notifyError, notifySuccess } from "@/utils/function";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import SelectSingle from "@/components/commodity/select";
import { ToastContainer } from "react-toastify";
import { current } from "@reduxjs/toolkit";
import Link from "next/link";

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
  list: any;
}
function PhoneCompany() {
  const { Option } = Select;
  const [dataTable, setDataTable] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    recall: true,
    status: "1",
  });
  const [formDataCreate, setFormDataCreate] = useState<any>({
    listGroup: [],
    timeStartUpdate: 0,
    timeEndUpdate: 0,
    timeStart: 0,
    emp_id: [],
    recall: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listGroup, setListGroup] = useState([]);
  const [userAdmin, setUserAdmin] = useState([])
  const [dataGroupCustomer, setDataGroupCustomer] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
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
  const count = dataGroupCustomer.reduce((total, current) => {
    return total + Number(current.count)
  }, 0)
  const list_emp_id = userAdmin.map(user => user.emp_id)
  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setDataTable({ ...dataTable, emp_name: decodedToken?.data.userName });
    }
  }, []);
  useEffect(() => {
    setHeaderTitle("Danh sách số điện thoại");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    axiosCRMCall
      .post("/scheduleAutoCall/getListSchedule", {
        ...formData,
        status: !formData.status ? "1,2,3" : `${formData.status}`,
      })
      .then((res) => {
        handleDataTable(res.data.data.data);
      })
      .catch((err) => {
        notifyError("Vui lòng thử lại sau");
      });
  }, [formData.recall, formData.status]);
  //Lấy lịch sử đề xuất
  useEffect(() => {
    axiosCRMCall
      .post("/scheduleAutoCall/getListSchedule", {
        status: '2,3',
      })
      .then((res) => {
        setDataHistory(res.data.data.data);
      })
      .catch((err) => {
        notifyError("Vui lòng thử lại sau");
      });
  }, [])
  //Lấy ds người phụ trách
  useEffect(() => {
    axiosCRMCall
      .get("/scheduleAutoCall/getListAdminUsers")
      .then((res) => {
        if (res?.data?.data?.admin) {
          setUserAdmin(res?.data?.data?.admin)
        }
      })
      .catch((err) => {
        notifyError("Vui lòng thử lại sau");
      });
  }, [])
  //Lấy loại danh sách
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
      formDataCreate.listGroup &&
      formDataCreate.timeStartUpdate &&
      formDataCreate.timeEndUpdate &&
      formDataCreate.emp_id
    ) {
      axiosCRMCall
        .post("/scheduleAutoCall/getGroupCustomer", formDataCreate)
        .then((res) => {
          console.log(formDataCreate.emp_id)
          res.data.data.data.length > 0 ? setDataGroupCustomer(res.data.data.data) : setDataGroupCustomer([])
        })
        .catch((err) => console.log(err));
    }
  }, [formDataCreate.listGroup, formDataCreate.timeStartUpdate, formDataCreate.timeEndUpdate, formDataCreate.emp_id]);

  const columnCreate: ColumnsType<any> = [
    {
      title: "Người phụ trách",
      dataIndex: "userAdmin",
      key: "userAdmin",
      width: 300,
      render: () => (
        <Select
          placeholder="Chọn người phụ trách"
          mode="multiple"
          style={{ width: 330 }}
          onChange={handleSelectChange}
          value={formDataCreate.emp_id || undefined}
        >
          <Option style={{ fontWeight: 'bold' }} value={2} key={'allllllll'}>
            {/* <Option style={{ fontWeight: 'bold' }} value={2} key={'allllllll'}> */}
            Tất cả
          </Option>
          {userAdmin &&
            userAdmin.length > 0 &&
            userAdmin.map((item: any, index: number) => (
              <Option key={index} value={item?.emp_id}>
                {item?.emp_id} - {item?.emp_name}
              </Option>
            ))}
        </Select>
      ),
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
            setFormDataCreate({ ...formDataCreate, listGroup: e })
            // setFormDataCreate({ ...formDataCreate, listGroup: e?.join(",") })
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
            <div className={`${styles.input_item_time} flex_between`}>
              -
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
                type="datetime-local"
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
      render: () => (
        <div onClick={() => setIsModalOpen(true)} style={{ color: '#4c5bd4', cursor: 'pointer' }}>{count}</div>
      ),
    },
    {
      title: "Đề xuất",
      fixed: "right",
      dataIndex: "propose",
      width: 100,
      render: () => <Button onClick={handlePropose}>Gửi</Button>,
    },
  ];
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
      // render: (value, record, index) => (
      //   <div onClick={() => {
      //     console.log(record)
      //     setDataGroupCustomer(record.list)
      //     setIsModalOpen(true)
      //   }} style={{ color: '#4c5bd4', cursor: 'pointer' }}>99</div>
      // ),
    },
    {
      title: "Xét duyệt",
      fixed: "right",
      dataIndex: "approval",
      width: 200,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button disabled={new Date(record.time_start).getTime() < Date.now()} onClick={() => handleOneProposed(record.key, 2)}>
            Duyệt
          </Button>
          <Button onClick={() => handleOneProposed(record.key, 3)}>
            Từ chối
          </Button>
        </div>
      ),
    },
  ];
  const columnHistory: ColumnsType<any> = [
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
      render: (value) => (
        <div>
          {value.length == 0 && (
            <div>Tất cả</div>
          )}
          {value.length > 0 && (
            <div>
              {value.map((tmp, index) => (
                <div key={index}>{tmp}</div>
              ))
              }
            </div>
          )}
        </div>
      ),
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
    },
    {
      title: "Số lượng",
      dataIndex: "count_phone",
      width: 150,
      // render: (value, record, index) => (
      //   <div onClick={() => {
      //     console.log(record)
      //     setDataGroupCustomer(record.list)
      //     setIsModalOpen(true)
      //   }} style={{ color: '#4c5bd4', cursor: 'pointer' }}>99</div>
      // ),
    },
    {
      title: "Trạng thái đề xuất",
      dataIndex: "status",
      width: 150,
      render: (value) => (
        <div>{value == 1 ? 'Đang chờ duyệt' : value == 2 ? 'Đã duyệt' : 'Từ chối'}</div>
      ),
    },
    {
      title: "Trạng thái chạy",
      // fixed: "right",
      dataIndex: "status_doing",
      width: 100,
    },
    {
      title: " ",
      fixed: "right",
      width: 100,
      render: (value, record, index) => (
        <Link
          href={{
            pathname: '/thong-ke-ai365',
            query: { idSchedule: record._id }
          }}
          target="_blank">
          Xem chi tiết
        </Link>
      )
    },
  ];

  const handleSelectChange = (value) => {
    console.log(value)
    if (value[value.length - 1] === 2) {
      // Nếu giá trị chọn là 2 (Tất cả), chỉ giữ lại giá trị 2
      setFormDataCreate({ ...formDataCreate, emp_id: [2] });
    } else {
      const new_value = value.filter(item => item !== 2)
      // Nếu giá trị chọn không phải là 2, giữ lại tất cả các giá trị khác
      setFormDataCreate({ ...formDataCreate, emp_id: new_value });
    }
  };
  const handlePropose = () => {
    // for (const key in formDataCreate) {
    //   if (!formDataCreate[key]) {
    //     notifyError("Chọn đầy đủ thông tin");
    //     return;
    //   }
    // }
    if (count == 0) {
      notifyError("Không có kết quả phù hợp");
      return;
    }
    axiosCRMCall
      .post("/scheduleAutoCall/suggest", formDataCreate)
      .then(() => {
        setFormDataCreate({ ...formDataCreate, recall: false });
        notifySuccess("Thành công");
      })
      .catch((err) => notifyError());
  };
  const handleGroup = async (datas) => {
    const convert = await datas?.map((item) => ({
      value: item.gr_id,
      label: item.gr_name,
    }));
    setListGroup(convert);
  };
  const handleChangeSearch = async (e) => {
    const { name, value } = e.target;
    if (value) {
      const timeStamp = name === 'timeEndUpdate' ? new Date(`${value} 23:59:59`) : new Date(`${value}`)
      setFormDataCreate({ ...formDataCreate, [name]: timeStamp.getTime() / 1000 });
    } else {
      setFormDataCreate({ ...formDataCreate, [name]: 0 });
    }
  };
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
      .post("/scheduleAutoCall/duyet", {
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
      .post("/scheduleAutoCall/duyet", {
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
    <>
      <Table
        scroll={{ x: 1700 }}
        columns={columnCreate}
        dataSource={[dataTable]}
        pagination={false}
      />
      <p style={{ margin: "20px 0 10px 0", fontWeight: "600" }}>
        {" "}
        Danh sách đã đề xuất
      </p>
      <div>
        {selectedRowKeys.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
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

        <Table
          rowSelection={rowSelection}
          scroll={{ x: 1700 }}
          columns={columns}
          dataSource={dataTable.length > 0 ? dataTable : [dataTable]}
        />
        <Modal
          title="Chi tiết"
          open={isModalOpen}
          width={600}
          bodyStyle={{ maxHeight: '40vh', overflowY: 'auto' }}
          footer={[
            <Button key="submit" type="primary" onClick={() => setIsModalOpen(false)}>
              OK
            </Button>,
          ]}
        >
          {dataGroupCustomer?.map(item => (
            <div key={item.id}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.group_name} ({item.count})</div>
              {item.list.map((tmp, index) => (
                <div key={index}>
                  <span>{tmp.phone_number} - </span>{tmp.name}
                </div>
              ))}
            </div>
          ))}
        </Modal>
        <ToastContainer autoClose={2000} />
      </div>
      <p style={{ margin: "20px 0 10px 0", fontWeight: "600" }}>
        {" "}
        Lịch sử
      </p>
      <Table
        scroll={{ x: 1700 }}
        columns={columnHistory}
        dataSource={dataHistory}
      />
    </>
  );
}

export default PhoneCompany;
