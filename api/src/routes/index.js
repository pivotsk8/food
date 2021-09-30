const { Router } = require('express');
const RecipeRoute= require('./Recipe')
const DietRoute= require('./Diet')
const router = Router();


router.use("/recipe",RecipeRoute)
router.use("/diet",DietRoute)


module.exports = router;
