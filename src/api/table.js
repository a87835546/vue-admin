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
export function updateMune(data) {
  return request({
    url: '/menu/update',
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

export function addBillboard(data) {
  return request({
    url: '/billboard/insert',
    method: 'post',
    data
  })
}

export function deleteBillboard(data) {
  return request({
    url: '/billboard/delete',
    method: 'post',
    data
  })
}
export function updateBillboard(data) {
  return request({
    url: '/billboard/update',
    method: 'post',
    data
  })
}

export function searchBillboardByTitle(data) {
  return request({
    url: '/billboard/search',
    method: 'post',
    data
  })
}