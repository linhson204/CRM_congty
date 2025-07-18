import React, { useEffect, useState } from "react";
import styles from "../potential/merge/merge.module.css";
import RowRadioInput from "../potential/merge/row_input_radio";

interface PotentialProps {
  data: any;
  length: number;
}

const TableDataPotential: React.FC<PotentialProps> = ({ data }) => {
  const [defaultCheckBox, setDefaultCheckBox] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenSuccessMdal, setISOpenSuccessMdal] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [defaultState, setDefaultState] = useState({});
  const newData = data?.data;
  const [name, setName] = useState("");
  const [stand_name, setStand_name] = useState("");
  const [logo, setLogo] = useState("");
  const [tax_code, setTax_code] = useState("");
  const [address, setAddress] = useState("");
  const [ship_invoice_address, setShip_invoice_address] = useState("");
  const [gender, setGender] = useState("");
  const [cmnd_ccnd_number, setCmnd_ccnd_number] = useState("");
  const [cmnd_ccnd_address, setCmnd_ccnd_address] = useState("");
  const [cmnd_ccnd_time, setCmnd_ccnd_time] = useState("");
  const [description, setDescription] = useState("");
  const [introducer, setIntroducer] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [emp_id, setEmp_id] = useState("");
  const [group_id, setGroup_id] = useState("");
  const [status, setStatus] = useState("");
  const [classify, setClassify] = useState("");
  const [bill_city, setBill_city] = useState("");
  const [bill_district, setBill_district] = useState("");
  const [bill_ward, setBill_ward] = useState("");
  const [bill_address, setBill_address] = useState("");
  const [bill_invoice_address, setBill_invoice_address] = useState("");
  const [ship_city, setShip_city] = useState("");
  const [bank_id, setBank_id] = useState("");
  const [bank_account, setBank_account] = useState("");
  const [revenue, setRevenue] = useState("");
  const [resoure, setResoure] = useState("");
  const [size, setSize] = useState("");
  const [rank, setRank] = useState("");
  const [website, setWebsite] = useState("");
  const [number_of_day_owed, SetNumber_of_day_owed] = useState("");
  const [share_all, setShare_all] = useState("");
  const [email, setEmail] = useState("");
  const [business_areas, setBusiness_areas] = useState("");
  const [loai_hinh_khach_hang, setLoai_hinh_khach_hang] = useState("");
  const [country, setCountry] = useState("");
  const [bill_area_code, setBill_area_code] = useState("");
  const [bill_invoice_address_email, setBill_invoice_address_email] =
    useState("");
  const [giao_hang_huyen, setGiao_hang_huyen] = useState("");
  const [giao_hang_xa, setGiao_hang_xa] = useState("");
  const [ship_area, setShip_area] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [la_khach_hang_tu, setLa_khach_hang_tu] = useState("");
  const [han_muc_no, setHan_muc_no] = useState("");
  const [selectedData, setSelectedData] = useState<any>({});
  console.log(selectedData);

  const handleImageChange = (selectedValue: string) => {
    setSelectedId(selectedValue);
  };

  const handleClickOpenModal = () => {
    setISOpenSuccessMdal(true);
    // setIsOpenModalError(true);
  };

  const handleSelectAll = (index: number) => {
    setSelectedData(defaultState);
    setSelectedData((prevSelectedData) => {
      const updatedSelectedData = { ...prevSelectedData };
      for (const key in updatedSelectedData) {
        if (Array.isArray(updatedSelectedData[key])) {
          updatedSelectedData[key] = updatedSelectedData[key].map((item, i) =>
            i === index
              ? {
                ...item,
                status: true,
              }
              : {
                ...item,
                status: false,
              }
          );
        }
      }
      return updatedSelectedData;
    });
  };

  const setDefaultArr = (param: any, data) => {
    return data?.map((el) => {
      return {
        status: false,
        val: el?.[param],
      };
    });
  };

  useEffect(() => {
    if (newData) {
      const data = {
        xungho: setDefaultArr("salutation", newData),
        tendem: setDefaultArr("operation", newData),
        ten: setDefaultArr("name", newData),
        hovaten: setDefaultArr("operation", newData),
        chucdanh: setDefaultArr("name", newData),
        phongban: setDefaultArr("name", newData),
        dienthoaicoquan: setDefaultArr("name", newData),
        dienthoaicanhan: setDefaultArr("name", newData),
        emailcoquan: setDefaultArr("name", newData),
        emailcanhan: setDefaultArr("name", newData),
        nguongoc: setDefaultArr("name", newData),
        masothue: setDefaultArr("name", newData),
        loaitiemnang: setDefaultArr("name", newData),
        mangxahoi: setDefaultArr("name", newData),
        nhanvien: setDefaultArr("name", newData),
        gioitinh: setDefaultArr("name", newData),
        ngaysinh: setDefaultArr("name", newData),
        tochuc: setDefaultArr("name", newData),
        taikhoannh: setDefaultArr("name", newData),
        motainh: setDefaultArr("name", newData),
        ngaytl: setDefaultArr("name", newData),
        loaihinh: setDefaultArr("name", newData),
        linhvuc: setDefaultArr("name", newData),
        nganhnghe: setDefaultArr("name", newData),
        doanhthu: setDefaultArr("name", newData),
        quocgia: setDefaultArr("name", newData),
        city: setDefaultArr("name", newData),
        district: setDefaultArr("name", newData),
        ward: setDefaultArr("name", newData),
        street: setDefaultArr("name", newData),
        mavung: setDefaultArr("name", newData),
        diachi: setDefaultArr("name", newData),
        mota: setDefaultArr("name", newData),
        dungchung: setDefaultArr("name", newData),
        image: setDefaultArr("name", newData),
      };
      setSelectedData(data);
      setDefaultState(data);
    }
  }, [newData]);

  return (
    <div className={`${styles.main_potential} ${styles["scroll-container"]}`}>
      <div className={styles.content_table}>
        <div className={styles.main_title}>Gộp trùng tiềm năng</div>
        <div className={styles.main_table}>
          <div className={styles.scroll_table_left}>
            <table className={styles.table_info}>
              <thead>
                <tr>
                  <th colSpan={2}>Bản ghi chính</th>
                  {newData?.map((record, index) => (
                    <th key={index}>
                      Bản ghi {index + 1}
                      <button
                        onClick={() => {
                          handleSelectAll(index);
                        }}
                      >
                        {/* {selectAllData ? "Bỏ chọn" : "Chọn tất cả"} */}
                        Chọn tất cả
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Ảnh</p>
                  </td>
                  <td>
                    <img
                      style={{ transform: "translate(15%, 15%)" }}
                      src="/crm/user_kh.png"
                      className={styles.img_person}
                    />
                  </td>
                  {newData.map((record, index) => (
                    <td key={index}>
                      <input
                        onChange={() => handleImageChange(index)}
                        checked={selectedData?.image?.[index]?.status}
                        name="image"
                        type="radio"
                        className={styles.radio}
                        value={"/crm/user_kh.png"}
                      />
                      <img
                        style={{ transform: "translate(15%, 15%)" }}
                        src="/crm/user_kh.png"
                        className={styles.img_person}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin chung</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="xungho"
                  title="Xưng hô:"
                  value={newData?.map((item) => item?.salutation)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="tendem"
                  title="Họ và đệm:"
                  value={newData?.map((item) => item?.operation)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="ten"
                  title="Tên:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="hovaten"
                  title="Họ và tên:"
                  value={newData?.map((item) => item?.operation)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="chucdanh"
                  title="Chức danh:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="phongban"
                  title="Phòng ban:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="dienthoaicoquan"
                  title="Điện thoại cơ quan:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="dienthoaicanhan"
                  title="Điện thoại cá nhân:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="emailcoquan"
                  title="Email cơ quan:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="emailcanhan"
                  title="Email cá nhân:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="nguongoc"
                  title="Nguồn gốc:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="masothue"
                  title="Mã số thuế:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="loaitiemnang"
                  title="Loại tiềm năng:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="mangxahoi"
                  title="Mạng xã hội:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="nhanvien"
                  title="Nhân viên phụ trách:"
                  value={newData?.map((item) => item?.name)}
                />

                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin cá nhân</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="gioitinh"
                  title="Giới tính:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="ngaysinh"
                  title="Ngày sinh:"
                  value={newData?.map((item) => item?.name)}
                />

                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin tổ chức</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="tochuc"
                  title="Tổ chức:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="taikhoannh"
                  title="Tài khoản ngân hàng:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="motainh"
                  title="Mở tại ngân hàng:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="ngaytl"
                  title="Ngày thành lập:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="loaihinh"
                  title="Loại hình: "
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="linhvuc"
                  title="Lĩnh vực:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="nganhnghe"
                  title="Ngành nghề:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="doanhthu"
                  title="Doanh thu:"
                  value={newData?.map((item) => item?.name)}
                />
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin địa chỉ</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="quocgia"
                  title="Quốc gia:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="city"
                  title="Tỉnh/thành phố:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="district"
                  title="Quận/huyện:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="ward"
                  title="Phường/xã:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="street"
                  title="Số nhà, đường phố:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="mavung"
                  title="Mã vùng:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="diachi"
                  title="Địa chỉ:"
                  value={newData?.map((item) => item?.name)}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="mota"
                  title="Thông tin mô tả"
                  value={newData?.map((item) => item?.name)}
                />
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin hệ thống</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  setValueRadio={setName}

                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  name="dungchung"
                  title="Dùng chung:"
                  value={newData?.map((item) => item?.name)}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.main_footer_button}>
        <button type="button" className={styles.btn_cancle}>
          Hủy
        </button>
        <button type="button" className={styles.btn_save}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default TableDataPotential;
