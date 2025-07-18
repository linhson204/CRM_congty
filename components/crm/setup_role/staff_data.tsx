import styles from "./set_up_role.module.css";
import { useEffect, useState } from "react";
import { Select } from "antd";
const Cookies = require("js-cookie");

export default function StaffData({
  setInfoRole,
  setCheckboxState,
  setId_user,
}: any) {
  const [listNV, setListNv] = useState<any>();
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedItems, setSelectedItems] = useState<any>(undefined);
  const [errorSelectedValue, setErrorSelectedValue] = useState(false);

  const handleGetInfoCus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json();
      if (data && data?.data) setListNv(data?.data?.items);
    } catch (error) {}
  };

  const handleGetThongTinQuyen = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/role/show-role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({
            id_user: selectedItems,
          }),
        }
      );
      const data = await res.json();
      if (data && data?.data) {
        setInfoRole(data?.data?.roles);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (Array.isArray(listNV)) {
      const updatedOptions = [
        { value: "", label: "Chọn người bàn giao" },
        ...listNV.map((item) => {
          const name = item?.ep_name || "";
          const id = item?._id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptions(updatedOptions);
    }
  }, [listNV]);

  useEffect(() => {
    handleGetThongTinQuyen();
    handleGetInfoCus();
  }, [selectedItems]);
  return (
    <div className={styles.content_info}>
      <div className={styles.infor_item}>
        <div className={styles.text}>Nhân viên</div>
        <div className={styles.select_role_staff}>
          <Select
            showSearch
            placeholder="Chọn người nhận công việc"
            value={selectedItems?.ep_id}
            onChange={(value) => {
              if (value) {
                setSelectedItems(value);
                setId_user(value);
                setErrorSelectedValue(false);
              } else {
                setSelectedItems(undefined);
              }
            }}
            style={{ width: "100%" }}
            options={options}
            filterOption={(input, option) =>
              option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className={styles.custom_select}
          />
        </div>
      </div>
    </div>
  );
}
