import Application from "./Application";
import { getServiceStatus } from './call_client_repo';
import CallEventListener from "./CallEventListener";
import CallPayload from "./CallPayload";
import CallProtocol from "./constants/CallProtocol";
import CallState from "./constants/CallState";
import CallType from "./constants/CallType";
import SocketEvents from "./constants/SocketEvents";
import SocketManager from './constants/SocketManager';


async function sleep(ms) {
  return new Promise((r) => setTimeout(() => r(), ms));
}

class CallClient {

  static instance = null;
  constructor() {
    if (CallClient.instance) {
      return CallClient.instance;
    }

    this.socket = SocketManager.getSocket();
    this._callState = CallState.NONE;
    this._csEvents = new CallEventListener();
    this.mediaEvents = new CallEventListener();
    this.payloadEvents = new CallEventListener();
    this.isLoggedIn = false;
    this.user = null;
    this.activePayload = null;
    this.videoStatus = true;
    this.audioStatus = true;
    this.incomingCallAccepted = false;
    this.keepAliveTimer = null;

    this.sendTransport = null;
    this.recvTransport = null;

    this.isReadyToConsume = false;

    this.registerEvents();

    CallClient.instance = this;
  }

  static getInstance() {
    if (!CallClient.instance) {
      CallClient.instance = new CallClient(); // Create the instance if it doesn't exist
    }
    return CallClient.instance;
  }

  get app() {
    return Application.getInstance();
  }

  get callState() {
    return this._callState;
  }

  set callState(state) {
    this._callState = state;
    this._csEvents.invoke(state);
  }

  emitAsync(event, ...args) {
    console.log("Emitted:", event, args);
    if (args.length == 0) args = [{}];
    return new Promise((resolve) => {
      this.socket.emit(event, ...args, function (...data) {
        console.log("Callback:", event, data);
        resolve(...data);
      })
    })
  }

  addCallStateListener(callback) {
    this._csEvents.addListener(callback);
  }

  removeCallStateListener(callback) {
    this._csEvents.removeListener(callback);
  }

  registerEvents = () => {
    this.socket.on(SocketEvents.USER_LOGGEDIN, this.onUserLoggedIn);
    this.socket.on(SocketEvents.CALL_INCOMING, this.onCallIncoming);
    this.socket.on(SocketEvents.CALL_ACCEPTED, this.onCallAccepted);
    this.socket.on(SocketEvents.CALL_REJECTED, this.onCallRejected);
    this.socket.on(SocketEvents.CALL_TIMEDOUT, this.onCallTimedOut);
    this.socket.on(SocketEvents.CALL_BUSY, this.onCallBusy);
    this.socket.on(SocketEvents.CALL_ONGOING, this.onCallOngoing);
    this.socket.on(SocketEvents.CALL_ENDED, this.onCallEnded);
    this.socket.on(SocketEvents.CALL_RECEIVE_OFFER, this.onReceiveOffer);
    this.socket.on(SocketEvents.CALL_RECEIVE_ANSWER, this.onReceiveAnswer);
    this.socket.on(SocketEvents.CALL_WEBRTC_READY, this.onCallReady);
    this.socket.on(SocketEvents.CALL_RECEIVE_CANDIDATE, this.onReceiveCandidate);
    this.socket.on(SocketEvents.SOCKET_RECONNECTED, this.onReconnect);
    this.socket.on(SocketEvents.CALL_UPDATE_MEDIA_DEVICES_STATUS, this.onMediaStatusChange);
    this.socket.on(SocketEvents.SFU_NEW_PRODUCER, this.onNewProducer);
  }
  onUserLoggedIn = (data) => {
    this.isLoggedIn = true;
  }

  onCallIncoming = (payload) => {
    this.callState = CallState.RINGING;
    let _payload = new CallPayload(payload);
    this.activePayload = _payload;
    this.payloadEvents.invoke(this.activePayload);
    if (this.incomingCallAccepted) {
      this.acceptCall();
      this.incomingCallAccepted = false;
    }
  }

  onCallAccepted = () => {
    this.callState = CallState.CONNECTING;
    this.socket.emit(SocketEvents.CALL_CHANGE_MEDIA_DEVICES, {
      userId: this.user.userId,
      audio: this.audioStatus,
      video: this.videoStatus
    });
    console.log("ACTIVEPAYLOAD", this.activePayload);
    if (this.activePayload.callProtocol == CallProtocol.PEERS) {
      this.app.createOffer().then(offer => {
        this.sendOffer(offer);
      })
    } else if (this.activePayload.callProtocol == CallProtocol.SFU) {
      this.connectSFUCall();
    }
  }

  onCallRejected = () => {
    this.callState = CallState.REJECTED;
    this.activePayload = null;
    this.sendTransport?.close();
    this.recvTransport?.close();
    this.sendTransport = null;
    this.recvTransport = null;
    this.stopKeepalive();
    this.clearCallClient();
  }

