import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";

import TableDataSaveList from "../table/table_link_bai_dang_video";
import { Input } from "antd";

export default function SaveLink() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  // const [startTime, setStartTime] = useState(
  //   `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
  // );
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState<any>(0);
  const [condition2, setCondition2] = useState<any>({
    page: current,
    size: 10,
  });

  useEffect(() => {
    setHeaderTitle("Danh sách link bài đăng video");
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
      ...condition2,
      page: current,
    });
  }, [current]);

  const handleDateChangeStart = (e: any) => {
    let time = Math.floor(new Date(e.target.value).getTime() / 1000);
    // let date = new Date(e.target.value);
    // setStartTime(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
    setCondition2({
      ...condition2,
      start: time,
    });
  };
  const handleDateChangeEnd = (e: any) => {
    let time = Math.floor(new Date(e.target.value).getTime() / 1000);
    setCondition2({
      ...condition2,
      end: time,
    });
  };
  return (
    <div ref={mainRef} className={styleHome.main}>
      <div style={{ margin: "15px" }}>Từ</div>
      <div>
        <Input onChange={handleDateChangeStart} type="date"></Input>
      </div>
      <div style={{ margin: "15px" }}>Đến</div>
      <div>
        <Input onChange={handleDateChangeEnd} type="date"></Input>
      </div>
      <div
        style={{
          margin: "15px",
          marginLeft: "0px",
          fontSize: "1.5em",
          fontWeight: "bold",
        }}
      >
        Tổng: {total}
      </div>
      <TableDataSaveList
        condition={condition2}
        current={current}
        setCurrent={setCurrent}
        total={total}
        setTotal={setTotal}
      />
    </div>
  );
}
