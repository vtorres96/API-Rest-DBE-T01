const { v4: uuidv4 } = require('uuid');
const users = require('../data/users');
const modifyFile = require('../utils/modifyFile');

// 1ª forma que voces podem encontrar de exportar metodos do controller
module.exports = {
  index(req, res, next){
    try {
      if (users.length === 0) {
        res.status(200).json({
          'message': 'No records found' 
        })
      }

      res.status(200).json({
        'users': users,
        'total': users.length
      });
    } catch (error) {
      return res.status(400).json({ message: 'Error: ' + error.message });
    }
  },

  save(req, res, next){
    try {
      /* criando um id sequencial, obtendo a
      quantidade de elementos no array users e somando + 1 */
      let id = uuidv4();
  
      /* montando objeto para seguir padrao dentro do arquivo data/users.js */
      let user = { id, ...req.body };
      
      /* adcionando objeto criado dentro do array users */
      users.push(user);
  
      // executando funcao que salva alteracoes dos registros no arquivo users.js
      modifyFile(users, 'users.js');
  
      res.status(201).json({
        'user': user
      });
    } catch (error) {
      return res.status(400).json({ message: 'Error: ' + error.message });
    }
  },

  async update(req, res, next){
    try {    
      let id = req.params.id;
      let { name, email, password } = req.body;
  
      // obter a receita para altera-la
      let user = users.find(user => user.id == id);
  
      if (user.length === 0) {
        res.status(404).json({
          'message': 'No user found'
        });
      }

      // Alterar as propriedades do objeto que desejamos fazer update
      user.name = name;
      user.email = email;
      user.password = password;
  
      // executando funcao que salva alteracoes dos registros no arquivo users.js
      modifyFile(users, 'users.js');
  
      res.status(200).json({
        'user': user
      });
    } catch (error) {
      return res.status(400).json({ message: 'Error: ' + error.message });
    }
  },

  async delete(req, res, next){
    try {
      let id = req.params.id;

      // forma de remover elemento do json
      let user = users.filter(user => user.id == id);

      if (user.length === 0) {
        res.status(404).json({
          'message': 'No user found'
        });
      }
  
      // forma de remover elemento do json
      let usersFilter = users.filter(user => user.id != id);
      
      // executando funcao que salva alteracoes dos registros no arquivo users.js
      modifyFile(usersFilter, 'users.js');
  
      res.status(200).json({
        message: 'Successfully deleted user'
      });
    } catch (error) {
      return res.status(400).json({ message: 'Error:' + error.message });
    }
  }
}

// 2ª forma que voces podem encontrar de exportar metodos do controller
// const userController = {
//   index: (req, res, next) => {
//   }
// }

// module.exports = userController