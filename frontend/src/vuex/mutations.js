'use strict'

export default {
  RECORD_USER (state, data) {
    state.user.id = data.id
    state.user.name = data.name
    state.user.email = data.email
  },
  REMOVE_USER (state) {
    state.user.id = ''
    state.user.name = ''
    state.user.email = ''
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
    // state.content.component = data.component;
    // state.content.type = data.type;
    // state.content.id = data.id
  },
  ADD_NEW_HISTORY (state, id, data) {
    state.history[`_${id}`].push(data)
  }
}
