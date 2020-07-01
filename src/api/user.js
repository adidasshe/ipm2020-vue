import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}
//获取所有用户列表
export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params: params
  })
}

export function addUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

export function updateUser(id, data) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data: data
  })
}
//更新状态
export function updateStatus(id, params) {
  return request({
    url: '/user/status/' + id,
    method: 'put',
    params: params
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

//获取角色
export function getRoleByUser(id) {
  return request({
    url: '/user/role/' + id,
    method: 'get'
  })
}
//分配角色
export function allocRole(data) {
  return request({
    url: '/user/role',
    method: 'put',
    data: data
  })
}

export function changePass(data) {
  return request({
    url: '/user/password',
    method: 'put',
    data
  })
}