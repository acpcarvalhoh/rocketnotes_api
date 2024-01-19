const { hash, compare } = require("bcryptjs");
const AppError = require('../utils/AppError');
const sqlConection = require("../database/sqlite")
const moment = require('moment');
const UserRepository = require("../repositories/userRepository");

class UsersController{
    /* 
        * index - GET listar vários registros.
        * show - GET para exibir um registro específico.
        * create - POST para criar registro
        * update - PUT para atualizar um registro]
        * delete - DELETE para remover um registro
    */

    async create(request, response){
        const {name, email, password} = request.body;

        const userRepository = new UserRepository()
        
        const checkUserExist = await userRepository.findByEmail(email)

        if(checkUserExist){
            throw new AppError("Este E-mail já está cadastrado!!!")
        };


        const hashedPassword = await hash(password, 8);

        await userRepository.create({name, email, password: hashedPassword});

        return response.status(201).json({});
    };



    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id;

        const database = await sqlConection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    
        if(!user){
            throw new AppError("Usuário não encontrado!!");    
        };

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.user_id !== user.user_id){
            throw new AppError("Este E-mail já está em uso!!");
        };

        user.name = name ?? user.name
        user.email = email ?? user.email
        const date = moment().format('YYYY-MM-DD HH:mm:ss')

        if(password && !old_password){
            throw new AppError("Informe a senha antiga")
        }

        if(password && old_password){
            const checkOldPassword  = await compare(old_password, user.password)
            if(!checkOldPassword){ // se condição for falsa
                throw new AppError("A senha antiga não confere")
            }

            user.password = await hash(password, 8);
        }

        const insertUpdate = `
            UPDATE users SET 
            name = ?, 
            email = ?, 
            password = ?,
            updated_at = ? 
            WHERE id = ?
        `;

        const values = [user.name, user.email, user.password, date, user.id];

        await database.run(insertUpdate, values);

        
        return response.status(200).json({message: "Dados atualizados"});
    }
}

module.exports = UsersController;