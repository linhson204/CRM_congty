import TableDataPotentialMerge from "@/components/crm/table/table-potential-merge";
import styleHome from "@/components/crm/home/home.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useContext, useEffect, useRef } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";

export default function Merge(data) {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Tiềm năng / Gộp trùng");
    setShowBackButton(true);
    setCurrentPath("/potential/list");
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
      <TableDataPotentialMerge data={data} length={length} />
    </div>
  );
}
