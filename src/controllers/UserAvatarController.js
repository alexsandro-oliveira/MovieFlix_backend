const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;
    const diskStorage = new DiskStorage();
    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar o avatar.",
        401
      );
    }

    // verifica se existe alguma foto e se existir deleta para fazer o update.
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    // salva a nova foto fazendo o update.
    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
