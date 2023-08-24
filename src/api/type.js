export function getTypes() {
    return request({
      url: '/category/list',
      method: 'get'
    })
  }