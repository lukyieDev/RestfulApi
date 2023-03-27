import { Request, Response } from "express";
import SendForgotPasswordService from "../services/SendForgotPasswordService";
import resetPasswordService from "../services/resetPasswordService";

export default class forgotPassword {
    public async create(request:Request, response:Response) : Promise<Response> {
        const {email} = request.body;

        const sendForgotPasswordEmail = new SendForgotPasswordService()

        await sendForgotPasswordEmail.execute({email});

        return response.status(204).json()
    }

    public async update(request:Request, response:Response) : Promise<Response>{
        const {password, token} = request.body;
        const resetPassword = new resetPasswordService()

        await resetPassword.execute({
            token,
            password
        })
        return response.status(204).json()
    }
}