import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./chat.module.css";
import Image from "next/image";
import { notification, Modal } from "antd";
import jwt_decode from "jwt-decode";
const Cookies = require("js-cookie");
import mqtt from "mqtt"
import SendSMS from "./modal/send_sms"
import DetailMail from "./modal/send_mail"
import SendZalo from "./modal/send_message_zalo"
import axios from "axios";

export default function InputPhone({ infoCus, refPhone, setPhone }: any) {


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


        setClient(mqttClient);

        return () => {
            mqttClient.end();
        };

    }, [])


    const currentCookie = Cookies.get("token_base365");
    const decodedToken: any = jwt_decode(currentCookie);
    const regex = /^(086|096|097|098|032|033|034|035|036|037|038|039)\d{7}$/;
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listPhone, setListPhone] = useState([]);
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
    const key = `${decodedToken?.data?._id}${new Date().getTime()}${Math.floor(Math.random() * 999999)}`
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


    if (openCheck) {
        console.log("check cái cái ", checkRunning)
        if (!checkRunning && client) {
            router.push(`phoneai365:/${infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone}/${key}/${decodedToken?.data?._id}`)
            client.publish("send_sms", `call/${infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone}/${key}/${decodedToken?.data?._id}`)
            setCheckRunning(false)
            setOpenCheck(false)
        }
    }



    if (openWF) {
        const call = async () => {
            setOpenWF(false)
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
        call()
    }
    if (sendSMS) {
        console.log("truyền tin sms")
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

        if (typeCall == 3 || typeCall == 1) {
            setCall(false)
            const callAPI = async () => {
                try {
                    let check_open_app = false

                    const arr_phone = infoCus?.phone_number?.info?.split(",");
                    if (arr_phone?.length === 1 || infoCus?.data2?.dien_thoai || dataPhone) {
                        const phone_number = infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai || dataPhone
                        const id_chat = decodedToken?.data?._id;
                        if (regex.test(phone_number)) {

                            // const key = "1233212"
                            setKeyApp(key)
                            let running_app = false
                            if (client) {
                                setRecipientMail(infoCus?.email?.info || infoCus?.data2?.email)
                                client.publish("send_sms", `call/${phone_number}/${key}/${id_chat}`)
                                console.log("key", key)
                                if (infoCus?.email?.info || infoCus?.data2?.email) setOpenMail(true)
                                console.log("tới đây")
                                client.on("message", async (topic, data) => {
                                    if (topic == "call_hotline_err") {
                                        console.log(`data.toString()?.split("/")[0]`, data.toString()?.split("/")[0])
                                        console.log(`Number(data.toString()?.split("/")[1])`, Number(data.toString()?.split("/")[1]))
                                        if (data.toString()?.split("/")[0] == key) {
                                            if (Number(data.toString()?.split("/")[1]) == 1) {
                                                send_error_to_call(phone_number, "Chưa cắm module sim")
                                                window.alert("Bạn chưa cắm module sim --> Bắt đầu chuyển qua tổng đài")
                                                setOpenWF(true)
                                            }
                                            else {
                                                // send_error_to_call(phone_number, "Gọi không thành công")
                                                // window.alert("Gọi không thành công")
                                            }
                                        }
                                    }
                                    if (topic == "open_app" && data.toString() == key) {
                                        console.log("có open_app")
                                        if (!openApp) {
                                            console.log("1111111")
                                            check_open_app = true
                                            setOpenApp(true)
                                        }
                                        else {
                                            console.log("22222222222")
                                            check_open_app = true
                                        }
                                    }

                                    if (topic == "running_app" && data.toString() == key) {
                                        running_app = true
                                        setCheckRunning(true)
                                        console.log("có running_app")
                                    }
                                })

                                await new Promise((resolve) => setTimeout(resolve, 3000));
                                console.log("tới bật check")
                                setOpenCheck(true)


                                // setTimeout(() => {
                                //   console.log("running_app", running_app)
                                //   if (!running_app) {
                                //     router.push(`phoneai365:/${phone_number}/${key}/${id_chat}`)
                                //     client.publish("send_sms", `call/${phone_number}/${key}/${id_chat}`)
                                //   }
                                // }, 5000);
                                // await new Promise((resolve) => setTimeout(resolve, 10000));
                                // if (!check_open_app) {
                                //   send_error_to_call(phone_number, "Lỗi mở app gọi của Linh")
                                //   window.alert("Lỗi mở app")
                                //   setOpenWF(true)
                                // }
                                // setTimeout(() => {
                                //   console.log("check_open_app", check_open_app)
                                //   if (!check_open_app) {
                                //     send_error_to_call(phone_number, "Lỗi mở app gọi của Linh")
                                //     window.alert("Lỗi mở app")
                                //     setOpenWF(true)
                                //   }
                                // }, 10000);
                            }
                        }
                        else {
                            setRecipientMail(infoCus?.email?.info || infoCus?.data2?.email)
                            if (infoCus?.email?.info || infoCus?.data2?.email) setOpenMail(true)
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
            setCall(false)
            setOpenWF(true)
        }

        setDataPhone(null)
    }
    if (openApp) {
        setOpenSMS(true)
        setOpenApp(false)
    }
    const handleCallBtn = async () => {
        const call = async () => {
            try {
                const arr_phone = infoCus?.phone_number?.info?.split(",");
                // gửi mail - lỗi bỏ qua
                try {
                    // const mail = infoCus?.data2?.email
                    console.log("decodedToken?.data?._id", decodedToken?.data?._id)

                    const mail = "satthumauda@gmail.com"
                    const list_mail = []
                    list_mail.push(mail)
                    if (mail) {
                        axios.post("https://api.timviec365.vn/api/qlc/ai/SendExactly",
                            {
                                ID: 10022406,
                                List_Gmail: list_mail,
                                Title: "",
                                checked: "false",
                                content: "testsssssssssssss"
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        )
                    }
                } catch (error) {
                    console.log("gửi mail thất bại")
                }
                if (arr_phone?.length === 1 || infoCus?.data2?.dien_thoai) {
                    const phone_number = infoCus?.phone_number?.info || infoCus?.data2?.dien_thoai;
                    const id_chat = decodedToken?.data?._id;
                    //Gọi socket, link, bắn thông báo thành công
                    // router.push(`chat365:/${btoa(phone_number)}/${btoa(String(id_chat))}`);
                    const key = `${id_chat}${new Date().getTime()}${Math.floor(Math.random() * 999999)}`

                    router.push(`chat365:/${phone_number}/${decodedToken?.data?._id}/`)
                    // mqtt
                    console.log("tới đây")


                    client.on("connect", () => {
                        console.log("Connection")
                        client.subscribe("call_hotline", (error) => { })
                        client.subscribe("call_hotline_err", (error) => { })
                        client.on("message", async (topic, data, dataIP) => {
                            console.log("topic", topic)
                            if (topic == "call_hotline_err") {
                                if (data.toString() == key) {
                                    router.push(`chat365:/${btoa(phone_number)}/${btoa(String(id_chat))}`)

                                    // await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
                                    //   method: "POST",
                                    //   headers: {
                                    //     "Content-Type": "application/json",
                                    //   },
                                    //   body: JSON.stringify({
                                    //     user_id: id_chat,
                                    //     phone_number: phone_number,
                                    //   }),
                                    // });
                                }
                            }
                        })
                    })
                    // end mqtt
                    // try {
                    //   await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
                    //     method: "POST",
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //     },
                    //     body: JSON.stringify({
                    //       user_id: id_chat,
                    //       phone_number: phone_number,
                    //     }),
                    //   });
                    // } catch (error) { }

                } else {
                    setListPhone(arr_phone);
                    setIsModalOpen(true);
                }
            } catch (error) {
                window.alert(`Có lỗi xảy ra : ${error?.message}`)
            }
        }

        call()
    };
    const handleSendSMS = () => {
        setOpenSMS(true)
    }
    const handleCalling = async (phone: string) => {

        setDataPhone(phone)
        if (typeCall == 3 || typeCall == 1) {
            const callAPI = async () => {
                try {
                    if (phone) {
                        let check_open_app = false
                        const phone_number = phone
                        const id_chat = decodedToken?.data?._id;
                        if (regex.test(phone_number)) {
                            const key = `${id_chat}${new Date().getTime()}${Math.floor(Math.random() * 999999)}`
                            // const key = "1233212"
                            setKeyApp(key)
                            let running_app = false
                            if (client) {
                                setRecipientMail(infoCus?.email?.info || infoCus?.data2?.email)
                                client.publish("send_sms", `call/${phone_number}/${key}/${id_chat}`)
                                console.log("key", key)
                                if (infoCus?.email?.info || infoCus?.data2?.email) setOpenMail(true)
                                client.on("message", async (topic, data) => {
                                    if (topic == "call_hotline_err") {
                                        if (data.toString()?.split("/")[0] == key) {
                                            if (Number(data.toString()?.split("/")[1]) === 1) {
                                                window.alert("Bạn chưa cắm module sim --> Bắt đầu chuyển qua tổng đài")
                                                send_error_to_call(phone_number, "Chưa cắm module sim")

                                                setOpenWF(true)
                                            }
                                            else {
                                                // send_error_to_call(phone_number, "Gọi không thành công")
                                                // window.alert("Gọi không thành công")
                                            }
                                        }
                                    }
                                    if (topic == "open_app" && data.toString() == key) {
                                        console.log("có open_app")
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
                                        console.log("có running_app")
                                    }
                                })



                                await new Promise((resolve) => setTimeout(resolve, 3000));
                                setOpenCheck(true)
                                // setTimeout(() => {
                                //   if (!running_app) {
                                //     router.push(`phoneai365:/${phone_number}/${key}/${id_chat}`)
                                //     client.publish("send_sms", `call/${phone_number}/${key}/${id_chat}`)
                                //   }
                                // }, 3000);

                                // setTimeout(() => {
                                //   console.log("check_open_app", check_open_app)
                                //   if (!check_open_app) {
                                //     send_error_to_call(phone_number, "Lỗi mở app gọi của Linh")
                                //     window.alert("Lỗi mở app")
                                //     setOpenWF(true)
                                //   }
                                // }, 10000);
                            }
                        }
                        else {
                            setRecipientMail(infoCus?.email?.info || infoCus?.data2?.email)
                            if (infoCus?.email?.info || infoCus?.data2?.email) setOpenMail(true)
                            setOpenWF(true)
                        }


                    } else {
                        window.alert("Vui lòng nhập số điện thoại")
                    }
                } catch (error) {
                    window.alert(`Có lỗi xảy ra : ${error?.message}`)
                }
            }
            callAPI()
        }
        else {
            setOpenWF(true)
        }

        setIsModalOpen(false);
    };

    return (
        <>

            <div
                className={`${styles.business_assistant_item} ${styles.business_assistant_item_phone}`}
            >
                <div
                    className={`${styles.business_assistant_item_gray} ${styles.box_phone}`}
                >
                    <label className={styles.lbl_title}>Số điện thoại</label>
                    <form action="" onSubmit={() => false} style={{ width: "100%" }}>
                        <input
                            onChange={(event) => setDataPhone(event?.target?.value)}
                            type="text"
                            ref={refPhone}
                            // disabled={false}
                            defaultValue={infoCus?.phone_number?.detail || infoCus?.data2?.dien_thoai}
                            className={styles.input_phone}
                        />
                    </form>
                </div>


                {false ? (
                    <button type="button" className={styles.phone_btn_icon}>
                        <svg
                            width={36}
                            height={36}
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z"
                                fill="url(#paint0_linear_1051_739)"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.0111 16.5447C13.0884 16.1982 13.3344 15.9136 13.6659 15.7868C14.3723 15.5844 15.8023 15.3572 18.101 15.3572C20.3996 15.3572 21.9385 15.5863 22.641 15.781C22.9726 15.9079 23.2185 16.1925 23.2959 16.539L23.7923 18.3565C23.966 19.0037 24.1722 19.3168 24.829 19.4581L29.1246 20.3593C30.3713 20.6399 30.5833 20.3593 30.8085 19.7521C31.9884 16.602 31.4405 14.3625 23.5174 12.5831C21.381 12.1039 16.0811 11.8672 12.5204 12.6251C4.89322 14.246 4.27464 16.6707 5.4717 19.6739C5.70463 20.2886 5.86691 20.6189 7.06969 20.3669L11.3673 19.4104C12.0221 19.2672 12.2837 19.1393 12.4574 18.4883L13.0111 16.5447Z"
                                fill="white"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_1051_739"
                                    x1="18"
                                    y1="0"
                                    x2="18"
                                    y2="36"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stop-color="#FF4646" />
                                    <stop offset="1" stop-color="#FF3333" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className={styles.phone_btn_icon}
                            onClick={() => setCall(true)}
                        >
                            <Image
                                width={36}
                                height={36}
                                src="/crm/phone.svg"
                                alt="hungha365.com"
                            />
                        </button>
                        {/* <button
              onClick={() => setOpenZalo(true)}
            >
              test
            </button> */}
                    </>

                )}
                {/* <div className={styles.buttonWithHoverText}>
          <button
            style={{ marginLeft: "15px" }}
            type="button"
            className={styles.phone_btn_icon}
            onClick={() => setOpenMail(true)}
          >
            <Image
              width={36}
              height={36}
              src="/crm/gmail.png"
              alt="hungha365.com"
            />

            <div className={styles.buttonHoverText}>Mặc định sẽ tự gửi mail khi bạn gọi điện. Click chỉnh sửa lại nội dung</div>
          </button>

        </div> */}


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
                    recipientMail={recipientMail}
                    setOpenZalo={setOpenZalo}
                ></DetailMail>)}
                {openSMS && (<SendSMS
                    isOpen={openSMS}
                    setIsOpen={setOpenSMS}
                    openMail={openMail}
                    setContentSms={setContentSms}
                    setSendSMS={setSendSMS}
                    openZalo={openZalo}
                ></SendSMS>)}
                {openZalo && (<SendZalo
                    isOpen={openZalo}
                    setIsOpen={setOpenZalo}
                    setOpenSMS={setOpenSMS}
                    setTitle={setTitle}
                    setContentMail={setContentMail}
                    setTypeSendMail={setTypeSendMail}
                    setFileMail={setFileMail}
                    setSendMail={setSendMail}
                    recipientMail={recipientMail}
                    id_chat={decodedToken?.data?._id}
                    phone={dataPhone || infoCus?.phone_number?.info?.split(",")[0] || infoCus?.data2?.dien_thoai}
                    openMail={openMail}
                ></SendZalo>)}






            </div>


        </>


    );
}


