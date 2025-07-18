import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import btnStyles from "@/styles/crm/button.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import ModalAddPoint from "@/components/crm/customer/point/modal_add";
import {
  convertStringToTimestamp,
  convertTimestampToDate,
  convertTimestampToFull,
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
  _id: string;
  userName: string;
  creator: number;
  createAt: number;
  status: number;
};
export default function PointList() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const { formData, handleRecall } = useContext(useFormData);
  const [page, setPage] = useState(1);

  const { com_id, userType, idQLC } = decodeToken();
  const [proposeList, setProPoseList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    com_id &&
      axiosCRMv2("/account/takeListNvienKinhDoanh", { com_id })
        .then((res) =>
          setEmpList(
            res?.listUser?.map((item) => ({
              value: item?.ep_id,
              label: `${item.ep_id}. ${item.userName}`,
              phoneTK: item.phoneTK,
            }))
          )
        )
        .catch((err) => {});
  }, [com_id]);
  useEffect(() => {
    setHeaderTitle("Đề xuất cộng điểm");
    setShowBackButton(false);
    // setCurrentPath("/customer/roup/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const getProposeList = async () => {
    axiosCRMv2("/customer/TakeListDeXuat", {
      ...formData,
      start: convertStringToTimestamp(formData.start),
      end: convertStringToTimestamp(formData.end),
      page,
      size: 20,
      com_id,
      ...(userType != 1 ? { emp_id: idQLC } : {}),
    }).then((res) => setProPoseList(res.listDexuat));
  };
  useEffect(() => {
    if (com_id) {
      getProposeList();
    } else {
    }
  }, [formData?.start, formData.end, formData.emp_id, page, formData.recall]);
  const columns: ColumnsType<TypeTablePointList> = [
    {
      title: "Tên nhân viên",
      dataIndex: "userName",
      key: "userName",
      render(value, record, index) {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/customer/point/detail/${record._id}`)}
          >
            {record.creator}. {record.userName}
          </div>
        );
      },
    },
    {
      title: "số điểm",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render(value, record, index) {
        return convertTimestampToDate(value);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render(value, record, index) {
        return Number(value) == 1 ? (
          <p style={{ color: "#2AC012" }}>Đã duyệt</p>
        ) : (
          <p style={{ color: "#FF6E39" }}>Chưa duyệt</p>
        );
      },
    },
    ...(userType == 1
      ? [
          {
            title: "Xử lý",
            dataIndex: "action",
            key: "action",
            render(value, record, index) {
              return (
                <>
                  {Number(!record.status) ? (
                    <div>
                      <button onClick={() => handleAcceptPropose(record._id)}>
                        Duyệt
                      </button>
                      <button
                        style={{ color: "red", marginLeft: "15px" }}
                        onClick={() => handleDeletePropose(record._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  ) : (
                    <p style={{ color: "#2AC012" }}>Đã duyệt</p>
                  )}
                </>
              );
            },
          },
        ]
      : []),
  ];
  const handleAcceptPropose = async (idPropose) => {
    await axiosCRMv2("/customer/DuyetDexuatCongDiem", {
      IdDeXuat: idPropose,
      company: com_id,
    });
    alert("Đã duyệt đề xuất");
    handleRecall();
  };
  const handleDeletePropose = async (idPropose) => {
    await axiosCRMv2("/customer/DeleteDeXuat", {
      IdDeXuat: idPropose,
    });
    alert("Đã xóa đề xuất");
    handleRecall();
  };
  return (
    <div ref={mainRef} className={styleHome.main}>
      <div style={{ display: "flex", gap: "20px" }}>
        {userType == 1 && (
          <SelectSingleV2
            data={empList}
            name="emp_id"
            label={"Nhân viên"}
            placeholder="Chọn nhân viên"
          />
        )}

        <MInputTextV2 placeholder="" type="datetime-local" name="start" label="Từ" />
        <MInputTextV2 placeholder="" type="datetime-local" name="end" label="Đến" />
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
            onClick={() => router.push("/customer/point/point-table")}
          >
            Bảng điểm
          </button>
          {userType != 1 && (
            <button
              className={btnStyles.button_primary}
              onClick={() => setIsOpenModalAdd(true)}
            >
              Tạo đề xuất
            </button>
          )}
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
      <ModalAddPoint
        isOpenModalAdd={isOpenModalAdd}
        setIsOpenModalAdd={setIsOpenModalAdd}
      />
    </div>
  );
}
