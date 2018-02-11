/**
 * @author Ivan Galan Pastor
 * Creación del esquema de datos de los tipos de inmuebles
 */
const mongoose = require('mongoose');

let tipoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

let Tipo = mongoose.model('tipo', tipoSchema);

module.exports = Tipo;
