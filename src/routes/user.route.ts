import { Router } from 'express'
import userController from '../controllers/user.controller'

const router: Router = Router()

router.post('/user', userController.register)
router.put('/user', userController.editUserInfo)
router.get('/user/:username/:password', userController.login)
router.get('/user/:id', userController.getUser)

export default router
