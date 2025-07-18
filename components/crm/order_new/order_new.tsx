import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../context/resizeContext";
import styleHome from "../home/home.module.css";
import { useHeader } from "../hooks/useHeader";
import TableDataOrderNew from "../table/table-order-new";
import OrderNewInputGroup from "./order_new_input_group";


export default function OrderNew() {
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
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const { start, end, search, site } = router.query as { start: string, end: string, search: string, site: string };

  const [fillStart, setFillStart] = useState<any>(() => {
    if (!start) return undefined
    return start.split(' ')[0]
  });
  const [fillEnd, setFillEnd] = useState<any>(() => {
    if (!end) return undefined
    return end.split(' ')[0]
  });

  const [searchText, setSearchText] = useState<any>(() => { });

  const [siteText, setSiteText] = useState<any>(() => { });

  const [condition, setCondition] = useState(() => {
    const query = {};
    if (start) {
      query['start'] = Number(start);
    }
    if (end) {
      query['end'] = Number(end);
    }
    if (search) {
      query['search'] = search;
    }
    if (site) {
      query['site'] = site;
    }

    query['page'] = current;
    query['size'] = 10;
    return JSON.stringify(query)
  })

  const handleSearch = () => {
  };

  useEffect(() => {
    setHeaderTitle("Quản lý đơn hàng từ tìm việc");
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
    const query = {};
    if (start) {
      query['start'] = Number(start);
    }
    if (end) {
      query['end'] = Number(end);
    }
    if (search) {
      query['search'] = search;
    }
    if (site) {
      query['site'] = site;
    }

    query['page'] = current;
    query['size'] = 10;
    setCondition(JSON.stringify(query));
  }, [current, start, end]);

  return (
    <div ref={mainRef} className={styleHome.main}>
      <OrderNewInputGroup isSelectedRow={isSelectedRow}
        condition={condition}
        setCondition={setCondition}
        onSearch={handleSearch}
        fillStart={fillStart}
        setFillStart={setFillStart}
        fillEnd={fillEnd}
        setFillEnd={setFillEnd}
        searchText={searchText}
        setSearchText={setSearchText}
        siteText={siteText}
        setSiteText={setSiteText}
      />
      <TableDataOrderNew
        setSelected={setIsSelectedRow}
        setNumberSelected={setNumberSelected}
        condition={condition}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
}
