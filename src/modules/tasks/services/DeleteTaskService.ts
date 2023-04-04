import { getCustomRepository } from "typeorm";
import TaskRepository from "../typeorm/repositories/TasksRepository";
import appError from "../../../shared/errors/appError";
import Task from "../typeorm/entities/Task";

interface IRequest {
    id: string
}

class DeleteTaskService{
    public async execute({id}: IRequest):Promise<void>{
        const taskRepository = getCustomRepository(TaskRepository)
        const task = await taskRepository.findByTaskId(id)
        
        if(!task){
            throw new appError('Task not exist.')
        }

        await taskRepository.remove(task)
    }
}

export default DeleteTaskService