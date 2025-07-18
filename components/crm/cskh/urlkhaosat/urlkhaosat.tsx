import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../chitietkhaosat/index.module.css";
import styless from "../../potential/potential.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { CheckCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
export default function URLKhaoSat() {
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
  return (
    <div>
      <div className={styles.headercontent}>Mẫu khảo sát</div>
      <div className={styles.contentheader}>
        <div className={styles.title}>Khảo sát chất lượng dịch vụ</div>
        <div>Cảm giác của bạn là tài sản của chúng tôi</div>
        <div style={{ color: "red", paddingTop: 20 }}>*Bắt buộc</div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.infocustomer}>
        <div>Thông tin khách hàng</div>
        <div style={{ color: "red", paddingTop: 20 }}>*Bắt buộc</div>
        <div>&nbsp;</div>
        <div>Tên khách hàng</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập họ tên"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Số điện thoại</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập số điện thoại"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Email</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập email"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Địa chỉ</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập địa chỉ"}
            className={styles.inputtitle2_option}
          />
        </div>
      </div>
      <div>&nbsp;</div>
      <div style={{ float: "right" }}>
        <Button
          onClick={() => {
            alert("Gửi câu trả lời thành công, cảm ơn bạn đã đánh giá"),
              router.push("/khao-sat");
          }}
          style={{ width: 200, color: "#4C5BD4", border: "1px solid blue" }}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
}
