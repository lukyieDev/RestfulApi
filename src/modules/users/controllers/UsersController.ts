import { Request, Response } from "express";
import createUserService from "../services/createUserService";
import listUserService from "../services/listUserService";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/updateProfileService";


export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUser = new listUserService();

        const users = await listUser.execute()

        return response.json(users)
    }

    public async show(request:Request, response: Response): Promise<Response>{
        const user_id = request.user.id
        const showService = new ShowProfileService()

        const user = await showService.execute({ user_id })
        return response.json(user)
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const { name, password, email } = request.body
        const createUser = new createUserService();

        const user = await createUser.execute({ name, password, email })

        return response.json(user)
    }

    public async update(request:Request, response:Response):Promise<Response>{
        const user_id = request.user.id
        const {name, email, newPassword, oldPassword} = request.body

        const updateProfile = new UpdateProfileService()

        const user = await updateProfile.execute({user_id, name, email, newPassword, oldPassword})

        return response.json(user)
    }

}