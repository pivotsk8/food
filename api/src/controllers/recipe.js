const { Recipe, Diet } = require('../db')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const { YOUR_API_KEY } = process.env;
const { Sequelize } = require("sequelize")

const getAll = async (req, res, next) => {
    let { name } = req.query
    if (!name) {
        try {

            var result = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=1`)).data
            const result2 = await result.results.map((recipe) => {
                return {
                    name: recipe.title,
                    ID: recipe.id,
                    diets: recipe.diets.map((diet) => { return { name: diet } }),
                    resumen: recipe.summary,
                    scrore: parseInt(recipe.spoonacularScore),
                    healing: recipe.healthScore,
                    image: recipe.image,
                    instructions: recipe.analyzedInstructions,
                }

            })
            const recipebd = await Recipe.findAll({
                include: {
                    model: Diets,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            })

            return res.status(200).send(recipebd.concat(result2))

        } catch (err) {


        }
    } 
    // else {
    //     var uppercase = name.toLowerCase();
    //     try {
    //         var api = axios.get(await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=1`)).data
    //         const result2 = await api.results.map((recipe) => {
    //             return {
    //                 name: recipe.title,
    //                 ID: recipe.id,
    //                 diets: recipe.diets.map((diet) => { return { name: diet } }),
    //                 resumen: recipe.summary,
    //                 scrore: parseInt(recipe.spoonacularScore),
    //                 healing: recipe.healthScore,
    //                 image: recipe.image,
    //                 instructions: recipe.analyzedInstructions,
    //             }
    //         })
    //         var filter = await result2.filter(recipe => recipe.title.toUpperCase().includes(uppercase))
    //         const recipebd = await Recipe.findAll({
    //             where: {
    //                 title: { name: uppercase }
    //             },
    //             include: {
    //                 model: Diets,
    //                 attributes: ["name"],
    //                 through: {
    //                     attributes: []
    //                 }
    //             }
    //         })

    //         return res.status(200).send(recipebd.concat(filter))
    //     } catch (err) {
    //         (next(err));
    //     }
    //}
}

// function getrecipe(req, res, next) {
//     let { id } = req.params
//     let upper = id.toUpperCase()
//     return Recipe.findByPk(upper)
//         .then((result) => res.status(200).send(result))
//         .catch((err) => { next(err); })
// };


function postRecipe(req, res) {
    let { name, resumen, score, healing, step } = req.body
    let obj = {
        name: name,
        score: score,
        healing: healing,
        step: step,
        resumen: resumen,
        image: image || "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"
    }
    return Recipe.create({ ...obj, ID: uuidv4() })
        .then(response => res.send(response))

}




module.exports = { getAll, postRecipe };