import request from '@/utils/request'

export function getList() {
    return request({
      url: '/actor/list',
      method: 'get',
    })
  }
  export function addActor(data) {
    return request({
      url: '/actor/insert',
      method: 'post',
      data
    })
  }
  export function updateActor(data) {
    return request({
      url: '/actor/update',
      method: 'post',
      data
    })
  }
  