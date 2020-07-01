import request from '@/utils/request'

export function getList() {
  return request({
    url: '/device_data/list',
    method: 'get',
  })
}

export function getData(device_id) {
  return request({
    url: '/device_data/' + device_id,
    method: 'get',
  })
}

