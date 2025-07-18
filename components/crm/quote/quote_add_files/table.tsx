import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import TableDataOrderAddFiles from "@/components/crm/table/table-order-add-files";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, InputNumber, Tooltip } from "antd";
import OrderListModal from "../add_quote_action_modal/quote_list";
import TableDataQuoteAddFiles from "@/components/crm/table/table-quote-add-files";
import TextArea from "antd/es/input/TextArea";
import { QuoteContext } from "../quoteContext";
import useLoading from "../../hooks/useLoading";

export default function AddTable() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const { newQuote, inputQuote, tempListProd, isCreate, editQuote,
    detailData, shouldFetchDetailData, getPropOrDefault } = useContext(QuoteContext)
  const [localDiscountRate, setLocalDiscountRate] = useState('0')
  const [localTotal, setLocalTotal] = useState(0)
  const [localTotalWithDiscount, setLocalTotalWithDiscount] = useState(0)

  useEffect(() => {
    if (!isCreate) {
      setLocalDiscountRate(getPropOrDefault(detailData, 'discount_rate', '0'))
    }
  }, [detailData])

  useEffect(() => {
    let total = 0
    if (tempListProd.length > 0) {
      tempListProd
        .filter((prod) => prod.product_id !== 'VT-0000')
        .map((prod) => {
          total += prod.total
        })
    }
    setLocalTotal(Number(total.toFixed(2)))
    setLocalTotalWithDiscount(Number((total * (1 - Number(newQuote.discount_rate) * 1.0 / 100)).toFixed(2)))
  }, [tempListProd, newQuote])

  useEffect(() => {
    // console.log(localDiscountRate)
    if (localDiscountRate !== '') {
      inputQuote('discount_rate', Number(localDiscountRate))
    } else {
      inputQuote('discount_rate', 0)
    }
  }, [localDiscountRate])

  const handleSimpleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    inputQuote(name, value);
  }

  const handlePercentInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (value === '') { // Nếu trống thì bỏ
      setLocalDiscountRate('')
      return
    }

    // Remove non-numeric characters except dots
    value = value.replace(/[^\d.]/g, '');

    // Split the value by dot
    const parts = value.split('.');

    // Allow only one dot and concatenate the parts back
    if (parts.length > 1) {
      value = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Convert the value to a number
    const numericValue = parseFloat(value)

    // Ensure the value is within the range of 0 to 100
    const clampedValue = isNaN(numericValue) ? 0 : Math.min(Math.max(numericValue, 0), 100);

    setLocalDiscountRate(clampedValue === 100 || clampedValue === 0 ? clampedValue.toString() : value)
  }

  const handleBlurAndPressEnter = () => {
    // setLocalDiscountRate(String(Number(localDiscountRate)))
  }

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      <TableDataQuoteAddFiles
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className={styles.row_input}></div>
      <div
        className={styles.row_input}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div>
          <label className={`${styles["form-label"]}`}>Tổng thành tiền</label>
          <Input
            style={{ background: "#e9ecef", color: "black", pointerEvents: 'none' }}
            placeholder="0"
            suffix="VNĐ"
            // disabled
            value={localTotal}

          />
        </div>
        <div>
          <label className={`${styles["form-label"]} `}>
            Chiết khấu đơn hàng
          </label>
          {/* <Input
            placeholder="0"
            suffix="%"
            value={localDiscountRate}
            onChange={handlePercentInput}
            name="discount_rate"
            onBlur={handleBlurAndPressEnter}
            onPressEnter={handleBlurAndPressEnter}
          /> */}
          <InputNumber
            style={{
              width: '100%'
            }}
            suffix="%"
            max={100}
            min={0}
            placeholder="0"
            name="discount_rate"
            onChange={(num) => {
              if (num !== null) {
                setLocalDiscountRate(num.toString())
              } else {
                setLocalDiscountRate("")
              }
            }}
            value={localDiscountRate === "" ? null : Number(localDiscountRate)}
          />
        </div>

        <div>
          <label className={`${styles["form-label"]}`}>
            Tổng tiền thanh toán
          </label>
          <Input
            style={{ background: "#e9ecef", color: "black", pointerEvents: 'none' }}
            placeholder="0"
            suffix="VNĐ"
            // disabled
            value={localTotalWithDiscount}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div style={{ width: "100%" }}>
          <label className={`${styles["form-label"]}`}>
            Điều khoản & quy định
          </label>
          <div style={{ width: "100%" }}>
            <textarea
              style={{ width: "100%", height: 60, padding: 10, fontSize: 18 }}
              placeholder="Nhập điều khoản & quy định"
              value={newQuote.terms_and_conditions}
              onChange={handleSimpleInput}
              name="terms_and_conditions"
            />
          </div>
          <label className={`${styles["form-label"]}`}>Ghi chú</label>
          <div style={{ width: "100%" }}>
            <textarea
              style={{ width: "100%", height: 60, padding: 10, fontSize: 18, resize: 'none' }}
              placeholder="Nhập ghi chú"
              value={newQuote.note}
              onChange={handleSimpleInput}
              name="note"
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <div style={{ textAlign: "center" }} className="required">Người lập</div>
          <div style={{ textAlign: "center" }}>(Ký, họ tên)</div>
          <div style={{ paddingTop: 10 }}>
            <Input
              placeholder="Nhập"
              value={newQuote.creator_name}
              onChange={handleSimpleInput}
              name="creator_name"
            ></Input>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "center" }} className="required">Giám đốc</div>
          <div style={{ textAlign: "center" }}>(Ký, họ tên, đóng dấu)</div>
          <div style={{ paddingTop: 10 }}>
            <Input
              placeholder="Nhập"
              value={newQuote.ceo_name}
              onChange={handleSimpleInput}
              name="ceo_name"
            ></Input>
          </div>
        </div>
      </div>
    </div>
  );
}
