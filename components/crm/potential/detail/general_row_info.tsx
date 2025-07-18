import { useRouter } from "next/router";
import styles from "./information.module.css";
import InforText from "./text_info";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { axiosCRM } from "@/utils/api/api_crm";
import {
  renderBank,
  renderBusinessType,
  renderCategory,
  renderListGender,
  renderPotentialDepartment,
  renderPotentialPosition,
  renderPotentialResource,
  renderPotentialType,
  renderProfession,
  renderRevenue,
  renderSector,
  renderVocative,
} from "@/utils/listOption";
import {
  convertTimestampToDate,
  convertTimestampToDateHMDMY,
} from "@/utils/function";
import { renderCity, renderDistrict } from "@/constants/address-constant";
import { useFormData } from "../../context/formDataContext";

const diaryEntries = [
  {
    time: "10:10 - 10/10/2020",
    content: "Nhóm khách hàng được cập nhật bởi",
    author: "Nguyễn Văn Nam",
  },
];

export default function GeneralRowInforText() {
  const router = useRouter();
  const emptyEntries = new Array(10).fill(null);
  const { id } = router.query;
  const { formData } = useContext(useFormData);
  const { checked } = formData;
  const [detailData, setDataDetail] = useState<any>({});
  let [social, setSocial] = useState([]);
  useEffect(() => {
    axiosCRM
      .post("/potential/detail-potential", { cus_id: id })
      .then((res) => {
        setDataDetail({
          ...res.data.data.data,
          ...res.data.data.data.potential_id,
          ...res.data.data.data.emp_id,
          empName: res.data.data.data?.emp_id?.userName,
        });
        handlePotentialId(res.data.data.data.potential_id);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePotentialId = (datas) => {
    social = [];
    for (const key in datas.social) {
      if (datas.social[key]) {
        social.push([key]);
      }
    }
    setSocial(social);
  };
  return (
    <main>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Thông tin chi tiết</h4>
        </div>
        <h2 className={styles.table_description}>Thông tin chung</h2>
        <div className={styles.row_input_text}>
          <InforText field="Mã tiềm năng:" value={detailData.potential_id} />
          {checked && !detailData.vocative ? null : (
            <InforText
              field="Xưng hô:"
              value={renderVocative(detailData.vocative)}
            />
          )}
          {checked && !detailData.stand_name ? null : (
            <InforText field="Họ và đệm:" value={detailData.stand_name} />
          )}
          {checked && !detailData.name ? null : (
            <InforText field="Tên:" value={detailData.name} />
          )}
          {checked && !detailData.name && !detailData.stand_name ? null : (
            <InforText
              field="Họ và tên:"
              value={`${detailData.stand_name ? detailData.stand_name : ""} ${
                detailData.name
              }`}
            />
          )}
          {checked && !detailData.pos_id ? null : (
            <InforText
              field="Chức danh:"
              value={renderPotentialPosition(detailData.pos_id)}
            />
          )}
          {checked && !detailData.department ? null : (
            <InforText
              field="Phòng ban:"
              value={renderPotentialDepartment(detailData.department)}
            />
          )}
          {checked && !detailData.office_phone ? null : (
            <InforText
              field="Điện thoại cơ quan:"
              value={detailData.office_phone}
            />
          )}
          {checked && !detailData.office_email ? null : (
            <InforText field="Email cơ quan:" value={detailData.office_email} />
          )}
          {checked && !detailData.private_phone ? null : (
            <InforText
              field="Điện thoại cá nhân:"
              value={detailData.private_phone}
            />
          )}
          {checked && !detailData.private_email ? null : (
            <InforText
              field="Email cá nhân:"
              value={detailData.private_email}
            />
          )}
          {checked && !detailData.tax_code ? null : (
            <InforText field="Mã số thuế:" value={detailData.tax_code} />
          )}
          {checked && !detailData.resource ? null : (
            <InforText
              field="Nguồn gốc:"
              value={renderPotentialResource(detailData.resource)}
            />
          )}
          {checked && !detailData.classify ? null : (
            <InforText
              field="Loại tiềm năng:"
              value={renderPotentialType(detailData.classify)}
            />
          )}
          {checked && !detailData.social ? null : (
            <InforText
              field="Mạng xã hội:"
              value={social ? social.join(", ") : "Chưa cập nhập"}
            />
          )}
          {social?.map((item) => (
            <InforText field={`${item}:`} link={detailData.social?.[item]} />
          ))}
          {checked && !detailData.empName ? null : (
            <InforText
              field="Nhân viên phụ trách:"
              value={detailData.empName}
              icon={<UserOutlined rev={null} />}
            />
          )}
        </div>

        <h2 className={styles.table_description}>Thông tin cá nhân</h2>
        <div className={styles.row_input_text}>
          {checked && !detailData.gender ? null : (
            <InforText
              field="Giới tính:"
              value={renderListGender(detailData.gender)}
            />
          )}
          {checked && !detailData.birthday ? null : (
            <InforText
              field="Ngày sinh:"
              value={
                detailData.birthday &&
                convertTimestampToDate(detailData.birthday)
              }
            />
          )}
        </div>
        <h2 className={styles.table_description}>Thông tin tổ chức</h2>
        <div className={styles.row_input_text}>
          {checked && !detailData.office ? null : (
            <InforText field="Tổ chức:" value={detailData.office} />
          )}
          {checked && !detailData.bank_account ? null : (
            <InforText
              field="Tài khoản ngân hàng:"
              value={detailData.bank_account}
            />
          )}
          {checked && !detailData.bank_id ? null : (
            <InforText
              field="Mở tại ngân hàng:"
              value={renderBank(detailData.bank_id)}
            />
          )}
          {checked && !detailData.founding_date ? null : (
            <InforText
              field="Ngày thành lập:"
              value={
                detailData.founding_date &&
                convertTimestampToDate(detailData.founding_date)
              }
            />
          )}
          {checked && !detailData.business_type ? null : (
            <InforText
              field="Loại hình:"
              value={renderBusinessType(detailData.business_type)}
            />
          )}
          {checked && !detailData.sector ? null : (
            <InforText
              field="Lĩnh vực:"
              value={renderSector(detailData.sector)}
            />
          )}
          {checked && !detailData.category ? null : (
            <InforText
              field="Ngành nghề:"
              value={renderProfession(detailData.category)}
            />
          )}
          {checked && !detailData.revenue ? null : (
            <InforText
              field="Doanh thu:"
              value={renderRevenue(detailData.revenue)}
            />
          )}
        </div>

        <h2 className={styles.table_description}>Thông tin địa chỉ</h2>
        <div className={styles.row_input_text}>
          <InforText field="Quốc gia:" value="Việt Nam" />
          {checked && !detailData.cit_id ? null : (
            <InforText
              field="Tỉnh/Thành phố:"
              value={renderCity(detailData.cit_id)}
            />
          )}

          {checked && !detailData.district_id ? null : (
            <InforText
              field="Quận/Huyện:"
              value={renderDistrict(detailData.district_id)}
            />
          )}

          {checked && !detailData.ward ? null : (
            <InforText field="Phường/Xã:" value={detailData.ward} />
          )}

          {checked && !detailData.address ? null : (
            <InforText field="Số nhà, đường phố:" value={detailData.address} />
          )}

          {checked && !detailData.bill_area_code ? null : (
            <InforText field="Mã vùng:" value={detailData.bill_area_code} />
          )}

          {checked &&
          !detailData.address &&
          !detailData.ward &&
          !detailData.district_id &&
          !detailData.cit_id ? null : (
            <InforText
              field="Địa chỉ đơn hàng:"
              value={`${detailData.address && `${detailData.address}, `}${
                detailData.ward && `${detailData.ward}, `
              }${
                detailData.district_id &&
                `${renderDistrict(detailData.district_id)}, `
              }${detailData.cit_id && `${renderCity(detailData.cit_id)}`} `}
            />
          )}
        </div>
        <div>
          <h2 className={styles.table_description}>Thông tin địa chỉ</h2>
          <div className={styles.custom_potential_input_text}>
            {checked && !detailData.description ? null : (
              <InforText field="Mô tả:" value={detailData.description} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Thông tin hệ thống</h4>
        </div>
        <div className={styles.row_input_text}>
          {checked && !detailData.user_create_name ? null : (
            <InforText
              field="Người tạo:"
              value={detailData.user_create_name}
              icon={<UserOutlined rev={null} />}
            />
          )}

          {checked && !detailData.created_at ? null : (
            <InforText
              field="Ngày tạo:"
              value={convertTimestampToDateHMDMY(detailData.created_at)}
            />
          )}

          {checked && !detailData.office_email ? null : (
            <InforText
              field="Người sửa:"
              value="Chỗ này sẽ thêm sau"
              icon={<UserOutlined rev={null} />}
            />
          )}

          {checked && !detailData.office_email ? null : (
            <InforText field="Ngày sửa:" value="10:10 - 10/10/2022" />
          )}

          <div className={styles.custom_icon}>
            <InforText
              field="Dùng chung:"
              value={detailData.share_all && <CheckCircleOutlined rev={null} />}
            />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Nhật ký</h4>
        </div>
        <div className={styles.table_overflow}>
          {emptyEntries.map((_, index) => (
            <div className={styles.table_diary} key={index}>
              <h3>10:10 - 10/10/2020</h3>
              <p>
                Nhóm khách hàng được cập nhật bởi <span>Nguyễn Văn Nam</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