  onCallTimedOut = () => {
    this.callState = CallState.TIMEDOUT;
    this.activePayload = null;
    this.stopKeepalive();
  }

  onCallBusy = () => {
    this.callState = CallState.BUSY;
    this.activePayload = null;
    this.stopKeepalive();
  }

  onCallOngoing = () => {
    this.callState = CallState.ONGOING;
    this.activePayload = null;
    this.stopKeepalive();
  }

  onCallEnded = async () => {
    this.callState = CallState.ENDED;
    this.activePayload = null;
    this.sendTransport?.close();
    this.recvTransport?.close();
    this.sendTransport = null;
    this.recvTransport = null;
    this.stopKeepalive();
    await this.clearCallClient();
    // this.app.resetCall();
  }

  clearCallClient = async () => {
    if (this.app != null) {
      this.audioStatus = true;
      this.videoStatus = true;
      this.app.localVideoStream = null;
      this.app.remoteVideoStream = null;
      await this.app.clearApplication();
    }
  }

  onReceiveOffer = (webrtcOffer) => {
    this.app.createAnswer(webrtcOffer).then(answer => {
      this.sendAnswer(answer);
    })
  }

  onReceiveAnswer = (webrtcAnswer) => {
    this.app.onReceiveAnswer(webrtcAnswer);
  }

  onReceiveCandidate = (iceCandidate) => {
    this.app.addIceCandidate(iceCandidate);
  }

  onCallReady = () => {
    this.callState = CallState.CALLING;
  }

  onReconnect = () => {
    if (this.user)
      this.login(this.user.userId);
  }

  onMediaStatusChange = (data) => {
    console.log("UPDATE HERE", data);
    this.mediaEvents.invoke(data);
  }

  login = (userId, userName, avatar, callback) => {
    if ((typeof avatar) != 'string') avatar = '';
    this.user = {
      'userId': userId.toString(),
      'userName': userName.toString(),
      'userAvatar': avatar.toString(),
    };
    console.log("USER LOGIN", this.user)
    this.socket.emit(SocketEvents.USER_LOGIN, userId);
    // this.socket.on(SocketEvents.USER_LOGGEDIN, callback);
  }

  createCall = async (calleeId, calleeName, calleeAvt, callType) => {
    await this.app.newSession();
    await this.app.initMediaObject();
    this.sendTransport?.close();
    this.recvTransport?.close();
    this.sendTransport = null;
    this.recvTransport = null;

    let isSFUAvailable = await getServiceStatus();
    console.log("isSFUAvailable", isSFUAvailable)

    let payload = new CallPayload({
      roomId: this.user.userId,
      callerId: this.user.userId,
      callerName: this.user.userName,
      callerAvatar: this.user.userAvatar,
      calleeId: calleeId,
      calleeName: calleeName,
      calleeAvatar: calleeAvt,
      callType: callType,
      callProtocol: isSFUAvailable ? CallProtocol.SFU : CallProtocol.PEERS
    });
    console.log(payload);
    this.socket.emit(SocketEvents.CALL_START, payload);
    this.activePayload = payload;
    this.payloadEvents.invoke(this.activePayload);
    this.callState = CallState.RINGING;
    this.setCallType(callType);
    this.startKeepalive();
  }

  acceptCall = async () => {
    await this.app.newSession();
    this.app.initMediaObject();
    this.sendTransport?.close();
    this.recvTransport?.close();
    this.sendTransport = null;
    this.recvTransport = null;
    if (this.activePayload) {
      this.socket.emit(SocketEvents.CALL_ACCEPT, this.activePayload);
      this.callState = CallState.CONNECTING;
      console.log(this.activePayload);
      this.setCallType(this.activePayload.callType);
      this.startKeepalive();

      if (this.activePayload.callProtocol == CallProtocol.SFU) {
        this.connectSFUCall();
      }
    }
  }

  getRouterCapabilities = async () => {
    return this.emitAsync(SocketEvents.SFU_GET_RTP_CAPABILITIES);
  }

  connectSFUCall = async () => {
    console.log("CONNECT SFU CALL")
    while (!this.app.sfu.device) {
      await sleep(100);
    }
    this.sendTransport = await this.createSendTransport(this.app.sfu.device.rtpCapabilities);
    this.app.sfu.publish(this.sendTransport, this.app.localVideoStream);
  }

