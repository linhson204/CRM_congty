import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import btnStyles from "@/styles/crm/button.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import ModalAdd from "@/components/crm/customer/candiLetter/modal_add";
import {
  convertStringToTimestamp,
  convertTimestampToDate,
  convertTimestampToDateTime,
  decodeToken,
} from "@/utils/function";
import { MInputText } from "@/components/commodity/input";
import { MInputTextV2 } from "@/components/crm/input_select/input";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { SelectSingleV2 } from "@/components/crm/input_select/select";
import { useFormData } from "@/components/crm/context/formDataContext";
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { useRouter } from "next/router";

type TypeTablePointList = {
  key: React.Key;
  _id: number,
  new_id: number;
  new_title: string;
  days: number;
  endtime_pin: string;
  type_pin: string;
  site: number;
};
export default function List() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const { formData, handleRecall } = useContext(useFormData);
  const [page, setPage] = useState(1);

  const { com_id, userType, idQLC } = decodeToken();
  const [proposeList, setProPoseList] = useState([]);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [newId, setNewId] = useState(0);
  const [content, setContent] = useState('');
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const dataSite = [
    {
      value: 1,
      label: "Work247"
    },
    {
      value: 2,
      label: "Vieclam88"
    },
    {
      value: 3,
      label: "Tuyendung3s"
    }, {
      value: 4,
      label: "Joblike"
    }, {
      value: 5,
      label: "Timviec365"
    }
  ]
  const dataTypePin = [
    {
      value: 1,
      label: "Ghim hấp dẫn"
    },
    {
      value: 2,
      label: "Ghim tuyển gấp"
    },
    {
      value: 3,
      label: "Ghim lương cao"
    }, {
      value: 4,
      label: "Ghim trang ngành"
    }, {
      value: 5,
      label: "Ghim AI"
    }, {
      value: 6,
      label: "Topmax"
    }, {
      value: 7,
      label: "Standard plus combo"
    }
  ]
  useEffect(() => {
    setHeaderTitle("Danh sách tin bảo lưu");
    setShowBackButton(false);
    // setCurrentPath("/customer/roup/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const getProposeList = async () => {
    axiosCRMv2(
      "https://api.timviec365.vn/api/vanthu/dexuat/listNewReserve", 
      {
        ...formData, 
        userType, 
        emp_id:idQLC
      }
    )
        .then((res) =>{
          console.log('data:',res);
          setProPoseList(res?.listNews)
        }
          
        )
        .catch((err) => {});
  };
  useEffect(() => {
      getProposeList();
  }, []);
  const columns: ColumnsType<TypeTablePointList> = [
    {
      title: "ID tin",
      dataIndex: "new_id",
      key: "new_id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "new_title",
      key: "new_title",
    },
    {
      title: "Nội dung bảo lưu",
      dataIndex: "type_pin",
      key: "type_pin",
      render(value, record, index) {
        let arrText = [];
        value?.split(',')?.map((value:number, i :number)=>{
          // return <p className={styles.offerlist_user}>{value},{i}</p>
          let listTime = record?.endtime_pin?.split(',');
          let timepin = listTime?Math.ceil(Number(listTime[i])/86400):0;
          arrText.push(`${dataTypePin[value-1]?.label}: ${timepin} ngày`)
        })
        return arrText.join('; ');
      },
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      render(value, record, index) {
        return dataSite[value-1]?dataSite[value-1].label:value;
      },
    },
    {
      title: "Khôi phục",
      dataIndex: "action",
      key: "action",
      render(value, record, index) {
        return (
          <>
            <button
                  style={{color: 'rgb(42, 192, 18)', marginLeft: "15px" }}
                  onClick={() => handleRestorePropose(record._id)}
                >
              Khôi phục
            </button>
          </>
        );
      },
    },
  ];
  const handleRestorePropose = async (_id) => {
    await axiosCRMv2("https://api.timviec365.vn/api/vanthu/editdx/RestoreNewGhim", {
      _id
    });
    alert("Đã khôi phục tin ghim");
    getProposeList();
  };
  return (
    <div ref={mainRef} className={styleHome.main}>
      <div style={{ display: "flex", gap: "20px" }}>
        <MInputTextV2 placeholder="" type="number" name="newId" label="ID Tin" />
        <button className={btnStyles.button_primary} style={{alignSelf:"end",marginBottom:'1rem'}}
              onClick={() => getProposeList()}>
                Lọc
        </button>
      </div>
      {userType != 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            columnGap: "10px",
          }}
        >
        </div>
      )}
      <Table
        columns={columns}
        dataSource={proposeList}
        pagination={{
          pageSize: 20,
          onChange(page, pageSize) {
            setPage(Number(page));
          },
        }}
      />
      <ModalAdd
        isOpenModalAdd={isOpenModalAdd}
        setIsOpenModalAdd={setIsOpenModalAdd} 
        newId = {newId}
        content = {content}
      />
    </div>
  );
}
