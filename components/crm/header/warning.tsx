"use client";
import style from "./header.module.css";
import Image from "next/image";
import useModal from "../hooks/useModal";
import WarningModal from "./modal_header/modal_warning";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { convertTimestampToFull, generateRandomString, validateMail, validatePhone } from "@/utils/function";
import { ConfigProvider, message, notification } from "antd";
import Cookies from "js-cookie";
import { base_url } from "../service/function";
import warningStyle from './warning.module.css'

const safeJsonParse = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.log("🚀 ~ safeJsonParse ~ error:", error?.message)
    return {}
  }
}

const convertTimestampToFull_safe = (time: number) => {
  try {
    return convertTimestampToFull(time)
  } catch (error) {
    return 'Lỗi thời gian'
  }
}

export default function WarningBtnHeader() {
  // const testIdQlc = 22423625

  const { isOpen, toggleModal } = useModal(style.help_open, [
    style.warning_icon_1,
    style.warning_icon_2,
  ]);
  const defaultPerPage = 10
  const [filter, setFilter] = useState<{
    idQLC: number,
    page: number,
    perPage: number,
  }>({
    idQLC: 0,
    page: 1,
    perPage: defaultPerPage,
  })
  // const isFirstMount = useRef(true)
  const [listWarning, setListWarning] = useState<any[]>([])
  const [totalUnread, setTotalUnread] = useState(0);
  const [api, contextHolder] = notification.useNotification({
    maxCount: 1
  });
  const [messageApi, messageContextHolder] = message.useMessage({
    maxCount: 1
  });
  const [idQLC, setIdQLC] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const isOpenRef = useRef(isOpen)
  const [isSmallWarning, setIsSmallWarning] = useState(true)

  /**
   * Bật / tắt thu nhỏ thông báo 
   */
  const toggleSmallWarning = () => {
    const isSmallWarning = localStorage.getItem('isSmallWarning')
    if (isSmallWarning && isSmallWarning == '1') {
      localStorage.setItem("isSmallWarning", "0")
      setIsSmallWarning(false)
    } else {
      localStorage.setItem("isSmallWarning", "1")
      setIsSmallWarning(true)
    }
    // setIsSmallWarning(isSmallWarning == '1')
  }

  /**
   * Gọi API lấy danh sách warning 
   * @param filter Điều kiện truyèn 
   */
  const handleGetListWarning = async (filter: any) => {
    setLoading(true)
    await fetch('/crm/api/job247_socket/get_list_warning', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter)
    })
      .then((res) => {
        // console.log("🚀 ~ .then ~ res:", res)
        return res.json()
      })
      .then((res2) => {
        // console.log("🚀 ~ .then ~ res2:", res2)
        setListWarning(rawToData(res2?.list))
        setTotalUnread(res2?.totalUnread || 0)
        setTotal(res2?.total || 0)
        // console.log("🚀 ~ .then ~ res2?.list:", res2?.list)
      })
      .catch((error) => {
        console.log("🚀 ~ handleGetListWarning ~ error:", error?.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  /**
   * Chuyển đổi dữ liệu từ api 
   * @param data Dữ liệu mảng từ api 
   * @returns Dữ liệu mảng đổ ra danh sách warning 
   */
  const rawToData = (data: any[]) => {
    try {
      const returnData = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element?.type == 1) { // Canh bao KH 
          const khObj = safeJsonParse(element?.extraStr)
          const item = {
            id: element?.id,
            img: '/crm/icon_kh.svg',
            name: element?.name || 'HungHa365',
            content: `Bạn có Khách hàng <strong>${khObj?.customerName || "[Tên chưa cập nhật]"}</strong> ${!!khObj?.phone ? `(<strong>${khObj?.phone}</strong>) ` : ""}${khObj?.groupName != "crm365NULL" && `đã được đưa vào nhóm <strong>${khObj?.groupName}</strong>`}`,
            isRead: element?.isRead,
            cusName: khObj?.customerName || "Tên chưa cập nhật",
            cusPhone: khObj?.phone,
            cusLink: khObj?.link,
            cusZalo: !!khObj?.phone ? `https://zalo.me/${khObj?.phone}` : '',
            timestamp: !!element?.time ? convertTimestampToFull_safe(element?.time) : '',
            typeWarning: element?.type,
          }
          returnData.push(item)
        } else {
          const item = {
            id: element?.id,
            img: '/crm/icon_kh.svg',
            name: element?.name || 'HungHa365',
            content: element?.contentHtml || "Thông báo trống",
            isRead: element?.isRead,
          }
          returnData.push(item)
        }
      }

      return returnData
    } catch (error) {
      console.log("🚀 ~ rawToData ~ error:", error?.message)
      return []
    }
  }

  /**
   * Hiện thêm warning 
   */
  const showMore = async () => {
    handleGetListWarning({
      ...filter,
      perPage: filter.perPage + 10,
    })
    setFilter((prev) => ({
      ...prev,
      perPage: filter.perPage + 10,
    }))
  }

  /**
   * Đổi trạng thái => đã xem của warning 
   * @param id id warning 
   */
  const readWarning = async (id: number | string) => {
    setListWarning((prev: any[]) => prev.map((item) => item?.id == id ? { ...item, isRead: true } : item))
    setTotalUnread((prev) => prev - 1)
    await fetch('/crm/api/job247_socket/read_warning', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        idQLC: idQLC
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((res2) => {
        // console.log("🚀 ~ .then ~ res2:", res2)
      })
      .catch((error) => {
        console.log("🚀 ~ readWarning ~ error:", error?.message)
      })
  }

  /**
   * Đổi trạng thái => đã xem của tất cả warning 
   */
  const readAllWarning = async () => {
    setListWarning((prev: any[]) => prev.map((item) => ({
      ...item,
      isRead: true
    })))
    setTotalUnread(0)
    await fetch('/crm/api/job247_socket/read_all_warning', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idQLC: idQLC
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((res2) => {
        // console.log("🚀 ~ .then ~ res2:", res2)
      })
      .catch((error) => {
        console.log("🚀 ~ readWarning ~ error:", error?.message)
      })
  }

  /**
   * Xóa warning 
   * @param id id warning
   */
  const deleteWarning = async (id: number | string) => {
    const checkExist = listWarning.find((item) => item?.id == id)
    setListWarning((prev) => prev.filter((item) => item?.id != id))
    if (checkExist && !checkExist?.isRead) {
      setTotalUnread(totalUnread - 1)
    }
    await fetch('/crm/api/job247_socket/delete_warning', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        idQLC: idQLC
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((res2) => {
        // console.log("🚀 ~ .then ~ res2:", res2)
      })
      .catch((error) => {
        console.log("🚀 ~ readWarning ~ error:", error?.message)
      })

    if (listWarning.length < (defaultPerPage / 2)) {
      handleGetListWarning(filter)
    }
  }

  // Xếp hàng các thông báo warning 
  // queue 
  let warningQueue: { customerName: string, groupName: string, link: string, phone: string, id: string | number }[] = [];
  // Trạng thái (có đang hiện thông báo)
  let isWarningVisible = false
  /**
   * Xử lý hàng đợi thông báo 
   */
  const processWarningQueue = () => {
    if (warningQueue.length == 0 || isWarningVisible) {
      return
    }

    isWarningVisible = true
    const { customerName, groupName, link, phone, id } = warningQueue.shift()

    openNotiWarning(customerName, groupName, link, phone, id)
  }

  /**
   * Xếp hàng đợi thông báo 
   * @param customerName Tên khách 
   * @param groupName Tên nhóm khách 
   * @param link Link khách 
   * @param phone Số điện thoại khách 
   * @param id id warning 
   */
  const queueWarning = (customerName: string, groupName: string, link: string, phone: string, id: string | number) => {
    warningQueue.push({ customerName, groupName, link, phone, id })
    processWarningQueue()
  }

  /**
   * Hiện thông báo khách hàng 
   * @param customerName Tên khách 
   * @param groupName Tên nhóm khách 
   * @param link Link khách 
   * @param phone Số điện thoại khách 
   * @param id id warning 
   */
  const openNotiWarning = (customerName: string, groupName: string, link: string, phone: string, id: string | number) => {

    const msgStr = `Bạn có Khách hàng <strong>${customerName}</strong> ${!!phone ? `(<strong>${phone}</strong>) ` : ""}${groupName != "crm365NULL" && `đã được đưa vào nhóm <strong>${groupName}</strong>`}`

    const handleOnCLose = () => {
      isWarningVisible = false
      processWarningQueue()
    }

    // check thong bao mini
    const isSmallWarning = localStorage.getItem('isSmallWarning')
    if (isSmallWarning && isSmallWarning == '1') {
      messageApi.warning(
        <span dangerouslySetInnerHTML={{
          __html: msgStr
        }}></span>,
        5,
        () => {
          handleOnCLose()
        }
      )
    } else {
      const key = `warning${Date.now()}${generateRandomString(6)}`
      const btn = (
        <>
          <div className={warningStyle.groupBtn}>
            {
              !!phone && validatePhone(phone) &&
              <button
                className={`${warningStyle.btn} ${warningStyle.btn_call}`}
                onClick={() => {
                  api.destroy(key)
                  handleOnCLose()
                  // readWarning(id)
                  callNow(customerName, phone, id)
                }}
              >
                <p>Gọi</p>
                <img src="/crm/phone-solid-white.svg" alt="call" />
              </button>
            }
            {
              !!phone && validateMail(phone) &&
              <button
                className={`${warningStyle.btn}`}
                onClick={() => {
                  api.destroy(key)
                  handleOnCLose()
                  // readWarning(id)
                  // callNow(customerName, phone, id)
                  window.location.href = `mailto:${phone}`
                }}
              >
                <p>Mail</p>
                <img src="/crm/envelope-regular.svg" alt="mail" />
              </button>
            }
            {
              !!link &&
              <button
                className={`${warningStyle.btn} ${warningStyle.btn_link}`}
                // href={link}
                // target="_blank"
                onClick={() => {
                  api.destroy(key)
                  handleOnCLose()
                  readWarning(id)
                  window.open(link.startsWith("http") ? link : encodeURI(`https://timviec365.vn/${link}`), '_blank')
                }}
              >
                <p>Link khách</p>
                <img src="/crm/link-solid.svg" alt="link" />
              </button>
            }
            {
              !!phone && validatePhone(phone) &&
              <button
                className={`${warningStyle.btn} ${warningStyle.btn_zalo}`}
                // href={`https://zalo.me/${phone}`}
                // target="_blank"
                onClick={() => {
                  api.destroy(key)
                  handleOnCLose()
                  readWarning(id)
                  window.open(`https://zalo.me/${phone}`, "_blank")
                }}
              >
                <p>Zalo</p>
                <img src="/crm/zalo_white.svg" alt="zalo" />
              </button>
            }
            <button
              className={`${warningStyle.btn} ${warningStyle.btn_red}`}
              onClick={() => {
                warningQueue = []
                api.destroy()
                handleOnCLose()
              }}
            >
              <p>Đóng tất cả</p>
            </button>
            <button
              className={`${warningStyle.btn}`}
              onClick={() => {
                api.destroy()
                toggleSmallWarning()
                handleOnCLose()
              }}>
              Thu nhỏ
            </button>
          </div>
        </>
      )

      api.open({
        message: 'Thông báo khách hàng',
        description: (
          // <>
          //   Bạn có Khách hàng <strong>{customerName}</strong> {!!phone && <><span>{"("}</span><strong>{phone}</strong><span>{")"}</span></>} {groupName != "crm365NULL" && <>đã được đưa vào nhóm <strong>{groupName}</strong></>}
          // </>
          <span dangerouslySetInnerHTML={{
            __html: msgStr
          }}></span>
        ),
        btn,
        key,
        duration: 5,
        onClose() {
          handleOnCLose()
        },
      })
    }

  }

  /**
   * Chuyển sang trang danh sách khách hàng, mở nhanh modal gọi khách và điền thông tin sẵn 
   * @param cusName Tên khách 
   * @param cusPhone Số điện thoại khách 
   * @param id id warning 
   */
  const callNow = async (cusName: string, cusPhone: string, id: number | string) => {
    await readWarning(id)
    const currentDomain = window.location.origin
    const url = new URL('/crm/customer/list', currentDomain)
    url.searchParams.set('callNow', '1')
    url.searchParams.set('cusName', cusName || "")
    url.searchParams.set('cusPhone', cusPhone || "")

    window.location.href = url.toString()
  }

  const handleDeleteAllRead = async () => {
    await fetch('/crm/api/job247_socket/delete_all_read_warning', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idQLC: idQLC
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((res2) => {
        // console.log("🚀 ~ .then ~ res2:", res2)
        handleGetListWarning(filter)
      })
      .catch((error) => {
        console.log("🚀 ~ readWarning ~ error:", error?.message)
      })
  }

  /**
   * Lấy idQLC 
   */
  const getUserId = async () => {
    const res = await fetch(`${base_url}/api/qlc/employee/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
    })
      .then(async (result) => {
        const data = await result.json();
        setIdQLC(data?.data?.data?.idQLC || 0)
        setFilter((prev) => ({
          ...prev,
          idQLC: data?.data?.data?.idQLC || 0,
        }))
        handleGetListWarning({
          idQLC: data?.data?.data?.idQLC || 0,
          page: 1,
          perPage: defaultPerPage,
        })
      })
      .catch((error) => {
        console.log("🚀 ~ getUserId ~ error:", error)
      });
  }

  // Khởi tạo lấy idQLC
  useEffect(() => {
    getUserId()

    // self correcting
    const checkIsSmallWarning = () => {
      if (window && typeof window !== 'undefined') {
        const checkIsSmall = localStorage.getItem('isSmallWarning')
        console.log("🚀 ~ checkIsSmallWarning ~ check:", checkIsSmall)
        if (checkIsSmall) {
          if (checkIsSmall == '1') {
            setIsSmallWarning(true)
          } else {
            setIsSmallWarning(false)
          }
        } else {
          localStorage.setItem('isSmallWarning', '1')
          setIsSmallWarning(true)
        }
      }
    }

    checkIsSmallWarning()

    return () => { }
  }, [])

  // socket 
  useEffect(() => {
    const socket = io('https://job247.vn/socket', {
      secure: true,
      // enabledTransports: ["https"],
      transports: ["websocket", "polling"],
    })
    if (!!idQLC) {
      socket.on('connect', () => {

        // Test kết nối 
        socket.emit('ping', 'hello')
        socket.on('pong', (msg) => {
          console.log('connect job247_socket', msg);
        })

        // Tham gia socket nhận thông báo khách hàng 
        socket.emit('CRMJoin', idQLC)
        socket.on('CRMNotification', (content, customerName, customerId, groupName, link, type, phone, id) => {
          // console.log("🚀 ~ socket.on ~ content, customerName, customerId, groupName, link, type, phone:", content, customerName, customerId, groupName, link, type, phone)
          if (type == 1) {
            // openNotiWarning(customerName, groupName, link, phone, id)
            queueWarning(customerName, groupName, link, phone, id)
          }
          if (!isOpenRef.current) {
            handleGetListWarning(filter)
          }
        })
        socket.on('CRMNotificationRefresh', () => {
          handleGetListWarning(filter)
        })
      })
    }

    return () => {
      socket.disconnect()
    }
  }, [idQLC])

  // Cập nhật khi mở, reset khi đóng 
  useEffect(() => {
    if (!!isOpen) {
      handleGetListWarning(filter)
    }

    if (!isOpen) {
      setFilter((prev) => ({
        ...prev,
        perPage: defaultPerPage,
      }))
    }

    isOpenRef.current = isOpen
    return () => { }
  }, [isOpen])

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Notification: {
              width: 500
            }
          }
        }}
      >
        {contextHolder}
        {messageContextHolder}
      </ConfigProvider>
      <Image
        className={style.warning_icon_1}
        width={28}
        height={28}
        alt=".."
        onClick={toggleModal}
        src={totalUnread > 0 ? "/crm/help_alert.svg" : "/crm/help.svg"}
      />
      <Image
        className={style.warning_icon_2}
        width={28}
        height={28}
        onClick={toggleModal}
        alt=".."
        src={totalUnread > 0 ? "/crm/icon-help-1024_alert.svg" : "/crm/icon-help-1024.svg"}
      />
      {totalUnread > 0 && (
        <div className={style.totalUnread}>
          {totalUnread > 99 ? "99+" : totalUnread}
        </div>
      )}

      {
        isOpen &&
        <WarningModal
          listWarning={listWarning}
          handleRefresh={() => handleGetListWarning(filter)}
          isShowMore={listWarning.length < total}
          handleShowMore={showMore}
          isLoading={loading}
          handleRead={readWarning}
          handleReadAll={readAllWarning}
          handleDelete={deleteWarning}
          handleCallNow={callNow}
          isOpen={isOpen}
          isSmallWarning={isSmallWarning}
          setIsSmallWarning={setIsSmallWarning}
          toggleSmallWarning={toggleSmallWarning}
          handleDeleteAllRead={handleDeleteAllRead}
        />
      }
    </>
  );
}
