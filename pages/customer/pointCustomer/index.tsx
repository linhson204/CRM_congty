import React, { useRef, useContext, useEffect, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import { Button} from 'antd';
import axios from 'axios'
import Cookies from "js-cookie";
import * as XLSX from 'xlsx'

export default function CadidateList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [site,setSite] = useState("");
  const  accessToken = Cookies.get("token_base365");
 

  const downloadExcel = (data:any, nameFile:any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, nameFile);
  };

  const handleExport = async ()=>{
    try{
       if(site == "timviec365.vn"){
            let response = await axios({
                method: "post",
                url: "https://api.timviec365.vn/api/timviec/company/ExportUserHavePoint",
                data: {},
                headers: { 
                    "Content-Type": "multipart/form-data" ,
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if(response && response.data && response.data.data && response.data.data.listUser){
               downloadExcel(response.data.data.listUser,"Danh sách công ty.xlsx")
            }
            else{
                alert("Lấy dữ liệu thất bại")
            }
       }
    }
    catch(e){
        console.log("Error when send",e);
        return false;
    }
  }
 
  return (
    <div ref={mainRef} className={styleHome.main}>
        <select style={{padding:"5px",height:"60px",margin:"10px",borderRadius:"3px"}} onChange={(e:any)=> {setSite(e.target.value)}} name="site" id="site">
            <option value=""></option>
            <option value="timviec365.vn">timviec365.vn</option>
            <option value="work247.vn">work247.vn</option>
            <option value="vieclam88.vn">vieclam88.vn</option>
        </select>
        <Button>
           <div onClick={handleExport}>
               Xuất dữ liệu
           </div>
       </Button>
    </div>
  );
}