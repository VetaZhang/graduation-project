<style>
.login-box {
  width: 320px;
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 3px #999;
}
</style>

<template>
  <div class="login-box">
    <text-input :data="email"></text-input>
    <text-input :data="pwd"></text-input>
    <btn class="blue block"
      :disabled="btnDisabled"
      @click="login">
      Login
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
      login () {
        console.log(this.email.value, this.pwd.value)
        this.email.errorMsg = ''
        this.pwd.errorMsg = ''
        if (!Verify.email(this.email.value)) {
          this.email.errorMsg = 'Please enter correct email'
        } else if (!this.pwd.value) {
          this.pwd.errorMsg = 'Please enter password'
        } else {
          this.$http.post(`${this.config.domain}/users/login`,
          {
            email: this.email.value,
            password: this.pwd.value
          }).then(result => {
            if (result.data.error) {
              this.pwd.errorMsg = result.data.error.msg
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
