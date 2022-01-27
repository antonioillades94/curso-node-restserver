const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Verificar si el rol es uno de los que tenemos en BD
const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`);
    }
}

// Verificar si el correo ya está registrado
const emailExiste = async(correo='') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`El correo ${ correo } ya esta registrado`);
        
    }
}

// Verificar si existe el usuario
const existeUsuarioPorId = async(id='') => {
    const existeUsuario = await Usuario.findOne({ id });
    if ( existeUsuario ){
        throw new Error(`El id ${ id } no existe`);
        
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}