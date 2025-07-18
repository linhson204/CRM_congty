import { useEffect, useState } from "react";
import styles from "./potential2.module.css";
import PotentialAction from "./potential_action";
import Link from "next/link";
import { axiosQLC } from "@/utils/api/api_qlc";
import { ngayHomNay, notifyError, renderPosition } from "@/utils/function";
import SelectSingle from "@/components/commodity/select";
import {
  LIST_BUSINESS_TYPE,
  LIST_SECTOR,
  getPotentialResource,
  renderBusinessType,
  renderPotentialResource,
  renderSector,
  renderVocative,
} from "@/utils/listOption";
import { InputSearch } from "@/components/commodity/input";
import { axiosCRM } from "@/utils/api/api_crm";
import { renderCity, renderDistrict } from "@/constants/address-constant";
import { ExcelDownload } from "@/components/commodity/excelDownload";
const Cookies = require("js-cookie");
const role = Cookies.get("role");

export default function PotentialInputGroups({
  isSelectedRow,
  isRowDataSelected,
  isNumberSelected,
  setSelected,
  setNumberSelected,
  formData = null,
  setFormData = null,
}: any) {
  const [listNV, setListNv] = useState<any>();
  const [dep_id, setDep_id] = useState<any>();
  const [listEmp, setListEmp] = useState([]);

  const handleGetInfoCusNV = async () => {
    try {
      if (role == "2") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/employee/info`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token_base365")}`,
            },
            // body: JSON.stringify({ com_id: `${Cookies.get("com_id")}` }),
          }
        );

        const data = await res.json();
        if (data && data?.data) {
          setDep_id(data?.data?.data?.dep_id);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    axiosQLC
      .post("/managerUser/listUser", { ep_status: "Active" })
      .then((res) => convertDataEmp(res.data.data.data))
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  }, []);
  const convertDataEmp = (datas) => {
    setListEmp(
      datas.map((item: any) => ({
        value: item.ep_id,
        label: `${item.ep_id}. ${item.userName}`,
      }))
    );
  };
  const handleRecall = () => {
    setFormData({ ...formData, recall: !formData.recall });
  };
  const handleGetInfoCus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json();
      if (data && data?.data) setListNv(data?.data?.items);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetInfoCusNV();
    handleGetInfoCus();
  }, [dep_id]);

  const handleExportToExcel = async () => {
    const filename = `Danh sách tiềm năng ${ngayHomNay()}.xlsx`;
    const columnHeaders = [
      "Mã tiềm năng",
      "Xưng hô",
      "Họ và tên",
      "Chức danh",
      "Điện thoại cá nhân",
      "Email cá nhân",
      "Điện thoại cơ quan",
      "Email cơ quan",
      "Địa chỉ",
      "Tỉnh/Thành phố",
      "Quận/Huyện",
      "Phường xã",
      "Nguồn gốc",
      "Loại hình",
      "Lĩnh vực",
      "Mô tả",
      "Người tạo",
    ];
    const respon = await axiosCRM.post("/potential/listPotential", formData);

    const data = await respon.data.data.data?.map((item) => [
      item.potential_id,
      renderVocative(item.vocative),
      `${item.stand_name} ${item.name}`,
      renderPosition(item.pos_id),
      item.private_phone,
      item.private_email,
      item.office_phone,
      item.office_email,
      item.address,
      renderCity(item.cit_id),
      renderDistrict(item.district_id),
      item.ward,
      renderPotentialResource(item.resource),
      renderBusinessType(item.business_type),
      item.sector &&
        item.sector
          .split(",")
          .map((item, index) => `${renderSector(item)}`)
          ?.join(", "),
      item.description,
      "Thiếu người tạo, sẽ thêm sau",
    ]);
    ExcelDownload([columnHeaders, ...data], filename);
  };
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div className={`${styles.select_item} ${styles.select_item_time}`}>
          <label htmlFor="" className="">
            Thời gian tạo:
          </label>
          <div className={styles.input_item_time}>
            <input
              style={{ fontSize: "14px" }}
              type="date"
              name=""
              id="start_time"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  fromDate: e.target.value,
                  recall: !prev.recall,
                }));
              }}
            />
            -
            <input
              style={{ fontSize: "14px" }}
              type="date"
              name=""
              id="end_time"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  toDate: e.target.value,
                  recall: !prev.recall,
                }));
              }}
            />
          </div>
        </div>
        <div className={`${styles.select_itemM}`}>
          <SelectSingle
            setFormData={setFormData}
            title="Loại hình"
            data={LIST_BUSINESS_TYPE}
            name="business_type"
            placeholder="Tất cả"
            onChange={handleRecall}
          />{" "}
        </div>
        <div className={`${styles.select_itemM}`}>
          <SelectSingle
            setFormData={setFormData}
            title="Lĩnh vực"
            data={LIST_SECTOR}
            name="sector"
            placeholder="Tất cả"
            onChange={handleRecall}
          />
        </div>
        <div className={`${styles.select_itemM}`}>
          <SelectSingle
            setFormData={setFormData}
            title="Nguồn gốc"
            data={getPotentialResource}
            name="resource"
            placeholder="Tất cả"
            onChange={handleRecall}
          />
        </div>
        <div className={`${styles.select_itemM}`}>
          {" "}
          <SelectSingle
            setFormData={setFormData}
            title="Nguời tạo"
            data={listEmp}
            name="user_create_id"
            placeholder="Tất cả"
            onChange={handleRecall}
          />
        </div>
      </div>
      <div className={`${styles.main__control_btn} flex_between`}>
        <InputSearch
          value={formData.name}
          setFormData={setFormData}
          onSubmit={handleRecall}
          name="name"
          placeholder="Tìm kiếm theo tên tiềm năng"
        />
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/potential/add_file">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
          <Link href="/potential/import_file">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
            >
              <img src="/crm/h_import_cus.svg" />
              Nhập từ file
            </button>
          </Link>
          <button
            type="button"
            onClick={handleExportToExcel}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
          >
            <img src="/crm/icon_excel.svg" />
            Xuất excel
          </button>
        </div>
      </div>

      <PotentialAction
        isSelectedRow={isSelectedRow}
        isNumberSelected={isNumberSelected}
        isRowDataSelected={isRowDataSelected}
        setSelected={setSelected}
        setNumberSelected={setNumberSelected}
        listNV={listNV}
      />
    </div>
  );
}
