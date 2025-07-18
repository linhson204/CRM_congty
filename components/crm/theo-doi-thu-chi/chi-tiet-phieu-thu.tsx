import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../potential/potential_add_files/add_file_potential.module.css";
import styless from "../potential/potential2.module.css";
import exportToExcel from "../ultis/export_xlxs";
import styleindex from "./index.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { CheckCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import ModalUpdateThanhToan from "./modal/ModalUpdateThanhToan";
export default function ChiTietPhieu() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  const router = useRouter();
  const path = router.query;
  const handleSave = () => {
    setIsShowModal(true);
  };
  const datas = [
    {
      "Số chứng từ  ": "37",
      "Tên phiếu thu": "2",
      "Người tạo": "3",
      "Ngày tạo": "4",
      "Đối tượng": "5",
      "Tổng tiền": "6",
      "Đã thu": "7",
      Nợ: "8",
      "Trạng thái gửi	": "9",
      "Trạng thái": "10",
    },
    // Add more sample data objects here if needed
  ];
  const handleExportToExcel = () => {
    const filename = "Danh sách phiếu thu.xlsx";
    const sheetName = "Danh sách tiềm năng";
    const columnHeaders = [
      "Số chứng từ",
      "Tên chứng từ",
      "Người tạo",
      "Ngày tạo",
      "Số tiền cần thanh toán",
      "Trạng thái",
      "Kèm theo",
      "Nội dung thu",
      "Mã khách hàng	",
      "Tên khách hàng",
      "Số điện thoại",
      "Địa chỉ",
      "Người liên hệ",
      "Số điện thoại liên hệ",
      "STT",
      "Ngày tạo",
      "Hình thức thanh toán",
      "Số tiền",
      "Số Quỹ",
    ];
    exportToExcel(datas, filename, sheetName, columnHeaders);
  };
  const handleDelete = (e: any) => {
    var result = window.confirm("Bạn có chắc muốn xóa không?");
    if (result) {
      router.push("/phieu-thu");
    } else {
    }
  };
  return (
    <div>
      <div style={{ paddingBottom: 17 }}>
        <button
          style={{ background: "#fff" }}
          type="button"
          onClick={handleExportToExcel}
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <img style={{ color: "black" }} src="/crm/excel.svg" />
          <p style={{ color: "black" }}>Xuất excel</p>
        </button>
      </div>
      <div style={{ display: "flex", gap: 30, paddingBottom: 30 }}>
        <button
          onClick={() => router.push(`/chinh-sua-phieu-thu/${path.id}`)}
          style={{ background: "#4C5BD4  " }}
          type="button"
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <CheckCircleOutlined />
          <p style={{ color: "#ffffff" }}>Chỉnh sửa</p>
        </button>
        <button
          style={{ background: "red" }}
          type="button"
          onClick={(e) => {
            handleDelete(e);
          }}
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <p style={{ color: "#ffffff" }}>Xóa phiếu</p>
        </button>
      </div>
      <div className={styleindex.title}>Chi tiết phiếu thu</div>
      <div className={styleindex.containerinfo}>
        <div className={styleindex.fieldsetneleft}>
          <p className={styles.main__body__type}>Thông tin phiếu</p>
          <fieldset className={styleindex.fieldsetneleft}>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Số chứng từ: </div>
              <div>137</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Tên chứng từ: </div>
              <div>đuawadawda</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Người tạo: </div>
              <div>Test Anh</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Ngày tạo: </div>
              <div>04/08/2023</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Số tiền cần thanh toán:</div>
              <div>22 VNĐ</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Trạng thái: </div>
              <div>
                <button className={styleindex.btntt}>
                  <p style={{ color: "#ffffff" }}>Đã duyệt</p>
                </button>
              </div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Kèm theo: </div>
              <div></div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Nội dung thu: </div>
              <div></div>
            </div>
          </fieldset>
        </div>
        <div className={styleindex.fieldsetneright}>
          <div>
            <p className={styles.main__body__type}>Đơn vị cung cấp</p>
            <fieldset className={styleindex.fieldsetneright}>
              <div className={styleindex.info}>
                <div className={styleindex.infoleft}>Mã khách hàng </div>
                <div>919940</div>
              </div>
              <div className={styleindex.full_width_div}>
                <span></span>
              </div>
              <div className={styleindex.info}>
                <div className={styleindex.infoleft}>Tên khách hàng: </div>
                <div>Tô Ngọc Ký</div>
              </div>
              <div className={styleindex.full_width_div}>
                <span></span>
              </div>
              <div className={styleindex.info}>
                <div className={styleindex.infoleft}>Số điện thoại: </div>
                <div>0393039393</div>
              </div>
              <div className={styleindex.full_width_div}>
                <span></span>
              </div>
              <div className={styleindex.info}>
                <div className={styleindex.infoleft}>Email: </div>
                <div>ngockyto001@gmail.com</div>
              </div>
              <div className={styleindex.full_width_div}>
                <span></span>
              </div>
              <div className={styleindex.info}>
                <div className={styleindex.infoleft}>Địa chỉ: </div>
                <div>số 54 Triều khúc</div>
              </div>
            </fieldset>

            <p style={{ paddingTop: 10 }} className={styles.main__body__type}>
              Người liên hệ
            </p>

            <fieldset className={styleindex.fieldsetneright}>
              <div className={styleindex.info}>
                <div className={styleindex.infoleft}>Họ tên</div>
                <div></div>
              </div>
              <div className={styleindex.full_width_div}>
                <span></span>
              </div>
              <div className={styleindex.info}>
                <div className={styleindex.infoleft}>Số điện thoại </div>
                <div></div>
              </div>
              <div className={styleindex.full_width_div}>
                <span></span>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className={styleindex.thanhtoan}>
        <div style={{ fontWeight: 800 }}>Thanh toán</div>
        <div>
          <button
            onClick={() => setIsShowModal(true)}
            style={{ background: "#4C5BD4  " }}
            type="button"
            className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
          >
            <UpCircleOutlined />
            <p style={{ color: "#ffffff" }}>Cập nhật thanh toán</p>
          </button>
        </div>
      </div>
      <div className={styleindex.full_width_div_no}>
        <span></span>
      </div>
      <ModalUpdateThanhToan isShowModal={isShowModal} onClose={onClose} />
    </div>
  );
}
