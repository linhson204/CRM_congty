import { Dropdown, MenuProps } from "antd";
import Link from "next/link";

const DropdownChucNang = (props: any) => {
  const { record } = props;
  const handleSelect = (id: any) => {};
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          style={{ display: "flex", fontSize: 20 }}
          rel="noopener noreferrer"
          href={`/chinh-sua-phieu-thu/${record.myPhone}`}
        >
          <img src="/crm/icon-edit-black.svg" alt="hungha365.com" />
          &nbsp; &nbsp; <p>Chỉnh sửa</p>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{ display: "flex", fontSize: 20 }}
          rel="noopener noreferrer"
        >
          <img src="/crm/icon-delete-black.svg" alt="hungha365.com" />
          &nbsp; &nbsp; <p>Xóa</p>
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      overlayStyle={{ margin: "-10px -10px" }}
      trigger={["click"]}
      menu={{ items }}
      placement="bottomLeft"
    >
      <img
        onClick={() => {
          handleSelect(record.myPhone);
        }}
        style={{ cursor: "pointer" }}
        src="/crm/icon_1.svg"
      />
    </Dropdown>
  );
};
export default DropdownChucNang;
