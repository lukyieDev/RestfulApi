
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '../../../config/auth'
import { getCustomRepository } from "typeorm";
import appError from "../../../shared/errors/appError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";




interface Irequest {
    email: string;
    password: string;
}

interface Iresponse {
    user: User,
    token: String
}

class createSessionsService {
    public async execute({ password, email }: Irequest): Promise<Iresponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email)

        if (!user) {
            throw new appError('This User Does Not Exists', 401)
        }
        const passConfirmed = await compare(password, user.password);

        if (!passConfirmed) {
            throw new appError('Incorrect Email or Pass', 401)
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,

        })

        return {
            user,
            token
        }
    }
}

export default createSessionsService;
