const UserCreateService = require("./userCreateService");
const UserRepositoryInmemory = require("../repositories/userRepositoryInMemory");
const AppError = require('../utils/AppError');


describe("UserCreateService", () => {
    let userRepositoryInmemory = null;
    let userCreateService = null;


    beforeEach(() => {
        userRepositoryInmemory = new UserRepositoryInmemory();
        userCreateService = new UserCreateService(userRepositoryInmemory)

    });
    
    it("must return an id", async () => {
        const user = {
            name: "Jhon Test",
            email: 'jhon@gmail.com',
            password: "123"
        };
        
        const userCreated = await userCreateService.execute(user);
        expect(userCreated).toHaveProperty("id");

    });

    it("must return an error with this email already exists at database", async () => {
        const user1 = {
            name: "Jhon Test",
            email: 'jhon2@gmail.com',
            password: "123"
        };

        const user2 = {
            name: "Jhon Test",
            email: 'jhon2@gmail.com',
            password: "123"
        };
        
        await userCreateService.execute(user1);

        expect( async () => {
            await userCreateService.execute(user2);


        }).rejects.toEqual(new AppError("Este E-mail já está cadastrado!!!"));

    });




    
});
