import { Request, Response } from "express";
import updateAvatarService from "../services/updateAvatarService";


export default class UserAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {

        const updateAvatar = new updateAvatarService()
        const user = await updateAvatar.execute({
            userid: request.user.id,
            avatarFile: request.file?.filename as string,
        })

        return response.json(user)
    }

}