import { getIdChatFromPhoneNum } from '@/utils/mediasoup_call/call_client_repo';
import { SettingOutlined } from '@ant-design/icons';
import { Modal, Table } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import mqtt from "mqtt";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./chat.module.css";
import HisModule from "./modal/his_call_module";
import DetailMail from "./modal/send_mail";
import SendFacebook from "./modal/send_message_facebook";
import SendZalo from "./modal/send_message_zalo";
import SendSMS from "./modal/send_sms";
const Cookies = require("js-cookie");


import { SimpleUser } from "sip.js/lib/platform/web";


export default function InputPhone({ infoCus, refPhone, setPhone, hisContent, sethisContent, email }: any) {


  const [client, setClient] = useState<any>(null);
  useEffect(() => {
    const protocol = 'wss'
    const host = 'ht.timviec365.vn'
    const port = '8084'
    const clientId = `mqttx_${Math.random().toString(16).slice(3)}`
    const connectUrl = `${protocol}://${host}:${port}/mqtt`



    const mqttClient = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: 'root',
      password: '123123a',
      reconnectPeriod: 1000
    })

    mqttClient.on('connect', () => {
      console.log('Connected to broker');
      mqttClient.subscribe("test")
    });

    // Log khi có lỗi xảy ra
    mqttClient.on('error', (error) => {
      console.error('Error:', error);
    });

    mqttClient.subscribe("open_app")
    mqttClient.subscribe("call_hotline_err")
    mqttClient.subscribe("call_hotline")
    mqttClient.subscribe("running_app")

    // lịch sử cuộc gọi
    mqttClient.subscribe("history_call")

    mqttClient.subscribe("handle_call")

    setClient(mqttClient);


    return () => {
      mqttClient.end();
    };

  }, [])


  function getAudioElement(id: string): HTMLAudioElement {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLAudioElement)) {
      throw new Error(`Element "${id}" not found or not an audio element.`);
    }
    return el;
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  const currentCookie = Cookies.get("token_base365");
  const decodedToken: any = jwt_decode(currentCookie);
  const regex = /^(086|096|097|098|032|033|034|035|036|037|038|039)\d{7}$/;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listPhone, setListPhone] = useState([]);
  //thong tin kinh doanh
  const [kdinfo, setKdinfo] = useState({ extension_number: '' });
  const [openMail, setOpenMail] = useState(false);
  const [openSMS, setOpenSMS] = useState(false);
  const [contentSms, setContentSms] = useState("")
  const [title, setTitle] = useState("")
  const [contentMail, setContentMail] = useState("")
  const [fileMail, setFileMail] = useState("")
  const [typeSendMail, setTypeSendMail] = useState(false)
  const [call, setCall] = useState(false)
  const [sendMail, setSendMail] = useState(false)
  const [openApp, setOpenApp] = useState(false)
  const [sendSMS, setSendSMS] = useState(false)
  const [keyApp, setKeyApp] = useState<any>(false)
  const [openWF, setOpenWF] = useState<any>(false)
  const [recipientMail, setRecipientMail] = useState("")
  const [dataPhone, setDataPhone] = useState<any>(null)
  const [typeCall, setTypeCall] = useState<any>(2)
  const [openZalo, setOpenZalo] = useState<any>()
  const [openCheck, setOpenCheck] = useState<any>(false)
  const [checkRunning, setCheckRunning] = useState<any>(false)
  const [key, setKey] = useState<any>(false)
  const [keydt, setKeydt] = useState<any>(false)
  const [checkCall, setCheckCall] = useState<any>(false)
  const [checkRunCall, setCheckRunCall] = useState<any>(false)
  const [chooseDevice, setChooseDevice] = useState<any>(false)
  const [chooseDeviceNew, setChooseDeviceNew] = useState<any>(false)
  const [chooseDeviceApp, setChooseDeviceApp] = useState(false)
  const [dataDevice, setdataDevice] = useState<any>(false)
  const [typeDevice, setTypeDevice] = useState<any>(0)
  const [runningCall, setRunningCall] = useState<any>(false)

  const [dataCus, setDataCus] = useState();
  const [warningCus, setWarningCus] = useState(false);
  const [isOpenMd, setIsOpenMd] = useState(false);
  const [isStillCall, setIsStillCall] = useState(false);
  const [openKey, setOpenKey] = useState(false)
  const [openHisModule, setOpenHisModule] = useState(false)
  const [dataHisModule, setDataHisModule] = useState(false)
  const [openFB, setOpenFB] = useState<any>()

  const [authorizationSIP, setAuthorizationSIP] = useState({
    authorizationUsername: decodedToken?.data?.phoneTK,
    authorizationPassword: decodedToken?.data?.phoneTK,
  });

  const [simpleUserSIP, setSimpleUserSIP] = useState<SimpleUser | null>(null);

  const okModalWrCus = () => {
    setIsOpenMd(false);
    setIsStillCall(true);
    setWarningCus(false);
  }

  const noModalWrCus = () => {
    setIsOpenMd(false);
    setIsStillCall(false);
    setWarningCus(false);
  }

  //loading luc goi
  const [isloading, setIsloading] = useState(false)
  //ringing
  const [isringing, setIsringing] = useState<any>(false)

  const playRingtone = () => {
    console.log("RINGGGGGGGGGGG")
    const audio = new Audio('/crm/ring.mp3');
    audio.play();
  };

  const toggleRinging = () => {
    setIsringing(!isringing);
    if (isringing) {
      playRingtone();
    }
  };

  const closeModal = () => {
    setIsloading(false);
  };

  useEffect(() => {
    setKeydt(`${decodedToken?.data?._id}${new Date().getTime()}${Math.floor(Math.random() * 999999)}`)
  }, [key])

  useEffect(() => {
    if (openKey) {
      setKey(`${decodedToken?.data?._id}${new Date().getTime()}${Math.floor(Math.random() * 999999)}`)
      setCall(true)
      setOpenKey(false)
    }
  }, [openKey])

  useEffect(() => {
    setPhone(dataPhone)
  }, [dataPhone])

  const send_error_to_call = async (phone, error) => {
    try {
      let mess = `gọi: ${phone} - ${error}`
      await axios.post(`https://api.timviec365.vn/api/qlc/ai/send_error_to_call`, {
        _id: decodedToken?.data?._id,
        error: mess
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await axios.post("https://api.timviec365.vn/api/qlc/managerUser/setting_device",
          {},
          {
            headers: {
              Authorization: `Bearer ${currentCookie}`,
              'Content-Type': 'application/json'
            }
          }
        )

        setdataDevice(res?.data?.data?.isExist)
        setTypeDevice(res?.data?.data?.type)
      } catch (error) {

        console.log("error", error)
      }
    }
    callAPI()
  }, [])


  useEffect(() => {
    if (checkCall) {
      setCheckCall(false)
      if (!checkRunCall) {
        send_error_to_call(dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai, "Lỗi mở app gọi của Linh")
        window.alert("Lỗi mở app - Vui lòng thử lại")
        // setOpenWF(true)
      }
    }
  }, [checkCall])

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await axios.post("https://api.timviec365.vn/api/crm/customer/setting_call/check",
          {

          },
          {
            headers: {
              Authorization: `Bearer ${currentCookie}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        setTypeCall(res?.data?.type_call)
      } catch (error) {
        console.log("error", error)
      }
    }
    callAPI()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post('https://voip.timviec365.vn/api/GetInforEndpoint', {}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        });
        if (res.status == 200) {

          setKdinfo(res?.data?.data?.data)
        } else {
          console.log("Error api");
        }

      } catch (error) {
        console.log("Error:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (openCheck) {
      if (!checkRunning && client) {
        router.push(`phoneai365:/${dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone}/${key}/${decodedToken?.data?._id}`)
        client.publish("send_sms", `call/${infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone}/${key}/${decodedToken?.data?._id}`)
        setCheckRunning(false)
        setOpenCheck(false)
      }
    }
  }, [openCheck])

  const update_device = (data) => {

    const callAPI = async () => {
      try {
        const res = await axios.post("https://api.timviec365.vn/api/qlc/managerUser/update_device",
          {
            type: data
          },
          {
            headers: {
              Authorization: `Bearer ${currentCookie}`,
              'Content-Type': 'application/json'
            }
          }
        )
        setTypeDevice(res?.data?.data?.data?.type)
        setdataDevice(true)
        setChooseDevice(false)
        setOpenKey(true)
      } catch (error) {
        window.alert("Có lỗi xảy ra-Bạn vui lòng chọn lại!!!")
        console.log("error", error)
      }
    }
    callAPI()
  }
  const update_device_new = (data) => {

    const callAPI = async () => {
      try {
        const res = await axios.post("https://api.timviec365.vn/api/qlc/managerUser/update_device",
          {
            type: data
          },
          {
            headers: {
              Authorization: `Bearer ${currentCookie}`,
              'Content-Type': 'application/json'
            }
          }
        )
        setTypeDevice(res?.data?.data?.data?.type)
        setdataDevice(true)
        setChooseDeviceNew(false)
      } catch (error) {
        window.alert("Có lỗi xảy ra-Bạn vui lòng chọn lại!!!")
        console.log("error", error)
      }
    }
    callAPI()
  }

  if (openWF) {
    const call = async () => {

      setOpenWF(false)
      if (typeDevice == 1) {
        try {
          console.log("Gọi điện thoại bàn")
          let idChatKhach = await getIdChatFromPhoneNum(dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai);
          console.log("ID CHAT", idChatKhach);
          // setRunningCall(true)
          //loading
          setIsloading(true)

          if (client) {

            client.publish("handle_call", `start;${dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai};${kdinfo?.extension_number};${decodedToken?.data?._id};${key};${decodedToken?.data?.userName};${idChatKhach}`);

            client.on("message", async (topic, data) => {
              if (topic == "handle_call" && data.toString().split(';')[1] == decodedToken?.data?._id &&
                data.toString().split(';')[2] == key) {
                if (data.toString().split(';')[0] == 'begin') {

                  setIsloading(false);
                  setRunningCall(false)
                }
                if (data.toString().split(';')[0] == 'end') {

                  setIsloading(false);
                  setRunningCall(false)
                }

                if (data.toString().split(';')[0] == 'reject') {
                  console.log('Khách từ chối cuộc gọi:', data.toString());
                  setRunningCall(false)
                  setIsloading(false);
                  window.alert("Khách từ chối cuộc gọi hoặc không nghe máy")
                }

                if (data.toString().split(';')[0] == 'success') {
                  console.log('Gọi thành công:', data.toString());
                  setRunningCall(false)
                  setIsloading(false);
                  window.alert("Gọi thành công")
                }
              }
            });
          }
        } catch (error) {
          window.alert(`Cuộc gọi thất bại: ${error.message} `)
          setRunningCall(false)
          setIsloading(false);
          console.log("error", error);
        }
      }
      else {
        setIsloading(false)
        if (typeCall == 3 || typeCall == 1) {
          console.log("Gọi appChat")
          const newWindow = window.open();
          newWindow.location.href = `/crm/call-tong-dai?phone=${dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai}&id=${decodedToken?.data?._id}`, '_blank';
          await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: decodedToken?.data?._id,
              phone_number: dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai,
            }),
          });
        }
        else {
          router.push(`chat365:/${btoa(String(dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone))}/${btoa(String(decodedToken?.data?._id))}`)
          await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: decodedToken?.data?._id,
              phone_number: dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai,
            }),
          });
        }
      }

      setListPhone([])
      if (infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai)
        setDataPhone(null)
    }
    // call()
    const thongke_stdkhach = async () => {

      setOpenWF(false)
      const date_now = new Date();
      const vietnam_time = new Date(date_now.getTime() + (7 * 60 * 60 * 1000));
      const formatted_date = vietnam_time.toISOString().split('T')[0];


      const resPhoneCus = await axios.post("https://voip.timviec365.vn/api/check_cusphone_statical",
        {
          phone_customer: dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone,
          date_now: formatted_date,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          }
        }
      )

      if (resPhoneCus?.data?.data?.totalRecords >= 1) {

        setDataCus(resPhoneCus?.data?.data?.list_line_num);
        setWarningCus(true);
        setIsOpenMd(true)
      } else {
        call()
      }
    }
    thongke_stdkhach();
  }
  if (isStillCall) {

    setIsStillCall(false);
    setWarningCus(false);
    //loading
    const call = async () => {
      let idChatKhach = await getIdChatFromPhoneNum(dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai);
      console.log("ID CHAT STILL", idChatKhach);
      if (typeDevice == 1) {
        try {
          console.log("Gọi điện thoại bàn")
          setIsloading(true)
          if (client) {
            client.publish("handle_call", `start;${dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai};${kdinfo?.extension_number};${decodedToken?.data?._id};${key};${decodedToken?.data?.userName};${idChatKhach}`);

            client.on("message", async (topic, data) => {
              if (topic == "handle_call" && data.toString().split(';')[1] == decodedToken?.data?._id &&
                data.toString().split(';')[2] == key) {
                if (data.toString().split(';')[0] == 'begin') {
                  console.log('Bắt đầu cuộc gọi:', data.toString());
                  setIsloading(false);
                  setRunningCall(false)
                }
                if (data.toString().split(';')[0] == 'end') {
                  console.log('Cuộc gọi kết thúc:', data.toString());
                  setIsloading(false);
                  setRunningCall(false)
                }

                if (data.toString().split(';')[0] == 'reject') {
                  console.log('Khách từ chối cuộc gọi:', data.toString());
                  setRunningCall(false)
                  setIsloading(false);
                  window.alert("Khách từ chối cuộc gọi hoặc không nghe máy")
                }

                if (data.toString().split(';')[0] == 'success') {
                  console.log('Gọi thành công:', data.toString());
                  setRunningCall(false)
                  setIsloading(false);
                  window.alert("Gọi thành công")
                }
              }
            });
          }
        } catch (error) {
          window.alert(`Cuộc gọi thất bại : ${error.message}`)
          setRunningCall(false)
          setIsloading(false);
          console.log("error", error);
        }
      }
      else {
        setIsloading(false)
        if (typeCall == 3 || typeCall == 1) {
          console.log("Gọi appChat")
          const newWindow = window.open();
          newWindow.location.href = `/crm/call-tong-dai?phone=${dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai}&id=${decodedToken?.data?._id}`, '_blank';
          await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: decodedToken?.data?._id,
              phone_number: dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai,
            }),
          });
        }
        else {
          router.push(`chat365:/${btoa(String(dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone))}/${btoa(String(decodedToken?.data?._id))}`)
          await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: decodedToken?.data?._id,
              phone_number: dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai,
            }),
          });
        }
      }

      setListPhone([])
      if (infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai)
        setDataPhone(null)
    }
    call()
  }
  if (sendSMS) {
    client.publish("send_sms", `${keyApp}/${contentSms}`)
    setSendSMS(false)
  }
  if (sendMail) {
    setSendMail(false)
    // gửi mail - lỗi bỏ qua
    const call = async () => {
      try {
        const mail = infoCus?.email?.info || infoCus?.data2?.email
        const list_mail = []
        list_mail.push(mail)
        if (mail) {
          await axios.post("https://api.timviec365.vn/api/qlc/ai/SendExactly",
            {
              ID: decodedToken?.data?._id,
              List_Gmail: list_mail,
              Title: title,
              checked: typeSendMail,
              file: typeSendMail ? fileMail : null,
              content: typeSendMail ? null : contentMail,
            },
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )

          window.alert("Gửi thành công")
          setOpenZalo(true)
        }
      } catch (error) {
        console.log("Gửi mail thất bại")
        setOpenZalo(true)
      }
    }
    call()
  }
  if (call) {


    const Call_CRM = () => {
      if (typeCall == 3 || typeCall == 1) {
        setCall(false)
        const callAPI = async () => {
          try {
            const arr_phone = infoCus?.phone_number?.info?.split(",");
            if (arr_phone?.length === 1 || infoCus?.data2?.dien_thoai || dataPhone) {
              const phone_number = dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone
              const id_chat = decodedToken?.data?._id;

              if (regex.test(phone_number)) {
                const result = await axios.post("https://voip.timviec365.vn/api/statistical_module",
                  {
                    userId: id_chat,
                    phone: phone_number,
                  },
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${Cookies.get("token_base365")}`,
                    }
                  }
                )

                if (result?.data?.data?.data?.length) {

                  setDataHisModule(result?.data?.data?.data)
                  setOpenHisModule(true)
                }
                else {
                  Call_Module()
                }
              }
              else {
                if ((dataPhone && (dataPhone == infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai)) || (!dataPhone && (infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai))) {
                  setRecipientMail(email || infoCus?.email?.info || infoCus?.data2?.email)
                }
                else {
                  setRecipientMail("")
                }

                if ((email || infoCus?.email?.info || infoCus?.data2?.email) && emailRegex.test(email || infoCus?.email?.info || infoCus?.data2?.email)) {
                  setOpenMail(true)
                }
                else setOpenZalo(true)
                setOpenWF(true)
              }


            } else {
              if (!arr_phone?.length) {
                window.alert("Vui lòng nhập số điện thoại")
              }
              else {
                setListPhone(arr_phone);
                setIsModalOpen(true);
              }
            }
          } catch (error) {
            window.alert(`Có lỗi xảy ra : ${error?.message}`)
          }
        }
        callAPI()
      }
      else {
        const arr_phone = infoCus?.phone_number?.info?.split(",");
        if (arr_phone?.length === 1 || infoCus?.data2?.dien_thoai || dataPhone) {
          if ((dataPhone && (dataPhone == infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai)) || (!dataPhone && (infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai))) {
            setRecipientMail(email || infoCus?.email?.info || infoCus?.data2?.email)
          }
          else {
            setRecipientMail("")
          }
          if ((email || infoCus?.email?.info || infoCus?.data2?.email) && emailRegex.test(email || infoCus?.email?.info || infoCus?.data2?.email)) setOpenMail(true)
          else setOpenZalo(true)
          setCall(false)
          setOpenWF(true)
        } else {
          if (!arr_phone?.length) {
            window.alert("Vui lòng nhập số điện thoại")
          }
          else {
            setListPhone(arr_phone);
            setCall(false)
            setIsModalOpen(true);
          }
        }
      }
    }
    Call_CRM()
  }
  if (openApp) {
    setOpenSMS(true)
    setOpenApp(false)
  }
  const handleCalling = async (phone: string) => {

    setDataPhone(phone)
    if (typeCall == 3 || typeCall == 1) {
      setCall(false)
      const callAPI = async () => {
        try {

          const arr_phone = infoCus?.phone_number?.info?.split(",");
          if (phone || arr_phone?.length === 1 || infoCus?.data2?.dien_thoai || dataPhone) {
            const phone_number = phone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone
            const id_chat = decodedToken?.data?._id;

            if (regex.test(phone_number)) {
              const result = await axios.post("https://voip.timviec365.vn/api/statistical_module",
                {
                  userId: id_chat,
                  phone: phone_number,
                },
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${Cookies.get("token_base365")}`,
                  }
                }
              )

              if (result?.data?.data?.data?.length) {

                setDataHisModule(result?.data?.data?.data)
                setOpenHisModule(true)
              }
              else {
                Call_Module()
              }
            }
            else {
              if ((dataPhone && (dataPhone == infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai)) || (!dataPhone && (infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai))) {
                setRecipientMail(email || infoCus?.email?.info || infoCus?.data2?.email)
              }
              else {
                setRecipientMail("")
              }

              if ((email || infoCus?.email?.info || infoCus?.data2?.email) && emailRegex.test(email || infoCus?.email?.info || infoCus?.data2?.email)) setOpenMail(true)
              else setOpenZalo(true)
              setOpenWF(true)
            }


          } else {
            if (!arr_phone?.length) {
              window.alert("Vui lòng nhập số điện thoại")
            }
            else {
              setListPhone(arr_phone);
              setIsModalOpen(true);
            }
          }
        } catch (error) {
          window.alert(`Có lỗi xảy ra : ${error?.message}`)
        }
      }
      callAPI()
    }
    else {
      if ((dataPhone && (dataPhone == infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai)) || (!dataPhone && (infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai))) {
        setRecipientMail(email || infoCus?.email?.info || infoCus?.data2?.email)
      }
      else {
        setRecipientMail("")
      }
      if ((email || infoCus?.email?.info || infoCus?.data2?.email) && emailRegex.test(email || infoCus?.email?.info || infoCus?.data2?.email)) setOpenMail(true)
      else setOpenZalo(true)
      setOpenWF(true)
    }

    setIsModalOpen(false);
  };
  const Call_Module = async () => {
    const phone_number = dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone
    const id_chat = decodedToken?.data?._id;
    setKeyApp(key)
    let check_open_app = false
    let running_app = false
    if (client) {
      if ((dataPhone && (dataPhone == infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai)) || (!dataPhone && (infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai))) {
        setRecipientMail(email || infoCus?.email?.info || infoCus?.data2?.email)
      }
      else {
        setRecipientMail("")
      }
      client.publish("send_sms", `call/${phone_number}/${key}/${id_chat}`)

      if ((email || infoCus?.email?.info || infoCus?.data2?.email) && emailRegex.test(email || infoCus?.email?.info || infoCus?.data2?.email)) setOpenMail(true)
      else setOpenZalo(true)
      client.on("message", async (topic, data) => {
        if (topic == "call_hotline_err") {
          if (data.toString()?.split("/")[0] == key) {

            if (Number(data.toString()?.split("/")[1]) == 1) {
              send_error_to_call(phone_number, "Chưa cắm module sim")
              window.alert("Bạn chưa cắm module sim --> Vui lòng cắm module sim để thực hiện lại")
              // setOpenWF(true)
            }
            else {
              send_error_to_call(phone_number, "Gọi không thành công")
              window.alert("Gọi không thành công")
            }
          }
        }
        if (topic == "open_app" && data.toString() == key) {
          setCheckRunCall(true)

          if (!openApp) {
            check_open_app = true
            setOpenApp(true)
          }
          else {
            check_open_app = true
          }
        }

        if (topic == "running_app" && data.toString() == key) {
          running_app = true
          setCheckRunning(true)

        }
        if (topic == "history_call" && data.toString().split(';')[1] == key) {



          let formattedDateStart = data.toString().split(';')[2]

          if (formattedDateStart) {
            const endTime = new Date(
              Number(formattedDateStart.split("/")[2]?.split(" ")[0]),
              Number(formattedDateStart.split("/")[1]),
              Number(formattedDateStart.split("/")[0]),
              Number(formattedDateStart.split("/")[2]?.split(" ")[1]?.split(":")[0]) || 0,
              Number(formattedDateStart.split("/")[2]?.split(" ")[1]?.split(":")[1]) || 0,
              Number(formattedDateStart.split("/")[2]?.split(" ")[1]?.split(":")[2]) || 0,
            ).getTime() + Number(data?.toString()?.split(';')[5]?.slice(0, -1)) * 1000

            const startTime = new Date(
              Number(formattedDateStart.split("/")[2]?.split(" ")[0]),
              Number(formattedDateStart.split("/")[1]),
              Number(formattedDateStart.split("/")[0]),
              Number(formattedDateStart.split("/")[2]?.split(" ")[1]?.split(":")[0]) || 0,
              Number(formattedDateStart.split("/")[2]?.split(" ")[1]?.split(":")[1]) || 0,
              Number(formattedDateStart.split("/")[2]?.split(" ")[1]?.split(":")[2]) || 0,
            ).getTime()

            const yearend = new Date(endTime).getFullYear();
            const monthend = new Date(endTime).getMonth() < 10 ? '0' + new Date(endTime).getMonth() : new Date(endTime).getMonth();
            const dayend = new Date(endTime).getDate() < 10 ? '0' + new Date(endTime).getDate() : new Date(endTime).getDate();
            const hourend = new Date(endTime).getHours() < 10 ? '0' + new Date(endTime).getHours() : new Date(endTime).getHours();
            const minuteend = new Date(endTime).getMinutes() < 10 ? '0' + new Date(endTime).getMinutes() : new Date(endTime).getMinutes();
            const secondend = new Date(endTime).getSeconds() < 10 ? '0' + new Date(endTime).getSeconds() : new Date(endTime).getSeconds();

            const yearStart = new Date(startTime).getFullYear();
            const monthStart = new Date(startTime).getMonth() < 10 ? '0' + new Date(startTime).getMonth() : new Date(startTime).getMonth();
            const dayStart = new Date(startTime).getDate() < 10 ? '0' + new Date(startTime).getDate() : new Date(startTime).getDate();
            const hourStart = new Date(startTime).getHours() < 10 ? '0' + new Date(startTime).getHours() : new Date(startTime).getHours();
            const minuteStart = new Date(startTime).getMinutes() < 10 ? '0' + new Date(startTime).getMinutes() : new Date(startTime).getMinutes();
            const secondStart = new Date(startTime).getSeconds() < 10 ? '0' + new Date(startTime).getSeconds() : new Date(startTime).getSeconds();



            formattedDateStart = `${yearStart}-${monthStart}-${dayStart} ${hourStart}:${minuteStart}:${secondStart}`;
            const formattedDateEnd = `${yearend}-${monthend}-${dayend} ${hourend}:${minuteend}:${secondend}`;


            try {
              const resStatiscal = await fetch(
                'https://voip.timviec365.vn/api/statical_call',
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token_base365")}`,
                  },
                  body: JSON.stringify({
                    line_number: kdinfo?.extension_number,
                    cus_phone: dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai,
                    start: formattedDateStart,
                    end: formattedDateEnd,
                    duration: Number(data?.toString()?.split(';')[5]?.slice(0, -1)).toFixed(2) || 0,
                    phoneCall: data?.toString()?.split(';')[0],
                    ep_id: decodedToken?.data?.idQLC
                  }),
                }
              )
              window.alert("Gọi thành công")
            } catch (error) {
              window.alert("Có lỗi xảy ra")
            }
          }
        }
      })

      await new Promise((resolve) => setTimeout(resolve, 5000));

      setOpenCheck(true)
      await new Promise((resolve) => setTimeout(resolve, 10000));

      setCheckCall(true)
    } else {
      setOpenWF(true)
    }
  }

  const columns = [
    {
      title: "STT",
      width: 20,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Sdt khách hàng",
      width: 50,
      dataIndex: 'customerPhone',
      key: 'customerPhone'
    },
    {
      title: "Số line chuyên viên",
      width: 30,
      dataIndex: 'lineNumber',
      key: "lineNumber",
    },
    {
      title: "Thời gian",
      width: 60,
      dataIndex: 'timeEnd',
      key: "timeEnd",
      render: (text: any, record: any) => (
        <p>{text}</p>
      )
    },
  ];

  return (

    <>
      {isOpenMd ? <Modal
        open={isOpenMd}
        title={"Thống kê số lần gọi khách hàng"}
        centered
        className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
        onOk={() => {

        }}
        onCancel={() => {
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <b>Số điện thoại khách hàng này đã được gọi trong ngày hôm nay</b>
          <Table
            dataSource={dataCus}
            columns={columns}
            bordered
            scroll={{ y: 500 }}
          />
          <p>Bạn có muốn tiếp tục gọi hay không ?</p>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '30px' }}>
            <button className={styles.huyb} type="submit" onClick={okModalWrCus} >
              <p className={styles.texthuyb}>Có</p>
            </button>

            <button className={styles.huyb} type="submit" onClick={noModalWrCus} >
              <p className={styles.texthuyb}>Không</p>
            </button>
          </div>
        </div>
      </Modal> :
        isloading ? <Modal
          title="Cuộc gọi đang diễn ra"
          width={300}
          footer={null}
          open={isloading && !warningCus}
          maskClosable={true}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <audio controls hidden autoPlay loop={!isringing}>
              <source src="/crm/ring.mp4" type="audio/mp4" />
              Your browser does not support the audio element.
            </audio>
            <img
              onClick={toggleRinging}
              src={!isringing ? "/crm/onloa.png" : "/crm/offloa.png"}
              alt="Speaker"
              style={{ width: '50px', height: '50px', marginTop: '20px' }}
            />
            <div
              className={`${styles.loader}`}
              style={{ width: '40px', aspectRatio: '2', marginTop: '10px' }}
            />

            <button className={styles.huyb} type="submit" onClick={closeModal} >
              <p className={styles.texthuyb}>X</p>
            </button>
          </div>
        </Modal>

          : (<div
            className={`${styles.business_assistant_item} ${styles.business_assistant_item_phone}`}
          >
            <div
              className={`${styles.business_assistant_item_gray} ${styles.box_phone}`}
            >
              <label className={styles.lbl_title}>Số điện thoại</label>
              <form action="" onSubmit={() => false} style={{ width: "100%" }}>
                <input
                  onChange={(event) => setDataPhone(event?.target?.value?.replace(/\D/g, ''))}
                  autoFocus={true}
                  type="text"
                  ref={refPhone}
                  // disabled={false}
                  defaultValue={dataPhone || infoCus?.phone_number?.detail || infoCus?.data2?.dien_thoai}
                  className={styles.input_phone}
                  value={dataPhone || infoCus?.phone_number?.detail || infoCus?.data2?.dien_thoai}
                />
              </form>
            </div>
            <>
              <button
                type="button"
                className={styles.phone_btn_icon}
                onClick={() => dataDevice ? setOpenKey(true) : setChooseDevice(true)}
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                  fill="currentColor"
                  width="28px"
                  height="28px"
                >
                  <path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z" />
                </svg> */}
                <Image
                  width={36}
                  height={36}
                  src="/crm/phone.svg"
                  alt="hungha365.com"
                />
              </button>

              {/* <button
                style={{ marginLeft: "30px" }}
                type="button"
                className={styles.phone_btn_icon}
                onClick={() => {
                  console.log("warningCuswarningCuswarningCus", warningCus)
                  console.log("isloadingisloadingisloadingisloading", isloading)
                  dataDevice ? setOpenKey(true) : setChooseDevice(true)
                }}
              >
                <Image
                  width={36}
                  height={36}
                  src="/crm/phone.svg"
                  alt="hungha365.com"
                />
              </button> */}

              <button
                style={{ marginLeft: "30px" }}
                type="button"
                className={styles.phone_btn_icon}
                onClick={() => setChooseDeviceNew(true)}
              >
                <SettingOutlined style={{ fontSize: "20px" }} />
              </button>

            </>
            <Modal
              title="Thiết bị sử dụng khi gọi tổng đài"
              open={chooseDevice}
              width={300}
              maskClosable={true}
              footer={null}
            >
              {[1, 2]?.map((e, index) => (
                <div
                  key={index}
                  className={styles.phone_item}
                  onClick={() => update_device(e)}
                >
                  {e == 1 ? 'Điện thoại bàn' : 'Tai nghe'}
                </div>
              ))}
            </Modal>

            {/* <Modal
              title="Gọi đến app chat 365"
              open={chooseDeviceApp}
              closable={true}
              width={500}
              maskClosable={true}
              footer={null}
              onCancel={() => { setChooseDeviceApp(false) }}
            >
              <CallApp
                dataDevice={dataDevice}
                setOpenKey={setOpenKey}
                setChooseDevice={setChooseDevice}
                setChooseDeviceApp={setChooseDeviceApp}
                setOpenMail={setOpenMail}
                phoneNumber={dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai}
                lineKD={kdinfo?.extension_number}
              />
            </Modal> */}

            <Modal
              title="Thiết bị sử dụng khi gọi tổng đài"
              open={chooseDeviceNew}
              width={300}
              maskClosable={true}
              onCancel={() => setChooseDeviceNew(false)}
              footer={null}
            >
              {[1, 2]?.map((e, index) => (
                <div
                  key={index}
                  className={styles.phone_item}
                  onClick={() => update_device_new(e)}
                >
                  {e == 1 ? 'Điện thoại bàn' : 'Tai nghe'}
                </div>
              ))}
            </Modal>

            <Modal
              title="Danh sách số điện thoại"
              open={isModalOpen}
              width={300}
              maskClosable={true}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
            >
              {listPhone?.map((phone, index) => (
                <div
                  key={index}
                  className={styles.phone_item}
                  onClick={() => handleCalling(phone)}
                >
                  {phone}
                </div>
              ))}
            </Modal>
            {openMail && (<DetailMail
              isOpen={openMail}
              setIsOpen={setOpenMail}
              setOpenSMS={setOpenSMS}
              setTitle={setTitle}
              setContentMail={setContentMail}
              setTypeSendMail={setTypeSendMail}
              setFileMail={setFileMail}
              setSendMail={setSendMail}
              recipientMail={recipientMail || email}
              setOpenZalo={setOpenZalo}
              setOpenFB={setOpenFB}
            ></DetailMail>)}
            {openSMS && (<SendSMS
              isOpen={openSMS}
              setIsOpen={setOpenSMS}
              openMail={openMail}
              setContentSms={setContentSms}
              setSendSMS={setSendSMS}
              openZalo={openZalo}
              openFB={openFB}
            ></SendSMS>)}
            {openZalo && (<SendZalo
              isOpen={openZalo}
              setIsOpen={setOpenZalo}
              recipientMail={recipientMail || email}
              id_chat={decodedToken?.data?._id}
              phone={dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai}
              openMail={openMail}
              setOpenFB={setOpenFB}
            ></SendZalo>)}

            {openFB && (<SendFacebook
              isOpen={openFB}
              setIsOpen={setOpenFB}
              id_chat={decodedToken?.data?._id}
              openMail={openMail}
              openZalo={openZalo}
              link={infoCus?.link_user_post || ""}
            ></SendFacebook>)}

            {openHisModule && (<HisModule
              isOpen={openHisModule}
              setIsOpen={setOpenHisModule}
              data={dataHisModule}
              callCRM={Call_Module}
            ></HisModule>)}
          </div>
          )}
    </>


  );
}


