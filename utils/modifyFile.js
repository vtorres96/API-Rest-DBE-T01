const fs = require('fs');
const path = require('path');

const modifyFile = (array, fileName) => {
  /* transformando o array recipes em uma string */
  let dataString = JSON.stringify(array);

  /* obtendo o caminho ate o arquivo data/users.js */
  let filePath = path.join('data', fileName);

  /* escrevendo o conteudo arquivo users.js */
  fs.writeFileSync(filePath, 'module.exports = ');
  fs.appendFileSync(filePath, dataString);
}

module.exports = modifyFile;