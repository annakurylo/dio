const { Schema, model } = require('mongoose')


const Room = new Schema({
    name: { type: String },
})

module.exports = model('Room', Room)
