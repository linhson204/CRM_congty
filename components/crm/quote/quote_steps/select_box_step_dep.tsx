import { useContext, useEffect, useRef, useState } from "react";
import styles from "@/components/crm/quote/quote.module.css";
import OrderDropDownDataStep from "./select_box_dropdown_data";
import useLoading from "../../hooks/useLoading";
import { Spin } from "antd";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { axiosQLC, axiosQLCv2 } from "@/utils/api/api_qlc";
import { axiosQLCSite } from "@/utils/api/api_qlc_site";
import { QuoteContext } from "../quoteContext";
import DepDropDownDataStep from "./select_box_dropdown_data_dep";
export default function DepSelectBoxStep({
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
  const [shouldGetDep, setShouldGetDep] = useState(false)
  const [listDep, setListDep] = useState([])
  const [depId, setDepId] = useState(0)
  const [depLabel, setDepLabel] = useState('')

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
    setShouldGetDep(true)
  }, [])

  useEffect(() => {
    isOpen && setShouldGetDep(true)
  }, [isOpen])

  useEffect(() => {
    if (shouldGetDep) {
      startLoading()
      let com_id = 0
      axiosCRMCall
        .post('/quote/getDetail', { id: Number(recordId) || 0 })
        .then((res) => {
          // console.log(getPropOrDefault(res, 'data.data.data.com_id', ''))
          com_id = getPropOrDefault(res, 'data.data.data.com_id', '')
          axiosQLC
            .post('/organizeDetail/listAll', { com_id: com_id })
            .then(res => {
              // console.log(getPropOrDefault(res, 'data.data.data', []))
              const list = getPropOrDefault(res, 'data.data.data', [])
              setListDep(list.map((item) => ({
                key: item.id,
                label: item?.organizeDetailName,
                value: item?.id,
              })))
              stopLoading()
            })
            .catch(e => { console.log(e); stopLoading(); })
        })
        .catch((err) => { console.log(err); stopLoading(); })
      // axiosQLC
      //   .post('/organizeDetail/listAll')
      //   .then(res => {
      //     console.log(getPropOrDefault(res, 'data.data.data', ''))
      //     stopLoading()
      //   })
      //   .catch(e => { console.log(e); stopLoading(); })
    }
  }, [shouldGetDep])

  useEffect(() => {
    if (depId !== 0) {
      setValue(depId)
      setDepLabel(listDep.find(item => item.value === depId).label)
    }
  }, [depId])

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
              {depId === 0 && depLabel === '' ? value : depLabel}
            </span>
            <span
              className={styles.select2_selection__arrow}
              role="presentation"
            >
              <b role="presentation" />
            </span>
          </span>
        </span>
        {isOpen && <DepDropDownDataStep data={listDep} value={value} setValue={setDepId} />}
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
