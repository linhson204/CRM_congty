import { CallContext } from "@/components/crm/context/tongdaiContext";
import { Button, Table } from "antd";
import Cookies from 'js-cookie';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cskh from "../csks.module.css";
import FilterTongDai from "./filterTongdai";
import styles from "./tongdai.module.css";
type Props = {};

const TongDaiPage = (props: Props) => {
  const router = useRouter();
  const { nhanvien, songhe, timeStart, timeEnd } = router.query as { nhanvien: string, songhe: string, timeStart: string, timeEnd: string };
  const token = Cookies.get("token_base365")
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listData, setListData] = useState([]);
  const [data, setData] = useState([]);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [showKetNoi, setShowKetNoi] = useState(true);
  const [soNghe, setSoNghe] = useState(songhe);
  const [nv, setnv] = useState(nhanvien);
  const [loading, setLoading] = useState(true);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };

  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const totalSum = listData?.reduce(
    (acc, current) => acc + +current.ring_duration,
    0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datatable: any = listData?.map((item: any) => {
    return {
      caller: item.caller,
      callee: item.callee,
      start_time: item.start_time,
      end_time: item.end_time,
      ring_duration: +item.ring_duration,
      status: item.status,
      from: item.from,
    };
  });

  const count = listData?.reduce((acc, current) => {
    if (current.status === "ANSWERED") {
      return acc + 1;
    }
    return acc;
  }, 0);
  const [fillStart, setFillStart] = useState<any>(() => {
    if (!timeStart) return undefined
    return timeStart.split(' ')[0]
  });
  const [fillEnd, setFillEnd] = useState<any>(() => {
    if (!timeEnd) return undefined
    return timeEnd.split(' ')[0]
  });
  const [condition, setCondition] = useState(() => {
    const query = { token }
    if (timeStart) {
      query["timeStart"] = timeStart
    }
    if (timeEnd) {
      query["timeEnd"] = timeEnd
    }
    if (nhanvien) {
      query["line"] = nhanvien
    }
    if (songhe && songhe !== '') {
      query["customerPhone"] = songhe
    }
    return JSON.stringify(query)
  })

  const handleFilter = async () => {
    console.log(nv)
    let param = ''
    if (soNghe) {
      param += `songhe=${soNghe}&`
    }
    if (nv) {
      param += `nhanvien=${nv}&`
    }
    if (fillStart) {
      param += `timeStart=${fillStart}&`
    }
    if (fillEnd) {
      param += `timeEnd=${fillEnd}&`
    }
    param !== '' ? router.push(`?${param}`) : router.push('')
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://voip.timviec365.vn/api/getStorage`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: condition
        })
        const data = await response.json();
        setLoading(false)
        if (data && data.data && data.data.storage) {
          setListData(data.data.storage);
        }
        return data;
      } catch (error) { }
    }
    getData()
  }, []);

  const Colums = [
    {
      key: "1",
      width: "10%",
      title: "Số gọi",
      dataIndex: "caller",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      key: "2",
      width: "10%",
      title: "Số nghe",
      dataIndex: "callee",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      key: "3",
      width: "20%",
      title: "Thời gian bắt đầu cuộc gọi",
      dataIndex: "start_time",
      render: (text: any) => <div>{text}</div>,
    },
    {
      key: "4",
      width: "20%",
      title: "Thời gian kết thúc cuộc gọi",
      dataIndex: "end_time",
    },
    {
      key: "5",
      width: "10%",
      title: "Thời lượng",
      dataIndex: "ring_duration",
      render: (text: any) => <div>{text}s</div>,
    },
    {
      key: "6",
      width: "10%",
      title: "From",
      dataIndex: "from",
    },
    {
      key: "6",
      width: "10%",
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];

  return (
    <div>
      {showKetNoi && (
        <div className={styles.group_button} style={{ display: "block" }}>
          <div>
            <FilterTongDai
              datatable={datatable}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              fillStart={fillStart}
              setFillStart={setFillStart}
              fillEnd={fillEnd}
              setFillEnd={setFillEnd}
              handleFilter={handleFilter}
              soNghe={soNghe}
              setSoNghe={setSoNghe}
              nv={nv}
              setnv={setnv}
            />
          </div>

          <div
            className={styles.group_button_right}
            style={{ float: "right", marginTop: -40 }}
          >
            <Link href={"/thong-ke-ai365"}>
              <button>Thống kê AI365</button>
            </Link>

            <Link href={"/khong-tra-loi"}>
              <button>Không trả lời</button>
            </Link>

            <Link href={"/ghi-am"}>
              <button>Ghi âm</button>
            </Link>

            <Link href={"/thong-ke-tong-dai"}>
              <button>Thống kê</button>
            </Link>
            <Link href={"/switchboard/manager/line"}>
              <button>Quản lý line</button>
            </Link>
          </div>

          <ul className={styles.cskh_info_call} style={{ fontSize: 16 }}>
            <li>Số cuộc gọi: {listData?.length}</li>
            <li>Tổng số nghe máy: {count || 0}</li>
            <li>Tổng số không trả lời: {listData?.length - count}</li>
            <li>Tổng thời gian gọi: {totalSum || 0}(s)</li>
            <li>
              Trung bình: {count == 0 ? 0 : (totalSum / count).toFixed(2)}s/ cuộc gọi
            </li>
          </ul>
        </div>
      )}
      {!showKetNoi && (
        <div className={cskh.connect_tongdai} style={{ paddingBottom: 20 }}>
          <Link href={"/setting/switch_board"}>
            <Button
              style={{ height: 40, width: 200 }}
              className={`${cskh.dropbtn_add} `}
            >
              <Image
                style={{ paddingRight: 5 }}
                src="/crm/kn.svg"
                alt="Connect Icon"
                width={30}
                height={15}
              />
              Kết nối tổng đài
            </Button>
          </Link>
        </div>
      )}

      <div style={{ paddingTop: 20 }}>
        <Table
          loading={loading}
          columns={Colums as any}
          dataSource={datatable}
          bordered
          scroll={{ x: 1000, y: "auto" }}
          pagination={{
            style: { display: "flex", float: "left" },
            current: current,
            pageSize: pageSize,
            onChange(page, pageSize) {
              if (page != current) {
                setcurrent(page);
              }
            },
          }}
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
export default TongDaiPage;
