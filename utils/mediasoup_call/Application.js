import EventEmitter from "events";
import CallClient from "./CallClient";
import SFUApplication from "./SFUApplication";
import Constants from "./constants/Constants";

if (typeof window !== 'undefined')
  var { RTCPeerConnection, RTCSessionDescription } = window;


class Application extends EventEmitter {
  static instance = null;

  constructor() {
    super();
    if (Application.instance)
      throw Error("Can't create more than one instance of Application");
    this.callClient = CallClient.getInstance();
    this.localVideoStream = null;
    this.remoteVideoStream = null;
    this.sfu = new SFUApplication();

    this.peerConnection = null;
    this._cStreamController = new EventEmitter();
  }

  static getInstance = () => {
    if (!Application.instance) {
      Application.instance = new Application();
    }
    return Application.instance;
  };


  registerEvent() {
    this.peerConnection.ontrack = (event) => {
      if (event.streams.length > 0 && event.track.kind == "video") {
        this.remoteVideoStream = event.streams[0];
      }
      this.callClient.markCallAsReady();
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("sdpMLineIndex", event.candidate.sdpMLineIndex);
        this.callClient.sendCandidate(event.candidate);
      }
    };


    this._cStreamController.on('consumer', async (consumer) => {
      if (!this.remoteVideoStream) {
        this.remoteVideoStream = await createLocalMediaStream("consumer");
      }
      this.remoteVideoStream.addTrack(consumer.track);
      console.log("_cStreamController", this.remoteVideoStream)
    });

  }

  newSession = async () => {
    if (this.peerConnection != null) {
      await this.clearApplication();
    }

    this.peerConnection = new RTCPeerConnection({
      "iceServers": [
        {
          "credential": "",
          "urls": ["stun:stun.l.google.com:19302"],
          "username": ""
        },
        {
          "credential": "",
          "urls": ["stun:43.239.223.10:3478"],
          "username": ""
        },
        {
          "credential": "peerjsp",
          "urls": ["turn:us-0.turn.peerjs.com:3478"],
          "username": "peerjs"
        },
        {
          'urls': ["turn:43.239.223.10:3478"],
          'credential': "Tuananh050901",
          'username': "Tuananh05",
        }
      ],
      "sdpSemantics": "unified-plan"
    });

    this.peerConnection.onnegotiationneeded = (e) => {
      if (this.peerConnection.signalingState != "stable") return;
    };

    let res = await this.callClient.getRouterCapabilities();
    const { capabilities } = res;
    await this.sfu.loadDevice(capabilities);
    this.registerEvent();

  }

  setRemoteStream = async (track) => {
    if (!this.remoteVideoStream) {
      this.remoteVideoStream = new MediaStream();
    }
    const newStream = new MediaStream(this.remoteVideoStream.getTracks());
    newStream.addTrack(track);
    this.remoteVideoStream = newStream;
    this.callClient.markCallAsReady();
    this.emit('remoteVideoSteamUpdated', this.remoteVideoStream);
  }

  initMediaObject = async () => {
    this.localVideoStream = await navigator.mediaDevices.getUserMedia(Constants.VIDEO_CONSTRAINTS);
    const tracks = this.localVideoStream.getTracks();
    tracks.forEach((track) => {
      this.peerConnection.addTrack(track, this.localVideoStream);
    })
  }

  createOffer = async () => {
    const offer = await this.peerConnection.createOffer();
    console.log("createOffer", offer);
    await this.peerConnection.setLocalDescription(
      new RTCSessionDescription(offer)
    );
    return offer;
  };

  createAnswer = async (webrtcOffer) => {
    console.log("createAnswer", webrtcOffer);
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(webrtcOffer)
    );
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(
      new RTCSessionDescription(answer)
    );
    return answer;
  };

  onReceiveAnswer = async (answer) => {
    console.log("onReceiveAnswer", answer);
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  addIceCandidate = async (iceCandidate) => {
    this.peerConnection.addIceCandidate(
      new RTCIceCandidate(iceCandidate)
    );
  };

  resetCall = () => {
    // const remoteVideo = document.getElementById(CallElements.remoteVideo);
    // if (remoteVideo) {
    //   remoteVideo.srcObject = null;
    // }
  };

  changeCameraStatus(enabled) {
    if (this.localVideoStream != null) {
      this.localVideoStream.getVideoTracks()[0].enabled = enabled;
    }
  }

  changeMicStatus(enabled) {
    if (this.localVideoStream != null) {
      this.localVideoStream.getAudioTracks()[0].enabled = enabled;
    }
  }

  clearApplication = async () => {
    if (this.localVideoStream != null) {
      await Promise.all(this.localVideoStream.getTracks().map(async (track) => {
        await track.stop();
      }));
      this.localVideoStream = null;
    }

    if (this.remoteVideoStream != null) {
      await Promise.all(this.remoteVideoStream.getTracks().map(async (track) => {
        await track.stop();
      }));
      this.remoteVideoStream = null;
    }

    if (this.peerConnection != null) {
      this.peerConnection = null;
    }
  }

  setDisplay = (element, isVisible) => {
    if (isVisible) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
}

export default Application;
