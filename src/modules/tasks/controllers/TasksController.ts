import { Request, Response } from "express";
import createTaskService from "../services/CreateTaskService";
import DeleteTaskService from "../services/DeleteTaskService";
import ListTaskService from "../services/ListTasksService";

export default class TasksController {

    public async index(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id

        const listTask = new ListTaskService()

        const tasks = await listTask.execute({user_id})

        return response.json(tasks)
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const  user_id  = request.user.id
        const { task_content } = request.body

        const createTask = new createTaskService()

        const task = await createTask.execute({task_content, user_id})

        return response.json(task)
    }

    public async remove(request: Request, response: Response): Promise<Response> {
        const taskId = request.body
        const deleteTask = new DeleteTaskService()

        deleteTask.execute( taskId )

        return response.status(204).json()
    }
}