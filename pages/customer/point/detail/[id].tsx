import React, { useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import DetailPoint from "@/components/crm/customer/point/detail";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { useRouter } from "next/router";

export default function DetailPointPropose() {
  const currentUrl = window.location.href;
  const id = currentUrl.split("/")[currentUrl.split("/").length -1 ];
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // const { id } = router.query; // chỉ áp dụng khi đi từ app gốc, load lại là mấy 
  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axiosCRMv2("customer/ChiTietDeXuat", {
        IdDeXuat: id,
      });
      setResponse(response);
    };
    fetchApi();
  }, []);
  return (
    <div ref={mainRef} className={styleHome.main}>
      <DetailPoint response={response}></DetailPoint>
    </div>
  );
}
