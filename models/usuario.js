/**
 * @author Ivan Galan Pastor
 * Creación del esquema de datos de los usuarios
 */
const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;
