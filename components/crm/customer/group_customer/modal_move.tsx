import { SelectSingleAndOption } from "@/components/commodity/select";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import stylesBtn from "@/styles//crm/button.module.css";
import styles from "./customer_group.module.css";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { axiosQLC } from "@/utils/api/api_qlc";
import { axiosCRM } from "@/utils/api/api_crm";
import useLoading from "../../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";

function ModalGroupCustomerMove({ isOpenModalMove, setIsOpenModalMove }) {
  const [formData, setFormData] = useState<any>({
    ep_status: "Active",
    pageNumber: 1,
    pageSize: 1000000,
  });
  const [formDataTo, setFormDataTo] = useState<any>({
    ep_status: "Active",
    pageNumber: 1,
    pageSize: 1000000,
  });
  const [listEmpAll, setListEmpAll] = useState([]);

  const [listEmpFrom, setListEmpFrom] = useState([]);
  const [listEmpTo, setListEmpTo] = useState([]);
  const [company_id, setCompanyId] = useState(null);
  const { isLoading, handleLoading } = useLoading();
  const [listGroup, setListGroup] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
    }
  }, []);
  //Get list department
  const getListDepartment = () => {
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
  };
  const getListAllNvienKinhDoanh = () => {
    company_id &&
      axiosCRM
        .post("/account/takeListNvienKinhDoanh", { com_id: company_id })
        .then((res) => {
          setListEmpAll(
            res.data.data.listUser?.map((emp) => ({
              value: emp.ep_id,
              label: `${emp.ep_id}. ${emp.userName}`,
              phoneTK: emp.phoneTK,
            }))
          );
        })
        .catch((err) => console.log("FilterCart", err));
  };
  useEffect(() => {
    if (!company_id) {
      return;
    }
    getListDepartment();
    getListAllNvienKinhDoanh();
  }, [company_id]);
  const getListNVKDofDepartmentFrom = () => {
    axiosQLC
      .post("/managerUser/listUser", formData)
      .then((res) => {
        setListEmpFrom(
          res.data.data.data?.map((emp) => ({
            value: emp.ep_id,
            label: `${emp.ep_id}. ${emp.userName}`,
            phoneTK: emp.phoneTK,
          }))
        );
      })
      .catch((err) => console.log("errgetListNVKDofDepartment", err));
  };
  const getListNVKDofDepartmentTo = () => {
    axiosQLC
      .post("/managerUser/listUser", formDataTo)
      .then((res) => {
        setListEmpTo(
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
    if (!company_id) {
      return;
    }
    if (formData.listOrganizeDetailId) {
      getListNVKDofDepartmentFrom();
    }
    if (formDataTo.listOrganizeDetailId) {
      getListNVKDofDepartmentTo();
    }
  }, [
    formData.listOrganizeDetailId,
    formDataTo.listOrganizeDetailId,
    company_id,
  ]);

  const handleTranformCart = () => {
    if (!formData.IdCrmFrom) {
      notifyWarning("Chọn nhân viên bàn giao");
      return;
    }
    if (!formData.IdCrmTo) {
      notifyWarning("Chọn nhân viên được bàn giao");
      return;
    }
    axiosCRM
      .post("/account/tranformCart", formData)
      .then((res) => {
        notifySuccess("Chuyển giỏ hàng thành công");
        setFormData({});
        setFormDataTo({})
        setTimeout(() => {
          setIsOpenModalMove(false);
        }, 1700);
      })
      .catch((err) => notifyError("Chuyển thất bại"));
  };
  return (
    <Modal
      title={"Chuyển giỏ"}
      centered
      footer={null}
      open={isOpenModalMove}
      onCancel={() => setIsOpenModalMove(false)}
      className={"mdal_default"}
      width={700}
    >
      {isLoading ? (
        <LoadingLayout />
      ) : (
        <div>
          <div className={styles.modal_move_item}>
            <SelectSingleAndOption
              title="Tổ chức bàn giao"
              data={listDepartment}
              formData={formData}
              placeholder="Chọn tổ chức"
              value={formData.listOrganizeDetailId}
              setFormData={setFormData}
              name={"listOrganizeDetailId"}
            />
            <SelectSingleAndOption
              title="Từ nhân viên"
              data={!formData.listOrganizeDetailId ? listEmpAll : listEmpFrom}
              formData={formData}
              setFormData={setFormData}
              value={formData.IdCrmFrom}
              name={"IdCrmFrom"}
              placeholder="Chọn nhân viên"
            />
          </div>
          <div className={styles.modal_move_item}>
            <SelectSingleAndOption
              title="Tổ chức nhận bàn giao"
              data={listDepartment}
              formData={formDataTo}
              placeholder="Chọn tổ chức"
              value={formDataTo.listOrganizeDetailId}
              setFormData={setFormDataTo}
              name={"listOrganizeDetailId"}
            />
            <SelectSingleAndOption
              title="Đến nhân viên"
              data={!formDataTo.listOrganizeDetailId ? listEmpAll : listEmpTo}
              formData={formData}
              value={formData.IdCrmTo}
              setFormData={setFormData}
              name={"IdCrmTo"}
              placeholder="Chọn nhân viên"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleTranformCart}
              className={stylesBtn.button_primary}
            >
              Chuyển giỏ
            </button>
          </div>{" "}
        </div>
      )}

      <ToastContainer autoClose={500} />
    </Modal>
  );
}

export default ModalGroupCustomerMove;
