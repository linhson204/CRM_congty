import React, { useContext, useEffect, useRef, useState } from "react";
import TableData from "../table/table_facebook_scan_candidate";
import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useHeader } from "../hooks/useHeader";
import ScanCandidateInputGroups from "./scanner_input_group";
import useLoading from "../hooks/useLoading";
import { convertTimestampToFull, convertTimeToDate } from "@/utils/function";
import Cookies from "js-cookie";
export interface DataType {
  id: number;
  Link: string;
  note: string;
  timeScan: string;
  userNote: number | string;
  timeNote: string;
}
export interface FormType {
  job: string;
  city: string;
}
// const resex = {
//   data: {
//     result: true,
//     message: "truy vấn thành công",
//     item: [
//       "https://www.facebook.com/groups/1972790002861457/user/100014043909930",
//       "https://www.facebook.com/groups/3767907469921499/user/100056511570300",
//       "https://www.facebook.com/groups/656096924587625/user/100056819654535",
//       "https://www.facebook.com/groups/179755015999381/user/61554216800423",
//       "https://www.facebook.com/groups/vieclamsinhvienmoiratruonghanoi/user/61551118552918",
//       "https://www.facebook.com/groups/2209174889376335/user/100035318238492",
//       "https://www.facebook.com/groups/tuyendungld/user/100027951527860",
//       "https://www.facebook.com/groups/thuctapsinhmarketing/user/61553806782418",
//       "https://www.facebook.com/groups/sales.jobs.channel/user/100090860864589",
//       "https://www.facebook.com/groups/vieclamsinhvienmoiratruonghanoi/user/100011112886870",
//       "https://www.facebook.com/groups/3183842758604858/user/61559153441548",
//       "https://www.facebook.com/groups/569404526777082/user/100092663659964",
//       "https://www.facebook.com/groups/1608050419475875/user/100013529804306",
//       "https://www.facebook.com/groups/vieclamkientrucnoithat/user/100009451075475",
//       "https://www.facebook.com/groups/644823259963080/user/100086770811444",
//       "https://www.facebook.com/groups/timvieclamparttimehanoi/user/61559153441548",
//       "https://www.facebook.com/groups/hoithietketuyendungdesigner/user/100054890335540",
//       "https://www.facebook.com/groups/vieclamnhanvienkinhdoanh.org/user/100056819654535",
//       "https://www.facebook.com/groups/thuctapsinhmarketing/user/100057765544019",
//       "https://www.facebook.com/groups/nganhangtaichinhbaohiem/user/100033286359333",
//       "https://www.facebook.com/groups/487612404615640/user/100013529804306",
//       "https://www.facebook.com/groups/timvieclamparttimehanoi/user/100056819654535",
//       "https://www.facebook.com/groups/2489244127824076/user/100010641910343",
//       "https://www.facebook.com/groups/2079444069046077/user/100056819654535",
//       "https://www.facebook.com/groups/thuctapsinhmarketing/user/100038401572201",
//       "https://www.facebook.com/groups/569404526777082/user/100044984438854",
//       "https://www.facebook.com/groups/tuyendungnganhnganhang/user/100000152462503",
//       "https://www.facebook.com/groups/thuctapsinhmarketing/user/61558963995084",
//       "https://www.facebook.com/groups/vieclamitvietnam/user/61554216800423",
//       "https://www.facebook.com/groups/569404526777082/user/100009650221267",
//       "https://www.facebook.com/groups/4355171831192639/user/100056819654535",
//       "https://www.facebook.com/groups/tdnhanvienkinhdoanh/user/100076830399819",
//       "https://www.facebook.com/groups/2209174889376335/user/100086940584668",
//       "https://www.facebook.com/groups/1945326462373383/user/100056511570300",
//       "https://www.facebook.com/groups/274989407587657/user/100091298551024",
//       "https://www.facebook.com/groups/vieclamsinhvienmoiratruonghanoi/user/100056511570300",
//       "https://www.facebook.com/groups/5315237775206164/user/100056819654535",
//       "https://www.facebook.com/groups/1972790002861457/user/100086770811444",
//       "https://www.facebook.com/groups/vieclamsinhvienmoiratruonghanoi/user/61553844810984",
//       "https://www.facebook.com/groups/2209174889376335/user/61553844810984",
//       "https://www.facebook.com/groups/179755015999381/user/100036981750826",
//       "https://www.facebook.com/groups/timvieclampartfullquancaugiaytaihanoi/user/100012901385416",
//       "https://www.facebook.com/groups/644823259963080/user/100018018840517",
//       "https://www.facebook.com/groups/skt.sanketoan.vn/user/61553411125581",
//       "https://www.facebook.com/groups/HNInternship/user/100031231223471",
//       "https://www.facebook.com/groups/1314042472431898/user/100034643743167",
//       "https://www.facebook.com/groups/624474154299436/user/100036981750826",
//       "https://www.facebook.com/groups/406083469847651/user/100091573383184",
//       "https://www.facebook.com/groups/3353113358248436/user/100056819654535",
//       "https://www.facebook.com/groups/2209174889376335/user/100092544882019",
//       "https://www.facebook.com/groups/408123176874859/user/100028785365778",
//       "https://www.facebook.com/groups/6662997923829745/user/100056819654535",
//       "https://www.facebook.com/groups/2489244127824076/user/100091573383184",
//       "https://www.facebook.com/groups/HNInternship/user/100013465570219",
//       "https://www.facebook.com/groups/3552810204978545/user/100033286359333",
//       "https://www.facebook.com/groups/2209174889376335/user/61559876530409",
//       "https://www.facebook.com/groups/644823259963080/user/100038260980491",
//       "https://www.facebook.com/groups/sales.jobs.channel/user/100034646616482",
//       "https://www.facebook.com/groups/vieclamsinhvienmoiratruonghanoi/user/100093055803774",
//       "https://www.facebook.com/groups/1184016894950164/user/100082114593713",
//       "https://www.facebook.com/groups/2209174889376335/user/100047274964564/?__cft__[0]=AZUvg2YqtM4H0jYUBAFJd00_bi5tqjI-9K3nsDXEZCD7lx7PIkeJLO9emkEG7WaveM4J9GG6exBVDzRxbLdaU8g3huZNn4IL6pTEfNbqMeW5v4R9R7DjJtFrTLWxDzLaUZu_FdjW9Ns3ypmpThLGZsWxqlm6Ay_kKUYOqqdhEgaSrF_w1XYSn9KFIn4jm802beuoABmEUT1SlbEHpnm2m_KI&__tn__=%3C%2CP-R",
//       "https://www.facebook.com/groups/1565284540202517/user/100056819654535",
//       "https://www.facebook.com/groups/279232526019092/user/61552720329425",
//       "https://www.facebook.com/groups/3206790946261415/user/100056819654535",
//       "https://www.facebook.com/groups/2222790251146678/user/100021643750797",
//       "https://www.facebook.com/groups/sales.jobs.channel/user/100005251276706",
//       "https://www.facebook.com/groups/2209174889376335/user/100023975976964",
//       "https://www.facebook.com/groups/vieclamsinhvienmoiratruonghanoi/user/100092663659964",
//       "https://www.facebook.com/groups/thuctapsinhmarketing/user/100010038750809",
//       "https://www.facebook.com/groups/2949753988483163/user/100056511570300",
//       "https://www.facebook.com/groups/629058343952566/user/100037571078724",
//       "https://www.facebook.com/groups/3206790946261415/user/100041580488418",
//       "https://www.facebook.com/groups/HNInternship/user/100010641910343",
//       "https://www.facebook.com/groups/tdnhanvienkinhdoanh/user/100056819654535",
//       "https://www.facebook.com/groups/2489244127824076/user/100056819654535",
//       "https://www.facebook.com/groups/tuyendungnganhnganhang/user/100045332779820",
//       "https://www.facebook.com/groups/569404526777082/user/100033286359333",
//       "https://www.facebook.com/groups/vieclamldpt.vanphonghn/user/61551235892905",
//       "https://www.facebook.com/groups/3118293205087669/user/100056819654535",
//       "https://www.facebook.com/groups/1440817762628813/user/100056819654535",
//       "https://www.facebook.com/groups/sales.jobs.channel/user/100056819654535",
//       "https://www.facebook.com/groups/2222790251146678/user/61555254312973",
//       "https://www.facebook.com/groups/HNInternship/user/61553844810984",
//       "https://www.facebook.com/groups/1670816279977557/user/100034646616482",
//       "https://www.facebook.com/groups/656096924587625/user/100064343255741",
//       "https://www.facebook.com/groups/2209174889376335/user/100092663659964",
//     ],
//   },
//   error: null,
// };
// const cities = [
//   { value: "Tùy chọn 1", label: "Tùy chọn 1" },
//   { value: "Tùy chọn 2", label: "Tùy chọn 2" },
//   { value: "Tùy chọn 3", label: "Tùy chọn 3" },
// ];

