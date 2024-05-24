const Router = require('express')

const router = new Router()
const controller = require('../controllers/authController')


router.post('/register', controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.get('/user/:id', controller.getUser)
router.put('/user/:id', controller.updateUser)
router.delete('/user/:id', controller.deleteUser)
router.get('/userid', controller.getIdByToken)

module.exports = router
