import request from '@/utils/request'

export function getList(parentId, params) {
  return request({
    url: '/menu/list/' + parentId,
    method: 'get',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/menu/' + id,
    method: 'delete'
  })
}

export function addMenu(data) {
  return request({
    url: '/menu/',
    method: 'post',
    data: data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/menu/' + id,
    method: 'put',
    data: data
  })
}

export function getMenu(id) {
  return request({
    url: '/menu/' + id,
    method: 'get',
  })
}

export function updateHidden(id, params) {
  return request({
    url: '/menu/hidden/' + id,
    method: 'put',
    params: params
  })
}

export function getTreeList() {
  return request({
    url: '/menu/treeList',
    method: 'get'
  })
}