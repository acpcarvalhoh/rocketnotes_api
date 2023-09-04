const knex = require("../database/knex")

const AppError = require("../utils/AppError");
const Diskstorage = require("../providers/Distorage");

const diskstorage = new Diskstorage();

class UserAvatarController{
    async update(request, response){
        const user_id = request.user.id;
        const avatarFileName = request.file.filename;

        const user = await knex("users").where({id: user_id}).first();

        if(!user){
            throw new AppError("Usuário não autenticado", 401)
        };

        if(user.avatar){
            await diskstorage.deleteFile(user.avatar);
        };

        const fileNmae = await diskstorage.saveFile(avatarFileName);

        user.avatar = fileNmae;

        await knex("users").update(user).where({id: user.id});

        return response.json(user);
    };

};


module.exports = UserAvatarController;