'use strict'

const actions = require('./actions')

module.exports = {
  socket: null,
  list: {},
  init (io) {
    io.on('connection', socket => {
      this.list[`_${data}`] = socket
      // socket.emit('news', { hello: 'world' });
      socket.on('disconnect', () => {
        delete this.list[`_${data}`]
      });
      socket.on('init', function (data) {
        console.log(data);

      });
    });
  }
}
