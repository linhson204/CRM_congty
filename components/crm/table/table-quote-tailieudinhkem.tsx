import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, MenuProps, Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import DelTLDK from "../quote/quote_action_modal/mdal_delete_TLDK";
import { useRouter } from "next/router";
import { useFormData } from "../context/formDataContext";
import { axiosCRM } from "@/utils/api/api_crm";
import { convertFileSize, convertTimestampToDate } from "@/utils/function";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
// import { TableRowSelection } from "antd/es/table/interface";

interface TableDataCampaignProps {
  keyword: string
}

const TableAddTLDK: React.FC<TableDataCampaignProps> = (props: any) => {
  const { formData, setFormData, handleRecall } = useContext(useFormData);
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [record, setRecord] = useState<any>({});
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [listDocument, setListDocument] = useState<any>([]);
  const [linkDocument, setLinkDocument] = useState("");

  const [keyword, setKeyword] = useState(props && props.hasOwnProperty('keyword') ? props.keyword : '')

  useEffect(() => {
    setKeyword(props.keyword)
  }, [props])

  useEffect(() => {
    axiosCRMCall
      .post("/quote/list-attachment", {
        ...formData,
        quote_id: id,
        page: page,
        pageSize: pageSize,
        file_name: keyword
      })
      .then((response) => {
        setTotal(response.data.data.total);
        handleDataTable(response.data.data.data);
      })
      .catch((err) => console.log("err", err));
  }, [formData.recall, page, pageSize]);

  const onClose = () => {
    setIsCancelOpen(false);
  };

  const handleDataTable = (datas) => {
    datas &&
      setListDocument(
        datas.map((item: any, index: number) => ({
          key: index,
          stt: (page - 1) * pageSize + index + 1,
          // file_name: item.file_name.split("file-")[1],
          file_name: item.original_name,
          user_name: item.user_created_id ? item.user_created_id.userName : "Chưa trả ra",
          created_at: convertTimestampToDate(item.created_at),
          file_size: convertFileSize(item.file_size),
          linkFile: item.linkFile,
          id: item.id,
        }))
      );
  };

  const handleAddDB = () => { };

  interface DataType {
    key: React.Key;
    stt: string;
    id: number;
    file_name: string;
    user_name: string;
    file_size: string;
    created_at: string;
    linkFile: string;
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          href={linkDocument}
          style={{ display: "flex", fontSize: 15 }}
          target="_blank"
          download
          // download={linkDocument.split('/').pop()}
        >
          <i className="bi bi-download" />
          &nbsp; &nbsp; <p>Tải xuống</p>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          onClick={() => setIsCancelOpen(true)}
        >
          <img src="/crm/icon-delete-black.svg" alt="" />
          &nbsp; &nbsp; <p>Xóa</p>
        </div>
      ),
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên tài liệu",
      width: 300,
      dataIndex: "file_name",
      key: "file_name",
      render: (text: any, record) => (
        <Link href={record.linkFile}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Người đính kèm",
      width: 200,
      dataIndex: "user_name",
      key: "user_name",
      render: (text: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/crm/user_kh.png"></img>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Ngày đính kèm",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Dung lượng",
      dataIndex: "file_size",
      key: "file_size",
      width: 100,
      render: (text) => <div>{text}</div>,
    },

    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 80,
      fixed: "right",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <div>
            <Dropdown
              overlayStyle={{ margin: "-10px -10px" }}
              trigger={["click"]}
              menu={{ items }}
              placement="bottomLeft"
            >
              <div
                onClick={() => {
                  handleSelect(record);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  cursor: "pointer",
                  gap: 5,
                }}
              >
                <img style={{ cursor: "pointer" }} src="/crm/icon_1.svg" />
                <div>Chức năng</div>
              </div>
            </Dropdown>
          </div>
        </div>
      ),
    },
  ];
  const handleSelect = (record: DataType) => {
    // Vì lý do nào đó, link file bị lỗi nên cần sửa lại
    setLinkDocument('http://210.245.108.202:3007' + record.linkFile.replace(/^undefined/, ''));
    setRecord(record);
  };
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={listDocument}
        pagination={{
          total: total,
          pageSize: pageSize,
          onChange(page, pageSize) {
            setPage(page);
          },
        }}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: "100%", y: 600 }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(e) => {
              setPageSize(Number(e.target.value)), setPage(1);
            }}
            className="show_item"
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          {/* Tổng số: <b>{data.length}</b> Tài liệu đính kèm */}
        </div>
        <DelTLDK
          record={record}
          isModalCancel={isCancelOpen}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default TableAddTLDK;
