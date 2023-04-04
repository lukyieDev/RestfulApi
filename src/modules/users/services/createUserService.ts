import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import appError from "../../../shared/errors/appError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";



interface Irequest {
    name: string;
    email: string;
    password: string;
}

class createUserService {

    public async execute({ name, password, email }: Irequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);
        console.log('Teste')


        if (emailExists) {
            throw new appError('Email Already Exists!')
        }

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        await usersRepository.save(user)

        return user
    }
}

export default createUserService;
