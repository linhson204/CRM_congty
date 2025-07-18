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
  new_id: number;
  new_title: string;
  new_company: string;
  new_user_name: number;
  contentLetter: number;
  timeSendLetter: number;
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
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle("Thư mời phỏng vấn");
    setShowBackButton(false);
    // setCurrentPath("/customer/roup/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const getProposeList = async () => {
    axiosCRMv2("https://api.timviec365.vn/api/timviec/new/getListSetLetter", {...formData, userType, emp_id:idQLC})
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
      title: "Công ty",
      dataIndex: "companyName",
      key: "companyName"
    },
    {
      title: "Nội dung",
      dataIndex: "contentLetter",
      key: "contentLetter",
      render(value, record, index) {
        return <button style={{ color: "#2AC012" }}  onClick={() => handleEditPropose(record.new_id, record.contentLetter)}>Xem</button>
      },
    },
    {
      title: "Gửi lần cuối",
      dataIndex: "timeSendLetter",
      key: "timeSendLetter",
      render(value, record, index) {
        return value?convertTimestampToDateTime(value):"Chưa gửi";
      },
    },
    {
      title: "Xóa",
      dataIndex: "action",
      key: "action",
      render(value, record, index) {
        return (
          <>
            <button
                  style={{ color: "red", marginLeft: "15px" }}
                  onClick={() => handleDeletePropose(record.new_id)}
                >
              Xóa
            </button>
          </>
        );
      },
    },
  ];
  const handleEditPropose = async (newId, content) => {
      setNewId(newId)
      setContent(content)
      setIsOpenModalAdd(true);
  };
  const handleAddPropose = async () => {
    setNewId(0)
    setContent('')
    setIsOpenModalAdd(true);
};
  const handleDeletePropose = async (idPropose) => {
    await axiosCRMv2("https://api.timviec365.vn/api/timviec/new/enableSendLetter", {
      new_id: idPropose,
      enable: 0
    });
    alert("Đã xóa thư mời");
    getProposeList();
  };
  return (
    <div ref={mainRef} className={styleHome.main}>
      <div style={{ display: "flex", gap: "20px" }}>
        <MInputTextV2 placeholder="" type="number" name="newId" label="ID Tin" />
        <MInputTextV2 placeholder="" type="number" name="comId" label="ID công ty" />
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
            <button
              className={btnStyles.button_primary}
              onClick={() => {handleAddPropose()}}
            >
              Thêm
            </button>
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
