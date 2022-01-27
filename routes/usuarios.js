
const { Router } = require('express'); // Desectructuramos el objeto para quedarnos con Router
const { check } = require ('express-validator');


const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios-controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y de más de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo introducido no es valido').isEmail(),
    check('correo').custom( emailExiste), // Validaciones personalizadas
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), // El rol tiene que estar en el array
    check('rol').custom( esRoleValido ), // Validamos el rol que se hace en helpers/db-validators --> esRoleValido
    validarCampos
], usuariosPost );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.delete('/', usuariosDelete );


module.exports = router; 