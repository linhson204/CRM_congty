import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential2.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import Image from "next/image";
import stylesDetail from "@/components/crm/customer/contact/detail_information/styles_diary.module.css";
import Link from "next/link";
import styleChance from "./detail_chance.module.css";
import TextInfoChance from "./text_info_chance";
import StepSelection from "./step_select";
import { Switch } from "antd";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import { useRouter } from "next/router";
import CancelModalChance from "../modals/cancel_modal";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";
import { stringToDateNumber } from "../../ultis/convert_date";
import { timestampToCustomString } from "../../ultis/convert_date";

interface DetailChance {
  cus_id: {
    name: string;
  };
  result: number;
  expected_end_date: number;
  expected_sales: number;
  total_money: number;
  stages: number;
  name: string;
  success_rate: number;
  // Add other properties as needed
}

interface PropsDetail {
  isHideEmpty?: boolean;
  setIsHideEmty?: Dispatch<SetStateAction<boolean>>;
  dataApi?: {
    result?: boolean;
    message?: string;
    total_money?: number;
    total_count?: number;
    total_product_cost?: number;
    total_tax?: number;
    total_money_discount?: number;
    data?: [];
    detailChance?: DetailChance;
  };
}

const DetailInformationChance: React.FC<PropsDetail> = ({
  isHideEmpty,
  setIsHideEmty,
  dataApi,
}) => {
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const [valueProcess, setValueProccess] = useState("");
  const [percentSuccess, setPerCentSuccess] = useState(0);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const token = Cookies.get("token_base365");

  const statusList = {
    1: "Mở đầu",
    0: "Mở đầu",
    2: "Khách hàng quan tâm",
    3: "Demo/Gthieu",
    4: "Đàm phán/ thương lương",
  };

  const switchHandle = (checked: boolean) => {
    setIsHideEmty(checked);
  };

  const fetchApiChance = async () => {
    const dataApi = await fetchApi(
      "http://localhost:3007/api/crm/chance/delete-chance",
      token,
      { chance_id: id },
      "POST"
    );
  };

  return (
    <>
      <CancelModalChance
        isModalCancel={isOpenModalCancel}
        setIsModalCancel={setIsOpenModalCancel}
        content="Bạn có chắc chắn muốn xoá cơ hội này không?"
        title="Xác nhận xoá cơ hội"
        fetchApi={fetchApiChance}
      />

      <div
        className="detail_header_chance"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 0 20px 0",
        }}
      >
        <div>
          <Switch onChange={switchHandle} />
          <span style={{ marginLeft: "10px" }}>Ẩn dữ liệu trống</span>
        </div>
        <div className={stylesDetail["main__control-btn"]}>
          <Link
            href={`/chance/edit/${id}`}
            className={stylesDetail["btn_edit"]}
          >
            <Image alt="image" width={16} height={16} src="/crm/edit_kh.svg" />
            Chỉnh sửa
          </Link>
          <button
            className={`${stylesDetail["btn"]} ${stylesDetail["btn_delete"]} ${stylesDetail["h_delete_cus"]}`}
            onClick={() => setIsOpenModalCancel(true)}
          >
            <Image
              alt="image"
              width={16}
              height={16}
              src="/crm/delete_kh.svg"
            />
            Xóa
          </button>
        </div>
      </div>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Chi tiết cơ hội</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <div className={styles["main__body_item"]}>
                  <div className={styleChance.row}>
                    <TextInfoChance
                      label="Liên hệ"
                      value={dataApi?.detailChance?.cus_id?.name}
                      isHideEmpty={isHideEmpty}
                    />
                    <TextInfoChance
                      label="Số tiền"
                      value={dataApi?.detailChance?.total_money}
                      text="VNĐ"
                      isHideEmpty={isHideEmpty}
                    />
                    <TextInfoChance
                      label="Giai đoạn"
                      value={statusList?.[dataApi?.detailChance?.stages]}
                      isHideEmpty={isHideEmpty}
                    />
                    <TextInfoChance
                      label="Tỷ lệ thành công"
                      value={dataApi?.detailChance?.success_rate}
                      text="%"
                      isHideEmpty={isHideEmpty}
                    />
                    <TextInfoChance
                      label="Doanh số kỳ vọng"
                      value={dataApi?.detailChance?.expected_sales}
                      text="VNĐ"
                      isHideEmpty={isHideEmpty}
                    />
                    <TextInfoChance
                      label="Ngày kỳ vọng/kết thúc"
                      value={timestampToCustomString(
                        Number(dataApi?.detailChance?.expected_end_date) / 1000
                      )}
                      isHideEmpty={isHideEmpty}
                    />
                  </div>
                  <div className={styleChance.step_select}>
                    <StepSelection
                      stages={dataApi?.detailChance?.stages || 0}
                      result={dataApi?.detailChance?.result}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInformationChance;
