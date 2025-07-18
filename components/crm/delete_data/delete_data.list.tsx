import React, { useEffect, useState } from "react";
import styles from "./delele_data.module.css";
import { Select, Tree } from "antd";
import SelectDataDelete from "./list_data/list_data";
import listDataDelete from "./data_listdelete"
const HomeList = () => {
  const listname = listDataDelete.map(item => item.name)
  const OPTIONS = listname;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [list, setList] = useState(listDataDelete)
  // useEffect(() => {
  // }, []);
  //Lọc trang delete_data/list
  const handleChange = (selectedValues: any) => {
    setSelectedItems(selectedValues);
    const list = listDataDelete.filter(item => selectedValues.includes(item.name))
    try {
      if (list) {
        setList(list);
        if(list && list[0]==null){
          setList(listDataDelete)
        }
      }
    } catch (error) {
    }
  };
  return (
    <div className={styles.main_bd}>
      <div className={`${styles.main_item_note} ${styles.flex_column}`}>
        <div className={styles.item_note_title} >
          <p style={{ color: 'black', fontWeight: 400 }}>Lưu ý:</p>
        </div>
        <div className={styles.item_note_ct}>
          <ul className={styles.item_note_ct}>
            <li>
              Tài liệu đã xoá chỉ được hệ thống lưu giữ trong vòng 60 ngày.
            </li>
            <li>
              Chỉ có tài khoản công ty mới có quyền xoá vĩnh viễn các tài liệu
              trong thùng rác.
            </li>
          </ul>
        </div>
        <Select
          className={styles.ant}
          mode="multiple"
          maxTagCount={2}
          maxTagTextLength={10}
          placeholder="Tìm kiếm theo danh mục"
          value={selectedItems}
          bordered={false}
          onChange={handleChange}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />
      </div>

      <div style={{ paddingTop: 25 }} className={styles.main_content_list}>
        <SelectDataDelete
          listDataDelete={list}
        />

      </div>
    </div>
  );
};
export default HomeList;
