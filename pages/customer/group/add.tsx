import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/customer/add_edit/add_edit.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Checkbox, Select, notification } from "antd";
import TableStaffCustomerGroupAdd from "@/components/crm/table/table-staff-group-add-customer";
import Head from "next/head";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";
import Image from "next/image";
import TextEditorGr from "@/components/crm/text-editor/text_editor_gr";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import GrFooterAddFiles from "@/components/crm/potential/potential_add_files/gr_customer_footer";
import CustomerGroupSelectCpmponent from "@/components/crm/select/group_components_select";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
import axios from "axios";
import { getCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
import Link from "next/link";
import { SelectSingleAndOption } from "@/components/commodity/select";
import { axiosQLC } from "@/utils/api/api_qlc";
const GroupCustomerAdd: React.FC = () => {
  const [valAllDepartment, setValAllDepartment] = useState(false);
  const [valAllEmp, setValAllEmp] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const valueOptionRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [erroeMdal, setErrModal] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [companyId, setCompanyId] = useState(null);

  const [selectedValueDepartments, setSelectedValueDepartments] = useState<any>(
    []
  );
  function getToken(token) {
    const isToken = Cookies.get(token);
    return isToken;
  }
  const accessToken = Cookies.get("token_base365");

  const com_id = Cookies.get("com_id");
  const GetComId = () => {
    const COOKIE_KEY = "token_base365";
    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
      return decodedToken?.data?.com_id;
    }
  };
  const [dataSelectGroupParent, setDataGroupParent] = useState<any>([]);
  const [dataEmp, setDataEmp] = useState<any>([]);
  const [dataDepartment, setDataDepartment] = useState<any>([]);
  const [dataRowSelect, setDataRowSelect] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [valEmp, setValEmp] = useState<any>([]);
  const [dataTableEmp, setDataTableEmp] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [valueGroupCustomer, setValueGroupCustomer] = useState({
    groupName: "",
    groupDescription: "",
    groupParents: "",
    dep_id: null,
    emp_id: null,
  });
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [listDepartment, setListDepartment] = useState([]);
  const [formData, setFormData] = useState<any>({
    ep_status: "Active",
    pageNumber: 1,
    pageSize: 1000000,
  });
  const [listEmpAll, setListEmpAll] = useState([]);
  const [listEmp, setListEmp] = useState([]);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

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
      setDataGroupParent(data?.data);
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };

  const updateDataAddGroup = async (url, body) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
      console.log("fetchDataDepartment", response.data);
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

  const urlCreate = `${base_url}/api/crm/group/create_GroupKH`;

  useEffect(() => {
    fetchData(`${base_url}/api/crm/group/list_group_khach_hang`, {});
    fetchDataDepartment(`${base_url}/api/qlc/organizeDetail/listAll`, {
      com_id: GetComId(),
    });
    fetchDataEmp(`${base_url}/api/qlc/managerUser/listUser`, {
      pageSize: 2000,
    });
  }, []);

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Thêm mới");
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

  function handleChange(val: any): void {
    setSelectedValueDepartments(val);
  }
  //Xử lý khi chọn nhân viên
  // function handleChangeEmps(val: any): void {
  //   const valueExists = dataTableEmp?.some((item) => item === val);
  //   if (!valueExists) {
  //     setDataTableEmp((prevData) => {
  //       if (prevData) {
  //         return [...prevData, val];
  //       }
  //       return [val];
  //     });
  //   } else {
  //     setErrModal(true);
  //   }

  //   setValEmp(val);
  // }

  // const dataSelectGroupParent = data?.data;
  useEffect(() => {
    if (selectedValueDepartments?.length > 0) {
      setValueGroupCustomer((prev) => {
        return {
          ...prev,
          dep_id: selectedValueDepartments.join(","),
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
        emp_id: selectedValueDepartments.join(","),
      };
    });
  }, [dataTableEmp]);

  const handleDelMultiRow = () => {
    const newData = dataTableEmp?.filter((el) => !dataRowSelect.includes(el));
    setDataTableEmp(newData);
  };

  const openNotificationWithIcon = (error: any) => {
    api[error]({
      message: "Notification Title",
      description: "Bạn chưa nhập tên nhóm khách hàng",
    });
  };
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
  useEffect(() => {
    if (!formData.listOrganizeDetailId) {
      setListEmp([]);
    }
    formData.listOrganizeDetailId && getListNVKDofDepartment();
  }, [formData.listOrganizeDetailId]);
  const handleAddGroup = async () => {
    if (valueGroupCustomer?.groupName !== "") {
      await updateDataAddGroup(urlCreate, {
        groupName: valueGroupCustomer?.groupName,
        emp_id: dataTableEmp?.length > 0 ? dataTableEmp?.join(",") : "all",
   
        groupParents: valueGroupCustomer?.groupParents
          ? valueGroupCustomer?.groupParents
          : 0,
        groupDescription: valueGroupCustomer?.groupDescription,
      });

      setModal1Open(true);
    } else {
      alert("Bạn chưa nhập tên nhóm khách hàng");
      // openNotificationWithIcon("error");
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>
          Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự
          động
        </title>
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
      {!checkAndRedirectToHomeIfNotLoggedIn() ? null : (
        <div className={styleHome.main} ref={mainRef}>
          {contextHolder}
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.main__title}>
                  Thêm mới nhóm khách hàng
                </div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <div className={styles["main__body_item"]}></div>

                    <div className={styles.custom_group}>
                      <InputText
                        required
                        value={valueGroupCustomer.groupName}
                        setFormData={setValueGroupCustomer}
                        label={"Tên nhóm khách hàng"}
                        placeholder=" Nhập tên nhóm khách hàng"
                        keyValue="groupName"
                      />
                      <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
                        <label>Nhóm khách hàng cha </label>
                        <div ref={valueOptionRef}>
                          <CustomerGroupSelectCpmponent
                            value="Chọn nhóm khách hàng cha"
                            placeholder=""
                            data={dataSelectGroupParent}
                            setValueGroupCustomer={setValueGroupCustomer}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Text Editor */}
                    <div className={styles.form_label}>Mô tả</div>
                    <TextEditorGr
                      editorContent={valueGroupCustomer.groupDescription}
                      setEditorValue={(val: any) => {
                        setValueGroupCustomer((pre: any) => {
                          return {
                            ...pre,
                            groupDescription: val,
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

                    {/* <div
                      className="flex_between"
                      style={{
                        gap: "30px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div className="flex_between">
                          <label>Phòng ban</label>
                          <Checkbox
                            checked={valAllDepartment}
                            onChange={() => {
                              setValAllDepartment(!valAllDepartment);
                              setValueGroupCustomer((prev) => {
                                return {
                                  ...prev,
                                  dep_id: null,
                                };
                              });
                            }}
                          >
                            Tất cả
                          </Checkbox>
                        </div>
                        {!valAllDepartment && (
                          <Select
                            mode="multiple"
                            allowClear
                            style={{
                              width: "100%",
                              height: "40px !important",
                            }}
                            placeholder="Chọn phòng ban"
                            defaultValue={dataDepartments?.dep_id}
                            value={selectedValueDepartments}
                            onChange={handleChange}
                            options={options}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          overflowX: "hidden",
                          overflowY: "visible",
                        }}
                      >
                        <div
                          style={{ height: "27px" }}
                          className="flex_between"
                        >
                          <label>Nhân viên</label>
                          <Checkbox
                            onChange={() => {
                              setValAllEmp(!valAllEmp);
                            }}
                          >
                            Tất cả
                          </Checkbox>
                        </div>
                        {!valAllDepartment && (
                          <Select
                            // mode="multiple"
                            // allowClear
                            style={{
                              width: "100%",
                              height: "40px !important",
                            }}
                            disabled={valAllEmp}
                            placeholder="Chọn nhân viên"
                            // defaultValue={dataDepartments?.dep_id}
                            value={valEmp}
                            onChange={handleChangeEmps}
                            options={
                              selectedValueDepartments?.length === 0
                                ? []
                                : employeeOptions
                            }
                          />
                        )}
                      </div>
                    </div> */}

                    <TableStaffCustomerGroupAdd
                      dataEmp={dataEmp}
                      valueSelected={dataTableEmp}
                      setData={setDataTableEmp}
                    />
                  </div>
                  <GrFooterAddFiles
                    link="/customer/group/list"
                    titleCancel="Xác nhận hủy thêm mới nhóm khách hàng "
                    title="Thêm nhóm khách hàng thành công!"
                    contentCancel={
                      "Bạn có đồng ý hủy? \n Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
                    }
                    setModal1Open={setModal1Open}
                    modal1Open={modal1Open}
                    handleSave={handleAddGroup}
                  />
                </div>
              </div>
            </div>
          </div>

          <ModalDelEmpGroup
            isModalCancel={isOpenModalDel}
            setIsModalCancel={setIsOpenModalDel}
            content={"Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?"}
            title={"Xác nhận gỡ bỏ chia sẻ"}
            link={"#"}
            handleOk={() => {
              handleDelMultiRow();
            }}
          />
        </div>
      )}
    </>
  );
};

export default GroupCustomerAdd;
