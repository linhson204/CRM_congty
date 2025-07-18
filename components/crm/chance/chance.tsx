import TableChance from "../table/table-chance-list";
import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";
import ChanceInputGroups from "./chance_input_group";
import useLoading from "../hooks/useLoading";
import { useTrigger } from "../context/triggerContext";
import Cookies from "js-cookie";
import { fetchApi } from "../ultis/api";
import { Spin } from "antd";

export default function Chance() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { trigger, setTrigger } = useTrigger();
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [data, setData] = useState([]);
  const [emp, setEmp] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [body, setBody] = useState<any>({ page: 1, pageSize: 10 });
  const [selectedRow, setSelectedRow] = useState(false);
  // const [isNumberSelected, setNumberSelected] = useState(0);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  const token = Cookies.get("token_base365");

  const fetchAPIChance = async () => {
    const bodyAPI = {
      ...body,
      status: body?.status ? body?.status : "",
      empID: body?.empID ? body?.empID : "",
      nameCampaign: body?.nameCampaign ? body?.nameCampaign : "",
    };
    startLoading();
    const dataApi = await fetchApi(
      `${
        process.env.NEXT_DEV_API_URL || "http://localhost:3007/api/crm"
      }/chance/list-chance`,
      token,
      bodyAPI,
      "POST"
    );
    setData(dataApi?.data);
    stopLoading();
  };

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmp(dataApi?.data?.data);
  };

  useEffect(() => {
    fetchAPIEmployee();
  }, []);

  useEffect(() => {
    if (trigger) {
      fetchAPIChance();
    }
    setTrigger(false);

    return () => {
      setTrigger(true);
    };
  }, [trigger]);

  useEffect(() => {
    if (!isFirstTime) {
      fetchAPIChance();
    }
    setIsFirstTime(false);
  }, [body]);

  useEffect(() => {
    setHeaderTitle("Cơ hội");
    setShowBackButton(false);
    setCurrentPath("/chance");
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
      <ChanceInputGroups
        selectedRow={selectedRow}
        setSelectedRow = {setSelectedRow}
        emp={emp}
        body={body}
        setBody={setBody}
      />
      {isLoading ? (
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      ) : (
        <TableChance
          setSelected={setSelectedRow}
          dataAPI={data}
          emp={emp}
          setBody={setBody}
          body={body}
        />
      )}
    </div>
  );
}
