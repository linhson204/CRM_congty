import { Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import exportToExcel from "../../ultis/export_xlxs";
import { useSelector } from "react-redux";
import FilterThongKe from "./fillterThongKe";
import { base_url } from "../../service/function";
import { useDispatch } from "react-redux";
const Cookies = require("js-cookie");
import { useRouter } from "next/router";
type Props = {};

const Recording = (props: Props) => {
  const router = useRouter();
  const { pb, timeStart, timeEnd } = router.query as { pb: string, timeStart: string, timeEnd: string };
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phongban, setPhongban] = useState(pb);
  let [datane, setDatane] = useState([]);
  const [data, setData] = useState([]);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };

  const [fillStart, setFillStart] = useState<any>(() => {
    if (!timeStart) return undefined
    return timeStart.split(' ')[0]
  });
  const [fillEnd, setFillEnd] = useState<any>(() => {
    if (!timeEnd) return undefined
    return timeEnd.split(' ')[0]
  });
  const [listNV, setListNV] = useState([]);
  const [condition, setCondition] = useState(() => {
    const query = { token: Cookies.get("token_base365") }
    if (timeStart) {
      query["timeStart"] = timeStart
    }
    if (timeEnd) {
      query["timeEnd"] = timeEnd
    }
    return JSON.stringify(query)
  })

  const [listLine, setlistLine] = useState([]);
  const [listPB, setlistPB] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilter = async () => {
    let param = ''
    if (phongban) {
      param += `pb=${phongban}&`
    }
    if (fillStart) {
      param += `timeStart=${fillStart}&`
    }
    if (fillEnd) {
      param += `timeEnd=${fillEnd}&`
    }
    param !== '' ? router.push(`?${param}`) : router.push('')
  }

  const handleExportToExcel = () => {
    const tmp = data.filter(e => e.nameDeparment != null)
    tmp.sort((a, b) => a.nameDeparment.localeCompare(b.nameDeparment))
    const datas = tmp.map(item => {
      return {
        "Số gọi": item.caller,
        "Người phụ trách": item.name,
        "Tổ chức": item.nameDeparment,
        "Tổng số cuộc gọi": item.countSDT,
        "Tổng số trả lời": item.countStatus,
        "Tổng số không trả lời": item.nocountStatus,
        "Tổng thời gian gọi": item.ring_duration,
        "Trung bình cuộc gọi": item.adv
      }
    })
    const filename = "Thống kê tổng đài.xlsx";
    const sheetName = "Thống kê tổng đài";
    const columnHeaders = [
      "Số gọi",
      "Người phụ trách",
      "Tổ chức",
      "Tổng số cuộc gọi",
      "Tổng số trả lời",
      "Tổng số không trả lời",
      "Tổng thời gian gọi",
      "Trung bình cuộc gọi",
    ];
    exportToExcel(datas, filename, sheetName, columnHeaders);
  };

  const handleGet = async () => {
    try {
      const response = await fetch(`https://voip.timviec365.vn/api/thongke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: condition,
      });
      const data = await response.json();
      setLoading(false)
      if (data && data.data && data.data.data) {
        if (pb && pb !== '') {
          let tmp = data.data.data.filter((item) => {
            return item.nameDeparment === pb;
          });
          setDatane(tmp);
        }
        else {
          setDatane(data.data.data)
        }
        setData(data.data.data);
      }
    } catch (error) { }
  };
  useEffect(() => {
    handleGet();
  }, []);
  const Colums = [
    {
      width: 50,
      title: "Số gọi",
      dataIndex: "caller",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: 150,
      title: "Người phụ trách",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <div>
          {record.idQLC !== 0 && (
            <div>{record.idQLC} - {record.name}</div>
          )}
        </div>
      ),
    },
    {
      width: 200,
      title: "Tổ chức",
      dataIndex: "nameDeparment",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 100,
      title: "Tổng số cuộc gọi",
      dataIndex: "countSDT",
      sorter: (a, b) => a.countSDT - b.countSDT,
    },
    {
      width: 100,
      title: "Tổng số đã trả lời",
      dataIndex: "countStatus",
      sorter: (a, b) => a.countStatus - b.countStatus,
    },
    {
      width: 100,
      title: "Tổng số không trả lời",
      dataIndex: "nocountStatus",
      sorter: (a, b) => a.nocountStatus - b.nocountStatus,
    },
    {
      width: 100,
      title: "Tổng thời gian gọi (s)",
      dataIndex: "ring_duration",
      render: (text: any, record: any) => <div>{text}s</div>,
      sorter: (a, b) => a.ring_duration - b.ring_duration,
    },
    {
      width: 100,
      title: "Trung bình cuộc gọi (s/ cuộc gọi)",
      dataIndex: "adv",
      render: (text: any, record: any) => <div>{text}s</div>,
      sorter: (a, b) => a.adv - b.adv,
    },
  ];
  return (
    <div>
      <div className={styles.group_button}>
        <FilterThongKe
          datatable={datane}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fillStart={fillStart}
          setFillStart={setFillStart}
          fillEnd={fillEnd}
          setFillEnd={setFillEnd}
          handleFilter={handleFilter}
          phongban={phongban}
          setPhongban={setPhongban}
        />

        <div className={styles.group_button_right}>
          <button type="button" onClick={handleExportToExcel}>Xuất Excel</button>
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Table
          loading={loading}
          dataSource={datane}
          columns={Colums}
          bordered
          scroll={{ x: 1000, y: "auto" }}
          pagination={{ pageSize: 10 }}
        />
        {/* <ModalConnect
          isShowModalAdd={isShowModalAdd}
          onClose={onClose}
          handleAddDB={handleAddDB}
        /> */}
      </div>
    </div>
  );
};
export default Recording;
