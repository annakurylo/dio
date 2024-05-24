const { Schema, model } = require('mongoose')


const Temperature = new Schema({
    measurement_time: { type: String },
    calendar_date: { type: String },
    value: { type: String },
    unit_measurement: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
})

module.exports = model('Temperature', Temperature)
