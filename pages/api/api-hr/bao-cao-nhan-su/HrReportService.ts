import axios from 'axios'
import { getToken } from '../token'
const COOKIE_KEY = 'token_base365'
export const GetDataHrReport = async () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/report/reportRecruitment`,
      { },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    )
    return response.data
  } catch (err: any) {}
}
export const DetailHRAndAchievements = async (page, pageSize) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/report/reportDetailHRAndAchievements?page=${page}&pageSize=${pageSize}`,
      { page, pageSize },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    )
    return response.data
  } catch (err: any) {}
}
export const DetailRecruitment = async (page, pageSize) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/report/reportDetailRecruitment?page=${page}&pageSize=${pageSize}`,
      { page, pageSize },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    )
    return response.data
  } catch (err: any) {}
}
export const reportHr = async (page, pageSize) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/report/reportHr?page=${page}&pageSize=${pageSize}`,
      { page, pageSize },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    )
    return response.data
  } catch (err: any) {}
}

export const GetDataHrReports = async (formData: FormData) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(`${url}api/hr/report/report`, formData, {
      headers: {
        Authorization: `Bearer ${isToken}`,
      },
    })
    return response.data
  } catch (err: any) {}
}

export const DetailReport = async (formData: FormData) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/report/reportDetail
      `,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    )
    return response.data
  } catch (error) {}
}

export const ReportCharts = async (formData: FormData) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/report/reportChart`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    )
    return response.data
  } catch (error) {}
}
