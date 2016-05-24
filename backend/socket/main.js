'use strict'

const History = require('../model/history')

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
    });
  },
  send (id, type, msg) {
    if (this.list[`_${id}`]) {
      console.log(`Send socket to: _${id},${type},${msg}`)
      this.list[`_${id}`].emit(type, msg)
    }
  }
}
