import { React, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import requestIp from "request-ip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import byteSize from "byte-size";
import jwt_decode from "jwt-decode";
import moment from "moment";
export const getEducation = [
  { id: 0, value: "Chưa cập nhật" },
  { id: 1, value: "Trên Đại học" },
  { id: 2, value: "Đại học" },
  { id: 3, value: "Cao đẳng" },
  { id: 4, value: "Trung cấp" },
  { id: 5, value: "Đào tạo nghề" },
  { id: 6, value: "Trung học phổ thông" },
  { id: 7, value: "Trung học cơ sở" },
  { id: 8, value: "Tiểu học" },
];
export const toLowerCaseNonAccentVietnamese = (str) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};
export const eduLabel = getEducation.map((e) => ({
  label: e?.value,
  value: e?.id,
}));

export const convertFileSize = (e) => {
  const result = byteSize(e);
  return `${result?.value}${result?.unit}`;
};
export async function getServerSideProps({ req, query }) {
  const clientIp = requestIp.getClientIp(req);
  const allowedIPs = [
    "171.255.69.80",
    "14.162.144.184",
    "222.255.236.80",
    "123.24.206.25",
    "118.70.126.231",
    "115.79.62.130",
    "125.212.244.247",
    "43.239.223.11",
    "43.239.223.12",
    "27.3.150.230",
    "125.212.244.247",
    "42.118.114.172",
    "43.239.223.60",
    "192.168.1.26",
    "162.158.62.160",
    "118.70.185.222",
    "118.70.126.231",
    "117.4.243.120",
    "118.70.126.138",
    "14.248.82.205",
    "118.70.126.138",
    "14.232.208.241",
    "210.245.75.51",
    "123.24.142.145",
    "14.235.183.184",
    "113.185.41.209",
    "43.239.223.187",
    "104.28.222.75",
    "104.28.254.74",
    "104.28.222.73",
    "104.28.254.73",
  ];
  // if (!allowedIPs.includes(clientIp)) {
  //     // Nếu địa chỉ IP không nằm trong danh sách cho phép, chuyển hướng đến trang lỗi hoặc trang khác
  //     return {
  //         redirect: {
  //             destination: '/404',
  //             permanent: false,
  //         },
  //     };
  // }
  return {
    props: {
      clientIp,
      query,
    },
  };
}

export const getExperience = [
  { id: 0, value: "Chưa cập nhật" },
  { id: 1, value: "Chưa có kinh nghiệm" },
  { id: 2, value: "Dưới 1 năm kinh nghiệm" },
  { id: 3, value: "1 năm" },
  { id: 4, value: "2 năm" },
  { id: 5, value: "3 năm" },
  { id: 6, value: "4 năm" },
  { id: 7, value: "5 năm" },
  { id: 8, value: "Trên 5 năm" },
];

export const expLabel = getExperience.map((e) => ({
  label: e?.value,
  value: e?.id,
}));

export const getPosition = [
  { id: 0, value: "Chưa cập nhật" },
  { id: 1, value: "SINH VIÊN THỰC TẬP" },
  { id: 2, value: "NHÂN VIÊN THỬ VIỆC" },
  { id: 9, value: "NHÂN VIÊN PART TIME" },
  { id: 3, value: "NHÂN VIÊN CHÍNH THỨC" },
  { id: 20, value: "NHÓM PHÓ" },
  { id: 4, value: "TRƯỞNG NHÓM" },
  { id: 12, value: "PHÓ TỔ TRƯỞNG" },
  { id: 13, value: "TỔ TRƯỞNG" },
  { id: 10, value: "PHÓ BAN DỰ ÁN" },
  { id: 11, value: "TRƯỞNG BAN DỰ ÁN" },
  { id: 5, value: "PHÓ TRƯỞNG PHÒNG" },
  { id: 6, value: "TRƯỞNG PHÒNG" },
  { id: 7, value: "PHÓ GIÁM ĐỐC" },
  { id: 8, value: "GIÁM ĐỐC" },
  { id: 14, value: "PHÓ TỔNG GIÁM ĐỐC" },
  { id: 16, value: "TỔNG GIÁM ĐỐC" },
  { id: 22, value: "PHÓ TỔNG GIÁM ĐỐC TẬP ĐOÀN" },
  { id: 21, value: "TỔNG GIÁM ĐỐC TẬP ĐOÀN" },
  { id: 18, value: "PHÓ CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ" },
  { id: 19, value: "CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ" },
  { id: 17, value: "THÀNH VIÊN HỘI ĐỒNG QUẢN TRỊ" },
];

export const positionLabel = getPosition.map((p) => ({
  label: p?.value,
  value: p?.id,
}));

export function renderEdu(id) {
  let name = "Chưa cập nhật";
  getEducation.find((item) => {
    if (item.id === id) {
      name = item.value;
    }
  });

  return name;
}

