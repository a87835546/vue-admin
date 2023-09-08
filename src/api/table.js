import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/videos/list',
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
    url: '/videos/insert',
    method: 'post',
    data
  })
}

export function deleteBillboard(data) {
  return request({
    url: '/videos/delete',
    method: 'post',
    data
  })
}
export function updateBillboard(data) {
  return request({
    url: '/videos/update',
    method: 'post',
    data
  })
}

export function searchBillboardByTitle(data) {
  return request({
    url: '/videos/search',
    method: 'post',
    data
  })
}


export function getTypes() {
  return request({
    url: '/type/list',
    method: 'get'
  })
}

export function getCategories() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}

export function getSubCategories(data) {
  return request({
    url: '/category/queryList',
    method: 'post',
    data
  })
}
export function addCategory(data) {
  return request({
    url: '/category/insert',
    method: 'post',
    data
  })
}
export function updateCategory(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data
  })
}
