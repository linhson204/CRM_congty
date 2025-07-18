import Cookies from 'js-cookie'
import { functionAPI } from './function'
import axios from 'axios'
import FormData from 'form-data'

export const checkVip = async (idcom) => {
  const data = new FormData()
  data.append('com_id', idcom)
  let checkVip = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/checkVip/beforeLogin',
    data
  )
  console.log(checkVip)
  if (!checkVip.is_add) {
    window.location.href = '/thong-bao-tai-khoan-vip.html'
  } else {
    Cookies.set('idCom', idcom)
    window.location.href = '/thong-tin-dang-ky-nhan-vien.html'
  }
}

// register
export const registerCom = async (data, notifyErrors = true, text = '') => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/company/register',
    data
  )

  if (result.result == true) {
    Cookies.set('token_base365', result.data.access_token)
    Cookies.set('role', 1)
    Cookies.set('phone', data.phoneTK)
    Cookies.set('rf_token', result.data.refresh_token)
    window.location.href = '/xac-thuc-ma-otp-cong-ty.html' + text
  } else {
    if (notifyErrors) alert('Tài khoản đã tồn tại')
  }
}

export const registerEp = async (form, data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/employee/register',
    form
  )
  if (result.result == true) {
    Cookies.set('token_base365', result.data.access_token)
    Cookies.set('role', 2)
    Cookies.set('phone', data.phoneTK)
    Cookies.set('rf_token', result.data.refresh_token)

    window.location.href = '/xac-thuc-ma-otp-nhan-vien.html'
  } else {
    alert('Tài khoản đã tồn tại')
  }
}

export const registerPersonal = async (data, text = '') => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/register',
    data
  )
  if (result.result == true) {
    Cookies.set('token_base365', result.data.access_token)
    Cookies.set('role', 3)
    Cookies.set('phone', data.phoneTK)
    Cookies.set('rf_token', result.data.refresh_token)
    window.location.href = '/xac-thuc-ma-otp-ca-nhan.html' + text
  } else {
    alert('Tài khoản đã tồn tại')
  }
}

// get list dep, group, team
export const listDep = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/register',
    data
  )
  return result
}

// Login
export const login = async (data, pass_type) => {
  data.pass_type = pass_type
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/employee/login',
    data
  )
  return result
}

// get information
export const infoEp = async () => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/employee/info'
  )
  return result
}

export const infoCom = async () => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/company/info'
  )
  return result
}

export const infoPersonal = async () => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/info'
  )
  return result
}

// update information
export const updateCom = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/company/updateInfoCompany',
    data
  )
  return result
}

export const updateEp = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/employee/updateInfoEmployee',
    data
  )
  return result
}

export const updatePersonal = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/updateInfoindividual',
    data
  )
  return result
}

// change password
export const changePassCom = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/company/updateNewPassword',
    data
  )
  return result
}

export const changePassEp = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/employee/updatePassword',
    data
  )
  return result
}

export const changePassPersonal = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/updatePassword',
    data
  )
  return result
}

// change pass by forget pass
export const changePwCom = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/company/updatePasswordbyInput',
    data
  )
  if (result.result) {
    window.location.href = '/thay-doi-mat-khau-thanh-cong.html'
  } else {
    alert(result.data.error.message)
  }
}

export const changePwEp = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/employee/updatePasswordbyInput',
    data
  )

  if (result.result) {
    window.location.href = '/thay-doi-mat-khau-thanh-cong.html'
  } else {
    alert(result.data.error.message)
  }
}

export const changePwPersonal = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/updatePasswordbyInput',
    data
  )
  if (result.result) {
    window.location.href = '/thay-doi-mat-khau-thanh-cong.html'
  } else {
    alert(result.data.error.message)
  }
}

// check account exist
export const checkExist = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/updatePassword',
    data
  )
  return result
}

// vote
export const vote = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/Feedback',
    data
  )
  return result
}

// report error
export const reportError = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/ReportError',
    data
  )
  return result
}

// authentic
export const authenPersonal = async () => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/individual/verify'
  )
  return result
}

export const authenEp = async () => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/employee/verify'
  )
  return result
}

export const authenCom = async () => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/company/verify'
  )
  return result
}

// render phong ban, to, nhom
export const listDepartments = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/department/list',
    data
  )
  return result
}

export const listGroups = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/team/list',
    data
  )
  return result
}

export const listTeams = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/group/search',
    data
  )
  return result
}

// setup IP address
export const createIp = async (data) => {
  // let result = await functionAPI(process.env.NEXT_PUBLIC_API + '/api/qlc/SetIp/create', data)
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.NEXT_PUBLIC_API + '/api/qlc/SetIp/create',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token_base365')}`,
    },
    data: data,
  }

  let result = await axios
    .request(config)
    .then((response) => {})
    .catch((error) => {
      console.log(error)
    })
  return result
}

// setup IP address
export const listIp = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/SetIp/get',
    data
  )
  return result
}

//edit ip address
export const editIP = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/SetIp/edit',
    data
  )
  return result
}

//Kiem tra SDT
export const checkAccount = async (data) => {
  let result = await functionAPI(
    process.env.NEXT_PUBLIC_API + '/api/qlc/company/checkInput',
    data
  )
  return result
}

// delete ip
export const delIp = async (data) => {
  let response = ''
  try {
    let configHeader = {
      headers: {},
    }
    if (Cookies.get('token_base365')) {
      configHeader.headers['Authorization'] = `Bearer ${Cookies.get(
        'token_base365'
      )}`
    }
    const call = await axios.delete(
      process.env.NEXT_PUBLIC_API + '/api/qlc/SetIp/delete',
      { data: data, ...configHeader }
    )
    response = call.data.data
  } catch (error) {
    response = error.response
  }
  return response
}
