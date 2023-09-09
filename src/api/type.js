import request from '@/utils/request'

export function getTypes() {
    return request({
      url: '/type/list',
      method: 'get'
    })
  }

  export function insertType(data) {
    return request({
      url: '/type/insert',
      method: 'post',
      data
    })
  }

  export function modifyType(data) {
    return request({
      url: '/type/modify',
      method: 'post',
      data
    })
  }