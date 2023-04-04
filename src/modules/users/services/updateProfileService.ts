import { getCustomRepository } from 'typeorm';
import appError from '../../../shared/errors/appError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
    user_id: string;
    name:string;
    email:string;
    newPassword:string;
    oldPassword:string;
}


class UpdateProfileService {
    public async execute({user_id, name, email, newPassword, oldPassword}: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new appError('User Not Found.')
        }

        const emailExist = await usersRepository.findByEmail(email)

        if(emailExist && emailExist.id != user_id){
            throw new appError('Email Already Registered')
        }

        if(!newPassword){
            'Missing New Password'
        }

        if(newPassword && !oldPassword){
            throw new appError('The Old Password is necessary.')
        }
        if(newPassword && oldPassword){

            const checkoldpass = await compare(oldPassword, user.password)

            if(newPassword == oldPassword){
                throw new appError('The New Password, not can be same the old password.')
            }

            if(!checkoldpass){
                throw new appError('Old Pass Not Match.')
            }

            user.password = await hash(newPassword, 8)
        }
        user.email = email
        user.name = name

        await usersRepository.save(user)

        return user
    }
}

export default UpdateProfileService;
