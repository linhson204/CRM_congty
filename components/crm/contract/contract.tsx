import TableDataContract from "../table/table-contract";
import ContractInputGroup from "./contract_input_group";
import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";

export default function Contract() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [valSearch, setValSearch] = useState("");
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Danh sách hợp đồng");
    setShowBackButton(false);
    setCurrentPath("/contract/list");
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
      <ContractInputGroup setValSearch={setValSearch} />
      <TableDataContract valSearch={valSearch} />
    </div>
  );
}
