import axios from "axios";

import { getToken } from "./token";
const COOKIE_KEY = "token_base365";
const url = process.env.NEXT_PUBLIC_BASE_URL

/* -------------------------------------- LIST ----------------------------------------------*/
export const SpecifiedGroupList = async (pageSize:number,page:number,keyWords:any) => {
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.get(`${url}api/hr/administration/listProvision?pageSize=${pageSize}&page=${page}&keyWords=${keyWords}`,{
            headers: {
                authorization: `Bearer ${isToken}`,
            },
        })
        return response.data
    } catch (error) {
    }
}

export const RulesByGroupList = async(id:number) =>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.get(`${url}api/hr/administration/listPolicy?id=${id}`,{
            headers: {
                authorization: `Bearer ${isToken}`,
            },
        })
        return response.data
    } catch (error) {
    }

}

export const PolicyList = async (page:number,pageSize:number,keyWords:any)=>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.get(`${url}api/hr/administration/listEmpoyePolicy?page=${page}&pageSize=${pageSize}&keyWords=${keyWords}`,{
            headers: {
                authorization: `Bearer ${isToken}`,
            },
        })
        return response.data
    } catch (error) {
    }
}

export const PolicyByGroupList = async (id:number)=>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response  = await axios.get(`${url}api/hr/administration/listEmployeePolicySpecific?id=${id}`,{
            headers: {
                authorization: `Bearer ${isToken}`,
            },
        })
        return response.data
    } catch (error) {
    }
}


/* -------------------------------------- ADD ----------------------------------------------*/
export const AddSpecifiedGroup = async (formData:FormData)=>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.post(`${url}api/hr/administration/addProvision`,formData,{
            headers: {
                authorization: `Bearer ${isToken}`,
            },
        })
        return response.data
    } catch (error) {
    }

}

export const AddRulesByGroupList = async (formData:FormData)=>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.post(`${url}api/hr/administration/addPolicy`,formData,{
            headers:{
                authorization: `Bearer ${isToken}`,
            }
        })
        return response.data
    } catch (error) {
    }

}

export const AddPolicy = async (formData: FormData)=>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.post(`${url}api/hr/administration/addEmployeePolicy`,formData,{
            headers:{
                authorization: `Bearer ${isToken}`,
            }
        })
        return response.data
    } catch (error) {
    }
} 

export const AddPolicyByGroup = async (formData:FormData)=>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.post(`${url}api/hr/administration/addEmpoyePolicySpecific`,formData,{
            headers:{
                authorization: `Bearer ${isToken}`
            }
        })
        return response.data
    } catch (error) {
    }
}



/* -------------------------------------- DETAIL ----------------------------------------------*/

export const GroupDetails = async (id:number) =>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.get(`${url}api/hr/administration/detailProvision?id=${id}`,{
            headers:{
                authorization: `Bearer ${isToken}`
            }
        })
        return response.data
    } catch (error) {
    }
}

export const RegulationsDetails = async (id:number) =>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.get(`${url}api/hr/administration/detailPolicy?id=${id}`,{
            headers:{
                authorization: `Bearer ${isToken}`
            }
        })
        return response.data
    } catch (error) {
    }
}

    export const PolicyGroupDetail = async (id:number) =>{
        try {
            const isToken = getToken(COOKIE_KEY);
            const response = await axios.get(`${url}api/hr/administration/getDetailPolicy?id=${id}`,{
                headers:{
                    authorization: `Bearer ${isToken}`
                }
            })
            return response.data
        } catch (error) {
        }
    }

    export const PolicyDetails = async (id:number) =>{
        try {
            const isToken = getToken(COOKIE_KEY);
            const response = await axios.get(`${url}api/hr/administration/detailEmployeePolicySpecific?id=${id}`,{
                headers:{
                    authorization: `Bearer ${isToken}`
                }
            })
            return response.data
        } catch (error) {
        }
    }

   
/* -------------------------------------- UPDATE ----------------------------------------------*/

export const GroupUpdate = async (fomrData: FormData) => {
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.put(`${url}api/hr/administration/updateProvision`,fomrData,{
            headers:{
                authorization: `Bearer ${isToken}`
            }
        })
        return response.data
    } catch (error) {
    }
}

export const UpdateRegulation = async (fomrData: FormData) => {
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.post(`${url}api/hr/administration/updatePolicy`,fomrData,{
            headers:{
                authorization: `Bearer ${isToken}`
            }
        })
        return response.data
    } catch (error) {
    }
}

export const GroupPolicyUpdate = async (fomrData: FormData) => {
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.put(`${url}api/hr/administration/updateEmployeePolicy`,fomrData,{
            headers:{
                authorization: `Bearer ${isToken}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error('Failed to update group  ')
    }
}

export const UpdatePolicy = async (fomrData: FormData) => {
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.put(`${url}api/hr/administration/updateEmployeePolicySpecific`,fomrData,{
            headers:{
                authorization: `Bearer ${isToken}`
            }
        })
        return response.data
    } catch (error) {
    }
}

/* -------------------------------------- DELETE ----------------------------------------------*/

export const GroupDelete = async (formData:FormData) =>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.delete(`${url}api/hr/administration/deleteProvision`,{
            headers:{
                authorization: `Bearer ${isToken}`
            },
            data: formData,
        })
        return response.data
    } catch (error) {
    }
}

export const DeleteRegulations = async (formData:FormData) =>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.delete(`${url}api/hr/administration/deletePolicy`,{
            headers:{
                authorization: `Bearer ${isToken}`
            },
            data: formData, 
        })
        return response.data
    } catch (error) {
    }
}

export const GroupPolicyDelete = async (formData:FormData) =>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.delete(`${url}api/hr/administration/deleteEmployeePolicy`,{
            headers:{
                authorization: `Bearer ${isToken}`
            },
            data: formData,
        })
        return response.data
    } catch (error) {
    }
}

export const DeletePolicy = async (formData:FormData) =>{
    try {
        const isToken = getToken(COOKIE_KEY);
        const response = await axios.delete(`${url}api/hr/administration/deleteEmployeePolicySpecific`,{
            headers:{
                authorization: `Bearer ${isToken}`
            },
            data: formData, 
        })
        return response.data
    } catch (error) {
    }
}

