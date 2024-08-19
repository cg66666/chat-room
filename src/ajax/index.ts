/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2024-08-18 15:40:54
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-19 09:48:14
 */
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
// import { useLogin } from '@/stores'
// import { showNotify } from 'vant'
import { ElMessage } from 'element-plus'
export interface IData<T> {
  code: number
  msg: string
  data: T
}
export const instance = axios.create({
  baseURL: '/room',
  // baseURL: '/mobile_Vue3',
  timeout: 30 * 1000 // 统一设置超时时间
})

instance.interceptors.request.use(
  (req) => {
    // const loginStore = useLogin()
    // req.headers['X-Token'] = loginStore.token
    return req
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (resp: AxiosResponse) => {
    const { data: _data } = resp
    const { code, msg } = _data
    if (code === '00000') return { successful: true, ..._data }
    // showNotify(msg)
    ElMessage({
      message: 'Warning, this is a warning message.',
      type: 'warning',
      plain: true
    })
    return Promise.reject()
  },
  (error: AxiosError) => {
    console.log(error)
    ElMessage({
      message: 'Warning, this is a warning message.',
      type: 'warning',
      plain: true
    })
    // showNotify('请求失败，请检查网络')
    return Promise.reject(error)
  }
)

/**
 *  Get请求
 * @param url 请求地址
 * @param data 请求参数
 * @param config  请求配置
 * @returns
 */
export const get = <T>(
  url: string,
  params: Record<string, any> = {},
  config?: AxiosRequestConfig
): Promise<IData<T>> =>
  new Promise((resolve, reject) => {
    const mergeConfig = { ...config, params }
    instance
      .get<IData<T>>(url, mergeConfig)
      .then((res) => {
        // @ts-ignore
        resolve(res)
      })
      .catch(() => {
        reject()
      })
  })

/**
 *  Post请求
 * @param url 请求地址
 * @param data 请求参数
 * @param config  请求配置
 * @returns
 */
export const post = <T>(
  url: string,
  data: { [key: string]: any } = {},
  config?: AxiosRequestConfig
): Promise<IData<T>> =>
  new Promise((resolve, reject) => {
    instance
      .post<IData<T>>(url, data, config)
      .then((res) => {
        // @ts-ignore
        resolve(res)
      })
      .catch(() => {
        reject()
      })
  })
