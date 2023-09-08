import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  return request({
    url: '/admin/info?username='+username,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function login1(data){
  return request({
    url: '/admin/login',
    method :'post',
    data
  })
}
