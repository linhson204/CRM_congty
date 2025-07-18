import style from "./information.module.css";
import { Dropdown, MenuProps, Switch } from "antd";
import {
  RetweetOutlined,
  FormOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PotentialRowInforText from "./potential_row_info";
import Tab from "./tab";
import { useRouter } from "next/router";
import ConvertModal from "../potential_action_modal/convert_modal";
import { useContext, useEffect, useState } from "react";
import DelActionModal from "../potential_action_modal/deltete_action_mdal";
import PotentialActionDetail from "./potential_action";
import { axiosCRM } from "@/utils/api/api_crm";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { useFormData } from "../../context/formDataContext";

export default function InformationTextPotentialDetails() {
  const router = useRouter();
  const { setFormData } = useContext(useFormData);
  const { id } = router.query;
  const items: MenuProps["items"] = [];
  const [isOpenCovert, setIsOpenConvert] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    axiosCRM
      .post("/potential/detail-potential", { cus_id: id })
      .then((res) => setDataDetail(res.data.data.data))
      .catch((err) => notifyError("Vui lòng thử lại sau"));
  }, []);
  const handleDelete = () => {
    axiosCRM
      .post("/potential/delete-potential", { cus_id: id })
      .then((res) => {
        setIsDelOpen(true);
        setTimeout(() => {
          setIsDelOpen(false);
          router.push("/potential/list");
        }, 2000);
      })
      .catch((err) => console.log("checkrrrr", err));
  };
  const onChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, checked: checked }));
  };
  return (
    <div className={style.main}>
      <div
        className={`${style.main_button} ${style.flex_end} `}
        style={{ flexWrap: "wrap", gap: "15px", overflow: "hidden" }}
      >
        <div
          className={style.switch}
          style={{ marginBottom: "10px", marginTop: "5px" }}
        >
          <Switch onChange={onChange} /> <p>Ẩn dữ liệu trống</p>
        </div>
        <div
          className={style.group_button}
          style={{
            flexWrap: "wrap",
            gap: "15px",
            overflow: "hidden",
          }}
        >
          <button
            className={style.change}
            onClick={() => setIsOpenConvert(true)}
          >
            <RetweetOutlined rev={null} /> Chuyển đổi
          </button>
          <button
            className={style.fix}
            onClick={() => router.push(`/potential/update/${id}`)}
          >
            <FormOutlined rev={null} /> Chỉnh sửa
          </button>
          <button className={style.delete} onClick={handleDelete}>
            <DeleteOutlined rev={null} /> Xoá
          </button>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <PotentialActionDetail isSelectedRow={true} />
          </Dropdown>
        </div>
      </div>
      <div className={style["potential_info-table"]}>
        <div className={style.table_title}>
          <h4>Chi tiết tiềm năng</h4>
        </div>
        <div className={style.body_table}>
          <div className={style.img_user}>
            <UserOutlined rev={null} />
          </div>
          <div className={style.potential_table}>
            <PotentialRowInforText formData={dataDetail} />
          </div>
        </div>
      </div>
      <div className={style.tab}>
        <Tab />
      </div>
      <ConvertModal
        isModalCancel={isOpenCovert}
        setIsModalCancel={setIsOpenConvert}
      />
      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      <ToastContainer autoClose={2000} />
    </div>
  );
}
