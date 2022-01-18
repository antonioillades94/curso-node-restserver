const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    // Obtenemos todos los query params ( Son los parámetros que vienen en la URL )
    // y los desectructuramos
    const { q, nombre = 'No name', apiKey, page, limit } = req.query; 

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apiKey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {
    
    const { nombre, edad } = req.body;

    res.json({
        msg: "post API - Controlador",
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    
    const id = req.params.id;
    res.json({
        msg: "put API - Controlador",
        id
    });
}

const usuariosDelete = (req, res = response) => {
    
    res.json({
        msg: "delete API - Controlador"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}