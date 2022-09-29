import { Router } from 'express'
import userController from '../controllers/user.controller'

const router: Router = Router()

router.post('/user', userController.register)
router.post('/login', userController.login)

export default router
