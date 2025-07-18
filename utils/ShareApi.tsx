import axios from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
const baseURLQLC: any = process.env.NEXT_PUBLIC_BASE_URL;
const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
// Lấy ra thông tin tài khoản
export const fetch_infor_account = () => {
  const user_infor = jwtDecode<any>(token);
  if (user_infor) {
    return user_infor?.data;
  }
};
// Lấy nhân viên
export const fetch_employee = async (token: any) => {
  try {
    const response = await axios.post(
      `${baseURLQLC}api/qlc/managerUser/listAll`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error fetching employee data:", err);
  }
};

// Sổ văn bản
export const fetchDataSoVB = async () => {
  try {
    const response = await axios.post(
      `${baseURL}api/vanthu/guiNhanCongVan/setting/getListSoVanBan`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error fetching home data:", err);
  }
};

// ds phòng ban
export const fetch_list_department = async () => {
  const user_infor = jwtDecode<any>(token);
  if (user_infor) {
    try {
      const response = await axios.post(
        `${baseURLQLC}api/qlc/department/list`,
        {
          com_id: user_infor?.data?.idQLC,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (err) {
      console.error("Error fetching department data:", err);
    }
  }
};

// ds nhân viên
export const fetch_list_employee = async () => {
  const user_infor = jwtDecode<any>(token);
  if (user_infor) {
    try {
      const response = await axios.post(
        `${baseURLQLC}api/qlc/managerUser/list`,
        {
          com_id: user_infor?.data?.idQLC,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (err) {
      console.error("Error fetching department data:", err);
    }
  }
};

//  Lấy phòng ban theo id
export const fetchDataDetailDep = async (api: string, data?: any) => {
  try {
    const response = await axios.post(api, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (err) {
    console.error("Error fetching home data:", err);
  }
};

// Danh sách chức vụ
export const fetch_ds_position = async () => {
  try {
    const response = await axios.post(
      `http://210.245.108.202:3006api/hr/organizationalStructure/listPosition`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.error("Error fetching department data:", err);
  }
};

// Danh sách nhân viên theo phòng ban
export const fetch_emp_by_id = async (id_com: any, id_dep?: any) => {
  try {
    const response = await axios.post(
      `${baseURLQLC}api/qlc/managerUser/listAll`,
      {
        com_id: id_com,
        dep_id: id_dep,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error fetching department data:", err);
  }
};
// Hàm lấy ra nơi gửi chi tiết
export const fetchNoiGui = async (dep_id: any) => {
  const user_infor = jwtDecode<any>(token);
  if (user_infor) {
    try {
      const response = await axios.post(
        `${baseURLQLC}api/qlc/department/list`,
        { com_id: user_infor?.data?.idQLC, dep_id: dep_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data?.data?.items[0]?.dep_name;
    } catch (err) {
      console.error("Error fetching home data:", err);
    }
  }
};
// Hàm lấy ra chi tiết nhân viên theo id của chính nó
export const fetch_list_employs = async () => {
  const user_infor = jwtDecode<any>(token);
  if (user_infor) {
    try {
      const com_id = user_infor?.data?.idQLC;
      const list_emps = await fetch_emp_by_id(com_id);
      return list_emps?.data?.items;
    } catch (err) {
      console.error("Error fetching home data:", err);
    }
  }
};
export const fetch_position = ({ name }: any) => {
  return [
    { name: name, value: "", label: "Tất cả" },
    { name: name, value: "1", label: "SINH VIÊN THỰC TẬP" },
    { name: name, value: "9", label: "NHÂN VIÊN PART TIME" },
    { name: name, value: "2", label: "NHÂN VIÊN THỬ VIỆC" },
    { name: name, value: "3", label: "NHÂN VIÊN CHÍNH THỨC" },
    { name: name, value: "4", label: "TRƯỞNG NHÓM" },
    { name: name, value: "20", label: "NHÓM PHÓ" },
    { name: name, value: "13", label: "TỔ TRƯỞNG" },
    { name: name, value: "12", label: "PHÓ TỔ TRƯỞNG" },
    { name: name, value: "11", label: "TRƯỞNG BAN DỰ ÁN" },
    { name: name, value: "10", label: "PHÓ BAN DỰ ÁN" },
    { name: name, value: "6", label: "TRƯỞNG PHÒNG" },
    { name: name, value: "5", label: "PHÓ TRƯỞNG PHÒNG" },
    { name: name, value: "8", label: "GIÁM ĐỐC" },
    { name: name, value: "7", label: "PHÓ GIÁM ĐỐC" },
    { name: name, value: "16", label: "TỔNG GIÁM ĐỐC" },
    { name: name, value: "14", label: "PHÓ TỔNG GIÁM ĐỐC" },
    { name: name, value: "21", label: "TỔNG GIÁM ĐỐC TẬP ĐOÀN" },
    { name: name, value: "22", label: "PHÓ TỔNG GIÁM ĐỐC TẬP ĐOÀN" },
    { name: name, value: "19", label: "CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ" },
    { name: name, value: "18", label: "PHÓ CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ" },
    { name: name, value: "17", label: "THÀNH VIÊN HỘI ĐỒNG QUẢN TRỊ" },
  ];
};
export const fetch_emp_info = async (token:any) => {
  try {
    const response = await axios.post(
      `${baseURLQLC}api/qlc/employee/info`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error fetching employee data:", err);
  }
}
export const fetch_com_info = async (token:any) => {
  try {
    const response = await axios.post(
      `${baseURLQLC}api/qlc/company/info`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error fetching company data:", err);
  }
}
