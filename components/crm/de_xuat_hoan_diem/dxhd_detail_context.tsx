import { createContext, useContext, useEffect, useState } from "react";
import { useFormData } from "../context/formDataContext";
import axios from "axios";
import { getPropOrDefault } from "./utils";
import dayjs from "dayjs";
import { isDenied } from "./dxhd_status";
import Cookies from "js-cookie";

const fakeData = {
    id: 2,
    title: 'abc',
    status: 2,
    created_at: new Date(),
    ntd: {
        id: 1,
        name: 'Nguyễn Tuyển Dụng'
    },
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pellentesque id nisl at mollis. Aliquam in massa elit. Nullam quis condimentum leo, at facilisis est. Nam id erat quis lacus rutrum tristique vel a eros. Donec hendrerit mauris neque, ut placerat lectus elementum eget. Praesent ante mi, tempus eget bibendum.',
    req: [
        {
            id: 1,
            link: 'https',
            reason: 'reason',
            status: 1,
            verify_user: {
                id: 1,
                userName: 'abc'
            },
            verify_reason: 'abc'
        },
        {
            id: 2,
            link: 'https',
            reason: 'reason',
            status: 2,
            verify_user: {
                id: 1,
                userName: 'abc'
            },
            verify_reason: 'abc'
        },
        {
            id: 3,
            link: 'https',
            reason: 'reason',
            status: 3,
            verify_user: {
                id: 1,
                userName: 'abc'
            },
            verify_reason: 'abc'
        },
    ],
    result: 'abc'
}

const fakeDiary = [
    {
        object: 'object',
        action: 'action',
        user: {
            id: 1,
            userName: 'name'
        },
        created_at: new Date()
    },
    {
        object: 'object',
        action: 'action',
        user: {
            id: 1,
            userName: 'name'
        },
        created_at: new Date()
    },
    {
        object: 'object',
        action: 'action',
        user: {
            id: 1,
            userName: 'name'
        },
        created_at: new Date()
    },
    {
        object: 'object',
        action: 'action',
        user: {
            id: 1,
            userName: 'name'
        },
        created_at: new Date()
    },
    {
        object: 'object',
        action: 'action',
        user: {
            id: 1,
            userName: 'name'
        },
        created_at: new Date()
    },

]

export const DxhdDetailContext = createContext<any>(false)

export const DxhdDetailProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [dxhdDetail, setDxhdDetail] = useState({})
    const [dxhdDetailDiary, setDxhdDetailDiary] = useState([])
    const [getData, setGetData] = useState(false)
    const { formData } = useContext(useFormData)

    useEffect(() => {
        if (getData) {
            // console.log(formData)
            fetchData()
            fetchDiary()
        }
        setGetData(false)
    }, [getData])

    const fetchData = async () => {
        // fetch data ...
        axiosTimViecCall
            .post('/getById', {
                id: getPropOrDefault(formData, 'id', 0)
            })
            .then(res => {
                // console.log(res)
                const data = getPropOrDefault(res, 'data.data.data', '')
                if (data) {
                    const list_req = getPropOrDefault(data, 'list_req', [])
                        .map(req => ({
                            id: getPropOrDefault(req, 'id', 0),
                            link: getPropOrDefault(req, 'link', ''),
                            point: getPropOrDefault(req, 'point', 0),
                            reason: getPropOrDefault(req, 'reason', ''),
                            status: getPropOrDefault(req, 'status', -1),
                            verify_user: {
                                id: getPropOrDefault(req, 'verify_user.adm_id', 0),
                                userName: getPropOrDefault(req, 'verify_user.adm_name', 'Chưa cập nhật')
                            },
                            verify_reason: getPropOrDefault(req, 'verify_reason', 'Chưa cập nhật')
                        }))
                    let result = ''
                    if (isDenied(getPropOrDefault(data, 'status', -1))) {
                        result = 'Từ chối do ' + getPropOrDefault(data, 'deny_explain', '')
                    } else {
                        result = getPropOrDefault(data, 'result', 'Chưa cập nhật')
                    }
                    setDxhdDetail({
                        id: getPropOrDefault(data, 'id', 0),
                        title: getPropOrDefault(data, 'title', 'Chưa cập nhật'),
                        status: getPropOrDefault(data, 'status'),
                        // status: 5,
                        created_at: dayjs.unix(getPropOrDefault(data, 'created_at', 0)),
                        ntd: {
                            id: getPropOrDefault(data, 'ntd_id.idTimViec365', 0),
                            name: getPropOrDefault(data, 'ntd_id.userName', 'Chưa cập nhật')
                        },
                        note: getPropOrDefault(data, 'note', ''),
                        req: list_req,
                        result: result,
                        admin_accept: getPropOrDefault(data, 'admin_accept', 0),
                        // admin_accept: 3
                    })
                }
            })
            .catch(e => console.log(e))
        // setDxhdDetail({...fakeData})
    }

    const fetchDiary = async () => {
        // fetch diary
        axiosTimViecCall
            .post('/diary', {
                dxhd_id: getPropOrDefault(formData, 'id', 0)
            })
            .then(res => {
                // console.log(res)
                const listDiary = getPropOrDefault(res, 'data.data.data', [])
                if (listDiary.length > 0) {
                    setDxhdDetailDiary(listDiary.map(diary => {
                        const displayDiary = {
                            object: getPropOrDefault(diary, 'object', 'Chưa cập nhật'),
                            action: getPropOrDefault(diary, 'action', 'Chưa cập nhật'),
                            user: {
                                id: getPropOrDefault(diary, 'user.adm_id', 0),
                                userName: getPropOrDefault(diary, 'user.adm_name', 'Chưa cập nhật')
                            },
                            created_at: dayjs.unix(getPropOrDefault(diary, 'created_at', 0))
                        }

                        return displayDiary
                    }))
                }
            })
            .catch(e => console.log(e))
        // setDxhdDetailDiary(fakeDiary)
    }

    // const TimViecBaseURL = 'http://localhost:3007/api/crm/dxhd'
    const TimViecBaseURL = 'https://api.timviec365.vn/api/crm/dxhd'
    const axiosTimViecCall = axios.create({
        baseURL: TimViecBaseURL,
        headers: {
            "Content-Type": "application/json",
            // Authentication: accessToken,
        },
    })

    // const TimViecAdminBaseURL = 'http://localhost:3007/api/crm/dxhd/admin'
    const TimViecAdminBaseURL = 'https://api.timviec365.vn/api/crm/dxhd/admin'
    const axiosTimViecAdminCall = axios.create({
        baseURL: TimViecAdminBaseURL,
        headers: {
            "Content-Type": "application/json",
            // Authentication: accessToken,
        },
    })

    axiosTimViecAdminCall.interceptors.request.use((config: any) => {
        let accessToken = Cookies.get("token_base365");
        return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
    });

    return (
        <DxhdDetailContext.Provider
            value={{
                dxhdDetail, setDxhdDetail,
                dxhdDetailDiary, setDxhdDetailDiary,
                setGetData,
                axiosTimViecCall, axiosTimViecAdminCall,
            }}
        >
            {children}
        </DxhdDetailContext.Provider>
    )
}