const { Router } = require('express')
const router = Router()
const {getDiet} = require('../controllers/diet')


router.get('/',getDiet)


module.exports = router;