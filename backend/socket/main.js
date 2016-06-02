'use strict'

const History = require('../model/history')
const Group = require('../model/group')

module.exports = {
  list: {},
  init (io) {
    io.on('connection', socket => {
      const id = socket.handshake.query.id
      this.list[`_${id}`] = socket
      socket.on('disconnect', () => {
        delete this.list[`_${id}`]
      });
      socket.on('msgFromFriend', data => {
        console.log(data)
        this.send(data.receiver, 'msgFromFriend', data)
        History.create(data, (error, result) => {
          // console.log(error, result)
        })
      })
      socket.on('msgFromGroup', data => {
        console.log(data)
        Group.findById(data.id, (error, result) => {
          result.member.forEach((item) => {
            if (data.msg.sender !== item) {
              this.send(item, 'msgFromGroup', data)
            }
          })
        })
        Group.findByIdAndUpdate(data.id,
        {
          $push: {history: data.msg}
        }, (error, result) => {
          //
        })
      })
    });
  },
  send (id, type, msg) {
    if (this.list[`_${id}`]) {
      console.log(`Send socket to: _${id},${type},${msg}`)
      this.list[`_${id}`].emit(type, msg)
    }
  }
}
