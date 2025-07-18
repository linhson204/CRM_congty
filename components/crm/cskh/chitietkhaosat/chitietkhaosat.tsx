import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "./index.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
export default function ChiTietKhaoSat() {
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
  const handleDelete = (e: any) => {
    var result = window.confirm("Bạn có chắc muốn xóa không?");
    if (result) {
      router.push("/phieu-thu");
    } else {
    }
  };

  const onChange = (e: CheckboxChangeEvent) => {};
  return (
    <div>
      <div>
        <button
          onClick={() => router.push(`/du-lieu-khao-sat/${path.id}`)}
          type="button"
          className={`${styles.dropbtn_add}`}
        >
          <p>Dữ liệu thu về</p>
        </button>
      </div>
      <div className={styles.group_button}>
        <button
          onClick={() => router.push(`/chinh-sua-khao-sat/${path.id}`)}
          type="button"
          className={`${styles.dropbtn_edit} `}
        >
          <img src="/crm/edit.svg" alt="" />
          Chỉnh sửa
        </button>
        <button
          type="button"
          onClick={(e) => {
            handleDelete(e);
          }}
          className={`${styles.dropbtn_delete} `}
        >
          <p>Xóa</p>
        </button>
      </div>
      <div className={styles.headercontent}>Mẫu khảo sát</div>
      <div className={styles.contentheader}>
        <div className={styles.title}>Khảo sát chất lượng dịch vụ</div>
        <div>Cảm giác của bạn là tài sản của chúng tôi</div>
        <div style={{ color: "red", paddingTop: 10, fontSize: "14px" }}>
          *Bắt buộc
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.infocustomer}>
        <div>Thông tin khách hàng</div>
        <div style={{ color: "red", paddingTop: 10, fontSize: "14px" }}>
          *Bắt buộc
        </div>
        <div>&nbsp;</div>
        <div>Tên khách hàng</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập họ tên"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Số điện thoại</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập số điện thoại"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Email</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập email"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Địa chỉ</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập địa chỉ"}
            className={styles.inputtitle2_option}
          />
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.infocustomer}>
        <div>Anh(chị) có hài lòng về sản phẩm của công ty</div>
        <div style={{ padding: "10px 0" }}>
          <Checkbox onChange={onChange}>Hài lòng</Checkbox>
        </div>
        <div>
          <Checkbox onChange={onChange}>Kém chất lượng</Checkbox>
        </div>
      </div>
      <div className={styles.infocustomer}>
        <div>Thông tin khách hàng</div>
        <div style={{ color: "red", paddingTop: 10, fontSize: "14px" }}>
          *Bắt buộc
        </div>
        <div>&nbsp;</div>
        <div>Tên khách hàng</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập họ tên"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Số điện thoại</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập số điện thoại"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Email</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập email"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Địa chỉ</div>
        <div>
          <Input
            type="text"
            defaultValue={"Nhập địa chỉ"}
            className={styles.inputtitle2_option}
          />
        </div>
      </div>
      <div className={styles.infocustomer}>
        <div>
          ANH(CHỊ) HÃY ĐƯA RA Ý KIẾN CỦA MÌNH VỀ SẢN PHẨM VÌ SAO CHƯA LÀM HÀI
          LÒNG
        </div>
        <div>
          <Input type="text" className={styles.inputtitle2_option} />
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.headercontent}>Mẫu khảo sát</div>
      <div className={styles.contentheader}>
        <div style={{ color: "red", paddingTop: 10, fontSize: "14px" }}>
          *Bắt buộc
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.headercontent}>Mẫu khảo sát</div>
      <div className={styles.contentheader}>
        <div style={{ color: "red", paddingTop: 10, fontSize: "14px" }}>
          *Bắt buộc
        </div>
      </div>
    </div>
  );
}
