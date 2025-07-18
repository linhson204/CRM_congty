import { Button, Table } from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "./tongdai.module.css";
import Link from "next/link";
import cskh from "../csks.module.css";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import FilterGhiAm from "./filterGhiAm";
import { dataSaveTD, doDisConnect } from "../../redux/user/userSlice";
type Props = {};

const GhiAmPage = (props: Props) => {
  const router = useRouter();
  const { nhanvien, songhe, timeStart, timeEnd } = router.query as { nhanvien: string, songhe: string, timeStart: string, timeEnd: string };
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listData, setListData] = useState([]);
  const show = useSelector((state: any) => state?.auth?.account);
  const [current, setcurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageSize, setpageSize] = useState(10);
  const [showKetNoi, setShowKetNoi] = useState(true);
  const [condition, setCondition] = useState(() => {
    const query = { state: "ANSWERED", token: Cookies.get("token_base365") }
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
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const [soNghe, setSoNghe] = useState(songhe);
  const [nv, setnv] = useState(nhanvien);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datatable: any = listData?.map((item: any) => {
    return {
      id: item.id,
      caller: item.caller,
      callee: item.callee,
      start_time: item.start_time,
      end_time: item.end_time,
      duration: item.duration,
      filepath: item.filepath,
      filename: item.filename,
    };
  });

  function toggleAudio(
    audioId: string,
    playButtonId: string,
    pauseButtonId: string
  ) {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement;
    const playButton = document.getElementById(playButtonId) as HTMLButtonElement;
    const pauseButton = document.getElementById(pauseButtonId) as HTMLButtonElement;

    if (audioElement.paused || audioElement.ended) {
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
      audioElement.pause();
      playButton.style.display = "block";
      pauseButton.style.display = "none";
    }
  }

  // Bắt sự kiện 'ended' cho phần tử audio


  interface CallRecord {
    id: string;
    filepath: string;
    filename: string;
    // Các trường dữ liệu khác của CallRecord
  }
  const dispatch = useDispatch();
  const [fillStart, setFillStart] = useState<any>(() => {
    if (!timeStart) return undefined
    return timeStart.split(' ')[0]
  });
  const [fillEnd, setFillEnd] = useState<any>(() => {
    if (!timeEnd) return undefined
    return timeEnd.split(' ')[0]
  });

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
      const response = await fetch(`https://voip.timviec365.vn/api/getStorage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: condition,
      });
      const data = await response.json();
      setLoading(false)
      if (data && data.data && data.data.storage) {
        setListData(data.data.storage);
      } else {
        dispatch(doDisConnect(""));
      }
      return data;
    };
    getData();
  }, []);

  const Colums = [
    {
      width: "10%",
      title: "Số gọi",
      dataIndex: "caller",
      // render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: "10%",
      title: "Số nghe",
      dataIndex: "callee",
      // render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: "20%",
      title: "Thời gian bắt đầu cuộc gọi",
      dataIndex: "start_time",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: "20%",
      title: "Thời gian kết thúc cuộc gọi",
      dataIndex: "end_time",
    },
    {
      width: "10%",
      title: "Thời lượng",
      dataIndex: "duration",
      render: (text: any) => <div>{text}s</div>,
    },
    {
      width: "10%",
      title: "Ghi âm",
      dataIndex: "filepath",
      render: (text: any, record: CallRecord) => (
        <div className={`${styles.audio_container}`}>
          <audio src={`${record.filepath}`} id={`audio-${record.id}`}>
            {/* <source src={`${record.filepath}`} type="audio/ogg" /> */}
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
      ),
    },
  ];
  return (
    <div>
      {showKetNoi && (
        <div className={styles.group_button} style={{ display: "block" }}>
          <div>
            <FilterGhiAm
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
          scroll={{ x: 1000 }}
          pagination={{
            style: { paddingBottom: 30, float: "left" },
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
export default GhiAmPage;
