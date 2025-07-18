import React, { ReactNode, useEffect, useState } from "react";
import { Table, Pagination, Modal, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "../marketing/facebook/marketing.module.css";
import { DataType } from "../quet-ung-vien/scanner";
// import { wordBreak } from "html2canvas/dist/types/css/property-descriptors/word-break";
import { getToken } from "@/pages/api/api-hr/token";
// import TextArea from "antd/es/input/TextArea";
import jwt_decode from "jwt-decode";
import { ID_HUNGHA } from "@/constants/home-constants";

const { TextArea } = Input;

interface TableDataFacebookScanUIDPage {
  datanew: DataType[];
  loading: boolean;
}

const TableDataFacebookScanCandidate = ({ datanew, loading, handleEditNote }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalDetailProps, setModalDetailProps] = useState<{
    isOpen: boolean,
    title: string,
    content: string | ReactNode
  }>({
    isOpen: false,
    title: "",
    content: "",
  })
  const [modalEditProps, setModalEditProps] = useState({
    isOpen: false,
    content: "",
    id: 0,
  })
  const [isCtyHungHa, setIsCtyHungHa] = useState(false)

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      width: 40,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Link",
      width: 300,
      dataIndex: "Link",
      key: "Link",
      render: (text) => (
        <a href={text} target="_blank" style={{ wordBreak: "break-word" }}>
          {text}
        </a>
      ),
    },
    {
      title: "Ngày quét",
      width: 100,
      dataIndex: "timeScan",
      key: "timeScan",
    },
    {
      title: "Ghi chú",
      width: 400,
      dataIndex: "note",
      key: "note",
      ellipsis: true,
      render(value, record, index) {
        return (
          <>
            <span
              style={{
                cursor: "pointer"
              }}
              onClick={() => setModalDetailProps({
                isOpen: true,
                title: "Nội dung ghi chú",
                content: isCtyHungHa ?
                  <>
                    {value}
                    {!!record?.userNote && <p><i><strong>ID Người viết:</strong> {record?.userNote}</i></p>}
                    {!!record?.timeNote && <p><i><strong>Thời gian cập nhật:</strong> {record?.timeNote}</i></p>}
                  </>
                  :
                  value,
              })}
            >
              {value}
            </span>
          </>
        )
      },
    },
    {
      title: "Sửa",
      width: 70,
      dataIndex: "editNote",
      key: "editNote",
      fixed: "right",
      render(value, record, index) {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "20px",
                  cursor: "pointer"
                }}
                onClick={() => {
                  setModalEditProps({
                    id: record?.id,
                    content: record?.note,
                    isOpen: true,
                  })
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#4c5bd4" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" /></svg>
              </div>
            </div>
          </>
        )
      },
    }
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = datanew.slice(startIndex, startIndex + pageSize);

  const userType: any = getToken("role");
  useEffect(() => {
    const fetchDataType = async () => {
      console.log("userType", userType);
      const currentCookie = getToken("token_base365");
      if (currentCookie) {
        const decodedToken: any = await jwt_decode(currentCookie);
        if (decodedToken?.data.idQLC != ID_HUNGHA || Number(userType) != 1) {
          setIsCtyHungHa(false)
        } else {
          setIsCtyHungHa(true)
        }

      } else {
        const interval = setInterval(async () => {
          clearInterval(interval);
          fetchDataType();
        }, 500);
      }
    };
    fetchDataType();

    return () => { }
  }, [])


  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Table
          loading={loading}
          className="marketing_table_custom"
          columns={columns}
          dataSource={paginatedData}
          bordered
          pagination={false}
          scroll={{ x: 1000, y: 1000 }}
          footer={() => (
            <div className={styles.marketing_footer_table}>
              <div className={styles.pagesize}>
                <b>Hiển thị: </b>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageChange(1, Number(e.target.value))}
                >
                  <option value={10}>10 bản ghi trên trang</option>
                  <option value={20}>20 bản ghi trên trang</option>
                  <option value={30}>30 bản ghi trên trang</option>
                  <option value={40}>40 bản ghi trên trang</option>
                  <option value={50}>50 bản ghi trên trang</option>
                </select>
              </div>
              {/* <div className={styles.total}>
              <span>Tổng số: {datanew.length} Tài khoản</span>
            </div> */}
              <div className={styles.pagination}>
                <Pagination
                  showLessItems
                  size="small"
                  pageSize={pageSize}
                  current={currentPage}
                  total={datanew.length}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          )}
        />
      </div>

      <Modal
        open={modalDetailProps.isOpen}
        title={modalDetailProps.title}
        onCancel={() => setModalDetailProps({
          isOpen: false,
          title: "",
          content: "",
        })}
        closable={true}
        closeIcon={"X"}
        footer={
          <>
            <Button type="primary" onClick={() => {
              setModalDetailProps({
                isOpen: false,
                title: "",
                content: "",
              })
            }}>Đóng</Button>
          </>
        }
      >
        {modalDetailProps.content}
      </Modal>

      <Modal
        open={modalEditProps.isOpen}
        title="Sửa ghi chú"
        closable={false}
        footer={
          <>
            <Button
              onClick={() => {
                setModalEditProps({
                  id: 0,
                  content: "",
                  isOpen: false
                })
              }}
            >
              Hủy
            </Button>
            <Button
              type='primary'
              onClick={() => {
                if (!!handleEditNote) {
                  handleEditNote(modalEditProps.content, modalEditProps.id)
                }
                setModalEditProps({
                  id: 0,
                  content: "",
                  isOpen: false
                })
              }}
            >
              Sửa
            </Button>
          </>
        }
      >
        <TextArea
          value={modalEditProps.content}
          onChange={(e) => {
            setModalEditProps((prev) => ({
              ...prev,
              content: e.target.value
            }))
          }}
          rows={10}
        />
      </Modal>
    </>
  );
};

export default TableDataFacebookScanCandidate;
