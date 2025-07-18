import React, { useEffect, useState } from "react";
import SimpleQuoteReport from "./simple_quote_report_form";
import SimpleQuoteReport2 from "./simple_quote_report_form2";

const QuoteReportPicker = ({ template = 1 }) => {
    const [childComponent, setChildComponent] = useState(<SimpleQuoteReport />)

    useEffect(() => {
        switch (template) {
            case 1:
                setChildComponent(<SimpleQuoteReport />)
                break;

            case 2:
                setChildComponent(<SimpleQuoteReport2 />)
                break;

            default:
                setChildComponent(<SimpleQuoteReport />)
                break;
        }
    }, [template])

    return (
        <>
            {childComponent}
        </>
    )
}

export default QuoteReportPicker