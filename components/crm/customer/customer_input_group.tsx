import { ID_HUNGHA } from "@/constants/home-constants";
import LoadingLayout from "@/constants/LoadingLayout";
import { DataType } from "@/pages/customer/list";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { decodeToken } from "@/utils/function";
import { Drawer, Input } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import styles from "../customer/group_customer/customer_group.module.css";
import useLoading from "../hooks/useLoading";
import exportToExcel from "../ultis/export_xlxs";
import CustomerListAction from "./customer_action";
import CustomerListFilterBox from "./customer_filter_box";
import ModalDataCustomerCall from "./customer_modal/customer_modal_setting_call";
import ModalAgentBusy from "./customer_modal/modal_customer_busy";
import ModalDataConvertCart from "./customer_modal/modal_data_convert_cart";
import ModalDataCustomerKD from "./customer_modal/modal_data_KD";
import ModalInfoCustomer from "./customer_modal/modal_info_customer_popup";
import ModalInfoUVien from "./customer_modal/modal_info_uvien_popup";
import { set } from "lodash";
import ModalInfoNTDFB from "./customer_modal/modal_info_ntd_fb";
const Cookies = require("js-cookie");



export default function CustomerListInputGroup({
  isSelectedRow,
  numberSelected,
  clearOption,
  chooseAllOption,
  setName,
  name,
  fetchData,
  selectedCus,
  dataStatusCustomer,
  setStatus,
  setResoure,
  datatable,
  nvPhuTrach,
  setnvPhuTrach,
  userNameCreate,
  setuserNameCreate,
  nhomCha,
  setnhomCha,
  nhomCon,
  setnhomCon,
  setloading,
  setDatatable,
  setgroup_id,
  setTimeStart,
  setTimeEnd,
  setdateE,
  setdateS,
  setTime_s,
  setTime_e,
  setemp_id,
  setIdNhom,
  listGr,
  listGr_Child,
  nameNvNomor,
  nv,
  role,
  posId,
  listNV,
  handover,
  setIsApDung,
  setIsOpenFilterBox,
  isOpenFilterBox,
  dataLength,
  isRowDataSelected,
  selectedCusIds,
  keyword,
  status,
  resoure,
  user_create_id,
  emp_id,
  group_id,
  time_s,
  time_e,
  date_at_e,
  time_at_e,
  date_at_s,
  time_at_s,
  create_at_e,
  create_at_s,
  setdate_at_e,
  settime_at_e,
  setdate_at_s,
  settime_at_s,
  setcreate_at_e,
  setcreate_at_s,
  page,
  idNhom,
  timeEnd,
  dateE,
  dateS,
  timeStart,
}: any) {
  const currentCookie = Cookies.get("token_base365");
  const decodedToken: any = jwt_decode(currentCookie);
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any>();
  const [nameFill, setNameFill] = useState<any>();
  const cancelDownloadRef = useRef(false);
  const [isOpenModalConvertCart, setIsOpenModalConvertCart] = useState(false);
  const [isOpenModalBusy, setIsOpenModalBusy] = useState(false);
  const [isOpenModalDataCustomerKD, setIsOpenModalDataCustomerKD] =
    useState(false);
  const [isOpenModalSettingCall, setIsOpenModalSettingCall] = useState(false);
  const { isLoading, handleLoading } = useLoading();
  const [isOpenModalInfoNTD, setIsOpenModalInfoNTD] = useState(false);
  const [isOpenModalInfoUV, setIsOpenModalInfoUV] = useState(false);
  const [isOpenModalInfoNTDFB, setIsOpenModalInfoNTDFB] = useState(false);
  const [infoNTD, setInfoNTD] = useState<any>();
  const [infoUV, setInfoUV] = useState<any>();
  const [islineBusy, setIslineBusy] = useState(false);
  const [isduplicated, setIsDuplicated] = useState(false);
  const [isbusyhand, setIsBusyhand] = useState(false);
  const [kdinfo, setKdinfo] = useState({ extension_number: '' });


  const showDrawer = () => {
    setIsOpenFilterBox(true);
    setOpen(true);
  };

  const { userType, idQLC, com_id } = decodeToken();
  const onClose = () => {
    setOpen(false);
    setIsOpenFilterBox(false);
  };
  const handleGetAllCustomer = async () => {
    const dataExport = [];
    let page = 1;

    try {
      while (!cancelDownloadRef.current) {
        const res = await axiosCRMv2("/customer/list", {
          page: page,
          perPage: 1000,
          ...(userType === 2 && { emp_id: idQLC }),
        });

        res.map((e: { description: string | any[]; }) => {
          if (e?.description?.length > 32000) {

          }
          else dataExport.push(e);
        })

        // dataExport.push(...res);
        page++;
        if (cancelDownloadRef.current || res.length < 1000) {
          break;
        }
      }

      if (!cancelDownloadRef.current) {
        // Hoàn thành quá trình tải dữ liệu
        handleExportToExcel(dataExport);
      } else {
        cancelDownloadRef.current = false;
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error in handleGetAllCustomer:", error);
    }
  };

  const handleExportToExcel = (data: any[]) => {
    const dataExport = data?.map((item: DataType) => ({
      "Mã tiềm năng": item?.cus_id,
      "Xưng hô": "",
      "Họ tên": item?.name,
      "Chức danh": "",
      "Điện thoại cá nhân": item?.phone_number,
      "Email cá nhân": item?.email,
      "Điện thoại cơ quan": "",
      "Email cơ quan": "",
      "Địa chỉ": "",
      "Tỉnh/Thành phố": "",
      "Quận/Huyện": "",
      "Phường xã": "",
      "Nguồn gốc": "",
      "Loại hình": "",
      "Lĩnh vực": "",
      "Mô tả": item?.description,
      "Mô tả loại hình": "",
      "Người tạo": item?.userNameCreate,
    }));
    const filename = "Danh sách khách hàng.xlsx";
    const sheetName = "Danh sách khách hàng";
    const columnHeaders = [
      "Mã tiềm năng",
      "Xưng hô",
      "Họ tên",
      "Chức danh",
      "Điện thoại cá nhân",
      "Email cá nhân",
      "Điện thoại cơ quan",
      "Email cơ quan",
      "Địa chỉ",
      "Tỉnh/Thành phố",
      "Quận/Huyện",
      "Phường xã",
      "Nguồn gốc",
      "Loại hình",
      "Lĩnh vực",
      "Mô tả",
      "Mô tả loại hình",
      "Người tạo",
    ];
    exportToExcel(dataExport, filename, sheetName, columnHeaders);
  };

  const handleClickFile = () => {
    inputFileRef.current?.click();
  };
  const router = useRouter();
  const handleSearchKH = async () => {
    if (nameFill === name) {
      setName(nameFill);
      setloading(true);
      router.push(
        `/customer/list?${time_s ? `&start=${time_s}` : ""}${time_e ? `&end=${time_e}` : ""
        }${create_at_s ? `&create_at_s=${create_at_s}` : ""}${create_at_e ? `&create_at_e=${create_at_e}` : ""
        }${status ? `&status=${status}` : ""}${resoure ? `&source=${resoure}` : ""
        }${idNhom ? `&group=${idNhom}` : ""}${emp_id ? `&emp_id=${emp_id}` : ""
        }${user_create_id ? `&creater=${user_create_id}` : ""}${nameFill ? `&keyword=${nameFill}` : ""
        }
  `
      );
    } else {
      setDatatable([]);
      setName(nameFill);
      setloading(true);
      router.push(
        `/customer/list?${time_s ? `&start=${time_s}` : ""}${time_e ? `&end=${time_e}` : ""
        }${create_at_s ? `&create_at_s=${create_at_s}` : ""}${create_at_e ? `&create_at_e=${create_at_e}` : ""
        }${status ? `&status=${status}` : ""}${resoure ? `&source=${resoure}` : ""
        }${idNhom ? `&group=${idNhom}` : ""}${emp_id ? `&emp_id=${emp_id}` : ""
        }${user_create_id ? `&creater=${user_create_id}` : ""}${nameFill ? `&keyword=${nameFill}` : ""
        }
  `
      );
    }
  };

  useEffect(() => {
    const userId = decodedToken?.data?.idQLC;
    console.log("Kiểm tra userId:", userId);

    if (userId) {
      getData()
      const newSocket = io('https://job247.vn/socket', {
        secure: true,
        transports: ['websocket', 'polling'],
      });

      const handleAddNTD = async (data) => {
        console.log("DATA FRIRST", data);
        const linebussy = await handleCheckLineBusy()
        const duplicate = await checkPhoneDuplicate(data?.phone_number)
        const isBusy = await checkBusyHand(decodedToken?.data?.idQLC)
        console.log("VAODAY", linebussy, duplicate, isBusy)
        if (!linebussy && !duplicate && !isBusy) {
          console.log("📥 Nhận AddNTDToCrmClient từ server lúc đang rảnh: ", data);
          if (isOpenModalInfoNTD) {
            console.log("ĐANG MỞ");
            setIsOpenModalInfoNTD(false);
            setTimeout(() => {
              // Cập nhật thông tin và mở lại modal
              handleUpdateCustomerPopup(data?.cus_id);
              setInfoNTD(data);
              setIsOpenModalInfoNTD(true);
            }, 100); // khoảng delay 100ms, bạn có thể điều chỉnh nếu cần
          } else {
            // Nếu modal chưa mở, mở ngay
            handleUpdateCustomerPopup(data?.cus_id);
            setInfoNTD(data);
            setIsOpenModalInfoNTD(true);
          }
        } else {
          handleUpdateCustomerPopup(data?.cus_id);
        }
      }

      const handleAddUngvienAITinTDClient = async (data) => {
        const linebussy = await handleCheckLineBusy()
        const duplicate = await checkPhoneDuplicate(data?.phone_number)
        const isBusy = await checkBusyHand(decodedToken?.data?.idQLC)

        console.log("VAODAY AITinTDClient", linebussy, duplicate, isBusy)
        if (!linebussy && !duplicate && !isBusy) {
          console.log("📥 Nhận AddUngvienAITinTDClient từ server lúc đang rảnh: ", data);
          if (isOpenModalInfoUV) {
            console.log("ĐANG MỞ UV");
            setIsOpenModalInfoUV(false)
            setTimeout(() => {
              // Cập nhật thông tin và mở lại modal
              setInfoUV(data);
              setIsOpenModalInfoUV(true);
            }, 100); // khoảng delay 100ms, bạn có thể điều chỉnh nếu cần
          } else {
            setInfoUV(data);
            setIsOpenModalInfoUV(true);
          }
        } else {
          handleUpdateCustomerPopup(data?.cus_id);
        }
      }

      const handleNTDFacebook = async (data) => {
        console.log("DATA FACEBOOK", data);
        const linebussy = await handleCheckLineBusy()
        const duplicate = await checkPhoneDuplicate(data?.phone_number)
        const isBusy = await checkBusyHand(decodedToken?.data?.idQLC)
        console.log("VAODAY FACEBOOK", linebussy, duplicate, isBusy)
        if (!linebussy && !duplicate && !isBusy) {
          console.log("📥 Nhận AddNTDFacebookClient từ server lúc đang rảnh: ", data);
          if (isOpenModalInfoNTDFB) {
            console.log("ĐANG MỞ FACEBOOK");
            setIsOpenModalInfoNTDFB(false);
            setInfoNTD(data);
            setIsOpenModalInfoNTDFB(true);
          } else {
            // Nếu modal chưa mở, mở ngay
            setInfoNTD(data);
            setIsOpenModalInfoNTDFB(true);
          }
        } else {
        }
      }

      newSocket.on('connect', () => {
        console.log('Kết nối thành công với server WebSocket');
        newSocket.emit("ping", userId);

        //test socket server job247
        newSocket.on("pong", (data) => {
          console.log("Nhận pong từ server:", data);
        });

        //join room
        newSocket.emit('CRMJoin', userId)

        newSocket.off('AddNTDToCrmClient', handleAddNTD);
        newSocket.off('AddUngvienAITinTDClient', handleAddUngvienAITinTDClient);
        newSocket.off('AddNTDFacebookClient', handleNTDFacebook);

        //listen socket AddNTDToCrmClient
        newSocket.on('AddNTDToCrmClient', handleAddNTD);

        newSocket.on('AddUngvienAITinTDClient', handleAddUngvienAITinTDClient);

        newSocket.on('AddNTDFacebookClient', handleNTDFacebook);

      });

      newSocket.on("disconnect", (reason) => {
        console.log("Mất kết nối WebSocket:", reason);
      });

      return () => {
        newSocket.off('AddNTDToCrmClient', handleAddNTD); // Xóa event khi component unmount
        newSocket.off('AddUngvienAITinTDClient', handleAddUngvienAITinTDClient);
        newSocket.disconnect();
      };
    }
  }, [decodedToken?.data?.idQLC]);

  const handleUpdateCustomerPopup = async (cus_id) => {
    console.log("VAO DAY UPDATE POPUP")
    try {
      const url = "https://api.timviec365.vn/api/crm/customerdetails/updateCustomerAfterPopup";
      const formData = new FormData();

      formData.append("cus_id", cus_id);


      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        console.log("DATAAAA", data);
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  }



  const handleCheckLineBusy = async () => {
    try {
      const res = await axios.post('https://voip.timviec365.vn/api/GetInforEndpoint', {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });
      if (res.status == 200) {
        const res1 = await axios.post('https://voip.timviec365.vn/api/checkLineBusy', {
          "linekd": res?.data?.data?.data?.extension_number
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        });

        console.log("RESSSSS", res1?.data?.isBusy)
        if (!res1?.data?.isBusy) {
          console.log("VAO DÂYYYY")
          setIsOpenModalInfoNTD(false);
        }
        setIslineBusy(res1?.data?.isBusy);
        return res1?.data?.isBusy;
      } else {
        console.log("Error api");
      }

    } catch (error) {
      console.log("Error:", error);
    }
  }

  const checkPhoneDuplicate = async (phone) => {
    const date_now = new Date();
    const vietnam_time = new Date(date_now.getTime() + (7 * 60 * 60 * 1000));
    const formatted_date = vietnam_time.toISOString().split('T')[0];
    console.log("phoneDuplicate", phone)

    const resPhoneCus = await axios.post("https://voip.timviec365.vn/api/check_cusphone_statical",
      {
        phone_customer: phone.trim(),
        date_now: formatted_date,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        }
      }
    )
    console.log("CHECKDUP", resPhoneCus?.data)

    if (resPhoneCus?.data?.data?.totalRecords >= 1) {
      setIsDuplicated(true);
      return true;
    } else {
      setIsDuplicated(false);
      return false;
    }
  }

  const checkBusyHand = async (idQLC) => {
    console.log("ID", idQLC)
    const resBusyHand = await axios.post("https://api.timviec365.vn/api/crm/busy/checkBusyState",
      {
        idQLC: idQLC,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        }
      }
    )
    console.log("resBusyHand", resBusyHand?.data?.data.isBusy)
    return resBusyHand?.data?.data.isBusy;
  }


  const getData = async () => {
    try {
      const res = await axios.post('https://voip.timviec365.vn/api/GetInforEndpoint', {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });
      if (res.status == 200) {
        console.log("VAO DAY SETTTTTTTTTT")
        setKdinfo(res?.data?.data?.data)
      } else {
        console.log("Error api");
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className={`${styles.main__control} ${styles.customer_custom}`}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div
            className={`${styles.main__control_search} ${styles.f_search_customer}`}
          >
            <form
              onSubmit={(e) => (e.preventDefault(), handleSearchKH())}
              className={styles.form_search}
            >
              <Input
                type="text"
                value={data}
                onChange={(e) => (
                  setNameFill(e.target.value.trim()), setData(e.target.value)
                )}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên khách hàng, điện thoại, email"
              />
              <button
                onClick={() => handleSearchKH()}
                type="button"
                style={{ width: "115px" }}
              >
                <div>Tìm kiếm </div>
              </button>
            </form>
          </div>
          <div className={styles.main_control_new}>
            <div className={styles.dropdown_action_btn}>
              <button
                onClick={showDrawer}
                className={styles.btn_light_filter}
                style={{ color: "#4C5BD4", fontWeight: 600, fontSize: 15 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 4,
                  }}
                >
                  <div>
                    <Image
                      src="/crm/icon_search.svg"
                      alt="filter"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div>Bộ lọc</div>
                </div>
              </button>
            </div>
            <div className={styles.dropdown_action_btn}>
              <Link className={styles.api_connect_btn} href={"/setting/api"}>
                <button
                  className={styles.btn_light_api}
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "'Roboto-Medium'",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontFamily: "Roboto-Medium",
                      paddingTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    <div>
                      <Image
                        src="/crm/h_export_cus.svg"
                        alt="filter"
                        width={15}
                        height={15}
                      />
                    </div>
                    <div>Kết nối API</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <CustomerListAction
          clearOption={clearOption}
          chooseAllOption={chooseAllOption}
          numberSelected={numberSelected}
          selectedCus={selectedCus}
          id={"123"}
          listNV={listNV}
          handover={handover}
          fetchData={fetchData}
          dataLength={dataLength}
          isRowDataSelected={isRowDataSelected}
          selectedCusIds={selectedCusIds}
        />

        <div className={`${styles.main__control_add}`}>
          {com_id === ID_HUNGHA && (
            <button
              type="button"
              onClick={() => setIsOpenModalBusy(true)}
              style={{ backgroundColor: 'red', borderColor: 'red' }}
              className={`${styles.dropbtn_add} flex_align_center `}
            >
              Bận
            </button>
          )}

          <Link href="/customer/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>

          {com_id === ID_HUNGHA && (
            <button
              type="button"
              onClick={() => setIsOpenModalConvertCart(true)}
              className={`${styles.dropbtn_add} flex_align_center `}
            >
              Dữ liệu chia khách hàng
            </button>
          )}

          {com_id === ID_HUNGHA && (
            <button
              type="button"
              onClick={() => setIsOpenModalSettingCall(true)}
              className={`${styles.dropbtn_add} flex_align_center `}
            >
              Cài đặt sử dụng gọi điện
            </button>
          )}
          {com_id === ID_HUNGHA && (
            <button
              type="button"
              onClick={() => setIsOpenModalDataCustomerKD(true)}
              className={`${styles.dropbtn_add} flex_align_center `}
            >
              Dữ liệu kinh doanh
            </button>
          )}

          <button
            type="button"
            onClick={handleClickFile}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
          >
            <img src="/crm/h_import_cus.svg" />
            Nhập từ file
            <input type="file" hidden ref={inputFileRef} />
          </button>
          {isLoading ? (
            <button
              type="button"
              style={{ height: "39px" }}
              onClick={() => {
                cancelDownloadRef.current = true;
              }}
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
            >
              Hủy
              <LoadingLayout />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleLoading(handleGetAllCustomer)}
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
            >
              <img src="/crm/icon_excel.svg" />
              Xuất excel
            </button>
          )}
        </div>
      </div>

      <Drawer
        title={<div style={{ color: "#fff" }}>Bộ lọc</div>}
        placement="right"
        onClose={onClose}
        open={open}
        style={{ overflowY: "hidden" }}
        className="custom_drawer"
        footer
        closable
        headerStyle={{ textAlign: "center", background: "#4C5BD4" }}
      >
        <div>
          <CustomerListFilterBox
            keyword={name}
            status={status}
            resoure={resoure}
            user_create_id={nvPhuTrach}
            emp_id={emp_id}
            group_id={group_id}
            page={page}
            idNhom={idNhom}
            setIdNhom={setIdNhom}
            dataStatusCustomer={dataStatusCustomer}
            setOpen={setOpen}
            setStatus={setStatus}
            fetchData={fetchData}
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
            setDatatable={setDatatable}
            setloading={setloading}
            setgroup_id={setgroup_id}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            setdateE={setdateE}
            setdateS={setdateS}
            setemp_id={setemp_id}
            nv={nv}
            role={role}
            posId={posId}
            listNV={listNV}
            nameNvNomor={nameNvNomor}
            listGr={listGr}
            listGr_Child={listGr_Child}
            setIsApDung={setIsApDung}
            setIsOpenFilterBox={setIsOpenFilterBox}
            isOpenFilterBox={isOpenFilterBox}
            nameFill={nameFill}
            name={name}
            timeStart={timeStart}
            timeEnd={timeEnd}
            dateE={dateE}
            dateS={dateS}
            time_at_e={time_at_e}
            time_at_s={time_at_s}
            date_at_s={date_at_s}
            date_at_e={date_at_e}
            settime_at_e={settime_at_e}
            settime_at_s={settime_at_s}
            setdate_at_s={setdate_at_s}
            setdate_at_e={setdate_at_e}
          />
        </div>
      </Drawer>
      <ModalDataConvertCart
        isOpenModalConvertCart={isOpenModalConvertCart}
        setIsOpenModalConvertCart={setIsOpenModalConvertCart}
      />
      <ModalInfoCustomer
        isOpenModalInfoNTD={isOpenModalInfoNTD}
        setIsOpenModalInfoNTD={setIsOpenModalInfoNTD}
        infoNTD={infoNTD}
        linekd={kdinfo?.extension_number}
      />

      <ModalInfoUVien
        isOpenModalInfoUV={isOpenModalInfoUV}
        setIsOpenModalInfoUV={setIsOpenModalInfoUV}
        infoUV={infoUV}
      />

      <ModalInfoNTDFB
        isOpenModalInfoNTDFB={isOpenModalInfoNTDFB}
        setIsOpenModalInfoNTDFB={setIsOpenModalInfoNTDFB}
        infoNTD={infoNTD}
      />
      <ModalAgentBusy
        isOpenModalBusy={isOpenModalBusy}
        setIsOpenModalBusy={setIsOpenModalBusy}
      />
      <ModalDataCustomerKD
        isOpenModalDataCustomerKD={isOpenModalDataCustomerKD}
        setIsOpenModalDataCustomerKD={setIsOpenModalDataCustomerKD}
      />
      {(isOpenModalSettingCall && <ModalDataCustomerCall
        isOpenModalDataCustomerKD={isOpenModalSettingCall}
        setIsOpenModalDataCustomerKD={setIsOpenModalSettingCall}
      />)}

    </>
  );
}
