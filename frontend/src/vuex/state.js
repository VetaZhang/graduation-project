export default {
  config: {
    domain: 'http://localhost:3000'
  },
  user: {
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name')
  },
  friends: [],
  groups: [],
  requests: [],
  history: {},
  content: {
    title: '',
    component: '',
    type: '',
    id: '',
    groupIndex: null
  },
  msg: {
    type: '',
    data: ''
  }
}
