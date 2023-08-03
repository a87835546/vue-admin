import request from '@/utils/request'

export function configTabbarList(data) {
  return request({
    url: '/category/app',
    method: 'get',
    data
  })
}

export function modifyConfig(data) {
  return request({
    url: '/category/modify',
    method: 'post',
    data
  })
}

export function deletetype(data) {
  return request({
    url: '/category/delete',
    method: 'post',
    data
  })
}
