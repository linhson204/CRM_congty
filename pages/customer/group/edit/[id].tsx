import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Checkbox, Select, notification } from "antd";
import TableStaffCustomerGroupAdd from "@/components/crm/table/table-staff-group-add-customer";
import { useApi } from "@/components/crm/hooks/useApi";
import { useRouter } from "next/router";
import Image from "next/image";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";
import TextEditorGr from "@/components/crm/text-editor/text_editor_gr";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import CustomerGroupSelectCpmponent from "@/components/crm/select/group_components_select";
import GrFooterAddFiles from "@/components/crm/potential/potential_add_files/gr_customer_footer";
import Head from "next/head";
import axios from "axios";
import { getCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
import { axiosCRM } from "@/utils/api/api_crm";
import { SelectSingleAndOption } from "@/components/commodity/select";
import { axiosQLC } from "@/utils/api/api_qlc";
interface CustomJwtPayload extends jwt.JwtPayload {
  idQLC: string; // hoặc kiểu dữ liệu thích hợp
}

const GroupCustomerAdd: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const valueOptionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const { isOpen } = useContext<any>(SidebarContext);
  const [modal1Open, setModal1Open] = useState(false);
  const [erroeMdal, setErrModal] = useState(false);
  const [selectedValueDepartments, setSelectedValueDepartments] = useState<any>(
    []
  );

  const [share_group_child, setshare_group_child] = useState<any>(0);
  const [dataDetails, setDataDetails] = useState<any>([]);
  const [dataSelectGroupParent, setData] = useState<any>([]);
  const [dataEmp, setDataEmp] = useState<any>([]);
  const [dataDepartment, setDataDepartment] = useState<any>([]);
  const [dataRowSelect, setDataRowSelect] = useState<any>([]);
  const [dataTableEmp, setDataTableEmp] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  function getToken(token) {
    const isToken = Cookies.get(token);
    return isToken;
  }
  const [listDepartment, setListDepartment] = useState([]);
  const [formData, setFormData] = useState<any>({
    ep_status: "Active",
    pageNumber: 1,
    pageSize: 1000000,
  });
  const [listEmpAll, setListEmpAll] = useState([]);
  const [listEmp, setListEmp] = useState([]);
  const [companyId, setCompanyId] = useState(null);

  const accessToken = Cookies.get("token_base365");
  const GetComId = () => {
    const COOKIE_KEY = "token_base365";
    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
      return decodedToken?.data?.com_id;
    }
  };
  //Lấy nhóm khách cha
  const fetchData = async (url: string, body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng Bearer token
          mode: "no-cors",
        },
        body: body, // Chỉ truyền body nếu là phương thức POST
      });

      const data = await res.json();
      setData(data?.data?.filter((parent) => parent.gr_id != id));
      return data;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };

  const updateDataEdit = async (url, body) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });

      const data = response.data;

      return data;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };
  //Lấy danh sách phòng ban
  const fetchDataDepartment = async (url: string, body) => {
    try {
      const response = await axios.post(
        url,
        { com_id: body.com_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );

      const data = await response.data;
      setDataDepartment(data?.data?.data);
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };
  //Lấy toàn bộ danh sách nhân viên
  const fetchDataEmp = async (url, body) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng Bearer token
        },
      });

      const data = response.data;
      setDataEmp(data?.data?.data);

      if (response.status !== 200) {
        throw new Error(data.message || "Có lỗi xảy ra khi gọi API");
      }
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };

  const fetchDataDetails = async (url, body) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng Bearer token
        },
      });

      const data = response.data;
      setDataDetails(data);

      if (response.status !== 200) {
        throw new Error(data.message || "Có lỗi xảy ra khi gọi API");
      }
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };
  //Lấy danh sách nhân viên được chia sẻ
  const fetchListEmpShare = () => {
    axiosCRM
      .post("/account/TakeListUserFromGroup", {
        IdGroup: id,
        companyId: GetComId(),
      })
      .then((res) => {
        setDataTableEmp([...res.data.data.listUser?.map((item) => item.idQLC)]);
      })
      .catch((err) => console.log("fetchListEmpShare", err));
  };
  const dataPassFromId = dataSelectGroupParent?.data?.filter(
    (item: any) => item?.gr_id === Number(id)
  )?.[0];
  const [valueGroupCustomer, setValueGroupCustomer] = useState({
    gr_id: id,
    gr_name: "999",
    gr_description: "777",
    group_parent: "",
    dep_id: null,
    emp_id: null,
    group_cus_parent: null,
  });

  useEffect(() => {
    fetchDataDetails(`${base_url}/api/crm/group/details`, {
      gr_id: Number(id),
    });
    fetchData(`${base_url}/api/crm/group/list_group_khach_hang`, {});
    fetchDataDepartment(`${base_url}/api/qlc/organizeDetail/listAll`, {
      com_id: GetComId(),
    });
    fetchDataEmp(`${base_url}/api/qlc/managerUser/listUser`, {
      pageSize: 2000,
    });
  }, []);
  const [valueDefault, setvalueDefault] = useState<any>();
  const [change, setchange] = useState(false);
  useEffect(() => {
    delete dataDetails?.data?.company_id;
    setValueGroupCustomer(dataDetails?.data);
    setvalueDefault(dataDetails?.data);
    setTimeout(() => {
      setchange(true);
    }, 500);
  }, [valueDefault, change]);

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/customer/group/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof formData.idCRM == "number") {
      setDataTableEmp((prevData) => {
        if (prevData) {
          return [...prevData, formData.idCRM];
        } else {
          const newArr = arr;
          newArr?.push(formData.idCRM);
          return newArr;
        }
      });
      return;
    }

    if (formData.idCRM?.split(",").length > 1) {
      const newArr = [
        ...dataTableEmp,
        ...formData.idCRM?.split(",").map((item) => Number(item)),
      ];
      const uniqueArray = [];

      const seen = {};

      for (const value of newArr) {
        if (!seen.hasOwnProperty(value)) {
          seen[value] = true;
          uniqueArray.push(value);
        }
      }
      setDataTableEmp([...uniqueArray]);
    }
  }, [formData.idCRM]);

  //
  useEffect(() => {
    if (selectedValueDepartments?.length > 0) {
      // selectedValueDepartments?.forEach((depId: any) => {
      setValueGroupCustomer((prev) => {
        return {
          ...prev,
          dep_id: selectedValueDepartments?.join(","),
        };
      });
      // });
    }
    // ?.filter((emp) => selectedValueDepartments?.includes(emp.dep_id))
    const employeeOption = dataEmp
      ?.filter((emp) =>
        selectedValueDepartments?.includes(emp.organizeDetailId)
      )
      ?.map((employee) => {
        return {
          label: `${employee.ep_id}. ${employee.userName}`,
          value: employee.ep_id,
        };
      });
    setEmployeeOptions(employeeOption);
  }, [selectedValueDepartments]);
  // const dataSelectGroupParent = dataAll?.data;
  const dataDepartments = dataDepartment;
  let arr: any = [];
  dataDepartments?.map((item) => {
    arr.push(item?.id);
  });
  const options = dataDepartments?.map((item) => {
    return {
      label: item?.organizeDetailName,
      value: item?.id,
    };
  });

  useEffect(() => {
    setValueGroupCustomer((prev) => {
      return {
        ...prev,
        emp_id: selectedValueDepartments?.join(","),
      };
    });
  }, [dataTableEmp]);

  useEffect(() => {
    setSelectedValueDepartments(arr);

    // setDataTableEmp(
    //   dataDetails?.data?.emp_id
    //     ?.split(",")
    //     .map((item) => parseInt(item.trim(), 10))
    // );
  }, [dataDepartments]);
  const openNotificationWithIcon = () => {
    api.error({
      message: "Notification Title",
      description: "Trường tên nhóm khách hàng đã tồn tại hoặc không được nhập",
    });
  };
  useEffect(() => {
    fetchListEmpShare();
  }, [id]);
  const getListDepartment = useMemo(() => {
    if (companyId) {
      return axiosQLC
        .post("/organizeDetail/listAll", { com_id: companyId })
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
  }, [companyId]);
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
  }, [companyId]);

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
    formData.listOrganizeDetailId && getListNVKDofDepartment();
  }, [formData.listOrganizeDetailId]);
  const handleUpdate = async () => {
    if (
      valueGroupCustomer.gr_name === dataDetails?.data?.data?.gr_name ||
      valueGroupCustomer.gr_name === ""
    ) {
      try {
        await updateDataEdit(`${base_url}/api/crm/group/update_GroupKH`, {
          ...valueDefault,
          name: valueDefault.gr_name,
          description: valueDefault?.gr_description,
          group_cus_parent:
            valueDefault.group_cus_parent !== undefined &&
            valueDefault.group_cus_parent !== null
              ? valueDefault.group_cus_parent
              : valueDefault.group_cus_parent === 0
              ? 0
              : dataDetails?.data?.group_parent,
          gr_id: id,
          emp_id: dataTableEmp?.join(","),
          share_group_child: share_group_child,
        });
        // setModal1Open(true);
      } catch (error) {
        // setModal1Open(true);
      }
    } else {
      try {
        await updateDataEdit(`${base_url}/api/crm/group/update_GroupKH`, {
          ...valueGroupCustomer,
          name: valueGroupCustomer.gr_name,
          description: valueGroupCustomer?.gr_description,
          group_cus_parent:
            valueGroupCustomer.group_cus_parent !== undefined &&
            valueGroupCustomer.group_cus_parent !== null
              ? valueGroupCustomer.group_cus_parent
              : valueGroupCustomer.group_cus_parent === 0
              ? 0
              : dataDetails?.data?.group_parent,
          gr_id: id,
          emp_id: dataTableEmp?.join(","),
          share_group_child: share_group_child,
        });
        setModal1Open(true);
      } catch (error) {
        setModal1Open(true);
      }
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chỉnh sửa nhóm khách hàng</title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <meta
          property="og:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        {contextHolder}
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>
                Chỉnh sửa nhóm khách hàng
              </div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}></div>
                  <div
                    style={{
                      gap: 30,
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <InputText
                        required
                        value={
                          valueGroupCustomer?.gr_name ||
                          dataDetails?.data?.gr_name
                        }
                        setFormData={setValueGroupCustomer}
                        label={"Tên nhóm khách hàng"}
                        placeholder=" Nhập tên nhóm khách hàng"
                        keyValue="gr_name"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>Nhóm khách hàng cha </label>
                      <div ref={valueOptionRef}>
                        <CustomerGroupSelectCpmponent
                          value="Chọn nhóm khách hàng cha"
                          placeholder={dataDetails?.data?.group_parent}
                          data={dataSelectGroupParent}
                          setValueGroupCustomer={setValueGroupCustomer}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Editor */}
                  <div className={styles.form_label}>Mô tả</div>
                  <TextEditorGr
                    editorContent={
                      valueGroupCustomer?.gr_description ||
                      dataDetails?.data?.gr_description
                    }
                    setEditorValue={(val: any) => {
                      setValueGroupCustomer((pre: any) => {
                        return {
                          ...pre,
                          gr_description: val,
                        };
                      });
                    }}
                  />
                  <div
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                    className={styles.form_label}
                  >
                    Danh sách chia sẻ
                  </div>
                  {/* {valueGroupCustomer?.group_cus_parent == null &&
                    valueOptionRef?.current?.querySelector(".value_options")
                      .innerHTML === "Chọn" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginBottom: "1rem",
                        }}
                      >
                        <p
                          className="d-flex info_system"
                          style={{ fontSize: "14px" }}
                        >
                          <input
                            onChange={() => setshare_group_child(1)}
                            type="checkbox"
                            value="1"
                            name="share_group_child"
                            id="share_group_child"
                            className="input_choose"
                            style={{ marginRight: "10px" }}
                          />
                          Chia sẻ nhóm khách hàng con
                        </p>
                      </div>
                    )} */}
                  <div
                    className="flex_between"
                    style={{
                      gap: 30,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <SelectSingleAndOption
                        title="Chọn tổ chức"
                        data={listDepartment}
                        formData={formData}
                        placeholder="Chọn tổ chức"
                        value={formData.listOrganizeDetailId}
                        setFormData={setFormData}
                        name={"listOrganizeDetailId"}
                      />{" "}
                    </div>
                    <div style={{ flex: 1 }}>
                      {" "}
                      <SelectSingleAndOption
                        title="Chọn nhân viên"
                        data={
                          formData.listOrganizeDetailId ? listEmp : listEmpAll
                        }
                        formData={formData}
                        value={formData.idCRM}
                        setFormData={setFormData}
                        placeholder="Chọn nhân viên"
                        name={"idCRM"}
                        valueAll={listEmp?.map((emp) => emp.value).toString()}
                      />
                    </div>

                    {/* <div style={{ flex: 1 }}>
                      <div className="flex_between">
                        <label>Phòng ban</label>
                      </div>

                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                          height: "40px !important",
                        }}
                        placeholder="Chọn phòng ban"
                        value={selectedValueDepartments || arr}
                        onChange={handleChange}
                        options={options}
                      />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        overflowX: "hidden",
                        overflowY: "visible",
                      }}
                    >
                      <div style={{ height: "27px" }} className="flex_between">
                        <label>Nhân viên</label>
                      </div>

                      <Select
                        style={{
                          width: "100%",
                          height: "40px !important",
                        }}
                        placeholder="Chọn nhân viên"
                        // defaultValue={dataDepartments?.dep_id}
                        value={valEmp}
                        onChange={handleChangeEmps}
                        options={employeeOptions}
                        onClick={() => setClickOptionEmp(true)}
                      />
                    </div> */}
                  </div>

                  <TableStaffCustomerGroupAdd
                    dataEmp={dataEmp}
                    valueSelected={dataTableEmp || arr}
                    setData={setDataTableEmp}
                  />
                </div>
                <GrFooterAddFiles
                  link="/customer/group/list"
                  titleCancel="Xác nhận hủy cập nhật nhóm khách hàng "
                  title="Cập nhật nhóm khách hàng thành công!"
                  contentCancel={
                    "Bạn có đồng ý hủy? \n Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
                  }
                  modal1Open={modal1Open}
                  setModal1Open={setModal1Open}
                  handleSave={handleUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupCustomerAdd;
