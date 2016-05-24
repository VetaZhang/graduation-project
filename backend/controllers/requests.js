'use strict'

const Request = require('../model/request')

module.exports = {
  getRequestsList (req, res, next) {
    const id = req.params.id
    Request.find({targetId: id}, (error, result) => {
      if (error) res.json({error: error})
      else res.json({requestsList: result})
    })
  }
}
