import { Request, Response } from "express";
import createUserService from "../services/createUserService";
import listUserService from "../services/listUserService";

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUser = new listUserService();

        console.log(request.user)

        const users = await listUser.execute()

        return response.json(users)
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const { name, password, email } = request.body
        const createUser = new createUserService();

        const user = await createUser.execute({ name, password, email })

        return response.json(user)
    }

}