import request from '@/utils/request'

export function listAllCate() {
  return request({
    url: '/resourceCategory',
    method: 'get'
  })
}

export function addResourceCategory(data) {
  return request({
    url: '/resourceCategory',
    method: 'post',
    data: data
  })
}

export function updateResourceCategory(id, data) {
  return request({
    url: '/resourceCategory/' + id,
    method: 'put',
    data: data
  })
}

export function deleteResourceCategory(id) {
  return request({
    url: '/resourceCategory/' + id,
    method: 'delete'
  })
}