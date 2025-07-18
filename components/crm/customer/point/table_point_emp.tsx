import { axiosCRMv2 } from "@/utils/api/api_crm";
import { convertTimestampToDate, decodeToken } from "@/utils/function";
import { ColumnsType } from "antd/es/table";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import btnStyle from "@/styles/crm/button.module.css";
import { useHeader } from "../../hooks/useHeader";
import { useRouter } from "next/router";
import { SelectSingleV2 } from "../../input_select/select";
import { useFormData } from "../../context/formDataContext";
import * as XLSX from 'xlsx'

type TypeTakeTablePointCom = {
  _id: string;
  idKinhDoanh: number;
  point: number;
  updatedAt: number;
  userName: string;
};
export default function TablePointCompany() {
  const router = useRouter();
  const [pointCompList, setPointComList] = useState([]);
  const { com_id, idQLC, userType, userName } = decodeToken();
  const { formData } = useContext(useFormData);
  const [empKDList, setEmpKDList] = useState([]);
  const [dateExportExcel,setDateExportExcel] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    userType == 1
      ? setHeaderTitle("Bảng điểm của nhân viên")
      : setHeaderTitle(`Bảng điểm của ${userName}`);
    setShowBackButton(true);
    setCurrentPath("/customer/point/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const getPointComp = () => {
    axiosCRMv2("/customer/TakeTablePointCom", {
      com_id,
      ...(userType != 1 ? { emp_id: idQLC } : {}),
      ...formData,
    })
      .then((res) => setPointComList(res.bangdiem))
      .catch((err) => {});
  };
  const getListNVKD = async () => {
    axiosCRMv2("/account/takeListNvienKinhDoanh", { com_id }).then((res) =>
      setEmpKDList(
        res?.listUser?.map((item) => ({
          value: item.ep_id,
          label: `${item.ep_id}. ${item.userName}`,
          phoneTK: item.phoneTK,
        }))
      )
    );
  };
  useEffect(() => {
    getPointComp();
  }, [formData?.emp_id]);
  useEffect(() => {
    getListNVKD();
  }, [com_id]);
  const columns: ColumnsType<TypeTakeTablePointCom> = [
    {
      title: "Tên nhân viên",
      key: "userName",
      dataIndex: "userName",
      render(value, record, index) {
        return `${record.idKinhDoanh}. ${record.userName}`;
      },
    },
    {
      title: "Tổng số điểm hiện có",
      key: "point",
      dataIndex: "point",
    },
    {
      title: "Ngày cập nhập",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render(value, record, index) {
        return convertTimestampToDate(value);
      },
    },
  ];

  const handleChooseDate = async (e:any)=>{
    try{
       let value = e.target.value;
       setDateExportExcel(value);
       return true;
    }
    catch(e){
       console.log("handleChooseDate",e);
       return false;
    }
  }
  
  const downloadExcel = (data:any, nameFile:any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, nameFile);
  };
  const handleExportExcel = async ()=>{
    try{
        let response = await axiosCRMv2("/customer/HistoryPointDayCom", { 
            year:Number(dateExportExcel.split("-")[0]),
            month:Number(dateExportExcel.split("-")[1]),
            day:Number(dateExportExcel.split("-")[2]),
            com_id:idQLC
        });
        let array = response.finalResult;
        let tempt = [];
        for(let i=0; i< array.length ; i++){
             tempt.push({
                "ID":array[i].idQLC,
                "Tên":array[i].userName,
                "Tổ chức":array[i].organizationName,
                "Điểm cộng":array[i].pointAdd,
                "Điểm trừ":array[i].pointSub
             })
        };
        let nameFile = `Bảng điểm ngày ${dateExportExcel.split("-")[2]}-${dateExportExcel.split("-")[1]}-${dateExportExcel.split("-")[0]}.xlsx`;
        downloadExcel(tempt,nameFile);
    }
    catch(e){
        console.log("handleExportExcel",e);
        return false;
    }
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: userType == 1 ? "space-between" : "flex-end",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {userType == 1 && (
          <div style={{ width: "40%" }}>
            <SelectSingleV2
              name={"emp_id"}
              label={"Nhân viên"}
              data={empKDList}
              placeholder="Chọn nhân viên"
            />
          </div>
        )}

        <button
          onClick={() => router.push("/customer/point/history")}
          className={btnStyle.btn_add}
        >
          Lịch sử
        </button>
        
      </div>

      <Table columns={columns} dataSource={pointCompList} />
    </div>
  );
}
