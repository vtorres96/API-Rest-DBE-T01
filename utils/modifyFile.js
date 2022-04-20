const fs = require('fs');
const path = require('path');

const modifyFile = (array, fileName) => {
  /* transformando o array recipes em uma string */
  let dataString = JSON.stringify(array);

  /* obtendo o caminho ate o arquivo desejado */
  let filePath = path.join('data', fileName);

  /* escrevendo o conteudo no arquivo desejado */
  fs.writeFileSync(filePath, 'module.exports = ');
  fs.appendFileSync(filePath, dataString);
}

module.exports = modifyFile;