import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("[AuthenticateUserUseCase]", () => {
    let authenticateUserUseCase: AuthenticateUserUseCase;
    let createUserUseCase: CreateUserUseCase;
    let userRepository: UsersRepositoryInMemory;

    beforeEach(() => {
        userRepository = new UsersRepositoryInMemory();

        createUserUseCase = new CreateUserUseCase(userRepository);
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    });

    it("Should be able to authenticate an user", async () => {
        const request: ICreateUserDTO = {
            name: "name",
            email: "email",
            password: "password",
            driver_license: "lincese_number",
        };

        await createUserUseCase.execute(request);

        const response = await authenticateUserUseCase.execute(request);

        expect(response).toHaveProperty("token");
    });

    it("Should not be able to authenticate a nonexistent user", async () => {
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: "mail2",
                password: "passw",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate a user with wrong password", async () => {
        const request: ICreateUserDTO = {
            name: "name",
            email: "email",
            password: "password",
            driver_license: "lincese_number",
        };

        await createUserUseCase.execute(request);

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: request.email,
                password: "passw",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
