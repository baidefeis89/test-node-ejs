/**
 * @author Ivan Galan Pastor
 * Creación del esquema de datos de los inmuebles
 */
const mongoose = require('mongoose');

let inmuebleSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tipo',
        required: true,
        trim: true,
        match: /^\d{9}$/
    },
    numeroHabitaciones: {
        type: Number,
        required: true,
        min: 1
    },
    superficie: {
        type: Number,
        required: true,
        min: 25
    },
    precio: {
        type: Number,
        required: true,
        min: 10000,
    },
    imagen: {
        type: String,
        required: false
    }
});

let Inmueble = mongoose.model('inmueble', inmuebleSchema);

module.exports = Inmueble;
