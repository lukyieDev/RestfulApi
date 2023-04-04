import { getCustomRepository } from "typeorm";
import appError from "../../../shared/errors/appError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "../../../config/mail/EtherealMail";
import path from "path";



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

        const {token} = await userTokenRepository.generate(user.id)

        console.log(token)

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
        await EtherealMail.sendMail({
            to: {
                name:user.name,
                email:user.email
            },
            subject:'[API VENDAS] Password Restore',
            templateData:{
                Templatefile: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link:`http://localhost:3003/reset_password?token=${token}`
                }
            }
        })
    }
}

export default SendForgotPasswordService;
