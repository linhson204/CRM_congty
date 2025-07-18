import CallClient from "@/utils/mediasoup_call/CallClient";
import { Modal, Spin } from "antd";
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import CallToAppMedal from "./call_to_app";
import style from "./styles.module.css";
const Cookies = require("js-cookie");


import { getConversationId, getIdChatFromPhoneNum, getInfoQR } from '@/utils/mediasoup_call/call_client_repo';
import { default as AudioMediaSoup } from "../call_mediasoup/audio";
import { default as VideoMediaSoup } from "../call_mediasoup/video";


const CallApp = ({ lineKD, setChooseDeviceApp: setChooseDeviceApp, phoneNumber, setOpenMail }) => {
  console.log("PHONE", phoneNumber);
  if (phoneNumber == null) {
    window.alert("Hãy nhập số điện thoại trước khi gọi")
  }
  const currentCookie = Cookies.get("token_base365");
  const decodedToken = jwt_decode(currentCookie);

  const [audioDevices, setAudioDevices] = useState();
  const [videoDevices, setVideoDevices] = useState();
  const [configData, setConfigData] = useState({});
  const [errors, setErrors] = useState({});
  const [showDevicesTesting, setShowDevicesTesting] = useState(false);
  const [testStream, setTestStream] = useState();
  const [testAudioVolume, setTestAudioVolume] = useState(0);
  const [contactInfo, setContactInfo] = useState({});
  const [isStartCall, setIsStartCall] = useState(false);
  const router = useRouter();
  const deviceTestButtonRef = useRef(null);

  const callClient = CallClient.getInstance();
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '2px solid #000',
    }),
  };
  useEffect(() => {
    const initDevices = async () => {
      const testStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: { min: 640, max: 1920 },
          height: { min: 400, max: 1080 },
        },
      });
      testStream.getTracks().forEach(track => {
        track.stop();
      });
      const devices = await navigator.mediaDevices.enumerateDevices();
      if (devices.length > 0) {
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput' && device.deviceId !== ''
        );
        const audioDevices = devices.filter(
          (device) => device.kind === 'audioinput' && device.deviceId !== ''
        );
        setVideoDevices(videoDevices)
        setAudioDevices(audioDevices)
      }
    }
    initDevices()
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      let idChat = await getIdChatFromPhoneNum(phoneNumber);
      console.log("ID CHAT", idChat);
      let conversationId = await getConversationId(idChat, decodedToken?.data?._id);
      let contactInfo = await getInfoQR(idChat);
      console.log("conversationId", conversationId);
      console.log("contactInfo", contactInfo);
      if (conversationId != null && contactInfo != null) {
        setContactInfo(prev => ({
          ...prev,
          conversationId: conversationId,
          roomId: decodedToken?.data?._id,
          callerId: decodedToken?.data?._id,
          calleeId: idChat,
          callerName: decodedToken?.data.userName,
          calleeName: contactInfo.userName
        }))
      }
    }
    callClient.login(decodedToken?.data?._id, decodedToken?.data.userName, '');
    getInfo();
  }, []);

  useEffect(() => {
    if (videoDevices && videoDevices.length > 0 && audioDevices && audioDevices.length > 0) {
      setConfigData(prev => ({
        ...prev,
        video: videoDevices[0].deviceId,
        audio: audioDevices[0].deviceId,
      }))
    }
  }, [videoDevices, audioDevices])
  const videoDevicesOptions = videoDevices && videoDevices.length > 0 && videoDevices?.map(opt => ({
    label: opt.label,
    value: opt.deviceId
  }))
  const audioDevicesOptions = audioDevices && audioDevices.length > 0 && audioDevices?.map(opt => ({
    label: opt.label,
    value: opt.deviceId
  }))
  return (
    <div className={style.container}>
      <div style={{
        position: 'absolute',
        left: `${400}px`,
        pointerEvents: 'none',
        display: showDevicesTesting ? 'block' : 'none',
        zIndex: '9999',
      }}>
        <div className={style.deviceTestArea}>
          <VideoMediaSoup autoPlay playsinline muted srcObject={testStream} flip></VideoMediaSoup>
          <AudioMediaSoup srcObject={testStream} flip></AudioMediaSoup>
          <div className={style.meterArea}>
            <meter className={style.meter} max={1.0} min={0.0} value={testAudioVolume} high={.75} low={.25} optimum={0.5} ></meter>
          </div>
        </div>
      </div>

      <div className={style.form_container}>
        <div className={style.input}>
          <label style={{ display: 'flex', fontWeight: 'bold', marginBottom: '5px' }}>
            Thiết bị camera
            <span style={{ color: 'red' }}>*</span>
          </label>
          {videoDevicesOptions ? <Select
            options={videoDevicesOptions}
            placeholder={'Hãy chọn Camera'}
            styles={customStyles}
            onChange={(e) => {
              setConfigData((prev) => ({
                ...prev,
                video: e.value,
              }))
            }}
            defaultValue={videoDevicesOptions[0]}
          /> : <span className={style.loader}></span>}
          {errors.video && (
            <p style={{ color: "red", margin: "10px 10px 0 0" }}>
              {errors.video}
            </p>
          )}
        </div>
        <div className={style.input}>
          <label style={{ display: 'flex', fontWeight: 'bold', marginBottom: '5px' }}>
            Thiết bị microphone
            <span style={{ color: 'red' }}>*</span>
          </label>
          {audioDevicesOptions ? <Select
            options={audioDevicesOptions}
            placeholder={'Hãy chọn Micro'}
            styles={customStyles}
            onChange={(e) => {
              setConfigData((prev) => ({
                ...prev,
                audio: e.value,
              }))
            }}
            defaultValue={audioDevicesOptions[0]}
          /> : <span className={style.loader}></span>}
          {errors.audio && (
            <p style={{ color: "red", margin: "10px 10px 0 0" }}>
              {errors.audio}
            </p>
          )}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
        }} className={style.buttonArea}>
          <div ref={deviceTestButtonRef} className={style.button} style={{ textDecoration: 'none' }}
            onClick={async () => {
              if (showDevicesTesting) {
                // If testing is already showing, stop the stream and hide the testing area
                if (testStream) {
                  testStream.getTracks().forEach(track => track.stop());
                }
                setShowDevicesTesting(false);
              } else {
                setShowDevicesTesting(true);
                const test = async () => {
                  const stream = await navigator.mediaDevices.getUserMedia({
                    audio: { deviceId: { exact: configData.audio } },
                    video: {
                      width: { min: 640, max: 1920 },
                      height: { min: 400, max: 1080 },
                      deviceId: { exact: configData.video }
                    },
                  });
                  setTestStream(stream);
                  console.log("STREAM TEST", stream)
                  const audioCtx = new AudioContext();
                  const scriptProcessor = audioCtx.createScriptProcessor(8192, 1, 1); // Adjust buffer size (2^n) as needed
                  const mic = audioCtx.createMediaStreamSource(stream);
                  mic.connect(scriptProcessor);
                  scriptProcessor.connect(audioCtx.destination);
                  scriptProcessor.onaudioprocess = (event) => {
                    const inputBuffer = event.inputBuffer;
                    const data = inputBuffer.getChannelData(0); // Get first channel data

                    // Calculate root mean square (RMS) to estimate volume
                    let rms = 0;
                    for (let i = 0; i < data.length; i++) {
                      rms += data[i] * data[i];
                    }
                    rms = Math.sqrt(rms * 5 / data.length);

                    // Normalize and process the volume value (0-1)
                    const volume = Math.min(rms, 1);

                    // Use the volume value for your application (e.g., display, visualization)
                    setTestAudioVolume(volume);
                  };
                };
                test();
              }
            }}
          >
            Kiểm tra thiết bị
          </div>
          {contactInfo.calleeId ?

            <div className={style.button} style={{ textDecoration: 'none' }}
              onClick={async () => {
                console.log("CALLERID", contactInfo.callerId)
                await callClient.getRouterCapabilities();
                await callClient.createCall(contactInfo.calleeId, contactInfo.calleeName, "", 2);
                setIsStartCall(true);
                setChooseDeviceApp(false);
              }}
            > Gọi ngay </div> : <Spin
              style={{
                margin: "auto",
                width: "100%",
                display: "block",
                padding: "5px",
                height: "100%",
              }}
            />
          }
        </div>
      </div>

      <Modal
        title="Cuộc gọi đang diễn ra"
        open={isStartCall}
        closable={true}
        width={1200}
        height={1200}
        maskClosable={true}
        footer={null}
        onCancel={() => { setIsStartCall(false) }}
      >
        <CallToAppMedal lineKD={lineKD} setOpenMail={setOpenMail} contactInfo={contactInfo} setIsStartCall={setIsStartCall} cusPhone={phoneNumber}></CallToAppMedal>
      </Modal>
    </div>
  )
}

export default CallApp
