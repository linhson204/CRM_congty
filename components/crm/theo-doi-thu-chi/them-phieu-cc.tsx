import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../potential/potential_add_files/add_file_potential.module.css";
import styless from "./index.module.css";

// "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import Link from "next/link";
import { Button } from "antd";
import { useState } from "react";
import ModalDelete from "../delete_data/modal/modal_delete";
import ModalReturn from "../delete_data/modal/modal_return";
export default function ThemPhieuCC() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  const handleSave = () => {
    setIsShowModal(true);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div className={styless.fieldsetne}>
          <p className={styles.main__body__type}>Thông tin phiếu</p>
          <div>
            <InputText
              label="Số chứng từ "
              placeholder="Hệ thống tự thiết lập"
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
        <div className={styless.fieldsetne}>
          <p className={styles.main__body__type}>Đơn vị cung cấp</p>
          <div>
            <label>Kèm theo</label>
            <PotentialSelectBoxStep
              value="Tên nhà cung cấp "
              placeholder="Lựa chọn nhà cung cấp"
            />
          </div>
          <div>
            <InputText label="Mã nhà cung cấp" placeholder="Mã nhà cung cấp" />
          </div>
          <div>
            <InputText
              label="Số điện thoại"
              placeholder="Số điện thoại nhà cung cấp"
            />
          </div>
          <div>
            <InputText label="Địa chỉ" placeholder="Email nhà cung cấp" />
          </div>
          <div className={styless.fieldsetne}>
            <p className={styles.main__body__type}>Người liên hệ</p>

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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 50,
          paddingRight: 100,
        }}
      >
        <div className={styless.btn}>
          <Button
            onClick={() => {
              setIsShowModalReturn(true);
            }}
            style={{ width: 200 }}
            className="btn btn-warning"
          >
            Hủy
          </Button>
        </div>
        <Link href={"/phieu-thu"} className={styless.btn}>
          <Button
            style={{ width: 200 }}
            type="primary"
            className="btn btn-warning"
          >
            Lưu
          </Button>
        </Link>
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
        />
      </div>
    </>
  );
}
