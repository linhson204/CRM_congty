import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ButtonControlForm from "../quote_detail/quote_button_form_quote";
import SimpleQuoteReport from '@/components/crm/quote/quote_report_form/simple_quote_report_form'
import QuoteReportPicker from "../quote_report_form/quote_report_picker";
import { QuoteContext } from "../quoteContext";

type Props = {};

// 07-12-2023: Hệ thống chưa có giao diện nào của mẫu báo giá được cắt,
// Giải pháp tình thế: Tạo 1 mẫu cơ bản, chỉ đủ để cung cấp thông tin
// TODO Cắt các giao diện báo giá theo mẫu cơ bản (để đổ dữ liệu)

// TODO Nếu site chậm, cân nhắc việc đổi sang lấy link tải từ backend

const Form_quote_detail = (props: Props) => {
  const router = useRouter();

  const path = router.query.id;

  const { detailData } = useContext(QuoteContext)
  const [template, setTemplate] = useState(0)

  useEffect(() => {
    detailData && 
    detailData.hasOwnProperty('print_template_id') && 
    detailData.print_template_id &&
    Number(detailData.print_template_id) &&
    setTemplate(Number(detailData.print_template_id))
  }, [detailData])

  return (
    <div>
      <ButtonControlForm />
      {/* <img
        width={"100%"}
        style={{
          padding: "0 100px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
        src={`/crm/mau_bg${path == "ĐH-0000" ? 1 : path}.svg`}
        alt="hungha365.com"
      /> */}
      <div style={{ maxWidth: 'fit-content', margin: '0px auto' }}>
        {/* <SimpleQuoteReport /> */}
        <QuoteReportPicker template={template}/>
      </div>
    </div>
  );
};
export default Form_quote_detail;
