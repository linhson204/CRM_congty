import React, { useEffect, useState } from "react";
import { Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import styles from "./customer.module.css";
import stylePotentialSlect from "@/components/crm/potential/potential.module.css";
import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";
import moment from "moment";
import { CaretDownOutlined, DownCircleTwoTone } from "@ant-design/icons";
import { Router, useRouter } from "next/router";
import { base_url } from "../service/function";
import Cookies from "js-cookie";
import { tr } from "date-fns/locale";
import { useSelector } from "react-redux";
import { doGhimCha, doSaveCha } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { timestampToCustomString } from "../ultis/convert_date";

const format = "HH:mm";

interface PropsComponent {
  setOpen: any;
  dataStatusCustomer: any;
  setStatus: any;
  fetchData: any;
  setResoure: any;
  datatable: any;
  nvPhuTrach: any;
  setnvPhuTrach: any;
  userNameCreate: any;
  setuserNameCreate: any;
  nhomCha: any;
  setnhomCha: any;
  nhomCon: any;
  setnhomCon: any;
  setDatatable: any;
  setloading: any;
  setgroup_id: any;
  setTimeEnd: any;
  setTimeStart: any;
  setdateS: any;
  setdateE: any;
  setemp_id: any;
  setIdNhom: any;
  nv: any;
  role: any;
  posId: any;
  listNV: any;
  nameNvNomor: any;
  listGr: any;
  listGr_Child?: any;
  setIsApDung?: any;
  setIsOpenFilterBox?: any;
  isOpenFilterBox?: any;
  keyword;
  status;
  resoure;
  user_create_id;
  emp_id;
  group_id;
  page;
  idNhom;
  nameFill;
  name;
  timeStart;
  timeEnd;
  dateE;
  dateS;
  date_at_e;
  time_at_e;
  date_at_s;
  time_at_s;
  setdate_at_e;
  settime_at_e;
  setdate_at_s;
  settime_at_s;
}

const CustomerListFilterBox: React.FC<PropsComponent> = ({
  setOpen,
  dataStatusCustomer,
  setStatus,
  fetchData,
  setResoure,
  datatable,
  nvPhuTrach,
  setnvPhuTrach,
  setuserNameCreate,
  userNameCreate,
  nhomCha,
  setnhomCha,
  nhomCon,
  setnhomCon,
  setDatatable,
  setloading,
  setgroup_id,
  setTimeEnd,
  setTimeStart,
  setdateS,
  setdateE,
  setemp_id,
  setIdNhom,
  nv,
  role,
  posId,
  listNV,
  nameNvNomor,
  listGr,
  listGr_Child,
  setIsApDung,
  setIsOpenFilterBox,
  isOpenFilterBox,
  page,
  keyword,
  status,
  resoure,
  user_create_id,
  emp_id,
  group_id,
  idNhom,
  nameFill,
  name,
  timeEnd,
  timeStart,
  dateE,
  dateS,
  date_at_e,
  time_at_e,
  date_at_s,
  time_at_s,
  setdate_at_e,
  settime_at_e,
  setdate_at_s,
  settime_at_s,
}) => {
  const [valueSelectStatus, setValueSelectStatus] = useState<any>();
  const [valueResoure, sevalueResoure] = useState<any>();
  const [check, setCheck] = useState(false);
  const handlefilter = async () => {
    setloading(true);
    setOpen(false);
  };
  const handleChangeStt = (value: any) => {
    setValueSelectStatus(value);
    setStatus(value);
  };
  const handleChangeResource = (value: any) => {
    sevalueResoure(value);
    setResoure(value);
  };
  const handleChangeNVPT = (value: any) => {
    setemp_id(value);
  };
  const handleChangeNameCreate = (value: any) => {
    setuserNameCreate(value);
  };
  const router = useRouter();
  //const currentTime = moment(); // Thời điểm hiện tại
  //const pastTime = currentTime.subtract(1, "days");

  const [idChaSaved, setidChaSaved] = useState<any>(-1);
  const checkCha = useSelector((state: any) => state?.auth?.ghimCha);
  const valueChaOld = useSelector((state: any) => state?.auth?.valueCha);

  const dispatch = useDispatch();
  const handleGhimNhom = (e) => {
    dispatch(doGhimCha(e.target.checked));
  };
  useEffect(() => {
    if (checkCha) {
    }
  }, [idChaSaved]);
  const [time_s_change, settime_s_change] = useState<any>(
    router.query.start ? router.query.start : null
  );
  const [time_e_change, settime_e_change] = useState<any>(
    router.query.end ? router.query.end : null
  );
  const [create_at_s_change, setcreate_at_s_change] = useState<any>(
    router.query.create_at_s ? router.query.create_at_s : null
  );
  const [create_at_e_change, setcreate_at_e_change] = useState<any>(
    router.query.create_at_e ? router.query.create_at_e : null
  );

  //const starttime = router.query.start?.toString().replace("T", " ");
  //const createstarttime = router.query.create_at_s?.toString().replace("T", " ");

  //const parsedValue = dayjs(starttime);
  //const parsedValueCreateStart = dayjs(createstarttime);
  //const timeValuestart = parsedValue.format("HH:mm");
  //const timeValueCreate_at_s = parsedValueCreateStart.format("HH:mm");

  //const endtime = router.query.end?.toString().replace("T", " ");
  //const createendtime = router.query.create_at_e?.toString().replace("T", " ");
  //const parsedValueend = dayjs(endtime);
  //const parsedValueCreateend = dayjs(createendtime);
  //const timeValueEnd = parsedValueend.format("HH:mm");
  //const timeValueCreateEnd = parsedValueCreateend.format("HH:mm");
  //const dateEndUrl = dayjs(endtime || time_e_change || null).format("YYYY-MM-DD");
  //const dateCreateEndUrl = dayjs(createendtime || create_at_e_change || null).format("YYYY-MM-DD");
  //const defaultstart: any = dayjs(/* starttime || */ time_s_change || null).format("YYYY-MM-DD");
  //const defaultcreate_at_s: any = dayjs(/* createstarttime || */ create_at_s_change || null).format("YYYY-MM-DD");

  useEffect(() => {
    if (isOpenFilterBox) {
      if (timeStart) {
        setTimeStart(dayjs(timeStart).format(format));
      } else {
        setTimeStart("00:00:00");
      }
      if (timeEnd) {
        setTimeEnd(dayjs(timeEnd).format(format));
      } else {
        setTimeEnd("00:00:00");
      }
      if (time_at_s) {
        settime_at_s(dayjs(time_at_s).format(format));
      } else {
        settime_at_s("00:00:00");
      }
      if (time_at_e) {
        settime_at_e(dayjs(time_at_e).format(format));
      } else {
        settime_at_e("00:00:00");
      }
    }
  }, []);
  const [nhomchafilter, setnhomchafilter] = useState<any>();
  const handleSelectNhomCha = (value) => {
    setnhomchafilter(value);
    dispatch(doSaveCha({ id: value }));
    setIdNhom(value);
    setnhomCon("Tất cả");
    setnhomconfilter(null);
    if (value > 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const handleTimeStartChange = (e) => {
    if (!e) {
      setTimeStart("00:00:00");
      settime_s_change(dayjs(dateS).format("YYYY-MM-DD") + "T" + "00:00:00");
    } else {
      let str = "";
      let hour = e["$d"].getHours();
      let default_time = dayjs(e).format("hh:mm:ss");
      if(hour<=12){
        str = default_time;
      }
      else{
        str = `${String(hour)}:${default_time.split(":")[1]}:${default_time.split(":")[2]}`
      }
      setTimeStart(str);
      settime_s_change(
        dayjs(dateS).format("YYYY-MM-DD") + "T" + str
      );
    }
  };
  const handleDateChangeStart = (e) => {
    setdateS(e.target.value);
    settime_s_change(e.target.value + "T" + timeStart);
  };

  const handleTimeEndChange = (e) => {
    if (!e) {
      setTimeEnd("00:00:00");
      settime_e_change(dayjs(dateE).format("YYYY-MM-DD") + "T" + "00:00:00");
    } else {
      let str = "";
      let hour = e["$d"].getHours();
      let default_time = dayjs(e).format("hh:mm:ss");
      if(hour<=12){
        str = default_time;
      }
      else{
        str = `${String(hour)}:${default_time.split(":")[1]}:${default_time.split(":")[2]}`
      }
      setTimeEnd(str);
      settime_e_change(
        dayjs(dateE).format("YYYY-MM-DD") + "T" + str
      );
    }
  };
  const handleDateChangeEnd = (e) => {
    setdateE(e.target.value);
    settime_e_change(e.target.value + "T" + timeEnd);
  };

  const handleTimeCreateStartChange = (e) => {
    if (!e) {
      settime_at_s("00:00:00");
      setcreate_at_s_change(
        dayjs(date_at_s).format("YYYY-MM-DD") + "T" + "00:00:00"
      );
    } else {
      let str = "";
      let hour = e["$d"].getHours();
      let default_time = dayjs(e).format("hh:mm:ss");
      if(hour<=12){
        str = default_time;
      }
      else{
        str = `${String(hour)}:${default_time.split(":")[1]}:${default_time.split(":")[2]}`
      }
      settime_at_s(str);
      setcreate_at_s_change(
        dayjs(date_at_s).format("YYYY-MM-DD") +
          "T" +
          str
      );
    }
  };
  const handleDateCreateChangeStart = (e) => {
    setdate_at_s(e.target.value);
    setcreate_at_s_change(e.target.value + "T" + time_at_s);
  };
  //console.log(isNaN(new Date(time_s_change).getDate()));

  const handleTimeCreateEndChange = (e) => {
    if (!e) {
      settime_at_e("00:00:00");
      setcreate_at_e_change(
        dayjs(date_at_e).format("YYYY-MM-DD") + "T" + "00:00:00"
      );
    } else {
      let str = "";
      let hour = e["$d"].getHours();
      let default_time = dayjs(e).format("hh:mm:ss");
      if(hour<=12){
        str = default_time;
      }
      else{
        str = `${String(hour)}:${default_time.split(":")[1]}:${default_time.split(":")[2]}`
      }
      settime_at_e(str);
      setcreate_at_e_change(
        dayjs(date_at_e).format("YYYY-MM-DD") +
          "T" +
          str
      );
    }
  };
  const handleDateCreateChangeEnd = (e) => {
    console.log(e.target.value, "DateCreEnd");
    setdate_at_e(e.target.value);
    setcreate_at_e_change(e.target.value + "T" + time_at_e);
  };
  // console.log(dateE, "dateE");
  // console.log(timeEnd, "timeEnd");
  // console.log(time_e_change, "time_e_change");

  // console.log(time_at_e, "time_at_e");
  // console.log(date_at_s, "date_at_s");
  // console.log(create_at_e_change, "create_at_e_change");

  const optionTest = [
    { value: null, label: "Tất cả" },
    ...listNV?.map((userName, index) => {
      return {
        value: userName?.idQLC,
        label: `(${userName.idQLC}) ${userName?.userName}  ${
          userName.organization ? `- ${userName.organization}` : ""
        }`,
      };
    }),
  ];
  // const optionTest =
  //   role == "2" && [20, 4, 12, 13, 10, 11, 5, 6].includes(posId)
  //     ? [
  //         { value: null, label: "Tất cả" },
  //         ...nv?.map((userName, index) => {
  //           return {
  //             value: userName?.ep_id,
  //             label: `(${userName.ep_id}) ${userName?.ep_name} - ${userName.dep_name}`,
  //           };
  //         }),
  //       ]
  //     : role == "1" ||
  //       (role == "2" && [7, 8, 14, 16, 22, 21, 18, 19, 17].includes(posId)) // Nếu là công ty hoặc tài khoản nhân viên cấp giám đốc (7, 8, 14, 16, 22,21 ,18,19,17)
  //     ? [
  //         { value: null, label: "Tất cả" },
  //         ...listNV?.map((userName, index) => {
  //           return {
  //             value: userName?.ep_id,
  //             label: `(${userName.ep_id}) ${userName?.ep_name} - ${userName.dep_name}`,
  //           };
  //         }),
  //       ]
  //     : [
  //         [nameNvNomor]?.map((userName, index) => {
  //           return {
  //             value: userName?.ep_id,
  //             label:
  //               `(${userName?._id})` +
  //               " " +
  //               userName?.userName +
  //               " " +
  //               userName?.nameDeparment,
  //           };
  //         }),
  //       ];

  // {
  //   role == "2" &&
  //     posId == 2 &&
  //     [nameNvNomor]?.map((userName, index) => (
  //       <option
  //         style={{ width: "100%" }}
  //         key={index}
  //         value={userName?._id as any}
  //       >
  //         <div style={{ display: "block" }}>
  //           ( {`${userName._id}`}) {`${userName?.userName}`} <br /> -
  //           {`${userName.nameDeparment}`}
  //         </div>
  //       </option>
  //     ));
  // }
  const idnhomcha = listGr_Child?.filter(
    (item) => item?.gr_id === Number(idNhom)
  )[0]?.group_parent;

  let optionCon2;
  if (valueChaOld) {
    optionCon2 = [
      { value: " ", label: "Tất cả" },
      listGr_Child?.map((item: any, index) => {
        if (
          item.group_parent ===
          (checkCha ? valueChaOld : idnhomcha || Number(idNhom) || nhomCha)
        ) {
          return {
            value: item?.gr_id,
            label: item?.gr_name,
          };
        }
      }),
    ];
  }
  const [nhomconfilter, setnhomconfilter] = useState<any>();

  let optionCon: any = [];
  const getOptionC = () => {
    let defaultArr = [{ value: "", label: "Tất cả" }];
    const newArr = listGr_Child
      ?.filter((item: any, index) => {
        return (
          item.group_parent ===
          (checkCha
            ? valueChaOld
            : idnhomcha || Number(idNhom) || nhomchafilter)
        );
      })
      ?.map((item) => {
        return {
          value: item?.gr_id,
          label: item?.gr_name,
        };
      });

    if (newArr !== undefined && newArr && newArr?.length > 0) {
      return [...defaultArr, ...newArr];
    }
    optionCon = defaultArr;
  };
  const chungSinhBinhDang = (inputString: any) => {
    // Chuyển các ký tự có dấu thành các ký tự không dấu
    const stringWithoutDiacritics = inputString
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Chuyển chuỗi thành chữ thường
    const lowercaseString = stringWithoutDiacritics?.toLowerCase();

    return lowercaseString;
  };
  return (
    <>
      <div
        className={styles.mdal_body}
        style={{ padding: 0, maxHeight: "100%" }}
      >
        <div className={styles.form_group}>
          <div className={styles.label}>Thời gian cập nhập</div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                onChange={handleTimeStartChange}
                style={{ width: "100%", height: "37px" }}
                value={dayjs(timeStart, format)}
              />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px", paddingLeft: 10 }}
              >
                <Input
                  onChange={handleDateChangeStart}
                  type="date"
                  value={dayjs(time_s_change)?.format("YYYY-MM-DD")}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                onChange={handleTimeEndChange}
                style={{ width: "100%", height: "37px" }}
                value={dayjs(timeEnd, format)}
              />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px", paddingLeft: 10 }}
              >
                <Input
                  value={dayjs(time_e_change)?.format("YYYY-MM-DD")}
                  onChange={handleDateChangeEnd}
                  type="date"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.form_group}>
          <div className={styles.label}>Thời gian tạo khách hàng</div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                onChange={handleTimeCreateStartChange}
                style={{ width: "100%", height: "37px" }}
                value={dayjs(time_at_s, format)}
              />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px", paddingLeft: 10 }}
              >
                <Input
                  onChange={handleDateCreateChangeStart}
                  type="date"
                  value={dayjs(create_at_s_change)?.format("YYYY-MM-DD")}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                onChange={handleTimeCreateEndChange}
                style={{ width: "100%", height: "37px" }}
                value={dayjs(time_at_e, format)}
              />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px", paddingLeft: 10 }}
              >
                <Input
                  onChange={handleDateCreateChangeEnd}
                  value={dayjs(create_at_e_change)?.format("YYYY-MM-DD")}
                  type="date"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.form_group}>
          <div className={styles.label}>Tình trạng khách hàng</div>
          <Select
            suffixIcon={
              <i
                style={{ color: "black" }}
                className="bi bi-caret-down-fill"
              ></i>
            }
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 7,
            }}
            onChange={handleChangeStt}
            defaultValue={Number(status) ? Number(status) : ""}
            value={valueSelectStatus}
          >
            <option value={""}>Tất cả</option>
            {dataStatusCustomer &&
              dataStatusCustomer.map((item, index) => {
                return (
                  <option key={index} value={item?.stt_id}>
                    {item?.stt_name}
                  </option>
                );
              })}
          </Select>
        </div>
        <div className={styles.form_group}>
          <div className={styles.label}>Nguồn khách hàng</div>
          <Select
            defaultValue={Number(resoure) ? Number(resoure) : ""}
            suffixIcon={
              <i
                style={{ color: "black" }}
                className="bi bi-caret-down-fill"
              ></i>
            }
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 7,
            }}
            value={valueResoure}
            onChange={handleChangeResource}
          >
            <option value={""}>Tất cả</option>
            <option value={1}>{" Facebook"}</option>
            <option value={2}>{" Zalo"}</option>
            <option value={3}>{" Website"}</option>
            <option value={4}>{" Dữ liệu bên thứ 3"}</option>
            <option value={5}>{" Khách hàng giới thiệu"}</option>
            <option value={6}>{" Giới thiệu"}</option>
            <option value={7}>{" Chăm sóc khách hàng"}</option>
            <option value={8}>{" Email"}</option>
          </Select>
        </div>

        <div className={styles.form_group}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.label}>Nhóm khách hàng cha</div>
            <div
              className={styles.label}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                id="group_pins"
                style={{ marginRight: 5 }}
                // defaultValue={420}
                checked={checkCha}
                onChange={(e: any) => handleGhimNhom(e)}
              />
              Ghim nhóm
            </div>
          </div>
          <Select
            // value={checkCha ? +valueChaOld : nhomCha}
            onChange={(value) => handleSelectNhomCha(value)}
            defaultValue={idnhomcha ? idnhomcha : Number(idNhom) || -1}
            suffixIcon={
              <i
                style={{ color: "black" }}
                className="bi bi-caret-down-fill"
              ></i>
            }
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 7,
            }}
            showSearch
            filterOption={(input, option: any) =>
              option?.label.toLowerCase().includes(input.toLocaleLowerCase())
            }
            options={[
              { value: -1, label: "Tất cả" },
              { value: -2, label: "Chưa cập nhật" },
              ...listGr?.map((item: any, index) => {
                if (item?.group_parent == 0) {
                  return {
                    // <option key={index} value={item?.gr_id}>
                    //   {item.gr_name}
                    // </option>
                    value: item?.gr_id,
                    label: item?.gr_name,
                  };
                }
              }),
            ]}
          ></Select>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhóm khách hàng con</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              showSearch
              filterOption={(input, option: any) =>
                option?.label.toLowerCase().includes(input.toLocaleLowerCase())
              }
              value={nhomconfilter}
              onChange={(value) => {
                setnhomCon(value), setIdNhom(value);
                setnhomconfilter(value);
              }}
              defaultValue={idnhomcha ? Number(idNhom) : "" || ""}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 7,
              }}
              options={getOptionC()}
            >
              {/* <option value={""}>Tất cả</option>
              {listGr_Child?.map((item: any, index) => {
                if (item.group_parent === (checkCha ? valueChaOld : nhomCha)) {
                  return (
                    <option key={index} value={item?.gr_id}>
                      {item.gr_name}
                    </option>
                  );
                }
              })} */}
            </Select>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên phụ trách</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              showSearch
              options={optionTest}
              filterOption={(input, option: any) =>
                chungSinhBinhDang(option?.label).includes(
                  chungSinhBinhDang(input)
                )
              }
              defaultValue={Number(emp_id) ? Number(emp_id) : "Tất cả"}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 7,
              }}
              value={nvPhuTrach}
              onChange={handleChangeNVPT}
            ></Select>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên tạo khách hàng</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              defaultValue={"Tất cả"}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 7,
              }}
              value={userNameCreate}
              onChange={handleChangeNameCreate}
            >
              {datatable?.map((item, index) => {
                if (item?.userNameCreate) {
                  return (
                    <option key={index} value={item?.userNameCreate}>
                      {item?.userNameCreate}
                    </option>
                  );
                }
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className={styles.mdal_footer}>
        <button
          type="button"
          className={styles.btn_cancel}
          data-dismiss="modal"
          onClick={() => {
            setOpen(false), router.push("/customer/list");
            setIsOpenFilterBox(false);
            setIsApDung(false);
          }}
        >
          Hủy lọc
        </button>
        <button
          onClick={async () => {
            handlefilter();
            setIsApDung(true);
            router.push(
              `/customer/list?${
                isNaN(new Date(time_s_change).getDate()) || !time_s_change
                  ? ""
                  : `&start=${time_s_change}`
              }${
                isNaN(new Date(time_e_change).getDate()) || !time_e_change
                  ? ""
                  : `&end=${time_e_change}`
              }${
                isNaN(new Date(create_at_s_change).getDate()) ||
                !create_at_s_change
                  ? ""
                  : `&create_at_s=${create_at_s_change}`
              }${
                isNaN(new Date(create_at_e_change).getDate()) ||
                !create_at_e_change
                  ? ""
                  : `&create_at_e=${create_at_e_change}`
              }${status ? `&status=${status}` : ""}${
                resoure ? `&source=${resoure}` : ""
              }${idNhom ? `&group=${idNhom}` : ""}${
                emp_id ? `&emp_id=${emp_id}` : ""
              }${user_create_id ? `&creater=${user_create_id}` : ""}${
                name ? `&keyword=${name}` : ""
              }  
`
            );
          }}
          type="button"
          className={styles.btn_apply}
        >
          Áp dụng
        </button>
      </div>
    </>
  );
};

export default CustomerListFilterBox;
