import React, { useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { MInputText } from "@/components/commodity/input";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  convertStringToTimestamp,
  convertTimeToDate,
  convertTimestampToDate,
  decodeToken,
} from "@/utils/function";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { useRouter } from "next/router";
type TypePointTable = {
  _id: string;
  emp_id: number;
  type: string;
  point: number;
  created_at: number;
  userName: string;
};
export default function TableHisAddPointComp() {
  const router = useRouter();
  const { com_id, userType, userName } = decodeToken();
  const [formData, setFormData] = useState<any>({});
  const [historyList, setHistoryList] = useState([]);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle(`Lịch sử cộng điểm`);
    setShowBackButton(true);
    setCurrentPath("/customer/point/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const columns: ColumnsType<TypePointTable> = [
    {
      title: "ID đề xuất",
      key: "_id",
      dataIndex: "_id",
      render(value, record, index) {
        return (
          <p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/customer/point/detail/${record._id}`);
              }}
            >
              {value}
            </span>
          </p>
        );
      },
    },
    {
      title: "Tên nhân viên",
      key: "userName",
      dataIndex: "userName",
      render(value, record, index) {
        return `${record.emp_id}. ${record.userName}`;
      },
    },
    { title: "Số điểm", 
      key: "point", 
      dataIndex: "point" ,
      render(value, record, index) {
        if(record.type == "ADD"){
          return (
            <>
              <p style={{color:"green"}}>
                +{record.point}
              </p>
            </>
          )
        }
        else{
          return (
            <>
              <p style={{color:"red"}}>
                -{record.point}
              </p>
            </>
          )
        }
      
      },
  },
    {
      title: "Thời gian",
      key: "created_at",
      dataIndex: "created_at",
      render(value, record, index) {
        return convertTimestampToDate(value);
      },
    }
  ];
  const getHistoryAddPoint = () => {
    axiosCRMv2("/customer/TakeHistoryAddPointCom", {
      com_id,
      start: convertStringToTimestamp(formData.start),
      end: convertStringToTimestamp(formData.end),
    })
      .then((res) => setHistoryList(res.listHistory))
      .catch((err) => {});
  };
  useEffect(() => {
     getHistoryAddPoint();
  }, [formData.start, formData.end]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <MInputText
          type="datetime-local"
          setFormData={setFormData}
          name="start"
          value={formData.start}
          label="Từ"
        />
        <MInputText
          type="datetime-local"
          setFormData={setFormData}
          name="end"
          value={formData.end}
          label="Đến"
        />
      </div>
      <Table columns={columns} dataSource={historyList} />
    </>
  );
}
