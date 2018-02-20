/**
 * @author Ivan Galan Pastor
 * Tratamiento de las rutas genericas
 */
const express = require('express');
let router = express.Router();
let Tipo = require(__dirname + '/../models/tipo');

router.get('/', (req, res) => {
    res.render(__dirname + '/../views/index');
});

router.get('/login', (req, res) => {
    res.render(__dirname + '/../views/login');
});

router.get('/registro', (req, res) => {
    res.render(__dirname + '/../views/registro');
});

router.get('/unauthorized', (req, res) => {
    res.render(__dirname + '/../views/unauthorized');    
});

router.get('/unauthorized-content', (req, res) => {
    res.render(__dirname + '/../views/unauthorized_content');    
});

router.get('/nuevo_inmueble', (req, res) => {
    Tipo.find().then( resultado => {
        res.render(__dirname + '/../views/nuevo_inmueble', {error: false, tipos: resultado});
    }).catch( error => {
        res.render(__dirname + '/../views/nuevo_inmueble', {error: false, tipos: []})
    });
});

module.exports = router;
