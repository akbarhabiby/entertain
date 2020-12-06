// * Express.JS Config
const express = require('express')
const app = express()
const port = 3001

// * Import Routes or Endpoint and Error Handler
const router = require('./routes')
const errorhandler = require('./middlewares/errorhandler')

// * Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// * Use Routes or Endpoint
app.use(router)

// * Use Error Handler
app.use(errorhandler)

// * Listen App
app.listen(port, () => {
  console.log(`🎬  Movie Service ready at http://localhost:${port}/`)
})

// **** Movie Service
