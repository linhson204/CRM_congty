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

const NTDRegisterGoldenPage = (props: Props) => {
    const router = useRouter();
    const { nhanvien, nguon, create_at_s, create_at_e } = router.query as { nhanvien: string, nguon: string, create_at_s: string, create_at_e: string };
    const [user, setUser] = useState(() => {
        const decodedToken = jwt_decode(Cookies.get("token_base365"))
        if (decodedToken && decodedToken['data']) {
            return decodedToken['data']
        }
        return undefined
    })
    const [listData, setListData] = useState([]);
    const [textRecord, setTextRecord] = useState('');
    const [total,setTotal] = useState(0);
    //page hien tai
    const [current, setcurrent] = useState(1);
    // tong so ban ghi
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFilter, setIsModalFilter] = useState(false);
    const [fillStart, setFillStart] = useState<any>(() => {
        if (!create_at_s) return undefined
        return create_at_s.split(' ')[0]
    });
    const [fillEnd, setFillEnd] = useState<any>(() => {
        if (!create_at_e) return undefined
        return create_at_e.split(' ')[0]
    });
    const [nv, setNv] = useState(() => {
        if (user?.type === 1) {
            return nhanvien
        }
        else {
            return `${user.idQLC} - ${user.userName}`
        }
    })
    const [cusFrom, setCusFrom] = useState(nguon)
    const [condition, setCondition] = useState(() => {
        const query = {};
        if (user?.type === 1) {
            if (nhanvien) query['emp_id'] = Number(nhanvien.split(' ')[0]);
        } else {
            query['emp_id'] = user.idQLC;
        }
        // if (nguon) query['cus_from'] = nguon;
        if (create_at_e) {
            query['create_at_e'] = create_at_e;
        }
        if (create_at_s) {
            query['create_at_s'] = create_at_s;
        }
        query['page'] = current;
        query['perPage'] = 10;
        query['origin_from'] = 'golden_page';
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
            param += `create_at_s=${fillStart}&`
        }
        if (fillEnd) {
            param += `create_at_e=${fillEnd}&`
        }
        param !== '' ? router.push(`?${param}`) : router.push('')
    }
    const handleExportDataStaff = () => {
   
        const getData = async () => {
            const currentDate = new Date()
            // Đặt giờ, phút, giây và mili giây thành 0
            currentDate.setHours(0, 0, 0, 0)
            let startTime = currentDate.getTime();
            let pre_condition = JSON.parse(condition);
            if(!pre_condition['create_at_s']){
                pre_condition['create_at_s'] = startTime ;
            };
            pre_condition['perPage'] = 10000;
            const response = await fetch(`https://api.timviec365.vn/api/crm/customer/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(pre_condition),
            });
            let data = await response.json();
            data = data.data;
            let data_final = [];
            console.log("Bắt đầu vòng for...")
            for(let i = 0; i< data.length; i++){
                let data_single = data[i];
                let emp_id = data_single.emp_id;
                let listData_single = data.filter((e: any)=> e.emp_id == emp_id);
                let count = listData_single.length;
                let check = data_final.find((e:any) => e.Id == emp_id);
                if(!check){
                    data_final.push({
                        Id:emp_id,
                        "Tên cán bộ":listData_single[0].userName,
                        "Số lượng":count
                    });
                }
            };
            let nameFile = `Danh sách chia giỏ nhà tuyển dụng đăng ký(topcv).xlsx`;
            downloadExcel(data_final,nameFile);
        };
        getData();
        
        
    }
    const handleExportDataCustomer = () => {
   
        const getData = async () => {
            let pre_condition = JSON.parse(condition);
            if(!pre_condition['create_at_s']){
                const currentDate = new Date()
                let startTime = currentDate.getTime();
                pre_condition['create_at_s'] = startTime ;
            }
            const response = await fetch(`https://api.timviec365.vn/api/crm/customer/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify({
                    ...pre_condition,perPage:100000
                }),
            });
            let data = await response.json();
            data = data.data;
            console.log(data);
            let data_final = [];
            for(let i = 0; i< data.length; i++){
                let data_single = data[i];
                data_final.push({
                    "Thời gian":data_single.created_at,
                    "Tên cty":data_single.name,
                    "Số điện thoại":data_single.phone_number || data_single.email,
                    "Tên facebook":data_single.name,
                    "Link chi tiết CRM":`https://hungha365.com/crm/customer/detail/${data_single.cus_id}`
                });
            };
            let nameFile = `Danh sách nhà tuyển dụng đăng ký topcv.xlsx`;
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
        const query = {};
        if (user?.type === 1) {
            if (nhanvien) query['emp_id'] = Number(nhanvien.split(' ')[0]);
        } else {
            query['emp_id'] = user.idQLC;
        }
        // if (nguon) query['cus_from'] = nguon;
        if (create_at_s) {
            query['create_at_s'] = create_at_s;
        }
        if (create_at_e) {
            query['create_at_e'] = create_at_e;
        }
        query['page'] = current;
        query['perPage'] = 10;
        // query['cus_from'] = 'topcv';
        query['original_from'] = 'golden_page';
        setCondition(JSON.stringify(query));
    }, [current, create_at_s, create_at_e]);

    useEffect(() => {
        console.log("condition", condition);
        const currentDate = new Date()
        // Đặt giờ, phút, giây và mili giây thành 0
        currentDate.setHours(0, 0, 0, 0)
        let startTime = currentDate.getTime();
        let pre_condition = JSON.parse(condition);
        if(!pre_condition['create_at_s']){
            pre_condition['create_at_s'] = startTime ;
        }
        const getData = async () => {
            const response = await fetch(`https://api.timviec365.vn/api/crm/customer/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(pre_condition),
            });
           
            const data = await response.json();
            console.log("DATA RES", data.data);
            setLoading(false)
            if (data && data.data) {
                setListData(data.data);
                setTotalRecords(1000);
                // setTotal()
            }
            const res2 = await fetch(`https://api.timviec365.vn/api/crm/customer/countKH`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(pre_condition),
              });
            const data2 = await res2.json();
            setTotalRecords(data2?.total);
        };
        getData();
    }, [condition]);

    const Colums = [
        {
            width: "5%",
            title: "STT",
            render: (text: any, record: any, index: any) => index + 1 + (current - 1) * 10,
        },
        {
            width: "5%",
            title: "Mã khách hàng",
            dataIndex: "cus_id",
            render: (text: any, record: any, index: any) => (
                <Link
                    href={`/nha-tuyen-dung/detail/${record.cus_id}`}
                    target="_blank"
                >
                    {record.cus_id}
                </Link>
            )
        },
        {
            width: "10%",
            title: "Tên khách hàng",
            dataIndex: "name",
        },
        {
            width: "15%",
            title: "Chuyên viên phụ trách",
            dataIndex: "userName",

        },
        {
            width: "10%",
            title: "Số điện thoại",
            dataIndex: "phone_number",
        },
        {
            width: "10%",
            title: "Email",
            dataIndex: "email",
        },
        {
            width: "10%",
            title: "Nguồn khách hàng",
            dataIndex: "cus_from",
        },
        {
            width: "10%",
            title: "Thời gian",
            dataIndex: "created_at",
        },
    ];

    const handlePageChange = (page) => {
        if (page !== current) {
            setcurrent(page);
        }
    };
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
                        <button type="button" onClick={handleExportDataCustomer}>Xuất dữ liệu khách hàng</button>
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
                <div style={{ margin: '8px' }}>Tổng số NTD: {totalRecords}</div>
                <Table
                    loading={loading}
                    columns={Colums as any}
                    dataSource={listData}
                    bordered
                    scroll={{ x: '1600px' }}
                    pagination={{
                        style: { paddingBottom: 30, float: "left" },
                        current: current,
                        total: totalRecords,
                        pageSize: 10,
                        onChange: handlePageChange,
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
export default NTDRegisterGoldenPage;
