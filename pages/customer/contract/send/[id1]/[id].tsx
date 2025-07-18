import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import MultipleSelection from "@/components/crm/customer/contract/multiple_selection";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import ContractSelectBoxStep from "@/components/crm/customer/contract/select_box_step-send";
import Link from "next/link";
import ModalCompleteContractStepADD from "@/components/crm/customer/contract/complete_contract_add";
import TableDataContractSend from "@/components/crm/table/table-contract-send";
import Head from "next/head";

const Cookies = require("js-cookie");
import { base_url } from "@/components/crm/service/function";

const data = [
  {
    department: "Phòng A",
    positions: ["Chức vụ 1"],
    employees: ["Nhân viên 1", "Nhân viên 2"],
  },
  {
    department: "Phòng B",
    positions: ["Chức vụ 2"],
    employees: ["Nhân viên 3", "Nhân viên 4"],
  },
];

export default function ContractDetailsSend() {
  const [modal1Open, setModal1Open] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id1, id } = router.query;
  const [checkbox1Checked, setCheckbox1Checked] = useState(true);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [dataFromSelectDataBox, setDataFromSelectDataBox] = useState([]);
  const [selectedPosition, setSelectedPosition] =
    useState<string>("Chọn chức vụ");
  const [selectedEmployee, setSelectedEmployee] =
    useState<string>("Chọn nhân viên");
  const [selectedValue, setSelectedValue] = useState([]);
  const [dataDeps, setDataDeps] = useState([]);
  const [dataEmps, setDataEmps] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const [name, setname] = useState<any>();

  const getNameDetail = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: id1 }),
    });
    const data = await res.json();
    setname(data?.data?.name);
  };

  const getDepartments = async () => {
    try {
      const response = await fetch(
        `http://210.245.108.202:3000/api/qlc/department/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDataDeps(data?.data?.items);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const getDataEmps = async () => {
    try {
      const res = await fetch(
        `http://210.245.108.202:3000/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          // body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      const dataFilter =
        selectedDepartment &&
        selectedDepartment !== "" &&
        selectedDepartment !== "Chọn phòng ban"
          ? data?.data?.items?.filter(
              (item) => item?.dep_id === selectedDepartment
            )
          : [];

      const dataFilterAccordingPos =
        selectedPosition &&
        selectedPosition !== "" &&
        selectedPosition !== "Chọn chức vụ"
          ? dataFilter?.filter((item) => item.role_id === selectedPosition)
          : dataFilter;
      setDataTable(data?.data?.items);
      setDataEmps(dataFilterAccordingPos);
    } catch (err) {}
  };

  const dataPosition = [
    { _id: 19, name: "Chủ tịch hội đồng quản trị" },
    { _id: 18, name: "Phó chủ tịch hội đồng quản trị" },
    { _id: 17, name: "Thành viên hội đồng quản trị" },
    { _id: 21, name: "Tổng giám đốc tập đoàn" },
    { _id: 22, name: "Phó tổng giám đốc tập đoàn" },
    { _id: 16, name: "Tổng giám đốc" },
    { _id: 14, name: "Phó tổng giám đốc" },
    { _id: 8, name: "Giám đốc" },
    { _id: 7, name: "Phó giám đốc" },
    { _id: 6, name: "Trưởng phòng" },
    { _id: 5, name: "Phó trưởng phòng" },
    { _id: 13, name: "Tổ trưởng" },
    { _id: 12, name: "Phó tổ trưởng" },
    { _id: 4, name: "Trưởng nhóm" },
    { _id: 20, name: "Nhóm Phó" },
    { _id: 11, name: "Trưởng ban dự án" },
    { _id: 10, name: "Phó ban dự án" },
    { _id: 3, name: "Nhân viên chính thức" },
    { _id: 2, name: "Nhân viên thử việc" },
    { _id: 9, name: "Nhân viên Part time" },
    { _id: 1, name: "Sinh viên thực tập" },
  ];

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    getDataEmps();
  }, [selectedDepartment, selectedPosition]);

  useEffect(() => {
    getNameDetail();
    setHeaderTitle(`${name} / Hợp đồng bán / Gửi hợp đồng`);
    setShowBackButton(true);
    setCurrentPath(`/customer/contract/list/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id, name]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  // const selectedData = data.find(
  //   (item) => item.department === selectedDepartment
  // );

  const handleChangeDepartment = (value: string) => {
    setSelectedDepartment(value);
  };

  const onChangeCheckbox1 = (e: CheckboxChangeEvent) => {
    setCheckbox1Checked(e.target.checked);
    setSelectedDepartment(null);
  };

  const onChangeCheckbox2 = (e: CheckboxChangeEvent) => {
    setCheckbox2Checked(e.target.checked);
  };

  const onChangeCheckbox3 = (e: CheckboxChangeEvent) => {
    setCheckbox3Checked(e.target.checked);
  };

  useEffect(() => {
    setSelectedPosition("");
    setSelectedEmployee("");
  }, [selectedDepartment]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Gửi hợp đồng</title>
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
      <div className={styleHome.main}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Gửi hợp đồng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <p className={styles["main__body__send"]}>
                      Nơi nhận hợp đồng
                    </p>
                    <div className={styles.group_checkbox}>
                      <Checkbox defaultChecked onChange={onChangeCheckbox1}>
                        Nội bộ công ty
                      </Checkbox>
                      <Checkbox onChange={onChangeCheckbox2}>
                        Ngoài công ty
                      </Checkbox>
                      <Checkbox onChange={onChangeCheckbox3}>
                        Tài khoản cá nhân
                      </Checkbox>
                    </div>
                    <div className={styles.description_send}>
                      {checkbox1Checked && (
                        <div className={styles.incompany}>
                          <p className={styles["main__body__send"]}>
                            Nội bộ công ty
                          </p>
                          <div className={styles.select_incompany}>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Phòng ban <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                setSelectedDepartment={setSelectedDepartment}
                                value={selectedDepartment || "Chọn phòng ban"}
                                placeholder="Chọn phòng ban"
                                // onChange={handleChangeDepartment}
                                data={dataDeps}
                              ></ContractSelectBoxStep>
                            </div>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Chức vụ <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                value={selectedPosition || "Chọn chức vụ"}
                                placeholder="Chọn chức vụ"
                                data={
                                  selectedDepartment &&
                                  selectedDepartment !== "" &&
                                  selectedDepartment !== "Chọn chức vụ"
                                    ? dataPosition
                                    : []
                                }
                                setSelectedDepartment={setSelectedPosition}
                              />
                            </div>
                            <div
                              className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_send"]}`}
                            >
                              <label className={`${styles["form-label"]}`}>
                                Nhân viên <span className={styles.dot}>*</span>
                              </label>
                              <ContractSelectBoxStep
                                value={selectedEmployee || "Chọn nhân viên"}
                                placeholder="Chọn nhân viên"
                                data={
                                  selectedDepartment &&
                                  selectedDepartment !== "" &&
                                  selectedDepartment !== "Chọn chức vụ"
                                    ? dataEmps
                                    : []
                                }
                                setSelectedDepartment={setSelectedEmployee}
                                setSelectedValue={setSelectedValue}
                                setDataFromSelectDataBox={
                                  setDataFromSelectDataBox
                                }
                              />
                            </div>
                          </div>
                          <TableDataContractSend
                            selectedDepartment={selectedDepartment}
                            selectedEmployee={selectedEmployee}
                            data={dataTable}
                            setSelectValue={setSelectedValue}
                            dataFromSelectDataBox={dataFromSelectDataBox}
                            selectedValue={selectedValue}
                            dataPosition={dataPosition}
                          />
                        </div>
                      )}
                      {checkbox2Checked && (
                        <div className={styles.outsidecompany}>
                          <p className={styles["main__body__send"]}>
                            Ngoài công ty
                          </p>
                          <div>
                            <div className={styles.input_select_group}>
                              <div className={styles.input_send}>
                                <label className={`${styles["form-label"]}`}>
                                  Công ty <span className={styles.dot}>*</span>
                                </label>
                                <input
                                  placeholder="Hãy nhập email công ty muốn gửi hợp đồng"
                                  defaultValue=""
                                  className={styles.input_custom}
                                />
                              </div>
                              <div className={styles.select_send}>
                                <label className={`${styles["form-label"]}`}>
                                  Nhân viên
                                </label>
                                <div className={styles.custom_multiple}>
                                  <MultipleSelection />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {checkbox3Checked && (
                        <div className={styles.personal}>
                          <p className={styles["main__body__send"]}>
                            Tài khoản cá nhân
                          </p>
                          <div
                            className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles["custom_select_employee"]}`}
                          >
                            <ContractSelectBoxStep
                              value="Chọn tài khoản cần gửi hợp đồng"
                              placeholder="Chọn tài khoản cần gửi hợp đồng"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.button_group_send}>
                <Link href={`/customer/contract/detail/${id}`}>
                  <button className={styles.back_button}>Quay lại</button>
                </Link>
                <button
                  className={styles.send_button}
                  onClick={() => setModal1Open(true)}
                >
                  Gửi hợp đồng
                </button>
                <ModalCompleteContractStepADD
                  modal1Open={modal1Open}
                  setModal1Open={setModal1Open}
                  title={"Đã gửi hợp đồng thành công"}
                  id={id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
