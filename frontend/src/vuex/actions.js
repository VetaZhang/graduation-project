'use strict'

import state from './state'
import lib from './lib'

const domain = 'http://localhost:3000'

let socket = {}
let userId = ''
let http = {}

export const initSocket = ({dispatch}, that) => {
  userId = that.user.id
  http = that.$http
  lib.init(http, userId)
  socket = io(`http://localhost:3000/?id=${userId}`);
  socket.on('connect', s => {
    console.log('connection');
  })
  socket.on('request', function (data) {
    console.log(data)
    lib.addRequest(dispatch, data)
  });
  socket.on('refreshFriends', data => {
    lib.refreshFriends((data) => {
      dispatch('UPDATE_FRIENDS', data)
    })
  })
  socket.on('msgFromFriend', data => {
    console.log(data)
    dispatch('ADD_NEW_HISTORY', data.sender, data)
  })
}

export const send = ({dispatch}, type, msg) => {
  if (socket) {
    socket.emit(type, msg)
  }
}

export const recordUser = ({dispatch}, data) => {
  dispatch('RECORD_USER', data)
  localStorage.setItem('id', data.id)
  localStorage.setItem('name', data.name)
  localStorage.setItem('email', data.email)
}

export const getFriendsList = ({dispatch}) => {
  lib.refreshFriends((data) => {
    dispatch('UPDATE_FRIENDS', data)
  })
}

export const getRequestsList = ({dispatch}, that, url) => {
  http.get(url).then(result => {
    if (result.data.error) {
      console.log(result.data.error)
    } else {
      for (let item of result.data.requestsList) {
        lib.addRequest(dispatch, item)
      }
    }
  }, error => {
    console.log(error)
  })
}

export const agreeRequest = ({dispatch}, data) => {
  let path = ''
  switch (data.type) {
    case 'friend': path = '/friends/agree';break;
    case 'group': path = '/groups/agree';break;
    default:;
  }
  http.post(domain + path, data).then(result => {
    if (result.data.error) console.log(result.data.error)
    else {
      data.result = true
    }
  }, error => {
    console.log(error)
  })
}

export const changeContent = ({dispatch}, data) => {
  dispatch('CHANGE_CONTENT', data)
}

export const addNewHistory = ({dispatch}, id, msg) => {
  dispatch('ADD_NEW_HISTORY', id, msg)
}
