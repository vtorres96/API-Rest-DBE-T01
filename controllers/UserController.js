const { v4: uuidv4 } = require('uuid');
const usersData = require('../data/users-data');
const modifyFile = require('../utils/modifyFile');

/* 1ª forma  - exporta os metodos dentro de um objeto */
module.exports = {
  index: (req, res, next) => {
    try {
      /* verificando se nao existem registros no arquivo users-data.js para retornar mensagem */
      if (usersData.length === 0) {
        return res.status(200).json({
          'message': 'No records found' 
        })
      }

      /* retornando registros e quantidade total de registros encontrados no arquivo users-data.js */
      return res.status(200).json({
        'users': usersData,
        'total': usersData.length
      });
    } catch (error) {
      /* retornando erro tratado */
      return res.status(400).json({
        'message': 'Error:' + error.message
      });
    }
  },

  save: (req, res, next) => {
    try {
      /* criando um id randomico com uuid */
      let id = uuidv4();
  
      /* montando objeto para seguir padrao dentro do arquivo data/users.js */
      let user = { id, ...req.body };
      
      /* adcionando objeto criado dentro do array users */
      usersData.push(user);
  
      /* executando funcao que salva alteracoes dos registros no arquivo users-data.js */
      modifyFile(usersData, 'users-data.js');
  
      /* retornando usuario cadastrado */
      return res.status(201).json({
        'user': user
      });
    } catch (error) {
      /* retornando erro tratado */
      return res.status(400).json({
        'message': 'Error:' + error.message
      });
    }
  },

  update: (req, res, next) => {
    try {    
      /* obtendo id informado como parametro na rota */
      let id = req.params.id;
  
      /* utilizando find para encontrar usuario conforme id informado como parametro */
      let user = usersData.find(user => user.id == id);

      /* verificando se nao encontrou usuario para retornar mensagem de usuario nao encontrado */
      if (!user) {
        return res.status(404).json({
          'message': 'No user found'
        });
      }

      /* desestruturando propriedades recebidas no corpo da requisicao */
      let { name, email, password } = req.body;
      
      /* alterar as propriedades do objeto de usuario que desejamos fazer atualizacao */
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      user.password = password ? password : user.password;
  
      /* executando funcao que efetua alteracoes dos registros no arquivo users-data.js */
      modifyFile(usersData, 'users-data.js');
  
      /* retornando usuario alterado */
      return res.status(200).json({
        'user': user
      });
    } catch (error) {
      /* retornando erro tratado */
      return res.status(400).json({
        'message': 'Error:' + error.message
      });
    }
  },

  delete(req, res, next){
    try {
      /* obtendo id informado como parametro na rota */
      let id = req.params.id;

      /* utilizando find para encontrar usuario conforme id informado como parametro */
      let user = usersData.find(user => user.id == id);

      /* verificando se nao encontrou usuario para retornar mensagem de usuario nao encontrado */
      if (!user) {
          return res.status(404).json({
              'message': 'No user found'
          });
      }
  
      /* filtrando elementos que possuam id diferente do que foi informado como parametro */
      let usersFilter = usersData.filter(user => user.id != id);
      
      /* executando funcao que efetua alteracoes dos registros no arquivo users-data.js */
      modifyFile(usersFilter, 'users-data.js');
  
      /* retornando mensagem de sucesso ao efetuar exclusao */
      return res.status(200).json({
        'message': 'Successfully deleted user'
      });
    } catch (error) {
      /* retornando erro tratado */
      return res.status(400).json({
        'message': 'Error:' + error.message
      });
    }
  }
}

/* 2ª forma - atribuindo a uma constante os metodos necessarios */
// const UserController = {
//     index(req, res) {
//         return res.status(200).json({
//             'users': []
//         });
//     }
// }

// module.exports = UserController;