  createSendTransport = async (rtpCapabilities) => {
    let pTransportData = await this.emitAsync(SocketEvents.SFU_PTRANSPORT_CREATE, {
      forceTcp: false,
      rtpCapabilities: rtpCapabilities,
    })
    this.sendTransport = await this.app.sfu.createSendTransport(pTransportData.params);

    this.sendTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      await this.emitAsync(SocketEvents.SFU_PTRANSPORT_CONNECT, { dtlsParameters });
      callback();
    });
    this.sendTransport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
      const pcdata = await this.emitAsync(SocketEvents.SFU_PRODUCE, {
        transportId: this.sendTransport.id,
        kind,
        rtpParameters,
      });
      callback({ id: pcdata.id });
    });
    this.sendTransport.on('connectionstatechange', (state) => {
      console.log("sendTransport", state);
      switch (state) {
        case 'connecting':
          break;

        case 'connected':
          break;

        case 'failed':
          this.sendTransport.close();
          break;

        default: return;
      }
    });
    return this.sendTransport;
  }

  createRecvTransport = async () => {
    let cTransportData = await this.emitAsync(SocketEvents.SFU_CTRANSPORT_CREATE);
    this.recvTransport = await this.app.sfu.createRecvTransport(cTransportData.params);
    this.recvTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      await this.emitAsync(SocketEvents.SFU_CTRANSPORT_CONNECT, {
        transportId: this.recvTransport.id,
        dtlsParameters
      });
      callback();
    });
    this.recvTransport.on('connectionstatechange', async (state) => {
      console.log("recvTransport", state);
      switch (state) {
        case 'connecting':
          break;

        case 'connected':
          break;

        case 'failed':
          this.recvTransport.close();
          break;
        default: return;
      }
    });
    return this.recvTransport;
  }

  onNewProducer = async (data) => {
    while (!this.app.sfu.device) {
      await sleep(100);
    }
    if (!this.recvTransport)
      this.recvTransport = await this.createRecvTransport();

    let userId = data.id;
    let kind = data.kind;
    const rtpCapabilities = this.app.sfu.device.rtpCapabilities;
    const params = await this.emitAsync(SocketEvents.SFU_CONSUME, { rtpCapabilities, userId, kind });
    let track = await this.app.sfu.subscribe(this.recvTransport, params);
    await this.app.setRemoteStream(track);
    while (this.recvTransport.connectionState !== 'connected') {
      await sleep(100);
      console.log("Waiting for connection", this.recvTransport.connectionState);
    }
    this.socket.emit(SocketEvents.SFU_RESUME, kind);
  }

  acceptNextCall = () => {
    this.incomingCallAccepted = true;
  }

  rejectCall = async () => {
    if (this.activePayload) {
      console.log("REJECT EMIT HERE")
      this.socket.emit(SocketEvents.CALL_REJECT, this.activePayload);
      // this.callState = CallState.REJECTED;
    }
    this.activePayload = null;
    this.stopKeepalive();
    this.sendTransport?.close();
    this.recvTransport?.close();
    this.sendTransport = null;
    this.recvTransport = null;
    await this.clearCallClient();
  }

  endCall = async () => {
    if (this.activePayload) {
      this.socket.emit(SocketEvents.CALL_END, this.activePayload);
      this.callState = CallState.ENDED;
    }
    this.activePayload = null;
    this.stopKeepalive();
    this.sendTransport?.close();
    this.recvTransport?.close();
    this.sendTransport = null;
    this.recvTransport = null;
    console.log("sendTransport", this.sendTransport);
    console.log("recvTransport", this.recvTransport);
    await this.clearCallClient();
  }

  sendOffer = (webrtcOffer) => {
    this.socket.emit(SocketEvents.CALL_SEND_OFFER, webrtcOffer);
  }

  sendAnswer = (webrtcAnswer) => {
    this.socket.emit(SocketEvents.CALL_SEND_ANSWER, webrtcAnswer);
  }

  sendCandidate = (iceCandidate) => {
    this.socket.emit(SocketEvents.CALL_SEND_CANDIDATE, iceCandidate);
  }

  markCallAsReady = () => {
    console.log("ready");
    this.socket.emit(SocketEvents.CALL_CLIENT_READY);
  }

  changeMicStatus(audioStatus) {
    this.audioStatus = audioStatus;
    this.app.changeMicStatus(audioStatus);
    this.socket.emit(SocketEvents.CALL_CHANGE_MEDIA_DEVICES, {
      userId: this.user.userId,
      audio: this.audioStatus,
      video: this.videoStatus
    });
  }

  changeCameraStatus(videoStatus) {
    this.videoStatus = videoStatus;
    this.app.changeCameraStatus(videoStatus);
    this.socket.emit(SocketEvents.CALL_CHANGE_MEDIA_DEVICES, {
      userId: this.user.userId,
      audio: this.audioStatus,
      video: this.videoStatus
    });
  }

  setCallType(type) {
    console.log("calltype", type);
    if (type == CallType.VIDEO) {
      this.changeCameraStatus(true);
    } else if (type == CallType.AUDIO) {
      this.changeCameraStatus(false);
    }
  }

  startKeepalive = () => {
    clearInterval(this.keepAliveTimer);
    this.keepAliveTimer = setInterval(() => {
      this.socket.emit(SocketEvents.CALL_KEEPALIVE);
    }, 2000);
  }

  stopKeepalive = () => {
    clearInterval(this.keepAliveTimer);
    this.keepAliveTimer = null;
  }

}

export default CallClient;
