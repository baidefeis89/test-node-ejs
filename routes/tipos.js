/**
 * @author Ivan Galan Pastor
 * Tratamiento de las rutas relacionadas con los tipos de inmuebles
 */
const express = require('express');
let Tipo = require(__dirname + '/../models/tipo');
let router = express.Router();

router.get('/', (req, res) => {
    Tipo.find().then( respuesta => {
        res.send({tipos: respuesta});
    });
});

module.exports = router;
