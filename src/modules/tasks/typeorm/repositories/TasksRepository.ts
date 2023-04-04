import { EntityRepository, Repository } from "typeorm";
import Task from "../entities/Task";

@EntityRepository(Task)
class TaskRepository extends Repository<Task>{
    public async findByTaskId(id : string) : Promise<Task | undefined>{
        const task = await this.findOne({
            where: { id }
        })

        return task
    }

    public async findByUserId(user_id: string) : Promise<Task[]>{
        const tasks = await this.find({
            where:{
                user_id
            }
        })
        return tasks
    }

}

export default TaskRepository