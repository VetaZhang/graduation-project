'use strict'

const User = require('../model/users')
const Group = require('../model/group')
const Request = require('../model/request')
const Socket = require('../socket/main')

module.exports = {
  newGroup (req, res, next) {
    new Promise(function (resolve, reject) {
      Group.create(req.body, (error, result) => {
        res.json({})
      })
    })
  },
  getGroups (req, res, next) {
    Group.find({member: req.params.id}, (error, result) => {
      res.json({groups: result})
    })
  },
  applyEnterGroup (req, res, next) {
    new Promise(function (resolve, reject) {
      Group.findOne({name: req.body.groupName}, (error, result) => {
        if (result) {
          if (result.member.indexOf(req.body.id) >= 0)
            res.json({error: '您已经在该群组中了'})
          else resolve(result)
        } else {
          res.json({error: '群组不存在'})
        }
      })
    })
    .then(group => {
      return new Promise(function (resolve, reject) {
        Request.create({
          type: 'group',
          userId: req.body.id,
          username: req.body.name,
          targetId: group.creator,
          groupId: group._id,
          groupName: group.name,
          result: false
        }, (error, result) => {
          if (error) reject(error)
          else {
            Socket.send(group.creator, 'request', result)
            res.json({})
          }
        })
      })
    })
    .catch((error) => {
      res.json(error)
    })
  },
  agree (req, res, next) {
    new Promise((resolve, reject) => {
      Group.findByIdAndUpdate(req.body.groupId,
        {
          $addToSet: {member: req.body.userId}
        },
        (error, result) => {
          resolve()
      })
    })
    .then(() => {
      Request.findByIdAndUpdate(req.body._id,
        {
          $set: {result: true}
        },
        (error, result) => {
          Socket.send(req.body.userId, 'refreshGroups')
          Socket.send(req.body.targetId, 'refreshGroups')
          res.json({})
      })
    })
  }
}
