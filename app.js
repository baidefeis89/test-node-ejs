/**
 * @author Ivan Galan Pastor
 * Conexión a la base de datos y redirección a los routers pertinentes
 */
const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const jwt = require('jsonwebtoken');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const tipos = require('./routes/tipos');
const inmuebles = require('./routes/inmuebles');
const usuarios = require('./routes/usuarios');

const secreto = 'DespliegueNode';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/inmuebles');

passport.use(new Strategy({secretOrKey: secreto, jwtFromRequest:
    ExtractJwt.fromAuthHeaderAsBearerToken()}, (payload, done) => {
    if (payload.id) {
        return done(null, {id: payload.id});
    } else {
        return done(new Error("Usuario incorrecto"), null);
    }
}));

let app = express();
app.set('view engine','ejs');

app.use(fileUpload());
app.use(bodyParser.json());

app.use('/', express.static('./public'));

app.use('/', index);
app.use('/inmuebles', inmuebles);
app.use('/tipos', tipos);
app.use('/usuarios', usuarios);

app.use( (req, res, next) => {
    res.status(404);
    res.render('404', { url: req.url });
});

app.listen(8080);
