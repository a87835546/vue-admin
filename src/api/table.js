import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/billboard/list',
    method: 'get',
    params
  })
}
export function getMuneList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

export function addMune(data) {
  return request({
    url: '/menu/insert',
    method: 'post',
    data
  })
}

export function deleteMune(data) {
  return request({
    url: '/menu/delete',
    method: 'post',
    data
  })
}
