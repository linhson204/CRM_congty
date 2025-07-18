import styles from "@/components/crm/potential/potential.module.css";
import axios from "axios";
import { Button, Select, Table, Modal, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import {
  convertTimestampToFull,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/function";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { current } from "@reduxjs/toolkit";
import { pointer } from "d3";
import Link from "next/link";

interface DataType {
  key: string;
  emp_name: string;
  listGroup: any[];
  time: string;
  appointmentTime: string;
  index: number;
}
interface DataTableType {
  _id: string,
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
  listGroup: any;
  timeStartUpdate: number;
  timeEndUpdate: number;
  timeStart: number;
  recall: boolean;
};
function PhoneEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataTableStatus, setDataTableStatus] = useState([]);
  const [dataGroupCustomer, setDataGroupCustomer] = useState([]);
  const [fileRecord, setFileRecord] = useState({
    file: null,
    recall: true,
    audioKey: 0
  });
  const [dataTable, setDataTable] = useState<any>();
  const [formData, setFormData] = useState<TypeFormPropose>({
    listGroup: [],
    timeStartUpdate: 0,
    timeEndUpdate: 0,
    timeStart: 0,
    recall: true,
  });
  const [listGroup, setListGroup] = useState([]);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  //Lấy userName
  const currentCookie = getToken("token_base365");
  useEffect(() => {
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setDataTable({ ...dataTable, emp_name: decodedToken?.data.userName, emp_id: decodedToken?.data.idQLC });
    }
  }, []);
  useEffect(() => {
    setHeaderTitle("Danh sách số điện thoại");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
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
  //Lấy file ghi âm
  useEffect(() => {
    const decodedToken: any = jwt_decode(currentCookie);
    axios.post(
      `https://voip.timviec365.vn/api/GetFileRecord`,
      {
        emp_id: decodedToken.data.idQLC
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((res) => {
      setFileRecord({ ...fileRecord, file: res.data.data.file })
    })
      .catch((err) => {
        console.log(err)
        notifyError("Vui lòng thử lại sau");
      });
  }, [fileRecord.recall]);
  //Lấy số lượng
  useEffect(() => {
    if (
      formData.listGroup &&
      formData.timeStartUpdate &&
      formData.timeEndUpdate
    ) {
      axiosCRMCall
        .post("/scheduleAutoCall/getGroupCustomer", formData)
        .then((res) => {
          res.data.data.data.length > 0 ? setDataGroupCustomer(res.data.data.data) : setDataGroupCustomer([])
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
  const count = dataGroupCustomer.reduce((total, current) => {
    return total + Number(current.count)
  }, 0)
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
            setFormData({ ...formData, listGroup: e })
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
        <div onClick={handleShowModal} style={{ color: '#4c5bd4', cursor: 'pointer' }}>{count}</div>
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
      title: "Trạng thái đề xuất",
      dataIndex: "status",
      width: 150,
      render: (value) => (
        <div>{value == 1 ? 'Đang chờ duyệt' : value == 2 ? 'Đã duyệt' : 'Từ chối'}</div>
      ),
    },
    {
      title: "Trạng thái chạy",
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
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleChangeSearch = async (e) => {
    const { name, value } = e.target;
    if (value) {
      const timeStamp = name === 'timeEndUpdate' ? new Date(`${value} 23:59:59`) : new Date(`${value}`)
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
      .post("/scheduleAutoCall/suggest", formData)
      .then(() => {
        setFormData({ ...formData, recall: false });
        notifySuccess("Thành công");
      })
      .catch((err) => notifyError());
  };
  const props: UploadProps = {
    name: 'file',
    accept: 'audio/*,.aac',
    maxCount: 1,
    // disabled: true,
    showUploadList: false,
    method: 'POST',
    action: 'https://voip.timviec365.vn/api/UploadRecord',
    headers: {
      Authorization: `Bearer ${currentCookie}`,
    },
    beforeUpload: (file) => {
      const MAX_FILE_SIZE_MB = 5
      const check_size_file = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
      if (!check_size_file) {
        notifyError(`Vượt quá giới hạn kích thước file ${MAX_FILE_SIZE_MB}MB`);
        return false
      }
      return true
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        if (info.file.response.data) {
          notifySuccess('Upload thành công')
          setFileRecord({ ...fileRecord, recall: !fileRecord.recall, audioKey: fileRecord.audioKey + 1 })
        }
        else {
          notifyError(info.file.response.error.message);
        }
      } else if (info.file.status === 'error') {
        notifyError('Đã có lỗi xảy ra');
      }
    },
  };
  return (
    <div>
      <div style={{ margin: '8px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload file ghi âm</Button>
        </Upload>
        {fileRecord.file && (
          <audio
            key={fileRecord.audioKey}
            style={{ height: '32px', backgroundColor: '#f1f3f' }}
            src={fileRecord.file}
            controls>
          </audio>
        )}
        {!fileRecord.file && (
          <div style={{ margin: '16px' }}>Chưa cài đặt ghi âm</div>
        )}
      </div>
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
      <Modal
        title="Chi tiết"
        open={isModalOpen}
        width={600}
        bodyStyle={{ maxHeight: '40vh', overflowY: 'auto' }}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {dataGroupCustomer.map(item => (
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
  );
}

export default PhoneEmployee;
