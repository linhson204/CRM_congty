import React, { useEffect, useState } from "react";
import styles from "../potential/merge/merge.module.css";
import RowRadioInput from "../potential/merge/row_input_radio";
import CancelModalCustomApi from "../customer/customer_modal/customer_mdal_cancel";
import ModalError from "../customer/customer_modal/error_mdal";
import { base_url } from "../service/function";
import RowRadioInputDate from "../potential/merge/row_input_radio_date";
import RowRadioInputDes from "../potential/merge/row_input_description";
import { getCookie } from "cookies-next";
const Cookies = require("js-cookie");

interface CustomerProps { }

const TableDataCustomerMerge: React.FC<CustomerProps> = ({ }) => {
  const [defaultCheckBox, setDefaultCheckBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState("/crm/user_kh.png");
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenSuccessMdal, setISOpenSuccessMdal] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedData, setSelectedData] = useState<any>({});
  const [defaultState, setDefaultState] = useState({});
  const [newData, setNewData] = useState<any>([]);
  const storedData = sessionStorage.getItem("DataSelectedCustomer");
  const parsedData = JSON.parse(storedData)?.data;
  const [targetId, setTargetId] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [stand_name, setStand_name] = useState("");
  const [logo, setLogo] = useState("");
  const [tax_code, setTax_code] = useState("");
  const [address, setAddress] = useState("");
  const [ship_invoice_address, setShip_invoice_address] = useState("");
  const [gender, setGender] = useState("");
  const [cmnd_ccnd_number, setCmnd_ccnd_number] = useState("");
  const [cmnd_ccnd_address, setCmnd_ccnd_address] = useState("");
  const [cmnd_ccnd_time, setCmnd_ccnd_time] = useState("");
  const [description, setDescription] = useState("");
  const [introducer, setIntroducer] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [emp_id, setEmp_id] = useState("");
  const [group_id, setGroup_id] = useState("");
  const [status, setStatus] = useState("");
  const [classify, setClassify] = useState("");
  const [bill_city, setBill_city] = useState("");
  const [bill_district, setBill_district] = useState("");
  const [bill_ward, setBill_ward] = useState("");
  const [bill_address, setBill_address] = useState("");
  const [bill_invoice_address, setBill_invoice_address] = useState("");
  const [ship_city, setShip_city] = useState("");
  const [bank_id, setBank_id] = useState("");
  const [bank_account, setBank_account] = useState("");
  const [revenue, setRevenue] = useState("");
  const [resoure, setResoure] = useState("");
  const [size, setSize] = useState("");
  const [rank, setRank] = useState("");
  const [website, setWebsite] = useState("");
  const [number_of_day_owed, SetNumber_of_day_owed] = useState("");
  const [share_all, setShare_all] = useState("");
  const [email, setEmail] = useState("");
  const [business_areas, setBusiness_areas] = useState("");
  const [loai_hinh_khach_hang, setLoai_hinh_khach_hang] = useState("");
  const [country, setCountry] = useState("");
  const [bill_area_code, setBill_area_code] = useState("");
  const [bill_invoice_address_email, setBill_invoice_address_email] =
    useState("");
  const [giao_hang_huyen, setGiao_hang_huyen] = useState("");
  const [giao_hang_xa, setGiao_hang_xa] = useState("");
  const [ship_area, setShip_area] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [la_khach_hang_tu, setLa_khach_hang_tu] = useState("");
  const [han_muc_no, setHan_muc_no] = useState("");


  const com_id = getCookie("com_id").toString()

  function generateDateCowStringFromTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Chuyển đổi Unix timestamp thành đối tượng Date
    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và định dạng thành 2 chữ số
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và định dạng thành 2 chữ số
    const year = date.getFullYear();
    const result = `${day}/${month}/${year}`;
    return result;

  }


  const getCustomerDetail = async () => {
    const promises =
      parsedData &&
      parsedData
        ?.split(",")
        .map(Number)
        .map(async (cusId) => {
          const res = await fetch(
            `${base_url}/api/crm/customerdetails/detail`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token_base365")}`,
              },
              body: JSON.stringify({ cus_id: cusId }),
            }
          );
          return await res.json();
        });

    const customerDetails = await Promise.all(promises);
    setNewData(customerDetails);
  };


  const handleCombineCustomer = async () => {
    try {
      const formData = new FormData();
      formData.append("target_id", targetId)
      formData.append("arrCus", parsedData);
      formData.append("comId", com_id);
      // formData.append("type", type);
      formData.append("stand_name", stand_name);
      formData.append("name", name);
      formData.append("logo", logo);
      formData.append("tax_code", tax_code || '0');
      formData.append("address", address);
      formData.append("ship_invoice_address", ship_invoice_address);
      formData.append("gender", gender || "0");
      formData.append("cmnd_ccnd_number", cmnd_ccnd_number);
      formData.append("cmnd_ccnd_address", cmnd_ccnd_address);
      formData.append("cmnd_ccnd_time", cmnd_ccnd_time);
      formData.append("description", description);
      formData.append("introducer", introducer);
      formData.append("phone_number", phone_number);
      formData.append("emp_id", emp_id);
      formData.append("group_id", group_id || "0");
      formData.append("status", status || "0");
      formData.append("classify", classify || "0");
      formData.append("bill_city", bill_city);
      formData.append("bill_district", bill_district);
      formData.append("bill_ward", bill_ward);
      formData.append("bill_address", bill_address);
      formData.append("bill_invoice_address", bill_invoice_address);
      formData.append("ship_city", ship_city);
      formData.append("bank_id", bank_id || "0");
      formData.append("bank_account", bank_account);
      formData.append("revenue", revenue || "0");
      formData.append("resoure", resoure);
      formData.append("size", size);
      formData.append("rank", rank || "0");
      formData.append("website", website);
      formData.append("number_of_day_owed", number_of_day_owed || "0");
      formData.append("share_all", share_all || "0");
      formData.append("email", email);
      formData.append("business_areas", business_areas || "0");
      formData.append("loai_hinh_khach_hang", loai_hinh_khach_hang);
      formData.append("han_muc_no", han_muc_no);
      formData.append(
        "la_khach_hang_tu",
        generateDateCowStringFromTimestamp(la_khach_hang_tu)
      );
      formData.append(
        "created_at",
        generateDateCowStringFromTimestamp(created_at)
      );
      formData.append("ship_area", ship_area);
      formData.append("giao_hang_xa", giao_hang_xa);
      formData.append("giao_hang_huyen", giao_hang_huyen);
      formData.append("bill_invoice_address_email", bill_invoice_address_email);
      formData.append("bill_area_code", bill_area_code);
      formData.append("country", country)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/customerdetails/combineCustome`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: formData,
        }
      );
    } catch (error) { }
  };


  const handleSaveButtonClick = async () => {
    setISOpenSuccessMdal(false);

    await handleCombineCustomer();
  };

  const handleImageChange = (index: number) => {
    let newValues = selectedData?.logo;
    let newData: any = newValues?.map((item) => {
      return {
        ...item,
        status: false,
      };
    });

    newData?.splice(index, 1, {
      status: true,
      val: newData[index]?.val,
      info: newData[index]?.info,
    });

    setSelectedData((prev) => {
      return {
        ...prev,
        logo: newData,
      };
    });
  };




  const checkAndReturnData = (val) => {
    if (selectedData?.[val]?.filter((item) => item.status)?.length > 0) {
      return (
        selectedData?.[val]?.filter((item) => item.status)[0].info ||
        selectedData?.[val]?.filter((item) => item.status)[0].val
      );
    } else {
      // alert("Vui long chon day du thuoc tinh");
      setIsOpenModalError(true);
    }
  };

  const handleClickOpenModal = () => {
    // setISOpenSuccessMdal(true);
    const dataPost = {
      arrCus: parsedData,
      name: checkAndReturnData("name"),
      stand_name: checkAndReturnData("stand_name"),
      logo: checkAndReturnData("logo"),
      tax_code: checkAndReturnData("tax_code"),
      address: checkAndReturnData("address"),
      ship_invoice_address: checkAndReturnData("ship_invoice_address"),
      gender: checkAndReturnData("gender"),
      cmnd_ccnd_number: checkAndReturnData("cmnd_ccnd_number"),
      cmnd_ccnd_address: checkAndReturnData("cmnd_ccnd_address"),
      cmnd_ccnd_time: checkAndReturnData("cmnd_ccnd_time"),
      description: checkAndReturnData("description"),
      size: checkAndReturnData("size"),
      rank: checkAndReturnData("rank"),
      website: checkAndReturnData("website"),
      introducer: checkAndReturnData("introducer"),
      phone_number: checkAndReturnData("phone_number"),
      emp_id: checkAndReturnData("emp_id"),
      group_id: checkAndReturnData("group_id"),
      status: checkAndReturnData("status"),
      business_areas: checkAndReturnData("business_areas"),
      classify: checkAndReturnData("classify"),
      loai_hinh_khach_hang: checkAndReturnData("loai_hinh_khach_hang"),
      bill_city: checkAndReturnData("bill_city"),
      bil_district: checkAndReturnData("bill_district"),
      bill_ward: checkAndReturnData("bill_ward"),
      bill_address: checkAndReturnData("bill_address"),
      bill_invoice_address: checkAndReturnData("bill_invoice_address"),
      bill_invoice_address_email: checkAndReturnData(
        "bill_invoice_address_email"
      ),
      ship_city: checkAndReturnData("ship_city"),
      bank_id: checkAndReturnData("bank_id"),
      bank_account: checkAndReturnData("bank_account"),
      revenue: checkAndReturnData("revenue"),
      resoure: checkAndReturnData("resoure"),
      created_at: checkAndReturnData("created_at"),
      ship_area: checkAndReturnData("ship_area"),
      number_of_day_owed: checkAndReturnData("number_of_day_owed"),
      share_all: checkAndReturnData("share_all"),
      type: checkAndReturnData("type"),
      target_id: targetId,
      la_khach_hang_tu: checkAndReturnData("la_khach_hang_tu"),
      han_muc_no: checkAndReturnData("han_muc_no"),
      email: checkAndReturnData("email"),
      giao_hang_xa: checkAndReturnData("giao_hang_xa"),
      giao_hang_huyen: checkAndReturnData("giao_hang_huyen"),
      bill_area_code: checkAndReturnData("bill_area_code"),
      country: checkAndReturnData("country"),
      ship_country: checkAndReturnData("country"),
    };

    if (targetId && !isOpenModalError) {
      setISOpenSuccessMdal(true);
    } else {
      setIsOpenModalError(true);
    }
  };

  const handleSelectAll = (index: number) => {
    setSelectedData(defaultState);
    const targetArr = parsedData?.split(",");
    setTargetId(targetArr[index]);
    setSelectedData((prevSelectedData) => {
      const updatedSelectedData = { ...prevSelectedData };
      for (const key in updatedSelectedData) {
        if (Array.isArray(updatedSelectedData[key])) {
          updatedSelectedData[key] = updatedSelectedData[key].map((item, i) =>
            i === index
              ? {
                ...item,
                status: true,
              }
              : {
                ...item,
                status: false,
              }
          );
        }
      }
      return updatedSelectedData;
    });
  };

  const setDefaultArr = (param: any, data) => {
    return data?.map((el) => {
      return {
        status: false,
        val:
          typeof param === "string"
            ? el?.data?.[param]
            : param?.length === 2
              ? el?.data?.[param?.[0]]?.[param?.[1]]
              : el?.data?.[param?.[0]]?.[param?.[1]]?.[param?.[2]],
        info: typeof param === "string" ? null : el?.data?.[param?.[0]]?.info,
      };
    });
  };

  useEffect(() => {
    if (newData) {
      const data = {
        name: setDefaultArr("name", newData),
        stand_name: setDefaultArr(["stand_name", "detail"], newData),
        logo: setDefaultArr("logo", newData),
        tax_code: setDefaultArr("tax_code", newData),
        type: setDefaultArr("type", newData),
        phone_number: setDefaultArr(["phone_number", "detail"], newData),
        classify: setDefaultArr(["classify", "detail"], newData),
        introducer: setDefaultArr(["introducer", "detail"], newData),
        loai_hinh_khach_hang: setDefaultArr("loai_hinh_khach_hang", newData),
        group_id: setDefaultArr(["group_id", "detail", "gr_name"], newData),
        status: setDefaultArr(["status", "detail", "stt_name"], newData),
        emp_id: setDefaultArr(["emp_id", "detail", "userName"], newData),
        country: setDefaultArr("country", newData), //
        bill_city: setDefaultArr(["bill_city", "detail"], newData),
        bill_district: setDefaultArr(["bill_district", "detail"], newData),
        bill_ward: setDefaultArr(["bill_ward", "detail"], newData),
        bill_invoice_address: setDefaultArr(
          ["bill_invoice_address", "detail"],
          newData
        ),
        bill_area_code: setDefaultArr(["bill_area_code", "detail"], newData),
        bill_address: setDefaultArr(["bill_address", "detail"], newData),
        bill_invoice_address_email: setDefaultArr(
          ["bill_invoice_address_email", "detail"],
          newData
        ),
        ship_city: setDefaultArr("ship_city", newData),
        giao_hang_huyen: setDefaultArr("giao_hang_huyen", newData),
        giao_hang_xa: setDefaultArr("giao_hang_xa", newData),
        address: setDefaultArr(["address", "detail"], newData),
        ship_area: setDefaultArr(["ship_area", "detail"], newData),
        ship_invoice_address: setDefaultArr(
          ["ship_invoice_address", "detail"],
          newData
        ),
        business_areas: setDefaultArr(["business_areas", "detail"], newData),
        bank_id: setDefaultArr(["bank_id", "detail"], newData),
        bank_account: setDefaultArr(["bank_account", "detail"], newData),
        created_at: setDefaultArr("created_at", newData),
        la_khach_hang_tu: setDefaultArr("la_khach_hang_tu", newData),
        revenue: setDefaultArr(["revenue", "detail"], newData),
        resoure: setDefaultArr(["resoure", "detail"], newData),
        size: setDefaultArr(["size", "detail"], newData),
        website: setDefaultArr("website", newData),
        rank: setDefaultArr(["rank", "detail"], newData),
        han_muc_no: setDefaultArr("han_muc_no", newData),
        number_of_day_owed: setDefaultArr("number_of_day_owed", newData),
        email: setDefaultArr(["email", "detail"], newData),
        gender: setDefaultArr("gender", newData),
        cmnd_ccnd_number: setDefaultArr("cmnd_ccnd_number", newData),
        cmnd_ccnd_address: setDefaultArr("cmnd_ccnd_address", newData),
        cmnd_ccnd_time: setDefaultArr("cmnd_ccnd_time", newData),
        description: setDefaultArr(["description", "detail"], newData),
        share_all: setDefaultArr("share_all", newData),
        ship_country: setDefaultArr("country", newData), //
      };

      setSelectedData(data);
      setDefaultState(data);
    }
  }, [newData]);

  useEffect(() => {
    getCustomerDetail();
  }, []);

  return (
    <>
      <div className={styles.main_potential}>
        <div className={styles.content_table}>
          <div className={styles.main_title}>Gộp trùng khách hàng</div>
          <div className={styles.main_table}>
            <div className={styles.scroll_table_left}>
              <table className={styles.table_info}>
                <thead>
                  <tr>
                    <th colSpan={2}>Bản ghi chính</th>
                    {newData?.map((record, index) => (
                      <th key={index}>
                        Bản ghi {index + 1}
                        <button
                          onClick={() => {
                            handleSelectAll(index);
                          }}
                        >
                          {/* {selectAllData ? "Bỏ chọn" : "Chọn tất cả"} */}
                          Chọn tất cả
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Type */}
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setType}
                    name="type"
                    title="Loại hình:"
                    setTargetId={setTargetId}
                    targetId={parsedData}
                    value={
                      newData?.map((item) => item?.data?.type) ||
                      "Chưa cập nhật"
                    }
                  />

                  {/* Imgae */}
                  <tr>
                    <td>
                      <p className={styles.main_body_type}>Ảnh</p>
                    </td>
                    <td>
                      <img
                        style={{ transform: "translate(15%, 15%)" }}
                        src="/crm/user_kh.png"
                        className={styles.img_person}
                      />
                    </td>
                    {newData?.map((record, index) => (
                      <td key={index}>
                        <input
                          onChange={() => handleImageChange(index)}
                          checked={selectedData?.logo?.[index]?.status}
                          name="logo"
                          type="radio"
                          className={styles.radio}
                          value={
                            newData?.map((item) => item?.data?.logo) ||
                            "/crm/user_kh.png"
                          }
                        />
                        <img
                          style={{ transform: "translate(15%, 15%)" }}
                          src="/crm/user_kh.png"
                          className={styles.img_person}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* General Info */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin chung
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setValueRadio={setName}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="name"
                    title="Tên khách hàng:"
                    value={
                      newData?.map((item) => item?.data?.name) ||
                      "Chưa cập nhật"
                    }
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setStand_name}
                    name="stand_name"
                    title="Tên viết tắt:"
                    value={newData?.map(
                      (item) =>
                        item?.data?.stand_name?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setTax_code}
                    name="tax_code"
                    title="Mã số thuế"
                    value={newData?.map(
                      (item) => item?.data?.tax_code || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setPhone_number}
                    name="phone_number"
                    title="Điện thoại:"
                    value={newData?.map(
                      (item) =>
                        item?.data?.phone_number?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setEmail}
                    name="email"
                    title="Email:"
                    value={newData?.map(
                      (item) => item?.data?.email?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setResoure}
                    name="resoure"
                    title="Nguồn khách hàng:"
                    value={newData?.map(
                      (item) => item?.data?.resoure?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setClassify}
                    name="classify"
                    title="Phân loại khách hàng"
                    value={newData?.map(
                      (item) => item?.data?.classify?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setIntroducer}
                    name="introducer"
                    title="Lĩnh vực"
                    value={newData?.map(
                      (item) =>
                        item?.data?.introducer?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setLoai_hinh_khach_hang}
                    name="loai_hinh_khach_hang"
                    title="Loại hình"
                    value={newData?.map(
                      (item) =>
                        item?.data?.loai_hinh_khach_hang || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBusiness_areas}
                    name="business_areas"
                    title="Ngành nghề"
                    value={newData?.map(
                      (item) => item?.business_areas?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setGroup_id}
                    name="group_id"
                    title="Nhóm khách hàng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.group_id?.detail?.gr_name || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setStatus}
                    name="status"
                    title="Tình trạng khách hàng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.status?.detail?.stt_name || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setEmp_id}
                    name="emp_id"
                    title="Nhân viên phụ trách"
                    value={newData?.map(
                      (item) =>
                        item?.data?.emp_id?.detail?.userName || "Chưa cập nhật"
                    )}
                  />

                  {/* Bill Infor */}

                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin viết hóa đơn
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setCountry}
                    name="country"
                    title="Quốc gia:"
                    value={newData?.map(
                      (item) => item?.data?.country || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBill_city}
                    name="bill_city"
                    title="Tỉnh/Thành phố"
                    value={newData?.map(
                      (item) => item?.data?.bill_city?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBill_district}
                    name="bill_district"
                    title="Quận/Huyện"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_district?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBill_ward}
                    name="bill_ward"
                    title="Phường/Xã"
                    value={newData?.map(
                      (item) => item?.data?.bill_ward?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBill_invoice_address}
                    name="bill_invoice_address"
                    title="Số nhà "
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_invoice_address?.detail ||
                        "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBill_area_code}
                    name="bill_area_code"
                    title="Mã vùng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_area_code?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBill_address}
                    name="bill_address"
                    title="Địa chỉ hóa đơn"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_address?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBill_invoice_address_email}
                    name="bill_invoice_address_email"
                    title="Địa chỉ email nhận hóa đơn (email)"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_invoice_address_email?.detail ||
                        "Chưa cập nhật"
                    )}
                  />

                  {/* Giao hang Infor */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin giao hàng
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setCountry}
                    name="ship_country"
                    title="Quốc gia"
                    value={newData?.map(
                      (item) => item?.country || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setShip_city}
                    name="ship_city"
                    title="Tỉnh/Thành phố"
                    value={newData?.map(
                      (item) => item?.data?.ship_city || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setGiao_hang_huyen}
                    name="giao_hang_huyen"
                    title="Quận/Huyện"
                    value={newData?.map(
                      (item) => item?.data?.giao_hang_huyen || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setGiao_hang_xa}
                    name="giao_hang_xa"
                    title="Phường/Xã"
                    value={newData?.map(
                      (item) => item?.data?.giao_hang_xa || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setAddress}
                    name="address"
                    title="Số nhà"
                    value={newData?.map(
                      (item) => item?.data?.address?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setShip_area}
                    name="ship_area"
                    title="Mã vùng"
                    value={newData?.map(
                      (item) => item?.data?.ship_area?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setShip_invoice_address}
                    name="ship_invoice_address"
                    title="Địa chỉ hóa đơn"
                    value={newData?.map(
                      (item) =>
                        item?.data?.ship_invoice_address?.detail ||
                        "Chưa cập nhật"
                    )}
                  />

                  {/* Bonus infor */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin bổ sung
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBank_id}
                    name="bank_id"
                    title="Tài khoản ngân hàng"
                    value={newData?.map(
                      (item) => item?.data?.bank_id?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setBank_account}
                    name="bank_account"
                    title="Mở tại ngân hàng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bank_account?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInputDate
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setCreated_at}
                    name="created_at"
                    title="Ngày thành lập/Ngày sinh"
                    value={newData?.map(
                      (item) => item?.data?.created_at || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInputDate
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setLa_khach_hang_tu}
                    name="la_khach_hang_tu"
                    title="Là khách hàng từ"
                    value={newData?.map(
                      (item) => item?.data?.la_khach_hang_tu || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setRevenue}
                    name="revenue"
                    title="Doanh thu"
                    value={newData?.map(
                      (item) => item?.data?.revenue?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setSize}
                    name="size"
                    title="Quy mô nhân sự"
                    value={newData?.map(
                      (item) => item?.data?.size?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setWebsite}
                    name="website"
                    title="Website"
                    value={newData?.map(
                      (item) => item?.data?.website || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setRank}
                    name="rank"
                    title="Xếp hạng khách hàng"
                    value={newData?.map(
                      (item) => item?.data?.rank?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setHan_muc_no}
                    name="han_muc_no"
                    title="Hạn mức nợ"
                    value={newData?.map(
                      (item) => item?.data?.han_muc_no || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={SetNumber_of_day_owed}
                    name="number_of_day_owed"
                    title="Số ngày được nợ"
                    value={newData?.map(
                      (item) =>
                        item?.data?.number_of_day_owed || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setGender}
                    name="gender"
                    title="Giới tính"
                    value={newData?.map(
                      (item) => item?.data?.gender || "Chưa cập nhật"
                    )}
                  />

                  {/* CCCD */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin CMND/CCCD
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setCmnd_ccnd_number}
                    name="cmnd_ccnd_number"
                    title="Số CMND/CCCD"
                    value={newData?.map(
                      (item) => item?.data?.cmnd_ccnd_number || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setCmnd_ccnd_address}
                    name="cmnd_ccnd_address"
                    title="Nơi cấp"
                    value={newData?.map(
                      (item) => item?.data?.cmnd_ccnd_address || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInputDate
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setCmnd_ccnd_time}
                    name="cmnd_ccnd_time"
                    title="Ngày cấp"
                    value={newData?.map((item) => item?.data?.cmnd_ccnd_time)}
                  />

                  {/*  Description Infor */}
                  <RowRadioInputDes
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setDescription}
                    name="description"
                    title="Thông tin mô tả"
                    value={newData?.map(
                      (item) =>
                        item?.data?.description?.detail || "Chưa cập nhật"
                    )}
                  />

                  {/* System Infor */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin hệ thống
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    setValueRadio={setShare_all}
                    name="share_all"
                    title="Dùng chung:"
                    value={newData?.map(
                      (item) => item?.data?.share_all || "Chưa cập nhật"
                    )}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={styles.main_footer_button}>
          <button
            onClick={() => setIsOpenCancelModal(true)}
            type="button"
            className={styles.btn_cancle}
          >
            Hủy
          </button>
          <button
            onClick={handleClickOpenModal}
            type="button"
            className={styles.btn_save}
          >
            Lưu
          </button>
        </div>
      </div>

      <CancelModalCustomApi
        isModalCancel={isOpenCancelModal}
        setIsModalCancel={setIsOpenCancelModal}
        content={
          "Bạn có chắc chắn muốn hủy lưu thông tin gộp khách hàng mọi thông tin bạn nhập sẽ không được lưu lại?"
        }
        title={"Xác nhận hủy lưu gộp khách hàng"}
        handleCloseMdal={() => setIsOpenCancelModal(false)}
        link={"/customer/list"}
      />

      <CancelModalCustomApi
        isModalCancel={isOpenSuccessMdal}
        setIsModalCancel={setISOpenSuccessMdal}
        title={"Xác nhận gộp trùng khách hàng"}
        link={"/customer/list"}
        content={
          "Tất cả trường thông tin đã chọn sẽ được gộp vào bản ghi chính. Các thông tin liên quan (Tệp đính kèm, Ghi chú, Hoạt động và Hàng hóa) sẽ được gắn với bản ghi chính. Bạn có muốn tiếp tục gộp trùng?"
        }
        handleCloseMdal={() => handleSaveButtonClick()}
      />

      <ModalError
        modal1Open={isOpenModalError}
        setModal1Open={setIsOpenModalError}
        title={"Cần chọn đầy đủ các thuộc tính khách hàng"}
        link={"/customer/same_filter"}
      />
    </>
  );
};

export default TableDataCustomerMerge;
