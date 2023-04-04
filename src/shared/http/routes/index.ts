import { response, request, Router } from "express";
import userRoutes from '../../../modules/users/routes/Users.routes'
import passwordRoutes from "../../../modules/users/routes/password.routes";
import tasksRouter from "../../../modules/tasks/routes/Tasks.routes";

const routes = Router();

routes.use('/users', userRoutes)
routes.use('/password', passwordRoutes)
routes.use('/task', tasksRouter)

routes.get('/', (request, response) => {
    response.json({ message: 'Pagina Inicial' })
});


export default routes;