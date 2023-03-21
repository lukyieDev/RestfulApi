import { Request, Response } from 'express'
import createSessionsService from '../services/createSessionsService';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const createSessions = new createSessionsService()

        const user = await createSessions.execute({
            email,
            password
        })

        return response.json(user)
    }
}