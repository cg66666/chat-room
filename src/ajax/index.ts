/*
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-18 15:40:54
 * @LastEditors: cg
 * @LastEditTime: 2024-08-26 15:22:17
 */
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// code码提示语
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

export interface IData<T> {
  code: number
  msg: string
  data: T
  successful: boolean
}
export const instance = axios.create({
  baseURL: '/chat_room',
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
      message: msg,
      type: 'warning',
      plain: true
    })
    return { successful: false, ..._data }
  },
  (error: AxiosError) => {
    console.log('error', error)
    const status: number = error.response?.status || 404
    ElNotification({
      title: String(status),
      message: codeMessage[status],
      type: 'error'
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
