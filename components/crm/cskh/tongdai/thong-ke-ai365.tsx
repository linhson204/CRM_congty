import { Button, Table, Modal } from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./tongdai.module.css";
import FilterThongKeAi365 from "./filter-thong-ke-ai365";
type Props = {};

const ThongKeAi365 = (props: Props) => {
  const router = useRouter();
  const { idSchedule, nhanvien, trangthai, timeStart, timeEnd } = router.query as { idSchedule: string, nhanvien: string, trangthai: string, timeStart: string, timeEnd: string };
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
  const [nv, setNv] = useState(nhanvien)
  const [status, setStatus] = useState(trangthai);
  const [condition, setCondition] = useState(() => {
    const query = {}
    if (idSchedule) query['idSchedule'] = idSchedule
    if (trangthai) query['status'] = trangthai
    if (nhanvien) query['emp_id'] = Number(nhanvien.split(' ')[0])
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

  const toggleAudio = (audioId: string, playButtonId: string, pauseButtonId: string) => {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement;
    const playButton = document.getElementById(playButtonId) as HTMLButtonElement;
    const pauseButton = document.getElementById(pauseButtonId) as HTMLButtonElement;

    if (audioElement?.paused || audioElement?.ended) {
      // Dừng tất cả các audio khác đang phát
      const allAudioElements = document.querySelectorAll("audio");
      allAudioElements.forEach((element) => {
        if (element.id !== audioId) {
          element.pause();
          element.currentTime = 0; // Đặt lại thời gian audio về đầu
          const playId = "play-" + element.id.split("-")[1];
          const pauseId = "pause-" + element.id.split("-")[1];
          const playButton = document.getElementById(playId) as HTMLButtonElement;
          const pauseButton = document.getElementById(pauseId) as HTMLButtonElement;
          playButton.style.display = "block";
          pauseButton.style.display = "none";
        }
      });

      audioElement.play();
      playButton.style.display = "none";
      pauseButton.style.display = "block";
    } else {
      audioElement?.pause();
      playButton.style.display = "block";
      pauseButton.style.display = "none";
    }
  }

  const handleShowModal = (record: any) => {
    setTextRecord(record.text)
    setIsModalOpen(true)
  }

  const handleFilter = () => {
    let param = ''
    if (idSchedule) {
      param += `idSchedule=${idSchedule}&`
    }
    if (status) {
      param += `trangthai=${status}&`
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
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://api.timviec365.vn/api/crm/scheduleAutoCall/GetStorageAutoCall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: condition,
      });
      const data = await response.json();
      console.log(data)
      setLoading(false)
      if (data && data.data && data.data.list) {
        setListData(data.data.list);
      }
    };
    getData();
  }, []);

  const Colums = [
    {
      width: "15%",
      title: "Chuyên viên",
      dataIndex: "emp_name",
      render: (text: any, record: any) => <div>{record.emp_id} - {record.emp_name}</div>,
    },
    {
      width: "15%",
      title: "Tên khách hàng",
      dataIndex: "customer_name",
    },
    {
      width: "10%",
      title: "Số khách hàng",
      dataIndex: "customer_phone",
    },
    {
      width: "20%",
      title: "Nhóm khách hàng",
      dataIndex: "group_name",
    },
    {
      width: "10%",
      title: "Thời gian bắt đầu gọi",
      dataIndex: "start_time",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: "10%",
      title: "Trạng thái cuộc gọi",
      dataIndex: "state",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: "10%",
      title: "Nội dung cuộc gọi",
      dataIndex: "text",
      render: (text: any, record: any) => (
        <>
          {record.text !== '' && (
            <div onClick={() => handleShowModal(record)} style={{ color: '#4c5bd4', cursor: 'pointer' }}>Chi tiết</div>
          )}
        </>
      )
    },
    {
      width: "10%",
      title: "Ghi âm",
      dataIndex: "filepath",
      render: (text: any, record: any) => (
        <>
          {record.link !== '' && (
            <div className={`${styles.audio_container}`}>
              <audio src={`${record.link}`} id={`audio-${record._id}`}>
              </audio>
              <div className={`${styles.audio_buttons_play}`}>
                <button
                  className={`${styles.tb_ga}`}
                  id={`play-${record.id}`}
                  onClick={() =>
                    toggleAudio(
                      `audio-${record.id}`,
                      `play-${record.id}`,
                      `pause-${record.id}`,
                    )
                  }
                >
                  <img src="/crm/ghiam.svg" alt="" width={15} height={15} />
                </button>
              </div>
              <div className={`${styles.audio_buttons_pause}`}>
                <button
                  className={`${styles.tb_ga}`}
                  id={`pause-${record.id}`}
                  onClick={() =>
                    toggleAudio(
                      `audio-${record.id}`,
                      `play-${record.id}`,
                      `pause-${record.id}`,
                    )
                  }
                  style={{ display: "none" }}
                >
                  <img src="/crm/pause.svg" alt="" width={15} height={15} />
                </button>
              </div>
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <FilterThongKeAi365
        isModalFilter={isModalFilter}
        setIsModalFilter={setIsModalFilter}
        fillStart={fillStart}
        setFillStart={setFillStart}
        fillEnd={fillEnd}
        setFillEnd={setFillEnd}
        handleFilter={handleFilter}
        nv={nv}
        setNv={setNv}
        status={status}
        setStatus={setStatus}
      />
      <div style={{ paddingTop: 20 }}>
        <Table
          loading={loading}
          columns={Colums as any}
          dataSource={listData}
          bordered
          scroll={{ x: '1600px' }}
          pagination={{
            style: { paddingBottom: 30, float: "left" },
            current: current,
            pageSize: 15,
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
export default ThongKeAi365;
