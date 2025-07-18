import TableDataCampaign from "../table/table-campaign";
import styleHome from "../home/home.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "../hooks/useHeader";
import CampaignInputGroups from "./campaign_input_group";
import { Spin } from "antd";
import { fetchApi } from "../../crm/ultis/api";
import Cookies from "js-cookie";
import { useTrigger } from "../context/triggerContext";
import useLoading from "../hooks/useLoading";

export default function Campaign() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { trigger, setTrigger } = useTrigger();
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [data, setData] = useState([]);
  const [emp, setEmp] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [body, setBody] = useState<any>({ page: 1, pageSize: 10 });
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  const url = "https://api.timviec365.vn/api/crm/campaign/listCampaign";

  const token = Cookies.get("token_base365");

  const fetchAPICampaign = async () => {
    const bodyAPI = {
      ...body,
      status: body?.status ? body?.status : "",
      empID: body?.empID ? body?.empID : "",
      nameCampaign: body?.nameCampaign ? body?.nameCampaign : "",
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
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
      fetchAPICampaign();
    }
    setTrigger(false);

    return () => {
      setTrigger(true);
    };
  }, [trigger]);

  useEffect(() => {
    if (!isFirstTime) {
      fetchAPICampaign();
    }
    setIsFirstTime(false);
  }, [body]);

  useEffect(() => {
    setHeaderTitle("Chiến dịch");
    setShowBackButton(false);
    setCurrentPath("/campaign/list");
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
      <CampaignInputGroups empList={emp} setBody={setBody} body={body} />
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
        <TableDataCampaign
          dataAPI={data}
          empList={emp}
          setBody={setBody}
          body={body}
        />
      )}
    </div>
  );
}
