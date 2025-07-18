import axios  from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;
export const show_hide_propose = async (token:any,value:any,id:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/catedx/chageCate`,
        {
            value: value,
            id: id,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }catch(err){
        console.error("Error show or hide propose:", err);
    }
}
export const edit_setting = async (data?:any,) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/setting/editSetting`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error posting edit setting:", err);
        
    }
}