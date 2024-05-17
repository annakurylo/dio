const { Schema, model } = require('mongoose')


const User = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
})

module.exports = model('User', User)
