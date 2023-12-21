const fs = require("fs"); // para manipular arquivos
const path = require("path"); // para navegar pelos diretórios
const uploadConfig = require("../configs/upload");

class DiskStorage {
  //usa fs rename para mudar o arquivo de lugar (tmp_folder para uloads_folder)
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  // função para deletar o arquivo dentro da pasta uploads_folder
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath); // .stat : retorna o status do arquivo
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); //unlink: função para remover o arquivo.
  }
}

module.exports = DiskStorage;
