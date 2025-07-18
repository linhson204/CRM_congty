import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import styleindex from "./index2.module.css";
import { useRouter } from "next/router";
export default function ChiTietSanPham() {
  const router = useRouter();
  const path = router.query;
  const handleDelete = (e: any) => {
    var result = window.confirm("Bạn có chắc muốn xóa không?");
    if (result) {
      router.push(`/san-pham`);
    } else {
    }
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 30, paddingBottom: 30 }}>
        <button
          onClick={() => router.push(`/chinh-sua-san-pham/${path.id}`)}
          style={{ background: "#4c5bd4" }}
          type="button"
          className={styleindex.btn_edit}
        >
          <img src="/crm/edit.svg" alt="edit" />
          <p style={{ color: "#ffffff" }}>Chỉnh sửa</p>
        </button>
        <button
          style={{ background: "red", border: "none" }}
          type="button"
          onClick={(e) => {
            handleDelete(e);
          }}
          className={styleindex.btn_delete}
        >
          <p style={{ color: "#ffffff" }}>Xóa</p>
        </button>
      </div>
      <div className={styleindex.title}>Chi tiết sản phẩm</div>
      <div className={styleindex.containerinfo}>
        <div className={styleindex.fieldsetneleft}>
          <p className={styles.main__body__type}>Thông tin sản phẩm</p>
          <fieldset className={styleindex.fieldsetneleft}>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Tên sản phẩm: </div>
              <div>137</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Mã sản phẩm : </div>
              <div>đuawadawda</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Nhóm sản phẩm: </div>
              <div>Test Anh</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Đơn vị tính: </div>
              <div>04/08/2023</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Kích thước: </div>
              <div>22 VNĐ</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Định mức tồn tối thiểu:</div>
              <div>
                <button className={styleindex.btntt}>
                  <p style={{ color: "#ffffff" }}>Giá nhập: </p>
                </button>
              </div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Giá bán lẻ: </div>
              <div>312,312 VND</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Giá bán buôn: </div>
              <div>312,312 VND</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Bảo hành: </div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Hạn sử dụng: </div>
              <div>09-09-2023</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Xuất xứ: </div>
              <div>312312</div>
            </div>
          </fieldset>
        </div>
        <div className={styleindex.fieldsetneright}>
          <img
            width={"100%"}
            src={"/crm/img_file.svg"}
            alt="hungha365.com"
            id="img2"
          />
        </div>
      </div>
    </div>
  );
}
