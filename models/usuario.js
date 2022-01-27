
const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // Valida que los roles solo sean estos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});


// Personaliza la salida del JSON cuando se muestran los datos del usuario OJO! tiene que se function siempre no vale =>
UsuarioSchema.methods.toJSON = function(){
    // Descompone el objeto sacando "__v, password" y todo lo demás que contiene el objeto se 
    // guarda en la variable "usuario" al poner "...usuario"
    const { __v, password, ...usuario } = this.toObject();
    return usuario;

}

module.exports = model( 'Usuario', UsuarioSchema ); 