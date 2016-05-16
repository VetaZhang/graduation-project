'use strict'

import state from './state'

export const recordUser = ({dispatch}, data) => {
  dispatch('RECORD_USER', data)
  localStorage.setItem('id', data.id)
  localStorage.setItem('name', data.name)
  localStorage.setItem('email', data.email)
}
