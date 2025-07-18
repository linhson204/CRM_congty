import axios  from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

export const post_absent_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Xin_Nghi`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to absent propose:", err);
        
    }
}
export const post_switch_shift_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Xin_Doi_Ca`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to switch shift propose:", err);
        
    }
}
export const post_abvance_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Xin_Tam_Ung`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to advance propose:", err);
        
    }
}
export const post_asset_allocation_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Cap_Phat_Tai_San`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to asset allocation propose:", err);
        
    }
}
export const post_quit_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Xin_thoi_Viec`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to quit propose:", err);
        
    }
}
export const post_raise_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Xin_Tang_Luong`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to raise propose:", err);
        
    }
}
export const post_assign_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Xin_Bo_Nhiem`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to assign propose:", err);
        
    }
}
export const post_working_rotation_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Luan_Chuyen_Cong_Tac`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
              },
        })
        return response?.data;
    }
    catch(err: any){
        console.error("Error post to working rotation propose:", err.response.data);
        
    }
}
export const post_join_project_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Tham_Gia_Du_An`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to join project propose:", err);
        
    }
}
export const post_overtime_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXTC`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to overtime propose:", err);
        
    }
} 
export const post_pregnant_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDxTs`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to pregnant propose:", err);
        
    }
} 
export const post_meeting_room_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDxPh`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to meeting room propose:", err);
        
    }
} 
export const post_transportation_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXXe`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to transportation propose:", err);
        
    }
} 
export const post_facility_fixing_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXVC`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to facility fixing propose:", err);
        
    }
} 
export const post_payment_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXTT`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to payment propose:", err);
        
    }
} 
export const post_complaint_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXKN`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to complaint propose:", err);
        
    }
} 
export const post_plus_effort_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXC`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to plus effort propose:", err);
        
    }
} 
export const post_bonus_payoff_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXTP`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to bonus payoff propose:", err);
        
    }
} 
export const post_percentage_propose = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/addDXHH`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to percentage propose:", err);
    }
} 
export const post_vanbandi_in = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/guiNhanCongVan/vanBanDi/createVanBanIn`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to vanbandi trong cong ty:", err);
    }
}
export const post_vanbandi_out = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/guiNhanCongVan/vanBanDi/createVanBanOut`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to vanbandi ngoai cong ty:", err);
    }
}
export const POST_VT = async (body: any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/dexuat/De_Xuat_Lich_Lam_Viec`,
        body,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data?.data;
    }
    catch(err){
        console.error("Error post to llv:", err);
    }
}
export const post_findUserByEmail = async (type:any,email:any) => {
    let formData = new FormData();
    formData.append('type',type);
    formData.append('email',email);
    try{
        const response = await axios.post(`${baseURL}api/vanthu/guiNhanCongVan/vanBanDi/getUserByEmail`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to find User By Email:", err);
        alert('Email chưa tồn tại trên hệ thống')
    }
}
export const post_duyetdx  = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/editdx/edit_active`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to duyet dx:", err);
    }
}
export const post_deletedx  = async (data:any) => {
    try{
        const response = await axios.post(`${baseURL}api/vanthu/deletedx/delete_dx`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        return response?.data;
    }
    catch(err){
        console.error("Error post to delete dx:", err);
    }
}
