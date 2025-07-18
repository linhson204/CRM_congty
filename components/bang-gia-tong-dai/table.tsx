import React from "react";
import styles from "./styles-table.module.scss";
import { Button, Checkbox, Table } from "antd";
import { columns, columns1, columns2 } from "./column";
import { data, data1, data2 } from "./data";
import type { TableProps } from "antd";

interface RecordType {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address1: string;
    address2: string;
    address3: string;
}

const TableBangGiaTongDai: any = () => {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div
                    style={{
                        marginBottom: "24px",
                    }}
                >
                    <h2 className={styles.title}>
                        {" "}
                        <span>BẢNG TÍNH NĂNG TỔNG ĐÀI</span> ĐA KÊNH THÔNG MINH
                    </h2>
                </div>
                <div className={styles.table}>
                    {" "}
                    <Table
                        columns={columns}
                        bordered={true}
                        dataSource={data}
                        scroll={{
                            x: 1024,
                        }}
                        pagination={false}
                    />{" "}
                </div>
                <div
                    style={{
                        marginBottom: "24px",
                    }}
                >
                    <h2 className={styles.title}>
                        <span>BIỂU PHÍ</span> THIẾT LẬP TỔNG ĐÀI
                    </h2>
                </div>
                <div className={styles.table}>
                    {" "}
                    <Table
                        columns={columns1}
                        dataSource={data1}
                        bordered={true}
                        scroll={{
                            x: 1024,
                        }}
                        pagination={false}
                    />{" "}
                </div>
                <div
                    style={{
                        marginBottom: "24px",
                    }}
                >
                    <h2 className={styles.title}>
                        <span>BẢNG GIÁ</span> GÓI HỖ TRỢ
                    </h2>
                </div>
                <div className={styles.table_wrapper}>
                    <div className={styles.table1}>
                        <div className={styles.table_content}>
                            {" "}
                            <Table
                                columns={columns2}
                                showHeader={false}
                                dataSource={data2}
                                pagination={false}
                                bordered={true}
                                scroll={{
                                    x: 1024,
                                }}
                            />{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TableBangGiaTongDai;
