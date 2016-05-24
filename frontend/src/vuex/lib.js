'use strict'

let http = null
let userId = null
const domain = 'http://localhost:3000'

export default {
  init (h, id) {
    http = h
    userId = id
  },
  addRequest: function (dispatch, data) {
    switch (data.type) {
      case 'friend': {
        data.msg = `${data.username} 请求添加您为好友`
        dispatch('ADD_REQUEST', data)
      }break;
      case 'groups': {
        data.msg = `${data.username} 请求加入群组 ${targetName}`
        dispatch('ADD_REQUEST', data)
      }break;
      default: ;
    }
  },
  refreshFriends: function (cb) {
    http.get(`${domain}/friends/${userId}`)
    .then(result => {
      if (result.data.error) {
        console.log(result.data.error)
      } else {
        cb(result.data)
      }
    }, error => {
      console.log(error)
    })
  }
}
