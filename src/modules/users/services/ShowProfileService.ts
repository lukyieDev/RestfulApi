
import { getCustomRepository } from 'typeorm';
import appError from '../../../shared/errors/appError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string
}


class ShowProfileService {
    public async execute({user_id}: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new appError('User Denied')
        }

        return user
    }
}

export default ShowProfileService;
