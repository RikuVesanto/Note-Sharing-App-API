import { Router } from 'express'
import userRouter from './user.route'
import groupRouter from './group.route'
import topicRouter from './topic.route'

const routes: Router = Router()

routes.use('/users', userRouter)
routes.use('/groups', groupRouter)
routes.use('/topics', topicRouter)

export default routes