export function renderExp(id) {
  let name = "Chưa cập nhật";
  getExperience.find((item) => {
    if (item.id === id) {
      name = item.value;
    }
  });

  return name;
}

export function renderPosition(id) {
  let name = "Chưa cập nhật";
  getPosition.find((item) => {
    if (item.id === id) {
      name = item.value;
    }
  });

  return name;
}

export const getGender = ["Chưa cập nhật", "Nam", "Nữ", "Khác"];

export const genderLabel = getGender.map((g, index) => ({
  label: g,
  value: index,
}));

export const getMarried = ["Chưa cập nhật", "Độc thân", "Đã kết hôn"];

export const marriedLabel = getMarried.map((g, index) => ({
  label: g,
  value: index,
}));

export const getSoftware = [
  { id: "cc365", value: "Chấm công 365" },
  { id: "tl365", value: "Tính lương 365" },
  { id: "hr365", value: "Quản trị nhân sự" },
  { id: "vt365", value: "Văn thư lưu trữ" },
  { id: "ttnb365", value: "Truyền thông văn hóa" },
  { id: "tts365", value: "Chuyển đổi văn bản thành giọng nói" },
  { id: "lb365", value: "Quản lý lịch biểu" },
  { id: "crs365", value: "CRM" },
  { id: "bp365", value: "Biên phiên dịch" },
  { id: "dg365", value: "Đánh giá năng lực nhân viên" },
  { id: "kpi365", value: "Quản lý KPI" },
  { id: "dms365", value: "DMS" },
  { id: "cu365", value: "Quản lý cung ứng" },
  { id: "kvt365", value: "Quản lý kho vật tư xây dụng" },
  { id: "qlts365", value: "Quản lý tài sản" },
];

export function renderNamePM(value) {
  let name = "Chưa xác định";
  getSoftware.find((item) => {
    if (item.id === value) {
      name = item.value;
    }
  });
  return name;
}

export function formatDate(dateString) {
  const parts = dateString.split("/");
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return formattedDate;
}

export function validatePhone(value) {
  if (value) {
    return /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i.test(
      value
    );
  }
  return true;
}

export function validateMail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(value)) {
    return true;
  }

  return false;
}

export function validateIP(value) {
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipRegex.test(value)) {
    return true;
  }

  return false;
}

export function ConvertIntToDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng được đếm từ 0, nên cần cộng 1 và định dạng kích thước 2 chữ số
  let day = ("0" + date.getDate()).slice(-2); // Định dạng ngày kích thước 2 chữ số
  // let hours = ("0" + date.getHours()).slice(-2);
  // let minutes = ("0" + date.getMinutes()).slice(-2);
  // let seconds = ("0" + date.getSeconds()).slice(-2);
  let formattedDate = [
    day + "-" + month + "-" + year,
    year + "-" + month + "-" + day,
  ];
  return formattedDate;
}

