import { CloseOutlined } from "@ant-design/icons";
import { Button, message, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

const { confirm } = Modal;

interface DataType {
    key: React.Key;
    _id: string;
    status: string;
    customer: string;
    value: number;
    order_date: string;
}

interface DataTypeReport {
    userIdReport: String;
    contentReport: string;
}


const columns: ColumnsType<DataType> = [
    {
        title: "Id bài viết",
        width: 140,
        dataIndex: "_id",
        key: "_id",
        render: (text: any, record: any) => (
            <b>{text}</b>
        ),
    },
    {
        title: "Nội dung bài viết",
        key: "contentPost",
        dataIndex: "contentPost",
        width: 500,
        render: (text: any, record: any) => (
            <b style={{ color: 'grey' }}>{text}</b>
        ),
    },
    {
        title: "Người đăng",
        dataIndex: "userName",
        key: "userName",
        width: 160,
        render: (text: any, record: any) => (
            <b style={{ color: 'grey' }}>{text}</b>
        ),
    },
    {
        title: "Trạng thái",
        dataIndex: "statusPost",
        key: "statusPost",
        width: 100,
        render: (text: any, record: any) => {
            let statusText;
            let color;
            switch (text) {
                case "forcehidden":
                    statusText = "Bài viết chứa từ khóa nhạy cảm";
                    color = "red";
                    break;
                case "reported":
                    statusText = "Bài viết bị nhiều tố cáo";
                    color = "orange";
                    break;
                case "rejected":
                    statusText = "Bài viết bị từ chối";
                    color = "grey";
                    break;
                default:
                    statusText = "Không xác định";
                    color = "black";
            }
            return <b style={{ color }}>{statusText}</b>;

        }
    },

    {
        title: "Thời gian",
        dataIndex: 'createAt',
        key: "createAt",
        width: 120,
        render: (timestamp) => {
            const formattedDate = new Date(timestamp).toLocaleDateString("en-GB");
            return <p>{formattedDate}</p>;
        },
    },
];

const columnsreport: ColumnsType<DataTypeReport> = [
    {
        title: "Người tố cáo",
        dataIndex: "userIdReport",
        key: "userIdReport",
        width: 60,
        render: (text: any, record: any) => (
            <b style={{ color: 'grey' }}>{text}</b>
        ),
    }, {
        title: "Nội dung tố cáo",
        dataIndex: "contentReport",
        key: "contentReport",
        width: 200,
        render: (text: any, record: any) => (
            <b style={{ color: 'grey' }}>{text}</b>
        ),
    },
];

interface TableDataOrderProps {
    condition: any,
}

const TableApprovePost: React.FC<TableDataOrderProps> = ({
    condition,
}: any) => {
    const [loading, setLoading] = useState(false);
    const [listData, setListData] = useState([]);
    const [listReport, setListReport] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [user, setUser] = useState(() => {
        const decodedToken = jwt_decode(Cookies.get("token_base365"))
        if (decodedToken && decodedToken['data']) {
            return decodedToken['data']
        }
        return undefined
    })

    const getData = async () => {
        const response = await fetch(`https://api.timviec365.vn:9015/api/personal/getPostContentToxic`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token_base365")}`,
            },
            body: condition,
        });
        const data = await response.json();
        console.log("DATA RES CVIEN", data?.data?.result);
        setLoading(false)
        if (data && data.data && data.data.result) {
            setListData(data.data.result);
        }
    };

    const getDataReport = async (post_id: string) => {
        const response = await fetch(`https://api.timviec365.vn:9015/api/personal/getRepotedPostByUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token_base365")}`,
            },
            body: JSON.stringify({ id_post: post_id }),
        });
        const data = await response.json();
        console.log("DATA RES REPORT", data?.data[0]?.reports);
        setLoading(false)
        if (data && data.data && data?.data[0]?.reports) {
            setListReport(data?.data[0]?.reports);
        }
    };

    useEffect(() => {
        console.log("condition", condition)
        getData();
    }, [condition]);

    useEffect(() => {
        if (isModalVisible && selectedPost?.statusPost == "reported") {
            getDataReport(selectedPost._id);
        }
    }, [isModalVisible, selectedPost]);

    const handlePageChange = (page) => {
    };

    const handleRowClick = (record) => {
        setSelectedPost(record); // Lưu bài viết được chọn
        setIsModalVisible(true); // Hiển thị modal
    };

    const handleModalClose = () => {
        setIsModalVisible(false); // Đóng modal
        setSelectedPost(null); // Xóa bài viết được chọn
    };

    const getStatusDetails = (status) => {
        switch (status) {
            case "forcehidden":
                return { text: "Bài viết chứa từ khóa nhạy cảm", color: "red" };
            case "reported":
                return { text: "Bài viết bị nhiều tố cáo", color: "orange" };
            case "rejected":
                return { text: "Bài viết bị từ chối", color: "grey" };
            default:
                return { text: "Không xác định", color: "black" };
        }
    };

    const showConfirm = (action: "accept" | "reject", postId: string) => {
        confirm({
            title: action === "accept" ? "Xác nhận duyệt bài viết?" : "Xác nhận từ chối bài viết?",
            content: `Bạn có chắc muốn ${action === "accept" ? "duyệt" : "từ chối"} bài viết với ID: ${postId}?`,
            okText: "Xác nhận",
            cancelText: "Hủy",
            closeIcon: <CloseOutlined style={{ fontSize: '16px', color: 'red' }} />,
            onOk: async () => {
                try {
                    if (action === "accept") {
                        await handleApprove(postId);
                        getData();

                    } else {
                        handleReject(postId);
                        getData();
                    }
                } catch (error) {
                    message.error("Đã xảy ra lỗi. Vui lòng thử lại!");
                }

            },
            onCancel: () => {
                console.log("Đã hủy hành động");
                message.info("Đã hủy hành động!");
            },
        });
    };

    const handleApprove = async (postId: string) => {
        const response = await fetch(`https://api.timviec365.vn:9015/api/personal/approvePostByAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token_base365")}`,
            },
            body: JSON.stringify({ id_post: postId, state: "accept" }),
        });
        const data = await response.json();
        console.log("DATA duyệt:", data);
        if (data && data.success == true) {
            message.success("Duyệt bài viết thành công!");
            setIsModalVisible(false);
        } else {
            message.error("Đã có lỗi xảy ra, vui lòng thử lại");
            setIsModalVisible(false);
        }

    };

    const handleReject = async (postId: string) => {
        const response = await fetch(`https://api.timviec365.vn:9015/api/personal/approvePostByAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token_base365")}`,
            },
            body: JSON.stringify({ id_post: postId, state: "reject" }),
        });
        const data = await response.json();
        console.log("DATA reject:", data);
        if (data && data.success == true) {
            message.success("Từ chối bài viết thành công!");
            setIsModalVisible(false);
        } else {
            message.error("Đã có lỗi xảy ra, vui lòng thử lại");
            setIsModalVisible(false);
        }
    };


    const renderModalContent = () => {
        if (!selectedPost) return null;
        const { text: statusText, color } = getStatusDetails(selectedPost.statusPost);

        return (
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <p style={{ marginBottom: '10px' }}>
                    <b style={{ color: '#555', fontSize: '14px' }}>ID bài viết:</b>
                    <span style={{ marginLeft: '10px', fontSize: '14px', color: '#000' }}>{selectedPost._id}</span>
                </p>
                <p style={{ marginBottom: '10px' }}>
                    <b style={{ color: '#555', fontSize: '14px' }}>Nội dung bài viết:</b>
                    <span style={{ marginLeft: '10px', fontSize: '14px', color: '#333' }}>{selectedPost.contentPost}</span>
                </p>
                <p style={{ marginBottom: '10px' }}>
                    <b style={{ color: '#555', fontSize: '14px' }}>Người đăng:</b>
                    <span style={{ marginLeft: '10px', fontSize: '14px', color: '#333' }}>{selectedPost.userName}</span>
                </p>
                <p style={{ marginBottom: '10px' }}>
                    <b style={{ color: '#555', fontSize: '14px' }}>Trạng thái:</b>
                    <span style={{ marginLeft: '10px', fontWeight: 'bold', color }}>{statusText}</span>
                </p>
                <p style={{ marginBottom: '10px' }}>
                    <b style={{ color: '#555', fontSize: '14px' }}>Thời gian:</b>
                    <span style={{ marginLeft: '10px', fontSize: '14px', color: '#333' }}>
                        {new Date(selectedPost.createAt).toLocaleString()}
                    </span>
                </p>


                {selectedPost.statusPost == "reported" ?
                    <Table
                        columns={columnsreport}
                        dataSource={listReport}
                        // rowSelection={{ ...rowSelection }}
                        bordered
                        scroll={{ x: 200, y: 400 }}

                    /> : <div></div>}

                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <Button
                        style={{ marginRight: '10px' }}
                        type="default"
                        onClick={() => showConfirm("reject", selectedPost._id)}
                        disabled={selectedPost.statusPost === "rejected"}
                    >
                        Từ chối
                    </Button>

                    <Button
                        type="primary"
                        style={{ marginRight: '10px' }}
                        onClick={() => showConfirm("accept", selectedPost._id)}
                        disabled={selectedPost.statusPost === "rejected"}
                    >
                        Duyệt
                    </Button>
                </div>
            </div>

        );
    };

    return (
        <div className="custom_table">
            <Table
                columns={columns}
                dataSource={listData}
                // rowSelection={{ ...rowSelection }}
                bordered
                scroll={{ x: 1500, y: 1200 }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record), // Xử lý khi nhấp vào dòng
                })}
                pagination={{
                    style: { paddingBottom: 30, float: "left" },
                    pageSize: 10,
                    onChange: handlePageChange,
                }}
            />

            <Modal
                title="Chi tiết bài viết"
                visible={isModalVisible}
                onCancel={handleModalClose}
                closable={true}
                footer={null}

            >
                {renderModalContent()}
            </Modal>
        </div>
    );
};

export default TableApprovePost;
