const Router = require('express')

const router = new Router()
const controller = require('../controllers/telemetryContoller')


router.get('/humidity', controller.getHumidity)
router.get('/temperature', controller.getTemperature)
router.get('/dust', controller.getDust)
router.get('/ionization', controller.getIonization)
router.get('/carboneDioxide', controller.getCarboneDioxide)
router.get('/waterQuality', controller.getWaterQuality)

module.exports = router
