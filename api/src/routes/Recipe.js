const { Router } = require('express')
const router = Router()
const {getAll,postRecipe,getrecipebyId} = require('../controllers/recipe')

router.get('/',getAll)
router.post('/',postRecipe)
router.get('/:id',getrecipebyId)

module.exports = router;