import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { axiosQLC } from "@/utils/api/api_qlc";
import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";


export const QuoteContext = createContext<any>(false);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // Filter tìm kiếm
    const [dateQuote, setDateQuote] = useState<null | Date>(null) // Ngày báo giá
    const [dateQuoteEnd, setDateQuoteEnd] = useState<null | Date>(null) // Hạn báo giá
    const [quoteCode, setQuoteCode] = useState('') // Mã báo giá

    const [shouldFetchData, setShouldFetchData] = useState(false) // Trigger gọi API danh sách báo giá
    // Hàm gọi ở màn trang chính

    // Lưu lại cho modal và thao tác
    const [recordId, setRecordId] = useState<Number>() // Lưu id 1 bản ghi được chọn
    const [listRecordId, setListRecordId] = useState([]) // Lưu id nhiều bản ghi được chọn
    const [recordName, setRecordName] = useState('') // Lưu tên bản ghi được chọn (cho phần modal)
    const [listRecordName, setListRecordName] = useState([]) // Lưu nhiều tên (cho modal)

    // Trạng thái báo giá
    const [status, setStatus] = useState<Number>(0) // Lưu trạng thái cho phần filter
    const statusArray = [
        { key: 0, value: "Tất cả" },
        { key: 1, value: "Bản thảo" },
        { key: 2, value: "Đàm phán" },
        { key: 3, value: "Đã gửi" },
        { key: 4, value: "Chờ xác nhận" },
        { key: 5, value: "Đồng ý" },
        { key: 6, value: "Từ chối" },
    ]
    const statusNumToStr = (num: Number) => { // Trạng thái số -> tên
        const item = statusArray.find((pair) => pair.key === num)
        return item ? item.value : ""
    }
    const statusStrToNum = (str: String) => { // Trạng thái tên -> số
        const item = statusArray.find((pair) => pair.value === str)
        return item ? item.key : 0
    }
    const allStatusString = () => statusArray.map((pair) => pair.value) // Trả về danh sách các tên trạng thái
    const allAvailableStatusString = () => statusArray.slice(1).map((pair) => pair.value) // Bỏ "Tất cả"
    const statusStrToColor = (status: String) => { // Trạng thái tên -> màu tương ứng
        switch (status) {
            case "Bản thảo":
            case "Chờ xác nhận": return '#FFA800'
            case "Đàm phán":
            case "Đã gửi": return '#4C5BD4'
            case "Đồng ý": return '#34B632'
            case "Từ chối": return '#FF3333'
            default: return 'inherit'
        }
    }
    const statusToColor = (status: Number) => { // Trạng thái số -> màu
        return statusStrToColor(statusNumToStr(status))
    }

    // Chi tiết báo giá
    const [shouldFetchDetailData, setShouldFetchDetailData] = useState(false) // Trigger gọi API chi tiết báo giá
    const [detailData, setDetailData] = useState<any>({}) // Lưu dữ liệu chi tiết báo giá trả về
    useEffect(() => { // Gọi API lấy chi tiết báo giá
        if (shouldFetchDetailData && Number(recordId) && Number(recordId) !== 0) {
            axiosCRMCall
                .post('/quote/getDetail', { id: Number(recordId) || 0 })
                .then((res) => {
                    res?.data?.data?.data ?
                        setDetailData(res?.data?.data?.data) :
                        setDetailData({})
                })
                .catch((err) => console.log(err))
        }
        setShouldFetchDetailData(false)
    }, [shouldFetchDetailData])

    function getPropOrDefault(obj, propPath, defaultValue: any = '') { // Lấy của đối tượng theo trường, nếu không có trả giá trị mặc định
        const props = propPath.split('.');
        let currentObj = obj;

        for (const prop of props) {
            if (currentObj && currentObj.hasOwnProperty(prop)) {
                currentObj = currentObj[prop];
            } else {
                return defaultValue;
            }
        }

        return currentObj ?? defaultValue;
    }

    // Thêm mới báo giá
    const [isCreate, setIsCreate] = useState(true) // Trigger thêm mới / chỉnh sửa
    const [newQuote, setNewQuote] = useState({ // Lưu thông tin báo giá khi người dùng nhập liệu
        id: 0,
        date_quote: '',
        date_quote_end: '',
        status: 0,
        customer_id: 0,
        tax_code: '',
        address: '',
        phone_number: '',
        chance_id: 0,
        introducer: '',
        product_list: [],
        discount_rate: 0,
        terms_and_conditions: '',
        note: '',
        creator_name: '',
        ceo_name: '',
        description: '',
        use_system_info: false,
    })

    // Reset
    const clearQuote = () => { // Reset nhập liệu
        setNewQuote({
            id: 0,
            date_quote: '',
            date_quote_end: '',
            status: 0,
            customer_id: 0,
            tax_code: '',
            address: '',
            phone_number: '',
            chance_id: 0,
            introducer: '',
            product_list: [],
            discount_rate: 0,
            terms_and_conditions: '',
            note: '',
            creator_name: '',
            ceo_name: '',
            description: '',
            use_system_info: false,
        })
    }

    // Có thể sử dụng trực tiếp detailData
    // const [editQuote, setEditQuote] = useState({ // Lưu dữ liệu sẵn có khi chỉnh sửa
    //     id: 0,
    //     date_quote: '',
    //     date_quote_end: '',
    //     status: 0,
    //     customer_id: 0,
    //     tax_code: '',
    //     address: '',
    //     phone_number: '',
    //     chance_id: '',
    //     introducer: '',
    //     product_list: [],
    //     discount_rate: 0,
    //     terms_and_conditions: '',
    //     note: '',
    //     creator_name: '',
    //     ceo_name: '',
    //     description: '',
    //     use_system_info: false,
    // })

    useEffect(() => {
        if (isCreate) {
            clearQuote();
            setDetailData({})
        } else {
            setShouldFetchDetailData(true)
        }
    }, [isCreate])

    // If edit (not create)
    // TODO Check here
    useEffect(() => {
        if (!isCreate) {
            setNewQuote({
                id: detailData.id ? detailData.id : 0,
                date_quote: detailData.date_quote ? dayjs(detailData.date_quote).format('YYYY-MM-DD') : '',
                date_quote_end: detailData.date_quote_end ? dayjs(detailData.date_quote_end).format('YYYY-MM-DD') : '',
                status: detailData.status ? detailData.status : 0,
                customer_id: detailData.customer_id ? detailData.customer_id : 0,
                tax_code: detailData.tax_code ? detailData.tax_code : '',
                address: detailData.address ? detailData.address : '',
                phone_number: detailData.phone_number ? detailData.phone_number : '',
                chance_id: detailData.chance_id ? detailData.chance_id.id : -1,
                introducer: detailData.introducer ? detailData.introducer : '',
                product_list: detailData.product_list ? detailData.product_list : [],
                discount_rate: detailData.discount_rate ? detailData.discount_rate : 0,
                terms_and_conditions: detailData.terms_and_conditions ? detailData.terms_and_conditions : '',
                note: detailData.note ? detailData.note : '',
                creator_name: detailData.creator_name ? detailData.creator_name : '',
                ceo_name: detailData.ceo_name ? detailData.ceo_name : '',
                description: detailData.description ? detailData.description : '',
                use_system_info: detailData.use_system_info ? detailData.use_system_info : false,
            })
        }
    }, [detailData])
    // useEffect(() => {
    //     setNewQuote(newQuote)
    // }, [newQuote])

    const validateQuote = () => { // Kiểm tra giá trị nhập liệu
        let invalidMsg = []
        // Check empty check zero
        const requiredFields = ['date_quote', 'date_quote_end', 'status', 'customer_id', 'creator_name', 'ceo_name']
        let isEmptyField = false
        requiredFields.forEach((fieldName) => {
            const value = newQuote[fieldName]
            if (value === null || value === undefined || value === '' || value === 0) {
                isEmptyField = true
            }
        })
        if (isEmptyField) {
            invalidMsg.push(`Các trường bắt buộc không được để trống`)
        }

        // product check empty
        if (!newQuote.product_list || newQuote.product_list.length === 0) {
            invalidMsg.push(`Danh sách hàng hóa không được để trống`)
        }

        return invalidMsg
    }

    const stringifyObject = (obj) => { // Chuyển dữ liệu thành string trước khi gửi
        if (obj === null || obj === undefined) {
            return '';  // Convert null or undefined to an empty string
        }

        if (Array.isArray(obj)) {
            // If it's an array, use JSON.stringify
            return JSON.stringify(obj);
        }

        if (typeof obj === 'object') {
            const result = {};
            // Recursively stringify object properties
            for (let key in obj) {
                result[key] = stringifyObject(obj[key]);
            }
            return result;
        } else if (typeof obj === 'string') {
            return obj.trim();  // Trim string values
        }

        return obj.toString();  // Convert other values to strings
    }

    const inputQuote = (fieldName: string, value: any) => { // Nhập liệu vào theo tên trường 
        setNewQuote((prev) => {
            if (prev.hasOwnProperty(fieldName)) {
                return { ...prev, [fieldName]: value }
            }
            return prev
        })
    }

    // Khách hàng trong báo giá
    const [listCusOption, setListCusOption] = useState([]) // Lưu danh sách lựa chọn khách hàng (id - tên)
    const [keyword, setKeyword] = useState('') // Lưu từ khóa tìm kiếm
    const [shouldFetchCus, setShouldFetchCus] = useState(false) // Trigger gọi API danh sách khách hàng

    useEffect(() => { // Gọi khi từ khóa đổi
        setShouldFetchCus(true)
    }, [keyword])

    useEffect(() => { // Gọi API danh sách khách hàng - Chỉ tìm được theo tên, không có tìm theo id
        if (shouldFetchCus) {
            axiosCRMCall
                .post('/customer/list', { keyword: keyword, page: 1, perPage: 9999 }) // Lấy nhiều nhất có thể
                .then((res) => {
                    if (res?.data?.data?.length > 0) {
                        const newArray = res?.data?.data
                            // .filter(item => 'cus_id' in item && 'name' in item)
                            // .filter(item => item.cus_id && item.name)
                            .sort((a, b) => b.cus_id - a.cus_id)
                            .slice(0, 50)
                            .map(item => `${item.cus_id} - ${item.name}`)
                        setListCusOption(newArray)
                    }
                    setShouldFetchCus(false)
                })
                .catch((err) => {
                    console.log(err)
                    setShouldFetchCus(false)
                })
                .finally(() => {
                    setShouldFetchCus(false)
                })
        }
    }, [shouldFetchCus])

    const getCusId = (str: string) => { // Lấy íd từ lựa chọn
        const match = str.match(/^(\d+) -/);
        return match ? Number(match[1]) : 0;
    }

    // Cơ hội trong báo giá
    const [listChanceOption, setListChanceOption] = useState([])
    const [chanceKeyword, setChanceKeyword] = useState('')
    const [shouldFetchChance, setShouldFetchChance] = useState(false)

    useEffect(() => {
        setShouldFetchChance(true)
    }, [chanceKeyword])

    useEffect(() => {
        if (shouldFetchChance) {
            axiosCRMCall
                .post('/chance/list-chance', { keyword: chanceKeyword })
                .then(res => {
                    if (res?.data?.data?.data?.length > 0) {
                        const newArr = res?.data?.data?.data
                            .filter(item => 'id' in item && 'name' in item)
                            .filter(item => item.id && item.name)
                            .map(item => `${item.id} - ${item.name}`)
                        setListChanceOption(newArr)
                    }
                    setShouldFetchChance(false)
                })
                .catch((err) => {
                    console.log(err)
                    setShouldFetchChance(false)
                })
                .finally(() => {
                    setShouldFetchChance(false)
                })
        }
        // setShouldFetchChance(false)
    }, [shouldFetchChance])

    // Hàng hóa trong báo giá
    const [listProduct, setListProduct] = useState([]) // Lưu danh sách hàng hóa từ API
    const [listProductOptions, setListProductOptions] = useState([]) // Lưu danh sách lựa chọn hàng hóa (id - tên)
    const [prodName, setProdName] = useState('') // Lưu từ khóa tìm kiếm
    const [shouldFetchProd, setShouldFetchProd] = useState(false); // Trigger gọi API danh sách hàng hóa
    const [tempListProd, setTempListProd] = useState([]) // Lưu danh sách hàng hóa từ nhập liệu

    useEffect(() => { // Tìm kiếm khi từ khóa đổi
        setShouldFetchProd(true)
    }, [prodName])

    useEffect(() => { // Gọi API danh sách hàng hóa
        if (shouldFetchProd) {
            axiosCRMCall
                .post('/product/show-product', { prod_name: prodName, page: 1, page_size: 9999 }) // Lấy nhiều nhất có thể
                .then((res) => {
                    if (res?.data?.data?.data.length > 0) {
                        setListProduct(res?.data?.data?.data
                            .sort((a, b) => b._id - a._id)
                            .slice(0, 50)
                            .map(item => ({
                                id: item._id,
                                name: item.prod_name,
                                dvt: getPropOrDefault(item, 'dvt.unit_name'),
                                price: item.price
                            })))
                    } else {
                        setListProduct([])
                    }
                    setShouldFetchProd(false)
                })
                .catch((err) => {
                    console.log(err)
                    setShouldFetchProd(false)
                })
                .finally(() => {
                    setShouldFetchProd(false)
                })
        }
        // setShouldFetchProd(false)
    }, [shouldFetchProd])

    useEffect(() => { // Lưu danh sách lựa chọn khi trả về
        setListProductOptions(listProduct.map(prod => `${prod.id} - ${prod.name}`))
    }, [listProduct])

    useEffect(() => { // Lưu vào báo giá khi nhập liệu hàng hóa
        setNewQuote(prevData => (
            { ...prevData, product_list: tempListProd.map(({ total, ...prod }) => prod) }
        ))
    }, [tempListProd])

    // Lấy dữ liệu bổ sung cho mẫu báo giá
    const [companyData, setCompanyData] = useState<any>({})
    const [customerData, setCustomerData] = useState<any>({})
    const [shouldGetCus, setShouldGetCus] = useState(false)
    const [shouldGetCom, setShouldGetCom] = useState(false)

    useEffect(() => {
        if (shouldGetCus && Object.keys(detailData).length > 0) {
            setShouldGetCus(false)
            axiosCRMCall
                .post('/customerdetails/detail', { cus_id: getPropOrDefault(detailData, 'customer_id', '0') })
                .then(res => {
                    if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
                        // setCustomerData(res?.data?.data)

                        // Cập nhật do base thay đổi
                        let name = ''
                        const data = getPropOrDefault(res, 'data.data', null)
                        if (data) {
                            const data2 = getPropOrDefault(data, 'data2', null)
                            if (data2) {
                                name = getPropOrDefault(data2, 'ten_khach_hang', 'Chưa cập nhật')
                            } else {
                                name = getPropOrDefault(data, 'name', 'Chưa cập nhật')
                            }
                        }

                        setCustomerData({
                            name: name
                        })
                    } else {
                        setCustomerData({})
                    }
                })
                .catch((err) => { console.log(err); setCustomerData({}) })
        }
    }, [shouldGetCus])

    useEffect(() => {
        if (shouldGetCom) {
            setShouldGetCom(false)
            // axiosQLC
            //     .post('/company/info')
            //     .then(res => {
            //         res?.data?.data?.data ?
            //             setCompanyData(res?.data?.data?.data) :
            //             setCompanyData({})
            //     })
            //     .catch((err) => { console.log(err); setCompanyData({}) })
            axiosCRMCall
                .post('/quote/getFullDetail', { id: Number(recordId) || 0 })
                .then(res => {
                    // console.log(getPropOrDefault(res, 'data.data.data.com_id', {}))
                    const companyData = getPropOrDefault(res, 'data.data.data.com_id', {})
                    const company = {
                        com_name: getPropOrDefault(companyData, 'userName', null),
                        com_address: getPropOrDefault(companyData, 'address', null),
                        com_phone: getPropOrDefault(companyData, 'phone', null),
                        com_phone_tk: getPropOrDefault(companyData, 'phoneTK', null),
                        com_email_lh: getPropOrDefault(companyData, 'emailContact', null),
                    }
                    setCompanyData(company)
                })
                .catch((err) => { console.log(err); setCompanyData({}) })
        }
    }, [shouldGetCom])

    // In tải
    const getPdfLink = async (quote_id: Number) => {
        let link = ''
        try {
            if (quote_id) {
                await axiosCRMCall
                    .post('/quote/getPdf', { id: quote_id })
                    .then(res => {
                        // console.log(getPropOrDefault(res, 'data.data.link', ''))
                        let resLink: String = getPropOrDefault(res, 'data.data.link', '')
                        if (resLink !== '') {
                            link = 'http://210.245.108.202:3007' + resLink.replace(/^undefined/, '')
                        }
                    })
                    .catch((err) => { console.log(err); })
            }
        } catch (error) {
            console.log('Error: ', error)
        }
        return link
    }

    // Phân quyền
    const quote_role = [
        {
            value: 1,
            label: 'Xem'
        },
        {
            value: 2,
            label: 'Sửa'
        },
        {
            value: 3,
            label: 'Toàn quyền'
        },

    ]
    const getRole = async (quote_id: Number) => {
        let role = 0
        try {
            await axiosCRMCall
                .post('/quote/getRole', { quote_id: quote_id })
                .then(res => {
                    // console.log(getPropOrDefault(res, 'data.data.role', 0))
                    role = getPropOrDefault(res, 'data.data.role', 0)
                })
                .catch((err) => { console.log(err); })
        } catch (error) {
            console.log('Error: ', error)
        }
        return role
    }
    const checkRoleFull = async (quote_id: Number) => {
        let result = false
        try {
            const role = await getRole(quote_id)
            if (role === 3) {
                result = true
            }
        } catch (error) {
            console.log('Error: ', error)
        }
        return result
    }
    const checkRoleEdit = async (quote_id: Number) => {
        let result = false
        try {
            // const checkFull = await checkRoleFull(quote_id, com_id)
            // if (checkFull) {
            //     result = true
            // } else {
            //     const role = await getRole(quote_id, com_id)
            //     if (role === 2) {
            //         result = true
            //     }
            // }
            const role = await getRole(quote_id)
            if (role === 3 || role === 2) {
                result = true
            }
        } catch (error) {
            console.log('Error: ', error)
        }
        return result
    }
    const checkRoleView = async (quote_id: Number) => {
        let result = false
        try {
            // const checkFull = await checkRoleFull(quote_id, com_id)
            // const checkEdit = await checkRoleEdit(quote_id, com_id)
            // if (checkFull || checkEdit) {
            //     result = true
            // } else {
            //     const role = await getRole(quote_id, com_id)
            //     if (role === 1) {
            //         result = true
            //     }
            // }
            const role = await getRole(quote_id)
            if (role === 3 || role === 2 || role === 1) {
                result = true
            }
        } catch (error) {
            console.log('Error: ', error)
        }
        return result
    }
    const getRoleMany = async (list_quote_id: [Number]) => {
        let list_role = []
        try {
            await axiosCRMCall
                .post('/quote/getRoleMany', { list_quote_id: JSON.stringify(list_quote_id) })
                .then(res => {
                    // console.log(getPropOrDefault(res, 'data.data.role', 0))
                    list_role = getPropOrDefault(res, 'data.data.list_role', [])
                })
                .catch((err) => { console.log(err); })
        } catch (error) {
            console.log('Error: ', error)
        }
        return list_role
    }

    return (
        <QuoteContext.Provider value={
            {
                // Filter tìm kiếm
                dateQuote, setDateQuote,
                dateQuoteEnd, setDateQuoteEnd,
                shouldFetchData, setShouldFetchData,
                quoteCode, setQuoteCode,
                stringifyObject,
                isCreate, setIsCreate,

                // Lưu lại cho modal và thao tác
                recordId, setRecordId,
                listRecordId, setListRecordId,
                recordName, setRecordName,
                listRecordName, setListRecordName,

                // Trạng thái báo giá
                status, setStatus,
                statusArray, statusNumToStr: statusNumToStr, statusStrToNum: statusStrToNum,
                allStatusString, allAvailableStatusString,
                statusStrToColor, statusToColor,

                // Chi tiết
                detailData, setDetailData,
                shouldFetchDetailData, setShouldFetchDetailData,
                getPropOrDefault,

                // Thêm mới
                newQuote, setNewQuote,
                inputQuote, clearQuote, validateQuote,
                // Chỉnh sửa
                // editQuote, setEditQuote,

                // Khách hàng trong báo giá
                shouldFetchCus, setShouldFetchCus,
                listCusOption, getCusId,
                keyword, setKeyword,
                // Cơ hội trong báo giá
                listChanceOption, setListChanceOption,
                chanceKeyword, setChanceKeyword,
                shouldFetchChance, setShouldFetchChance,
                // Hàng hóa trong báo giá
                shouldFetchProd, setShouldFetchProd,
                listProduct, listProductOptions,
                prodName, setProdName,
                tempListProd, setTempListProd,

                // Lấy dữ liệu bổ sung cho mẫu báo giá
                companyData, setCompanyData,
                customerData, setCustomerData,
                shouldGetCus, setShouldGetCus,
                shouldGetCom, setShouldGetCom,

                // In tải
                getPdfLink,

                // Phân quyền
                quote_role, getRoleMany,
                checkRoleFull, checkRoleEdit, checkRoleView,
            }
        }
        >
            {children}
        </QuoteContext.Provider>
    )
}