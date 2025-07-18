import style from "../home/home.module.css"
import HightChartThuChi from "../chart/hight_chart_thuchi";
import { useCallback, useState } from "react";

export default function HomeOverView() {
  const [valueOptions, setValueOptions] = useState("week")

  const handleChooseValueOptions = useCallback((e: any) => {
    setValueOptions(e.target.value)
  }, [])

  return (
    <div className={style.overview2}>
      <div className={style.overview_heading2}>
        <div style={{float:"left"}}>
          <p>Biểu đồ doanh thu</p>
        </div>
        <div className={style.select_chart} style={{float:"right"}}>
          <select className={style.overview__select} onChange={handleChooseValueOptions}>
            <option value="week">Theo tuần</option>
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </select>
        </div>
      </div>
      <div >
        <HightChartThuChi valueOptions={valueOptions} />

      </div>
    </div>
  );
}