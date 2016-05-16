<style>
.register-box {
  width: 320px;
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 3px #999;
}
</style>

<template>
  <div class="register-box">
    <text-input :data="name"></text-input>
    <text-input :data="email"></text-input>
    <text-input :data="pwd"></text-input>
    <btn class="blue block"
      :disabled="btnDisabled"
      @click="register">
      Register
    </btn>
  </div>
</template>

<script>
  'use strict'

  import Verify from '../lib/verify'
  import {
    config
  } from '../vuex/getters'
  import {
    recordUser
  } from '../vuex/actions'

  module.exports = {
    vuex: {
      getters: {
        config
      },
      actions: {
        recordUser
      }
    },
    data () {
      return {
        name: {
          value: '',
          placeholder: 'Name',
          errorMsg: ''
        },
        email: {
          value: '',
          placeholder: 'Email',
          errorMsg: ''
        },
        pwd: {
          value: '',
          placeholder: 'Password',
          errorMsg: '',
          isPwd: true
        },
        btnDisabled: false
      };
    },
    methods: {
      register () {
        console.log(this.name.value, this.email.value, this.pwd.value)
        this.name.errorMsg = ''
        this.email.errorMsg = ''
        this.pwd.errorMsg = ''
        if (!this.name.value) {
          this.name.errorMsg = 'Please enter username'
        } else if (!Verify.email(this.email.value)) {
          this.email.errorMsg = 'Please enter correct email'
        } else if (!this.pwd.value) {
          this.pwd.errorMsg = 'Please enter password'
        } else {
          const url = `${this.config.domain}/users/register`
          this.$http.post(url,
          {
            name: this.name.value,
            email: this.email.value,
            password: this.pwd.value
          }).then((result) => {
            console.log(result.data)
            if (result.data.error) {
              switch (result.data.error.type) {
                case 'name':
                  this.name.errorMsg = result.data.error.msg
                  break;
                case 'email':
                  this.email.errorMsg = result.data.error.msg
                  break;
                default: this.pwd.errorMsg = result.data.error.msg
              }
            } else {
              this.recordUser({
                id: result.data.id,
                name: result.data.name,
                email: result.data.email
              })
              window.router.go('/home')
            }
          }, error => {
            this.pwd.errorMsg = error.msg
          })
        }
      }
    },
    components: {
      btn: require('../components/btn.vue'),
      textInput: require('../components/textInput.vue'),
    }
  }
</script>
