import { Input, Select, Tooltip } from "antd";
import styles from "../table.module.css";
import styless from "./index.module.css";
import Link from "next/link";
const options = [
  { value: "Facebook", label: "Facebook" },
  { value: "Zalo", label: "Zalo" },
  // Các tùy chọn khác nếu cần
];
const options2 = [
  { value: "Khách hàng tháng 1", label: "Khách hàng tháng 1" },
  { value: "Khách hàng tháng 2", label: "Khách hàng tháng 2" },
  // Các tùy chọn khác nếu cần
];
const options3 = [
  { value: "Hẹn gặp", label: "Hẹn gặp" },
  { value: "Chăm sóc lại", label: "Chăm sóc lại" },
  // Các tùy chọn khác nếu cần
];
const handleSearch = (value: any) => {
  // Thực hiện tìm kiếm tùy chọn dựa trên giá trị nhập vào (value)
  // Trả về true nếu tìm thấy, ngược lại trả về false
  return options.some((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );
};

export const ColumCustomer = [
  {
    width: 70,
    title: "Mã KH",
    dataIndex: "key",
  },
  {
    width: 350,
    title: "Tên khách hàng",
    dataIndex: "name",
    render: (text: any) => <Link href="">{text}</Link>,
  },
  {
    width: 106,
    title: "Điện thoại",
    dataIndex: "vocative",
  },
  {
    width: 355,
    title: "Email",
    dataIndex: "office",
  },
  {
    width: 200,
    title: "Tình trạng khách hàng",
    dataIndex: "companyPhone",
    render: (text: any) => (
      <Select
        showSearch // Kích hoạt tính năng tìm kiếm
        filterOption={true} // Nếu bạn muốn tùy chỉnh hành vi tìm kiếm, đặt filterOption thành true và sử dụng hàm handleSearch
        style={{
          width: "90%",
          textAlign: "left",
          borderRadius: 10,
          border: "none",
        }}
        defaultValue={`${options3[0].value}`}
      >
        {options3.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    ),
  },
  {
    width: 355,
    title: "Mô tả",
    dataIndex: "address",
    render: (text: any) => (
      <div style={{ overflow: "hidden", maxWidth: 355, maxHeight: 50 }}>
        <Tooltip
          overlayStyle={{ width: "355px" }}
          placement="bottom"
          title={text + text + text}
        >
          <div>{text}</div>
        </Tooltip>
      </div>
    ),
  },
  {
    width: 200,
    title: "Nguồn khách hàng",
    dataIndex: "myEmail",
    render: (text: any) => (
      <Select
        showSearch // Kích hoạt tính năng tìm kiếm
        filterOption={true} // Nếu bạn muốn tùy chỉnh hành vi tìm kiếm, đặt filterOption thành true và sử dụng hàm handleSearch
        style={{
          width: "90%",
          textAlign: "left",
          borderRadius: 10,
          border: "none",
        }}
        defaultValue={`${options[0].value}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    ),
  },
  {
    width: 200,
    title: "Nhóm khách hàng cha",
    dataIndex: "companyEmail",
    render: (text: any) => (
      <Select
        showSearch // Kích hoạt tính năng tìm kiếm
        filterOption={true} // Nếu bạn muốn tùy chỉnh hành vi tìm kiếm, đặt filterOption thành true và sử dụng hàm handleSearch
        style={{ width: "90%", textAlign: "left", borderRadius: 10 }}
        defaultValue={`${options2[0].value}`}
      >
        {options2.map((option2) => (
          <option key={option2.value} value={option2.value}>
            {option2.label}
          </option>
        ))}
      </Select>
    ),
  },
  {
    width: 200,
    title: "Nhóm khách hàng con",
    dataIndex: "companyEmail",
    render: (text: any) => (
      <Select
        showSearch // Kích hoạt tính năng tìm kiếm
        filterOption={true} // Nếu bạn muốn tùy chỉnh hành vi tìm kiếm, đặt filterOption thành true và sử dụng hàm handleSearch
        style={{ width: "90%", textAlign: "left", borderRadius: 10 }}
        defaultValue={`${options2[0].value}`}
      >
        {options2.map((option2) => (
          <option key={option2.value} value={option2.value}>
            {option2.label}
          </option>
        ))}
      </Select>
    ),
  },
  {
    width: 180,
    title: "NNhân viên phụ trách",
    dataIndex: "companyEmail",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <img src="/crm/user_kh.png" alt="hungha365.com" />
        </div>
        &nbsp;{text}
      </div>
    ),
  },
  {
    width: 178,
    title: "Ngày tạo",
    dataIndex: "timeDelete",
  },
  {
    width: 178,
    title: "Người Xóa",
    dataIndex: "nameDelete",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <img src="/crm/user_kh.png" alt="hungha365.com" />
        </div>
        {text}
      </div>
    ),
  },
  {
    width: 153,
    title: "Thời gian xóa",
    dataIndex: "timeDelete",
  },
];
