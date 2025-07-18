import { Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import {
  decodeToken,
  notifyError,
  notifySuccess,
  toLowerCaseNonAccentVietnamese,
} from "@/utils/function";
import { axiosCRM } from "@/utils/api/api_crm";
import { SelectSingleAndOption } from "@/components/commodity/select";
import LoadingLayout from "@/constants/LoadingLayout";
import type { ColumnsType } from "antd/es/table";
import { axiosQLC } from "@/utils/api/api_qlc";
import { ToastContainer } from "react-toastify";
import style from "@/components/crm/customer/group_customer/modal_share.module.css";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";

type TableType = {
  gr_id: number;
  gr_name: string;
};

function FilterCart() {
  const { isLoading, handleLoading } = useLoading();
  const [isOpenModalFilterCart, setIsOpenModalFilterCart] = useState(false);
  const [listEmpKD, setListEmpKD] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listCart, setListCart] = useState([]);
  const [listCartShow, setListCartShow] = useState([]);
  const [formData, setFormData] = useState<any>({
    recall: true,
    ep_status: "Active",
    pageNumber: 1,
    pageSize: 1000000,
  });
  const { com_id } = decodeToken();
  const [company_id, setCompanyId] = useState(null);

  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
    }
  }, []);
  useEffect(() => {
    //getlistDepartment
    company_id &&
      axiosQLC
        .post("/organizeDetail/listAll", { com_id: company_id })
        .then((res) =>
          setListDepartment(
            res.data.data.data?.map((dp) => ({
              value: dp.listOrganizeDetailId,
              label: dp.organizeDetailName,
            }))
          )
        )
        .catch((err) => console.log("getListDepartment", err));
  }, [company_id]);
  const getListAllNvienKinhDoanh = () => {
    axiosCRM
      .post("/account/takeListNvienKinhDoanh", { com_id })
      .then((res) =>
        setListEmpKD(
          res.data.data.listUser?.map((emp) => ({
            value: emp.ep_id,
            label: `${emp.ep_id}. ${emp.userName}`,
            phoneTK: emp.phoneTK,
          }))
        )
      )
      .catch((err) => console.log("FilterCart", err));
  };
  const getListNVKDofDepartment = () => {
    axiosQLC
      .post("/managerUser/listUser", formData)
      .then((res) => {
        setListEmpKD(
          res.data.data.data?.map((emp) => ({
            value: emp.ep_id,
            label: `${emp.ep_id}. ${emp.userName}`,
            phoneTK: emp.phoneTK,
          }))
        );
      })
      .catch((err) => console.log("errgetListNVKDofDepartment", err));
  };
  useEffect(() => {
    if (com_id) {
      if (formData.listOrganizeDetailId) {
        getListNVKDofDepartment();
      } else {
        getListAllNvienKinhDoanh();
      }
    }
  }, [formData.listOrganizeDetailId, com_id]);
  const getListCart = () => {
    axiosCRM
      .post("/account/TakeListGroupOfUser", formData)
      .then((res) => {
        setListCart(res.data.data.ListGroup);
        setListCartShow(res.data.data.ListGroup);
      })
      .catch((err) => console.log("ErrrgetListCart", err));
  };
  useEffect(() => {
    if (formData.IdCRM) {
      handleLoading(getListCart);
    }
  }, [formData.IdCRM, formData.recall]);
  const handleDeleteCart = (IdCart) => {
    axiosCRM
      .post("/account/DeleteUserFromCart", { ...formData, IdCart: IdCart })
      .then((res) => {
        setFormData({ ...formData, recall: !formData.recall });
        notifySuccess("Xóa thành công!");
      })
      .catch((err) => notifyError());
  };
  const columns: ColumnsType<TableType> = [
    {
      title: "ID giỏ khách hàng",
      width: 200,
      dataIndex: "gr_id",
      key: "gr_id",
    },
    {
      title: "Tên nhóm khách hàng",
      width: 500,
      dataIndex: "gr_name",
      key: "gr_name",
    },
    {
      title: "Thao tác",
      width: 100,
      dataIndex: "action",
      key: "action",
      render(value, record, index) {
        return (
          <div
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteCart(record.gr_id)}
          >
            Xóa
          </div>
        );
      },
    },
  ];
  const handleSearchEmp = (search) => {
    if (!search) {
      setListCartShow(listCart);
    } else {
      setListCartShow(
        listCart?.filter(
          (cart) =>
            toLowerCaseNonAccentVietnamese(cart.gr_name)?.includes(
              toLowerCaseNonAccentVietnamese(search)
            ) || cart.gr_id.toString()?.includes(search)
        )
      );
    }
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <LoadingLayout />
        ) : (
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%", marginRight: "30px" }}>
              <SelectSingleAndOption
                title="Danh sách tổ chức"
                data={listDepartment}
                setFormData={setFormData}
                formData={formData}
                name={"listOrganizeDetailId"}
                placeholder="Chọn tổ chức"
              />
            </div>
            <div style={{ width: "50%" }}>
              <SelectSingleAndOption
                title="Giỏ của nhân viên"
                data={listEmpKD}
                setFormData={setFormData}
                formData={formData}
                name={"IdCRM"}
                handleChange={() => setIsOpenModalFilterCart(true)}
                placeholder="Chọn nhân viên"
              />
            </div>
          </div>
        )}

        <ToastContainer autoClose={2000} />
      </div>{" "}
      <div className={style.modal_share}>
        {" "}
        <Modal
          title={`Chuyên viên ${listEmpKD
            .find((emp) => emp.value == formData.IdCRM)
            ?.label?.split(".")
            ?.reverse()
            ?.join(" - ")}`}
          centered
          footer={null}
          open={isOpenModalFilterCart}
          onCancel={() => {
            setIsOpenModalFilterCart(false);
          }}
          className={"mdal_default"}
          width={1000}
          style={{ paddingTop: 20 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "50px",
              marginLeft: "20px",
            }}
          >
            <label style={{ width: "150px", marginRight: "30px" }}>
              Tên nhóm khách hàng
            </label>
            <Input
              style={{ width: "80%" }}
              placeholder="Nhập ID, tên nhóm khách hàng"
              onChange={(e) => handleSearchEmp(e.target.value)}
              prefix={<div></div>}
            />
          </div>

          {isLoading ? (
            <LoadingLayout />
          ) : (
            <Table
              columns={columns}
              dataSource={listCartShow}
              scroll={{ y: 400 }}
              bordered
              pagination={{
                pageSize: 100,
              }}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}

export default FilterCart;
