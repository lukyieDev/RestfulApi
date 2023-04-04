import { Router } from "express";
import TasksController from "../controllers/TasksController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const tasksRouter = Router()
const taskController = new TasksController()

tasksRouter.post('/', isAuthenticated, taskController.create)
tasksRouter.delete('/', taskController.remove)
tasksRouter.get('/', isAuthenticated, taskController.index)


export default tasksRouter