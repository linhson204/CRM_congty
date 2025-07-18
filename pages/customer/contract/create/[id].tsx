import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styles from "@/components/crm/potential/potential.module.css";
import { Select } from "antd";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import ContractBtsGroupFooter from "@/components/crm/customer/contract/contract_footer_btns_group";
const Cookies = require("js-cookie");
import { base_url } from "@/components/crm/service/function";
import Head from "next/head";

export default function ContractDetailsCreate() {
  const { dataHederSideBar } = useContext<any>(SidebarContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const [valueContract, setValueContract] = useState("");
  const [FormData, setFormData] = useState<any>();
  const [dataCustomer, setDataCustomer] = useState<any>([]);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [name, setname] = useState<any>();
  const [nameContract, setnameContract] = useState<any>();
  const [valueInput, setValueInput] = useState(
    Array(0).fill({ val: "", name: "", status: "false", index: "", old: "" })
  );
  const [dataContract, setDataContract] = useState<any>();
  const [dataInfo, setDataInfo] = useState(null);

  const today = new Date();

  const getNameDetail = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: id }),
    });
    const data = await res.json();
    setname(data?.data?.name);
    setDataCustomer(data?.data);
  };

  const getContract = async () => {
    const res = await fetch(`${base_url}/api/crm/contract/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
    });
    const data = await res.json();
    const nameContract = data?.data?.list;
    setDataContract(data?.data?.list);
    setnameContract(nameContract);
  };

  const validateInput = (val) => {
    if (val) return true;
    return false;
  };

  useEffect(() => {
    getNameDetail();
    setHeaderTitle(`${dataCustomer?.name} / Hợp đồng bán / Thêm hợp đồng bán`);
    setShowBackButton(true);
    setCurrentPath(`/customer/contract/list/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id, name]);

  useEffect(() => {
    getContract();
  }, []);

  const options = nameContract?.map((item) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });

  const handleChangeInput = (eve, index: number) => {
    const value = eve.target.value;
    const newArr = [...valueInput]; // Tạo một bản sao của mảng
    newArr[index] = {
      ...newArr[index],
      val: value,
      status: !validateInput(value),
    };
    setValueInput(newArr);
  };

  const convertDefaultValueToString = (val) => {
    switch (val) {
      case 1:
        return name;
      case 2:
        return dataCustomer?.address?.info;
      case 3:
        return dataCustomer?.contact_email || dataCustomer?.email?.info;
      case 4:
        return dataCustomer?.phone_number?.info;
      case 5:
        return today.getDate();
      case 6:
        return today.getMonth() + 1;
      case 7:
        return today.getFullYear();
      case 8:
        return ""; // Ma so Thue
      case 9:
        return (
          dataHederSideBar?.data?.userName ||
          dataHederSideBar?.data?.com_name ||
          "000"
        );
      case 10:
        return dataHederSideBar?.data?.phone || "0000z";
      case 11:
        return dataHederSideBar?.data?.emailContact;
      case 12:
        return dataCustomer?.bank_account?.info;
      case 13:
        return dataCustomer?.bank_account?.info;
      case 14:
        return ""; //owner tk
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const onChangeSelect = async (value: string) => {
    setValueContract(value);
    setFormData({});
    try {
      const res = await fetch(`${base_url}/api/crm/contractAI/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ contract_id: value }),
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(data?.data);

        const defaultFieldIndexes = data?.data?.get_detail_form_contract
          .map((item, index) =>
            item.default_field !== null && item.default_field > 0 ? index : -1
          )
          .filter((index) => index !== -1);

        const modifiedValueInput = data?.data?.get_detail_form_contract.map(
          (item, index) => ({
            val: defaultFieldIndexes.includes(index)
              ? convertDefaultValueToString(item?.default_field)
              : "",
            name: item?.new_field,
            status: false,
            index: item?.index_field,
            old: item?.old_field,
          })
        );
        setValueInput(modifiedValueInput);
      } else {
        console.error("Error fetching data:", res.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thêm hợp đồng bán</title>
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
      <div ref={mainRef} className={styleHome.main}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin hợp đồng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                    className={styles["main__body_item"]}
                  >
                    <div style={{ flex: "1", width: "48%" }}>
                      <label className={`${styles["form-label"]} required`}>
                        Loại hợp đồng
                      </label>
                      <div>
                        <Select
                          style={{
                            maxWidth: "519px",
                            width: "100%",
                          }}
                          defaultValue="Chọn loại hợp đồng"
                          options={options}
                          placeholder="Chọn loại hợp đồng"
                          onChange={onChangeSelect}
                        />
                      </div>
                    </div>
                    <div style={{ flex: "1", width: "48%" }}>
                      <InputText bonus="disabled" label="Người tạo" require />
                    </div>
                  </div>

                  {valueContract !== "" &&
                    valueContract !== "0" &&
                    FormData?.get_detail_form_contract && (
                      <div>
                        <div
                          className={styles["input-group"]}
                          style={{ flexWrap: "wrap" }}
                        >
                          {FormData?.get_detail_form_contract &&
                            FormData?.get_detail_form_contract?.map(
                              (item: any, index: number) => (
                                <div key={index} style={{ width: "48%" }}>
                                  <label className={styles.required}>
                                    {item?.new_field}
                                    <span className={styles.dot}>*</span>
                                  </label>
                                  <p className={styles.old_field}>
                                    (Thay thế cho từ: {item?.old_field})
                                  </p>
                                  {validateInput(valueInput[index]?.status) && (
                                    <p
                                      style={{
                                        color: "red",
                                        fontSize: "15px",
                                        fontStyle: "initial",
                                        textAlign: "right",
                                        paddingBottom: "3px",
                                      }}
                                    >
                                      Vui lòng nhập từ thay thế
                                    </p>
                                  )}
                                  <input
                                    onChange={(e) =>
                                      handleChangeInput(e, index)
                                    }
                                    type="text"
                                    required
                                    value={valueInput[index]?.val}
                                    className={styles["form-control"]}
                                    data-old-field={item?.old_field}
                                    data-index={index}
                                  />
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    )}
                </div>
                {valueContract !== "" && valueContract !== "0" && (
                  <ContractBtsGroupFooter
                    id={valueContract ? valueContract : "default"}
                    formData={FormData}
                    setValueInput={setValueInput}
                    valueInput={valueInput}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
