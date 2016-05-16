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
  UPDATE_FRIENDS (state, list) {
    state.friends = list
  },
  ADD_FRIENDS (state, friend) {
    state.friends.push(friend)
  }
}
