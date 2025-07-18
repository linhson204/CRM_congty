import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Dropdown, MenuProps, Spin, Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import Link from "next/link";
import DelTLDK from "../quote/quote_action_modal/mdal_delete_TLDK";
import DelDSCS from "../quote/quote_action_modal/mdal-delete_DSCS";
import useLoading from "../hooks/useLoading";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { QuoteContext } from "../quote/quoteContext";
import { axiosQLC } from "@/utils/api/api_qlc";
// import { TableRowSelection } from "antd/es/table/interface";

interface TableDataTLCS {
  shouldFetch: boolean,
  keyword: string,
  setShouldFetch: (value: boolean) => void
}

const TableTLChiaSe: React.FC<TableDataTLCS> = ({
  shouldFetch,
  keyword = '',
  setShouldFetch
}) => {
  const { recordId, getPropOrDefault } = useContext(QuoteContext)
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [key, setKey] = useState();

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [tableData, setTableData] = useState<DataType[]>([])
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [total, setTotal] = useState(0)

  const handlePerPage = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value) || 10)
    setPage(1)
    // await fetchData()
    setShouldFetch(true)
  }

  const handlePageChange = async (pagination: TablePaginationConfig) => {
    setPage(pagination.current)
    // await fetchData()
    setShouldFetch(true)
  }

  const handleChangeRole = async (user_id: number, role: number) => {
    await axiosCRMCall
      .post('/quote/share', { quote_id: recordId, user_id: user_id, role: role })
      .then(res => {
        // console.log(res)
        stopLoading()
        setShouldFetch(true)
      })
      .catch(e => { console.log(e); })
  }

  useEffect(() => {
    if (shouldFetch) {
      fetchData()
      setShouldFetch(false)
    }
  }, [shouldFetch])

  const fetchData = useCallback(
    async () => {
      startLoading()
      let listEmp = []
      await axiosQLC
        .post('/managerUser/listUser', { ep_status: "Active", pageSize: 1000000 })
        .then(res => {
          // console.log(getPropOrDefault(res, 'data.data.items', []))
          listEmp = getPropOrDefault(res, 'data.data.data', [])
          console.log(listEmp)
          // stopLoading()
        })
        .catch(e => { console.log(e); stopLoading(); })

      await axiosCRMCall
        .post('/quote/listRole', { quote_id: recordId, page: page, perPage: perPage, keyword: keyword })
        .then(res => {
          const data = getPropOrDefault(res, 'data.data.data', [])
          let tempData = []
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const emp = listEmp.find(emp => emp.ep_id === Number(getPropOrDefault(element, 'user_id.idQLC', 0)))
            const role: DataType = {
              key: i + 1,
              name: getPropOrDefault(element, 'user_id.userName', 'Chưa cập nhật'),
              status: getPropOrDefault(element, 'role', 1),
              type: getPropOrDefault(element, 'user_id.type', 0),
              userId: getPropOrDefault(element, 'user_id.idQLC', 0),
              dep: getPropOrDefault(emp, 'organizeDetailName', 'Không có')
            }
            tempData.push(role)
          }
          setTableData(tempData)
          setTotal(getPropOrDefault(res, 'data.data.total', 0))
          stopLoading()
        })
        .catch((e) => {
          console.log(e)
          setTableData([])
          setTotal(0)
          stopLoading()
        })
    },
    [page, perPage, keyword, recordId],
  )

  // const fetchData = async () => {
  //   startLoading()
  //   let listEmp = []
  //   await axiosQLC
  //     .post('/managerUser/listUser', { ep_status: "Active", pageSize: 1000000 })
  //     .then(res => {
  //       // console.log(getPropOrDefault(res, 'data.data.items', []))
  //       listEmp = getPropOrDefault(res, 'data.data.data', [])
  //       console.log(listEmp)
  //       // stopLoading()
  //     })
  //     .catch(e => { console.log(e); stopLoading(); })

  //   await axiosCRMCall
  //     .post('/quote/listRole', { quote_id: recordId, page: page, perPage: perPage, keyword: keyword })
  //     .then(res => {
  //       const data = getPropOrDefault(res, 'data.data.data', [])
  //       let tempData = []
  //       for (let i = 0; i < data.length; i++) {
  //         const element = data[i];
  //         const emp = listEmp.find(emp => emp.ep_id === Number(getPropOrDefault(element, 'user_id.idQLC', 0)))
  //         const role: DataType = {
  //           key: i + 1,
  //           name: getPropOrDefault(element, 'user_id.userName', 'Chưa cập nhật'),
  //           status: getPropOrDefault(element, 'role', 1),
  //           type: getPropOrDefault(element, 'user_id.type', 0),
  //           userId: getPropOrDefault(element, 'user_id.idQLC', 0),
  //           dep: getPropOrDefault(emp, 'organizeDetailName', 'Không có')
  //         }
  //       }
  //       stopLoading()
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //       setTableData([])
  //       stopLoading()
  //     })
  // }

  const onClose = () => {
    setIsCancelOpen(false);
  };
  const handleAddDB = () => {
  };
  interface DataType {
    key: React.Key;
    // number: string;
    name: string;
    status: number;
    type: number;
    // address: string;
    // order_status: string;
    dep: string;
    userId: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Loại đối tượng",
      width: 100,
      dataIndex: "type",
      key: "type",
      render: (text: any, record: any) => (
        <div>
          <b>{Number(text) === 2 ? 'Nhân viên' : (Number(text) === 1 ? 'Công ty' : 'Chưa cập nhật')}</b>
        </div>
      ),
    },
    {
      title: "Tên đối tượng",
      width: 200,
      dataIndex: "name",
      key: "name",
      render: (text: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/crm/user_kh.png"></img>
          <div
            style={{ marginLeft: '5px' }}
          >{text}</div>
        </div>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "dep",
      key: "dep",
      width: 200,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Quyền",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text, record) => (
        <div style={{ width: "100%" }}>
          <select
            style={{ width: "90%", height: 30 }}
            value={Number(text) || 1}
            onChange={(e) => handleChangeRole(record.userId, Number(e.target.value))}
          >
            <option value="1">Xem</option>
            <option value="2">Sửa</option>
            <option value="3">Toàn quyền</option>
          </select>
        </div>
      ),
    },

    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 80,
      fixed: "right",
      render: (text: any, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Button
            onClick={() => handleSelect(record.userId)}
            style={{ display: "flex", gap: 3, color: "red", border: "none " }}
          >
            <div>
              <img src="/crm/del_red.svg" alt="" />
            </div>
            <div>Gỡ bỏ</div>
          </Button>
        </div>
      ),
    },
  ];
  // const data: DataType[] = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i + 1,
  //     // number: `Lịch hẹn - Nguyễn Thị Hòa${i}`,
  //     name: "Nguyễn Trần Kim Phượng",
  //     status: 1,
  //     type: 1,
  //     // address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
  //     // order_status: `Chưa gửi`,
  //     dep: "Phòng 3",
  //     userId: i,
  //   });
  // }
  const handleSelect = (value: any) => {
    setIsCancelOpen(true);
    setKey(value);
  };
  return (
    <div className="custom_table campaign_tble">
      {isLoading &&
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />}
      <Table
        columns={columns}
        dataSource={tableData}
        // dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: "100%", y: "100%" }}
        pagination={{
          current: page,
          pageSize: perPage,
          total: total
        }}
        onChange={handlePageChange}
      />
      <div
        className="main__footer flex_between"
        id=""
        style={{
          position: 'relative',
          bottom: 0
        }}
      >
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            className="show_item"
            value={perPage}
            onChange={handlePerPage}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{total}</b> Danh sách chia sẻ
        </div>
        <DelDSCS record={key} isModalCancel={isCancelOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default TableTLChiaSe;
