
const { Router } = require('express'); // Desectructuramos el objeto para quedarnos con Router

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios-controller');

const router = Router();


router.get('/', usuariosGet );

router.post('/', usuariosPost );

router.put('/:id', usuariosPut );

router.delete('/', usuariosDelete );


module.exports = router;