const express = require('express');
let Tipo = require('../models/tipo');
let router = express.Router();

router.get('/', (req, res) => {
    Tipo.find().then( respuesta => {
        res.send({tipos: respuesta});
    });
});

module.exports = router;
