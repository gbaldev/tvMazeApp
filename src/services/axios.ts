import axios, { AxiosInstance, CancelTokenSource } from 'axios'
import HttpRequests from '../models/HttpRequests'

const GET_DEFAULT_HEADERS = {
    "Accept": 'application/json',
    "Cache-Control": 'no-cache',
  }

class AxiosImpl implements HttpRequests {
  private axiosInstance: AxiosInstance
  public signal: CancelTokenSource

  constructor() {
    this.axiosInstance = axios.create()
    this.signal = axios.CancelToken.source()
  }
  
  cancelRequest = (reason: string) => {
    this.signal.cancel(reason)
    this.signal = axios.CancelToken.source()
  }

  setAxiosInstance = (axiosIns: AxiosInstance) => {
    this.axiosInstance = axiosIns
  }

  setAuthHeader = (authHeader: string) => {
    this.axiosInstance.defaults.headers.common.Authorization = authHeader
  }

  get = async (url: string, headers = GET_DEFAULT_HEADERS) => {
    const { data: _data } = await this.axiosInstance.request({
      method: 'get',
      headers,
      url
    })
    return _data
  }

  post = async () => {
    // TO-DO post implementation
  }

  put = async () => {
    // TO-DO put implementation
  }

  patch = async () => {
    // TO-DO patch implementation
  }

  delete = async () => {
    // TO-DO delete implementation
  }
}

export default AxiosImpl
