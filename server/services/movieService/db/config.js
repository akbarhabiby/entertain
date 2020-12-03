const { MongoClient, ObjectId, Double } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
client.connect()
const db = client.db('entertainme-movie-1337')

module.exports = { db, ObjectId, Double }