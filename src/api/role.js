import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/role',
    method: 'get',
    params: params
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/' + id,
    method: 'put',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/role/status/' + id,
    method: 'put',
    params: params
  })
}

export function deleteRole(data) {
  return request({
    url:'/role',
    method:'delete',
    data:data
  })
}

export function getAllRoleList() {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/role/listMenu/'+roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}