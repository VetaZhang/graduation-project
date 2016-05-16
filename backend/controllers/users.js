'use strict'
const User = require('../model/users')

module.exports = {
  register (req, res, next) {
    new Promise(function (resolve, reject) {
      const name = req.body.name
      User.findOne({name: name}, (error, result) => {
        if (error) reject(error)
        else if (result) {
            reject({
              type: 'name',
              msg: '用户名已存在'
            })
        } else resolve()
      })
    })
    .then(function () {
      return new Promise(function (resolve, reject) {
        const email = req.body.email
        User.findOne({email: email}, (error, result) => {
          if (error) reject(error)
          else if (result) {
            reject({
              type: 'email',
              msg: '邮箱已存在'
            })
          } else resolve()
        })
      })
    })
    .then(function (result) {
      return new Promise(function (resolve, reject) {
        const data = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          friends: [],
          groups: []
        }
        User.create(data, (error, result) => {
          if (error) reject(error)
          else res.json({
            id: result._id,
            name: result.name,
            email: result.email
          })
        })
      })
    })
    .catch(function (error) {
      res.json({error: error})
    });
  },
  login (req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    new Promise(function (resolve, reject) {
      User.findOne(data, (error, result) => {
        if (error) reject(error)
        else if (result) {
          res.json({
            id: result._id,
            name: result.name,
            email: result.email
          })
        } else {
          reject({
            msg: '邮箱或密码不正确'
          })
        }
      })
    })
    .catch(function (error) {
      res.json({error: error})
    })
  }
}
