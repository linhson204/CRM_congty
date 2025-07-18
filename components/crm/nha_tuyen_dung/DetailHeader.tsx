import React, { useContext, useState } from "react";
import styles from "@/components/crm/nha_tuyen_dung/detailNTD.module.css";
import Image from "next/image";
import Link from 'next/link'
import { useDataContainer } from "../context/dataContainer";
export default function DetailHeader() {
  const { dataContainer } = useContext(useDataContainer);
  const [avatarNTD, setAvatarNTD] = useState(dataContainer.avatar);
  const list_phone = dataContainer?.phone_number?.split(',')
  return (
    <div className={styles.header_detail_NTD}>
      <div className={styles.header_detail_container}>
        <div className={styles.header_detail_infor_container}>
          <Image
            src={avatarNTD}
            height={110}
            width={110}
            onError={() => setAvatarNTD("/crm/User_circle.png")}
            alt="/"
            style={{ borderRadius: "50%" }}
          />
          <div className={styles.header_detail_infor}>
            <p className={styles.company_name}>{dataContainer.name}</p>
            <div>
              {/* Máy trường này lấy từ dataContainer ra nhé */}
              <p className={styles.header_infor}>
                Mã khách hàng: <span>{dataContainer.cus_id}</span>
              </p>
              <p className={styles.header_infor}>
                Email: <span>{dataContainer.email}</span>
              </p>
              <p className={styles.header_infor}>
                Số điện thoại:
                {list_phone && list_phone.length > 0 && list_phone?.map((phone: any, index: any) => (
                  <Link key={index} href={`https://zalo.me/${phone}`} style={{ margin: '0 8px', fontSize: '16px' }} target="_blank">{phone}</Link>
                ))}
              </p>
              <p className={styles.header_infor}>
                Chuyên viên phụ trách: <span>{dataContainer.emp_id}-{dataContainer.emp_name}</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <Image src={"/crm/phone.svg"} height={50} width={50} alt="phone" />
        </div>
      </div>
    </div>
  );
}
