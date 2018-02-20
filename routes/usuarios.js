/**
 * @author Ivan Galan Pastor
 * Tratamiento de las rutas relacionadas con los usuarios
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

let Usuario = require(__dirname + '/../models/usuario');
let router = express.Router();

//TODO req.body es undefined, probar con postman
//si está correcto renderi__dirname + z/../ar vista y mandar token???, si no mensaje error en misma vista
router.post('/login', (req, res) => {
    if (!req.body.login) res.send({ok: false, error: 'Debe rellenar el campo login'});
    else if (!req.body.password) res.send({ok: false, error: 'Debe rellenar el campo password'});
    else {
        Usuario.findOne({login:req.body.login}).then( resultado => {
            if (resultado.password === md5(req.body.password)) {
                res.send({ok: true, token: generarToken(resultado.id)});
            } else 
                res.send({ok: false, error: 'Usuario o contraseña incorrecto'});
        })
    }
});

router.post('/registro', (req, res) => {

    if (!req.body.nombre) res.send({error:'El campo nombre es obligatorio'});
    else if (!req.body.login) res.send({error:'El campo login es obligatorio'});
    else if (!req.body.password) res.send({error:'El campo password es obligatorio'});
    else if (req.body.password !== req.body.password2) res.send({error:'Los password deben coincidir'});
    else {
        let usuario = new Usuario({
            nombre: req.body.nombre,
            login: req.body.login,
            password: md5(req.body.password)
        });
    
        usuario.save().then( 
            resultado => res.render(__dirname + '/../views/login'),
            error => res.send({error: error.errmsg})
        )
    }
});

module.exports = router;

const secreto = 'DespliegueNode';

function generarToken(id) {
    let token = jwt.sign({id: id}, secreto, {expiresIn: '1 day'});
    return token;
}
