// import io from 'socket.io-client';
// import mediasoupClient from 'mediasoup-client';
// import Application from "@/utils/mediasoup_call/Application";
import { storeCall } from "@/utils/mediasoup_call/call_client_repo";
import CallClient from "@/utils/mediasoup_call/CallClient";
import CallState from "@/utils/mediasoup_call/constants/CallState";
import jwt_decode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { default as AudioMediaSoup } from "../call_mediasoup/audio";
import style from "./styles.module.css";
const Cookies = require("js-cookie");




const CallToAppMedal = ({ lineKD, contactInfo, setIsStartCall, setOpenMail, cusPhone }) => {
  const currentCookie = Cookies.get("token_base365");
  const decodedToken = jwt_decode(currentCookie);

  //mic va cam cua minh
  const [isOwnUsingMic, setIsOwnUsingMic] = useState(true);
  //mic va cam cua nguoi khac
  const [isOtherUsingMic, setOtherOwnUsingMic] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [isRemoteConnected, setIsRemoteConnected] = useState(false);

  const callClient = CallClient.getInstance();

  let start;

  useEffect(() => {
    if (callClient.app.localVideoStream != null && localStream == null) {
      setLocalStream(callClient.app.localVideoStream);
    }
    const handleStreamUpdate = (updatedStream) => {
      setRemoteStream(updatedStream);
    };
    if (callClient.app.remoteVideoStream != null && remoteStream == null) {
      setRemoteStream(callClient.app.remoteVideoStream);
    }
    callClient.app.on('remoteVideoSteamUpdated', handleStreamUpdate);
    console.log("localStream", localStream);
    console.log("remoteStream", remoteStream);
    if (localStream != null && remoteStream != null) {
      setIsRemoteConnected(true);
    }
    return () => {
      callClient.app.off('remoteVideoSteamUpdated', handleStreamUpdate);
    };
  }, [localStream, remoteStream]);

  let waitingTimer;




  useEffect(() => {
    waitingTimer = setTimeout(() => endCall(), 20000);

    const reject = async () => {
      await callClient.rejectCall();
    }

    const endCall = async () => {
      if (waitingTimer) {
        clearTimeout(waitingTimer);
      }
    }
    const connect = () => {
      console.log("SOCKET TEST", callClient.socket)
      callClient.addCallStateListener((state) => {
        console.log("STATE IN CALL", state);
        switch (state) {
          case CallState.NONE:
            // Xử lý trạng thái NONE
            break;
          case CallState.RINGING:
            // Xử lý trạng thái RINGING
            break;
          case CallState.CALLING:
            // Xử lý trạng thái CALLING
            setIsRemoteConnected(true);
            break;
          case CallState.ENDED:
            // Xử lý trạng thái ENDED
            setLocalStream(null);
            setRemoteStream(null);
            setIsRemoteConnected(false);
            setIsOwnUsingMic(true);
            setIsStartCall(false);
            setOpenMail(true);
            break;
          case CallState.REJECTED:
            // Xử lý trạng thái REJECTED
            setLocalStream(null);
            const startDateTimeRJ = new Date();
            setRemoteStream(null);
            setIsRemoteConnected(false);
            setIsOwnUsingMic(true);
            setOtherOwnUsingMic(true);
            reject();
            setIsStartCall(false);
            storeCall(lineKD, cusPhone, formatDate(startDateTimeRJ), formatDate(startDateTimeRJ), 0, decodedToken?.data?._id);
            window.alert("Khách từ chối nghe máy ở app chat, hãy gọi qua điện thoại thường")
            break;
          case CallState.BUSY:
            // Xử lý trạng thái BUSY
            break;
          case CallState.ONGOING:
            // Xử lý trạng thái ONGOING
            break;
          case CallState.TIMEDOUT:
            // Xử lý trạng thái TIMEOUT
            const startDateTimeTM = new Date();

            setLocalStream(null);
            setRemoteStream(null);
            setIsRemoteConnected(false);
            setIsOwnUsingMic(true);
            setOtherOwnUsingMic(true);
            setIsStartCall(false);
            storeCall(lineKD, cusPhone, formatDate(startDateTimeTM), formatDate(startDateTimeTM), 0, decodedToken?.data?._id);
            window.alert("Khách không nghe máy ở app chat, hãy gọi qua điện thoại thường")
            break;
          default:
            // Xử lý các trạng thái khác
            break;
        }
      })
      callClient.socket.on(CallState.CALL_REJECTED, (response) => {
        console.log("CALL_REJECTED IN SOCKET");
        reject();
      });
      callClient.socket.on(CallState.CALL_ENDED, (response) => {
        console.log("CALL_ENDED IN SOCKET");
        endCall();
      });
      callClient.mediaEvents.addListener((data) => {
        setOtherOwnUsingMic(data.audio)
      })
    }
    connect();


    if (isRemoteConnected) {
      start = new Date();
      setStartTime(formatDate(start));
      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      console.log("TIME IN HERE", timerRef.current);
      console.log("TIME IN HERENOOO", timer);
      if (start) {
        console.log("HEHRHEHREHREHR");
        const end = new Date(start.getTime() + timer * 1000);
        setEndTime(formatDate(end));
      }
      storeCall(lineKD, cusPhone, startTime, endTime, timer, decodedToken?.data?._id);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

  }, [callClient.socket, isRemoteConnected]);

  const storeCalling = async () => {
    try {
      storeCall();
    } catch (error) {
      console.log("ERR", error);

    }
  }

  const onToggleMic = () => {
    setIsOwnUsingMic(prevState => {
      const newMicStatus = !prevState;
      callClient.changeMicStatus(newMicStatus);
      return newMicStatus;
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`${style.status_call_container}`}>
      <div className={`${style.peo_receive_name}`}>
        {contactInfo.calleeName} - {contactInfo.calleeId}
      </div>
      {
        isRemoteConnected ?
          <div>
            <div className={`${style.status_call}`}>{formatTime(timer)}</div>
            <AudioMediaSoup srcObject={remoteStream}></AudioMediaSoup>
          </div>
          : <div className={`${style.status_call}`}>Đang kết nối</div>
      }

      <button className={`${style.button_toggle_mic}`} onClick={onToggleMic}>
        {
          isOwnUsingMic ?
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentColor"
              width="24px"
              height="24px">
              <path d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              fill="currentColor"
              width="24px"
              height="24px">
              <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 21.2-5.1 41.1-14.2 58.7L416 300.8 416 96c0-53-43-96-96-96s-96 43-96 96l0 54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128l0-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6z" />
            </svg>
        }
      </button>

      {!isOtherUsingMic ?
        <div className={`${style.peo_mic_status}`}>
          {contactInfo.calleeName} đang tắt mic
        </div> : <div></div>
      }

      <button className={`${style.button_end_call}`} onClick={() => {
        callClient.endCall();
        setIsOwnUsingMic(true);
      }}>
        <p className={`${style.end_call_text}`}>Kết thúc</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24px"
          height="24px"
        >
          <path d="M6.62 10.79a15.561 15.561 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.25 1.12.36 2.33.56 3.57.56.55 0 1 .45 1 1v3.59c0 .55-.45 1-1 1C10.08 22 2 13.92 2 3.5c0-.55.45-1 1-1H6.59c.55 0 1 .45 1 1 0 1.24.19 2.45.56 3.57.11.35.02.74-.26 1.02l-2.2 2.2z" />
        </svg>
      </button>


    </div>
  )
}

export default CallToAppMedal;
