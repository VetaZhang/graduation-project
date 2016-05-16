'use strict'

var fs = require('fs')
var User = require('../model/users')

module.exports = {
  // register (data) {
  //   return new Promise(function (resolve, reject) {
  //     Promise.resolve()
  //     .then(function () {
  //       //
  //     })
  //   })
  // },
  findByName (name) {
    return new Promise(function (resolve, reject) {
      User.findOne({name: name}, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  },
  findByEmail (email) {
    return new Promise(function (resolve, reject) {
      User.findOne({email: email}, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  },
  create (data) {
    return new Promise(function (resolve, reject) {
      User.create(data, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }
}
