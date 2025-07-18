import axios  from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;
const base_QLC_URL: any = process.env.NEXT_PUBLIC_BASE_URL;
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
export const fetch_supervisor_approver = async (token:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/showadd`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching supervisor and approver data:", err);
        
    }
}
export const fetch_shift = async (token:any) => {
    try{
        const response = await axios.get(`${base_QLC_URL}api/qlc/shift/list`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching shift data:", err);
        
    }
}
export const fetch_department = async (token:any) => {
    try{
        const user_infor = jwtDecode<any>(token)
        const response = await axios.post(`${base_QLC_URL}api/qlc/department/list`,
        {
            com_id: user_infor.data.com_id
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching department data:", err);
        
    }
}
export const fetch_employee = async (token:any) => {
    try{
        
        const response = await axios.post(`${base_QLC_URL}api/qlc/managerUser/listAll`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching employee data:", err);
        
    }
}
export const fetch_position = (name?:any)=>{
    return ([
        {name:name,value:'',label:'Tất cả'},
        {name:name,value:'1',label:'SINH VIÊN THỰC TẬP'},
        {name:name,value:'9',label:'NHÂN VIÊN PART TIME'},
        {name:name,value:'2',label:'NHÂN VIÊN THỬ VIỆC'},
        {name:name,value:'3',label:'NHÂN VIÊN CHÍNH THỨC'},
        {name:name,value:'20',label:'NHÓM PHÓ'},
        {name:name,value:'4',label:'TRƯỞNG NHÓM'},
        {name:name,value:'12',label:'PHÓ TỔ TRƯỞNG'},
        {name:name,value:'13',label:'TỔ TRƯỞNG'},
        {name:name,value:'10',label:'PHÓ BAN DỰ ÁN'},
        {name:name,value:'11',label:'TRƯỞNG BAN DỰ ÁN'},
        {name:name,value:'5',label:'PHÓ TRƯỞNG PHÒNG'},
        {name:name,value:'6',label:'TRƯỞNG PHÒNG'},
        {name:name,value:'7',label:'PHÓ GIÁM ĐỐC'},
        {name:name,value:'8',label:'GIÁM ĐỐC'},
        {name:name,value:'14',label:'PHÓ TỔNG GIÁM ĐỐC'},
        {name:name,value:'16',label:'TỔNG GIÁM ĐỐC'},
        {name:name,value:'22',label:'PHÓ TỔNG GIÁM ĐỐC TẬP ĐOÀN'},
        {name:name,value:'21',label:'TỔNG GIÁM ĐỐC TẬP ĐOÀN'},
        {name:name,value:'17',label:'THÀNH VIÊN HỘI ĐỒNG QUẢN TRỊ'},
        {name:name,value:'18',label:'PHÓ CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ'},
        {name:name,value:'19',label:'CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ'},
    ])
}
export const fetch_toiguidi = async (data?:any)=>{
    try{
        
        const response = await axios.post(`${baseURL}api/vanthu/DeXuat/user_send_deXuat_All`,    
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching toiguidi data:", err);
        
    }
}
export const fetch_guidentoi = async (data?:any)=>{
    try{
        
        const response = await axios.post(`${baseURL}api/vanthu/DeXuat/deXuat_send_user`,    
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching guidentoi data:", err);
        
    }
}
export const fetch_follow = async (data?:any)=>{
    try{
        
        const response = await axios.post(`${baseURL}api/vanthu/DeXuat/deXuat_follow`,    
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching deXuat follow data:", err);
        
    }
}
export const fetch_dxtype = async ()=>{
    try{
        
        const response = await axios.post(`${baseURL}api/vanthu/catedx/showlistcate`,    
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching dx type data:", err);
        
    }
}
export const fetch_deleted_propose = async (data?:any) => {
    try{
        
        const response = await axios.post(`${baseURL}api/vanthu/deletedx/ds_de_xuat_da_xoa`,    
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching deleted propose data:", err);
        
    }
}