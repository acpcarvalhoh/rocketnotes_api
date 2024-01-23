const UserCreateService = require("./userCreateService");
const UserRepositoryInmemory = require("../repositories/userRepositoryInMemory");

it("must return an id", async () => {

    const user = {
        name: "Jhon Test",
        email: 'jhon@gmail.com',
        password: "123"
    };
    
    const userRepositoryInmemory = new UserRepositoryInmemory();
    const userCreateService = new UserCreateService(userRepositoryInmemory);
    const userCreated = await userCreateService.execute(user);

    console.log(userCreated)


    expect(userCreated).toHaveProperty("id");
});