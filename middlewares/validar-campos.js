const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    // Si no hay errores llamamos a next() que hace que siga con el siguiente middleware si no hay mas sigue al controlador
    next();
}

module.exports = {
    validarCampos
}