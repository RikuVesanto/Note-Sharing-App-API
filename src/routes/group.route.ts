import { Router } from 'express'
import groupController from '../controllers/group.controller'
import { authenticate } from '../middleware/authenticate'

const router: Router = Router()

router.post('/group', authenticate, groupController.register)
router.post('/userconnection', authenticate, groupController.addUserConnection)
router.get('/grouplist/:id', authenticate, groupController.getGroupList)
router.get(
	'/searchlist/:search',
	authenticate,
	groupController.getGroupSearchResult
)

export default router
