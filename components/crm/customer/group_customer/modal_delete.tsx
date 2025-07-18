import { Modal } from "antd";
import stylesBtn from "./customer_group.module.css";
import { useEffect, useMemo, useState } from "react";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/function";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";

import { SelectSingleAndOption } from "@/components/commodity/select";

import { ToastContainer } from "react-toastify";
import { axiosCRM } from "@/utils/api/api_crm";
import { axiosQLC } from "@/utils/api/api_qlc";
import useLoading from "../../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";

interface TypeDeleteProps {
  isOpenModalDelete: boolean;
  setIsOpenModalDelete: (value: boolean) => void;
}
export const ModalGroupCustomerDelete: React.FC<TypeDeleteProps> = ({
  isOpenModalDelete,
  setIsOpenModalDelete,
}) => {
  const [formData, setFormData] = useState<any>({
    ep_status: "Active",
    pageNumber: 1,
    pageSize: 1000000,
  });
  const [listEmp, setListEmp] = useState([]);
  const [listEmpAll, setListEmpAll] = useState([]);
  const [company_id, setCompanyId] = useState(null);
  const { isLoading, handleLoading } = useLoading();
  const [listDepartment, setListDepartment] = useState([]);

  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
    }
  }, []);
  // const getListAllNvienKinhDoanh = () => {
  //   company_id &&
  //     axiosCRM
  //       .post("/account/takeListNvienKinhDoanh", { com_id: company_id })
  //       .then((res) => {
  //         setListEmp(
  //           res.data.data.listUser?.map((emp) => ({
  //             value: emp.ep_id,
  //             label: `${emp.ep_id}. ${emp.userName}`,
  //             phoneTK: emp.phoneTK,
  //           }))
  //         );
  //       })
  //       .catch((err) => console.log("FilterCart", err));
  // };
  const getListDepartment = useMemo(() => {
    if (company_id) {
      return axiosQLC
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
    }
  }, [company_id]);
  const fetchListEmp = useMemo(() => {
    return axiosQLC
      .post("/managerUser/listUser", {
        pageSize: 10000,
        authentic: 1,
      })
      .then((res) =>
        setListEmpAll(
          res.data.data.data?.map((emp) => ({
            value: emp.ep_id,
            label: `${emp.ep_id}. ${emp.userName}`,
            phoneTK: emp.phoneTK,
          }))
        )
      )
      .catch((err) => console.log("err", err));
  }, [company_id]);

  const getListNVKDofDepartment = () => {
    axiosQLC
      .post("/managerUser/listUser", formData)
      .then((res) => {
        setListEmp(
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
    if (!formData.listOrganizeDetailId) {
      setListEmp([]);
    }
    formData.listOrganizeDetailId && handleLoading(getListNVKDofDepartment);
  }, [formData.listOrganizeDetailId]);

  const handleDeleteCart = () => {
    if (!formData.idCRM) {
      notifyWarning("Vui lòng chọn giỏ!");
      return;
    }
    axiosCRM
      .post("/account/deleteCart", formData)
      .then((res) => {
        notifySuccess("Xoá thành công!");
        setFormData({});
        setTimeout(() => {
          setIsOpenModalDelete(false);
        }, 1700);
      })
      .catch((err) => {
        notifyError();
      });
  };
  return (
    <>
      <Modal
        title={"Xóa giỏ"}
        centered
        footer={null}
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        className={"mdal_default"}
        width={700}
      >
        {isLoading ? (
          <LoadingLayout />
        ) : (
          <div>
            <SelectSingleAndOption
              title="Chọn tổ chức"
              data={listDepartment}
              formData={formData}
              placeholder="Chọn tổ chức"
              value={formData.listOrganizeDetailId}
              setFormData={setFormData}
              name={"listOrganizeDetailId"}
            />{" "}
            <SelectSingleAndOption
              title="Chọn nhân viên"
              data={formData.listOrganizeDetailId ? listEmp : listEmpAll}
              formData={formData}
              value={formData.idCRM}
              setFormData={setFormData}
              placeholder="Chọn nhân viên"
              name={"idCRM"}
              valueAll={listEmp?.map((emp) => emp.value).toString()}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleDeleteCart}
                className={stylesBtn.delete_button}
              >
                Xóa
              </button>
            </div>
          </div>
        )}

        <ToastContainer autoClose={500} />
      </Modal>
    </>
  );
};
