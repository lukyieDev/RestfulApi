import { getCustomRepository } from "typeorm";
import TaskRepository from "../typeorm/repositories/TasksRepository";
import appError from "../../../shared/errors/appError";
import Task from "../typeorm/entities/Task";


interface IRequest {
    task_content: string,
    user_id: string
}

class createTaskService {

    public async execute({task_content, user_id}: IRequest): Promise<Task>{

        const taskRepository = getCustomRepository(TaskRepository)

        if(!user_id){
            throw new appError('Invalid Id.')
        }

        const task = taskRepository.create({
            task_content,
            user_id
        })

        await taskRepository.save(task)

        return task
    }
}

export default createTaskService