// const jobs = [
//   { value: "Tùy chọn 1", label: "Tùy chọn 1" },
//   { value: "Tùy chọn 2", label: "Tùy chọn 2" },
//   { value: "Tùy chọn 3", label: "Tùy chọn 3" },
// ];
// const list = {
//   cities: cities,
//   jobs: jobs,
// };

export default function Scanner({ data }: { data: any }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [formSearch, setFormSearch] = useState({
    job: "",
    city: "",
    startTime: 0,
    endTime: 0,
  });
  const [dataSearch, setDataSearch] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const handleValidate = (inputString: string) => {
    return inputString.replace(/-/g, "+");
  };
  const handleSearch = async () => {
    if (!formSearch.city || !formSearch.job)
      return alert("Vui lòng chọn ngành nghề và tỉnh thành");
    try {
      // console.log("from scanner", formSearch.city);
      // console.log("from scanner", formSearch.job);
      const validatedJob = handleValidate(formSearch.job);
      const validatedCity = handleValidate(formSearch.city);
      setLoading(true);
      fetch("/crm/api/facebook/get_candidate_fb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nganhnghe: validatedJob,
          tinhthanh: validatedCity,
          startTime: formSearch.startTime,
          endTime: formSearch.endTime
        }),
      })
        .then((res) => res.json())
        .then((res2) => {
          const list = res2?.data.data.list
          const datanew: any[] = [];
          for (var i = 0; i < list.length; i++) {
            const element = list[i]
            datanew.push({
              id: element?.id || 0,
              Link: element?.linkCandi || "",
              timeScan: convertTimeToDate(element?.timeScan * 1000),
              note: element?.note,
              userNote: element?.userNote || 0,
              timeNote: element?.timeNote ? convertTimestampToFull(element?.timeNote) : "",
            });
            datanew.length = i;
          }
          setDataSearch(datanew);
        })
        .catch((error) => {
          console.log("🚀 ~ handleSearch ~ error:", error?.message)
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  const handleEditNote = (note: string, id: string | number) => {
    // local
    setDataSearch((prev) => prev.map((item) => {
      if (item?.id == id) {
        return {
          ...item,
          note: note
        }
      } else {
        return item
      }
    }))

    // remote
    fetch("/crm/api/facebook/edit_note_candidate_fb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        note: note,
        idQLC: Number(Cookies.get('userID')) || 0
      }),
    })
      .then((res) => res.json())
      .then((res2) => {

      })
      .catch((error) => {
        console.log("🚀 ~ handleSearch ~ error:", error?.message)
      })
      .finally(() => {
      });
  }

  useEffect(() => {
    setHeaderTitle("Quét ứng viên");
    setShowBackButton(false);
    setCurrentPath("/quet-ung-vien");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <div ref={mainRef} className={styleHome.main}>
      <ScanCandidateInputGroups
        list={data}
        formData={formSearch}
        setFormData={setFormSearch}
        handleSearch={handleSearch}
      />
      <div
        style={{
          margin: "15px",
          marginLeft: "0px",
          fontSize: "1.5em",
          fontWeight: "bold",
        }}
      >
        Tổng: {dataSearch.length}
      </div>
      <TableData datanew={dataSearch} loading={loading} handleEditNote={handleEditNote} />
    </div>
  );
}
