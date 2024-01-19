const sqlConection = require("../database/sqlite")

class UserRepository{
    async findByEmail(email){
        const database = await sqlConection() //crianr novo usuário
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        return user;
    };


    async create({ name, email, password }){
        const database = await sqlConection();

        const insertQuery = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        const values = [name, email, password];

        const userId = await database.run(insertQuery, values);

        return { id: userId };
    };
    

    

};



module.exports = UserRepository;