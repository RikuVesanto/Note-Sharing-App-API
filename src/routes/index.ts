import { Router } from 'express'
import userRouter from './user.route'

const routes: Router = Router()

routes.use('/users', userRouter)

export default routes
