import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableListCustomer from "@/components/crm/table/table-list-customer";
import CustomerListInputGroup from "@/components/crm/customer/customer_input_group";
import { TableRowSelection } from "antd/es/table/interface";
import Head from "next/head";
import { base_url } from "@/components/crm/service/function";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
import moment from "moment";
import { UpdateTLKD } from "@/components/crm/context/updateTlkd";
import { useRouter } from "next/router";
// import { useFormData } from "@/components/crm/context/formDataContext";
import { useNotificationReload } from "@/components/crm/context/notificationContext";
// import { login } from "@/utils/handleApi";
import { axiosCRM } from "@/utils/api/api_crm";
import { getToken } from "../api/api-hr/token";
import jwt_decode from "jwt-decode";

const Cookies = require("js-cookie");
export interface DataType {
  key: React.Key; 
  cus_id: number;
  emp_id: number;
  email: string;
  name: string;
  phone_number: number;
  resoure: number;
  description: string;
  group_id: number;
  status: number;
  updated_at: string;
  emp_name: string;
  user_handing_over_work: string;
  userName: string;
  userNameCreate: string;
  NameHandingOverWork: string;
  type: any;
  keyword: any;
}
export default function CustomerList() {
  const router = useRouter();
  const { updateTLKD } = useContext<any>(UpdateTLKD);
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { reloadNotification } = useContext(useNotificationReload);
  const [selected, setSelected] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [name, setName] = useState<any>();
  const [selectedCus, setSelectedCus] = useState<any>();
  const [des, setDes] = useState();
  const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
  const [lisCus, setListCus] = useState([]);
  const [status, setStatus] = useState<any>();
  const [resoure, setResoure] = useState<any>();
  const [nvPhuTrach, setnvPhuTrach] = useState<any>();
  const [nhomCha, setnhomCha] = useState();
  const [nhomCon, setnhomCon] = useState();
  const [loading, setloading] = useState(true);
  const currentTime = moment();
  const pastTime = currentTime.subtract(2, "days");
  const [userNameCreate, setuserNameCreate] = useState();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(100);
  const [dataStatus, setdataStatus] = useState<any>();
  const [group_id, setgroup_id] = useState<any>();
  const [timeStart, setTimeStart] = useState<any>(router.query.start);
  const [timeEnd, setTimeEnd] = useState<any>(router.query.end);
  const [dateS, setdateS] = useState<any>();
  const [dateE, setdateE] = useState<any>();
  const [time_s, setTime_s] = useState<any>(null);
  const [time_e, setTime_e] = useState<any>(null);
  const [time_at_s, settime_at_s] = useState<any>(router.query.create_at_s);
  const [time_at_e, settime_at_e] = useState<any>(router.query.create_at_e);
  const [date_at_s, setdate_at_s] = useState();
  const [date_at_e, setdate_at_e] = useState();
  const [emp_id, setemp_id] = useState<any>();
  const [idNhom, setIdNhom] = useState<any>();
  const [isAPDung, setIsApDung] = useState(false);
  const [selectedCusIds, setSelectedCusIds] = useState<string>("");
  const role = Cookies.get("role");
  const [listNV, setListNv] = useState<any>([]);
  const [dep_id, setDep_id] = useState<any>();
  const [posId, setposId] = useState<any>();
  const [nameNvNomor, setnameNvNomor] = useState<any>();
  const [isRowDataSelected, setRowDataSelected] = useState([]);
  //console.log(dateS, "Props from father");
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
    }
  }, []);
  useEffect(() => {
    setemp_id(router.query.emp_id);
    setIdNhom(router.query.group);
    setStatus(router.query.status);
    setResoure(router.query.source);
    setTime_s(router.query.start);
    setTime_e(router.query.end);
    //setdateS(router.query.start);
    setnvPhuTrach(router.query.creater);
    setName(router.query.keyword);
    if (!isAPDung && !isOpenFilterBox) {
      setTime_s(null);
      setTime_e(null);
    } else {
      if (dateE) {
        setTime_e(dateE + " " + timeEnd);
      }
      if (dateS) {
        setTime_s(dateS + " " + timeStart);
      }
      setTime_s(dateS + " " + timeStart);
    }
  }, [
    isAPDung,
    isOpenFilterBox,
    timeStart,
    dateS,
    timeEnd,
    dateE,
    time_s,
    time_e,
    time_at_e,
    time_at_s,
    date_at_e,
    date_at_s,
    router.asPath,
  ]);
  
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const fetchData = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customer/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          perPage: pageSize,
          page: page,
          keyword: router?.query?.keyword,
          status: router.query.status,
          resoure: router.query.source,
          user_create_id: router.query.creater,
          emp_id: router.query.emp_id,
          group_id: router.query.group,
          // group_pins_id: nhomCon,
          time_s: router.query.start,
          time_e: router.query.end,
          create_at_s: router.query.create_at_s,
          create_at_e: router.query.create_at_e,
        }),
      });
      const data = await res.json();
      setData(data);
      if (data?.data?.length <= 0) {
        setloading(false);
      }

      const res2 = await fetch(`${base_url}/api/crm/customer/countKH`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          perPage: pageSize,
          page: page,
          keyword: router?.query?.keyword,
          status: router.query.status,
          resoure: router.query.source,
          user_create_id: router.query.creater,
          emp_id: router.query.emp_id,
          group_id: router.query.group,
          // group_pins_id: nhomCon,
          time_s: router.query.start,
          time_e: router.query.end,
          create_at_s: router.query.create_at_s,
          create_at_e: router.query.create_at_e,
        }),
      });
      const data2 = await res2.json();
      setTotalRecords(data2?.total);
    } catch (error) {}
  };

  const fetchDataDefault = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customer/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          perPage: pageSize,
          page: page,
        }),
      });
      const data = await res.json();
      setData(data);
      if (data?.data?.length <= 0) {
        setloading(false);
      }

      const res2 = await fetch(`${base_url}/api/crm/customer/countKH`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          perPage: pageSize,
          page: page,
        }),
      });
      const data2 = await res2.json();
      setTotalRecords(data2?.total);

    } catch (error) {}
  };
  const handleGetInfoSTT = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customerStatus/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ pageSize: 100 }),
      });
      const data = await res.json();
      if (data && data?.data) setdataStatus(data?.data);
    } catch (error) {}
  };

  const onSelectChange = (selectedRowKeys: any, selectedRows: DataType[]) => {
    setSelectedRowKeys(selectedRowKeys);
    setNumberSelected(selectedRows?.length);

    const selectedIds = selectedRows.map((row) => row.cus_id);
    setSelectedCusIds(selectedIds.join(","));
    setSelected(selectedIds.length > 0);

    if (selectedRows?.length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const ArrNguonKK: any = [
    { name: "Chưa cập nhật", id: 0 },
    { name: "Facebook", id: 1 },
    { name: "Website", id: 3 },
    { name: "Zalo", id: 2 },
    { name: "Dữ liệu bên thứ 3", id: 4 },
    { name: "Khách hàng giới thiệu", id: 5 },
    { name: "Giới thiệu", id: 6 },
    { name: "Chăm sóc khach hàng", id: 7 },
    { name: "Email", id: 8 },
  ];
  const datatable = data?.data?.map((item, index: number) => {
    let nguonKH = "";

    for (let key of ArrNguonKK) {
      if (key.id == item.resoure) {
        nguonKH = key.name;
      }
    }
    let des = item?.description
      ?.replace(/<p>/g, "")
      .replace(/<\/p>/g, "")
      .replace("&nbsp;", "");
    return {
      key: index + 1,
      cus_id: item.cus_id,
      email: item.email,
      name: item.name,
      phone_number: item.phone_number,
      resoure: nguonKH,
      description: des,
      group_id: item.group_id,
      status: item.status,
      updated_at: item?.updated_at,
      emp_name: item.emp_name,
      userNameCreate: item.userNameCreate,
      user_handing_over_work: item.user_handing_over_work,
      NameHandingOverWork: item.NameHandingOverWork,
      userName: item.userName,
      type: item.type,
      cus_from: item?.cus_from,
      link: item?.link,
      value: item?.resoure,
      count_content_call: item?.count_content_call,
      text_record: item.text_record,
      link_user_post:item.link_user_post,
      latest_content_call: item?.latest_content_call,
    };
  });

  const dataStatusCustomer = dataStatus;
  const [listGr, setListGr] = useState([]);
  const [listGr_Child, setlistGr_Child] = useState([]);

  const handleGetGr = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      let arr = [];
      const data = await res.json();
      setListGr(data?.data);
      data?.data?.map((item) => {
        item?.lists_child.map((item) => {
          arr.push(item);
        });
        setlistGr_Child(arr);
      });
    } catch (error) {}
  };

  const handleGetInfoCusNV = async () => {
    try {
      if (role == "2") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/employee/info`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token_base365")}`,
            },
            // body: JSON.stringify({ com_id: `${Cookies.get("com_id")}` }),
          }
        );

        const data = await res.json();
        if (data && data?.data) {
          setDep_id(data?.data?.data?.dep_id);
          setposId(data?.data?.data?.position_id);
          setnameNvNomor(data?.data?.data);
        }
      }
    } catch (error) {}
  };

  // const handleGetInfoCusAll = async () => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/account/employee/list`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${Cookies.get("token_base365")}`,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     console.log("Check", data);
  //     // if (data && data?.data) setListNv(data?.data?.items);
  //   } catch (error) {}
  // };
  const handleGetInfoCusAll = async () => {
    try {
      axiosCRM
        .post("/account/takeListNvienKinhDoanh", {
          com_id: companyId,
        })
        .then((res) => setListNv(res.data?.data?.listUser))
        .catch((err) => {});
      // if (data && data?.data) setListNv(data?.data?.items);
    } catch (error) {}
  };
  const handleGetInfoCus = async () => {
    try {
      axiosCRM
        .post("/account/TakeListUserFromGroup", {
          companyId,
          IdGroup: idNhom,
        })
        .then((res) => setListNv(res.data?.data?.listUser))
        .catch((err) => {});
    } catch (error) {}
  };

  useEffect(() => {
    if (companyId) {
      idNhom ? handleGetInfoCus() : handleGetInfoCusAll();
    }
  }, [idNhom, companyId]);
  let nv = listNV?.filter((item) => item.dep_id === dep_id);
  useEffect(() => {
    handleGetInfoCusNV();
  }, [dep_id]);
  useEffect(() => {
    if (isAPDung) {
      /* if (dateE) {
        setTime_e(dateE + " " + timeEnd);
      }
      if (date_at_e) {
        setcreate_at_e(date_at_e + " " + time_at_e);
      } */
    } else if (!isAPDung && !isOpenFilterBox) {
      setTime_s(null);
      setTime_e(null);
    }
  }, [isAPDung, isOpenFilterBox]);

  useEffect(() => {
    handleGetInfoSTT();
  }, []);

  function sendingData() {
    const requestData = {
      keyword: name === null ? null : name,
      status: status,
      resoure: resoure,
      user_create_id: nvPhuTrach,
      ep_id: emp_id,
      group_id: idNhom,
      time_s: time_s,
      time_e: time_e,
    };
    return requestData;
  }

  const formDataSencond = new FormData();
  const formDataRequest = sendingData();
  formDataRequest.keyword &&
    formDataSencond.append("keyword", formDataRequest.keyword);
  formDataRequest.status &&
    formDataSencond.append("status", formDataRequest.status);
  formDataRequest.resoure &&
    formDataSencond.append("resoure", formDataRequest.resoure);
  formDataRequest.user_create_id &&
    formDataSencond.append("user_create_id", formDataRequest.user_create_id);
  formDataRequest.ep_id &&
    formDataSencond.append("ep_id", formDataRequest.ep_id);
  formDataRequest.group_id &&
    formDataSencond.append("group_id", formDataRequest.group_id);
  formDataRequest.time_s &&
    formDataSencond.append("time_s", formDataRequest.time_s);
  formDataRequest.time_e &&
    formDataSencond.append("time_e", formDataRequest.time_e);

  const handleSelectAll = () => {
    const allRowKeys = datatable?.map((item: { key: any }) => item.key);
    setSelectedRowKeys(allRowKeys);
    setNumberSelected(datatable?.length);
    setRowDataSelected(datatable);

    if (selectedRowKeys.length > 0) {
      sendingData();
    }
  };

  const handleDeselectAll = () => {
    setSelectedRowKeys([]);
    setNumberSelected(0);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows);
    },
    onSelectAll: handleSelectAll,
  };

  useEffect(() => {
    handleGetGr();
    fetchData();
  }, [
    name,
    selectedRowKeys,
    des,
    selectedCus,
    page,
    pageSize,
    updateTLKD,
    reloadNotification,
  ]);
  useEffect(() => {
    setHeaderTitle("Danh sách khách hàng");
    setShowBackButton(false);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Danh sách khách hàng</title>
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
        <div ref={mainRef} className={styleHome.main}>
          <CustomerListInputGroup
            setIdNhom={setIdNhom}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            setdateS={setdateS}
            setdateE={setdateE}
            name={name}
            setName={setName}
            fetchData={fetchData}
            isSelectedRow={selected}
            numberSelected={numberSelected}
            clearOption={handleDeselectAll}
            chooseAllOption={handleSelectAll}
            selectedCus={selectedCus}
            dataStatusCustomer={dataStatusCustomer}
            setStatus={setStatus}
            setResoure={setResoure}
            datatable={datatable}
            nvPhuTrach={nvPhuTrach}
            setnvPhuTrach={setnvPhuTrach}
            userNameCreate={userNameCreate}
            setuserNameCreate={setuserNameCreate}
            nhomCha={nhomCha}
            setnhomCha={setnhomCha}
            nhomCon={nhomCon}
            setnhomCon={setnhomCon}
            setloading={setloading}
            setDatatable={setData}
            setgroup_id={setgroup_id}
            setemp_id={setemp_id}
            listGr={listGr}
            listGr_Child={listGr_Child}
            nameNvNomor={nameNvNomor}
            nv={nv}
            role={role}
            posId={posId}
            listNV={listNV}
            handover={selectedCusIds}
            setIsOpenFilterBox={setIsOpenFilterBox}
            setIsApDung={setIsApDung}
            isOpenFilterBox={isOpenFilterBox}
            dataLength={data?.data?.length}
            isRowDataSelected={isRowDataSelected}
            selectedCusIds={selectedCusIds}
            page={page}
            keyword={name}
            status={status}
            resoure={resoure}
            user_create_id={nvPhuTrach}
            emp_id={emp_id}
            idNhom={idNhom}
            time_at_e={time_at_e}
            time_at_s={time_at_s}
            date_at_s={date_at_s}
            date_at_e={date_at_e}
            settime_at_e={settime_at_e}
            settime_at_s={settime_at_s}
            setdate_at_s={setdate_at_s}
            setdate_at_e={setdate_at_e}
            timeEnd={timeEnd}
            dateE={dateE}
            dateS={dateS}
            timeStart={timeStart}
          />
          <TableListCustomer
            handleGetInfoSTT={handleGetInfoSTT}
            fetchData={fetchData}
            rowSelection={rowSelection}
            datatable={datatable}
            dataStatusCustomer={dataStatusCustomer}
            dataGroup={listGr}
            des={des}
            setDes={setDes}
            setPage={setPage}
            page={page}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalRecords={totalRecords}
            loading={loading}
            setDatatable={setData}
            ArrNguonKK={ArrNguonKK}
            setStatus={setStatus}
            setResoure={setResoure}
            nvPhuTrach={nvPhuTrach}
            setnvPhuTrach={setnvPhuTrach}
            userNameCreate={userNameCreate}
            setuserNameCreate={setuserNameCreate}
            nhomCha={nhomCha}
            setnhomCha={setnhomCha}
            nhomCon={nhomCon}
            setnhomCon={setnhomCon}
            setloading={setloading}
            setgroup_id={setgroup_id}
            setTime_s={setTime_s}
            setTime_e={setTime_e}
            setemp_id={setemp_id}
            listGr={listGr}
            listGr_Child={listGr_Child}
            nameNvNomor={nameNvNomor}
            nv={nv}
            role={role}
            posId={posId}
            listNV={listNV}
            setIdNhom={setIdNhom}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            setdateS={setdateS}
            setdateE={setdateE}
            name={name}
            setName={setName}
            isSelectedRow={selected}
            numberSelected={numberSelected}
            chooseAllOption={handleSelectAll}
            selectedCus={selectedCus}
            fetchDataDefault={fetchDataDefault}
          />
        </div>
      )}
    </>
  );
}
