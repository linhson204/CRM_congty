import TableDataPotential from "../table/table-potential";
import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";
import PotentialInputGroups from "./potential_input_group";

export default function Potential() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isSelectedRow, setSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const [isRowDataSelected, setRowDataSelected] = useState("");
  const [formSearch, setFormSearch] = useState<any>({ recall: true });

  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Tiềm năng");
    setShowBackButton(false);
    setCurrentPath("/potential");
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
      <PotentialInputGroups
        isSelectedRow={isSelectedRow}
        isNumberSelected={isNumberSelected}
        isRowDataSelected={isRowDataSelected}
        setSelected={setSelectedRow}
        setNumberSelected={setNumberSelected}
        formData={formSearch}
        setFormData={setFormSearch}
      />
      <TableDataPotential
        setSelected={setSelectedRow}
        setRowDataSelected={setRowDataSelected}
        setNumberSelected={setNumberSelected}
        formData={formSearch}
        setFormData={setFormSearch}
      />
    </div>
  );
}