export function generateRandomString(length) {
  const characters =
    "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// function call api
export const functionAPI = async (url, data = null) => {
  let configHeader = {
    headers: {},
  };

  if (Cookies.get("token_base365")) {
    configHeader.headers["Authorization"] = `Bearer ${Cookies.get(
      "token_base365"
    )}`;
  }

  let configData = {};
  if (data) {
    configData = data;
  }

  let response = "";

  try {
    const call = await axios.post(url, configData, configHeader);
    response = call.data.data;
  } catch (error) {
    response = error.response;
  }

  return response;
};

// check login
export function CheckLogin() {
  const acc_token = Cookies.get("token_base365");
  const rf_token = Cookies.get("rf_token");
  const role = Cookies.get("role");
  const router = useRouter();
  if (role && acc_token && rf_token) {
    let redirectUrl = "";
    if (role === "1") {
      redirectUrl = "/";
    } else if (role === "2") {
      redirectUrl = "/";
    } else {
      redirectUrl = "/";
    }
    if (redirectUrl != window.location.pathname) {
      router.push(redirectUrl);
    }
  }
}

export function CheckLogin2() {
  const router = useRouter();

  useEffect(() => {
    const acc_token = () => {
      return Cookies.get("token_base365");
    };
    const rf_token = () => {
      return Cookies.get("rf_token");
    };
    const role = () => {
      return Cookies.get("role");
    };

    if (!role() && !acc_token() && !rf_token()) {
      router.push("/");
    }
  }, []);
}
export function convertTimestampToInputValue(timestamp, inputType) {
  const date = new Date(Number(timestamp) * 1000);

  let result = "";

  switch (inputType) {
    case "date":
      result = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
      break;
    case "time":
      result = `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;
      break;
    case "datetime-local":
      result = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}T${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      break;
    default:
      console.error("Unsupported input type");
  }

  return result;
}
export function convertTimeToDate(time) {
  // Tạo một đối tượng Date từ time
  const date = new Date(time);
  // Lấy ngày, tháng và năm từ đối tượng Date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  const year = date.getFullYear();

  // Sử dụng hàm padStart để thêm số 0 vào phía trước nếu cần
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  // Tạo chuỗi ngày/tháng/năm
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}
export function convertTimestampToDateHMDMY(timestamp) {
  // Tạo một đối tượng Date từ timestamp
  const date = new Date(timestamp * 1000);
  // Lấy giờ, phút và giây từ đối tượng Date
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Lấy ngày, tháng và năm từ đối tượng Date
  const thu = date.getDay();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  const year = date.getFullYear();

  // Sử dụng hàm padStart để thêm số 0 vào phía trước nếu cần
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSecond = String(seconds).padStart(2, "0");

  // Tạo chuỗi ngày/tháng/năm
  const formattedDate = `${formattedHours}:${formattedMinutes} - ${formattedDay}/${formattedMonth}/${year} `;

  return formattedDate;
}
export function convertTimestampToDate(timestamp) {
  // Tạo một đối tượng Date từ timestamp
  const date = new Date(timestamp * 1000);
  // Lấy ngày, tháng và năm từ đối tượng Date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  const year = date.getFullYear();

  // Sử dụng hàm padStart để thêm số 0 vào phía trước nếu cần
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  // Tạo chuỗi ngày/tháng/năm
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}
export function convertSelectedTimeToTimestamp(selectedTime) {
  // Lấy thời gian đã chọn từ input type time
  const [hours, minutes] = selectedTime.split(":").map(Number);

  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Tạo đối tượng Date với ngày hiện tại và giờ, phút từ thời gian đã chọn
  const date = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes
  );

  // Lấy timestamp từ đối tượng Date
  const timestamp = date.getTime();

  return timestamp / 1000;
}
export function convertStringToTimestamp(isoString) {
  if (!isoString) {
    return 0;
  }
  const timestamp = new Date(isoString).getTime();
  return timestamp / 1000;
}
export function convertTimestampToFull(timestamp) {
  // Tạo một đối tượng Date từ timestamp
  const date = new Date(timestamp * 1000);
  // Lấy giờ, phút và giây từ đối tượng Date
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Lấy ngày, tháng và năm từ đối tượng Date
  const thu = date.getDay();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  const year = date.getFullYear();

  // Sử dụng hàm padStart để thêm số 0 vào phía trước nếu cần
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSecond = String(seconds).padStart(2, "0");

  // Tạo chuỗi ngày/tháng/năm
  const formattedDate = `${
    thu == 0 ? "CN" : `T${thu + 1}`
  } ${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSecond}`;

  return formattedDate;
}
export const ngayHomNay = () => {
  const date = new Date(Date.now());
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  const year = date.getFullYear();
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};
export const notifyWarning = (notification) => {
  if (!notification) {
    return toast.warning("Vui lòng kiểm tra lại", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return toast.warning(notification, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
export const notifySuccess = (notification) => {
  if (!notification) {
    return toast.warning("Thành công !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return toast.success(notification, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const notifyError = (notification) => {
  if (!notification) {
    return toast.error("Thất bại!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return toast.error(notification, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const convertTimeToDatePicker = (date, format) => {
  // Kiểm tra nếu ngày là null hoặc undefined
  if (!date) {
    return null;
  }

  // Sử dụng moment để chuyển đổi ngày thành định dạng YYYY-MM-DD
  const formattedDate = moment(date).format(format);

  return formattedDate;
};
export function decodeToken() {
  const currentCookie = Cookies.get("token_base365");
  let idQLC = null;
  let userType = null;
  let com_id = null;
  let userName = null;
  let idTimViec365 = null;
  if (currentCookie) {
    const decodedToken = jwt_decode(currentCookie);
    userType = decodedToken?.data?.type;
    idQLC = decodedToken?.data?.idQLC;
    com_id = decodedToken?.data?.com_id;
    userName = decodedToken?.data?.userName;
    idTimViec365 = decodedToken?.data?.idTimViec365;
  }
  return { idQLC, userType, com_id, userName, idTimViec365 };
}

export function convertTimestampToDateTime(timestamp) {
  // Tạo một đối tượng Date từ timestamp
  const date = new Date(timestamp * 1000);
  // Lấy giờ, phút và giây từ đối tượng Date
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Lấy ngày, tháng và năm từ đối tượng Date
  const thu = date.getDay();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  const year = date.getFullYear();

  // Sử dụng hàm padStart để thêm số 0 vào phía trước nếu cần
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSecond = String(seconds).padStart(2, "0");

  // Tạo chuỗi ngày/tháng/năm
  const formattedDate = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSecond}`;

  return formattedDate;
}