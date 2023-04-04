import { getCustomRepository } from "typeorm";
import TaskRepository from "../typeorm/repositories/TasksRepository";
import appError from "../../../shared/errors/appError";
import Task from "../typeorm/entities/Task";

interface IRequest {
    user_id: string
}

class ListTaskService {
    public async execute({user_id}:IRequest): Promise<Task[]>{

        const taskRepository = getCustomRepository(TaskRepository)
        const tasks = await taskRepository.findByUserId(user_id)

        if(tasks){
            if(tasks.length < 1){
                throw new appError('This User Not Have Tasks')
            }
        }

        return tasks
    }
}

export default ListTaskService