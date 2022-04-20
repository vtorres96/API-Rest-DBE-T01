const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

/* GET - listar usuarios */
router.get('/', UserController.index);

/* POST - salvar usuario */
router.post('/', UserController.save);

/* DELETE - excluir usuario */
router.delete('/:id', UserController.delete);

/* PUT - alterar usuario */
router.put('/:id', UserController.update);

module.exports = router;