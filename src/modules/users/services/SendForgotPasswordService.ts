import { getCustomRepository } from "typeorm";
import appError from "../../../shared/errors/appError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "../../../config/mail/EtherealMail";



interface Irequest {
    email: string;
}

class SendForgotPasswordService {
    public async execute({ email }: Irequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UsersTokenRepository);
        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new appError('Email Does Not Exist.')
        }

        const userToken : any = await userTokenRepository.findByUserid(user.id)

        await userTokenRepository.remove(userToken)

        const token = await userTokenRepository.generate(user.id)

        console.log(token)

        await EtherealMail.sendMail({
            to: email,
            body: `Solicitacao de redefinicao de senha recebida: ${token?.token}`
        })
    }
}

export default SendForgotPasswordService;
