import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import StaffData from "@/components/crm/setup_role/staff_data";
import OptionRole from "@/components/crm/setup_role/options_role";
import { useRouter } from "next/router";
import Head from "next/head";
const Cookies = require("js-cookie");

const SetUpRole: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const router = useRouter();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [infoRole, setInfoRole] = useState([]);
  const [id_user, setId_user] = useState("");

  const [checkboxState, setCheckboxState] = useState({
    selectAll: 0,
    checkboxItems: {
      custom_1: infoRole[0]?.add,
      custom_2: infoRole[0]?.edit,
      custom_3: infoRole[0]?.delete,
      custom_4: infoRole[0]?.seen,
      provider_1: infoRole[1]?.add,
      provider_2: infoRole[1]?.edit,
      provider_3: infoRole[1]?.delete,
      provider_4: infoRole[1]?.seen,
      mkt_1: infoRole[2]?.add,
      mkt_2: infoRole[2]?.edit,
      mkt_3: infoRole[2]?.delete,
      mkt_4: infoRole[2]?.seen,
      mange_1: infoRole[3]?.add,
      mange_2: infoRole[3]?.edit,
      mange_3: infoRole[3]?.delete,
      mange_4: infoRole[3]?.seen,
      care_1: infoRole[4]?.add,
      care_2: infoRole[4]?.edit,
      care_3: infoRole[4]?.delete,
      care_4: infoRole[4]?.seen,
      cost_1: infoRole[5]?.add,
      cost_2: infoRole[5]?.edit,
      cost_3: infoRole[5]?.delete,
      cost_4: infoRole[5]?.seen,
      report_1: infoRole[6]?.add,
      report_2: infoRole[6]?.edit,
      report_3: infoRole[6]?.delete,
      report_4: infoRole[6]?.seen,
      general_1: infoRole[7]?.add,
      general_2: infoRole[7]?.edit,
      general_3: infoRole[7]?.delete,
      general_4: infoRole[7]?.seen,
    },
  });

  const updateCheckboxState = (infoRoleData) => {
    const updatedCheckboxState = {
      selectAll: 0,
      checkboxItems: {
        custom_1: infoRoleData[0]?.add ? 1 : 0,
        custom_2: infoRoleData[0]?.edit ? 1 : 0,
        custom_3: infoRoleData[0]?.delete ? 1 : 0,
        custom_4: infoRoleData[0]?.seen ? 1 : 0,
        provider_1: infoRoleData[1]?.add ? 1 : 0,
        provider_2: infoRoleData[1]?.edit ? 1 : 0,
        provider_3: infoRoleData[1]?.delete ? 1 : 0,
        provider_4: infoRoleData[1]?.seen ? 1 : 0,
        mkt_1: infoRoleData[2]?.add ? 1 : 0,
        mkt_2: infoRoleData[2]?.edit ? 1 : 0,
        mkt_3: infoRoleData[2]?.delete ? 1 : 0,
        mkt_4: infoRoleData[2]?.seen ? 1 : 0,
        mange_1: infoRoleData[3]?.add ? 1 : 0,
        mange_2: infoRoleData[3]?.edit ? 1 : 0,
        mange_3: infoRoleData[3]?.delete ? 1 : 0,
        mange_4: infoRoleData[3]?.seen ? 1 : 0,
        care_1: infoRoleData[4]?.add ? 1 : 0,
        care_2: infoRoleData[4]?.edit ? 1 : 0,
        care_3: infoRoleData[4]?.delete ? 1 : 0,
        care_4: infoRoleData[4]?.seen ? 1 : 0,
        cost_1: infoRoleData[5]?.add ? 1 : 0,
        cost_2: infoRoleData[5]?.edit ? 1 : 0,
        cost_3: infoRoleData[5]?.delete ? 1 : 0,
        cost_4: infoRoleData[5]?.seen ? 1 : 0,
        report_1: infoRoleData[6]?.add ? 1 : 0,
        report_2: infoRoleData[6]?.edit ? 1 : 0,
        report_3: infoRoleData[6]?.delete ? 1 : 0,
        report_4: infoRoleData[6]?.seen ? 1 : 0,
        general_1: infoRoleData[7]?.add ? 1 : 0,
        general_2: infoRoleData[7]?.edit ? 1 : 0,
        general_3: infoRoleData[7]?.delete ? 1 : 0,
        general_4: infoRoleData[7]?.seen ? 1 : 0,
      },
    };
    setCheckboxState(updatedCheckboxState);
  };

  const data = [
    {
      id_role: null,
      id_module: "1",
      id_user: id_user,
      add: checkboxState.checkboxItems.custom_1,
      edit: checkboxState.checkboxItems.custom_2,
      delete: checkboxState.checkboxItems.custom_3,
      seen: checkboxState.checkboxItems.custom_4,
    },
    {
      id_role: null,
      id_module: "5",
      id_user: id_user,
      add: checkboxState.checkboxItems.provider_1,
      edit: checkboxState.checkboxItems.provider_2,
      delete: checkboxState.checkboxItems.provider_3,
      seen: checkboxState.checkboxItems.provider_4,
    },
    {
      id_role: null,
      id_module: "2",
      id_user: id_user,
      add: checkboxState.checkboxItems.mkt_1,
      edit: checkboxState.checkboxItems.mkt_2,
      delete: checkboxState.checkboxItems.mkt_3,
      seen: checkboxState.checkboxItems.mkt_4,
    },
    {
      id_role: null,
      id_module: "3",
      id_user: id_user,
      add: checkboxState.checkboxItems.mange_1,
      edit: checkboxState.checkboxItems.mange_2,
      delete: checkboxState.checkboxItems.mange_3,
      seen: checkboxState.checkboxItems.mange_4,
    },
    {
      id_role: null,
      id_module: "4",
      id_user: id_user,
      add: checkboxState.checkboxItems.care_1,
      edit: checkboxState.checkboxItems.care_2,
      delete: checkboxState.checkboxItems.care_3,
      seen: checkboxState.checkboxItems.care_4,
    },
    {
      id_role: null,
      id_module: "6",
      id_user: id_user,
      add: checkboxState.checkboxItems.cost_1,
      edit: checkboxState.checkboxItems.cost_2,
      delete: checkboxState.checkboxItems.cost_3,
      seen: checkboxState.checkboxItems.cost_4,
    },
    {
      id_role: null,
      id_module: "7",
      id_user: id_user,
      add: checkboxState.checkboxItems.report_1,
      edit: checkboxState.checkboxItems.report_2,
      delete: checkboxState.checkboxItems.report_3,
      seen: checkboxState.checkboxItems.report_4,
    },
    {
      id_role: null,
      id_module: "8",
      id_user: id_user,
      add: checkboxState.checkboxItems.general_1,
      edit: checkboxState.checkboxItems.general_2,
      delete: checkboxState.checkboxItems.general_3,
      seen: checkboxState.checkboxItems.general_4,
    },
  ];
  const handleSetQuyen = async () => {
    alert("set quyền thành công");
    try {
      const res = await fetch(
        `http://210.245.108.202:3007/api/crm/role/role-setting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    setHeaderTitle("Thiết lập quyền");
    setShowBackButton(false);
    setCurrentPath("/");
    updateCheckboxState(infoRole);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, infoRole]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thiết lập quyền</title>
        <meta
          name="description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta name="Keywords" content="Phần mềm CRM, phần mềm crm miễn phí" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
        />
        <meta
          property="og:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          name="twitter:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin quyền</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <StaffData
                    setInfoRole={setInfoRole}
                    setCheckboxState={setCheckboxState}
                    setId_user={setId_user}
                  />
                </div>
                <OptionRole
                  checkboxState={checkboxState}
                  setCheckboxState={setCheckboxState}
                />
                <div className={stylesContract.btn_submit}>
                  <button className={stylesContract.sub1}>Hủy</button>
                  <button
                    className={stylesContract.sub2}
                    onClick={handleSetQuyen}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpRole;
