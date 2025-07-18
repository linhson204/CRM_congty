import React, { useRef, useContext, useEffect, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import { Button} from 'antd';
import axios from 'axios'


export default function CadidateList() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  const [idUngVien, setIdUngVien] = useState("");
  const [idNew, setIdNew] = useState("");
 
  const onChangeIdUngVien = async (e:any)=>{
    try{
       let value = e.target.value;
       setIdUngVien(value)
    }
    catch(e){
        console.log("onChangeIdUngVien",e);
        return false;
    }
  }

  const onChangeIdNew = async (e:any)=>{
    try{
       let value = e.target.value;
       setIdNew(value)
    }
    catch(e){
        console.log("onChangeIdNew",e);
        return false;
    }
  }

  const send = async ()=>{
    try{
        await axios({
            method: "post",
            url: "https://api.timviec365.vn/api/timviec/admin/uv/sendUv_NTD",
            data: {
              id_user:idUngVien,
              type:0,
              idNew:idNew
            },
            headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Gửi thành công");
        setIdUngVien("");
        setIdNew("");
    }
    catch(e){
        console.log("Error when send",e);
        return false;
    }
  }
 
  return (
    <div ref={mainRef} className={styleHome.main}>
       <input onChange = {(e)=>onChangeIdUngVien(e)} style={{margin:"15px",height:"30px",padding:"10px",borderRadius:"5px"}} type="text" placeholder="Nhập id ứng viên" value={idUngVien}/>
       <input onChange = {(e)=>onChangeIdNew(e)} style={{margin:"15px",height:"30px",padding:"10px",borderRadius:"5px"}} type="text" placeholder="Nhập id tin" value={idNew}/>
       <Button>
           <div onClick={send}>
               Gửi
           </div>
       </Button>
    </div>
  );
}