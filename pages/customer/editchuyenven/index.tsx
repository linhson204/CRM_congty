import React, { useRef, useContext, useEffect, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import { Button} from 'antd';
import axios from 'axios'
import { decodeToken } from "@/utils/function";

export default function CadidateList() {
   let objectStartUp = {
    adm_mobile:"",
    adm_phone:"",
    adm_password:"",
    adm_email:"",
    adm_loginname:""
    }
  const mainRef = useRef<HTMLDivElement>(null);
  const { com_id, idQLC } = decodeToken();
  const [showCreate, setShowCreate] = useState(true);
  const [object, setObject] = useState(objectStartUp);
  
  useEffect(() => {
        axios({
            method: "post",
            url: "https://api.timviec365.vn/api/timviec/admin/account/checkAccount",
            data: {
                emp_id:idQLC
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response)=>{
             if(response && response.data && response.data.data && response.data.data.admin){
                setShowCreate(false);
                setObject(response.data.data.admin);
             }
        })
        .catch(err => { console.log(err) });
    }, []);


    const handleChangeEdit = async (e:any,field:any)=>{
        try{
           let value = e.target.value;
           let tempt = object;
           tempt[field] = value;
           
           setObject({...object,[field]:value});
           return true;
        }
        catch(e){
          console.log("handleChangeEdit",e);
          return false
        }
      }
  
    const UpdateValue = async ()=>{
      try{
        axios({
            method: "post",
            url: "https://api.timviec365.vn/api/timviec/admin/account/updateFromCrm",
            data: {
                ...object,emp_id:idQLC
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response)=>{
            if(response && response.data && response.data.data && response.data.data.message && (response.data.data.message == "Cập nhật thành công")){
               alert("Cập nhật thành công")
            }
        })
        .catch(err => { console.log(err) });
      }
      catch(e){
          console.log("UpdateValue",e);
          return false;
      }
    };

    const CreateAccount = async ()=>{
      try{
        axios({
            method: "post",
            url: "https://api.timviec365.vn/api/timviec/admin/account/create",
            data: {
              IdCrm_e:idQLC
            },
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response)=>{
            if(response && response.data && response.data.data && response.data.data.newsaved){
                setShowCreate(false);
                setObject(response.data.data.newsaved);
            }
        })
        .catch(err => { console.log(err) });
        }
        catch(e){
            console.log("CreateAccount",e);
            return false;
        }
    }
  return (
    <div ref={mainRef} className={styleHome.main}>
      
       {
          showCreate && (
            <Button onClick={CreateAccount}>
                <div>
                    Tạo tài khoản
                </div>
            </Button>
          )
       }
          {
            !showCreate && (
             <>  
                 <input style={{margin:"15px",height:"30px",padding:"10px",borderRadius:"5px"}} type="text" placeholder="Số zalo" value={object ? object?.adm_loginname : ""}/>
                 <input onChange = {(e)=>handleChangeEdit(e,"adm_mobile")} style={{margin:"15px",height:"30px",padding:"10px",borderRadius:"5px"}} type="text" placeholder="Số zalo" value={object ? object?.adm_mobile : ""}/>
                 <input onChange = {(e)=>handleChangeEdit(e,"adm_phone")} style={{margin:"15px",height:"30px",padding:"10px",borderRadius:"5px"}} type="text" placeholder="Số điện thoại" value={object ? object?.adm_phone : ""}/>
                 <input onChange = {(e)=>handleChangeEdit(e,"adm_email")} style={{margin:"15px",height:"30px",padding:"10px",borderRadius:"5px"}} type="text" placeholder="Số mail" value={object ? object?.adm_email : ""}/>
                 <input onChange = {(e)=>handleChangeEdit(e,"adm_password")} style={{margin:"15px",height:"30px",padding:"10px",borderRadius:"5px",width:"500px"}} type="text" placeholder="Nhập pass mới (nếu không nhập, mật khẩu sẽ giữ nguyên)"/>
                 <Button>
                    <div  onClick={UpdateValue}>
                        Cập nhật
                    </div>
                </Button>
             </>
          )
       }

    </div>
  );
}