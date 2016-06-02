'use strict'

export default {
  RECORD_USER (state, data) {
    state.user.id = data.id
    state.user.name = data.name
    state.user.email = data.email
  },
  LOGOUT (state) {
    state.user.id = ''
    state.user.name = ''
    state.user.email = ''
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
  },
  UPDATE_FRIENDS (state, data) {
    state.friends = data.friends
    state.history = data.history
  },
  ADD_FRIENDS (state, friend) {
    state.friends.push(friend)
  },
  ADD_REQUEST (state, request) {
    state.requests.unshift(request)
  },
  CHANGE_CONTENT (state, data) {
    state.content = data
  },
  ADD_NEW_HISTORY (state, id, data) {
    state.history[`_${id}`].push(data)
  },
  UPDATE_GROUPS (state, data) {
    state.groups = data.groups
  },
  ADD_GROUP_HISTORY (state, index, data) {
    state.groups[index].history.push(data)
  },
  ADD_MSG_BY_ID (state, id, msg) {
    let group = null
    state.groups.forEach((item) => {
      if (item._id === id) {
        group = item
      }
    })
    group.history.push(msg)
  },
  SHOW_MSG (state, msg) {
    if (msg.type) state.msg.type = msg.type
    state.msg.data = msg.data
  }
}
