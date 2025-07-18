import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../potential/potential_add_files/add_file_potential.module.css";
import styless from "./index.module.css";

// "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Button } from "antd";
import ModalDelete from "../delete_data/modal/modal_delete";
import ModalReturn from "../delete_data/modal/modal_return";
import { useState } from "react";
import { useRouter } from "next/router";
export default function SuaPhieuKK() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  const handleSave = () => {
    setIsShowModal(true);
  };
  const router = useRouter();
  const path = router.query;
  return (
    <>
      <div className={styless.containerne}>
        <div className={styless.leftsuaphieu}>
          <p className={styles.main__body__type}>Thông tin phiếu</p>
          <div>
            <InputText
              label="Số chứng từ "
              placeholder="Tự động hóa số chứng từ"
            />
          </div>
          <div>
            <InputText label="Tên chứng từ" placeholder="Nhập tên chứng từ" />
          </div>
          <div>
            <label>Người tạo</label>
            <PotentialSelectBoxStep
              value="Chọn nguồn khách hàng"
              placeholder="Chọn người tạo"
            />
          </div>
          <div>
            <InputText label="Ngày tạo" placeholder="" type="date" />
          </div>
          <div>
            <InputText
              label="Số tiền cần thanh toán"
              placeholder="Nhập số tiền cần thanh toán"
            />
          </div>
          <div>
            <label>Kèm theo</label>
            <PotentialSelectBoxStep
              value="Chọn hợp đồng kèm theo "
              placeholder="Chọn hợp đồng kèm theo "
            />
          </div>
          <div>
            <InputText label="Nội dung thu" placeholder="Nhập nội dung thu" />
          </div>
        </div>
        <div className={styless.rightsuaphieu}>
          <p className={styles.main__body__type}>Đơn vị cung cấp</p>
          <div>
            <label>Kèm theo</label>
            <PotentialSelectBoxStep
              value="Tên khách hàng "
              placeholder="Lựa chọn khách hàng"
            />
          </div>
          <div>
            <InputText label="Mã khách hàng" placeholder="Mã khách hàng" />
          </div>
          <div>
            <InputText
              label="Số điện thoại"
              placeholder="Số điện thoại khách hàng"
            />
          </div>
          <div>
            <InputText label="Địa chỉ" placeholder="Email nhà cung cấp" />
          </div>
          <div className={styles.main__body__type}>
            <p>Người liên hệ</p>

            <div>
              <InputText label="Người liên hệ" placeholder="Người liên hệ" />
            </div>
            <div>
              <InputText
                label="Số điện thoại người liên hệ"
                placeholder="Số điện thoại người liên hệ"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 50 }}>
        <div className={styless.btn}>
          <Button
            onClick={() => {
              setIsShowModalReturn(true);
            }}
            style={{ width: 150 }}
            className="btn btn-warning"
          >
            Hủy
          </Button>
        </div>
        <div className={styless.btn}>
          <Button
            onClick={() => router.push(`/chi-tiet-phieu-thu/${path.id}`)}
            style={{ width: 150 }}
            type="primary"
            className="btn btn-warning"
          >
            Lưu
          </Button>
        </div>
        <ModalDelete
          isShowModal={isShowModal}
          onClose={onClose}
          handleSave={handleSave}
        />
        <ModalReturn
          isShowModalReturn={isShowModalReturn}
          onClose={onClose}
          handleSave={handleSave}
          name="Thay đổi sẽ không được lưu
                    Bạn có chắc muốn thoát"
          path={path}
        />
      </div>
    </>
  );
}
