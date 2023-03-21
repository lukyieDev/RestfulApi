import { Router } from "express";
import SessionsController from "../controllers/SessionsController";
import multer from "multer";
import uploadConfig from '../../../config/upload'
import UsersController from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/userAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const sessionsController = new SessionsController()
const usersAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

usersRouter.get('/', isAuthenticated, usersController.index);
usersRouter.post('/', usersController.create)
usersRouter.post('/login', sessionsController.create)
usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update,
)

export default usersRouter