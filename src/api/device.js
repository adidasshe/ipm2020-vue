import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()
// console.log(token)

export function getList(params) {
  return request({
    url: 'device_info/',
    method: 'get', 
    params: params
  })
}

export function addDevice(data) {
  return request({
    url: 'device_info/',
    method: 'post',
    data:data
  })
}

export function updateDevice(id,data) {
  return request({
    url: 'device_info/'+id,
    method: 'put',
    data:data
  })
}
export function deleteDevice(id) {
  return request({
    url: 'device_info/'+id,
    method: 'delete',
  })
}




