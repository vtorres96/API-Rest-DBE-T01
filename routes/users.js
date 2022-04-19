var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

/* GET listar usuarios */
router.get('/', UserController.index);

/* POST salvar usuario */
router.post('/', UserController.save);

/* DELETE para excluir usuario */
router.delete('/:id', UserController.delete);

/* PUT para alterar usuario */
router.put('/:id', UserController.update);

module.exports = router;