import { Router } from 'express'
import userRouter from './user.route'
import groupRouter from './group.route'

const routes: Router = Router()

routes.use('/users', userRouter)
routes.use('/groups', groupRouter)

export default routes
