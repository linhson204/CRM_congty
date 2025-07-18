import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
// import { TableRowSelection } from "antd/es/table/interface";

import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";



interface DataType {
    key: React.Key;
    order_Id: string;
    status: string;
    customer: string;
    value: number;
    order_date: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Id",
        width: 30,
        dataIndex: "_id",
        key: "_id",
        render: (text: any, record: any) => (
            <b>{text}</b>
        ),
    },
    {
        title: "Link",
        dataIndex: "link",
        key: "link",
        width: 80,
        render: (text: any, record: any) => (
            text ? <a href={text} style={{ color: 'grey' }}>{text}</a> : '#'
        ),
    },


    // {
    //     title: "Chức năng",
    //     key: "11",
    //     width: 150,
    //     fixed: "right",
    //     render: (text: any, record: any) => <OrderNewActionTable record={text} />,
    // },
];


// interface TableDataOrderProps {
//     setSelected: (value: boolean) => void;
//     setNumberSelected: any;
//     condition: any,
//     setCurrent: any;
//     current: number;
// }

const TableDataSaveList: React.FC<any> = ({
    setSelected,
    setNumberSelected,
    condition,
    setCurrent,
    current,
    total,
    setTotal
}: any) => {
    const [loading, setLoading] = useState(false);
    const [listData, setListData] = useState([]);
   

    // const [user, setUser] = useState(() => {
    //     const decodedToken = jwt_decode(Cookies.get("token_base365"))
    //     if (decodedToken && decodedToken['data']) {
    //         return decodedToken['data']
    //     }
    //     return undefined
    // })

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://api.timviec365.vn/api/crm/savelink/getSaveLinkPostCommentByAI`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify(condition),
            });
            const data = await response.json();
            console.log("DATA SAVE LIST", data);

            setLoading(false)
            if (data && data.data) {
                setTotal(data.data.totalCount)
                setListData(data.data.data);
       
            }
        };
        getData();
    }, [condition]);

    // const rowSelection: TableRowSelection<DataType> = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         if (selectedRows?.length > 0) {
    //             setSelected(true);
    //         } else {
    //             setSelected(false);
    //         }
    //     },
    //     onSelect: (record, selected, selectedRows) => {
    //         setNumberSelected(selectedRows?.length);
    //     },
    //     onSelectAll: (selected, selectedRows, changeRows) => { },
    // };

    const handlePageChange = (page) => {
        if (page !== current) {
            setCurrent(page);
        }
    };
    return (
        <div className="custom_table">
            <div className="flex_between" id="">
            </div>
            <Table
                columns={columns}
                dataSource={listData}
                bordered
                scroll={{ x: 100, y: 800 }}
                pagination={{
                    style: { paddingBottom: 30, float: "left" },
                    current: current,
                    total: total,
                    pageSize: 10,
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
};

export default TableDataSaveList;
