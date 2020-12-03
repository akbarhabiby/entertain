const { db } = require('./config')

db.createCollection('movies', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'overview', 'poster_path', 'popularity', 'tags'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        overview: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        poster_path: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        popularity: {
          bsonType: 'double',
          description: 'must be a double if the field exists'
        },
        tags: {
          bsonType: 'array',
          description: 'must be an array and is required'
        }
      }
    }
  }
})