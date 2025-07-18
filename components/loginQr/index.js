import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useQRCode } from 'next-qrcode'
import { io } from 'socket.io-client'
import { login } from '../../utils/handleApi'
import CheckTypeLogin from '../checkLogin'

export default function LoginQr(props) {
  const setNotiError = props.setNotiError
  getClientCodeID()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const Newsocket = io.connect('https://socket.timviec365.vn', {
      secure: true,
      enabledTransports: ['https'],
      transports: ['websocket', 'polling'],
    })
    setSocket(Newsocket)
  }, [])

  const [typeLoginComponent, setTypeLogincomponent] = useState()
  const [result, setResult] = useState()
  const [showPopup, setShowPopup] = useState(false)

  if (socket) {
    socket.on('QRLogin', (device_id, account, password) => {
      let deviceID = Cookies.get('_DEVICEID_')
      if (device_id == deviceID) {
        account = atob(account.replaceAll('+', ''))
        password = atob(password.replaceAll('+', ''))
        let data = {
          account: account,
          password: password,
        }
        submit(data)
      }
    })
  }
  const submit = async (data) => {
    let type = props.typeLogin
    data.type = type
    let result = await login(data, 1)
    if (result.result == true) {
      const type = result.data.type
      if (type == props.typeLogin) {
        let acc_token = result.data.access_token
        let refresh_token = result.data.refresh_token
        let role = result.data.type
        Cookies.set('rf_token', refresh_token)
        Cookies.set('token_base365', acc_token)
        Cookies.set('role', role)
        if (type == 1) {
          window.location.href = '/'
        } else if (type == 2) {
          window.location.href = '/'
        } else {
          window.location.href = '/quan-ly-ung-dung-ca-nhan.html'
        }
      } else {
        setTypeLogincomponent(type)
        setResult(result)
        setShowPopup(true)
      }
    } else {
      setNotiError(true)
    }
  }

  function getClientCodeID() {
    // Check thiết bị truy cập
    let uuid = function () {
      let u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          let r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
      return u
    }

    let getDeviceId = function () {
      let current = Cookies.get('_DEVICEID_')
      if (current) return current
      let id = uuid()
      Cookies.set('_DEVICEID_', id)
      return id
    }
    return getDeviceId()
  }

  var deviceId = Cookies.get('_DEVICEID_')
  const { SVG } = useQRCode()

  function renderQrText(
    qrType,
    idQr,
    idComputer,
    nameComputer,
    lat = '',
    long = ''
  ) {
    let date = new Date()
    let time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    let data = {
      QRType: qrType,
      idQR: btoa(idQr) + '++',
      IdComputer: idComputer,
      NameComputer: nameComputer,
      latitude: lat,
      longitude: long,
      Time: time,
    }
    return JSON.stringify(data)
  }

  return (
    <>
      <div
        className={`login_qr scan_qr ${
          props.showTab === false ? 'hidden' : ''
        }`}>
        <div className='qrcode' id='qrcode'>
          <SVG
            text={renderQrText('QRLoginPc', deviceId, deviceId, 'Chrome')}
            options={{
              margin: 2,
              width: 200,
              color: {
                dark: '#000000',
                light: '#ffffff',
              },
            }}
          />
        </div>
        <p className='text_qr'>Sử dụng ứng dụng Chat365 để quét mã QR</p>
        <button type='button' className='help_qr' onClick={props.qrGuildShow}>
          Hướng dẫn quét
        </button>
      </div>
      {showPopup && (
        <CheckTypeLogin
          result={result}
          setShowPopup={setShowPopup}
          typeLoginComponent={typeLoginComponent}
          setNotiError={setNotiError}
        />
      )}
    </>
  )
}
