import { Input, Modal, Table } from "antd";
import stylesBtn from "@/styles/crm/button.module.css";

import style from "@/components/crm/customer/group_customer/modal_share.module.css";
import type { ColumnsType } from "antd/es/table";
import React, { useContext, useEffect, useState } from "react";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { axiosCRM } from "@/utils/api/api_crm";
import {
  convertTimestampToDate,
  toLowerCaseNonAccentVietnamese,
} from "@/utils/function";
import useLoading from "../../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";
import { ExcelDownload } from "@/components/commodity/excelDownload";
import { useFormData } from "../../context/formDataContext";

interface TypeShareProps {
  isOpenModalShare: boolean;
  setIsOpenModalShare: (value: boolean) => void;
  IdGroup?: number;
}
interface TableType {
  key: React.Key;
  stt: number;
  userName: string;
  organization: string;
  position: number;
  address: string;
  idQLC: string[];
  date_add: any;
}

export const ModalGroupCustomerShare: React.FC<TypeShareProps> = React.memo(
  ({ isOpenModalShare, setIsOpenModalShare, IdGroup }) => {
    const [listEmpTable, setListEmpTable] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [tableShow, setTableShow] = useState<any>([]);
    const { isLoading, handleLoading, startLoading } = useLoading();
    const [searchName, setSearchName] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
    useEffect(() => {
      const currentCookie = getToken("token_base365");
      if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
        setCompanyId(decodedToken?.data?.com_id);
      }
    }, []);
    const { formData } = useContext(useFormData);
    const columns: ColumnsType<TableType> = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: 100,
        render(value, record, index) {
          return index + 1;
        },
      },
      {
        title: "Tên",
        dataIndex: "userName",
        key: "userName",
        width: 250,
      },
      {
        title: "Tổ chức",
        dataIndex: "organization",
        key: "organization",
        width: 250,
      },
      {
        title: "Vị trí",
        dataIndex: "position",
        width: 200,
        key: "position",
      },
      {
        title: "idQLC",
        dataIndex: "idQLC",
        width: 150,
        key: "idQLC",
      },
      {
        title: "Ngày áp dụng",
        dataIndex: "date_add",
        width: 150,
        key: "date_add",
      },
      {
        title: "Thao tác",
        dataIndex: "idQLC",
        width: 100,
        key: "idQLC",
        render: (data, record) => (
          // <Tooltip title={data}>
          <div
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => HandleDeleteUserFromFroup(Number(record.idQLC))}
          >
            Xóa
          </div>
          // </Tooltip>
        ),
      },
    ];
    const fetchTakeListUser = () => {
      axiosCRM
        .post("/account/TakeListUserFromGroup", { IdGroup, companyId })
        .then((res) => {
          setListEmpTable(
            res.data.data.listUser.map((emp) => ({
              ...emp,
              date_add: emp.date_add
                ? convertTimestampToDate(emp.date_add)
                : "Chưa cập nhập",
            }))
          );
          setTableShow(
            res.data.data.listUser.map((emp) => ({
              ...emp,
              date_add: emp.date_add
                ? convertTimestampToDate(emp.date_add)
                : "Chưa cập nhập",
            }))
          );
        })
        .catch((err) => console.log("ModalGroupCustomerShare", err));
    };
    useEffect(() => {
      if (IdGroup && companyId) {
        handleLoading(fetchTakeListUser);
      }
    }, [IdGroup, formData.recall]);
    useEffect(() => {
      if (!searchDepartment && !searchName) {
        setTableShow(listEmpTable);
        return;
      }
      setTableShow(
        listEmpTable?.filter(
          (emp) =>
            toLowerCaseNonAccentVietnamese(emp.organization)?.includes(
              toLowerCaseNonAccentVietnamese(searchDepartment)
            ) &&
            (toLowerCaseNonAccentVietnamese(emp.userName)?.includes(
              toLowerCaseNonAccentVietnamese(searchName)
            ) ||
              emp.idQLC.toString()?.includes(searchName) ||
              emp.phoneTK?.includes(searchName))
        )
      );
    }, [searchDepartment, searchName]);
    const HandleDeleteUserFromFroup = async (idQLC: any) => {
      try {
        axiosCRM
          .post("/account/DeleteUserFromCart", {
            IdCart: IdGroup,
            IdCrm: idQLC,
          })
          .then((res) => {
            fetchTakeListUser();
          })
          .catch((err) => console.log("ModalGroupCustomerShare", err));
      } catch (e) {
        console.log("err HandleDeleteUserFromFroup", e);
        return false;
      }
    };
    const handleExportExcel = () => {
      const title = [
        "STT",
        "Tên",
        "Tổ chức",
        "Vị trí",
        "idQLC",
        "Ngày áp dụng",
      ];
      const data = tableShow.map((item, index) => [
        index + 1,
        item.userName,
        item.organization,
        item.position,
        item.idQLC,
        item.date_add,
      ]);
      ExcelDownload([title, ...data], `Danh sách nhân viên được chia sẻ`);
    };
    return (
      <>
        <div className={style.modal_share}>
          {" "}
          <Modal
            // title={"Đối tượng được chia sẻ"}
            centered
            footer={null}
            open={isOpenModalShare}
            onCancel={() => {
              setIsOpenModalShare(false);
            }}
            className={"mdal_default"}
            width={1400}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  <p
                    style={{
                      width: "250px",
                      display: "block",
                    }}
                  >
                    Tìm kiếm phòng ban
                  </p>
                  <Input
                    onChange={(e) => setSearchDepartment(e.target.value)}
                    placeholder="Nhập tên phòng ban"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                    margin: " 0 20px",
                  }}
                >
                  <p style={{ width: "240px", display: "block" }}>
                    Tìm kiếm nhân viên
                  </p>
                  <Input
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Nhập tên, id của nhân viên"
                  />
                </div>
              </div>
            </div>

            {isLoading ? (
              <LoadingLayout />
            ) : (
              <>
                <Table
                  columns={columns}
                  dataSource={tableShow}
                  scroll={{ y: 500 }}
                  bordered
                  pagination={{
                    pageSize: 100,
                  }}
                />
                <button
                  style={{ marginTop: "10px" }}
                  type="button"
                  onClick={handleExportExcel}
                  className={`${stylesBtn.btn_excel}`}
                >
                  <img src="/crm/icon_excel.svg" />
                  Xuất excel
                </button>
              </>
            )}
          </Modal>
        </div>
      </>
    );
  }
);
