const Humidity = require("../models/HumidityModel")
const Ionization = require("../models/IonizationModel")
const WaterQuality = require("../models/WaterQualityModel")
const Temperature = require("../models/TemperatureModel")
const Dust = require("../models/DustModel")
const CarboneDioxide = require("../models/CarboneDioxideModel")



class telemetryController {
  async getHumidity(req, res) {
    try {
      const humidity = await Humidity.find().populate('room')

      const groupedData = humidity.reduce((acc, item) => {
        const roomName = item.room.name
        if (!acc[`${roomName}_humidity`]) {
          acc[`${roomName}_humidity`] = []
        }
        acc[`${roomName}_humidity`].push({
          indicator_id: item._id,
          measurement_time: item.measurement_time,
          calendar_date: item.calendar_date,
          value: item.value,
        })
        
        return acc
      }, {})

      res.json(groupedData)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'ServerError' })
    }
  }

  async getTemperature(req, res) {
    try {
      const temperature = await Temperature.find().populate('room')

      const groupedData = temperature.reduce((acc, item) => {
        const roomName = item.room.name
        if (!acc[`${roomName}_temperature`]) {
          acc[`${roomName}_temperature`] = []
        }
        acc[`${roomName}_temperature`].push({
          indicator_id: item._id,
          measurement_time: item.measurement_time,
          calendar_date: item.calendar_date,
          value: item.value,
        })

        return acc
      }, {})

      res.json(groupedData)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'ServerError' })
    }
  }

  async getWaterQuality(req, res) {
    try {
      const waterQuality = await WaterQuality.find().populate('room')

      const groupedData = waterQuality.reduce((acc, item) => {
        const roomName = item.room.name
        if (!acc[`${roomName}_waterQuality`]) {
          acc[`${roomName}_waterQuality`] = []
        }
        acc[`${roomName}_waterQuality`].push({
          indicator_id: item._id,
          measurement_time: item.measurement_time,
          calendar_date: item.calendar_date,
          value: item.value,
        })

        return acc
      }, {})

      res.json(groupedData)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'ServerError' })
    }
  }

  async getCarboneDioxide(req, res) {
    try {
      const carboneDioxide = await CarboneDioxide.find().populate('room')

      const groupedData = carboneDioxide.reduce((acc, item) => {
        const roomName = item.room.name
        if (!acc[`${roomName}_carboneDioxide`]) {
          acc[`${roomName}_carboneDioxide`] = []
        }
        acc[`${roomName}_carboneDioxide`].push({
          indicator_id: item._id,
          measurement_time: item.measurement_time,
          calendar_date: item.calendar_date,
          value: item.value,
        })

        return acc
      }, {})

      res.json(groupedData)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'ServerError' })
    }
  }

  async getDust(req, res) {
    try {
      const dust = await Dust.find().populate('room')

      const groupedData = dust.reduce((acc, item) => {
        const roomName = item.room.name
        if (!acc[`${roomName}_dust`]) {
          acc[`${roomName}_dust`] = []
        }
        acc[`${roomName}_dust`].push({
          indicator_id: item._id,
          measurement_time: item.measurement_time,
          calendar_date: item.calendar_date,
          value: item.value,
        })

        return acc
      }, {})

      res.json(groupedData)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'ServerError' })
    }
  }

  async getIonization(req, res) {
    try {
      const ionization = await Ionization.find().populate('room')

      const groupedData = dust.reduce((acc, item) => {
        const roomName = item.room.name
        if (!acc[`${roomName}_ionization`]) {
          acc[`${roomName}_ionization`] = []
        }
        acc[`${roomName}_ionization`].push({
          indicator_id: item._id,
          measurement_time: item.measurement_time,
          calendar_date: item.calendar_date,
          value: item.value,
        })

        return acc
      }, {})

      res.json(groupedData)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'ServerError' })
    }
  }
}

module.exports = new telemetryController()
