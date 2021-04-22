import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/Users";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }


    async create(email: String) {
        // Verificar se o usuário existe

        const userAlreadyExists = await this.usersRepository.findOne({ email });

        // Se existir, retornar user
        if (userAlreadyExists) {
            return userAlreadyExists;
        };

        const user = this.usersRepository.create({ email });

        await this.usersRepository.save(user);

        // Se não existir, salvar no db
        return user;

    };


    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
      
        return user;
    }
};

export { UsersService };