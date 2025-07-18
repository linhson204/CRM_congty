import React, { useEffect, useState } from "react";
import styles from "../../potential/potential.module.css";
import Link from "next/link";
import AddStatusCustomerModal from "./modal_add_customer_status";
import Add from "@/public/crm/add.svg";
import Image from "next/image";
import { useApi } from "@/components/crm/hooks/useApi";
import { base_url } from "../../service/function";
export default function HeaderBtnsCustomerStatus() {
  const handleClickSelectoption = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const [stt, setStt] = useState();
  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    `${base_url}/api/crm/customerStatus/list`,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNjQ1MDIsImV4cCI6MTY5MjE1MDkwMn0.klqKzWkaYeTdK6VKR07R8cV7y9YrmWdFUJC2z6hCil8",
    "POST",
    { stt_name: "Đang xem xét mua	" }
  );
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => fetchData()}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              onChange={() =>
                fetchData(
                  `${base_url}/api/crm/customerStatus/list`,
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6Mjg3MjMxLCJpZFRpbVZpZWMzNjUiOjAsImlkUUxDIjoxNzYzLCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwiY3JlYXRlZEF0IjoxNjI3NTQ5NDcxLCJ0eXBlIjoxLCJjb21faWQiOjE3NjMsInVzZXJOYW1lIjoibGUgYW5oIHR1YW4xMiJ9LCJpYXQiOjE2OTIwNjQ1MDIsImV4cCI6MTY5MjE1MDkwMn0.klqKzWkaYeTdK6VKR07R8cV7y9YrmWdFUJC2z6hCil8",
                  "POST",
                  { stt_name: "Đang xem xét mua	" }
                )
              }
              value={stt}
              defaultValue=""
              placeholder="Tìm kiếm theo tình trạng khách hàng"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt=""
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <Image src={Add} alt="My SVG Image" />
            Thêm mới
          </button>
        </div>
      </div>

      <AddStatusCustomerModal
        isModalCancel={isOpen}
        setIsModalCancel={setIsOpen}
      />
    </div>
  );
}
