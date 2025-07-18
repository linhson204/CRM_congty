import React, { useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { MInputText } from "@/components/commodity/input";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  convertStringToTimestamp,
  convertTimeToDate,
  decodeToken,
} from "@/utils/function";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { useRouter } from "next/router";
import TablePointCompany from "@/components/crm/customer/point/table_point_company";
import TablePointEmp from "@/components/crm/customer/point/table_point_emp";
type TypePointTable = {
  _id: string;
  emp_id: number;
  type: string;
  point: number;
  created_at: number;
  userName: string;
};
export default function pointTable() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const { com_id, userType } = decodeToken();

  return (
    <div ref={mainRef} className={styleHome.main}>
      {/* <TablePointCompany /> */}
      {userType === 1 ? <TablePointCompany /> : <TablePointEmp />}
    </div>
  );
}
