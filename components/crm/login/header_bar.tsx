import Link from "next/link";
import style from "./sidebar.module.css";
import Image from "next/image";

export default function HeaderBar({ dataHeader, isOpen }: any) {
  return (
    <div className={style.header_bar}>
      <div className={`${style.header_icon} ${!isOpen ? null : "none"}`}>
        <Link href="https://hungha365.com/">
          <Image
            width={250}
            height={45}
            sizes="20vw"
            className={style.img_icon}
            src={
              dataHeader?.data?.avatarUser === null
                ? dataHeader?.data?.avatarUser
                : "/crm/hunghalogo.png"
            }
            alt="hungha365.com"
          />
        </Link>
      </div>
      <div className={`${style.header_info} ${!isOpen ? null : "none"}`}>
        <div className={style.name_staff}>
          {dataHeader?.data?.userName || ""}
        </div>
      </div>
    </div>
  );
}
