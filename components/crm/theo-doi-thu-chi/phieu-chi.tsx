import { SidebarContext } from "@/components/crm/context/resizeContext";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
// import { ColumPhieuChi } from "./datachi";
import { dataPotential } from "../delete_data/colums_field/data";
import Table_Phieu_Chi from "../table/table-phieu-chi";

export default function HomePhieuChi() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Phiếu chi");
    setShowBackButton(false);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <Table_Phieu_Chi
      // ColumPhieuThu={ColumPhieuChi}
      dataPotential={dataPotential}
      name="Phiếu Chi "
    />
  );
}
