const express = require('express')
const router = express.Router()

//api/users

const User = require('../models/user')

router.get('/', (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.post('/', (req, res) => {
  User.create(req.body)
    .then(User.findAll)
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.put('/', (req, res) => {
  User.update(req.body)
    .then(User.findAll)
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.delete('/', (req, res) => {
  User.delete(req.body)
    .then(User.findAll)
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = router