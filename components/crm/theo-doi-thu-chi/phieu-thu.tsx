import { SidebarContext } from "@/components/crm/context/resizeContext";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { dataPotential } from "../delete_data/colums_field/data";
import Table_Phieu_Thu_Chi from "../table/table-phieu-thu";

export default function HomePhieuThu() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Phiếu thu");
    setShowBackButton(false);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return <Table_Phieu_Thu_Chi dataPotential={dataPotential} name="Phiếu thu" />;
}
