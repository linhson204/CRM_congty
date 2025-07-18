import styles from "./chat.module.css";
import InputPhone from "./input_phone";
import InputNameCustomer from "./input_name_customer";
import InputEmailCustomer from "./input_email_customer";
import SelectBoxInput from "./select_box_input";
import { dataOptions } from "../ultis/consntant";
import CalenderInput from "./calender_input";
import SaveBtnChat from "./saveBtnChat";
import TextEditor from "../text-editor/text_editor_phone";
import { useEffect, useRef, useState } from "react";
import TextEditorND from "../text-editor/text_editor_nd";
import { base_url } from "../service/function";
import SelectBoxInputNguon from "./nguonKH";
import SelectBoxInputNhomKh from "./nhomKh";
import SelectBoxInputNhomKhcon from "./khcon";
import { Select } from "antd";
import { useRouter } from "next/router";
import moment from "moment";
import React from "react";
import { Input, TimePicker } from "antd";
import dayjs from "dayjs";
import stylePotentialSlect from "@/components/crm/potential/potential.module.css";
import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";
import { CaretDownOutlined, DownCircleTwoTone } from "@ant-design/icons";
import { Router } from "next/router";
import Cookies from "js-cookie";
import { tr } from "date-fns/locale";
import { useSelector } from "react-redux";
import { doGhimCha, doSaveCha } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import TextEditorTLKDDes from "../text-editor/new_text_ditor_phonetlkd";
import NewCalenderInput from "./new_calendar_input";
import { validatePhone } from "@/utils/function";
export default function NewChatBusinessBody({ handleOpenChatBody, final_data = {} }: any) {
    console.log("final_data", final_data)
    const [listGr, setListGr] = useState([]);
    const [list_gr_child, setlistGr_Child] = useState([]);

    useEffect(() => { }, []);
    const [idChaSaved, setidChaSaved] = useState<any>(-1);
    const checkCha = useSelector((state: any) => state?.auth?.ghimCha);
    const [mail, setMail] = useState("")
    const [check, setCheck] = useState(false);
    const [nhonkhachhang, setnhonkhachhang] = useState<any>();
    const [nhomCon, setNhomCon] = useState<any>();
    const [tinhtrang, settinhtrang] = useState<any>();
    const [nguon, setnguon] = useState<any>();
    const [name, setName] = useState<any>();
    const refName = useRef<any>();
    const refMail = useRef<any>();
    const refPhone = useRef<any>();
    const [refDes, setrefDes] = useState<any>();
    const [content_call, setContentCall] = useState("");
    const [phone, setPhone] = useState()
    const [infoCus, setInfoCus] = useState<any>();
    const [refCall, setrefCall] = useState<any>();

    const [hisContent, sethisContent] = useState<any>([]);
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

    const getHisCus = async () => {
        try {
            if (final_data?.cus_id) {
                const res = await fetch(
                    `${base_url}/api/crm/customerdetails/showHisCus`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("token_base365")}`,
                        },
                        body: JSON.stringify({ cus_id: final_data?.cus_id }),
                    }
                );
                const data = await res.json();
                sethisContent(data?.data?.checkHis);
            }

        } catch (error) { }
    };

    useEffect(() => {

        getHisCus();

    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token_base365")}`,
                    },
                    body: JSON.stringify({ cus_id: final_data?.cus_id }),
                });
                const data = await res.json();
                if (data && data?.data) {
                    setInfoCus(data?.data);
                    setContentCall(data?.data?.text_record)
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        getData()
    }, [])
    console.log("infoCus", infoCus)
    console.log("content_call", content_call)

    const currentTime = moment(); // Thời điểm hiện tại

    useEffect(() => {
        if (checkCha) {
        }
    }, [idChaSaved]);

    const handleSelectNhomCha = (value) => {
        setnhonkhachhang(value);
        if (value > 0) {
            setCheck(true);
        } else {
            setCheck(false);
        }
    };

    const handleGetGr = async () => {
        try {
            const res = await fetch(
                `${base_url}/api/crm/group/list_group_khach_hang`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token_base365")}`,
                    },
                    body: JSON.stringify({ com_id: Cookies.get("com_id") }),
                }
            );
            let arr = [];
            const data = await res.json();
            setListGr(data?.data);
            if (!nhonkhachhang && data?.data && data?.data?.length && data?.data[0]?.gr_id) {
                setnhonkhachhang(data?.data[0]?.gr_id)
            }
            //   data?.data?.map((item) => {
            //     item?.lists_child.map((item) => {
            //       arr.push(item);
            //     });
            //     setlistGr_Child(arr);
            //   });
        } catch (error) { }
    };

    useEffect(() => {
        handleGetGr();
    }, []);

    useEffect(() => {
        if (nhonkhachhang && listGr) {
            const newArr = listGr?.filter(
                (item) => item?.gr_id === nhonkhachhang
            )?.[0]?.lists_child;
            setlistGr_Child(newArr);
            setNhomCon(newArr?.[0]?.gr_id || "");
        }
        if (nhonkhachhang === 0) {
            setlistGr_Child([]);
        }
    }, [nhonkhachhang]);

    // Lấy dữ liệu trên url, mở nhanh nút gọi, truyền tham số 
    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {
            const callNow = router.query['callNow']
            const cusName = router.query['cusName']
            const cusPhone = router.query['cusPhone']

            if (typeof callNow === 'string' && callNow == '1' && typeof cusName === 'string' && typeof cusPhone === 'string' && validatePhone(cusPhone)) {
                if (refPhone.current) {
                    const inputEl = refPhone.current as HTMLInputElement
                    // inputEl.value = cusPhone

                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set
                    nativeInputValueSetter.call(inputEl, cusPhone)

                    const event = new Event('input', { bubbles: true })
                    inputEl.dispatchEvent(event);
                }
                if (refName.current) {
                    const inputEl = refName.current as HTMLInputElement

                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set
                    nativeInputValueSetter.call(inputEl, cusName)

                    const event = new Event('input', { bubbles: true })
                    inputEl.dispatchEvent(event);
                }
            }

            // clean up
            if ((callNow || cusName || cusPhone) && refPhone.current && refName.current) {
                const url = new URL(window.location.href)

                const params = new URLSearchParams(url.search)
                params.delete('callNow')
                params.delete('cusName')
                params.delete('cusPhone')

                url.search = params.toString()

                window.history.pushState({}, '', url)
            }

        }
        return () => { }
    }, [router, router.isReady, router.query, refPhone, refName])

    return (
        <div className={styles.business_assistant_body}>
            <div className={styles.form_business_assistant}>
                <InputPhone infoCus={infoCus} refPhone={refPhone} setPhone={setPhone} hisContent={hisContent} sethisContent={sethisContent} email={mail} />
                <InputNameCustomer infoCus={infoCus} refName={refName} setChange={setName} />
                <InputEmailCustomer infoCus={infoCus} refMail={refMail} setMail={setMail} />
                <TextEditorTLKDDes
                    infoCus={infoCus}
                    title={"Mô tả khách hàng" as any}
                    className={"1"}
                    refDes={refDes}
                    setrefDes={setrefDes}
                />
                {/* <TextEditorND
          title={"Nội dung cuộc gọi" as any}
          className={"2"}
          setrefCall={setContentCall}
        /> */}
                <div>
                    <p style={{ fontWeight: "600", padding: "10px 0 0 5px" }}>
                        Lịch sử chăm sóc khách hàng
                    </p>
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
                <div>
                    <p style={{ fontWeight: "600", padding: "10px 0 0 5px" }}>
                        Nội dung cuộc gọi
                    </p>
                    <div style={{ width: "100%", padding: "0 5px" }}>
                        {" "}
                        <textarea
                            style={{ width: "100%", padding: "10px", fontSize: "14px" }}
                            rows={7}
                            placeholder="Chưa cập nhập"
                            defaultValue={infoCus?.text_record}
                            value={content_call}
                            onChange={(e) => setContentCall(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div
                        className={styles.form_group}
                        style={{ flex: 1, padding: "4.5px" }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div
                                style={{ padding: "5px 5px", color: "#474747" }}
                                className={styles.label}
                            >
                                {" "}
                                Nhóm khách hàng cha
                            </div>
                        </div>
                        <Select
                            value={nhonkhachhang || "Chọn nhóm khách hàng"}
                            onChange={(value) => handleSelectNhomCha(value)}
                            // defaultValue={group_idFix}
                            suffixIcon={
                                <i
                                    style={{ color: "black" }}
                                    className="bi bi-caret-down-fill"
                                ></i>
                            }
                            style={{
                                width: "100%",
                                // marginLeft: 5,
                                border: "1px solid black",
                                // borderRadius: "5px",
                            }}
                            showSearch
                            filterOption={(input, option: any) =>
                                option?.label.toLowerCase().includes(input.toLocaleLowerCase())
                            }
                            options={
                                listGr &&
                                listGr?.length > 0 && [
                                    { value: 0, label: "Chọn nhóm khách hàng" },
                                    ...listGr.map((item) => {
                                        return {
                                            value: item?.gr_id,
                                            label: item?.gr_name,
                                        };
                                    }),
                                ]
                            }
                        />
                    </div>

                    <div
                        className={styles.form_group}
                        style={{ flex: 1, padding: "4.5px" }}
                    >
                        <div style={{ padding: "5px 5px" }} className={styles.label}>
                            Nhóm khách hàng con
                        </div>
                        <div className={stylePotentialSlect.customer_list}>
                            <Select
                                showSearch
                                filterOption={(input, option: any) =>
                                    option?.label
                                        .toLowerCase()
                                        .includes(input.toLocaleLowerCase())
                                }
                                value={nhomCon || list_gr_child?.[0]?.gr_id || ""}
                                onChange={(value) => {
                                    setNhomCon(value);
                                }}
                                suffixIcon={
                                    <i
                                        style={{ color: "black" }}
                                        className="bi bi-caret-down-fill"
                                    ></i>
                                }
                                style={{
                                    width: "100%",
                                    border: "1px solid black",
                                    //   borderRadius: "5px",
                                }}
                                options={
                                    list_gr_child &&
                                    list_gr_child?.length > 0 && [
                                        ...list_gr_child.map((item) => {
                                            return {
                                                value: item?.gr_id,
                                                label: item?.gr_name,
                                            };
                                        }),
                                    ]
                                }
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ flex: 1 }}>
                        <SelectBoxInput
                            infoCus={""}
                            dataOption={dataOptions[0]}
                            title="Tình trạng khách hàng"
                            placeholder="Chọn tình trạng khách hàng"
                            settinhtrang={settinhtrang}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <SelectBoxInputNguon
                            setnguon={setnguon}
                            infoCus={""}
                            dataOption={dataOptions[1]}
                            title="Nguồn khách hàng"
                            placeholder="Chọn nguồn khách hàng"
                        />
                    </div>
                </div>
            </div>

            <NewCalenderInput />

            <SaveBtnChat
                tinhtrang={tinhtrang}
                nguon={nguon}
                nhomcha={nhonkhachhang}
                nhomCon={nhomCon}
                phone={phone || refPhone?.current?.value}
                name={name}
                email={refMail?.current?.value}
                desCription={refDes}
                refName={refName}
                content_call={content_call}
                handleOpenChatBody={handleOpenChatBody}
                add={1}
                hisContent={hisContent}
            />
        </div>
    );
}
