import { Button, Table, Modal } from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import Cookies from "js-cookie";
import FilterNTD from "./filter";
import styles from "../cskh/tongdai/tongdai.module.css";
import * as XLSX from 'xlsx';
import exportToExcel from "../ultis/export_xlxs";
import jwt_decode from "jwt-decode";
type Props = {};

const DevideCart = (props: Props) => {
    const router = useRouter();
    const { nhanvien, nguon, timeStart, timeEnd } = router.query as { nhanvien: string, nguon: string, timeStart: string, timeEnd: string };
    const [user, setUser] = useState(() => {
        const decodedToken = jwt_decode(Cookies.get("token_base365"))
        if (decodedToken && decodedToken['data']) {
            return decodedToken['data']
        }
        return undefined
    })
    const [listData, setListData] = useState([]);
    const [textRecord, setTextRecord] = useState('');
    const [current, setcurrent] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFilter, setIsModalFilter] = useState(false);
    const [fillStart, setFillStart] = useState<any>(() => {
        if (!timeStart) return undefined
        return timeStart.split(' ')[0]
    });
    const [fillEnd, setFillEnd] = useState<any>(() => {
        if (!timeEnd) return undefined
        return timeEnd.split(' ')[0]
    });
    const [nv, setNv] = useState(() => {
        if (user?.type === 1) {
            return nhanvien
        }
        else {
            return `${user.idQLC} - ${user.userName}`
        }
    })
    const [cusFrom, setCusFrom] = useState(nguon);
    
    const [condition, setCondition] = useState(() => {
        const query = {}
        if (user?.type === 1) {
            if (nhanvien) query['emp_id'] = Number(nhanvien.split(' ')[0])
        }
        else {
            query['emp_id'] = user.idQLC
        }
        // if (nguon) query['cus_from'] = nguon
        if (timeStart) {
            const time = Math.floor((new Date(timeStart)).getTime() / 1000)
            query['timeStart'] = time
        }
        if (timeEnd) {
            const time = Math.floor((new Date(timeEnd)).getTime() / 1000)
            query['timeEnd'] = time
        }
        return JSON.stringify(query)
    })

    const handleShowModal = (record: any) => {
        setTextRecord(record.text)
        setIsModalOpen(true)
    }

    const handleFilter = () => {
        let param = ''
        if (nv) {
            param += `nhanvien=${nv}&`
        }
        if (cusFrom) {
            param += `nguon=${cusFrom}&`
        }
        if (fillStart) {
            param += `timeStart=${fillStart}&`
        }
        if (fillEnd) {
            param += `timeEnd=${fillEnd}&`
        }
        param !== '' ? router.push(`?${param}`) : router.push('')
    }
    const handleExportDataStaff = () => {
   
        const getData = async () => {
            
          
            let data = listData;
            let data_final = [];
            for(let i = 0; i< data.length; i++){
                let data_single = data[i];
                let emp_id = data_single.emp_id;
                let listData_single = data.filter((e: any)=> e.emp_id == emp_id);
                let count = listData_single.length;
                let check = data_final.find((e:any) => e.Id == emp_id);
                if(!check){
                    data_final.push({
                        Id:emp_id,
                        "Tên cán bộ":listData_single[0].emp_name,
                        "Số lượng":count
                    });
                }
            };
            let nameFile = `Danh sách chia giỏ nhà tuyển dụng đăng ký.xlsx`;
            downloadExcel(data_final,nameFile);
        };
        getData();
        
        
    }
    const downloadExcel = (data:any, nameFile:any) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, nameFile);
      };
    const handleExportPhone = () => {
        const arr_list_phone = []  // mảng lưu sdt
        listData.map(item => {
            if (item.phone_number) {
                const arr = item.phone_number.split(',')
                arr.map((phone: any) => {
                    if (!isNaN(phone) && !arr_list_phone.includes(phone)) {
                        arr_list_phone.push(phone)
                    }
                })
            }
        })
        const exportToExcel = () => {
            const data = arr_list_phone.map(phoneNumber => [phoneNumber]);
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Danh sách điện thoại');
            XLSX.writeFile(wb, 'danh_sach_dien_thoai.xlsx');
        };
        exportToExcel()
    }

    const handleExportEmail = () => {
        const arr_list_email = []
        listData.map(item => {
            if (item.email) {
                const arr = item.email.split(',')
                arr.map((e: any) => {
                    if (!arr_list_email.includes(e)) {
                        arr_list_email.push(e)
                    }
                })
            }
        })
        const exportToExcel = () => {
            const data = arr_list_email.map(email => [email]);
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Danh sách email');
            XLSX.writeFile(wb, 'danh_sach_email.xlsx');
        };
        exportToExcel()
    }


    useEffect(() => {
        const takeId = (arr:any, arr_add: any) => {
            try{
                let arr_res = arr_add;
                for(let i =0; i< arr.length; i++){
                    let ele = arr[i];
                    if(!arr_add.find((e:any)=> e.Id == ele.emp_id)){
                        let organizationName = "";
                        if(ele.organization && ele.organization.length){
                            organizationName = ele.organization[0].organizeDetailName;
                        }
                        arr_add.push({
                            Id:ele.emp_id,
                            "Tên cán bộ":ele.userName || ele.emp_name || "",
                            "Tổ chức":organizationName
                        });
                    }
                };
                return arr_res;
            }
            catch(e){
                console.log("err takeId",e);
                return [];
            }
        }
        const getData = async () => {

            // dữ liệu NTD đăng ký mạng xã hội ( Dân )
            let condition1 = JSON.parse(condition);
            const response1 = await fetch(`https://api.timviec365.vn/api/crm/customer/StatisticalRegisterSocial`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(condition1),
            });
            let data1 = await response1.json();
            data1 = data1.data.list_cus;
            console.log("Dữ liệu NTD đăng ký từ facebook (Dân)", data1);
            
            let condition2 = JSON.parse(condition);
            const response2 = await fetch(`https://api.timviec365.vn/api/crm/customer/StatisticalPostNewSocial`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(condition2),
            });
            let data2 = await response2.json();
            data2 = data2.data.list_cus;
            console.log("Dữ liệu NTD đăng tin facebooK (Dân)", data2);
            

            // NTD đăng ký topcv 
            let condition3 = JSON.parse(condition);
            const currentDate = new Date()
            // Đặt giờ, phút, giây và mili giây thành 0
            currentDate.setHours(0, 0, 0, 0)
            let startTime = currentDate.getTime();
            if(!condition3['create_at_s']){
                condition3['create_at_s'] = startTime ;
            };
            condition3['perPage'] = 10000;
            condition3['original_from'] = 'other_social';
            const response3 = await fetch(`https://api.timviec365.vn/api/crm/customer/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(condition3),
            });
            let data3 = await response3.json();
            data3 = data3.data;
            console.log("Dữ liệu NTD đăng ký top cv", data3);


            // NTD đăng tin topcv 
            let condition4 = JSON.parse(condition);
            if(!condition4['create_at_s']){
                condition4['create_at_s'] = startTime ;
            };
            condition4['perPage'] = 10000;
            condition4['original_from'] = 'other_social_post';
            const response4 = await fetch(`https://api.timviec365.vn/api/crm/customer/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(condition4),
            });
            let data4 = await response4.json();
            data4 = data4.data;
            console.log("Dữ liệu NTD đăng tin top cv", data4);
            
            // lấy tập hợp kinh doanh 
            let list_emp = [];
            list_emp = takeId(data1,list_emp);
            list_emp = takeId(data2,list_emp);
            list_emp = takeId(data3,list_emp);
            list_emp = takeId(data4,list_emp);
            

            let listDataFinal = [];
            let sum = 0;
            let sum_register_face = 0;
            let sum_post_face = 0;
            let sum_register_topcv = 0;
            let sum_post_topcv = 0;
            let sum_topcv = 0;
            let sum_face = 0;
            for(let i =0; i< list_emp.length; i++){
                let em = list_emp[i];
                let count_register_face = data1.filter((e:any)=> e.emp_id == em.Id).length;
                let count_new_face = data2.filter((e:any)=> e.emp_id == em.Id).length;
                let count_register_topcv = data3.filter((e:any)=> e.emp_id == em.Id).length;
                let count_new_topcv = data4.filter((e:any)=> e.emp_id == em.Id).length;
                listDataFinal.push({
                    "Id":em.Id,
                    "Tên cán bộ":em['Tên cán bộ'],
                    "Tổ chức": em['Tổ chức'],
                    "Số lượng nhà đăng ký facebook":count_register_face,
                    "Số lượng nhà đăng tin facebook":count_new_face,
                    "Số lượng nhà từ facebook":count_register_face + count_new_face,
                    "Số lượng nhà đăng ký topcv":count_register_topcv,
                    "Số lượng nhà đăng tin topcv":count_new_topcv,
                    "Số lượng nhà từ topcv":count_register_topcv + count_new_topcv,
                    "Tổng số NTD":count_register_topcv + count_new_topcv + count_register_face + count_new_face
                });
                sum_register_face = sum_register_face + count_register_face;
                sum_post_face = sum_post_face + count_new_face;
                sum_register_topcv = sum_register_topcv + count_register_topcv;
                sum_post_topcv = sum_post_topcv + count_new_topcv;
                sum_topcv = sum_topcv + count_register_topcv + count_new_topcv;
                sum_face = sum_face + count_register_face + count_new_face;
            };
            sum = sum_topcv + sum_face;
            listDataFinal.push({
                "Id":"",
                "Tên cán bộ":"",
                "Tổ chức": "",
                "Số lượng nhà đăng ký facebook":sum_register_face,
                "Số lượng nhà đăng tin facebook":sum_post_face,
                "Số lượng nhà từ facebook":sum_face,
                "Số lượng nhà đăng ký topcv":sum_register_topcv,
                "Số lượng nhà đăng tin topcv":sum_post_topcv,
                "Số lượng nhà từ topcv":sum_topcv,
                "Tổng số NTD":sum
            })
            
            console.log("Danh sách chuyên viên",listDataFinal);
            setLoading(false);
            setListData(listDataFinal);
            // if (data && data.data && data.data.list_cus) {
            //     setListData(data.data.list_cus);
            // }
        };
        getData();
    }, []);

    const Colums = [
        {
            width: "3%",
            title: "Id Cán bộ",
            dataIndex: "Id",
        },
        {
            width: "3%",
            title: "Tên cán bộ",
            dataIndex: "Tên cán bộ",
        },
        {
            width: "3%",
            title: "Tổ chức",
            dataIndex: "Tổ chức",
           
        },
        {
            width: "3%",
            title: "Tổng số NTD",
            dataIndex: "Tổng số NTD",
        },
        {
            width: "3%",
            title: "Số lượng nhà từ mạng xã hội( facebook ....)",
            dataIndex: "Số lượng nhà từ facebook",
        },
        {
            width: "3%",
            title: "Số lượng nhà từ nền tảng khác ( topcv,chợ tốt, ....)",
            dataIndex: "Số lượng nhà từ topcv",
        },
        {
            width: "3%",
            title: "Số lượng nhà đăng ký mạng xã hội( facebook ....)",
            dataIndex: "Số lượng nhà đăng ký facebook",
        },
        {
            width: "3%",
            title: "Số lượng nhà đăng tin mạng xã hội( facebook ....)",
            dataIndex: "Số lượng nhà đăng tin facebook",
        },
       
        {
            width: "3%",
            title: "Số lượng nhà đăng ký nền tảng khác ( topcv,chợ tốt, ....)",
            dataIndex: "Số lượng nhà đăng ký topcv",
        },
        {
            width: "3%",
            title: "Số lượng nhà đăng tin nền tảng khác ( topcv,chợ tốt, ....)",
            dataIndex: "Số lượng nhà đăng tin topcv",
        },
       
    ];
    return (
        <>
            <div className={styles.group_button}>
                <FilterNTD
                    isModalOpen={isModalFilter}
                    setIsModalOpen={setIsModalFilter}
                    fillStart={fillStart}
                    setFillStart={setFillStart}
                    fillEnd={fillEnd}
                    setFillEnd={setFillEnd}
                    handleFilter={handleFilter}
                    nv={nv}
                    setnv={setNv}
                    cusFrom={cusFrom}
                    setCusFrom={setCusFrom}
                    user={user}
                />
                <div className={styles.group_button_right}>
                    <div >
                        <button type="button" onClick={handleExportDataStaff}>Dữ liệu chia giỏ</button>
                    </div>
                    <div >
                        <button type="button" onClick={handleExportPhone}>Xuất số điện thoại</button>
                    </div>
                    <div >
                        <button type="button" onClick={handleExportEmail}>Xuất email</button>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: 20 }}>
                {/* <div style={{ margin: '8px' }}>Tổng số NTD: {listData.length}</div> */}
                <Table
                    loading={loading}
                    columns={Colums as any}
                    dataSource={listData}
                    bordered
                    scroll={{ x: '1600px' }}
                    pagination={{
                        style: { paddingBottom: 30, float: "left" },
                        current: current,
                        pageSize: 150,
                        onChange(page, pageSize) {
                            if (page != current) {
                                setcurrent(page);
                            }
                        },
                    }}
                />
                <Modal
                    title="Chi tiết"
                    open={isModalOpen}
                    width={600}
                    bodyStyle={{ maxHeight: '40vh', overflowY: 'auto' }}
                    footer={[
                        <Button key="submit" type="primary" onClick={() => setIsModalOpen(false)}>
                            OK
                        </Button>,
                    ]}
                >
                    <p>{textRecord}</p>
                </Modal>
            </div>
        </>
    );
};
export default DevideCart;
