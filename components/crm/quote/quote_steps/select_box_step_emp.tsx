import { useContext, useEffect, useRef, useState } from "react";
import styles from "@/components/crm/quote/quote.module.css";
import OrderDropDownDataStep from "./select_box_dropdown_data";
import { QuoteContext } from "../quoteContext";
import useLoading from "../../hooks/useLoading";
import { Spin } from "antd";
import { axiosQLC } from "@/utils/api/api_qlc";
import EmpDropDownDataStep from "./select_box_dropdown_data_emp";
export default function EmpSelectBoxStep({
  title = "",
  value = "Chọn",
  placeholder = "",
  data = [],
  setValue
}: any) {
  const { getPropOrDefault, recordId } = useContext(QuoteContext)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [shouldGetEmp, setShouldGetEmp] = useState(false)
  const [listEmp, setListEmp] = useState([])
  const [empId, setEmpId] = useState(0)
  const [choosenEmp, setChoosenEmp] = useState('')

  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };

  const handleScrollkOutside = (e: any) => {
    // setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);

  useEffect(() => {
    setShouldGetEmp(true)
  }, [])

  useEffect(() => {
    isOpen && setShouldGetEmp(true)
  }, [isOpen])

  useEffect(() => {
    if (shouldGetEmp) {
      startLoading()
      axiosQLC
      .post('/managerUser/listAll')
      .then(res => {
        // console.log(getPropOrDefault(res, 'data.data.items', []))
        const list = getPropOrDefault(res, 'data.data.items', [])
        setListEmp(list.map((item) => ({
          key: item.ep_id,
          label: item?.ep_name,
          value: item?.ep_id,
        })))
        stopLoading()
      })
      .catch(e => {console.log(e); stopLoading();})
    }
  }, [shouldGetEmp])

  useEffect(() => {
    if (empId !== 0) {
      setValue(empId)
      const emp = listEmp.find(item => item.value === empId)
      setChoosenEmp(`(${emp.value}) ${emp.label}`)
    }
  }, [empId])

  return (
    <div
      ref={dropdownRef}
      className={`${styles.select_item_box_step} flex_align_center_item`}
    >
      <label htmlFor="" className="">
        {title}
      </label>
      <select
        className={`${styles.select2} ${styles.select2_hidden_accessible}`}
        data-select2-id={1}
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="" data-select2-id={3}>
          {value}
        </option>
      </select>
      <span
        className={`select2 ${styles.select2_container_step}`}
        dir="ltr"
        data-select2-id={2}
        style={{ width: "100%" }}
        onClick={handleClickSelectoption}
      >
        <span className={`${styles.selection}`}>
          <span
            className={`${styles.select2_selection} select2_selection_single`}
            role="combobox"
            aria-haspopup="true"
            aria-expanded="false"
            tabIndex={0}
            aria-labelledby="select2-g0q1-container"
          >
            <span
              className={styles.select2_selection__rendered}
              id="select2-g0q1-container"
              role="textbox"
              aria-readonly="true"
              // title="Chọn người dùng"
            >
              {empId === 0 && choosenEmp === '' ? value : choosenEmp}
            </span>
            <span
              className={styles.select2_selection__arrow}
              role="presentation"
            >
              <b role="presentation" />
            </span>
          </span>
        </span>
        {isOpen && <EmpDropDownDataStep data={listEmp} value={value} setValue={setEmpId}/>}
      </span>
      {isLoading && isOpen ? (
        <Spin
          style={{
            margin: "auto",
            // width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      ) : null}
    </div>
  );
}
