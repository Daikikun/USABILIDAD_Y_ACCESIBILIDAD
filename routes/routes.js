// Creación de un pseudo-módulo para un enrutador simple

const express = require('express');
const router = express.Router();

var routes = [
    'index',
    ['index.duplo', 'Inkofee'],
    ['comunidad', 'Comunidad'],
    ['biblioteca', 'Biblioteca'],
    ['foros', 'Foros'],
    ['perfil', 'Perfil'],
    ['buzon', 'Buzón'],
    ['easteregg', 'Easter Egg'],
    ['home', 'Inicio'],
    ['home.duplo', 'Inicio'],
    ['register', 'Registro'],
    ['config', 'Configuracion'],
    ['contacta', 'Contacta'],
    ['circles', 'Circulos']
    ];

// lista de rutas
routes.forEach((elto, i, routes) => {
    if(i == 0) router.get('/',                (req, res) => {res.render(routes[i]    + '.html', {title: 'Inkoffee'})});
    else       router.get('/' + routes[i][0], (req, res) => {res.render(routes[i][0] + '.html', {title: routes[i][1]})});
});

// exportación del /routes/index
module.exports = router;
