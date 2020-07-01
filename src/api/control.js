import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()
// console.log(token)

export function getControl(device_id) {
  return request({
    url: 'control/',
    method: 'get',
    params: { token, device_id }
  })
}

export function setControl(data) {
  return request({
    url: 'control/',
    method: 'post',
    data
  })
}