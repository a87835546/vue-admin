import request from '@/utils/request'

export function getList(page,num) {
  return request({
    url: '/videos/list?page='+page+"&num="+num,
    method: 'get'
  })
}
export function getMuneList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}
export function getMuneListById(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}
export function getCategoryMuneList(id) {
  return request({
    url: '/category/queryList?id='+id,
    method: 'get',
  })
}

export function getCMuneList(id) {
  return request({
    url: '/category/menu/list?ids='+id,
    method: 'get',
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

export function getSubCategories(ids) {
  return request({
    url: '/category/queryList?id='+ids,
    method: 'get',
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
export function getBannerList() {
  return request({
    url: '/banner/list',
    method: 'get'
  })
}
export function getBannersByMenuId(data) {
  return request({
    url: '/banner/queryByMenuId?menu_id='+data,
    method: 'get'
  })
}
export function addBanner(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data
  })
}
export function updateBanner(data) {
  return request({
    url: '/banner/update',
    method: 'post',
    data
  })
}