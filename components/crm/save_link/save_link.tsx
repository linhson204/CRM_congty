import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";

import TableDataSaveList from "../table/table-save-list";
import {  Input } from "antd";

export default function SaveLink() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const [startTime, setStartTime] = useState(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
  const {
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  const [current, setCurrent] = useState(1);
  const [total,setTotal] = useState<any>(0);
  const [condition2, setCondition2] = useState<any>({
    page:current,
    size:10
  })


  useEffect(() => {
    setHeaderTitle("Danh sách tin bình luận AI");
    setShowBackButton(false);
    setCurrentPath("/order-new/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    setCondition2({
      ...condition2,page:current
    })
  }, [current]);

  const handleDateChangeStart = (e: any) => {
    let time = Math.floor(new Date(e.target.value).getTime()/1000);
    let date = new Date(e.target.value);
    setStartTime(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    setCondition2({
      ...condition2,start:time
    })
  };
  const handleDateChangeEnd = (e: any) => {
    let time = Math.floor(new Date(e.target.value).getTime()/1000);
    setCondition2({
      ...condition2,end:time
    })
  };
  return (
    <div ref={mainRef} className={styleHome.main}>
    <div style={{margin:"15px"}}>Từ</div>
    <div>
       {/* <input type="date" name="begin"
        // placeholder="dd-mm-yyyy"
        onChange={handleDateChangeStart} 
        value = {startTime}
        // min="1997-01-01" max="2030-12-31"
        />   */}
        <Input 
             onChange={handleDateChangeStart} 
            //  type="datetime-local" 
            type="date"
            //  defaultValue={'2024-5-3'}
        ></Input>
    </div>
    <div style={{margin:"15px"}}>Đến</div>
    <div>
        <Input 
        onChange={handleDateChangeEnd} 
        // type="datetime-local"
        type="date" 
        // defaultValue={fillEnd}
        ></Input>
    </div>
    <div style={{margin:"15px"}}>
      Tổng: {total}
    </div>
      <TableDataSaveList
        setSelected={setIsSelectedRow}
        setNumberSelected={setNumberSelected}
        condition={condition2}
        current={current}
        setCurrent={setCurrent}
        total ={total}
        setTotal = {setTotal}
      />
    </div>
  );
}
