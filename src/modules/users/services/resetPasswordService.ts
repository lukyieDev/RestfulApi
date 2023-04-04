import { getCustomRepository } from "typeorm";
import appError from "../../../shared/errors/appError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UserTokensRepository";
import {isAfter, addHours} from 'date-fns'
import { hash } from "bcryptjs";



interface Irequest {
    password: string
    token: string
}

class resetPasswordService {
    public async execute({ token, password }: Irequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UsersTokenRepository)

        const userToken = await userTokenRepository.findByToken(token)

        if(!userToken){
            throw new appError('Token Does Not exist.')
        }
        
        const user = await usersRepository.findById(userToken.user_id)

        if(!user){
            throw new appError('This User Does Not Exist.')
        }

        const tokenAddedHours = addHours(userToken.created_at, 2);

        if(isAfter(Date.now(), tokenAddedHours)){
            throw new appError('Token Expired.')
        }

        user.password = await hash(password, 8)
        console.log(user)

        await usersRepository.save(user)

    }
}

export default resetPasswordService;
