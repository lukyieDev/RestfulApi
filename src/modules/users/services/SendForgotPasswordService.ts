import { getCustomRepository } from "typeorm";
import appError from "../../../shared/errors/appError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UserTokensRepository";




interface Irequest {
    email: string;
}

class SendForgotPasswordService {
    public async execute({ email }: Irequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UsersTokenRepository)
        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new appError('Email Does Not Exist.')
        }

        const userToken = await userTokenRepository.findByUserid(user.id)
        console.log(userToken)

        await userTokenRepository.remove(userToken)

        const token = await userTokenRepository.generate(user.id)

        console.log(token)
    }
}

export default SendForgotPasswordService;
