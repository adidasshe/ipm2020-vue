import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/resource',
    method: 'get',
    params: params
  })
}

export function addResource(data) {
  return request({
    url: '/resource',
    method: 'post',
    data: data
  })
}

export function updateResource(id, data) {
  return request({
    url: '/resource/' + id,
    method: 'put',
    data: data
  })
}

export function deleteResource(id) {
  return request({
    url: '/resource/' + id,
    method: 'delete'
  })
}

export function getAllResourceList() {
  return request({
    url: '/resource/listAll',
    method: 'get'
  })
}