import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ChatBusinessBody from "@/components/crm/chat/chat_body";
import styleCustomer from "../customer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { base_url } from "../../service/function";
import Cookies from "js-cookie";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  cusId: any;
  setCusId: any;
  setContent?: any;
  setDate?: any;
  setOpen?: any;
  dataStatusCustomer?: any;
  setStatus?: any;
  fetchData?: any;
  setResoure?: any;
  datatable?: any;
  nvPhuTrach?: any;
  setnvPhuTrach?: any;
  userNameCreate?: any;
  setuserNameCreate?: any;
  nhomCha?: any;
  setnhomCha?: any;
  nhomCon?: any;
  setnhomCon?: any;
  setDatatable?: any;
  setloading?: any;
  setgroup_id?: any;
  setTimeEnd?: any;
  setTimeStart?: any;
  setdateS?: any;
  setdateE?: any;
  setTime_s?: any;
  setTime_e?: any;
  setemp_id?: any;
  setIdNhom?: any;
  nv?: any;
  role?: any;
  posId?: any;
  listNV?: any;
  nameNvNomor?: any;
  listGr?: any;
  listGr_Child?: any;
  group_idFix: any;
  show: any;
  setshow: any;
  handleGetInfoSTT: any;
  fetchDataDefault: any;
}

const CallModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  cusId,
  setCusId,
  datatable,
  dataStatusCustomer,
  fetchData,
  setStatus,
  setResoure,
  nvPhuTrach,
  setnvPhuTrach,
  userNameCreate,
  setuserNameCreate,
  nhomCha,
  setnhomCha,
  nhomCon,
  setnhomCon,
  setloading,
  setgroup_id,
  setTimeStart,
  setTimeEnd,
  setdateE,
  setdateS,
  setTime_s,
  setTime_e,
  setemp_id,
  setIdNhom,
  listGr,
  listGr_Child,
  nameNvNomor,
  nv,
  role,
  posId,
  listNV,
  group_idFix,
  show,
  setshow,
  fetchDataDefault,
  setDatatable,
}) => {
  const [content, setContent] = useState<any>();
  const [datae, setDate] = useState<any>();
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [isOpenMdalZoom, setIsOpenModalZoom] = useState(false);
  const currentTime = new Date();
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const year = dateTime.getUTCFullYear();
    const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getUTCDate()).padStart(2, "0");
    const hour = String(dateTime.getUTCHours() + 7).padStart(2, "0");
    const minute = String(dateTime.getUTCMinutes()).padStart(2, "0");
    // const second = String(dateTime.getUTCSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  // Định dạng thời gian theo chuỗi "YYYY-MM-DD HH:mm:ss"
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const [action, setAction] = useState<any>(false);

  const handleOK = async () => {
    setAction(!action);
    setDate(formattedTime);
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setIsOpenModalZoom(false);
    setTimeout(async () => {
      setContent("");
      setshow(false);
      // setContent("");
      // setDatatable([]);
      setIsOpenMdalSuccess(false);

      await fetchData();
    }, 1000);
  };

  const router = useRouter();
  const [hisContent, sethisContent] = useState<any>();
  const getHisCus = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/crm/customerdetails/showHisCus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ cus_id: cusId }),
        }
      );
      const data = await res.json();
      sethisContent(data?.data?.checkHis);
    } catch (error) { }
  };
  useEffect(() => {
    if (show) {
      getHisCus();
    }
  }, [show]);

  return (
    <>
      <Modal
        title={"Trợ lý kinh doanh"}
        open={show}
        onOk={() => handleOK()}
        onCancel={() => {
          setshow(false);
          setIsModalCancel(false);
          setCusId(0);
          // router.push(pathname);
        }}
        className={"mdal_cancel email_add_mdal ctent_call_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        style={{ textAlign: "left" }}
        centered
      >
        <div
          style={{ display: "flex", flexWrap: "wrap" }}
          className={styleCustomer.wrapp}
        >
          <div className={styleCustomer.content_history}>
            <div className={styleCustomer.box_content_history_title}>
              <p className={styleCustomer.title_box_content}>
                Nội dung lịch sử chăm sóc
              </p>

              <button
                onClick={() => {
                  setIsModalCancel(false);
                  setIsOpenModalZoom(true);
                }}
                type="button"
                id="callAppointmentZoom"
                className={styleCustomer.btn_call_phone}
              >
                <Image
                  width={16}
                  height={16}
                  alt="zoom"
                  src="/crm/zoom_out.svg"
                />
                <p style={{ color: "#4C5BD4" }}> Phóng to</p>
              </button>
            </div>
            <div style={{ paddingTop: 10 }}>
              <fieldset
                style={{
                  display: "block",
                  border: "1px solid #d6cece",
                  padding: 10,
                  borderRadius: 10,
                  borderBottom: "90%",
                }}
              >
                {hisContent?.map((item: any, index: number) => {
                  return (
                    <div key={index} style={{ display: "block" }}>
                      <div style={{ display: "block" }}>
                        <div style={{ float: "left", margin: '0 8px 0 0' }}>
                          {convertDate(item?.created_at)}
                        </div>
                        <br />
                        <div style={{ float: "left", color: "#4c5bd4", textAlign: 'left', whiteSpace: 'pre-line' }}>
                          {item?.content_call?.replace(
                            /<[^>]*>|&nbsp;|&#160;/g,
                            ""
                          )}
                        </div>
                        <br />
                      </div>
                    </div>
                  );
                })}
              </fieldset>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                textAlign: "left",
                fontSize: "15px",
                paddingLeft: "20px",
                textDecoration: "underline",
              }}
            >
              Thông tin khách hàng
            </div>
            <ChatBusinessBody
              show={show}
              content={content}
              hisContent={hisContent}
              cusId={cusId}
              setContent={setContent}
              setDate={setDate}
              setCusId={setCusId}
              setIdNhom={setIdNhom}
              setTime_s={setTime_s}
              setTime_e={setTime_e}
              dataStatusCustomer={dataStatusCustomer}
              setStatus={setStatus}
              fetchData={fetchData}
              setResoure={setResoure}
              datatable={datatable}
              nvPhuTrach={nvPhuTrach}
              setnvPhuTrach={setnvPhuTrach}
              userNameCreate={userNameCreate}
              setuserNameCreate={setuserNameCreate}
              nhomCha={nhomCha}
              setnhomCha={setnhomCha}
              nhomCon={nhomCon}
              setnhomCon={setnhomCon}
              setloading={setloading}
              setgroup_id={setgroup_id}
              setTimeStart={setTimeStart}
              setTimeEnd={setTimeEnd}
              setdateE={setdateE}
              setdateS={setdateS}
              setemp_id={setemp_id}
              nv={nv}
              role={role}
              posId={posId}
              listNV={listNV}
              nameNvNomor={nameNvNomor}
              listGr={listGr}
              listGr_Child={listGr_Child}
              group_idFix={group_idFix}
              action={action}
            />
          </div>
        </div>
      </Modal>

      <Modal
        title={"Trợ lý kinh doanh"}
        open={isOpenMdalZoom}
        onOk={() => handleOK()}
        onCancel={() => {
          setIsOpenModalZoom(false);
          setIsModalCancel(false);
        }}
        className={"mdal_cancel email_add_mdal ctent_call_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        style={{ textAlign: "left" }}
      >
        <div
          style={{ display: "flex", flexWrap: "wrap" }}
          className={styleCustomer.wrapp}
        >
          <div className={styleCustomer.content_history_}>
            <div className={styleCustomer.box_content_history_title}>
              <p className={styleCustomer.title_box_content}>
                Nội dung lịch sử chăm sóc
              </p>
              <button
                onClick={() => {
                  setIsOpenModalZoom(false);
                  setIsModalCancel(true);
                }}
                type="button"
                id="callAppointmentZoom"
                className=""
              >
                <Image
                  width={16}
                  height={16}
                  alt="zoom"
                  src="/crm/zoom_out.svg"
                />
                Thu nhỏ
              </button>
            </div>
            <div style={{ paddingTop: 10 }}>
              <fieldset
                style={{
                  display: "block",
                  border: "1px solid #d6cece",
                  padding: 10,
                  borderRadius: 10,
                  borderBottom: "90%",
                  width: "90%",
                }}
              >
                {hisContent?.map((item: any, index: number) => {
                  return (
                    <div key={index} style={{ display: "block" }}>
                      <div style={{ display: "block" }}>
                        <div style={{ float: "left", margin: '0 8px 0 0' }}>
                          {convertDate(item?.created_at)}
                        </div>
                        <br />
                        <div style={{ float: "left", color: "#4c5bd4", textAlign: 'left', whiteSpace: 'pre-line' }}>
                          {item?.content_call.replace(
                            /<[^>]*>|&nbsp;|&#160;/g,
                            ""
                          )}
                        </div>
                        <br />
                      </div>
                    </div>
                  );
                })}
              </fieldset>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CallModal;
