
import path from "path";
import { getCustomRepository } from "typeorm";
import appError from "../../../shared/errors/appError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import uploadConfig from '../../../config/upload'
import fs from 'fs'

interface IRequest {
    userid: string,
    avatarFile: string
}


class updateAvatarService {
    public async execute({ userid, avatarFile }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userid);

        if (!user) {
            throw new appError('User Does Not Exists!')
        }
        if (user.avatar) {
            const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarExist = await fs.promises.stat(userAvatarFilepath)

            if (userAvatarExist) {
                await fs.promises.unlink(userAvatarFilepath)
            }
        }
        user.avatar = avatarFile

        await usersRepository.save(user);
        return user;
    }
}

export default updateAvatarService;
