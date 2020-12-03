const Redis = require('ioredis')
const redis = new Redis({
  port: 6379, // * Redis Port
  host: '127.0.0.1' // * Redis Host
})

module.exports = redis