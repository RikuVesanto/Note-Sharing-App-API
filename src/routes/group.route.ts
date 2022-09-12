import { Router } from 'express'
import groupController from '../controllers/group.controller'

const router: Router = Router()

router.post('/register', groupController.register)


export default router
