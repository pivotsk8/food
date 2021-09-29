const { Router } = require('express')
const router = Router()
const {getAll,postRecipe} = require('../controllers/recipe')

router.get('/',getAll)
router.post('/',postRecipe)

module.exports = router;