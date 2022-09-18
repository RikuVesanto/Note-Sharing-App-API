import { Router } from 'express'
import groupController from '../controllers/group.controller'

const router: Router = Router()

router.post('/register', groupController.register)
router.post('/adduserconnection', groupController.addUserConnection)
router.get('/grouplist/:id', groupController.getGroupList)
router.get('/searchlist/:search', groupController.getGroupSearchResult)


export default router
