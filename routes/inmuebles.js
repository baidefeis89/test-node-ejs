const express = require('express');
let Inmueble = require('../models/inmueble');
let Tipo = require('../models/tipo');
let router = express.Router();

router.get('/', (req, res) => {
    Inmueble.find().populate('tipo').then( resultado => {
        res.render('lista_inmuebles', {inmuebles:resultado});
    }).catch( error => {
        console.log(error);
        res.render('lista_inmuebles', {inmuebles: []});
    });
});

router.get('/tipo/:id', (req, res) => {
    Inmueble.find({tipo: req.params.id}).populate('tipo').then( resultado => {
        res.render('lista_inmuebles', {inmuebles:resultado});
    }).catch( error => {
        res.render('lista_inmuebles', []);
    });
});

router.get('/:id', (req, res) => {
    Inmueble.findById(req.params.id).populate('tipo').then( resultado => {
        res.render('ficha_inmueble', {inmueble:resultado});
    }).catch( error => {
        res.render('ficha_inmueble', {});
    });
});

router.get('/:precio/:superficie/:habitaciones', (req, res) => {
    let precio = req.params.precio;
    let superficie = req.params.superficie;
    let numeroHabitaciones = req.params.habitaciones;

    let query = '{';
    query += precio != 0 ? `"precio": { "$lte" : "${precio}" },` : '';
    query += superficie != 0 ? `"superficie": { "$gte" : "${superficie}" },` : '';
    query += numeroHabitaciones != 0 ? `"numeroHabitaciones": { "$gte" : "${numeroHabitaciones}" }` : '';

    if (query.endsWith(',')) query = query.replace(/.$/,"}");
    else query += '}';

    let filtros = {
        precio: precio,
        superficie: superficie,
        numeroHabitaciones: numeroHabitaciones
    };

    Inmueble.find(JSON.parse(query)).populate('tipo').then( resultado => {
        res.render('lista_inmuebles', {inmuebles: resultado, filtros: filtros});
    }).catch( error => {
        console.log(error);
    })
});

router.post('/', (req, res) => {
    let img;
    if (req.files.imagen) {
        img = new Date().getTime() + '.jpg';
        req.files.imagen.mv('public/uploads/' + img, err => {
            if (err) console.log('Error al subir la imagen: ',err);
        })
    } else 
        img = 'default.jpg';

    let piso = new Inmueble({
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        numeroHabitaciones: req.body.numeroHabitaciones,
        superficie: req.body.superficie,
        precio: req.body.precio,
        imagen: img
    });

    piso.save().then( resultado => {
        res.render('ficha_inmueble', {inmueble:resultado});
    }).catch( error => {
        Tipo.find().then( resultado => {
            res.render('nuevo_inmueble', {error: error, tipos: resultado});
        }).catch( err => {
            res.render('nuevo_inmueble', {error: error, tipos: []})
        });
    });
});

router.delete('/:id', (req, res) => {
    Inmueble.findOneAndRemove(req.params.id).then( resultado => {
        res.render('lista_inmuebles', {resultado: resultado});
    }).catch( error => {
        res.render('lista_inmuebles', {error: error});
    });
});


module.exports = router;
