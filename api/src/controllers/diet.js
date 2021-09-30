const { Diet } = require('../db')
const { v4: uuidv4 } = require('uuid')



const getDiet = async (res, req, next) => {
    var diets = [
        {
            nombre: "Gluten Free",
            id: ""
        },
        {
            nombre: "Ketogenic",
            id: ""
        },
        {
            nombre: "Vegetarian",
            id: ""
        },
        {
            nombre: "Lacto-Vegetarian",
            id: ""
        },
        {
            nombre: "Ovo-Vegetarian",
            id: ""
        },
        {
            nombre: "Vegan",
            id: ""
        },
        {
            nombre: "Pescetarian",
            id: ""
        },
        {
            nombre: "Paleon",
            id: ""
        },
        {
            nombre: "Primal",
            id: ""
        },
        {
            nombre: "Low FODMAP",
            id: ""
        },
        {
            nombre: "Whole30",
            id: ""
        },
    ]
    try {
        const findbd = await Diet.findAll()
        if (findbd.length > 0) {
            res.status(200).send(findbd)
        } else {
            const createbd = await diets.map(diet => Diet.create({
                nombre: diet.nombre,
                id: uuidv4()
            }))
            res.status(200).send(createbd)
        }
    } catch (err) { (next(err)) } {

    }

}
module.exports = { getDiet };