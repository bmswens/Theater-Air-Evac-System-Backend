'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const express = require('express')
const patients = require('./handlers/patients')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.use(express.json())
  app.get('/', simple)
  app.get('/configured', configured(opts))
  app.get('/patients', patients.getAll)
  app.post('/patients', patients.create)
  app.get('/patients/:dodid', patients.getOne)
  app.post('/patients/:dodid', patients.setOne)
  app.get('/patients/:dodid/docs', patients.getDocs)
  app.post('/patients/:dodid/docs', patients.setDocs)
}
