'use strict'
const User = require('../model/users')
const Request = require('../model/request')

module.exports = {
  getFriends (req, res, next) {
    new Promise(function (resolve, reject) {
      User.findById(req.params.id, (error, result) => {
        if (error) reject(error)
        else if (result) {
          resolve(result.friends)
        } else {
          reject()
        }
      })
    })
    .then(function (friends) {
      return Promise.all(friends.map(function (item) {
        return new Promise(function (resolve, reject) {
          User.findById(item, (error, result) => {
            if (error) reject(error)
            else if (result) {
              resolve({
                id: result._id,
                name: result.name
              })
            } else reject()
          })
        })
      }));
    })
    .then(function (list) {
      res.json({friends: list})
    })
    .catch((error) => {
      res.json({error: error})
    })
  },
  addFriend (req, res, next) {
    const user = req.params.user
    const name = req.params.name
    const target = req.params.target
    new Promise(function (resolve, reject) {
      User.findOne({name: target}, (error, result) => {
        if (error) reject(error)
        else if (result) {
          resolve(result._id)
        } else reject({msg: '用户不存在'})
      })
    })
    .then((id) => {
      return new Promise(function (resolve, reject) {
        Request.create({
          type: 'friend',
          userId: user,
          username: name,
          targetId: id,
          targetName: '',
          result: false
        }, (error, result) => {
          if (error) reject(error)
          else res.json({})
        })
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({error: error})
    })
  }
}
