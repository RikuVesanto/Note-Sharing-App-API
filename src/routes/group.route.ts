import { Router } from 'express'
import groupController from '../controllers/group.controller'

const router: Router = Router()

router.post('/register', groupController.register)
router.get('/grouplist/:id', groupController.getGroupList)


export default router
