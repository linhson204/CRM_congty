import { useHeader } from "../hooks/useHeader";
import style from "./header.module.css";
import Link from "next/link";
export default function TitleHeaderMobile() {
  const {
    headerTitle,
    // setHeaderTitle,
    showBackButton,
    // setShowBackButton,
    currentPath,
  }: // setCurrentPath,
  any = useHeader();
  return (
    <div className={headerTitle.includes("/") ? style.mb_title_header : ""}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {showBackButton && (
          <Link
            href={currentPath}
            style={{ marginRight: "11px", height: "17px", width: "10px" }}
          >
            <img
              className={style.mobile_view_img}
              src="/crm/angle_left.svg"
              alt="back"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
