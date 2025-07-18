import TableDataSupplier from "../table/table-supplier-group";
import SupplierInputGroup from "./supplier_input_group";
import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";
import SuppliInputSipplierGroup from "./group_add_supplier";

export default function Supplier() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Danh sách nhóm nhà cung cấp");
    setShowBackButton(false);
    setCurrentPath("/supplier/group");
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
      <SuppliInputSipplierGroup />
      <TableDataSupplier setSelected={setIsSelectedRow} />
    </div>
  );
}
