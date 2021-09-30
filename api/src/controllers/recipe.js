const { Recipe, Diet } = require('../db')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const { YOUR_API_KEY } = process.env;


const getAll = async (req, res, next) => {
    try {
        let { name,
            order,
            page,
        } = req.query

        let result2
        let recipebd
        let concats = []
        page=page?page:1
        const recipexpag=9;

        const result = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=20`)).data.results
        result2 = await result.map((recipe) => {
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
        recipebd = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["nombre"],
                through: {
                    attributes: []
                }
            }
        })
        //# name
        if (name && name !== "") {
            name = name.toLowerCase();
            result2 = await result2.filter(recipe => recipe.name.toLowerCase().includes(name))
            recipebd = await recipebd.filter(recipe => recipe.name.toLowerCase().includes(name))
            concats = recipebd.concat(result2)

        } else {
            concats = recipebd.concat(result2)
        }
        //#order
        if (order === "asc" || !order) {
            concats = concats.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })
            console.log(concats)
        } else {
            concats = concats.sort((a, b) => { return b.name.toLowerCase().localeCompare(a.name.toLowerCase()) })
            console.log(concats)

        }
        //#pag
        let pagine = concats.slice((recipexpag * (page-1)),(recipexpag * (page-1))+recipexpag)


        return res.status(200).send(pagine)

    } catch (error) { next(error) } {

    }
}

//     try {

//         const result = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=10`)).data.results
//         const result2 = await result.map((recipe) => {
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
//         const recipebd = await Recipe.findAll({
//             include: {
//                 model: Diet,
//                 attributes: ["name"],
//                 through: {
//                     attributes: []
//                 }
//             }
//         })
//         if (!name) {
//             return res.status(200).send(recipebd.concat(result2))
//         } else {

//             var lowercase = name.toLowerCase();
//             var filter = await result2.filter(recipe => recipe.name.toLowerCase().includes(lowercase))
//             const recipebdfilter = await recipebd.filter(recipe => recipe.name.toLowerCase().includes(lowercase))

//             return res.status(200).send(recipebdfilter.concat(filter))
//         }
//     } catch (err) { (next(err)) } {


//     }
// }

const getrecipebyId = async (req, res, next) => {
    let { id } = req.params
    console.log(id)
    try {
        if (id.length > 10) {
            const bd = await Recipe.findByPk(id)
            res.status(200).send(bd)
        } else {
            const api = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`)).data
            res.status(200).json(api)
        }
    } catch (err) { (next(err)) } {

    }

};


function postRecipe(req, res) {
    let { name, resumen, score, healing, step, image, diet } = req.body
    let obj = {
        name: name,
        score: score,
        healing: healing,
        step: step,
        resumen: resumen,
        image: image || "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"
    }
    if (!name || !resumen) return res.send({ error: 500, message: "Necesitas ponerle un nombre y/he resumen" });
    Recipe.create({ ...obj, id: uuidv4() })
        .then((recipeCreated) => {
            return recipeCreated.addDiet(diet);
        })
        .then(response => res.send(response))
        .catch((error) => next(error));

}




module.exports = { getAll, postRecipe, getrecipebyId };