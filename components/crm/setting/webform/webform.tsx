import TableDataWebform from "../../table/table-webform";
import WebformInputGroup from "./webform_input_group";
import styleHome from "../../home/home.module.css";
import { SidebarContext } from "../../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../../hooks/useHeader";

export default function Contract() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Cài đặt/ Webform");
    setShowBackButton(true);
    setCurrentPath("/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <div ref={mainRef} className={styleHome.main}>
      <WebformInputGroup />
      <TableDataWebform
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
