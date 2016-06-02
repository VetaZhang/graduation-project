'use strict'
const User = require('../model/users')
const Request = require('../model/request')
const History = require('../model/history')
const Socket = require('../socket/main')

module.exports = {
  getFriends (req, res, next) {
    let friends = null
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
                name: result.name,
                email: result.email
              })
            } else reject()
          })
        })
      }));
    })
    .then(function (list) {
      friends = list
      return Promise.all(list.map(function (item) {
        return new Promise(function (resolve, reject) {
          History.find({
            $or:[{
              sender: req.params.id,
              receiver: item.id
            }, {
              sender: item.id,
              receiver: req.params.id
            }]
          }, (error, result) => {
            resolve({
              key: '_' + item.id,
              value: result
            })
          })
        })
      }))
    })
    .then(function (data) {
      let history = {}
      for (let item of data) {
        history[item.key] = item.value
      }
      res.json({
        friends: friends,
        history: history
      })
    })
    .catch((error) => {
      res.json({error: error})
    })
  },
  addFriend (req, res, next) {
    const user = req.body.user
    const name = req.body.name
    const target = req.body.target
    new Promise(function (resolve, reject) {
      User.findOne({name: target}, (error, result) => {
        if (error) reject(error)
        else if (result) {
          if (result.friends.indexOf(req.body.user) >= 0)
            reject({error: 'TA 已经是您的好友了'})
          else resolve(result._id)
        } else reject({error: '用户不存在'})
      })
    })
    .then((id) => {
      return new Promise(function (resolve, reject) {
        Request.create({
          type: 'friend',
          userId: user,
          username: name,
          targetId: id,
          groupId: '',
          groupName: '',
          result: false
        }, (error, result) => {
          if (error) reject(error)
          else {
            Socket.send(id, 'request', result)
            res.json({})
          }
        })
      })
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    })
  },
  agree (req, res, next) {
    const id = req.body._id
    const user1 = req.body.userId
    const user2 = req.body.targetId

    new Promise(function (resolve, reject) {
      User.findByIdAndUpdate(user1,
        {$addToSet: {friends: user2}},
        (error, result) => {
        resolve()
      })
    })
    .then(() => {
      return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(user2,
          {$addToSet: {friends: user1}},
          (error, result) => {
          resolve()
        })
      })
    })
    .then(() => {
      return new Promise(function (resolve, reject) {
        Request.findByIdAndUpdate(id,
          {$set: {result: true}},
          (error, result) => {
          Socket.send(user1, 'refreshFriends')
          Socket.send(user2, 'refreshFriends')
          res.json({})
        })
      })
    })
  }
}
