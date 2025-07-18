import axios  from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
export const fetch_propose_list = async (filter_data?:any,) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/DeXuat/admin_danh_sach_de_xuat`,
        filter_data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching propose list data:", err);
        
    }
}
export const fetch_propose_member_list = async (filter_data?:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/catedx/thanhvien`,
        filter_data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching propose member list data:", err);
        
    }
}
export const fetch_propose_type = async (page?:any,filter?:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/catedx/searchcate`,
        {
            page:page,
            name_cate_dx: filter
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching propose type data:", err);
        
    }
}
export const fetch_detail_propose = async (id:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/catedx/showCTDX`,
        {_id : id},
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching detail propose data:", err);
        
    }
}
export const fetch_absentAccount_list = async (filter_data?:any,) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/catedx/showNghi`,
        filter_data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching absent account list data:", err);
        
    }
}
export const fetch_setting = async () => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/setting/createF`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error fetching setting data:", err);
        
    }
}