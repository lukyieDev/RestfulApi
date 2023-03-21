import ForgotPasswordController from "../controllers/forgotPasswordController";
import { Router } from "express";

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController()

passwordRoutes.post(
    '/forgot',
    forgotPasswordController.create,
)


export default passwordRoutes