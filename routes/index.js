/**
 * @author Ivan Galan Pastor
 * Tratamiento de las rutas genericas
 */
const express = require('express');
let router = express.Router();
let Tipo = require('../models/tipo');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/nuevo_inmueble', (req, res) => {
    Tipo.find().then( resultado => {
        res.render('nuevo_inmueble', {error: false, tipos: resultado});
    }).catch( error => {
        res.render('nuevo_inmueble', {error: false, tipos: []})
    });
});

module.exports = router;
