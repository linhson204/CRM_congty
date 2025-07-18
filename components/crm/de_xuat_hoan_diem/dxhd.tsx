import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../context/resizeContext";
import styleHome from "../home/home.module.css";
import { useHeader } from "../hooks/useHeader";
import DxhdInputGroup from "./list/dxhd_input_group";
import TableDxhd from "../table/table-dxhd";

export default function Dxhd() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const [isSelectedRow, setIsSelectedRow] = useState(false);
    const [isNumberSelected, setNumberSelected] = useState(0);
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();

    useEffect(() => {
        setHeaderTitle("Đề xuất hoàn điểm");
        setShowBackButton(false);
        setCurrentPath("/de-xuat-hoan-diem/list");
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
            <DxhdInputGroup />
            <TableDxhd />
        </div>
    )
}