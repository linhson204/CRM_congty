import { useState } from "react";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import ModalCompleteStepADD from "../../potential/potential_steps/complete_mdaladd";
import CancelModalAdd from "../../potential/potential_steps/cancel_them_moi";
import { base_url } from "../../service/function";
const Cookies = require("js-cookie");
export default function CustomomerFooterAddFile({
  link = "/potential/list",
  title,
  contentCancel,
  titleCancel,
  formData,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${base_url}/api/crm/customer/addCustomer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            stand_name: formData.stand_name,
            logo: formData.logo.name,
            phone_number: formData.phone_number,
            birthday: formData.birthday,
            tax_code: formData.tax_code,
            cit_id: formData.cit_id,
            district_id: formData.district_id,
            ward: formData.ward,
            address: formData.address,
            ship_invoice_address: formData.ship_invoice_address,
            gender: formData.gender,
            cmnd_ccnd_number: formData.cmnd_ccnd_number,
            cmnd_ccnd_address: formData.cmnd_ccnd_address,
            cmnd_ccnd_time: formData.cmnd_ccnd_time,
            description: formData.description,
            introducer: formData.introducer,
            contact_name: formData.contact_name,
            contact_email: formData.contact_email,
            contact_phone: formData.contact_phone,
            contact_gender: formData.contact_gender,
            company_id: formData.company_id,
            emp_id: formData.emp_id,
            user_create_id: formData.user_create_id,
            user_create_type: formData.user_create_type,
            user_edit_id: formData.user_edit_id,
            user_edit_type: formData.user_edit_type,
            group_id: formData.group_id,
            status: formData.status,
            business_areas: formData.business_areas,
            category: formData.category,
            business_type: formData.business_type,
            classify: formData.classify,
            bill_city: formData.bill_city,
            bil_district: formData.bil_district,
            bill_ward: formData.bill_ward,
            bill_address: formData.bill_address,
            bill_area_code: formData.bill_area_code,
            bill_invoice_address: formData.bill_invoice_address,
            bill_invoice_address_email: formData.bill_invoice_address_email,
            ship_city: formData.ship_city,
            ship_area: formData.ship_area,
            bank_id: formData.bank_id,
            bank_account: formData.bank_account,
            revenue: formData.revenue,
            size: formData.size,
            rank: formData.rank,
            website: formData.website,
            number_of_day_owed: formData.number_of_day_owed,
            deb_limit: formData.deb_limit,
            share_all: formData.share_all,
            type: formData.type,
            is_input: formData.is_input,
            id_cus_from: formData.id_cus_from,
            cus_from: formData.cus_from,
            link: formData.link,
          }),
        }
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={() => (handleSubmit(), setModal1Open(true))}
      >
        Lưu
      </button>

      {
        <CancelModalAdd
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
        />
      }

      <ModalCompleteStepADD
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
      />
    </div>
  );
}
