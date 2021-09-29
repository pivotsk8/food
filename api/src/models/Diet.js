const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    return sequelize.define('Diet', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true
        },

        nombre: {
            type: DataTypes.STRING,
        }

    });

};