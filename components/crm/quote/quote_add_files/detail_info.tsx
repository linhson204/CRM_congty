import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import CustomerSelectBoxStep from "../quote_steps/select_box_step_customer";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, Spin, Tooltip } from "antd";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import useLoading from "../../hooks/useLoading";
import { useRouter } from "next/router";
import { SelectSingleV2 } from "../../input_select/select";
import ChanceSelectBoxStep from "../quote_steps/select_box_step_chance";
import ModalRole from "../quote_role/quote_role_modal";

export default function AddDetailInfo({ id: quoteId = 0 }) {
  const { newQuote, inputQuote, allAvailableStatusString, statusStrToNum, statusNumToStr,
    listCusOption, getCusId, keyword, setKeyword, setShouldFetchCus, setShouldFetchDetailData,
    isCreate, setIsCreate, detailData, setRecordId, shouldFetchDetailData, getPropOrDefault,
    listChanceOption, chanceKeyword, setChanceKeyword, clearQuote, recordId, checkRoleEdit
  } = useContext(QuoteContext)
  const [localStatus, setLocalStatus] = useState('Chọn')
  const [localCustomer, setLocalCustomer] = useState('Chọn')
  const [localChance, setLocalChance] = useState('Chọn')
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const { id } = router.query;

  const [roleOpen, setRoleOpen] = useState(false)

  // Textbox
  const handleSimpleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    inputQuote(name, value);
  };

  // Textbox phone
  const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '').slice(0, 11);
    inputQuote('phone_number', newPhone)
  }

  // Dropdown status
  const handleStatus = (str) => {
    setLocalStatus(str)
    inputQuote('status', statusStrToNum(str))
  }

  // Dropdown Customer
  const handleCusId = (str) => {
    setLocalCustomer(str)
    inputQuote('customer_id', getCusId(str))
    getCusDataFromId(getCusId(str))
  }

  // Dropdown Chance
  const handleChanceId = (str) => {
    setLocalChance(str)
    inputQuote('chance_id', getCusId(str))
  }

  const addressFromList = (data: any, listAddressFields: String[]) => {
    let addressArr = []
    for (let i = 0; i < listAddressFields.length; i++) {
      const field = listAddressFields[i];
      const resultAddress = getPropOrDefault(data, field.toString(), '')
      if (resultAddress !== '') {
        addressArr.push(resultAddress)
      }
    }

    return addressArr.join(', ')
  }

  // Đổ dữ liệu có sẵn của customer khi chọn 
  const getCusDataFromId = (id) => {
    axiosCRMCall
      .post('/customerdetails/detail', { cus_id: id })
      .then(res => {
        // if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
        //   inputQuote('address', getPropOrDefault(res?.data?.data, 'address.info'))
        //   inputQuote('phone_number', getPropOrDefault(res?.data?.data, 'phone_number.info'))
        //   inputQuote('tax_code', getPropOrDefault(res?.data?.data, 'tax_code'))
        // }

        /* Base mới, dữ liệu trả về sẽ khác nhau tùy theo 
          loại hình khách hàng  */
        let address = '', phone = '', tax = ''

        const data = getPropOrDefault(res, 'data.data', null)
        if (data) {
          const data2 = getPropOrDefault(data, 'data2', null)
          if (data2) {
            // name = getPropOrDefault(data2, 'ten_khach_hang', '')
            address = addressFromList(data2, ['thanh_pho.name', 'huyen.name', 'phuong_xa.ward_name', 'so_nha_duong_pho_hd'])
            phone = getPropOrDefault(data2, 'dien_thoai', '')
            tax = getPropOrDefault(data2, 'ma_so_thue', '')
          } else {
            // name = getPropOrDefault(data, 'name')
            address = addressFromList(data, ['cit_id.detail.name', 'district_id.detail.name', 'ward.detail.ward_name', 'address.detail'])
            phone = getPropOrDefault(data, 'contact_phone', '')
            tax = getPropOrDefault(data, 'tax_code', '')
          }

          inputQuote('address', address)
          inputQuote('phone_number', phone)
          inputQuote('tax_code', tax)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    setShouldFetchCus(true)
    if (Number(id) && Number(id) !== 0) {
      setRecordId(Number(id))
      setIsCreate(false)
      setShouldFetchDetailData(true)
    } else {
      setIsCreate(true)
      clearQuote()
    }
  }, [router.query])

  const checkRoleCallback = useCallback(
    async () => {
      const isAllowed = await checkRoleEdit(recordId)
      if (!isAllowed) {
        // router.push('/quote/list')
        setRoleOpen(true)
      }
    },
    [recordId, id],
  )

  // Nếu là chỉnh sửa
  useEffect(() => {
    if (!isCreate) {

      !isNaN(recordId) && recordId !== 0 && checkRoleCallback()

      setLocalStatus(statusNumToStr(detailData.status));
      if (detailData?.customer_id && detailData.customer_id !== 0) {
        axiosCRMCall
          .post("/customerdetails/detail", { cus_id: detailData.customer_id })
          .then((res) => {
            // console.log(res)
            // if (
            //   res &&
            //   res?.data &&
            //   res?.data.hasOwnProperty("data") &&
            //   res?.data?.data
            // ) {
            //   setLocalCustomer(
            //     `${detailData.customer_id} - ${res?.data?.data.name}`
            //   );
            // }
            let name = ''
            const data = getPropOrDefault(res, 'data.data', null)
            if (data) {
              const data2 = getPropOrDefault(data, 'data2', null)
              if (data2) {
                name = getPropOrDefault(data2, 'ten_khach_hang', 'Chưa cập nhật')
              } else {
                name = getPropOrDefault(data, 'name', 'Chưa cập nhật')
              }
            }

            setLocalCustomer(
              `${detailData.customer_id} - ${name}`
            )
          })
          .catch((err) => console.log(err));
      }
      // console.log(detailData.chance_id)
      if (detailData?.chance_id) {
        axiosCRMCall
          .post('/chance/detail-chance', {
            // chance_id: detailData.chance_id.id.toString() 
            chance_id: getPropOrDefault(detailData, 'chance_id.id', '-1').toString()
          })
          .then(res => {
            if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
              setLocalChance(`${detailData.chance_id.id} - ${res?.data?.data?.detailChance?.name}`)
            }
          })
          .catch((err) => console.log(err));
      }
      // if (detailData.chance_id) {
      //   axiosCRMCall
      //     .post('/chance/detail-chance', { chance_id: detailData.chance_id.id })
      //     .then(res => {
      //       if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
      //         setLocalChance(`${detailData.chance_id.id} - ${res?.data?.data?.detailChance?.name}`)
      //       }
      //     })
      //     .catch((err) => console.log(err))
      // }
    }
    stopLoading();
  }, [detailData]);

  return (
    <>
      {isLoading && (
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      )}
      <div>
        <p className={styles.main__body__type}>Thông tin chi tiết</p>

        <div className={styles.row_input}>
          <InputText
            label="Ngày báo giá"
            placeholder=""
            type="date"
            name="date_quote"
            value={newQuote.date_quote}
            onChange={handleSimpleInput}
            require={true}
          />
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <InputText
              label="Hạn thanh toán"
              placeholder="Nhập"
              type="date"
              name="date_quote_end"
              value={newQuote.date_quote_end}
              onChange={handleSimpleInput}
              require={true}
            />
          </div>
        </div>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]} required`}>
              Tình trạng
            </label>
            <OrderSelectBoxStep
              value={localStatus}
              placeholder="Chọn"
              data={allAvailableStatusString()}
              setValue={handleStatus}
            />
          </div>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]} required`}>
              Khách hàng
            </label>

            <CustomerSelectBoxStep
              value={localCustomer}
              placeholder="Chọn"
              data={listCusOption}
              setValue={handleCusId}
              setKeyword={setKeyword}
              keyword={keyword}
            />
          </div>
        </div>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <InputText
              label="Mã số thuế"
              placeholder="Nhập mã số thuế"
              name="tax_code"
              value={newQuote.tax_code}
              onChange={handleSimpleInput}
            />
          </div>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <InputText
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              name="address"
              value={newQuote.address}
              onChange={handleSimpleInput}
            />
          </div>
        </div>

        <div className={styles.row_input}>
          <InputText
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            name="phone_number"
            value={newQuote.phone_number}
            onChange={handlePhoneInput}
          />
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Cơ hội</label>
            <ChanceSelectBoxStep
              value={localChance}
              placeholder="Chọn"
              data={listChanceOption}
              setValue={handleChanceId}
              setKeyword={setChanceKeyword}
              keyword={chanceKeyword}
            />
          </div>
        </div>

        <div className={styles.row_input}>
          <label className={`${styles["form-label"]}`}>Lời giới thiệu</label>
          <textarea
            placeholder="Nhập lời giới thiệu"
            style={{ width: "100%", fontSize: 15, padding: 10, height: 80, resize: 'none' }}
            name="introducer"
            value={newQuote.introducer}
            onChange={handleSimpleInput}
          ></textarea>
        </div>
      </div>

      <ModalRole
        title="Bạn không có quyền truy cập"
        link="/quote/list"
        modal1Open={roleOpen}
        setModal1Open={setRoleOpen}
      />
    </>
  );
}
