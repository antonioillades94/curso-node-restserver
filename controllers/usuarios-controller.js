const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req = request, res = response) => {
    // Obtenemos todos los query params ( Son los parámetros que vienen en la URL )
    // y los desectructuramos
    const { limite = 5, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
                                .skip( Number(desde) )
                                .limit( Number(limite) );

    const total = await Usuario.countDocuments();
    res.json({
        total,
        usuarios
    });
}



const usuariosPost = async (req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // genSaltSync(10) Número de vueltas contra más tenga mas seguro pero mas lento Defaul: 10
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: "post API - Controlador",
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    
    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;

    // TODO VALIDAR EN BD
    if( password ){
         // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // genSaltSync(10) Número de vueltas contra más tenga mas seguro pero mas lento Defaul: 10
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    // Buscamos el usuario actualizado porque en findByIdAndUpdate me devuelve el usuario antes de actualizarlo
    const usuarios = await Usuario.findById( id );
    res.json( usuarios );
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