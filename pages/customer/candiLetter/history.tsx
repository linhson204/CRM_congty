import React, { useRef } from "react";

import styleHome from "@/components/crm/home/home.module.css";

import { decodeToken } from "@/utils/function";
import TableHisAddPointComp from "@/components/crm/customer/point/table_his_add_point_comp";
import TableHisUsePointEmp from "@/components/crm/customer/point/table_his_use_point_emp";

export default function PointHistory() {
  const mainRef = useRef();

  const { userType } = decodeToken();

  return (
    <div ref={mainRef} className={styleHome.main}>
      {userType == 1 ? <TableHisAddPointComp /> : <TableHisUsePointEmp />}
    </div>
  );
}
