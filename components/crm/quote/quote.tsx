import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../context/resizeContext";
import styleHome from "../home/home.module.css";
import { useHeader } from "../hooks/useHeader";
import TableDataQuote from "../table/table-quote";
import { QuoteProvider } from "./quoteContext";
import QuoteInputGroups from "./quote_input_group";

export default function Quote() {
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
    setHeaderTitle("Báo giá");
    setShowBackButton(false);
    setCurrentPath("/quote/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  // const [dateQuote, setDateQuote] = useState<null | Date>(null)
  // const [dateQuoteEnd, setDateQuoteEnd] = useState<null | Date>(null)
  // const [status, setStatus] = useState<Number>(0)
  // const [quoteCode, setQuoteCode] = useState('')

  return (
    <div ref={mainRef} className={styleHome.main}>
      <QuoteProvider>
        <QuoteInputGroups isSelectedRow={isSelectedRow} />
        <TableDataQuote
          setSelected={setIsSelectedRow}
          setNumberSelected={setNumberSelected}
        />
      </QuoteProvider>
    </div>
  );
}
