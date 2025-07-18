import style from "./home.module.css";
import HightChart from "../chart/hight_chart";
import { useCallback, useState } from "react";

export default function HomeOverView() {
  const [valueOptions, setValueOptions] = useState("week")

  const handleChooseValueOptions = useCallback((e: any) => {
    setValueOptions(e.target.value)
  }, [])

  return (
    <div className={style.overview}>
      <div className={style.overview_heading}>
        <h2 className={style.h2}>Báo cáo doanh thu theo tuần</h2>
        <div className={style.select_chart}>
          <select className={style.overview__select} onChange={handleChooseValueOptions}>
            <option value="week">Theo tuần</option>
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </select>
        </div>
      </div>
      <HightChart valueOptions={valueOptions} />
    </div>
  );
}
